import process from 'node:process';

export default {
  async fetch(request) {
    const headers = { 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' };
    if (request.method !== 'GET') return new Response(null, { status: 405, headers });
    const siteKey = process.env.TURNSTILE_SITE_KEY?.trim();
    if (!siteKey || /^[123]x0+/.test(siteKey)) return Response.json({ error: 'Verification unavailable' }, { status: 503, headers });
    // Only the public site key is exposed here. The secret stays server-side.
    return Response.json({ siteKey }, { headers });
  },
};
