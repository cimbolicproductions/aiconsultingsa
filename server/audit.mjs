import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import process from 'node:process';
import Stripe from 'stripe';

const PRODUCT = 'local_visibility_audit_v1';
const PRICE = 7900;
const fields = { businessName: 120, city: 80, website: 400, googleProfile: 400, phone: 40, email: 254, service: 200 };
const origin = 'https://aiconsultingsa.com';
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const hash = value => createHash('sha256').update(value).digest('hex');
const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff' };
const json = (status, value) => new Response(JSON.stringify(value), { status, headers });
class AuditError extends Error { constructor(status, message) { super(message); this.status = status; } }

function safeUrl(value, optional = false) {
  if (!value && optional) return '';
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw new Error();
    return parsed.toString();
  } catch { throw new AuditError(400, 'Use a full HTTPS website or Google profile link.'); }
}
export function validateIntake(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new AuditError(400, 'Enter the seven business details.');
  const result = {};
  for (const [key, max] of Object.entries(fields)) {
    if (typeof input[key] !== 'string' || input[key].length > max || /[\r\n\0]/.test(input[key])) throw new AuditError(400, `Check ${key}.`);
    result[key] = input[key].trim();
    if (!['website', 'googleProfile'].includes(key) && !result[key]) throw new AuditError(400, `Enter ${key}.`);
  }
  if (result.businessName.length < 2 || result.city.length < 2 || result.service.length < 2) throw new AuditError(400, 'Add your business, city and the service you want booked.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) throw new AuditError(400, 'Enter a delivery email address.');
  if (!/^\+?[\d() .-]+$/.test(result.phone) || !/^\d{7,15}$/.test(result.phone.replace(/\D/g, ''))) throw new AuditError(400, 'Enter a valid business phone number.');
  result.website = safeUrl(result.website, true);
  result.googleProfile = safeUrl(result.googleProfile, true);
  return result;
}
function checkoutUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password
      && ['buy.stripe.com', 'checkout.stripe.com'].includes(url.hostname) ? url.toString() : null;
  } catch { return null; }
}
function configured(env) {
  return /^price_[A-Za-z0-9]+$/.test(env.AUDIT_STRIPE_PRICE_ID ?? '')
    && /^(?:sk|rk)_(?:test|live)_/.test(env.STRIPE_SECRET_KEY ?? '')
    && (env.AUDIT_STRIPE_WEBHOOK_SECRET ?? '').startsWith('whsec_')
    && (env.AUDIT_ADMIN_TOKEN ?? '').length >= 32
    && Boolean(env.RESEND_API_KEY && env.RESEND_FROM_EMAIL && env.LEAD_RECIPIENT_EMAIL);
}
function assertConfigured(env) { if (!configured(env)) throw new AuditError(503, 'Audit checkout is not available yet.'); }
function assertAdmin(request, env) {
  const token = request.headers.get('authorization')?.replace(/^Bearer /, '') ?? '';
  if (!(env.AUDIT_ADMIN_TOKEN?.length >= 32) || !timingSafeEqual(Buffer.from(hash(token)), Buffer.from(hash(env.AUDIT_ADMIN_TOKEN)))) throw new AuditError(401, 'Owner access required.');
}
function assertOrigin(request, env) {
  const supplied = request.headers.get('origin');
  const expected = env.AUDIT_ORIGIN || origin;
  if (supplied !== expected) throw new AuditError(403, 'Open this form on the AI Consulting SA website.');
}
async function inputJson(request, limit = 30_000) {
  const raw = await request.text();
  if (Buffer.byteLength(raw) > limit) throw new AuditError(413, 'This request is too large.');
  try { return JSON.parse(raw); } catch { throw new AuditError(400, 'The form could not be read.'); }
}
function sessionId(value) {
  if (typeof value !== 'string' || !/^cs_(?:test|live)_[A-Za-z0-9]{8,240}$/.test(value)) throw new AuditError(400, 'Open the intake link supplied after payment.');
  return value;
}
function intakeFrom(session) {
  return Object.fromEntries(Object.keys(fields).map(key => [key, session.metadata?.[`audit_${key}`] ?? '']));
}
async function paidOrder(stripe, id, env) {
  const session = await stripe.checkout.sessions.retrieve(sessionId(id), { expand: ['line_items', 'payment_intent.latest_charge'] });
  const items = session.line_items?.data ?? [];
  const charge = typeof session.payment_intent === 'object' ? session.payment_intent?.latest_charge : null;
  if (session.metadata?.audit_product !== PRODUCT || session.mode !== 'payment' || session.status !== 'complete'
    || session.payment_status !== 'paid' || session.amount_total !== PRICE || session.currency !== 'usd'
    || session.livemode !== /_(live)_/.test(env.STRIPE_SECRET_KEY)
    || items.length !== 1 || items[0].price?.id !== env.AUDIT_STRIPE_PRICE_ID || items[0].quantity !== 1
    || !charge || typeof charge !== 'object' || charge.refunded || charge.disputed || charge.amount_refunded > 0) {
    throw new AuditError(403, 'A completed $79 audit payment is required.');
  }
  return session;
}
export function validateReport(input) {
  const text = (value, max) => {
    if (typeof value !== 'string' || !value.trim() || value.length > max || /[\0\u2014]/.test(value)) throw new AuditError(400, 'Check the report text and use plain punctuation.');
    return value.trim();
  };
  if (!input || !/^\d{4}-\d{2}-\d{2}$/.test(input.checkedOn) || !Number.isFinite(Date.parse(input.checkedOn))
    || new Date(input.checkedOn).toISOString().slice(0, 10) !== input.checkedOn) throw new AuditError(400, 'Add the audit date.');
  if (!Array.isArray(input.findings) || input.findings.length < 1 || input.findings.length > 8
    || !Array.isArray(input.fixes) || input.fixes.length < 1 || input.fixes.length > 8) throw new AuditError(400, 'Add findings and a prioritized fix list.');
  return {
    checkedOn: input.checkedOn, verdict: text(input.verdict, 2_000),
    findings: input.findings.map(finding => ({ title: text(finding.title, 160), status: text(finding.status, 40), evidence: text(finding.evidence, 3_000) })),
    fixes: input.fixes.map(fix => text(fix, 1_000)), worthMath: text(input.worthMath, 2_000), sourcingNote: text(input.sourcingNote, 3_000),
  };
}
export function renderReport(intake, report, env) {
  const upsell = (label, description, value) => {
    const url = checkoutUrl(value);
    return `<h3>${label}</h3><p>${description}</p>${url ? `<p><a href="${escape(url)}">${label}</a></p>` : '<p>Purchase is not available yet.</p>'}`;
  };
  return `<main style="max-width:680px;margin:auto;font:16px/1.7 Arial,sans-serif;color:#182322">
    <p>AI Consulting SA | Local Visibility Audit</p><h1>${escape(intake.businessName)}</h1><p>${escape(intake.city)} | Checked ${escape(report.checkedOn)}</p>
    <h2>Verdict</h2><p>${escape(report.verdict)}</p>
    ${report.findings.map((finding, index) => `<h2>${index + 1}. ${escape(finding.title)}: ${escape(finding.status)}</h2><p>${escape(finding.evidence)}</p>`).join('')}
    <h2>Fix list, in money order</h2><ol>${report.fixes.map(fix => `<li>${escape(fix)}</li>`).join('')}</ol>
    <h2>Worth math</h2><p>${escape(report.worthMath)}</p><h2>Sources and limits</h2><p>${escape(report.sourcingNote)}</p>
    <p>AI answers vary. This report covers the searches and records sampled on its audit date. No search position, AI recommendation or extra booking is guaranteed.</p>
    <h2>Optional next steps</h2>${upsell('$500 fix-it package', 'Implement the scoped fixes from this report. One payment of $500.', env.AUDIT_FIX_CHECKOUT_URL)}
    ${upsell('AI receptionist: $250/month', 'Phone answering with the existing offer and onboarding. A separate monthly service.', env.AUDIT_RECEPTIONIST_CHECKOUT_URL)}
    <p>Reply with any question about your report.</p></main>`;
}
async function sendEmail(fetchImpl, env, payload, key) {
  let response;
  try {
    response = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': key },
      body: JSON.stringify({ from: env.RESEND_FROM_EMAIL, reply_to: env.LEAD_RECIPIENT_EMAIL, ...payload }), signal: AbortSignal.timeout(12_000),
    });
    const result = await response.json();
    if (!response.ok || !result.id) throw new Error();
    return result.id;
  } catch { throw new AuditError(502, 'Email acceptance is unconfirmed. Reconcile the saved delivery attempt before retrying.'); }
}

