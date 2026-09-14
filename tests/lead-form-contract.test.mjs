import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const publicSourcePaths = [
  'src/AIConsultingServicesPage.jsx',
  'index.html',
  'public/ai-tools-assessment-san-antonio/index.html',
  'public/ai-phone-answering/index.html',
  'public/ai-document-automation-san-antonio/index.html',
  'public/small-business-automation-san-antonio/index.html',
  'public/chatgpt-optimization-san-antonio/index.html',
  'public/do-i-need-to-pay-for-ai-san-antonio/index.html',
  'public/campaign-fields.js',
];

const emailEnvironmentKeys = [
  'LEAD_RECIPIENT_EMAIL',
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
];

async function readPublicSources() {
  return Promise.all(publicSourcePaths.map((path) => readFile(path, 'utf8')));
}

function validLeadRequest(overrides = {}) {
  const body = new URLSearchParams({
    name: 'Test Owner',
    business: 'Test Business',
    email: 'owner@example.com',
    phone: '',
    workflow: 'A repeated manual workflow that needs review.',
    _honey: '',
    ...overrides,
  });

  return new Request('https://aiconsultingsa.com/api/lead', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  });
}

/*
 * Records every provider call so a test can assert on the batch that was sent,
 * and returns an accepted two message batch unless told otherwise.
 */
async function withAcceptingProvider(run, providerResult) {
  const { default: leadFunction } = await import('../api/lead.js');
  const priorEnvironment = rememberEmailEnvironment();
  const priorFetch = globalThis.fetch;
  const requests = [];
  configureEmailEnvironment();
  globalThis.fetch = async (url, options) => {
    requests.push({ url, options });
    if (providerResult) return providerResult();
    return Response.json({ data: [{ id: 'internal-message' }, { id: 'customer-message' }] });
  };

  try {
    return await run({ leadFunction, requests });
  } finally {
    globalThis.fetch = priorFetch;
    restoreEmailEnvironment(priorEnvironment);
  }
}

function sentBatch(requests, index = 0) {
  return JSON.parse(requests[index].options.body);
}

function retryKey(requests, index = 0) {
  return new Headers(requests[index].options.headers).get('idempotency-key');
}

function rememberEmailEnvironment() {
  return Object.fromEntries(emailEnvironmentKeys.map((key) => [key, process.env[key]]));
}

function restoreEmailEnvironment(priorEnvironment) {
  for (const key of emailEnvironmentKeys) {
    if (priorEnvironment[key] === undefined) delete process.env[key];
    else process.env[key] = priorEnvironment[key];
  }
}

function configureEmailEnvironment() {
  process.env.LEAD_RECIPIENT_EMAIL = 'recipient@example.com';
  process.env.RESEND_API_KEY = 're_test_key';
  process.env.RESEND_FROM_EMAIL = 'AI Consulting SA <hello@aiconsultingsa.com>';
}

test('public website copy does not impose a 2 to 20 employee limit', async () => {
  const sources = await readPublicSources();
  for (const [index, source] of sources.entries()) {
    assert.doesNotMatch(source, /\b2\s+to\s+20\b|\b2\s*[-–]\s*20\b/i, publicSourcePaths[index]);
  }
});

test('public website source does not expose the recipient email', async () => {
  const sources = await readPublicSources();
  for (const [index, source] of sources.entries()) {
    assert.doesNotMatch(source, /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i, publicSourcePaths[index]);
  }
});

test('React and fallback forms submit through the private API route', async () => {
  const [reactSource, fallbackSource] = await Promise.all([
    readFile('src/AIConsultingServicesPage.jsx', 'utf8'),
    readFile('index.html', 'utf8'),
  ]);

  assert.match(reactSource, /const formAction = '\/api\/lead\/';/);
  assert.match(fallbackSource, /<form action="\/api\/lead\/" method="POST"/);
  assert.doesNotMatch(reactSource, /formsubmit\.co|api\.resend\.com/i);
  assert.doesNotMatch(fallbackSource, /formsubmit\.co|api\.resend\.com/i);
});

test('lead API fails visibly when Resend configuration is missing', async () => {
  const { default: leadFunction } = await import('../api/lead.js');
  const priorEnvironment = rememberEmailEnvironment();
  const priorFetch = globalThis.fetch;
  let providerCalled = false;
  for (const key of emailEnvironmentKeys) delete process.env[key];
  globalThis.fetch = async () => {
    providerCalled = true;
    return Response.json({ data: [] });
  };

  try {
    const response = await leadFunction.fetch(validLeadRequest());
    assert.equal(response.status, 503);
    assert.equal(providerCalled, false);
    assert.match(await response.text(), /temporarily unavailable/i);
  } finally {
    globalThis.fetch = priorFetch;
    restoreEmailEnvironment(priorEnvironment);
  }
});

