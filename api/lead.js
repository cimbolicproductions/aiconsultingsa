import { createHash } from 'node:crypto';
import process from 'node:process';

const siteOrigin = 'https://aiconsultingsa.com';
const homeSuccessUrl = `${siteOrigin}/?submitted=true#contact`;
const contactUrl = `${siteOrigin}/#contact`;
const resendBatchUrl = 'https://api.resend.com/emails/batch';

/*
 * Everything the form is allowed to say about itself is declared here, server
 * side. A value that is not in one of these tables never reaches a subject
 * line, a redirect, or an email body.
 */
const DEFAULT_SERVICE = 'general';

const services = {
  phone_reception: {
    label: 'AI phone answering (auto shop)',
    notificationSubject: 'New lead: AI phone answering',
    confirmationSubject: 'Thanks for asking about phone answering',
    confirmationHeading: 'I received your note about phone answering.',
    confirmation: 'Thanks for asking about phone answering for your shop. I will review the workflow you shared and follow up to discuss fit, call coverage and next steps. This message does not activate a service or book a repair appointment.',
    servicePath: '/ai-phone-answering/',
    servicePathLabel: 'AI phone answering for auto shops',
    successUrl: `${siteOrigin}/ai-phone-answering/?submitted=true#phone-fit`,
  },
  textback: {
    label: 'Missed call textback',
    notificationSubject: 'New lead: missed call textback',
    confirmationSubject: 'Thanks for asking about missed call textback',
    confirmationHeading: 'I received your note about missed call textback.',
    confirmation: 'Thanks for asking about missed call textback. I will review what you shared and follow up about whether a text plus a human callback covers what you need, and what it would cost to run in your own accounts. This message does not activate a service.',
    servicePath: '/ai-phone-answering/',
    servicePathLabel: 'phone answering and textback',
    successUrl: homeSuccessUrl,
  },
  aeo: {
    label: 'ChatGPT and AI search optimization',
    notificationSubject: 'New lead: AI search optimization',
    confirmationSubject: 'Thanks for asking about AI search',
    confirmationHeading: 'I received your note about AI search.',
    confirmation: 'Thanks for asking about getting found in ChatGPT and AI search. I will review what you sent and follow up with the gaps I can see and whether the flat $500 page rewrite is the right fit. No one can promise you a particular answer from a model they do not control, so I will tell you what I can and cannot influence. This message does not start any work.',
    servicePath: '/chatgpt-optimization-san-antonio/',
    servicePathLabel: 'ChatGPT optimization in San Antonio',
    successUrl: homeSuccessUrl,
  },
  assessment: {
    label: 'AI Tools Assessment',
    notificationSubject: 'New lead: AI Tools Assessment',
    confirmationSubject: 'Thanks for asking about the AI Tools Assessment',
    confirmationHeading: 'I received your note about the assessment.',
    confirmation: 'Thanks for asking about the AI Tools Assessment. I will review the workflow you shared and follow up about whether the flat $999 assessment is the right next step, or whether something smaller would answer your question first. This message does not start the assessment.',
    servicePath: '/ai-tools-assessment-san-antonio/',
    servicePathLabel: 'the AI Tools Assessment',
    successUrl: homeSuccessUrl,
  },
  general: {
    label: 'Not specified',
    notificationSubject: 'New AI Consulting SA website lead',
    confirmationSubject: 'Thanks for contacting AI Consulting SA',
    confirmationHeading: 'I received your workflow.',
    confirmation: 'Thanks for sharing the workflow that is taking up your time. I received your note and will review it personally. I will follow up using the contact details you provided with what I think the useful next step is, including whether that is anything you need to buy from me. This message does not start any work.',
    servicePath: '/',
    servicePathLabel: 'AI Consulting SA',
    successUrl: homeSuccessUrl,
  },
};

/* A submitted landing_path must be one of the site's own existing paths. */
const landingPaths = new Set([
  '/',
  '/ai-phone-answering/',
  '/ai-tools-assessment-san-antonio/',
  '/ai-document-automation-san-antonio/',
  '/small-business-automation-san-antonio/',
  '/chatgpt-optimization-san-antonio/',
  '/do-i-need-to-pay-for-ai-san-antonio/',
]);

const campaignFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
const campaignPattern = /^[a-z0-9_-]{1,80}$/;
const responseModes = new Set(['html', 'redirect']);

