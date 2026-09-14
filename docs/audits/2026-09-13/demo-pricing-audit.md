# Demo line and pricing audit

Date: 2026-09-13. Status: investigation and build instructions only. No website, assistant, telephony, calendar, or pricing configuration changed. No calls, bookings, SMS, or email sent. The webhook status probes acknowledged synthetic status events without creating leads or sending notifications.

## Decision

The public demo exists and has substantially more functionality than the August 20 vault note describes. It is an English auto repair shop demonstration, with a separate real booking path into Dominic's Cal.com calendar. The website does not connect visitors to that demo. Its prominent phone links call Dominic's existing business number instead.

Use the existing demo as the demonstration CTA for a narrowly positioned auto shop offer. Do not rebuild the telephony stack to add a website CTA. Repair the claims, delivery reliability, and offer consistency before buying traffic. A reachable health endpoint is not evidence that a buyer completes a real call and receives the promised follow-up.

## Verified assets and boundaries

| Asset | Current evidence | Safe interpretation |
|---|---|---|
| Demo source | `D:\GitHub\voice agents\demo-line\` | Separate project from `D:\GitHub\voice agents project\`, which is the AHPC clinic package. The demo folder is not a Git repository. |
| Public demo number | Vapi GET `/phone-number` and Twilio GET `IncomingPhoneNumbers` both verified `+15139607996` | Display `(513) 960-7996`; telephone URI `tel:+15139607996`. Do not relabel it a San Antonio area code. |
| Vapi assistant | `99979aa0-b09b-4dd5-b226-4db29712908f`, name `demo_receptionist_public` | This is the demo, not the former Speedy client assistant. |
| Vapi number | `481acbb9-e407-4b22-bb4e-bb4d5aff0d6a`, provider `twilio`, status `active`, attached to the expected assistant | Provisioning and attachment currently exist. Do not buy/import/reassign a number as part of the website build. |
| Twilio routing | Number `in-use`; voice URL `https://api.vapi.ai/twilio/inbound_call`, SMS URL `https://api.vapi.ai/twilio/sms` | The public number routes through Vapi. Do not repurpose unrelated Twilio numbers or alter inbound SMS routing. |
| Demo webhook | `https://ai-receptionist-demo-eight.vercel.app/demo/vapi` | Keep this separate deployment. Never point the website's ordinary lead form directly at this provider webhook. |
| Health | GET `/health` returned 200 at `2026-09-13T13:26:37Z`: SMS, email, booking, recordingLink true; alertFallback false; secretGate true | These are configuration checks, not delivery or booking success checks. |
| Secret gate | Synthetic `status-update`: no auth returned 401; configured local secret returned 200 `{received:true}` | Server gate works with the configured secret. Vapi redacts legacy `server.secret` on reads, as documented in `provision.js:96`; an omitted secret in GET is not evidence it is absent. No live Vapi-to-webhook call verified today. |
| Live prompt | Updated August 23; 19,113 characters, equal to local `prompt.md` after comment stripping | Current source is a faithful basis for copy and behavior audit. Model, voice, transcriber, analysis plan also matched when key order was normalized. |
| Live voice stack | OpenAI `gpt-5.6-luna`, low reasoning; Vapi Elliot; Deepgram `nova-3-general`, English | Do not change model, voice, language, or claim bilingual support in the website task. |
| Calendar | Direct read-only Cal slots lookup returned six slots on six different days | Availability lookup works. This does not prove booking creation, calendar sync, SMS delivery, or compatibility with a shop's software. |
| Recent calls and costs | Latest assistant-filtered GET returned an empty array. Explicit Aug 20–27 query returned 400 and stated the plan only exposes the last 14 days | No available current demo call sample or actual per-minute cost estimate. Do not infer the demo has never been called. |
| Local checks | Existing `npm test` passed all 26 checks | Useful contract coverage. Tests do not establish live carrier delivery, paid conversions, or recovery after a serverless instance disappears. |

The historical vault note `Projects/AI Voice Agent - Public Demo Line.md` established the original design and number but predates Cal booking and recording-link additions. Its stale “only real calls remain” claim is not a current readiness verdict.

