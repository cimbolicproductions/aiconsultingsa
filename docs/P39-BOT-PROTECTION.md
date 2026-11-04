# Lead form bot protection (P39)

The production site is https://aiconsultingsa.com, Vercel project
`ai-consulting-sa` (`prj_BqsbfYmxDr9RpEzinRFzA51NhMbc`), repository
`cimbolicproductions/aiconsultingsa`.

The existing `_honey` field discards automated submissions without sending mail.
All other valid submissions must pass Cloudflare Turnstile Siteverify before
the existing Resend two-message batch is created. Verification requires Boolean
`success: true`, action `lead`, and hostname `aiconsultingsa.com` or
`www.aiconsultingsa.com`. Missing, oversized or duplicated token fields,
failed/expired/replayed tokens, a different hostname/action, missing secret,
non-JSON provider responses, network errors and timeouts do not reach Resend.
Cloudflare's documented dummy secrets are refused. There is no NODE_ENV-based
bypass. Tokens, secrets and lead fields are not logged by this validation.

## Configuration before production release

1. Create a free managed Turnstile widget for `aiconsultingsa.com`, with
   pre-clearance off. No DNS or Cloudflare proxy migration is necessary.
2. Set `TURNSTILE_SITE_KEY` (public) and `TURNSTILE_SECRET_KEY` (sensitive,
   server only) in this Vercel project's Production environment. Do not put
   values in Git, public HTML or a frontend environment variable.
3. Verify configuration exists before deploying this branch. Do not merge an
   unconfigured build: it deliberately blocks all genuine submissions until
   the verification service is configured.
4. Merge/deploy the tested build and verify the live homepage, raw fallback
   and `/ai-phone-answering/` form. The public `/api/lead-challenge/` GET returns
   only the site key with no-store headers.
5. With Dom's explicit external-send approval, send one controlled form test
   using his own address. The unchanged batch produces an owner notification
   and a confirmation email. Provider acceptance alone does not prove inbox
   delivery: read back the actual messages before closing P39.
6. A missing-token or honeypot live probe must never send mail. Verify both.

## Browser behavior

`public/lead-challenge.js` covers the React homepage, its raw HTML fallback and
the static phone page. A MutationObserver initializes the replacement React
form after its fallback is removed. A single script/configuration request is
shared. Submit stays disabled until verification succeeds and is disabled
again on expiry, timeout or error. The widget uses compact sizing when the
form column is narrower than 300 px, avoiding Cloudflare's 300 px flexible
minimum. Configuration/script errors show a phone alternative. JavaScript is
required for Turnstile; noscript visitors get that explanation and phone number.
The API still rejects direct submissions without a verified token.

## Verification

`npm run test:lead-form`: existing delivery/attribution tests plus server challenge
cases. Challenge providers and Resend are explicit test doubles confined to
tests. Run `npm run build`, `npm run lint` and browser checks against the built
output. A local browser fixture can exercise callbacks without generating
real emails; it does not prove the live Cloudflare or inbox integration.

Official references:
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
- https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/
- https://developers.cloudflare.com/turnstile/troubleshooting/testing/