test('lead API rejects an invalid Resend sender before delivery', async () => {
  const { default: leadFunction } = await import('../api/lead.js');
  const priorEnvironment = rememberEmailEnvironment();
  const priorFetch = globalThis.fetch;
  let providerCalled = false;
  configureEmailEnvironment();
  process.env.RESEND_FROM_EMAIL = 'not-an-email';
  globalThis.fetch = async () => {
    providerCalled = true;
    return Response.json({ data: [] });
  };

  try {
    const response = await leadFunction.fetch(validLeadRequest());
    assert.equal(response.status, 503);
    assert.equal(providerCalled, false);
  } finally {
    globalThis.fetch = priorFetch;
    restoreEmailEnvironment(priorEnvironment);
  }
});

test('lead API does not redirect to success when Resend fails', async () => {
  const { default: leadFunction } = await import('../api/lead.js');
  const priorEnvironment = rememberEmailEnvironment();
  const priorFetch = globalThis.fetch;
  configureEmailEnvironment();
  globalThis.fetch = async () => Response.json({
    name: 'validation_error',
    message: 'Provider unavailable',
  }, { status: 422 });

  try {
    const response = await leadFunction.fetch(validLeadRequest());
    assert.equal(response.status, 502);
    assert.equal(response.headers.get('location'), null);
    assert.match(await response.text(), /could not be delivered/i);
  } finally {
    globalThis.fetch = priorFetch;
    restoreEmailEnvironment(priorEnvironment);
  }
});

test('lead API rejects incomplete lead data before calling Resend', async () => {
  const { default: leadFunction } = await import('../api/lead.js');
  const priorEnvironment = rememberEmailEnvironment();
  const priorFetch = globalThis.fetch;
  let providerCalled = false;
  configureEmailEnvironment();
  globalThis.fetch = async () => {
    providerCalled = true;
    return Response.json({ data: [] });
  };

  try {
    const body = new URLSearchParams({ name: '', business: '', email: 'not-an-email', workflow: '' });
    const request = new Request('https://aiconsultingsa.com/api/lead', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });
    const response = await leadFunction.fetch(request);
    assert.equal(response.status, 400);
    assert.equal(providerCalled, false);
  } finally {
    globalThis.fetch = priorFetch;
    restoreEmailEnvironment(priorEnvironment);
  }
});

test('lead API reports a Resend network error without claiming success', async () => {
  const { default: leadFunction } = await import('../api/lead.js');
  const priorEnvironment = rememberEmailEnvironment();
  const priorFetch = globalThis.fetch;
  configureEmailEnvironment();
  globalThis.fetch = async () => {
    throw new Error('simulated connection failure');
  };

  try {
    const response = await leadFunction.fetch(validLeadRequest());
    assert.equal(response.status, 502);
    assert.equal(response.headers.get('location'), null);
    assert.match(await response.text(), /could not be delivered/i);
  } finally {
    globalThis.fetch = priorFetch;
    restoreEmailEnvironment(priorEnvironment);
  }
});

test('lead API rejects a malformed Resend success response', async () => {
  const { default: leadFunction } = await import('../api/lead.js');
  const priorEnvironment = rememberEmailEnvironment();
  const priorFetch = globalThis.fetch;
  configureEmailEnvironment();
  globalThis.fetch = async () => Response.json({ data: [{ id: 'only-one-email' }] });

  try {
    const response = await leadFunction.fetch(validLeadRequest());
    assert.equal(response.status, 502);
    assert.equal(response.headers.get('location'), null);
  } finally {
    globalThis.fetch = priorFetch;
    restoreEmailEnvironment(priorEnvironment);
  }
});

