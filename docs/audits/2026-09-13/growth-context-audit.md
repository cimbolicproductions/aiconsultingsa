# Growth and distribution context audit

Audited 2026-09-13. Read-only research; only this new report was written. No production, experiment, outreach, listing, or vault changes were made.

## Finding

The evidence supports a small organic audience and an unproven consulting acquisition process. It does not support saying the site has zero traffic, that an unanswered inquiry always becomes lost revenue, or that the new offer has already failed. The homepage changed materially on August 31, another page shipped September 5, and the readable Growth Brain notes lag the current collector. Historical outreach artifacts remain drafts unless an actual send record proves otherwise.

## Growth Brain state and conflicts

Read after MCP search: `D:/Documents/My thoughts/Growth Brain/Businesses/ai-first-solutions/agent-brief.md`, `marketing-loop.md`, and `learnings.md`.

| Field | Observed state |
|---|---|
| Reviewed through | Brief's session sentence says **2026-08-31**. There is no literal `reviewed_through` metadata field in the returned note. |
| Displayed evidence window | **2026-07-31 through 2026-08-27**. Its historical finding also refers to a 90-day reading through August 29. These are different windows. |
| Verdict | **experiment-concluded**, ended deliberately August 31, superseded by a positioning change approved by Dominic. |
| Historical treatment | Homepage title, H1, opening copy, and internal-link alignment for `ai consulting san antonio`. Started August 10. |
| New positioning | ChatGPT/AI search optimization, **$500 flat per page**, after the prior **$999 AI Tools Assessment** homepage emphasis. |
| Next move | Establish a fresh 28-day baseline: GSC, the new attribution form field, and monthly cold/logged-out ChatGPT and Gemini checks. Do not start another experiment during that period. September 28 is the approximate earliest review date if counted from August 31; actual clean finalized-data availability must be checked. |
| Primary business outcome | **Qualified discovery calls**, not clicks. |
| Outcome measurement in historical marketing note | **Missing**; no lead events had reached Growth Brain at that review. This does not prove no leads exist outside the system. |

The notes are internally inconsistent. The August 31 block says concluded/inconclusive-by-ceiling, but the same marketing-loop file retains an older action block saying running/too-early/concluded pending. `learnings.md` says one concluded experiment, one declined/weakened lesson, and **zero open or measuring experiments**. Treat these as distinct historical/generated records needing reconciliation, not permission to resume the old treatment.

The repository's durable policy also differs in emphasis: `D:/GitHub/portfolio-growth-brain/AGENTS.md` lists AI First Solutions as full-auto under guarded host policy, while this site's `AGENTS.md` and the brief require current-session explicit approval before a production change or new experiment. This audit did not resolve or change either policy.

### Newest collector evidence

`D:/GitHub/portfolio-growth-brain/data/logs/nightly-2026-09-13_033002.log` records:

- Started **2026-09-13 03:30:02 America/Chicago**.
- GSC window **2026-06-13 to 2026-09-10**, a rolling 90-day window ending three days earlier.
- `ai-first-solutions`, `sc-domain:aiconsultingsa.com`, status **connected**, **90 daily rows and 336 detail rows**.
- Explicit log statement that all seven active GSC projects were verified and synced.
- The later automation stage failed with: `Experiment 45e7fd14-f46e-4346-82d4-7e82ebc6c7dc is not an approved SEO experiment`.
- The same AI First Solutions hold appears in `data/logs/nightly-2026-09-11_033002.log`.

**That is a deployment/experiment-state failure after collection, not evidence of a failed GSC collection.** The row counts are neither clicks nor impressions. Other portfolio revenue in the same nightly log must not be attributed to AI Consulting SA.

The old implementation artifact remains at `D:/GitHub/portfolio-growth-brain/data/implementation-jobs/45e7fd14-f46e-4346-82d4-7e82ebc6c7dc.json`. Created August 10, it contains recommendation ID `b4c78ee9-2eb1-4d91-b7d7-425225bed1c6` and the historical query treatment. Its `status: ready` is not proof that the experiment is currently approved or measuring.

Collector/measurement paths for the next model:

- `D:/GitHub/portfolio-growth-brain/scripts/gsc-sync.ts`
- `D:/GitHub/portfolio-growth-brain/scripts/gsc-sync-all.ts`
- `D:/GitHub/portfolio-growth-brain/src/lib/gsc-api.ts`
- `D:/GitHub/portfolio-growth-brain/src/lib/gsc-sync.ts`
- `D:/GitHub/portfolio-growth-brain/src/lib/owner-scorecard.ts`
- `D:/GitHub/portfolio-growth-brain/src/lib/business-event-ingest.ts`

Do not run collection or analysis merely to read existing state: those commands persist data and may trigger other work. Follow the one-process-per-PGlite-directory rule. Property totals live in `daily_metrics`; `gsc_search_rows` are query/page evidence and must not be summed as site totals. The separate GSC audit in this directory should supply the current numeric snapshot.

## Historical traffic and measurement limitations

| Source and date | Historical evidence | Limit |
|---|---|---|
| Growth brief / August 31 marketing conclusion | 90 days through August 29: **302 impressions, 5 clicks**; measured query **113 impressions, 4 clicks, average position 7.0**. | These are historical note claims. Check property totals in current GSC evidence before reusing as authoritative site-wide totals. |
| `Projects/AI First Solutions.md`, September 5 entry | GSC baseline **June 3 to September 1: 10 clicks / 853 impressions**. | Different dates and substantially different totals. Do not silently blend this with 302/5. |
| Same September 5 entry | New `/do-i-need-to-pay-for-ai-san-antonio/` page shipped September 5, commit `4fb688d`; field attribution already reaches email. | A new page's prelaunch 0/0 is not its current performance. |
| Same entry | Sitemap registered May 15, last download August 27, zero errors; reported submitted 5/indexed 0 despite actual search traffic. | Historical sitemap counters alone do not establish all pages are unindexed. URL inspection is needed. |

