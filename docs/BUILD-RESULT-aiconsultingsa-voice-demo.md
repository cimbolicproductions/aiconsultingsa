# Build result: AI Consulting SA phone page, truth corrections and lead attribution

Built **2026-09-13** against `docs/NEXT-BUILD-aiconsultingsa-voice-demo.md`.

**Status: W0 to W4 complete and verified locally. Nothing is deployed. Nothing is committed.**
The working tree is dirty and awaiting Dominic's review. D1 to D3 (the separate demo project) were
**NOT RUN**; they are a different repository and were not part of this run.

Base commit: `4fb688d` (`feat(aeo): add the page that owns the parent question`). Verified as current
HEAD before editing; no other agent had advanced the branch.

---

## 1. Task status

| Task | Status | Evidence |
|---|---|---|
| W0 read and preserve | **PASS** | Every touched file read first. `docs/voice-offer-contract.md` created. |
| W1 correct truth before adding traffic | **PASS** | 5 files corrected. 25 automated assertions, plus rendered-DOM checks. |
| W2 one clear phone landing page | **PASS** | Page rebuilt to the specified section order. Verified at 390, 1366 and 1520 CSS px. |
| W3 service intent and attribution | **PASS** | 15 new contract tests. Campaign relay verified live in a real browser. |
| W4 search, local identity, answer quality | **PASS** | 7/7 routes 200 with correct self-canonicals. JSON-LD parses and matches visible copy. |
| D1 align demo prompt with website | **NOT RUN** | Different repo (`D:\GitHub\voice agents\demo-line`). Out of scope for this run. |
| D2 durable capture and retries | **NOT RUN** | Same. This is the blocker for the live demo CTA. |
| D3 controlled live verification | **NOT RUN** | Requires Dominic's authorised call session. |

---

## 2. Files changed

| File | Change |
|---|---|
| `public/ai-phone-answering/index.html` | Rebuilt. New title/description, auto shop positioning, demo card, test prompts, pilot scope, price plus textback alternative, demo boundaries, honest historical proof, 7 FAQs, inline fit form, new JSON-LD. |
| `api/lead.js` | Service-aware. `service_interest` allowlist, campaign and landing path contracts, `response_mode`, service-specific confirmations, server-owned redirect map, server-rendered no-JS confirmation. |
| `public/campaign-fields.js` | **New.** Campaign relay, session persistence, response mode upgrade, post-redirect confirmation reveal. |
| `index.html` | Homepage fallback: corrected H1 and opening claim, dated result, new crawlable phone section, JSON-LD price and description. |
| `src/AIConsultingServicesPage.jsx` | Same corrections in the hydrated homepage. Descriptive phone page anchor. |
| `public/do-i-need-to-pay-for-ai-san-antonio/index.html` | Cancellation stated. A2P cost corrected in 3 places (visible copy, table, JSON-LD). |
| `public/sitemap.xml` | `lastmod` for the 3 materially changed pages only. Phone page raised to weekly/0.9. |
| `vercel.json` | Added the missing `/chatgpt-optimization-san-antonio/index.html` canonical redirect. |
| `tests/lead-form-contract.test.mjs` | 10 tests to 25. Added 3 pages to the public source scan. |
| `docs/voice-offer-contract.md` | **New.** The shared factual reference. |

---

## 3. Commands run

```
npm run lint            exit 0
npm run test:lead-form  25 tests, 25 pass, 0 fail   (was 10)
npm run build           exit 0, built in 2.87s
npx vite preview --host 127.0.0.1 --port 4174
node --check public/campaign-fields.js   exit 0
```

Preview inspected in Chrome at `http://127.0.0.1:4174`. The **built** output was inspected, not dev,
because Vite dev serves the React homepage for static trailing-slash routes.

---

## 4. What was actually verified, and how

Everything below was measured from **rendered output** (computed styles, bounding rectangles, parsed
JSON), never from source strings or element properties alone.

### Truth corrections

| Claim | Before | After |
|---|---|---|
| Homepage H1 | "ChatGPT is already recommending someone in San Antonio. I make sure it's you." | "ChatGPT is already recommending someone in San Antonio." plus the approved sentence in the lead paragraph. |
| Sister business result | "five customers last month" (re-dates itself every month it stays up) | "In August 2026... about five customers... my own count of my own leads rather than an instrumented number." |
| Auto shop proof | "has had the fuller version answering their real phone since June", "whether he renews is genuinely still open" | "That deployment ended on 5 September 2026. The shop paid for one month and cancelled." |
| Phone page entry | "Assessment first. Confirm the call workflow before choosing the build." | Removed. "No assessment is required to talk about this." |
| A2P 10DLC | "$4 one time plus a small monthly campaign fee" | "campaign vetting alone is $15, with brand registration and a monthly campaign charge on top" |
| Capability | "routes urgent calls, books the next step", "whatever calendar" | Request capture for staff confirmation. Booking and quoting explicitly excluded. |

