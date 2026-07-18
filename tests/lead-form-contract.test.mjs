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

async function readPublicSources() {
  return Promise.all(publicSourcePaths.map((path) => readFile(path, 'utf8')));
}

function validLeadRequest() {
  const body = new URLSearchParams({
    name: 'Test Owner',
    business: 'Test Business',
    email: 'owner@example.com',
    phone: '',
    workflow: 'A repeated manual workflow that needs review.',
    _honey: '',
  });

  return new Request('https://aiconsultingsa.com/api/lead', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body,
  });
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
  assert.doesNotMatch(reactSource, /formsubmit\.co/i);
  assert.doesNotMatch(fallbackSource, /formsubmit\.co/i);
});

test('lead API fails visibly when recipient configuration is missing', async () => {
  const { default: leadFunction } = await import('../api/lead.js');
  const priorRecipient = process.env.LEAD_RECIPIENT_EMAIL;
  delete process.env.LEAD_RECIPIENT_EMAIL;

  try {
    const response = await leadFunction.fetch(validLeadRequest());
    assert.equal(response.status, 503);
    assert.match(await response.text(), /temporarily unavailable/i);
  } finally {
    if (priorRecipient === undefined) delete process.env.LEAD_RECIPIENT_EMAIL;
    else process.env.LEAD_RECIPIENT_EMAIL = priorRecipient;
  }
});

test('lead API does not redirect to success when FormSubmit fails', async () => {
  const { default: leadFunction } = await import('../api/lead.js');
  const priorRecipient = process.env.LEAD_RECIPIENT_EMAIL;
  const priorFetch = globalThis.fetch;
  process.env.LEAD_RECIPIENT_EMAIL = 'recipient@example.com';
  globalThis.fetch = async () => new Response('Provider unavailable', { status: 502 });

  try {
    const response = await leadFunction.fetch(validLeadRequest());
    assert.equal(response.status, 502);
    assert.equal(response.headers.get('location'), null);
    assert.match(await response.text(), /could not be delivered/i);
  } finally {
    globalThis.fetch = priorFetch;
    if (priorRecipient === undefined) delete process.env.LEAD_RECIPIENT_EMAIL;
    else process.env.LEAD_RECIPIENT_EMAIL = priorRecipient;
  }
});

test('lead API rejects incomplete lead data before calling FormSubmit', async () => {
  const { default: leadFunction } = await import('../api/lead.js');
  const priorRecipient = process.env.LEAD_RECIPIENT_EMAIL;
  const priorFetch = globalThis.fetch;
  let providerCalled = false;
  process.env.LEAD_RECIPIENT_EMAIL = 'recipient@example.com';
  globalThis.fetch = async () => {
    providerCalled = true;
    return Response.json({ success: 'true' });
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
    if (priorRecipient === undefined) delete process.env.LEAD_RECIPIENT_EMAIL;
    else process.env.LEAD_RECIPIENT_EMAIL = priorRecipient;
  }
});

test('lead API reports a provider network error without claiming success', async () => {
  const { default: leadFunction } = await import('../api/lead.js');
  const priorRecipient = process.env.LEAD_RECIPIENT_EMAIL;
  const priorFetch = globalThis.fetch;
  process.env.LEAD_RECIPIENT_EMAIL = 'recipient@example.com';
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
    if (priorRecipient === undefined) delete process.env.LEAD_RECIPIENT_EMAIL;
    else process.env.LEAD_RECIPIENT_EMAIL = priorRecipient;
  }
});

test('lead API redirects only after FormSubmit accepts the request', async () => {
  const { default: leadFunction } = await import('../api/lead.js');
  const priorRecipient = process.env.LEAD_RECIPIENT_EMAIL;
  const priorFetch = globalThis.fetch;
  process.env.LEAD_RECIPIENT_EMAIL = 'recipient@example.com';
  globalThis.fetch = async () => Response.json({ success: 'true' });

  try {
    const response = await leadFunction.fetch(validLeadRequest());
    assert.equal(response.status, 303);
    assert.equal(response.headers.get('location'), 'https://aiconsultingsa.com/?submitted=true#contact');
  } finally {
    globalThis.fetch = priorFetch;
    if (priorRecipient === undefined) delete process.env.LEAD_RECIPIENT_EMAIL;
    else process.env.LEAD_RECIPIENT_EMAIL = priorRecipient;
  }
});
