import process from 'node:process';

const successUrl = 'https://aiconsultingsa.com/?submitted=true#contact';
const contactUrl = 'https://aiconsultingsa.com/#contact';

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

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return htmlResponse(405, 'Method not allowed', 'This endpoint only accepts website form submissions.');
    }

    const recipient = process.env.LEAD_RECIPIENT_EMAIL?.trim();
    if (!recipient || !isValidEmail(recipient)) {
      console.error('Lead delivery unavailable: LEAD_RECIPIENT_EMAIL is missing or invalid.');
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

    const providerData = new FormData();
    providerData.set('name', lead.name);
    providerData.set('business', lead.business);
    providerData.set('email', lead.email);
    providerData.set('phone', lead.phone);
    providerData.set('workflow', lead.workflow);
    providerData.set('_subject', 'New AI Consulting SA website lead');
    providerData.set('_template', 'table');
    providerData.set('_captcha', 'false');
    providerData.set('_url', contactUrl);

    let providerResponse;
    try {
      providerResponse = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
        method: 'POST',
        headers: { accept: 'application/json' },
        body: providerData,
        signal: AbortSignal.timeout(10000),
      });
    } catch (error) {
      console.error('FormSubmit request failed.', { message: error instanceof Error ? error.message : String(error) });
      return htmlResponse(502, 'Message not delivered', 'Your form could not be delivered to the email provider. Please try again or call instead.');
    }

    const providerText = await providerResponse.text();
    let providerPayload;
    try {
      providerPayload = JSON.parse(providerText);
    } catch {
      console.error('FormSubmit returned a non-JSON response.', { status: providerResponse.status });
      return htmlResponse(502, 'Message not delivered', 'Your form could not be delivered to the email provider. Please try again or call instead.');
    }

    const accepted = providerResponse.ok && (providerPayload.success === true || providerPayload.success === 'true');
    if (!accepted) {
      console.error('FormSubmit rejected the lead.', {
        status: providerResponse.status,
        message: typeof providerPayload.message === 'string' ? providerPayload.message : 'No provider message',
      });
      return htmlResponse(502, 'Message not delivered', 'Your form could not be delivered to the email provider. Please try again or call instead.');
    }

    return Response.redirect(successUrl, 303);
  },
};
