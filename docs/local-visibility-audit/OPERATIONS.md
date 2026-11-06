# Local Visibility Audit operations

## Product and runtime

Landing: `/local-visibility-audit/`. $79 once, target delivery within two business days after intake. Seven fields: business name, city, website, optional Google profile, phone, delivery email and the one service to book. Website can be absent, because a missing site is itself useful audit evidence.

Use the AI Consulting SA Stripe account. Do not reuse RentWashersSA or another business's account. Checkout is controlled by the single server value `AUDIT_STRIPE_PRICE_ID`, an active one-time USD price for exactly 7900 cents. Server infrastructure also requires `STRIPE_SECRET_KEY`, `AUDIT_STRIPE_WEBHOOK_SECRET`, `AUDIT_ADMIN_TOKEN` (32+ random characters), and the site's existing `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `LEAD_RECIPIENT_EMAIL`. Missing configuration keeps the public button disabled. No secret belongs in a VITE variable, source control, the board or chat. Prefer a restricted Stripe key with only Checkout Sessions read/write, Prices read and required expanded payment reads; verify actual permissions in the sandbox before live use.

Required Stripe webhook: `https://aiconsultingsa.com/api/audit/?action=webhook`, subscribing to `checkout.session.completed` and `checkout.session.async_payment_succeeded`. Signature verification uses the raw request body. Unpaid asynchronous completion does not fulfill. Session creation stores product provenance before payment. Stripe therefore retains a paid order even if the webhook or browser return is interrupted.

The success URL opens `/local-visibility-audit/intake/?session_id={CHECKOUT_SESSION_ID}`. The server checks the paid session, exact configured price and quantity, total, currency and live/test mode. Refunded or disputed charge records fail closed. An unguessable Checkout session ID is the narrow intake capability; keep the intake page free of analytics and third-party resources, preserve no-referrer and no-store, and never copy customer intake links into public pages. No payment details are collected by the site.

## Juno's daily queue

1. Open `/local-visibility-audit/fulfillment/` using the fulfillment token from the secure operator credential store. Do not put the token in Drive or email. It stays only in the current page memory; no localStorage, cookie or URL persistence is implemented.
2. Load every page of paid orders. Stripe Checkout Session metadata is the one durable queue. Paid orders with `intake_needed` remain visible, so a failed redirect is not a lost sale. Recheck the queue even when no inbox notice arrives.
3. For `queued` orders, use all seven fields and perform the actual audit. Replace every finding and source note in `sample-report.json` with that customer's evidence. The supplied RentwashersSA sample is explicitly dated and is not a new independent search check.
4. Paste the report JSON and order ID, preview the actual recipient and both offer slots, then deliver. The email contains the report inline and as an HTML attachment. No separate Dom onboarding or sales call is required.
5. `delivered` means Resend accepted a message with a provider ID. It does not prove inbox delivery. Use Resend's actual delivery events/history for complaints, bounces or receipt verification. Do not resend a delivered order blindly.

The inbox convenience notice uses subject `[AUDIT ORDER] <business>` and goes to the existing private lead recipient. Intake is saved before this email is attempted. If the notice fails, the order stays queued in Stripe.

## Ambiguous sends and corrections

Intake is immutable after the first successful save. Corrections require an operator to inspect the order rather than silently replacing business details during fulfillment. Delivery claims store the rendered payload hash and start time before Resend. A retry within 23 hours must render the identical body and use the same per-order idempotency key. Changed or expired ambiguous attempts stop for reconciliation against Resend's provider history. Do not clear the claim or generate a new key to bypass it.

## Optional purchases

`AUDIT_FIX_CHECKOUT_URL`: the approved $500 package checkout. `AUDIT_RECEPTIONIST_CHECKOUT_URL`: the approved $250/month receptionist checkout and onboarding flow. Each is one server configuration value. Only HTTPS buy.stripe.com or checkout.stripe.com links are rendered. When unset or invalid, that slot says purchase is unavailable. Verify the actual offer, account, amount and recurrence before adding a link. Never represent an unavailable slot as an active purchase.

## Verification and outstanding live proof

`npm run test:audit` exercises the handler from paid intake through queue, preview and report delivery using explicit provider test doubles. It also uses the real Stripe SDK to verify signed webhook fixtures. These are contract tests, not actual Stripe sandbox purchases or email receipts.

Required live proof after P120: create the dedicated account's sandbox $79 price and webhook, configure isolated sandbox values, complete a test checkout, submit RentwashersSA sample intake, confirm all seven fields on the queue, preview the sample with both upsell slots, and send one authorized test report to Dom's confirmed address. Verify the provider ID and inbox receipt. No prospect sends, real charges, paid add-ons or new automation are authorized by this build. Record the exact receipts on P119 before Done. Switching to live mode requires the correct account's live values and price; never pair a test price with a live key.

## Positioning

Narrow buyer: a San Antonio service owner who gets found by name but is unsure whether generic buyer searches reach the business. Hook: see what customers find before they find you. Relief: a dated comparison and fixes in money order. Proof: the supplied November 4 RentwashersSA audit, presented as a historical sample. Features support the report rather than replace the buyer's problem.

Read-only research examined five owner discussions before copy was written: [business not showing by name](https://www.reddit.com/r/smallbusiness/comments/18wth62/holy_crap_google_my_business_is_an_absolute/), [missing restaurant reviews](https://www.reddit.com/r/smallbusiness/comments/1tkg355/google_business_reviews_are_not_showing_up/), [three months without a paying pressure washing client](https://www.reddit.com/r/pressurewashing/comments/1m34y57/banging_my_head_with_getting_clients/), [uncertainty about which channel produces work](https://www.reddit.com/r/pressurewashing/comments/1r9ajkz/need_help_with_my_pressure_washing_business_what/), and [few leads alongside a full-time job](https://www.reddit.com/r/smallbusiness/comments/1wzilw8/pressure_washing_company_with_very_few_leads/). These are context for positioning, not testimonials or proof of this product's effectiveness.
