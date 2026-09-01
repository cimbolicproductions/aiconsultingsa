# NEXT TASK: build the page that owns the parent question

> **Status of everything else:** all six pages on aiconsultingsa.com audit **7/7** live as of
> 2026-09-01, HEAD `967a285`. This is the one meaningful gap left on the site.

---

## The problem in one paragraph

The site answers the same question on six different pages and **states it on none of them.**
Every service page answers an instance ("how much does missed call text back cost", "how much
does it cost to automate a document path"). Nobody has written the parent question down.

An answer engine can only cite what is written. The parent answer currently has to be assembled
by a reader across six pages, and synthesis is exactly what loses to a page that hands over one
sentence. That is the core mechanic of the `seo-answer-engine` skill and this site violates it
at the category level.

## The question to own

> **"Do I actually need to pay someone for this, and what does it really cost if I do?"**

This is the refusal gap at category level. Every vendor page in this space answers "yes, buy
ours", because every one of them has a quota. **The honest answer to "should I buy at all" is
not published anywhere by anyone with a stake in it.** Whoever answers the dodged question
becomes the source.

## What to build

One new static page under `public/<slug>/index.html`, matching the existing static page pattern
exactly (copy the structure of `public/ai-phone-answering/index.html`).

**Slug suggestion:** `do-i-need-to-pay-for-ai-san-antonio` (open to better).
**Title suggestion:** `Do I Need to Pay for AI? Real Costs From $0` (43 chars, carries a number).

It must:

1. **State the question as an H1 or a question-shaped H2**, and answer it in ONE paragraph
   directly beneath, standalone, no pronouns pointing at earlier sections.
2. **Give the honest answer, which is "usually no."** Most small businesses should turn on a
   feature they already pay for, or use a free tier. Say that first, before anything else.
3. **Give the test** for when paying IS right: roughly weekly repetition, a settled process, and
   an outcome worth more than the build.
4. **One table** summarising the real range across all four service areas, every row dated and
   sourced, including the free options.
5. **Link the six instances as evidence**, each with its own number, so the page is a hub.
6. **Mirror every question block into `FAQPage` JSON-LD** with text matching the visible copy.

---

## VERIFIED FACTS. Use these. Do not invent others.

### Dominic's own pricing (current, live on the site)

| Offer | Price |
|---|---|
| Simple automation build (one workflow) | $250 setup + **optional** $50/mo support, cancel any month |
| AI receptionist that answers calls | $250/mo, no setup fee |
| ChatGPT / AI search optimization | $500 flat per page, $1,500 up to five, no retainer |
| AI Tools Assessment | $999 flat |
| First workflow review / page score | Free |

### Market pricing, verified against vendors' own published pages

- Twilio (verified 2026-08-30): local number **$1.15/mo**; SMS ~**$0.008**/segment plus carrier
  fees ~$0.003-0.0065; inbound voice $0.0085/min; A2P 10DLC $4 one time. Realistic all-in for a
  small shop: **$3 to $15/mo**.
- Make (verified 2026-08-31): free tier **1,000 credits/mo**; Core **$12/mo**.
- Zapier (verified 2026-08-31): free tier; Team $69/mo.
- Missed call text back standalone tools: $20 to $100/mo.
- AI answering services: from about $25/mo.
- CRM/reputation suites (GoHighLevel, Podium, Birdeye and similar): $300 to $500/mo.
- AI agent platforms: $200 to $800/mo.
- AEO/GEO agencies (verified 2026-08-31): self-serve tools $29-489/mo; cheapest named local
  package **$1,550/mo**; one-time AI visibility audits **$1,500-5,000**; mid-market retainers
  $3,000-8,000/mo; enterprise $10,000-25,000+/mo.

### Proof that may be cited

**RentWashersSA (Dominic's own business, may be named):** cited first by BOTH ChatGPT and Gemini
for "cheap washer and dryer rental" on 2026-08-30. ChatGPT ranked it ABOVE a competitor
advertising $59.99, because that competitor's real total is $66.71 with service fee and tax.
Gemini listed genuinely cheaper options ($49.99, $29.99) and still led with it. Dominic reports
**~5 customers in August 2026** from that channel, better quality than Facebook Marketplace.

**The auto shop (MUST STAY ANONYMOUS, permission never requested):** refer to it only as
"a local San Antonio auto shop". Verified from the Vapi API 2026-08-31: **48 calls, 40 distinct
callers, 2026-08-17 to 2026-08-31**, 20 conversations over 20s, 11 over 60s, zero from Dominic's
own cell. Pays **$250/month**, has paid one month, **renewal genuinely undecided**.

### HARD PROHIBITIONS

- **Never name the auto shop**, its owner, or its street. Permission was never asked for.
- **Never claim a lifetime call total.** Vapi retains only 14 days; June and July are gone. An
  internal estimate of ~160 calls exists and **must never appear on the site** because it cannot
  be produced on demand.
- **Never claim the shop is an ongoing client.** One month paid, renewal open. Say exactly that.
- **Never invent a competitor's price.** If a real total is not published, write "not disclosed",
  which is itself the finding.
- Every published number carries a **source and a date**.

---

## Method and house rules

- **Run the `seo-answer-engine` skill.** It is the SEO-cluster spoke that defines this method.
  Audit with `python ~/.claude/skills/seo-answer-engine/scripts/audit.py <url>`. Target 7/7.
  Read `reference/evidence.md` in that skill for the full case, and note the loader hazard: a
  bare `$` plus one or two digits in a SKILL.md gets replaced by positional args.
- **No em dashes in user-facing copy.** House style. Use periods, commas or restructure.
- **Growth Brain rule:** never commit, push or deploy without Dominic's explicit approval in that
  session. `Growth Brain/Businesses/ai-first-solutions/agent-brief.md` currently reads
  `verdict: experiment-concluded`; do not start a new experiment, a fresh baseline is being
  collected for 28 days from 2026-08-31.

## Verify by doing

```bash
npm run build && npm run lint
npm run preview -- --host 127.0.0.1 --port 4173    # dev mode LIES about static routes
python ~/.claude/skills/seo-answer-engine/scripts/audit.py http://127.0.0.1:4173/<slug>/
```

Then, after deploy, probe the **live domain**, never the build state. Also:

- Add the page to `public/sitemap.xml` and cross-link it from the other static pages' nav/footer.
- Confirm no horizontal overflow at 390px; wide tables scroll inside `.table-scroll`.
- Validate every JSON-LD block parses.
- **A push can be silently skipped by the Vercel webhook.** It happened on 2026-08-31: the commit
  reached origin and no deployment was created, and the previous build kept serving with no error
  anywhere. If a change is not live within ~2 minutes, check the deployment list for your actual
  commit SHA rather than assuming it is slow. An empty commit re-fires the webhook. The Vercel
  CLI is NOT installed on this machine.
- **A sweep that finds nothing must be proven able to find something.** A grep with broken
  escaping returns empty and reads as a pass. Test it against a string you know is present.