## What is wrong with the pitch

### D1. Website and demo are disconnected

`D:\GitHub\ai first solutions\public\ai-phone-answering\index.html:140` and `:156` call `tel:+12108028945`. The React homepage and raw homepage use that business number as well. A source search found no demo number, Vapi widget, demo host, or Cal.com integration in the audited site paths. Keep the business number for “Talk to Dominic.” Add a separate explicitly labeled demo action; do not silently replace every business contact link.

### D2. The website sells a price the demo refuses to discuss

Phone page pricing offers $250/month voice with no setup fee, plus a different $250 setup and optional $50/month textback service (`public/ai-phone-answering/index.html:274–279`). The demo says pricing is set per shop and refuses to quote it (`D:\GitHub\voice agents\demo-line\prompt.md:208`). This feels inconsistent after a visitor has just read a price.

Resolve the commercial terms once, then use the same approved terms in the visible page, FAQ, metadata, structured data, assistant pricing answer, form success state, and customer confirmation. The current $999 assessment confirmation in `D:\GitHub\ai first solutions\api\lead.js:100` and `:146` is also inappropriate as the default response to a voice pilot inquiry.

### D3. The demo overstates scheduling and pricing capabilities

`prompt.md:98` and `:210` say it writes into “whatever calendar” the shop uses. Actual tools in `assistant.json` are `capture_lead`, `get_available_slots`, and `book_appointment`; `src/booking.js` implements Dominic's Cal.com event type. This proves a sales conversation can be scheduled in that specific system. It does not prove integration with Tekmetric, Shopmonkey, a clinic PIMS, or any arbitrary calendar.

`prompt.md:211` promises price quoting after loading a menu. This package has no price lookup tool. Treat pricing lookup and customer booking as separately scoped implementation possibilities, not included capabilities. The initial auto shop pilot should collect service requests for staff confirmation, not diagnose, quote repairs, or book a vehicle without a verified integration and approved rules.

### D4. The close sells setup before discovery

`prompt.md:157` confirms that Dominic will “get it set up the way you want it.” The booked event and SMS copy in `src/webhook.js:185` similarly imply an implementation appointment. Replace with a clearly described fit/discovery call. The visitor has not approved a scope, payment, integration, or go-live plan. A real calendar booking must not imply service activation.

During roleplay, `prompt.md:69` says the imaginary shop will “expect you around then,” which can sound like a confirmed visit. Use “I would pass that requested time to the shop for confirmation. This demonstration does not book repair appointments.”

### D5. Proof has to describe the completed experiment honestly

The phone page still says the auto shop is a live paying customer and renewal is unresolved (`public/ai-phone-answering/index.html:344–368`). Root investigation has established Speedy cancelled; replace current-customer language before outreach. Historical call counts can describe a measured historical deployment when dates, sample limits, and the cancellation are preserved. They do not establish incremental booked jobs or ROI. Do not use the public demo as customer proof.

## Reliability issues to fix before directing paid traffic

These are source findings, not claims that an incident was observed today.

