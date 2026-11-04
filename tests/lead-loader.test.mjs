import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

test('async Cloudflare initialization waits for the provider callback and never calls ready()', async () => {
  const source = await readFile('public/lead-challenge.js', 'utf8');
  const button = {};
  const message = {};
  let renders = 0;
  let loadCallback;
  let clearTimeoutCalls = 0;
  const widget = { getBoundingClientRect: () => ({ width: 240 }) };
  const form = { querySelector: () => button, addEventListener() {} };
  const container = { isConnected: true, closest: () => form, querySelector: selector => selector === '[role="status"]' ? message : widget };
  const window = { turnstile: { ready() { throw new Error('Real provider rejects ready() on async scripts'); }, render(el, options) { assert.equal(el, widget); assert.equal(options.size, 'compact'); renders++; return 'widget'; } } };
  vm.runInNewContext(source, {
    window,
    document: { documentElement: {}, querySelectorAll: () => [container], createElement: () => ({}), head: { append(script) { assert.equal(script.async, true); loadCallback = new URL(script.src).searchParams.get('onload'); assert.equal(typeof window[loadCallback], 'function'); script.onload?.(); } } },
    fetch: async () => ({ ok: true, json: async () => ({ siteKey: 'public-key' }) }),
    MutationObserver: class { observe() {} },
    setTimeout: () => 1,
    clearTimeout: () => { clearTimeoutCalls++; },
  });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(renders, 0, 'script load alone must not race API initialization');
  assert.equal(button.disabled, true);
  window[loadCallback]();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(renders, 1);
  assert.equal(clearTimeoutCalls, 1);
  assert.equal(window[loadCallback], undefined);
});
