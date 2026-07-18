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