export function createAuditHandler({ env = process.env, stripeFactory = key => new Stripe(key), fetchImpl = fetch } = {}) {
  return async request => {
    try {
      const url = new URL(request.url);
      const action = url.searchParams.get('action');
      if (action === 'status' && request.method === 'GET') return json(200, { available: configured(env), priceCents: PRICE });
      assertConfigured(env);
      const stripe = stripeFactory(env.STRIPE_SECRET_KEY);
      if (action === 'webhook' && request.method === 'POST') {
        const raw = await request.text();
        if (Buffer.byteLength(raw) > 250_000) throw new AuditError(413, 'Webhook is too large.');
        let event;
        try { event = stripe.webhooks.constructEvent(raw, request.headers.get('stripe-signature') ?? '', env.AUDIT_STRIPE_WEBHOOK_SECRET); }
        catch { throw new AuditError(400, 'Invalid Stripe signature.'); }
        if (['checkout.session.completed', 'checkout.session.async_payment_succeeded'].includes(event.type)
          && event.data.object.metadata?.audit_product === PRODUCT && event.data.object.payment_status === 'paid') {
          const order = await paidOrder(stripe, event.data.object.id, env);
          // Checkout itself is the durable paid-order record, even if the return
          // page or webhook is interrupted. Replayed events never reset intake.
          if (!order.metadata.audit_paid_at) await stripe.checkout.sessions.update(order.id, { metadata: { audit_paid_at: String(event.created) } });
        }
        return json(200, { received: true });
      }
      if (request.method === 'POST') assertOrigin(request, env);
      if (action === 'checkout' && request.method === 'POST') {
        const price = await stripe.prices.retrieve(env.AUDIT_STRIPE_PRICE_ID);
        if (!price.active || price.currency !== 'usd' || price.unit_amount !== PRICE || price.recurring || price.livemode !== /_(live)_/.test(env.STRIPE_SECRET_KEY)) throw new AuditError(503, 'Audit checkout is not available yet.');
        const checkout = await stripe.checkout.sessions.create({
          mode: 'payment', line_items: [{ price: price.id, quantity: 1 }],
          success_url: `${env.AUDIT_ORIGIN || origin}/local-visibility-audit/intake/?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${env.AUDIT_ORIGIN || origin}/local-visibility-audit/`,
          metadata: { audit_product: PRODUCT, audit_status: 'intake_needed' },
          integration_identifier: `aicsaaudit_${randomBytes(4).toString('hex').replace(/[0-9]/g, 'a')}`,
        });
        const target = checkoutUrl(checkout.url);
        if (!target) throw new AuditError(502, 'Stripe did not return a valid checkout link.');
        return json(200, { url: target });
      }
      if (action === 'order' && request.method === 'GET') {
        const order = await paidOrder(stripe, url.searchParams.get('session_id'), env);
        return json(200, { paid: true, status: order.metadata.audit_status });
      }
      if (action === 'intake' && request.method === 'POST') {
        const input = await inputJson(request, 5_000);
        const intake = validateIntake(input.intake);
        const order = await paidOrder(stripe, input.sessionId, env);
        const fingerprint = hash(JSON.stringify(intake));
        if (order.metadata.audit_status !== 'intake_needed' && order.metadata.audit_intake_hash !== fingerprint) throw new AuditError(409, 'This order already has an intake. Contact us to correct a detail.');
        if (order.metadata.audit_status === 'intake_needed') await stripe.checkout.sessions.update(order.id, {
          metadata: { ...Object.fromEntries(Object.entries(intake).map(([key, value]) => [`audit_${key}`, value])),
            audit_status: 'queued', audit_intake_hash: fingerprint, audit_queued_at: new Date().toISOString() },
        }, { idempotencyKey: `audit-intake-save-${order.id}` });
        // Stripe is the queue. Inbox mail is a convenience, never the record.
        if (!order.metadata.audit_queue_email_id) {
          if (order.metadata.audit_queue_email_started_at) {
            const age = Date.now() - Date.parse(order.metadata.audit_queue_email_started_at);
            if (!Number.isFinite(age) || age < 0 || age >= 23 * 60 * 60 * 1000) throw new AuditError(409, 'Your intake is saved. The order notice needs owner reconciliation.');
          } else await stripe.checkout.sessions.update(order.id, { metadata: { audit_queue_email_started_at: new Date().toISOString() } });
          const messageId = await sendEmail(fetchImpl, env, {
            to: env.LEAD_RECIPIENT_EMAIL, subject: `[AUDIT ORDER] ${intake.businessName}`,
            text: `Paid $79 Local Visibility Audit\nOrder: ${order.id}\n${Object.entries(intake).map(([key, value]) => `${key}: ${value || '(none)'}`).join('\n')}\n\nFulfillment queue: ${env.AUDIT_ORIGIN || origin}/local-visibility-audit/fulfillment/`,
          }, `audit-intake-${order.id}`);
          await stripe.checkout.sessions.update(order.id, { metadata: { audit_queue_email_id: messageId } });
        }
        return json(200, { queued: true, message: 'Your details are saved. Target delivery is within two business days by email.' });
      }
      if (action === 'queue' && request.method === 'GET') {
        assertAdmin(request, env);
        const after = url.searchParams.get('after');
        if (after) sessionId(after);
        const page = await stripe.checkout.sessions.list({ status: 'complete', limit: 100, ...(after ? { starting_after: after } : {}) });
        const orders = page.data.filter(order => order.payment_status === 'paid' && order.metadata?.audit_product === PRODUCT).map(order => ({
          id: order.id, status: order.metadata.audit_status, paidAt: order.metadata.audit_paid_at ?? order.created,
          queuedAt: order.metadata.audit_queued_at ?? null, deliveryId: order.metadata.audit_delivery_id ?? null,
          intake: intakeFrom(order),
        }));
        return json(200, { orders, nextCursor: page.has_more ? page.data.at(-1)?.id : null });
      }
      if (['preview', 'deliver'].includes(action) && request.method === 'POST') {
        assertAdmin(request, env);
        const input = await inputJson(request);
        const report = validateReport(input.report);
        const order = await paidOrder(stripe, input.sessionId, env);
        const intake = validateIntake(intakeFrom(order));
        if (action === 'preview') return json(200, { html: renderReport(intake, report, env), to: intake.email });
        if (order.metadata.audit_status === 'delivered') return json(200, { accepted: true, providerMessageId: order.metadata.audit_delivery_id, alreadyDelivered: true });
        if (!['queued', 'sending'].includes(order.metadata.audit_status)) throw new AuditError(409, 'The order needs its business intake first.');
        const html = renderReport(intake, report, env);
        const fingerprint = hash(html);
        if (order.metadata.audit_status === 'sending') {
          const age = Date.now() - Date.parse(order.metadata.audit_delivery_started_at);
          if (order.metadata.audit_delivery_hash !== fingerprint || !Number.isFinite(age) || age < 0 || age >= 23 * 60 * 60 * 1000) throw new AuditError(409, 'Reconcile the saved Resend attempt before changing or retrying this report.');
        } else await stripe.checkout.sessions.update(order.id, { metadata: { audit_status: 'sending', audit_delivery_hash: fingerprint, audit_delivery_started_at: new Date().toISOString() } }, { idempotencyKey: `audit-report-claim-${order.id}` });
        const messageId = await sendEmail(fetchImpl, env, { to: intake.email, subject: `Your Local Visibility Audit: ${intake.businessName}`, html,
          attachments: [{ filename: 'local-visibility-audit.html', content: Buffer.from(html).toString('base64') }],
        }, `audit-report-${order.id}`);
        await stripe.checkout.sessions.update(order.id, { metadata: { audit_status: 'delivered', audit_delivery_id: messageId, audit_delivered_at: new Date().toISOString() } });
        return json(200, { accepted: true, providerMessageId: messageId });
      }
      return json(405, { error: 'This action or method is not supported.' });
    } catch (error) {
      if (error instanceof AuditError) return json(error.status, { error: error.message });
      // Raw provider errors may carry keys, customer details or request URLs.
      console.error('Audit operation failed', { type: error?.type || error?.name || 'unknown' });
      return json(502, { error: 'The audit service could not confirm this operation. Please retry or contact us.' });
    }
  };
}