Verified by assertion across all 9 public sources: no `whether .. renews`, no `has paid one month so
far`, no `live since`, no `I make sure it`, no `$4 one time`. Homepage corrections confirmed in **both**
the raw fallback HTML and the compiled React bundle, so hydration cannot restore the old claim.

### Demo CTA separation

- 3 links to `tel:+15139607996`, 6 to `tel:+12108028945`. No other phone number on the page.
- The business number is still the entity `telephone` in JSON-LD. The demo number appears only as a
  `contactPoint` described as a demonstration line.
- Recording disclosure renders visible (not merely present in source) and appears above the form.
- "A 513 area code, not local to San Antonio" renders on the page.
- All `tel:` links open a dialer. Nothing initiates a call.

### Form contract, measured in the browser

| Behaviour | Result |
|---|---|
| Tagged arrival `?utm_source=outbound&utm_medium=email&utm_campaign=sa_auto_pilot&utm_content=opener_a` | All 4 fields populated and stored |
| Untagged internal navigation | Campaign **persisted** |
| New campaign arrives | Whole group **replaced**; stale `utm_content` cleared to empty, campaigns did not mix |
| Malformed tags (`Bad Value!`, `owner@example.com`) | Ignored; previous valid campaign retained |
| `?submitted=true` | Confirmation revealed, `display: block` |
| No `submitted` flag | Confirmation stays `display: none` |
| Static `response_mode` | `html`; upgraded to `redirect` by the script |

### Accessibility and layout, three viewports

| Check | 390x844 | 1366x768 | 1520x734 |
|---|---|---|---|
| Horizontal overflow | none | none | none |
| Visible form fields >= 44px | 6/6 | 6/6 | 6/6 |
| Button tap targets >= 44px | 6/6 | 6/6 | 6/6 |
| Demo CTA within first screen | yes (bottom 751) | yes (bottom 637) | yes (bottom 637) |
| Post-submit confirmation fully visible | yes | yes | yes |
| Form visible on the same screen | yes | yes | yes |

Keyboard order: `name > business > email > phone > source > workflow > submit`. The honeypot is excluded
(`tabindex=-1`, `display:none`) and is the only zero-height field. Focus ring confirmed with a real Tab
keypress: `:focus-visible` true, `outline: solid 3px rgb(180, 83, 9)`. Exactly one H1. No text under 12px.
Console clean.

### Structured data

All 7 pages parse. All 7 self-canonicals correct. All indexable. Sitemap contains exactly the 7 real
routes and nothing else. **All 7 JSON-LD FAQ entries match the visible `<details>` answers byte for byte**
after whitespace normalisation, so the machine-readable copy cannot drift from what a visitor reads.
JSON-LD offer price `250` matches the rendered price. No invented street address, opening hours, reviews,
or `sameAs`.

---

## 5. Bugs found and fixed during verification

Four defects were found by measuring rather than by reading. Each is listed because each would have
shipped silently.

1. **Over-length campaign values were silently truncated into valid ones.** `readField(..., 80)` sliced an
   81 character `utm_content` down to exactly 80, which then passed the `{1,80}` pattern. A malformed
   value became a real-looking campaign label nobody ever used. Now read to 200 and rejected outright.
2. **Form fields rendered 42px, under the 44px touch target.** Only visible in a genuine 390px viewport.
   Fixed with `min-height: 44px` and `padding: 13px 12px`.
3. **The sticky header hid the heading after the post-submit redirect.** `#phone-fit` is the redirect
   target; the header covered it by 85px on mobile. Fixed with `scroll-margin-top`.
4. **The shared sticky header occupies 207px, 24% of a 390px screen, permanently.** The nav wraps to four
   rows at mobile. Released to `position: static` below 820px **for this page only**.

Two of my own verification assertions were also wrong and are worth recording so the next auditor does
not repeat them: `innerText` does not return text inside collapsed `<details>`, so FAQ content read as
missing when it was present; and `resize_window` reported success while the viewport stayed at 1408px,
so an apparent mobile test was actually a desktop one. Real viewport measurement was done in a sized
same-origin iframe instead.

---

## 6. Truth and pricing table as published