test('lead API sends an internal notification and customer confirmation through Resend', async () => {
  const { default: leadFunction } = await import('../api/lead.js');
  const priorEnvironment = rememberEmailEnvironment();
  const priorFetch = globalThis.fetch;
  const requests = [];
  configureEmailEnvironment();
  globalThis.fetch = async (url, options) => {
    requests.push({ url, options });
    return Response.json({ data: [{ id: 'internal-message' }, { id: 'customer-message' }] });
  };

  try {
    const request = validLeadRequest({
      name: 'Taylor <script>alert(1)</script>',
      workflow: 'Copying <b>customer data</b> between two systems every afternoon.',
    });
    const firstResponse = await leadFunction.fetch(request);
    const secondResponse = await leadFunction.fetch(validLeadRequest({
      name: 'Taylor <script>alert(1)</script>',
      workflow: 'Copying <b>customer data</b> between two systems every afternoon.',
    }));

    assert.equal(firstResponse.status, 303);
    assert.equal(firstResponse.headers.get('location'), 'https://aiconsultingsa.com/?submitted=true#contact');
    assert.equal(secondResponse.status, 303);
    assert.equal(requests.length, 2);

    const firstRequest = requests[0];
    const secondRequest = requests[1];
    const headers = new Headers(firstRequest.options.headers);
    const secondHeaders = new Headers(secondRequest.options.headers);
    const payload = JSON.parse(firstRequest.options.body);

    assert.equal(firstRequest.url, 'https://api.resend.com/emails/batch');
    assert.equal(firstRequest.options.method, 'POST');
    assert.equal(headers.get('authorization'), 'Bearer re_test_key');
    assert.equal(headers.get('content-type'), 'application/json');
    assert.equal(headers.get('user-agent'), 'AI Consulting SA Website/1.0');
    assert.match(headers.get('idempotency-key'), /^website-lead\/[a-f0-9]{48}$/);
    assert.equal(headers.get('idempotency-key'), secondHeaders.get('idempotency-key'));

    assert.equal(payload.length, 2);
    assert.deepEqual(payload[0].to, ['recipient@example.com']);
    assert.equal(payload[0].reply_to, 'owner@example.com');
    assert.match(payload[0].text, /Test Business/);
    assert.match(payload[0].html, /Taylor &lt;script&gt;alert\(1\)&lt;\/script&gt;/);
    assert.doesNotMatch(payload[0].html, /<script>alert\(1\)<\/script>/);
    assert.match(payload[0].html, /Copying &lt;b&gt;customer data&lt;\/b&gt;/);

    assert.deepEqual(payload[1].to, ['owner@example.com']);
    assert.equal(payload[1].reply_to, 'recipient@example.com');
    assert.equal(payload[1].subject, 'Thanks for contacting AI Consulting SA');
    assert.match(payload[1].text, /I received your note/);
    assert.match(payload[1].html, /Thanks, Taylor/);
  } finally {
    globalThis.fetch = priorFetch;
    restoreEmailEnvironment(priorEnvironment);
  }
});