| ID | Evidence | Required behavior and acceptance |
|---|---|---|
| R1: false capture success | `src/webhook.js:73–76` returns “passed along” even when `delivery.anyCapture` is false. `src/leadDelivery.js:193–200` treats almost any capture tool reply as success, and `:251` skips the end-of-call recovery. | Persist delivery state and return an honest failure/recovery instruction when no durable capture or notification succeeds. Inject failure of storage, SMS, and email; verify no “passed along” claim and no suppression of a later valid retry. |
| R2: ephemeral fallback | `src/leadDelivery.js:29–39` writes to project data or `os.tmpdir()`. `:187` treats this as captured. Vercel temporary disk is not a durable lead store. Health shows no alert fallback configured. | Add durable lead persistence and delivery state before acknowledging reliable capture. Persist by provider call ID; confirm a new process/instance can retrieve and retry the lead. Avoid redesigning the site lead API as part of this telephony change. |
| R3: SMS accepted is not delivered | `src/leadDelivery.js:93–110` treats HTTP acceptance as SMS success. No status callback is attached. `prompt.md:159` unconditionally tells callers the text is coming despite the tool's failure branch. | Store Twilio message ID/status and process delivery outcomes where promised. Prompt must follow tool outcome and never promise a text after failure. Test successful acceptance, explicit rejection, later failure, and opt-out. |
| R4: duplicate side effects | Warm-instance Set and transcript text are current dedup mechanisms. Recording SMS runs before dedup (`src/leadDelivery.js:247–251`). Cal duplicate lookup is keyed by synthetic attendee email and fails open (`src/booking.js:273–287`). | Use durable idempotency keys per call and action. Replaying end-of-call twice must not text the recording twice or create another booking. Scope duplicate booking search to this event type and validate any existing result. |
| R5: weak calendar validation | `src/webhook.js:134` checks only parseable timestamps. `src/booking.js:192` falls back to requested start if response omits start. | Recheck selected slot/allowed event, validate a returned booking identifier and accepted result before saying booked. Keep timezone America/Chicago. Tests must cover provider error, malformed success, expired slot, duplicate request, and unknown caller number. |
| R6: sales and recording boundaries | Demo greeting discloses recording; SMS recording link is opt-in in structured data. No current real call verification was performed. | Preserve disclosure and explicit recording-link permission. Do not publish customer audio/transcripts or put caller data in analytics. Verify an owner-approved test recording link privately before promising it publicly. |