| Item | Published value | Status |
|---|---|---|
| AI phone answering | $250/month, no setup fee | Existing published price, republished. Not new terms. |
| Missed call textback | $250 setup, optional $50/month, provider charges separate | Existing published price. |
| AEO / ChatGPT optimization | $500/page, $1,500 up to five | Unchanged, kept off the phone decision path. |
| AI Tools Assessment | $999 | Unchanged, no longer a prerequisite to the phone offer. |
| Provider costs cited | Vapi $0.05/min, Twilio $0.0085/min inbound, $1.15/month number | Dated 13 September 2026, framed as the provider's cost, never the customer's total. |
| Historical proof | 48 calls, 40 numbers, 20 conversations over 20s, 17 to 31 Aug 2026, $250/month, **ended 5 Sep 2026** | Complete and bounded. |

Included minutes, overages, support hours, cancellation terms, trials, SLA and integration fees remain
**UNCONFIRMED** and appear nowhere public. They are listed in `docs/voice-offer-contract.md` section 2.

---

## 7. Unresolved, and what each one blocks

| Item | Blocks |
|---|---|
| **D1 to D3 demo readiness** | The live demo `tel:` CTA. The link is built but must not be promoted until durable capture, honest failure handling and one controlled live call pass. |
| Durable demo storage provider | D2. Not selected; no credential invented. |
| Written pilot scope | Activating a paid pilot, not this preview. |
| GBP / Bing / Apple listing URLs and eligibility | Listing publication. Status is UNKNOWN, not proven missing. |
| Analytics | `demo_tel_click` and page view events. **No client analytics is connected.** Form attribution is done; click and pageview tracking is deliberately not claimed. |
| Permission to name the shop or publish audio | Named testimonial or recording. |
| Homepage `<title>` still reads "Get Cited by ChatGPT" | Judgment call left to Dominic. I corrected the H1 guarantee but left the title, because the title is the measured GSC variable and changing it breaks the new baseline a second time. Flagged, not changed. |
| Other five static pages keep the 207px mobile sticky header | Not fixed, to avoid regressing pages outside this brief. Worth a separate pass. |

---

## 8. Growth Brain interaction, stated plainly

Growth Brain is reviewed through **2026-08-31**, verdict **experiment-concluded**, next move **collect a
fresh 28-day baseline and start no new experiment**, approximate review date 2026-09-28.

**Deploying this changes the homepage H1, meta description and JSON-LD during that baseline window.**
That is a second measurement intervention on a series that was already broken by design on August 31, and
it will push a clean baseline out by roughly another 28 days from the deploy date.

The brief instructed the correction and required it be logged as an intervention. I applied it because the
old sentence claimed a guaranteed AI recommendation, and a truth correction should not wait on a
measurement window. **Dominic should decide whether to deploy the homepage change now or hold it until
2026-09-28.** The phone page, form, API and sitemap changes are independent of the homepage and can ship
without touching the baseline.

Nothing in Growth Brain was read beyond `agent-brief.md`, and nothing in its database was modified. The
unapproved experiment `45e7fd14-f46e-4346-82d4-7e82ebc6c7dc` was left alone.

---

## 9. Evidence

- `docs/audits/2026-09-13/after/phone-desktop-after.jpg`
- `docs/audits/2026-09-13/after/phone-mobile-after.jpg`
- `docs/audits/2026-09-13/after/phone-mobile-submitted-after.jpg`
- Pre-existing "before" evidence remains in `docs/audits/2026-09-13/`.

No secrets, customer transcripts, caller data or recipient addresses appear in this document or in any
changed file. The test that forbids an email address in public sources now covers 9 files, up from 6.

---

## 10. Prompt for the next auditor

> Work in `D:\GitHub\ai first solutions` on an uncommitted working tree based on `4fb688d`. Read
> `docs/NEXT-BUILD-aiconsultingsa-voice-demo.md`, this result, and `docs/voice-offer-contract.md`.
> W0 to W4 are complete and verified locally; nothing is deployed or committed. Verify the claims in
> section 4 independently rather than trusting them: run `npm run lint`, `npm run test:lead-form`,
> `npm run build`, then `npx vite preview --host 127.0.0.1 --port 4174` and inspect the BUILT output at
> 390, 1366 and 1520 CSS px. Confirm no public page claims a current phone customer, that the demo number
> `+15139607996` is never presented as the business number or as local to San Antonio, and that JSON-LD
> still matches visible copy. Then either (a) take the D1 to D3 demo workstream in
> `D:\GitHub\voice agents\demo-line`, which is the only thing blocking the live demo CTA, or (b) prepare
> deployment with Dominic's explicit approval, treating the homepage copy change as a measurement
> intervention against a Growth Brain baseline that is mid-collection. Do not deploy, commit, place calls,
> send outreach, submit the live form, or start an experiment without his approval in that session.