test('a phone inquiry gets phone confirmation copy and the phone page redirect', async () => {
  await withAcceptingProvider(async ({ leadFunction, requests }) => {
    const response = await leadFunction.fetch(validLeadRequest({
      service_interest: 'phone_reception',
      landing_path: '/ai-phone-answering/',
      response_mode: 'redirect',
      workflow: 'Calls after closing go to voicemail and nobody calls them back.',
    }));

    assert.equal(response.status, 303);
    assert.equal(
      response.headers.get('location'),
      'https://aiconsultingsa.com/ai-phone-answering/?submitted=true#phone-fit',
    );

    const [notification, confirmation] = sentBatch(requests);

    assert.equal(notification.subject, 'New lead: AI phone answering');
    assert.match(notification.text, /Service asked about: AI phone answering \(auto shop\)/);
    assert.match(notification.text, /Landing page: \/ai-phone-answering\//);
    assert.match(notification.html, /AI phone answering \(auto shop\)/);
    assert.match(notification.html, /\/ai-phone-answering\//);

    assert.equal(confirmation.subject, 'Thanks for asking about phone answering');
    assert.match(confirmation.text, /Thanks for asking about phone answering for your shop\./);
    assert.match(confirmation.text, /does not activate a service or book a repair appointment/);
    assert.match(confirmation.html, /does not activate a service or book a repair appointment/);
    assert.doesNotMatch(confirmation.text, /\$999/);
    assert.doesNotMatch(confirmation.html, /\$999/);
  });
});

test('a general inquiry never prescribes the $999 assessment', async () => {
  await withAcceptingProvider(async ({ leadFunction, requests }) => {
    const response = await leadFunction.fetch(validLeadRequest());

    assert.equal(response.status, 303);
    assert.equal(response.headers.get('location'), 'https://aiconsultingsa.com/?submitted=true#contact');

    const [notification, confirmation] = sentBatch(requests);
    assert.equal(notification.subject, 'New AI Consulting SA website lead');
    assert.match(notification.text, /Service asked about: Not specified/);
    assert.doesNotMatch(confirmation.text, /\$999/);
    assert.doesNotMatch(confirmation.html, /\$999/);
    assert.match(confirmation.text, /useful next step/);
  });
});

test('an explicitly selected assessment may name the assessment', async () => {
  await withAcceptingProvider(async ({ leadFunction, requests }) => {
    const response = await leadFunction.fetch(validLeadRequest({ service_interest: 'assessment' }));

    assert.equal(response.status, 303);
    assert.equal(response.headers.get('location'), 'https://aiconsultingsa.com/?submitted=true#contact');

    const [, confirmation] = sentBatch(requests);
    assert.match(confirmation.text, /\$999 assessment/);
    assert.match(confirmation.text, /does not start the assessment/);
  });
});

test('an unknown service interest becomes general and never reaches a subject or redirect', async () => {
  const hostileValues = ['constructor', 'toString', '__proto__', 'phone_reception; drop', '<script>x</script>', ''];

  for (const hostile of hostileValues) {
    await withAcceptingProvider(async ({ leadFunction, requests }) => {
      const response = await leadFunction.fetch(validLeadRequest({ service_interest: hostile }));

      assert.equal(response.status, 303, hostile);
      assert.equal(response.headers.get('location'), 'https://aiconsultingsa.com/?submitted=true#contact', hostile);

      const [notification, confirmation] = sentBatch(requests);
      assert.equal(notification.subject, 'New AI Consulting SA website lead', hostile);
      assert.equal(confirmation.subject, 'Thanks for contacting AI Consulting SA', hostile);
      assert.match(notification.text, /Service asked about: Not specified/, hostile);
    });
  }
});

test('valid campaign fields reach the owner notification only', async () => {
  await withAcceptingProvider(async ({ leadFunction, requests }) => {
    await leadFunction.fetch(validLeadRequest({
      service_interest: 'phone_reception',
      utm_source: 'outbound',
      utm_medium: 'email',
      utm_campaign: 'sa_auto_pilot',
      utm_content: 'opener-a',
    }));

    const [notification, confirmation] = sentBatch(requests);
    assert.match(notification.text, /Campaign: source=outbound, medium=email, campaign=sa_auto_pilot, content=opener-a/);
    assert.match(notification.html, /source=outbound, medium=email, campaign=sa_auto_pilot, content=opener-a/);
    assert.doesNotMatch(confirmation.text, /sa_auto_pilot/);
    assert.doesNotMatch(confirmation.html, /sa_auto_pilot/);
  });
});

test('malformed campaign values and landing paths are dropped, not forwarded', async () => {
  await withAcceptingProvider(async ({ leadFunction, requests }) => {
    await leadFunction.fetch(validLeadRequest({
      utm_source: 'owner@example.com',
      utm_medium: 'e mail',
      utm_campaign: '<script>alert(1)</script>',
      utm_content: 'x'.repeat(81),
      landing_path: '/ai-phone-answering/?utm_source=evil#frag',
    }));

    const [notification] = sentBatch(requests);
    assert.match(notification.text, /Campaign: None/);
    assert.match(notification.text, /Landing page: Not provided/);
    assert.doesNotMatch(notification.text, /alert\(1\)/);
    assert.doesNotMatch(notification.html, /alert\(1\)/);
    assert.doesNotMatch(notification.text, /evil/);
  });
});

test('the retry key tracks service interest and ignores campaign changes', async () => {
  await withAcceptingProvider(async ({ leadFunction, requests }) => {
    await leadFunction.fetch(validLeadRequest({ service_interest: 'phone_reception', utm_campaign: 'sa_auto_pilot' }));
    await leadFunction.fetch(validLeadRequest({ service_interest: 'phone_reception', utm_campaign: 'other_campaign' }));
    await leadFunction.fetch(validLeadRequest({ service_interest: 'assessment', utm_campaign: 'sa_auto_pilot' }));

    assert.equal(requests.length, 3);
    assert.equal(retryKey(requests, 0), retryKey(requests, 1), 'a retagged link must not manufacture a second send');
    assert.notEqual(retryKey(requests, 0), retryKey(requests, 2), 'a different service is a different lead');
    assert.match(retryKey(requests, 0), /^website-lead\/[a-f0-9]{48}$/);
  });
});

test('a submission without JavaScript gets a server rendered service specific confirmation', async () => {
  await withAcceptingProvider(async ({ leadFunction }) => {
    const response = await leadFunction.fetch(validLeadRequest({
      service_interest: 'phone_reception',
      response_mode: 'html',
    }));

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('location'), null);

    const body = await response.text();
    assert.match(body, /role="status"/);
    assert.match(body, /Thanks for asking about phone answering for your shop\./);
    assert.match(body, /href="https:\/\/aiconsultingsa\.com\/ai-phone-answering\/"/);
    assert.match(body, /noindex/);
    assert.doesNotMatch(body, /\$999/);
  });
});

test('html mode still refuses to confirm when the provider rejects the batch', async () => {
  await withAcceptingProvider(async ({ leadFunction }) => {
    const response = await leadFunction.fetch(validLeadRequest({
      service_interest: 'phone_reception',
      response_mode: 'html',
    }));

    assert.equal(response.status, 502);
    const body = await response.text();
    assert.match(body, /could not be delivered/i);
    assert.doesNotMatch(body, /Thanks for asking about phone answering/);
  }, () => Response.json({ data: [{ id: 'only-one-message' }] }));
});

test('an unrecognised response mode falls back to the existing redirect behaviour', async () => {
  await withAcceptingProvider(async ({ leadFunction }) => {
    const response = await leadFunction.fetch(validLeadRequest({ response_mode: 'javascript:alert(1)' }));

    assert.equal(response.status, 303);
    assert.equal(response.headers.get('location'), 'https://aiconsultingsa.com/?submitted=true#contact');
  });
});

test('a honeypot submission never reaches the email provider', async () => {
  await withAcceptingProvider(async ({ leadFunction, requests }) => {
    const response = await leadFunction.fetch(validLeadRequest({
      service_interest: 'phone_reception',
      response_mode: 'redirect',
      _honey: 'i am a bot',
    }));

    assert.equal(requests.length, 0);
    assert.equal(response.status, 303);
    assert.equal(
      response.headers.get('location'),
      'https://aiconsultingsa.com/ai-phone-answering/?submitted=true#phone-fit',
    );
  });
});

test('the phone page ships a working no-JavaScript inquiry path', async () => {
  const source = await readFile('public/ai-phone-answering/index.html', 'utf8');

  assert.match(source, /<form[^>]*id="phone-fit-form"/);
  assert.match(source, /action="\/api\/lead\/"/);
  assert.match(source, /<input type="hidden" name="service_interest" value="phone_reception" \/>/);
  assert.match(source, /<input type="hidden" name="landing_path" value="\/ai-phone-answering\/" \/>/);
  assert.match(source, /<input type="hidden" name="response_mode" value="html" \/>/);
  for (const field of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    assert.match(source, new RegExp(`<input type="hidden" name="${field}" value="" \\/>`), field);
  }
  assert.match(source, /id="phone-fit"/);
  assert.doesNotMatch(source, /formsubmit\.co|api\.resend\.com/i);
});

test('the phone page separates the demo line from the business line', async () => {
  const source = await readFile('public/ai-phone-answering/index.html', 'utf8');

  assert.match(source, /href="tel:\+15139607996"/);
  assert.match(source, /\(513\) 960-7996/);
  assert.match(source, /href="tel:\+12108028945"/);
  assert.match(source, /\(210\) 802-8945/);
  assert.match(source, /This live AI demonstration records calls\./);
  assert.match(source, /This line does not accept repair appointments\./);
  assert.match(source, /not local to San Antonio/);
});

test('no public page claims a current phone customer or an assessment prerequisite', async () => {
  const sources = await readPublicSources();
  for (const [index, source] of sources.entries()) {
    const path = publicSourcePaths[index];
    assert.doesNotMatch(source, /whether (he|it|they) renews?/i, path);
    assert.doesNotMatch(source, /has paid one month so far/i, path);
    assert.doesNotMatch(source, /live since/i, path);
    assert.doesNotMatch(source, /I make sure it/i, path);
    assert.doesNotMatch(source, /\$4 one time/i, path);
  }
});

test('the phone page leads with the auto shop offer, not an assessment', async () => {
  const source = await readFile('public/ai-phone-answering/index.html', 'utf8');

  assert.doesNotMatch(source, /Assessment first/i);
  assert.doesNotMatch(source, /whatever calendar/i);
  assert.match(source, /\$250\/month, with no setup fee/);
  assert.match(source, /ended on 5 September 2026/);
  assert.match(source, /paid for one month and cancelled/);
  assert.match(source, /<title>AI Phone Answering for San Antonio Auto Shops \| AI Consulting SA<\/title>/);
  assert.match(source, /<link rel="canonical" href="https:\/\/aiconsultingsa\.com\/ai-phone-answering\/" \/>/);
});