Do not “fix” R1 by deleting the backup capture path. Do not disable authentication to make calls work. Do not infer live auth is broken from redacted API fields. Current Vapi guidance uses reusable `credentialId` server authentication; any migration is a separate tested provider change, not a website CTA requirement. [Vapi server authentication](https://docs.vapi.ai/server-url/server-authentication).

## Pricing: what is verified and what remains a decision

Verified public price is an offer already published, not proof of profitability or willingness to renew. Preserve it as a provisional reference until Dominic approves a complete package.

| Item | Current official evidence | Implication |
|---|---|---|
| Vapi hosting | $0.05/minute, excluding model providers and transport | Do not quote $0.05 as total operating cost. STT, LLM, TTS, phone service, and other services must be included. [Vapi pricing](https://vapi.ai/pricing) |
| Twilio US local voice | $0.0085/minute inbound; $1.15/month local number; $0.014/minute outbound | Transfers/forwarding and outbound legs can add charges. Owner's existing carrier may add forwarding charges. [Twilio US voice](https://www.twilio.com/en-us/voice/pricing/us) |
| Twilio SMS | Base $0.0083 per segment for long-code outbound SMS, plus carrier fees | Long Unicode notification messages can contain multiple segments. “Per text” is an imprecise cost unit. [Twilio US SMS](https://www.twilio.com/en-us/sms/pricing/us) |
| A2P registration | Campaign vetting alone is $15, separate from applicable brand and monthly campaign charges | The website's “$4 one time plus a small monthly fee” omits required cost components. Do not publish universal $3–$15 totals without scenario assumptions. [Twilio campaign vetting](https://help.twilio.com/articles/11587910480155-A2P-10DLC-Campaign-Vetting-Fee-Changes-January-2023) |

Illustrative voice lower bound, not a quote or total expense: `1.15 + minutes × (0.05 + 0.0085)`. This excludes every model component, SMS, tax, storage, hosting allocation, extra call legs, support, setup labor, payment fees, and customer acquisition.

| Monthly inbound minutes | Known hosting + one local inbound leg + number floor | $250 revenue minus only that floor |
|---:|---:|---:|
| 100 | $7.00 | $243.00 |
| 300 | $18.70 | $231.30 |
| 1,000 | $59.65 | $190.35 |

The last column is NOT gross margin or profit. Actual provider costs cannot be inferred from an empty retained call sample. Use `contribution = revenue - all provider costs - support labor - setup amortization - payment fees - acquisition allocation`. Record actual total cost and billable minutes from an approved test cohort before promising an included allowance or overage rate.

Recommended proposal: one narrowly scoped, paid auto shop overflow pilot with an agreed volume ceiling, clear support boundary, no promised vehicle booking, and an explicit measurement/review date. The existing $250/month and no setup fee may be the test anchor, but the builder must not invent included minutes, overage rates, free trials, cancellation/refund terms, SLA, or extra integration fees. Put unresolved commercial fields in a decision table, not in public placeholders. Treat textback as a separate secondary service; its cheaper operating cost should not be the headline for a voice demonstration.

The pilot's value test is qualified missed inquiries captured, reached by staff, converted into completed work, and attributable contribution compared with all-in service cost. Caller volume and successful summaries are process metrics, not incremental customers.

## Exact website integration instructions

1. Keep the current authoritative business contact number as “Talk to Dominic.” Add a distinct demo card to `/ai-phone-answering/`; root brief determines final niche page architecture. The demo card label should be “Try the auto shop receptionist demo” and show `(513) 960-7996` with `href="tel:+15139607996"`.
2. Above the CTA explain: “A recorded demonstration for auto shop owners. Pretend you're a customer with a car problem. This line does not accept repair appointments.” State that Dominic can discuss fit afterwards. Do not promise a 90-second or five-minute duration before measuring real calls.
3. On desktop show the number as selectable text. On mobile use a sufficiently large telephone link. Link activation should open the device dialer, not trigger an automatic outbound call from the server. A browser calling widget is a separate scope requiring public-key origin controls, abuse limits, accessibility, microphone flows, and provider usage controls.
4. Keep price and scope immediately understandable. Primary offer is overflow/after-hours request capture for independent auto shops. Differentiate the textback offer below it. Do not lead with carrier plumbing or “the same thing costs pennies”; the service's case is dependable follow-through and a measured business outcome.
5. Add a voice-specific inquiry path that records selected service and campaign/source fields and returns an appropriate confirmation. Do not route all phone inquiries through $999 assessment confirmation copy. The frontend and API must accept the same allowed service values and preserve them in owner notification and success state.
6. Record `demo_tel_click` as an intent event with page path, offer ID, source/medium/campaign, and CTA placement only. This is not a completed call or qualified lead. Keep actual calls, qualified owner inquiries, discovery appointments, paid pilots, and renewals as separate downstream states. Never send names, phone numbers, recordings, transcripts, or free-text intake to analytics.
7. A plain telephone link cannot carry website UTM parameters into a PSTN call. Do not claim exact per-visitor attribution with the single shared number. Use aggregate campaign windows plus a simple volunteered referral/source question, or separately scope tracking numbers/session attribution. No new numbers are authorized by this audit.
8. Before public rollout, verify the preview at mobile and desktop sizes, actual `tel:` targets, accessibility labels, unambiguous recording disclosure, no fake booking claims, service-aware lead confirmation, and clean console/build. Place no live test calls or send any test SMS/email until a separate test session is authorized.

## Completion gates for the next builder

- [ ] Correct public proof and website/assistant pricing mismatch using one approved offer record.
- [ ] Add the distinct demo CTA without changing Dominic's ordinary business contact number.
- [ ] Replace arbitrary-calendar, repair-quote, and guaranteed-setup claims in both site and prompt where separately authorized.
- [ ] Implement and prove durable delivery/idempotency before paid traffic.
- [ ] Validate form attribution and distinguish telephone clicks from calls/conversions.
- [ ] Keep telephony changes in the demo project, website changes in AI First Solutions, and clinic behavior in the AHPC package.
- [ ] Hand back files changed, tests run, screenshots, remaining commercial decisions, and a no-secrets evidence log. Do not deploy or run ads under the audit-only instruction.

Next audit should include three owner-authorized real scenarios: ordinary roleplay, adversarial repair price/booking requests, and an interested shop owner. Inspect outcomes privately, including actual delivery and Cal booking behavior. Also simulate dependency failures locally. Until then the accurate readiness label is: number provisioned, webhook available, calendar read available, live buyer experience and reliable recovery unverified.
