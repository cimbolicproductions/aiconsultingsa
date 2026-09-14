# AI Consulting SA: traffic audit and next-build instructions

Prepared **September 13, 2026** for Dominic and the model that will implement the next build. **Audit and instructions complete; implementation and launch are not complete.** This file is the entry point. The evidence folder is `docs/audits/2026-09-13/`.

## Paste this into the next model's task

> Work in `D:\GitHub\ai first solutions`. Read `AGENTS.md`, this entire file (`docs/NEXT-BUILD-aiconsultingsa-voice-demo.md`), and the two linked specialist reports before changing anything. Implement the website work W0-W4 locally, in order, and prepare a reviewable result. The destination is aiconsultingsa.com. Keep the current homepage strategy and existing `/ai-phone-answering/` URL; make that page a clear entry point for independent San Antonio auto shops. Add the existing public demo as a distinct telephone CTA, correct stale proof and capability claims, align the offer and confirmation, and preserve service/campaign attribution. Follow the exact contracts and acceptance checks below. Do not invent pricing terms, customer results, integrations, listing addresses, or analytics data. Keep unresolved facts in the decision register, never public placeholders. The separate demo project's D1-D3 work is a second workstream; website success does not establish demo readiness. Do not deploy, change live Vapi/Twilio settings, send outreach, submit real forms, place calls, buy services, or start another SEO experiment under this build brief. Complete everything that can be tested locally, then return changed files, passing checks, screenshots, remaining decisions and `docs/BUILD-RESULT-aiconsultingsa-voice-demo.md` for a later audit. Preserve other-agent and user changes. Do not mark a mocked check as a live verification.

## 1. Decision and scope

**The problem is not simply a lack of pages. The acquisition path is unfinished and the delivered value has not been validated through renewal.** Google sends very little traffic; the phone page is unknown to Google's indexed-version inspection; visitors cannot find the provisioned demo on that page; its inquiry path defaults to an assessment; and historical customer proof is stale.

Use **AI Consulting SA / aiconsultingsa.com** as the business identity and sales destination. Dominic explicitly selected it in this task. Earlier references to aiconsultingai.com are superseded for this work. Do not register, redirect, migrate to, or infer ownership of another domain.

The first outbound niche is **locally controlled independent auto repair shops in San Antonio**, starting with the existing 24-record cohort, refreshed before use. The buyer is an owner or service manager who confirms overflow/after-hours call pain, has capacity for suitable work, and assigns someone to return captured requests. Dealerships, national chains, collision-only shops and veterinary practices are outside this first cohort. This is a targeting hypothesis supported by existing experience and access, not proof all these shops need the service.

**Proposed positioning:** “Help your service advisors return the calls they cannot answer while working with customers.” The initial service covers an agreed overflow window, approved routine answers, intake and accountable follow-up. A missed-call service captures existing demand. More inbound demand is a separate problem served, where appropriate, by the site's visibility offer.

Keep the homepage's current AEO positioning while its new baseline develops. Use the existing phone service page for this offer. No new domain, parallel brand, city-page factory, general redesign, new CRM, browser calling widget, or additional telephony number is necessary for this build. Narrow factual corrections to the homepage are appropriate and must be logged as interventions.

## 2. What the evidence actually says

### Google traffic, finalized web search data

Property: `sc-domain:aiconsultingsa.com`. Retrieved September 13 through Growth Brain's existing read-only service-account credentials. Latest complete date: September 10. September 11 onward was marked incomplete. Performance dates use Pacific Time; retrieval timestamps are UTC.

| Window | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| June 13-September 10, 90 days | **10** | **604** | 1.66% | 21.37 |
| August 14-September 10, latest 28 days | **2** | **175** | 1.14% | 26.15 |
| July 17-August 13, previous 28 days | **2** | **271** | 0.74% | 21.17 |

Impressions fell approximately 35.4% between the two 28-day periods; clicks stayed at two. This small, mixed-intervention sample cannot establish that the August 31 homepage change caused a decline or that the business cannot work. GSC measures Google search activity, not all visits, calls, sales, or total market demand.

The homepage received all 10 reported clicks and 490 page impressions over 90 days. Document automation received 101 impressions, zero clicks, average position 54.22; assessment received 32 impressions, zero clicks, position 30.81. The phone route had **no returned performance rows**, including a filter covering its URL variants. Query `ai consulting san antonio` generated 4 clicks / 116 impressions, position 7.67. This is evidence of some relevant visibility, not a measured monthly search-volume estimate.

Do not sum query/page detail rows to recreate property totals. Query privacy omissions and page-level aggregation matter; homepage fragment rows are not separate landing pages or proof of cannibalization. Only five of the ten clicks appeared in returned named-query rows. No brand/nonbrand split should silently allocate the remainder.

### Indexing snapshot

| Canonical URL path | September 13 indexed-version inspection |
|---|---|
| `/` | Indexed; Google canonical matches; last crawl September 11 |
| `/ai-tools-assessment-san-antonio/` | Indexed; canonical matches |
| `/ai-document-automation-san-antonio/` | Indexed; canonical matches |
| `/ai-phone-answering/` | **URL unknown to Google**; slashless and `index.html` variants also unknown |
| `/chatgpt-optimization-san-antonio/` | **URL unknown to Google** |
| `/small-business-automation-san-antonio/` | **URL unknown to Google** |
| `/do-i-need-to-pay-for-ai-san-antonio/` | **Discovered, currently not indexed** |

