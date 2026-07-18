import { createHash } from 'node:crypto';
import process from 'node:process';

const successUrl = 'https://aiconsultingsa.com/?submitted=true#contact';
const contactUrl = 'https://aiconsultingsa.com/#contact';
const resendBatchUrl = 'https://api.resend.com/emails/batch';

function htmlResponse(status, title, message) {
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
        <p>${message}</p>
        <p><a href="${contactUrl}">Return to the form</a> or call <a href="tel:+12108028945">(210) 802-8945</a>.</p>
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

function readField(formData, name, maximumLength) {
  const value = formData.get(name);
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maximumLength);
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

function createDeliveryBatch({ lead, recipient, sender }) {
  const safeName = escapeHtml(lead.name);
  const safeBusiness = escapeHtml(lead.business);
  const safeEmail = escapeHtml(lead.email);
  const safePhone = escapeHtml(lead.phone || 'Not provided');
  const safeWorkflow = escapeHtml(lead.workflow);
  const safeFirstName = escapeHtml(firstName(lead.name));

  const notificationText = [
    'New AI Consulting SA website lead',
    '',
    `Name: ${lead.name}`,
    `Business: ${lead.business}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || 'Not provided'}`,
    '',
    'Workflow:',
    lead.workflow,
  ].join('\n');

  const confirmationText = [
    `Hi ${firstName(lead.name)},`,
    '',
    'Thanks for sharing the workflow that is taking up your time. I received your note and will review it personally.',
    '',
    'I will follow up using the contact details you provided and let you know whether the $999 AI Tools Assessment looks like the right next step.',
    '',
    'Dominic',
    'AI Consulting SA',
    '(210) 802-8945',
    'https://aiconsultingsa.com',
    '',
    'You are receiving this confirmation because you submitted the contact form at aiconsultingsa.com.',
  ].join('\n');

  return [
    {
      from: sender,
      to: [recipient],
      reply_to: lead.email,
      subject: 'New AI Consulting SA website lead',
      text: notificationText,
      html: `
        <div style="background:#f5f5f4;padding:32px 16px;font-family:Arial,sans-serif;color:#0f172a;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;">
            <p style="margin:0 0 8px;color:#2563eb;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">New website lead</p>
            <h1 style="margin:0 0 24px;font-size:26px;">${safeBusiness}</h1>
            <table style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.6;">
              <tr><td style="padding:8px 12px 8px 0;font-weight:700;vertical-align:top;">Name</td><td style="padding:8px 0;">${safeName}</td></tr>
              <tr><td style="padding:8px 12px 8px 0;font-weight:700;vertical-align:top;">Email</td><td style="padding:8px 0;"><a href="mailto:${safeEmail}" style="color:#2563eb;">${safeEmail}</a></td></tr>
              <tr><td style="padding:8px 12px 8px 0;font-weight:700;vertical-align:top;">Phone</td><td style="padding:8px 0;">${safePhone}</td></tr>
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
      subject: 'Thanks for contacting AI Consulting SA',
      text: confirmationText,
      html: `
        <div style="background:#f5f5f4;padding:32px 16px;font-family:Arial,sans-serif;color:#0f172a;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:36px;">
            <p style="margin:0 0 8px;color:#2563eb;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">AI Consulting SA</p>
            <h1 style="margin:0 0 24px;font-size:28px;line-height:1.2;">Thanks, ${safeFirstName}. I received your workflow.</h1>
            <p style="margin:0 0 18px;color:#334155;font-size:16px;line-height:1.7;">Thanks for sharing the workflow that is taking up your time. I will review it personally.</p>
            <p style="margin:0 0 24px;color:#334155;font-size:16px;line-height:1.7;">I will follow up using the contact details you provided and let you know whether the $999 AI Tools Assessment looks like the right next step.</p>
            <p style="margin:0;color:#0f172a;font-size:16px;line-height:1.7;">Dominic<br />AI Consulting SA<br /><a href="tel:+12108028945" style="color:#2563eb;">(210) 802-8945</a><br /><a href="https://aiconsultingsa.com" style="color:#2563eb;">aiconsultingsa.com</a></p>
            <p style="margin:32px 0 0;border-top:1px solid #e2e8f0;padding-top:18px;color:#64748b;font-size:12px;line-height:1.6;">You are receiving this confirmation because you submitted the contact form at aiconsultingsa.com.</p>
          </div>
        </div>`,
      tags: [{ name: 'category', value: 'lead_confirmation' }],
    },
  ];
}

function createIdempotencyKey(lead) {
  const fingerprint = [lead.email.toLowerCase(), lead.business.toLowerCase(), lead.phone, lead.workflow].join('\n');
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

    const honey = readField(formData, '_honey', 200);
    if (honey) return Response.redirect(successUrl, 303);

    const lead = {
      name: readField(formData, 'name', 100),
      business: readField(formData, 'business', 150),
      email: readField(formData, 'email', 254),
      phone: readField(formData, 'phone', 50),
      workflow: readField(formData, 'workflow', 5000),
    };

    if (lead.name.length < 2 || lead.business.length < 2 || !isValidEmail(lead.email) || lead.workflow.length < 10) {
      return htmlResponse(400, 'Check the form', 'Name, business, a valid email, and a clear workflow description are required.');
    }

    const deliveryBatch = createDeliveryBatch({ lead, recipient, sender });
    let providerResponse;
    try {
      providerResponse = await fetch(resendBatchUrl, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${resendApiKey}`,
          'content-type': 'application/json',
          'idempotency-key': createIdempotencyKey(lead),
          'user-agent': 'AI Consulting SA Website/1.0',
        },
        body: JSON.stringify(deliveryBatch),
        signal: AbortSignal.timeout(10000),
      });
    } catch (error) {
      console.error('Resend batch request failed.', {
        service: 'Resend',
        operation: 'send lead notification and customer confirmation',
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
        status: providerResponse.status,
        requestId,
        ...providerError(providerPayload),
      });
      return htmlResponse(502, 'Message not delivered', 'Your form could not be delivered to the email provider. Please try again or call instead.');
    }

    return Response.redirect(successUrl, 303);
  },
};
