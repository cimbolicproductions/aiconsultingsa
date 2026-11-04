import assert from 'node:assert/strict';
import test from 'node:test';
import process from 'node:process';
import { readFile } from 'node:fs/promises';
import lead from '../api/lead.js';
import configuration from '../api/lead-challenge.js';

function request(token = 'test-token', honey = '') {
  const body = new FormData();
  for (const [key, value] of Object.entries({ name: 'Test Owner', business: 'Test Business', email: 'owner@example.com', workflow: 'Testing a repeated manual workflow.', _honey: honey })) body.set(key, value);
  if (token !== null) body.set('cf-turnstile-response', token);
  return body;
}

async function exercise({ token = 'test-token', honey = '', secret = 'test-only-secret', response, throws = false, duplicate = false } = {}) {
  const keys = ['RESEND_API_KEY', 'RESEND_FROM_EMAIL', 'LEAD_RECIPIENT_EMAIL', 'TURNSTILE_SECRET_KEY', 'TURNSTILE_SITE_KEY'];
  const prior = Object.fromEntries(keys.map(k => [k, process.env[k]]));
  const oldFetch = globalThis.fetch;
  process.env.RESEND_API_KEY = 're_test_key';
  process.env.RESEND_FROM_EMAIL = 'hello@aiconsultingsa.com';
  process.env.LEAD_RECIPIENT_EMAIL = 'recipient@example.com';
  if (secret === null) delete process.env.TURNSTILE_SECRET_KEY;
  else process.env.TURNSTILE_SECRET_KEY = secret;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    if (url.includes('siteverify')) {
      if (throws) throw new Error('simulated timeout');
      return response ? response() : Response.json({ success: true, action: 'lead', hostname: 'aiconsultingsa.com' });
    }
    return Response.json({ data: [{ id: 'owner' }, { id: 'confirmation' }] });
  };
  try {
    const body = request(token, honey);
    if (duplicate) body.append('cf-turnstile-response', 'second-token');
    const res = await lead.fetch(new Request('https://aiconsultingsa.com/api/lead/', { method: 'POST', body }));
    return { status: res.status, text: await res.text(), calls };
  } finally {
    globalThis.fetch = oldFetch;
    for (const k of keys) { if (prior[k] === undefined) delete process.env[k]; else process.env[k] = prior[k]; }
  }
}

test('missing, empty, oversized and duplicate tokens never reach Siteverify or Resend', async () => {
  for (const options of [{ token: null }, { token: '' }, { token: 'x'.repeat(2049) }, { duplicate: true }]) {
    const r = await exercise(options);
    assert.equal(r.status, 400);
    assert.equal(r.calls.length, 0);
  }
});

test('missing secret and Cloudflare dummy secrets fail closed without NODE_ENV assumptions', async () => {
  for (const secret of [null, '', '1x0000000000000000000000000000000AA', '2x0000000000000000000000000000000AA', '3x0000000000000000000000000000000AA']) {
    const r = await exercise({ secret });
    assert.equal(r.status, 503);
    assert.equal(r.calls.length, 0);
  }
});

test('forged, expired/replayed, wrong-host and wrong-action verification never sends email', async () => {
  for (const payload of [{ success: false, 'error-codes': ['invalid-input-response'] }, { success: false, 'error-codes': ['timeout-or-duplicate'] }, { success: true, action: 'lead', hostname: 'attacker.example' }, { success: true, action: 'login', hostname: 'aiconsultingsa.com' }, { success: 'true', action: 'lead', hostname: 'aiconsultingsa.com' }, null]) {
    const r = await exercise({ response: () => Response.json(payload) });
    assert.equal(r.status, 400);
    assert.equal(r.calls.length, 1);
    assert.match(r.calls[0].url, /siteverify$/);
  }
});

test('Siteverify timeout, non-JSON and HTTP failures never send email or claim success', async () => {
  for (const options of [{ throws: true }, { response: () => new Response('unavailable', { status: 503 }) }, { response: () => new Response('not json') }]) {
    const r = await exercise(options);
    assert.equal(r.status, 503);
    assert.equal(r.calls.length, 1);
    assert.doesNotMatch(r.text, /Message sent/);
  }
});

test('honeypot is discarded before challenge and email providers', async () => {
  const r = await exercise({ honey: 'bot filled this', token: null });
  assert.equal(r.status, 303);
  assert.equal(r.calls.length, 0);
});

test('valid challenge is verified first, then the unchanged two-email batch is sent', async () => {
  const r = await exercise();
  assert.equal(r.status, 303);
  assert.equal(r.calls.length, 2);
  assert.equal(r.calls[0].url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
  assert.deepEqual(r.calls[0].body, { secret: 'test-only-secret', response: 'test-token' });
  assert.equal(r.calls[1].url, 'https://api.resend.com/emails/batch');
  assert.equal(r.calls[1].body.length, 2);
  assert.equal(r.calls[1].body[0].subject, 'New AI Consulting SA website lead');
});

test('public config exposes only the public site key and refuses absent/dummy keys', async () => {
  const prior = process.env.TURNSTILE_SITE_KEY;
  try {
    delete process.env.TURNSTILE_SITE_KEY;
    assert.equal((await configuration.fetch(new Request('https://aiconsultingsa.com/api/lead-challenge/'))).status, 503);
    process.env.TURNSTILE_SITE_KEY = '1x00000000000000000000AA';
    assert.equal((await configuration.fetch(new Request('https://aiconsultingsa.com/api/lead-challenge/'))).status, 503);
    process.env.TURNSTILE_SITE_KEY = 'public-site-key';
    const r = await configuration.fetch(new Request('https://aiconsultingsa.com/api/lead-challenge/'));
    assert.equal(r.headers.get('cache-control'), 'no-store');
    assert.deepEqual(await r.json(), { siteKey: 'public-site-key' });
  } finally { if (prior === undefined) delete process.env.TURNSTILE_SITE_KEY; else process.env.TURNSTILE_SITE_KEY = prior; }
});

test('all form copies load verification and keep the existing honeypot', async () => {
  for (const name of ['index.html', 'src/AIConsultingServicesPage.jsx', 'public/ai-phone-answering/index.html']) {
    const source = await readFile(name, 'utf8');
    assert.match(source, /data-lead-challenge/);
    assert.match(source, /name="_honey"/);
    assert.match(source, /Enable JavaScript to verify/);
  }
});