function pageResponse(status, title, message, bodyHtml) {
  return new Response(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>${title} | AI Consulting SA</title>
    <style>
      body { margin: 0; background: #fafaf9; color: #0f172a; font-family: Arial, sans-serif; }
      main { max-width: 640px; margin: 10vh auto; padding: 24px; }
      article { border: 1px solid #cbd5e1; border-radius: 12px; background: white; padding: 32px; }
      h1 { margin-top: 0; font-size: 2rem; }
      p { color: #475569; font-size: 1.05rem; line-height: 1.7; }
      a { color: #1d4ed8; font-weight: 700; }
    </style>
  </head>
  <body>
    <main>
      <article>
        <h1>${title}</h1>
        ${bodyHtml ?? `<p>${message}</p>
        <p><a href="${contactUrl}">Return to the form</a> or call <a href="tel:+12108028945">(210) 802-8945</a>.</p>`}
      </article>
    </main>
  </body>
</html>`, {
    status,
    headers: {
      'cache-control': 'no-store',
      'content-type': 'text/html; charset=utf-8',
      'x-content-type-options': 'nosniff',
    },
  });
}

function htmlResponse(status, title, message) {
  return pageResponse(status, title, message, undefined);
}

/*
 * The no-JavaScript success page. Only reached after the provider accepted
 * both messages in the batch. Copy is chosen from the service table, never
 * from submitted input, so nothing here needs to interpolate lead data.
 */
function successResponse(service, responseMode) {
  if (responseMode === 'redirect') return Response.redirect(service.successUrl, 303);

  return pageResponse(200, 'Message sent', service.confirmation, `<p role="status">${service.confirmation}</p>
        <p><a href="${siteOrigin}${service.servicePath}">Back to ${service.servicePathLabel}</a> or call <a href="tel:+12108028945">(210) 802-8945</a>.</p>`);
}

function readField(formData, name, maximumLength) {
  const value = formData.get(name);
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maximumLength);
}

function readServiceInterest(formData) {
  const requested = readField(formData, 'service_interest', 40).toLowerCase();
  /*
   * Object.hasOwn, not `in` and not truthiness. `services.constructor` and
   * `services.toString` are inherited and truthy, so a looser check would let
   * "constructor" select a service that does not exist.
   */
  return Object.hasOwn(services, requested) ? requested : DEFAULT_SERVICE;
}

function readResponseMode(formData) {
  const requested = readField(formData, 'response_mode', 20).toLowerCase();
  /*
   * Absent means redirect, because the existing homepage forms send no value
   * and must keep the behaviour they already have.
   */
  return responseModes.has(requested) ? requested : 'redirect';
}

function readLandingPath(formData) {
  const requested = readField(formData, 'landing_path', 200);
  return landingPaths.has(requested) ? requested : '';
}

function readCampaign(formData) {
  const campaign = {};
  for (const field of campaignFields) {
    /*
     * Read well past the 80 character limit on purpose, then reject. Slicing to
     * 80 first would turn an over-length value into a valid-looking campaign
     * label that nobody ever used, which is worse than having no label.
     */
    const value = readField(formData, field, 200).toLowerCase();
    campaign[field] = campaignPattern.test(value) ? value : '';
  }
  return campaign;
}

function campaignSummary(campaign) {
  const parts = campaignFields
    .filter((field) => campaign[field])
    .map((field) => `${field.replace('utm_', '')}=${campaign[field]}`);
  return parts.length > 0 ? parts.join(', ') : '';
}

function isValidEmail(value) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function senderAddress(value) {
  const friendlyAddress = value.match(/<([^<>]+)>\s*$/);
  return (friendlyAddress?.[1] ?? value).trim();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function firstName(fullName) {
  return fullName.split(/\s+/)[0] || 'there';
}

function createDeliveryBatch({ lead, service, recipient, sender }) {
  const safeName = escapeHtml(lead.name);
  const safeBusiness = escapeHtml(lead.business);
  const safeEmail = escapeHtml(lead.email);
  const safePhone = escapeHtml(lead.phone || 'Not provided');
  const safeWorkflow = escapeHtml(lead.workflow);
  const safeSource = escapeHtml(lead.source || 'Not provided');
  const safeFirstName = escapeHtml(firstName(lead.name));
  const safeService = escapeHtml(service.label);
  const safeLandingPath = escapeHtml(lead.landingPath || 'Not provided');
  const safeCampaign = escapeHtml(campaignSummary(lead.campaign) || 'None');

  const notificationText = [
    service.notificationSubject,
    '',
    `Service asked about: ${service.label}`,
    `Name: ${lead.name}`,
    `Business: ${lead.business}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || 'Not provided'}`,
    `How they found us: ${lead.source || 'Not provided'}`,
    `Landing page: ${lead.landingPath || 'Not provided'}`,
    `Campaign: ${campaignSummary(lead.campaign) || 'None'}`,
    '',
    'Workflow:',
    lead.workflow,
  ].join('\n');

  const confirmationText = [
    `Hi ${firstName(lead.name)},`,
    '',
    service.confirmation,
    '',
    'Dominic',
    'AI Consulting SA',
    '(210) 802-8945',
    siteOrigin,
    '',
    'You are receiving this confirmation because you submitted a form at aiconsultingsa.com.',
  ].join('\n');

  return [
    {
      from: sender,
      to: [recipient],
      reply_to: lead.email,
      subject: service.notificationSubject,
      text: notificationText,
      html: `
        <div style="background:#f5f5f4;padding:32px 16px;font-family:Arial,sans-serif;color:#0f172a;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;">
            <p style="margin:0 0 8px;color:#2563eb;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">${safeService}</p>
            <h1 style="margin:0 0 24px;font-size:26px;">${safeBusiness}</h1>
            <table style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.6;">
              <tr><td style="padding:8px 12px 8px 0;font-weight:700;vertical-align:top;">Name</td><td style="padding:8px 0;">${safeName}</td></tr>
              <tr><td style="padding:8px 12px 8px 0;font-weight:700;vertical-align:top;">Email</td><td style="padding:8px 0;"><a href="mailto:${safeEmail}" style="color:#2563eb;">${safeEmail}</a></td></tr>
              <tr><td style="padding:8px 12px 8px 0;font-weight:700;vertical-align:top;">Phone</td><td style="padding:8px 0;">${safePhone}</td></tr>
              <tr><td style="padding:8px 12px 8px 0;font-weight:700;vertical-align:top;">Found us via</td><td style="padding:8px 0;">${safeSource}</td></tr>
              <tr><td style="padding:8px 12px 8px 0;font-weight:700;vertical-align:top;">Service</td><td style="padding:8px 0;">${safeService}</td></tr>
              <tr><td style="padding:8px 12px 8px 0;font-weight:700;vertical-align:top;">Landing page</td><td style="padding:8px 0;">${safeLandingPath}</td></tr>
              <tr><td style="padding:8px 12px 8px 0;font-weight:700;vertical-align:top;">Campaign</td><td style="padding:8px 0;">${safeCampaign}</td></tr>
            </table>
            <h2 style="margin:28px 0 10px;font-size:18px;">Workflow</h2>
            <div style="white-space:pre-wrap;background:#f8fafc;border-radius:8px;padding:16px;line-height:1.65;color:#334155;">${safeWorkflow}</div>
          </div>
        </div>`,
      tags: [{ name: 'category', value: 'website_lead' }],
    },
    {
      from: sender,
      to: [lead.email],
      reply_to: recipient,
      subject: service.confirmationSubject,
      text: confirmationText,
      html: `
        <div style="background:#f5f5f4;padding:32px 16px;font-family:Arial,sans-serif;color:#0f172a;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:36px;">
            <p style="margin:0 0 8px;color:#2563eb;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">AI Consulting SA</p>
            <h1 style="margin:0 0 24px;font-size:28px;line-height:1.2;">Thanks, ${safeFirstName}. ${escapeHtml(service.confirmationHeading)}</h1>
            <p style="margin:0 0 24px;color:#334155;font-size:16px;line-height:1.7;">${escapeHtml(service.confirmation)}</p>
            <p style="margin:0;color:#0f172a;font-size:16px;line-height:1.7;">Dominic<br />AI Consulting SA<br /><a href="tel:+12108028945" style="color:#2563eb;">(210) 802-8945</a><br /><a href="${siteOrigin}" style="color:#2563eb;">aiconsultingsa.com</a></p>
            <p style="margin:32px 0 0;border-top:1px solid #e2e8f0;padding-top:18px;color:#64748b;font-size:12px;line-height:1.6;">You are receiving this confirmation because you submitted a form at aiconsultingsa.com.</p>
          </div>
        </div>`,
      tags: [{ name: 'category', value: 'lead_confirmation' }],
    },
  ];
}

/*
 * Service interest belongs in the fingerprint: the same owner asking about two
 * different services is two leads. Campaign fields deliberately stay out, so a
 * retagged link cannot manufacture a second send of an identical submission.
 */
function createIdempotencyKey(lead, serviceInterest) {
  const fingerprint = [
    lead.email.toLowerCase(),
    lead.business.toLowerCase(),
    lead.phone,
    lead.workflow,
    serviceInterest,
  ].join('\n');
  const digest = createHash('sha256').update(fingerprint).digest('hex').slice(0, 48);
  return `website-lead/${digest}`;
}

function providerError(payload) {
  if (!payload || typeof payload !== 'object') return {};
  const source = payload.error && typeof payload.error === 'object' ? payload.error : payload;
  return {
    errorName: typeof source.name === 'string' ? source.name : undefined,
    message: typeof source.message === 'string' ? source.message : undefined,
  };
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return htmlResponse(405, 'Method not allowed', 'This endpoint only accepts website form submissions.');
    }

    const recipient = process.env.LEAD_RECIPIENT_EMAIL?.trim();
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const sender = process.env.RESEND_FROM_EMAIL?.trim();
    if (!recipient || !isValidEmail(recipient) || !resendApiKey?.startsWith('re_') || !sender || !isValidEmail(senderAddress(sender))) {
      console.error('Lead delivery unavailable: Resend email configuration is missing or invalid.', {
        hasRecipient: Boolean(recipient),
        hasApiKey: Boolean(resendApiKey),
        hasSender: Boolean(sender),
      });
      return htmlResponse(503, 'Form temporarily unavailable', 'The lead form is temporarily unavailable because email delivery is not configured.');
    }

    let formData;
    try {
      formData = await request.formData();
    } catch (error) {
      console.error('Lead form parse failed.', { message: error instanceof Error ? error.message : String(error) });
      return htmlResponse(400, 'Check the form', 'The submitted form could not be read. Please return and try again.');
    }

    const serviceInterest = readServiceInterest(formData);
    const service = services[serviceInterest];
    const responseMode = readResponseMode(formData);

    const honey = readField(formData, '_honey', 200);
    if (honey) return successResponse(service, responseMode);

    const lead = {
      name: readField(formData, 'name', 100),
      business: readField(formData, 'business', 150),
      email: readField(formData, 'email', 254),
      phone: readField(formData, 'phone', 50),
      workflow: readField(formData, 'workflow', 5000),
      source: readField(formData, 'source', 300),
      landingPath: readLandingPath(formData),
      campaign: readCampaign(formData),
    };

    if (lead.name.length < 2 || lead.business.length < 2 || !isValidEmail(lead.email) || lead.workflow.length < 10) {
      return htmlResponse(400, 'Check the form', 'Name, business, a valid email, and a clear workflow description are required.');
    }

    const deliveryBatch = createDeliveryBatch({ lead, service, recipient, sender });
    let providerResponse;
    try {
      providerResponse = await fetch(resendBatchUrl, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${resendApiKey}`,
          'content-type': 'application/json',
          'idempotency-key': createIdempotencyKey(lead, serviceInterest),
          'user-agent': 'AI Consulting SA Website/1.0',
        },
        body: JSON.stringify(deliveryBatch),
        signal: AbortSignal.timeout(10000),
      });
    } catch (error) {
      console.error('Resend batch request failed.', {
        service: 'Resend',
        operation: 'send lead notification and customer confirmation',
        serviceInterest,
        message: error instanceof Error ? error.message : String(error),
      });
      return htmlResponse(502, 'Message not delivered', 'Your form could not be delivered to the email provider. Please try again or call instead.');
    }

    const requestId = providerResponse.headers.get('x-request-id') ?? providerResponse.headers.get('cf-ray') ?? undefined;
    const providerText = await providerResponse.text();
    let providerPayload;
    try {
      providerPayload = JSON.parse(providerText);
    } catch {
      console.error('Resend returned a non-JSON response.', {
        service: 'Resend',
        operation: 'send lead notification and customer confirmation',
        serviceInterest,
        status: providerResponse.status,
        requestId,
      });
      return htmlResponse(502, 'Message not delivered', 'Your form could not be delivered to the email provider. Please try again or call instead.');
    }

    const acceptedMessages = Array.isArray(providerPayload?.data) ? providerPayload.data : [];
    const accepted = providerResponse.ok
      && acceptedMessages.length === 2
      && acceptedMessages.every((message) => typeof message?.id === 'string' && message.id.length > 0);

    if (!accepted) {
      console.error('Resend rejected the delivery batch.', {
        service: 'Resend',
        operation: 'send lead notification and customer confirmation',
        serviceInterest,
        status: providerResponse.status,
        requestId,
        ...providerError(providerPayload),
      });
      return htmlResponse(502, 'Message not delivered', 'Your form could not be delivered to the email provider. Please try again or call instead.');
    }

    return successResponse(service, responseMode);
  },
};
