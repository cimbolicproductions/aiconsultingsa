import process from 'node:process';

const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const hostnames = new Set(['aiconsultingsa.com', 'www.aiconsultingsa.com']);

export async function verifyLeadChallenge(formData) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  // Never silently disable protection, including when NODE_ENV is absent.
  if (!secret || /^[123]x0000000000000000000000000000000AA$/.test(secret)) {
    return { status: 503, message: 'Verification is temporarily unavailable. Please call instead.' };
  }
  const tokens = formData.getAll('cf-turnstile-response');
  const token = tokens[0];
  if (tokens.length !== 1 || typeof token !== 'string' || !token.trim() || token.length > 2048) {
    return { status: 400, message: 'Please return to the form and complete the verification before sending.' };
  }
  try {
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Siteverify HTTP ${response.status}`);
    const result = await response.json();
    if (result?.success !== true || result.action !== 'lead' || !hostnames.has(result.hostname)) {
      return { status: 400, message: 'Verification expired or could not be confirmed. Please return to the form and try again.' };
    }
    return { status: 200 };
  } catch (error) {
    // Do not log the token, secret, lead fields or provider response body.
    console.error('Lead challenge verification unavailable.', { name: error instanceof Error ? error.name : 'UnknownError' });
    return { status: 503, message: 'Verification is temporarily unavailable. Please try again or call instead.' };
  }
}
