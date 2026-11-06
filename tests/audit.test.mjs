import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import Stripe from 'stripe';
import { createAuditHandler, renderReport, validateIntake, validateReport } from '../server/audit.mjs';

const base = 'https://aiconsultingsa.com';
const env = { AUDIT_STRIPE_PRICE_ID: 'price_testAudit', STRIPE_SECRET_KEY: 'sk_test_unit_fixture', AUDIT_STRIPE_WEBHOOK_SECRET: 'whsec_unit_fixture', AUDIT_ADMIN_TOKEN: 'unit-test-token-never-a-real-token-12345678', RESEND_API_KEY: 're_unit_fixture', RESEND_FROM_EMAIL: 'AI Consulting SA <test@example.test>', LEAD_RECIPIENT_EMAIL: 'owner@example.test' };
const intake = { businessName: 'RentwashersSA', city: 'San Antonio', website: 'https://rentwasherssa.com/', googleProfile: '', phone: '(210) 802-8945', email: 'owner@example.test', service: 'Washer and dryer rentals' };
const report = JSON.parse(await readFile(new URL('../docs/local-visibility-audit/sample-report.json', import.meta.url), 'utf8'));
const id = 'cs_test_unitOrder12345678';
function harness(overrides = {}) {
  const session = { id, mode: 'payment', status: 'complete', payment_status: 'paid', amount_total: 7900, currency: 'usd', livemode: false, created: 1,
    line_items: { data: [{ price: { id: env.AUDIT_STRIPE_PRICE_ID }, quantity: 1 }] },
    payment_intent: { latest_charge: { refunded: false, disputed: false, amount_refunded: 0 } },
    metadata: { audit_product: 'local_visibility_audit_v1', audit_status: 'intake_needed' }, ...overrides };
  const calls = { updates: [], creates: [], emails: [] };
  const real = new Stripe('sk_test_unit_fixture');
  const stripe = {
    webhooks: real.webhooks,
    prices: { retrieve: async () => ({ id: env.AUDIT_STRIPE_PRICE_ID, active: true, currency: 'usd', unit_amount: 7900, recurring: null, livemode: false }) },
    checkout: { sessions: {
      retrieve: async () => structuredClone(session),
      update: async (_id, input, options) => { calls.updates.push({ input, options }); Object.assign(session.metadata, input.metadata); return structuredClone(session); },
      create: async input => { calls.creates.push(input); return { url: 'https://checkout.stripe.com/c/pay/test-only' }; },
      list: async () => ({ data: [structuredClone(session)], has_more: false }),
    } },
  };
  const fetchImpl = async (_url, input) => { calls.emails.push({ payload: JSON.parse(input.body), key: input.headers['Idempotency-Key'] }); return Response.json({ id: `email-${calls.emails.length}` }); };
  const handler = createAuditHandler({ env, stripeFactory: () => stripe, fetchImpl });
  function request(action, body, admin = false) {
    return new Request(`${base}/api/audit/?action=${action}${action === 'order' ? `&session_id=${id}` : ''}`, {
      method: body === undefined ? 'GET' : 'POST', headers: { Origin: base, 'Content-Type': 'application/json', ...(admin ? { Authorization: `Bearer ${env.AUDIT_ADMIN_TOKEN}` } : {}) },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
  }
  return { session, stripe, calls, handler, request, fetchImpl };
}

test('missing checkout config stays visibly closed and never contacts a provider', async () => {
  let calls = 0;
  const handler = createAuditHandler({ env: {}, stripeFactory: () => { calls++; throw new Error(); } });
  const status = await handler(new Request(`${base}/api/audit/?action=status`));
  assert.deepEqual(await status.json(), { available: false, priceCents: 7900 });
  assert.equal((await handler(new Request(`${base}/api/audit/?action=checkout`, { method: 'POST' }))).status, 503);
  assert.equal(calls, 0);
});
test('checkout verifies the fixed price and uses hosted payment with a paid intake return', async () => {
  const h = harness();
  assert.equal((await h.handler(h.request('checkout', {}))).status, 200);
  assert.equal(h.calls.creates[0].line_items[0].quantity, 1);
  assert.match(h.calls.creates[0].success_url, /intake\/\?session_id=\{CHECKOUT_SESSION_ID\}/);
  assert.equal('payment_method_types' in h.calls.creates[0], false);
  h.stripe.prices.retrieve = async () => ({ active: true, currency: 'usd', unit_amount: 500 });
  assert.equal((await h.handler(h.request('checkout', {}))).status, 503);
  assert.equal(h.calls.creates.length, 1);
});
test('intake validates all seven fields and rejects malformed or insecure values', () => {
  assert.deepEqual(validateIntake(intake), intake);
  for (const change of [{ businessName: '' }, { city: '' }, { email: 'bad' }, { phone: '12' }, { service: '' }, { website: 'http://example.com' }, { googleProfile: 'javascript:alert(1)' }, { email: 'a@example.com\nBcc: victim' }]) assert.throws(() => validateIntake({ ...intake, ...change }));
});
test('forged, unpaid, wrong-price, refunded, disputed and wrong-mode orders cannot unlock intake', async () => {
  for (const override of [
    { payment_status: 'unpaid' }, { amount_total: 1 }, { currency: 'eur' }, { livemode: true },
    { line_items: { data: [{ price: { id: 'price_other' }, quantity: 1 }] } },
    { payment_intent: { latest_charge: { refunded: true } } }, { payment_intent: { latest_charge: { disputed: true } } },
    { metadata: { audit_product: 'not-this-product' } },
  ]) {
    const h = harness(override);
    assert.equal((await h.handler(h.request('order'))).status, 403);
    assert.equal((await h.handler(h.request('intake', { sessionId: id, intake }))).status, 403);
    assert.equal(h.calls.updates.length, 0); assert.equal(h.calls.emails.length, 0);
  }
});
test('paid intake lands in the durable queue with every field and duplicates preserve it', async () => {
  const h = harness();
  const response = await h.handler(h.request('intake', { sessionId: id, intake }));
  assert.equal(response.status, 200);
  assert.equal(h.session.metadata.audit_status, 'queued');
  assert.equal(h.calls.updates[0].options.idempotencyKey, `audit-intake-save-${id}`);
  for (const [key, value] of Object.entries(intake)) assert.equal(h.session.metadata[`audit_${key}`], value);
  const queue = await h.handler(h.request('queue', undefined, true));
  assert.deepEqual((await queue.json()).orders[0].intake, intake);
  assert.equal((await h.handler(h.request('intake', { sessionId: id, intake }))).status, 200);
  assert.equal(h.calls.emails.length, 1);
  assert.equal((await h.handler(h.request('intake', { sessionId: id, intake: { ...intake, email: 'different@example.test' } }))).status, 409);
});
test('the queue and delivery require owner access and browser POSTs require the correct origin', async () => {
  const h = harness();
  assert.equal((await h.handler(h.request('queue'))).status, 401);
  assert.equal((await h.handler(h.request('deliver', { sessionId: id, report }))).status, 401);
  const wrongOrigin = new Request(`${base}/api/audit/?action=checkout`, { method: 'POST', headers: { Origin: 'https://attacker.example' } });
  assert.equal((await h.handler(wrongOrigin)).status, 403);
});
test('Stripe signatures are verified; paid webhook replay preserves queued intake', async () => {
  const h = harness();
  const event = { type: 'checkout.session.completed', created: 123, data: { object: h.session } };
  const payload = JSON.stringify(event);
  const signature = h.stripe.webhooks.generateTestHeaderString({ payload, secret: env.AUDIT_STRIPE_WEBHOOK_SECRET });
  const webhook = () => new Request(`${base}/api/audit/?action=webhook`, { method: 'POST', headers: { 'Stripe-Signature': signature }, body: payload });
  assert.equal((await h.handler(new Request(`${base}/api/audit/?action=webhook`, { method: 'POST', body: payload }))).status, 400);
  await h.handler(h.request('intake', { sessionId: id, intake }));
  assert.equal((await h.handler(webhook())).status, 200);
  assert.equal((await h.handler(webhook())).status, 200);
  assert.equal(h.session.metadata.audit_status, 'queued');
  assert.equal(h.calls.emails.length, 1);
});
test('report preview sends nothing and delivery renders both upsell slots and an attachment', async () => {
  const h = harness();
  await h.handler(h.request('intake', { sessionId: id, intake }));
  const preview = await h.handler(h.request('preview', { sessionId: id, report }, true));
  assert.equal(preview.status, 200); assert.equal(h.calls.emails.length, 1);
  const response = await h.handler(h.request('deliver', { sessionId: id, report }, true));
  assert.equal(response.status, 200);
  const mail = h.calls.emails[1];
  assert.equal(mail.payload.to, intake.email);
  assert.match(mail.payload.html, /\$500 fix-it package/); assert.match(mail.payload.html, /\$250\/month/);
  assert.equal((mail.payload.html.match(/Purchase is not available yet/g) ?? []).length, 2);
  assert.equal(Buffer.from(mail.payload.attachments[0].content, 'base64').toString('utf8'), mail.payload.html);
  assert.equal(h.session.metadata.audit_status, 'delivered');
  assert.equal((await h.handler(h.request('deliver', { sessionId: id, report }, true))).status, 200);
  assert.equal(h.calls.emails.length, 2);
});
test('report escaping and upsell configuration fail closed without inventing a payment flow', () => {
  const html = renderReport({ ...intake, businessName: '<script>alert(1)</script>' }, validateReport(report), {
    AUDIT_FIX_CHECKOUT_URL: 'https://buy.stripe.com/test_fixture', AUDIT_RECEPTIONIST_CHECKOUT_URL: 'https://attacker.example/pay',
  });
  assert.match(html, /&lt;script&gt;/); assert.doesNotMatch(html, /<script>/);
  assert.match(html, /href="https:\/\/buy.stripe.com\/test_fixture"/); assert.doesNotMatch(html, /attacker.example/);
  assert.throws(() => validateReport({ ...report, checkedOn: '2026-02-30' }));
});
test('ambiguous email attempts retain their claim and expired idempotency cannot resend', async () => {
  const h = harness(); await h.handler(h.request('intake', { sessionId: id, intake }));
  let sends = 0;
  const handler = createAuditHandler({ env, stripeFactory: () => h.stripe, fetchImpl: async () => { sends++; throw new Error('private provider detail'); } });
  assert.equal((await handler(h.request('deliver', { sessionId: id, report }, true))).status, 502);
  assert.equal(h.session.metadata.audit_status, 'sending');
  h.session.metadata.audit_delivery_started_at = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  assert.equal((await handler(h.request('deliver', { sessionId: id, report }, true))).status, 409);
  assert.equal(sends, 1);
});
test('asynchronous unpaid completion cannot enter the fulfillment queue', async () => {
  const h = harness({ payment_status: 'unpaid' });
  const payload = JSON.stringify({ type: 'checkout.session.completed', created: 123, data: { object: h.session } });
  const signature = h.stripe.webhooks.generateTestHeaderString({ payload, secret: env.AUDIT_STRIPE_WEBHOOK_SECRET });
  assert.equal((await h.handler(new Request(`${base}/api/audit/?action=webhook`, { method: 'POST', headers: { 'Stripe-Signature': signature }, body: payload }))).status, 200);
  assert.equal(h.calls.updates.length, 0);
  assert.deepEqual((await (await h.handler(h.request('queue', undefined, true))).json()).orders, []);
});