The brief converts 113 query impressions into approximately 38 monthly searches, then projects 11 visits, one lead, and one client per quarter. **Those are assumptions, not measured search volume or conversion outcomes.** Search Console impressions measure this property's visibility, not the total demand for a query. The small observed audience is useful; an absolute market ceiling cannot be established from those numbers alone.

The August 31 offer change breaks a clean comparison against the original treatment. September 5's new hub and links are another intervention to annotate. Do not call later movement the causal result of one isolated edit.

## Entity and local distribution evidence

Canonical public-facing facts confirmed in repository `index.html` JSON-LD (`#business`) and consistently repeated across static service pages:

| Item | Confirmed value / status |
|---|---|
| Public brand | **AI Consulting SA** |
| Internal project/business label | **AI First Solutions** |
| Website | `https://aiconsultingsa.com/` |
| Business schema ID | `https://aiconsultingsa.com/#business` |
| Telephone | **+1-210-802-8945** |
| Location | **San Antonio, TX, US** |
| Street address / ZIP | **Unknown.** No street address or postal code in the reviewed business schema or project note. Do not invent or infer from coordinates. |
| Google Business Profile public URL / verified status | **Unknown.** July project follow-up says to confirm GBP services, but supplies no listing URL or current verification proof. |
| Bing Places listing URL / verified status | **Unknown.** No confirmed URL in the reviewed sources. |
| Apple Maps/Business Connect listing URL / verified status | **Unknown.** No confirmed URL in the reviewed sources. |

Unknown listing evidence does not mean the listings are absent. Discovery/verification is a next task; do not create duplicates or replace identity data from assumptions. The same schema contains San Antonio coordinates, which do not establish a staffed business address.

## Offer and distribution history

Primary source: vault `Projects/AI First Solutions.md`; repo `docs/outreach/verified-lead-dossier.md` and `docs/ai-tools-assessment/playbook/`.

- July: founder-led $999 assessment with a free workflow review; implementation separately scoped. July 19 owner preference removed Calendly from the actual intake process: agree a time by email and send a Calendar/Meet invitation. Older Calendly links in memory are not current scheduling instructions.
- August 30: a 28-business April lead list and seven-method acquisition playbook existed. The dated project entry explicitly reports **zero recorded outbound touches** and identifies Royalteeth and Anderson Garage messages as **unsent**. This is a historical recorded state, not proof no one has contacted them since.
- August 30 dossier: live website rechecks changed three of the top five April leads. Peterson Chiropractic had added scheduling, Tidy If You Please had contact/social channels, and Alamo Heights Chiropractic's phone number had changed. The lesson is operational: recheck each prospect's current evidence before using a draft.
- August 31: homepage switched to $500-per-page AEO; the assessment remains a secondary $999 offer. The later documented price ladder is simple automation **$250 setup plus optional $50/month support**, AI receptionist **$250/month**, and AEO **$500 once per page / $1,500 for up to five**. Treat current live offer audit as final authority before publishing more copy.
- September 5: new cost-comparison hub shipped, and the public auto-shop proof was updated to **48 calls, 40 distinct callers, 20 conversations longer than 20 seconds, August 17–31**. This is activity evidence, not verified incremental customer revenue for that shop.
- The project note's generic top-level statement about no paid assessment clients can coexist with a separately documented auto-shop payment. Do not say the entire business has no paying customer. The documented shop payment is one month at **$250/month**, with renewal then open.
- RentWashersSA's roughly five August AI-search customers are **owner-reported sister-business outcomes**, accompanied by screenshots. They are not AI Consulting SA leads or a controlled AEO experiment. The note explicitly flags personalization in the ChatGPT screenshot and asks for cold/logged-out checks.

### Draft hygiene before any future send

The August 30 dossier is a research and draft artifact, not a sent-message ledger. Its Royalteeth draft's 87-hour wait assumes nobody monitors requests while closed; opening hours alone do not prove response time. Its claim that a malformed SMS link fails on every phone also needs device-level confirmation. Anderson's approximate carrier cost and the promise of no monthly fee should be reconciled with the later optional-support tier and current provider pricing. Retain verified observations, label hypotheses, and never fabricate buyer losses or callbacks.

An effective distribution record should distinguish researched, evidence rechecked, draft ready, actually sent (channel/time/receipt), replied, conversation held, qualified, pilot paid, renewal, and suppressed. Count drafts as zero sends. Count calls or clicks separately from customers. No such current send/outcome ledger was confirmed in the reviewed sources.

## Bounded next steps for the main handoff

1. Use current property-level GSC evidence to diagnose visibility and indexing; preserve historical windows and mark interventions.
2. Verify that form attribution reaches the owner and that trusted lead/qualified-call/payment events reach Growth Brain. A form field is not equivalent to a connected economic funnel.
3. Reconcile the concluded experiment, stale ready implementation job, and repeated full-auto hold in a separately authorized maintenance change. Do not silently restart the old test.
4. Locate and verify existing GBP/Bing/Apple listings before proposing additions; use only confirmed business name, phone, service area, and address policy.
5. Finish a small evidence-backed outreach queue with actual send/reply/outcome tracking. Audit artifacts and scheduled drafts can support distribution, but cannot count as distribution themselves.

No vault notes or durable policy files were updated by this subtask; the main task owns closeout.