The sitemap contains all seven canonical URLs; GSC reported no errors or warnings and a September 6 download. Its deprecated `indexed: 0` field is not proof the site has zero indexed pages. [Google sitemap API reference](https://developers.google.com/webmaster-tools/v1/sitemaps).

These inspections describe Google's stored/indexed state, not a live URL test. The phone page returned HTTP 200 to this audit's real browser and rendered on desktop/mobile. No confirmed robots exclusion or site-wide rendering failure was established. **Discovery/indexing is a concrete bottleneck; its exact cause is unproven.** Content improvements and submission cannot guarantee indexing or ranking.

### Conversion and operational findings

| Priority | Verified finding | Consequence / remedy |
|---|---|---|
| P0 | Phone page calls `+12108028945`, Dominic's business number, and never shows the demo number | Distinguish “Try the demo” from “Talk to Dominic.” |
| P0 | “Tell me about your workflow” sends visitors to `/#contact`; a live-browser UTM test lost its campaign query | Add the service-specific form and attribution contract in W3. |
| P0 | `api/lead.js` confirmation defaults to the **$999 assessment**, including phone inquiries | Use service-aware confirmation; an assessment is not a required phone-pilot purchase. |
| P0 | Public copy describes a current paying auto shop and pending renewal | Speedy cancelled September 5. Remove current-client claims; call volume is not ROI. |
| P0 | Demo source can claim capture succeeded after all useful delivery failed; temporary serverless files count as capture | Repair and failure-test delivery before a paid rollout. Details in D2 and specialist report. |
| P1 | Page mixes voice, cheap textback carrier costs, generic consulting and “assessment first” | Lead with one auto-shop problem, demonstration and fit conversation. |
| P1 | Website offers $250/month; assistant refuses price discussion and implies arbitrary-calendar integrations | Align factual scope and pricing answers; current working calendar is Dominic's Cal consultation. |
| P1 | Both home and phone scored **7/7** in the AEO skill script, while the phone page remains unknown to Google | That script is a structural heuristic, not an indexing, citation, demand or revenue score. |
| P1 | No analytics integration found in inspected site source; actual send/outcome ledger not established | Preserve referral attribution in leads, then connect verified funnel events. Do not claim current traffic totals beyond GSC. |

Desktop and 390px mobile checks found no horizontal overflow. The current design is usable; the missing offer/demo path is more consequential than another visual redesign. No measured Lighthouse/Core Web Vitals result is claimed.

### Growth Brain context

The readable brief was reviewed through **August 31**, verdict **experiment-concluded**, next action **establish a fresh 28-day baseline** after the $500/page AEO repositioning. Approximate review date is September 28, using complete data when available. Its older “38 searches/month” calculation came from this property's impressions and is not a total-demand ceiling.

The September 13 nightly log collected GSC successfully, then failed a later deployment stage because historical experiment `45e7fd14-f46e-4346-82d4-7e82ebc6c7dc` was not approved. Do not treat that as a broken GSC collector, restart the old experiment, or mutate Growth Brain's database to make this website build pass. Reconcile stale experiment state in a separate maintenance task. Detailed evidence: [growth-context-audit.md](audits/2026-09-13/growth-context-audit.md).

## 3. Business and pricing judgment

A focused managed service is plausible. One historical $250 payment supports some willingness to try it. Cancellation means dependable value and retention are still unproven. The strongest next evidence is a buyer who confirms the problem, pays for a bounded pilot, uses the handoff process, and renews based on results.

Basic answering has cheaper substitutes. Dialzara advertises $29/month for 60 minutes and $199 for 500 minutes, with ongoing custom prompt engineering at the latter tier. Smith.ai advertises $150/month for 75 calls and $500/month for 300 calls with full-service setup. Units and inclusions differ; these are advertised capabilities, not tested performance. [Dialzara pricing](https://dialzara.com/pricing), [Smith.ai pricing](https://smith.ai/pricing/ai-receptionist).

**Do not sell “I can make an AI answer your phone” as the entire advantage.** Sell correct implementation, approved shop-specific handling, reliable staff receipt, a callback owner, and a visible record of what happened next. Local support is a proposed differentiator only to the extent Dominic actually provides it. Custom prompts alone are already offered by competitors.

### Keep the existing offer ladder distinct

| Service | Current published price, not newly approved terms | Role |
|---|---|---|
| AI phone answering | $250/month, no setup fee | Primary offer on the phone page; scope and usage must be agreed before activation |
| Missed-call textback | $250 setup; optional $50/month support; provider charges separate | Secondary alternative when a text and human callback suffice |
| AEO / ChatGPT optimization | $500/page or $1,500 for up to five, no retainer | Existing separate visibility offer |
| AI Tools Assessment | $999, implementation separately scoped | For an unclear or broader workflow problem |

Do not invent included minutes, overages, free trials, refund/cancellation terms, support hours, SLA, integration fees, unlimited usage or guaranteed ROI. “No contract” in older metadata is not a complete commercial policy. Keep the current price anchor without adding promises. A complete written pilot scope is a launch requirement, not a reason to block local copy/form work.

Recommended inquiry-stage price copy:

> **AI phone answering: $250/month, with no setup fee.** We agree on call coverage, expected volume and the follow-up process before activation. Shop-calendar integrations and repair-price quoting require separate scoping.

Do not present carrier costs as total service cost. Current Vapi hosting starts at $0.05/minute before model/voice/transcription/transport; Twilio US local inbound is $0.0085/minute plus $1.15/month for a number. SMS segments, carrier fees, A2P registration, extra legs, hosting, support and acquisition also matter. The site's universal $3-$15/month / $4 one-time messaging examples are incomplete. Replace with a short provider-cost explanation or a dated, fully specified example. [Vapi pricing](https://vapi.ai/pricing), [Twilio voice pricing](https://www.twilio.com/en-us/voice/pricing/us), [Twilio SMS pricing](https://www.twilio.com/en-us/sms/pricing/us). Full cost evidence: [demo-pricing-audit.md](audits/2026-09-13/demo-pricing-audit.md).

Calculate contribution using actual usage:

`monthly fee - all provider costs - support hours × explicit hourly cost - setup amortization - payment fees - acquisition allocation`

For the buyer, compare the fee with contribution from plausibly recovered completed work and measured capacity improvements. Calls, requests and bookings are different stages. Do not attribute every handled call or completed job to incremental revenue. Record staff corrections and callback effort too. These are operating evaluation formulas, not profit forecasts.

## 4. Verified identity and architecture

| Item | Exact value / constraint |
|---|---|
| Website repo | `D:\GitHub\ai first solutions` |
| Public identity | AI Consulting SA; `https://aiconsultingsa.com/`; San Antonio, TX, US |
| Business phone | `+12108028945`, display `(210) 802-8945`; “Talk to Dominic” |
| Public demonstration phone | `+15139607996`, display `(513) 960-7996`; “Try the auto shop demo” |
| Demo repo/folder | `D:\GitHub\voice agents\demo-line` (not a Git repository at audit) |
| Demo assistant | `99979aa0-b09b-4dd5-b226-4db29712908f`, `demo_receptionist_public` |
| Demo deployment | `https://ai-receptionist-demo-eight.vercel.app` |
| Separate AHPC project | `D:\GitHub\voice agents project`; veterinary capture-only package, not this public auto demo |
| Existing prospect store | `D:\GitHub\Money maker\data\prospects.json` |
| Growth Brain | `D:\GitHub\portfolio-growth-brain`; read-only context for this build |

Never replace the business number globally with the demo number. Do not describe the 513 demo number as local to San Antonio. Do not reactivate Speedy or repurpose any clinic/customer phone number.

### Source map

| File | What the builder must handle |
|---|---|
| `src/AIConsultingServicesPage.jsx` | Hydrated homepage content; smallest contextual phone link and factual corrections |
| `index.html` | Raw/crawler/no-JS homepage plus JSON-LD; keep facts and forms in sync with React |
| `public/ai-phone-answering/index.html` | Main static service page, metadata, FAQs, JSON-LD, new demo CTA and inquiry form |
| `public/static-page.css`, `src/index.css` | Reuse existing styles; scope new phone-page styles to avoid other-page regressions |
| `api/lead.js` | Existing POST endpoint, validation, Resend batch, confirmation and redirect |
| `tests/lead-form-contract.test.mjs` | Existing mocked delivery contract coverage; extend for real behavioral changes |
| `public/sitemap.xml`, `public/robots.txt`, `vercel.json` | Canonical discovery, crawl policy, slash/variant routing |
| Other `public/*/index.html` service pages | Only update shared price/proof/capability facts where needed; avoid broad rewrite |
| `docs/NEXT-TASK-parent-question-page.md` | Historical brief; parent page already shipped September 5. Do not rebuild it. |
| `docs/outreach/verified-lead-dossier.md` | Historical drafts; not a send log and not safe to send unchanged |

## 5. Website build sequence

### W0. Read and preserve

1. Read applicable repository instructions and specialist reports. Check `git status --short` and recent commits. Audit baseline was `4fb688d`; verify current state rather than reset to it.
2. Read each touched source file before editing. No application code, website deployment or telephony configuration was changed by this audit.
3. Create `docs/voice-offer-contract.md` with the verified offer table, approved phrases, prohibited claims, unresolved commercial fields and review date. This is the shared factual reference, not a runtime framework. Keep unresolved values explicitly `UNCONFIRMED` in the internal document only.
4. Use task IDs W0-W4 and D1-D3 in your result. Mark each `PASS`, `FAIL`, or `NOT RUN`, with evidence. Do not use one vague “done.”

### W1. Correct truth before adding traffic

Search both React and static HTML for `live since`, `currently`, `renewal`, `last 15 days`, `250`, `$999`, `$4`, `whatever calendar`, `books`, and the historical shop proof. Inspect each match in context; do not bulk replace numbers.

- Default public proof choice: replace the current-client block with **“What you can test in the demo.”** Show capabilities and boundaries, not invented testimonials or generic ROI percentages.
- If retaining historical experience, use exact dates: August 17-31, 2026; 48 calls; 40 distinct caller numbers; 20 conversations longer than 20 seconds. State the deployment ended September 5 and incremental completed jobs were not established. Keep the internal shop identity private unless permission for naming is documented. Do not omit the ended status while implying an ongoing endorsement.
- Remove “assessment first” as the prerequisite to this phone offer. A free fit discussion is not a free implementation or mandatory paid assessment.
- Replace unsupported booking/urgent-routing claims with request capture and approved escalation **only where actually implemented and verified**. The launch scope cannot promise any calendar, repair diagnoses or repair price quotes.
- Homepage sentence “I make sure it's you” implies guaranteed AI recommendation. Suggested factual correction: **“I help San Antonio businesses make their services easier to find and understand in search and AI answers.”** Apply to both homepage forms of the copy, retain the AEO offer and structure, and record the date as a measurement intervention.
- Date relative customer examples such as “last month” when retained. Label sister-business results owner-reported; they are not AI Consulting SA client acquisition results or a controlled experiment.

**Accept:** no current Speedy endorsement, no guaranteed rankings/revenue, no misplaced assessment prerequisite, and matching public prices/scope across visible content, metadata and JSON-LD.

### W2. Build one clear phone landing page

Keep `/ai-phone-answering/` and its self-canonical URL. Recommended title: **“AI Phone Answering for San Antonio Auto Shops | AI Consulting SA.”** Recommended description: **“Try an auto shop AI receptionist demo. Explore overflow call answering and callback request capture for independent San Antonio repair shops. $250/month.”** This is copy guidance, not a promise of a particular Google snippet.

Use this section order and write concrete short paragraphs:

1. **Hero.** Eyebrow: “For independent auto repair shops in San Antonio.” H1: **“Give callers a next step when your service advisors cannot pick up.”** Body: “A receptionist configured for your shop can collect the caller's contact details, vehicle and service request during an agreed overflow window. Your team confirms the next step.”
2. **Demo card in the first screen where practical.** Heading: “Try the auto shop receptionist demo.” Visible disclosure: **“This live AI demonstration records calls. Pretend you are a customer with a car problem. This line does not accept repair appointments.”** Primary link: `href="tel:+15139607996"`, label “Call the demo: (513) 960-7996”. Secondary: `href="#phone-fit"`, “Discuss a setup for my shop”. Separate business link: `tel:+12108028945`, “Talk to Dominic”.
3. **Three useful test prompts.** “My car will not start; what information do you need?” “Can I request a time for an oil change?” “What would you tell the shop about this call?” Explain the demonstration collects requests; it does not diagnose a fault, quote repairs or reserve a shop appointment. Do not promise a call duration without measuring it.
4. **What a pilot would cover.** One shop, agreed overflow rule/window, approved routine answers, structured request capture, named staff handoff, weekly outcome review. Mark this as proposed pilot scope, with activation dependent on confirmation and readiness checks.
5. **Price and alternatives.** Use the inquiry-stage voice price copy above. Put textback below it as a simpler alternative with its separate setup/support/provider costs. Keep AEO and assessment out of the main decision path.
6. **What the demo proves.** A visitor can hear the interaction. It does not prove their shop software is integrated, requests reach their staff, or incremental jobs result. Link to a real owned sample only after a controlled recording is approved; no stock testimonial or customer transcript.
7. **FAQ.** Answer the questions below visibly and directly. No filler word-count target.
8. **Fit form** at `id="phone-fit"`, then a short next-step explanation and ordinary business contact details.

FAQ answer requirements:

| Question | Required answer facts |
|---|---|
| How much does it cost? | $250/month/no setup is current published voice price; coverage and expected volume agreed before activation; textback is separate |
| Can it work with my existing number? | Forwarding may be possible after checking carrier/routing; do not guarantee every carrier or number availability |
| Does it book repair appointments? | Initial proposed shop offer captures a request for staff confirmation; customer calendar integration requires separate validation |
| What happens after the call? | Describe approved capture/delivery/callback workflow; do not promise verified receipt until D2 passes |
| Is this my shop's receptionist? | No; this public line is a recorded fictional auto-shop demonstration |
| Can I talk to a person? | Dominic at the separate 210 business number; no unverified live-transfer promise |
| Does it bring me new customers? | It handles people already contacting the shop; track completed follow-up and work, with no guaranteed incremental outcome |

Do not publish a direct Cal scheduling URL from old memory. The current demo can offer Dominic's consultation slots; the website form can continue arranging a fit discussion by email. No additional scheduler is required.

**Accept:** a shop owner can identify buyer fit, what is being demonstrated, exact demo number, expected next step, price and limitations without reading a technical tutorial. Telephone links open a dialer only; no server-initiated calls. Test selectable number on desktop, 44px-or-larger tap target, keyboard focus and accessible labels.

### W3. Make service intent and attribution survive the form

Use the existing `/api/lead/` endpoint. Add a **plain HTML POST form directly to the phone page**. This avoids routing the primary inquiry through a generic homepage form. Reuse existing required fields/validation (`name`, `business`, `email`, `workflow`), optional `phone` and referral `source`, and `_honey`. Label the workflow field for phone handling and keep its existing minimum length. Add hidden `service_interest=phone_reception` as static HTML so it works without JavaScript.

Contract for new fields:

| Field | Rule |
|---|---|
| `service_interest` | Server allowlist: `phone_reception`, `textback`, `aeo`, `assessment`, `general`. Missing/invalid becomes `general`; never insert arbitrary values into a subject or redirect |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` | Optional, max 80 characters each; only lower-case letters, digits, `_` and `-`; reject malformed values to empty. Campaign identifiers contain no names, emails or phone numbers |
| `landing_path` | Allowlisted existing site path only, no query or fragment; phone form defaults to `/ai-phone-answering/` |
| `response_mode` | `html` or `redirect` only. New phone form includes static `html`; its script changes this to `redirect` when enabled. Existing forms with no value retain their current redirect behavior |
| existing `source` | Keep the human referral answer separate, escaped and length-limited; do not overwrite it with UTMs |

Add one small shared public script to populate hidden campaign fields from the URL. Preserve the most recent valid tagged campaign for the same browser session using `sessionStorage`; untagged navigation must not erase it. Storage failure must not break the form or its basic service intent. A new valid tagged URL replaces the previous campaign as a complete group so campaigns do not mix. Do not build first-touch identity tracking, fingerprinting or cross-domain cookies. Use the existing home form(s) where practical to consume the same session fields without changing their default interest.

Server behavior:

- Owner notification includes selected service, safe campaign fields and landing path, in text and escaped HTML. Secrets and recipient configuration stay server-side.
- Phone confirmation: **“Thanks for asking about phone answering for your shop. I will review the workflow you shared and follow up to discuss fit, call coverage and next steps. This message does not activate a service or book a repair appointment.”** No $999 assessment default.
- Use similarly relevant short confirmations for explicitly selected services; `general` should promise a review and a suitable next step without prescribing a purchase. An explicitly selected assessment may name the assessment.
- Choose success redirect from a server-owned map, never arbitrary input. In redirect mode, `phone_reception` goes to `https://aiconsultingsa.com/ai-phone-answering/?submitted=true#phone-fit`; other current forms may keep their existing homepage destination. In HTML mode, return an accessible, service-specific server-rendered confirmation with a link back to that service page after full batch acceptance. This makes no-JS phone submissions usable. A query flag alone is not proof of a new lead and must never generate a conversion event.
- Preserve existing validation, honeypot, HTML escaping, timeouts, secret checks and Resend batch acceptance checks. A successful batch must contain both expected message IDs. Acceptance by the email provider is not proven inbox delivery.
- Include normalized `service_interest` in the existing lead idempotency fingerprint. Keep UTMs outside that fingerprint so campaign changes cannot manufacture a second send for an otherwise identical submission. Retain documented provider retry behavior; do not claim a lifetime deduplication guarantee.

Tests must cover phone/general/assessment confirmation, both email bodies, UTM handoff, missing/malformed fields, escaping, provider partial acceptance, failure/timeout, retry key behavior and fixed redirect selection. Use mocked providers. Do not submit the live form under this build instruction.

**Accept:** a tagged phone inquiry reaches the mocked owner notification with its service and attribution, receives the phone-specific confirmation, and retains error handling. Plain HTML/no-JS submission still records phone interest. No-JS campaign capture may be unavailable and must be reported as such; never fabricate attribution.

### W4. Search, local identity and answer quality

1. Keep meaningful phone copy, price, demo number and navigation in raw HTML. Add one natural, crawlable link from the homepage's relevant service section to `/ai-phone-answering/`, in React and fallback HTML, with text such as “AI phone answering for auto shops”. Retain existing relevant links from the automation and cost-comparison pages. Do not fill every paragraph with exact-match anchors.
2. Verify all seven canonical routes return 200, allow indexing, use consistent self-canonicals and appear in the sitemap. Check slashless, `index.html`, HTTP and www variants for a sensible single destination. The ChatGPT page's explicit `index.html` redirect appeared absent from `vercel.json`; verify deployed behavior before changing it. This was not proven to cause the traffic problem.
3. Update sitemap `lastmod` only for materially changed pages. Keep robots readable and permissive for intended public pages; do not create special AI files as an indexing cure.
4. Reuse the business entity `https://aiconsultingsa.com/#business`. Business name is AI Consulting SA, business phone is +1-210-802-8945, service area is San Antonio, TX, US. Treat the demo as a demonstration contact, not the entity's principal phone. Use truthful `Organization`/appropriate local-business and `Service` relationships; no invented street address, opening hours, coordinates representing a staffed office, review count, award or `sameAs` URL. Structured data must match visible facts.
5. Street/ZIP and confirmed Google Business Profile, Bing Places and Apple listing URLs are **UNKNOWN**, not proven missing. Look for and verify existing profiles before creating anything. A local service website alone does not establish GBP eligibility; confirm actual in-person customer contact and correct address/service-area handling. Do not create duplicates, fake locations, keyword-stuffed business names or an online-only profile in an ineligible category. [Google eligibility guidance](https://support.google.com/business/answer/13763036).
6. Once profiles are verified, prepare a consistent identity/services/description update and use the canonical website. Where a distinct website link is allowed, use non-personal UTMs such as `utm_source=google_business_profile&utm_medium=organic&utm_campaign=local_profile`. Listing edits/publications are a separate action, not performed by this audit. Request reviews neutrally from eligible real customers; do not route only happy people to public reviews or invent endorsements.
7. Make answers understandable when quoted alone: name service, price unit, scope and limitation near one another. Treat the skill's 7/7 score as an editorial check only. Google says no special AI schema, exact phrasing, content chunking or `llms.txt` is needed for its AI visibility; useful original content and normal crawl/index eligibility matter. It now documents a Generative AI performance report, which this audit did not inspect. [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
8. Keep helpful FAQs. Google FAQ rich results stopped appearing May 7, 2026; documentation was removed June 15. Existing valid FAQPage markup can remain if it matches visible content, but it is not a required growth task or promised rich-result benefit. This corrects older skill guidance. [Google Search changelog](https://developers.google.com/search/updates).
9. After an approved deployment, use GSC's live URL test for the phone page and AEO page, resolve any specific exclusion, then request indexing once where appropriate. Record result/date and inspect again weekly. Do not use `site:` searches as a complete index census or repeatedly submit URLs as a ranking strategy. Keep the newer parent page and monitor it rather than generating replacements.

Search intent map, **hypotheses without claimed volume**:

| Buyer question / query family | Destination | Action |
|---|---|---|
| AI receptionist / phone answering for auto repair shops in San Antonio | Existing phone page | Main demonstration and offer |
| Auto shop missed-call textback versus answering | Phone page alternative/FAQ; existing cost hub | Explain which problem each solves |
| AI consulting San Antonio | Existing homepage | Preserve positioning; link appropriate services |
| ChatGPT optimization San Antonio | Existing AEO page | Fix discovery and truthful scope; separate from phone promise |
| Do I need to pay for AI? | Existing September 5 parent page | Already built; maintain useful comparisons |

## 6. Separate demo workstream and readiness gates

Read [demo-pricing-audit.md](audits/2026-09-13/demo-pricing-audit.md) before this work. Current status: number attached, authenticated webhook status probe passed, health/config checks pass, Cal slot lookup works and 26 local tests pass. **No real buyer call, SMS receipt, booking creation or current unit cost was verified during this audit.** Vapi's available call history is limited to 14 days; an empty retained sample is not lifetime zero usage. The redacted `server.secret` field is not a missing-secret finding.

### D1. Align prompt with the website

In `D:\GitHub\voice agents\demo-line\prompt.md`, replace “whatever calendar” and repair-price capabilities with the actual boundaries; answer the existing $250/month published price consistently and say usage/scope are confirmed before activation. Clarify that roleplay only requests a shop appointment. The real booking tools schedule **Dominic's consultation**, not a vehicle appointment. In `src/webhook.js`, align booking/SMS copy to a fit conversation, not guaranteed setup. Keep recording disclosure and explicit recording-link permission. Preserve model, voice, language and number attachment. Local prompt editing is different from updating the live Vapi assistant.

Some current `smoke.js` assertions require the obsolete sales close and four capability dials. Replace those obsolete copy assertions with checks for the new truthful boundaries; preserve meaningful safety and tool-contract coverage. Do not retain false claims merely to keep all 26 historical checks unchanged, or demand an unchanged test count.

### D2. Make capture and retries reliable

Implement the specialist report's R1-R5 with meaningful failure tests. Required contract: durable lead capture keyed by provider call ID, honest tool outcomes, persistent action/idempotency state, no duplicate recording texts or bookings, validated booking results, and SMS delivery-state handling. A warm-process Set, `/tmp` file or HTTP SMS acceptance must not be described as durable staff receipt. If storage and all notifications fail, the assistant must say it could not pass the request along and offer the verified human contact path. A failed first attempt must remain recoverable.

Keep explicit states: `captured_pending_delivery`, `notification_accepted`, `notification_delivered` where the provider actually confirms it, and `capture_failed`. If durable storage succeeds but all notification attempts fail, say the request was saved and delivery is pending; do not say “passed along to Dominic.” Schedule a durable retry. Test a provider timeout after possible success and a process restart: reconcile existing Cal bookings/Twilio message outcomes before retrying an uncertain action. An in-memory flag or timeout does not establish exactly-once side effects.

The backing durable service is not selected in this audit. Inspect the demo's existing approved infrastructure first, choose a supported existing durable store when available, and document the provider/migration/cost before provisioning anything new. Do not add a paid account, silently repurpose another project's database, remove backups, or disable authentication. If a store cannot yet be selected, prepare the local adapter contract and failure tests, but mark D2 **incomplete**. This does not block W0-W4 local work.

### D3. Controlled live verification after review

Prepare a test sheet for Dominic's later authorized session: normal roleplay, attempt to obtain a repair diagnosis/price/confirmed vehicle appointment, and a shop-owner consultation request. Check private recording disclosure, lead persistence, actual staff receipt, requested recording-link delivery, consent/opt-out behavior, real Cal booking and timezone, duplicate-event safety and cost. Use owned test contacts and the demo line only. Simulate outages locally. Never use a prospective shop's customer line for testing.

**Website preview can be complete while D2/D3 remain pending. Unsupervised demo promotion and paid traffic should wait for honest failure handling and a successful controlled call.** Founder discovery calls and link-free drafts can continue while these gates are resolved. Do not let adding the `tel:` link become a claim that delivery is production-ready.

**Demo CTA launch dependency:** W0-W4 passing means preview-ready. Publishing the live demo CTA depends on D1-D3 passing, including approved demo deployment changes and the subsequent controlled test. A later website-only deployment request must surface any remaining demo failures rather than silently treating local website checks as demo verification. Truth corrections and an ordinary fit-inquiry path can be reviewed separately if the demo is still pending.

## 7. Measurement contract

MVP measurement is service/campaign data reaching real lead records, plus a maintained contact/outcome ledger. A button click is not a call; a received email is not a qualified buyer; a booked consultation is not a paid client.

| Stage | Evidence required | Source |
|---|---|---|
| Search visibility | Finalized clicks/impressions with date/property/path | GSC |
| Landing visit | Accepted page-view event from an enabled analytics provider | Currently unverified |
| `demo_tel_click` | Deliberate CTA click; path/placement/campaign only | Analytics if enabled |
| `phone_inquiry_accepted` | Valid form and full provider batch acceptance | Existing lead API; inbox receipt checked separately |
| Demo call completed | Provider call record, not click or health probe | Vapi/Twilio, subject to retention |
| Qualified conversation | Confirmed buyer, pain, capacity, callback owner and next step | Founder outcome log |
| Paid pilot / renewal | Payment and agreed service period | Actual payment record |

No client analytics integration was found. Do not build a custom public telemetry backend merely for a demo link. The recommended optional adapter is Vercel Web Analytics if this deployment already has the appropriate approved plan: custom events require Pro/Enterprise. Inspect that before using `track()`; do not silently upgrade. Cover both static and React pages and verify accepted events, not just console output. If unavailable, finish form attribution and mark click/pageview analytics **not connected**, with no invented conversion rates. [Vercel custom-event documentation](https://vercel.com/docs/analytics/custom-events).

Keep raw names, email addresses, phone numbers, intake text, recordings, transcripts, full query strings and prospect IDs out of analytics. Use only controlled campaign labels and paths. A single PSTN number cannot carry per-visitor UTMs; treat web clicks and actual calls as separate evidence. Use volunteered source information and aggregate campaign windows without pretending exact joins.

Growth Brain economic events are a later verified integration, not something this site currently sends. Inspect `src/lib/business-event-ingest.ts` and existing approved event conventions there before wiring a trusted server path. Never expose its token in browser code, open a second process on its PGlite directory, or count a form submission as revenue. Until connected, maintain the operator ledger honestly.

## 8. How to drive relevant traffic and customers

### First 30 days: operate one small funnel

**Path:** verified shop owner contact → relevant phone page / supervised demonstration → qualified fit conversation → scoped paid pilot → completed follow-up review → renewal.

1. **First, finish W1-W4 and the demo gates.** Prepare direct outreach while corrections are being built; do not send people to stale “live customer” proof. No paid advertising yet.
2. **Use the best five existing auto-shop records first.** Refresh official website, published business contact, buyer role and exact observed workflow. Website opening hours do not prove callbacks take days; lack of online booking does not prove a missed-call problem. Ask the owner.
3. **Founder block: 20-30 minutes each weekday.** Review up to three prepared candidates, make personally authorized contacts, record what actually happened, and prioritize promised follow-ups. The automation prepares; Dominic's actual conversation and follow-through produce distribution.
4. **Discovery before a long pitch.** Ask what happens when nobody answers, how many actionable requests are missed, who returns them, current phone/shop software, available work capacity, and what result would justify renewing. A shop without enough callers may need demand generation; one without callback capacity may need workflow correction before automation.
5. **Offer a supervised demonstration tied to that answer.** Show the scenario they named. Explain what requires setup. Agree how staff will handle requests before discussing a pilot. Send a short written scope with volume/support/integration limits before activation.
6. **Follow up on confirmed contacts.** One useful follow-up after three business days and a final one after eight; maximum two unanswered follow-ups. Stop on reply, refusal, bounce or opt-out. Never count a draft as sent or automatically cold-call with AI voice.
7. **Friday: diagnose the earliest weak step.** No manager conversations suggests contact/channel/access problems. Conversations without confirmed pain suggest targeting/problem problems. Interested demos without purchases suggest urgency, scope, trust or price problems. Paid pilots without value/renewal suggest delivery or economics problems. Change one thing based on evidence rather than expand the list reflexively.

Initial goals are **10 substantive owner/manager conversations and one paid pilot**, not forecasts or statistical proof. Start evaluating delivery and support after the first paid account; one payment is not product-market fit. After ten real conversations showing weak pain/willingness to pay, revisit the segment/problem. After nonrenewal, investigate actual owner reasons and outcomes before increasing volume.

### Drafts to adapt, not messages sent

Email subject: **When nobody can pick up at [shop]**

> Hi [owner/service manager], I noticed [one freshly verified workflow detail]. What happens today when your team cannot answer a service call? I configure phone intake for repair shops so staff can follow up with the caller's details and request. I have an auto shop demonstration you can try. Would a short look at how it would handle your overflow calls be useful?

Use the observation only if sourced. After the destination and demo gates pass, add a single relevant link with campaign `sa_auto_pilot`: `https://aiconsultingsa.com/ai-phone-answering/?utm_source=outbound&utm_medium=email&utm_campaign=sa_auto_pilot`. No claim of their lost dollars, revenue saved or unverified software integration. Actual commercial email needs accurate sender identity and applicable postal/opt-out information; do not invent the address. [FTC business guidance](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business).

Human call opener:

> “Hi, this is Dominic with AI Consulting SA. I help with overflow phone intake. Who handles the process when your service advisors cannot pick up? I'm trying to learn whether callback requests are already working well or whether something gets missed.”

Follow-up draft:

> “One detail I should clarify: the proposed setup captures a request for your staff to confirm. It would not quote repairs or add jobs to your calendar without a separately verified integration. Is returning missed calls something your team is trying to improve?”

These are draft cores, not proof of contact or authorization to send. Replace brackets with verified facts or omit the sentence. Do not feed outdated `Money maker` generated pitches into the scheduled task unchanged.

### Supporting acquisition work, in order

- **Warm introductions and local partners:** ask existing real relationships with shop bookkeepers, phone/IT providers and local business operators for introductions to a shop with a confirmed problem. Prepare a one-paragraph referral explanation and one demo link; no invented affiliation or automated DMs.
- **A useful demonstration asset:** after controlled testing, make one owned sample showing intake → staff summary → human callback decision. Use test data and consented audio, label it a demonstration. Share where invited or allowed, with the page link. Do not fabricate a case study or manufacture forum mentions.
- **Local profiles:** verify GBP eligibility and existing listings, then prepare correct services/identity links. Bing/Apple presence complements discovery but is not a substitute for direct conversations. Unknown listing status is a research task, not permission to create duplicates.
- **Organic search:** improve the existing phone page and measure whether it becomes indexed and earns relevant impressions. Develop one genuinely useful follow-up article only when buyer questions or GSC evidence justify it. Do not create near-identical suburb pages or publish generic “AI for every industry” content as the primary customer plan.
- **Paid acquisition later:** only after a working page/demo, attribution, truthful offer and supportable pilot. A later proposal should set a hard budget, owner-approved offer, qualified-lead definition and stop condition. This audit authorizes no ad spend and predicts no CPC/CAC.

## 9. Scheduled task and durable continuity

Existing automation: **Prepare voice agent sales queue**, ID `prepare-voice-agent-sales-queue`. Weekdays at **9:00 a.m. America/Chicago**, standalone task per run, as requested. Update this existing automation's instructions when needed; do not create duplicates or convert it to a thread heartbeat.

Use these existing locations:

- Plan: `D:\GitHub\voice agents project\docs\outbound-validation-plan.md`
- Prospect identities: `D:\GitHub\Money maker\data\prospects.json`
- Rolling pending queue: `D:\GitHub\Money maker\out\outbound-queue.md`
- Append-only outcomes: `D:\GitHub\Money maker\data\outbound-events.jsonl`
- Compact continuity: `D:\GitHub\Money maker\out\outbound-handoff.md`
- Dated run outputs: `D:\GitHub\Money maker\out\outbound-runs\`

Queue/event files may be created on the first scheduled run; do not claim historical events exist because the paths are specified. Preserve existing prospect IDs and unresolved drafts. Deduplicate by ID plus verified domain/phone/ownership. Record source URL/date, known/unknown buyer role, actual contact timestamp/channel, outcome evidence, follow-up count, next action and suppression. Store only necessary business contact information.

Each run reconciles confirmed outcomes first, prepares up to three refreshed candidates and up to five due follow-ups, and stops adding first-contact drafts when ten remain unsent. Read the last handoff and any explicitly referenced source task for later user replies. A new task must not lose unsent work or infer permission from a prior draft. Notify on a newly useful queue, meaningful outcome or decision; do not repeat unchanged requests daily.

The website domain is now confirmed. The recurring task should read **this brief plus the latest build result**, and include the link only after the relevant truth/demo gates are actually verified. Otherwise prepare link-free openers. Automated research/drafting can be effective; it cannot substitute for actual contact, delivery and renewal evidence.

## 10. Verification, decision register and final handoff

### Checks already completed by this audit

- [x] Current repo/source/history and live home/phone page inspected.
- [x] Fresh GSC property totals, queries/pages, complete-date probe, sitemap and seven canonical inspections saved.
- [x] Live-browser campaign-loss reproduction and desktop/mobile screenshots saved; no live form submitted.
- [x] Site `npm run build`, `npm run lint`, `npm run test:lead-form` passed; 10 lead contract tests.
- [x] Existing demo `npm test` passed; 26 checks. Number/assistant attachment, health, authenticated synthetic status event and Cal availability verified.
- [x] Historical proof/cancellation, Growth Brain state, current prices and source limitations documented.
- [ ] Website implementation, demo failure fixes, real calls/delivery/bookings, live analytics, listing verification and production deployment remain undone.

### Builder acceptance checklist

Run from the website directory, as separate commands:

```powershell
npm run lint
npm run test:lead-form
npm run build
npm run preview -- --host 127.0.0.1
```

Inspect the **built preview**, since Vite development routing may serve the homepage for static service paths. Review 390px and desktop sizes, raw HTML with JavaScript disabled, keyboard navigation, all CTA targets, the inline form, tagged navigation and validation/errors using mocked network responses. Make sure success is never shown for incomplete batch acceptance or merely clicking submit. Regression-check existing homepage and assessment forms, other static-page styles, and all seven canonical URLs. Save screenshots and exact test results. Use scoped meaningful contract tests, not tests that merely assert arbitrary copy strings.

In the separate demo folder, run `npm test` and additional failure/replay tests for every modified delivery/booking path. Local checks do not replace D3.

| Decision / missing fact | Safe default until confirmed | Blocks |
|---|---|---|
| Included voice volume, overages, support scope, cancellation terms | Keep current inquiry-stage price; no new public promises | Paid pilot activation, not website preview |
| Durable demo storage/provider | Inspect approved infrastructure; prepare contract, no invented credentials | D2 and reliable live rollout |
| Real demo call/delivery/booking result and actual costs | State unverified; owner-controlled test later | Unsupervised promotion / paid traffic |
| GBP eligibility, street/ZIP, existing listing URLs | Use confirmed brand, business phone and service area only | Listing publication, not service page |
| Approved analytics plan/event receipt | Implement form attribution; mark page/click analytics unavailable if unconnected | Claimed click conversion rates / paid attribution |
| Historical shop permission to name or publish audio | Anonymous historical facts or remove public proof; owned demo data only | Named testimonial/recording publication |
| Current outbound sends outside the store | Reconcile actual evidence before recontact | Duplicate-safe outreach, not drafting |

Final builder deliverable: `docs/BUILD-RESULT-aiconsultingsa-voice-demo.md` containing commit/base if any, changed files and reasons, W0-W4/D1-D3 status, commands/results, preview screenshots, truth/pricing table, exact unresolved items, deployment status and a short next-auditor prompt. Include no secrets or customer transcripts. Update stale project memory only with verified durable facts; preserve historical documents as dated history.

### Evidence files and reading order

1. This master brief.
2. [Demo, pricing and reliability audit](audits/2026-09-13/demo-pricing-audit.md).
3. [Growth Brain and distribution audit](audits/2026-09-13/growth-context-audit.md).
4. `docs/audits/2026-09-13/gsc-evidence.json`, `gsc-indexing-supplemental.json`, `gsc-freshness-and-phone.json` for raw, dated GSC responses.
5. `browser-evidence.json`, `phone-mobile.png`, `phone-desktop.png`, `home-desktop.png`, `phone-tracking-before.png`, `contact-after-click.png` for live-browser observations.
6. `aeo-home-before.txt`, `aeo-phone-before.txt` for the actual skill heuristic output. Both were 7/7; neither establishes search success.

**Next action:** implement and review W0-W4, then complete the separate demo readiness work before sending visitors into an unattended demonstration. Validate the business with actual buyer conversations and renewal, not another count of pages, generated drafts or assistant features.
