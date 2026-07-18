# Root Cause Analysis: Live lead delivery failure

## Issue Summary

- **Title:** Production lead form cannot deliver submissions
- **Reported:** 2026-07-17
- **Severity:** High
- **Status:** Fix implemented locally; production configuration pending

## Problem Statement

The production form accepts valid contact details and reaches the Vercel Function at `/api/lead/`, but visitors receive a visible `Message not delivered` response instead of the success redirect.

## Steps to Reproduce

1. Open `https://aiconsultingsa.com/#contact`.
2. Complete every required field with valid data.
3. Submit the form.
4. Observe the provider failure page.

## Expected Behavior

The business receives the lead, the visitor receives a confirmation, and the browser redirects to `https://aiconsultingsa.com/?submitted=true#contact`.

## Actual Behavior

The API returns a visible 502 error page. No delivery success is claimed.

## Investigation

### Code Path Analysis

1. Both homepage forms post to `/api/lead/`.
2. `api/lead.js` reads and validates the form data.
3. The function confirms that `LEAD_RECIPIENT_EMAIL` exists and is valid.
4. The function sends a multipart request to FormSubmit's AJAX endpoint.
5. FormSubmit returns HTTP 403 with a non-JSON body.
6. The function correctly treats that response as a provider failure and returns HTTP 502.

### Timeline

| Time (CDT) | Event |
| --- | --- |
| 2026-07-17 21:50 | Commit `d227bb1` deployed to Vercel production. |
| 2026-07-17 21:53 | First production smoke test received FormSubmit HTTP 403. |
| 2026-07-17 22:00 | Repeated real submissions received the same HTTP 403. |

### Evidence

- Vercel production has an encrypted `LEAD_RECIPIENT_EMAIL` variable.
- Production logs contain three completed requests with `FormSubmit returned a non-JSON response. { status: 403 }`.
- The Vercel deployment, form route, asset routes, and validation tests otherwise pass.
- No production submission has received the success redirect.

## Root Cause

### Primary Cause

FormSubmit is rejecting the server-to-server delivery request with an opaque HTTP 403. The relay has no authenticated API contract, exposes no actionable response body through the current route, and is not a reliable production dependency for this form.

### Contributing Factors

- FormSubmit activation and anti-abuse behavior sit outside the application's control.
- The provider path was tested with mocks before deployment, not with a real production delivery.
- The original provider only covered the business notification and did not support the requested branded customer confirmation in the application contract.

### Why It Wasn't Caught

The tests correctly covered visible failure handling, validation, and mocked provider acceptance, but no authenticated production email service was available for an end-to-end delivery test before the first deployment.

## Impact Assessment

- **Users affected:** Every visitor who submits the live form while FormSubmit continues returning 403.
- **Frequency:** Reproduced on every valid production delivery attempt observed.
- **Workaround:** Call the published business phone number.

## Recommended Fix

Replace FormSubmit with Resend's authenticated batch email API. Send the internal lead notification and customer thank you email in one request, require `RESEND_API_KEY` and `RESEND_FROM_EMAIL`, preserve `LEAD_RECIPIENT_EMAIL`, and use an idempotency key to prevent duplicates on retry.

### Files to Modify

| File | Change |
| --- | --- |
| `api/lead.js` | Replace FormSubmit with authenticated Resend batch delivery. |
| `tests/lead-form-contract.test.mjs` | Cover configuration, payloads, duplicate protection, provider rejection, and success. |
| `.env.example` | Document the Resend server settings. |
| `README.md` | Document the new delivery architecture and setup. |
| `AGENTS.md` | Replace the stale FormSubmit project convention. |
| `docs/ai-tools-assessment/implementation-report.md` | Record the production failure and replacement. |

### Testing Strategy

- Reject missing or malformed Resend configuration without contacting the provider.
- Reject incomplete lead data before provider delivery.
- Verify the batch contains exactly one internal notification and one customer confirmation.
- Verify user supplied values are escaped in HTML.
- Verify an idempotency key is present.
- Preserve visible errors for network failures, invalid provider responses, and rejected batches.
- Redirect only after Resend accepts both messages.
- Run the lead contract tests, lint, and production build.
- Exercise a real production submission after the Resend domain and API key are configured.

## Risk Assessment

- A missing or unverified Resend domain will keep delivery unavailable. The function must return a visible error and log the provider request ID and safe error details.
- A retry could duplicate both emails. A deterministic 24 hour idempotency key mitigates this.
- User supplied text is rendered into an internal HTML email. It must be escaped before interpolation.

## Prevention

### Short Term

- Do not deploy the Resend code until all required production variables are configured.
- Require a real two-recipient smoke test before marking the fix complete.

### Long Term

- Add delivery event webhooks if bounce and complaint monitoring becomes operationally important.
- Keep external provider failures visible to visitors and detailed only in server logs.

## Implementation Result

- **Branch:** `codex/fix-resend-lead-delivery`
- **Fix:** Replaced FormSubmit with Resend's authenticated batch endpoint.
- **Emails:** One internal lead notification and one customer confirmation per accepted batch.
- **Safety:** Required server configuration, HTML escaping, fixed customer copy, an explicit API User Agent, a 10 second timeout, safe provider logging, and deterministic 24 hour idempotency.
- **Tests:** `npm run test:lead-form` passed 10 of 10.
- **Lint:** `npm run lint` passed.
- **Build:** `npm run build` passed with 1,703 modules transformed.
- **Production verification:** Pending `RESEND_API_KEY`, a verified sending domain, and `RESEND_FROM_EMAIL`.

## References

- Resend batch API: `https://resend.com/docs/api-reference/emails/send-batch-emails`
- Resend idempotency: `https://resend.com/docs/dashboard/emails/idempotency-keys`
- Production commit: `d227bb1`
