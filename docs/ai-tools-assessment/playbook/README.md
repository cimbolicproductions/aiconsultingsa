# AI Tools Assessment Playbook

The fulfillment engine for the $999 AI Tools Assessment sold at [aiconsultingsa.com](https://aiconsultingsa.com). This folder is the **canonical, human-readable playbook**: the exact question scripts, the AI research prompt, and the report design template used to deliver the offer once a customer signs.

The website sells the assessment. This playbook delivers it. Research, quality control, reporting, and delivery stay human led, exactly as the README states.

> **Source.** Distilled from Corey Ganim's walkthrough on Greg Isenberg's Startup Ideas Podcast, "The $1,000/hour Solo AI business (Full Course)." Transcript: `D:\Documents\My thoughts\Transcripts\The_1000hour_Solo_AI_business_Full_Course.md`.

## The offer in one line

Sit with a small business owner for 45 minutes, pull out their biggest time drains, and prescribe three to seven off-the-shelf AI or SaaS tools that reclaim five to ten hours a week. You are a doctor writing a prescription, not a builder. The $999 assessment is the foot in the door. The real money is the implementation and retainer upsells it opens.

Ideal client: owner-led business, roughly 2 to 20 employees, $500k to $5M revenue. That range is internal targeting guidance only: the public fit is "an owner led San Antonio service business with a repeated workflow," and the site explicitly says team size does not determine eligibility. (The site also deliberately omits the money-back promise. Keep both internal.)

## How to run it (five phases)

| Phase | File | What happens | Who leads |
|-------|------|--------------|-----------|
| 0. Lead intake | [`00-phase-0-lead-intake-free-review.md`](00-phase-0-lead-intake-free-review.md) | Free workflow review reply, qualify, collect $999, schedule, agree data boundaries. | You (email) |
| 1. Discovery call | [`01-phase-1-discovery-call.md`](01-phase-1-discovery-call.md) | 45-min recorded interview. Ask, probe, never pitch. Capture the current tool stack. | You (live) |
| 2. AI research | [`02-phase-2-ai-research-prompt.md`](02-phase-2-ai-research-prompt.md) | Feed the transcript to Claude, research real tools, human QA pass. | Claude + you |
| 3. Report | [`03-phase-3-report-template.md`](03-phase-3-report-template.md) | Fill the 9-part template, build it in Claude Design. | Claude + you |
| 4. Review call | [`04-phase-4-review-call.md`](04-phase-4-review-call.md) | Screen-share the report, ask the 3 closing questions. | You (live) |

Then choose what to sell next:

- [`05-upsell-menu.md`](05-upsell-menu.md): the six implementation upsells and the assessment-credit close.
- [`06-ai-concierge-retainer.md`](06-ai-concierge-retainer.md): the recurring "AI concierge" retainer and the Audit / Optimize / Automate loop.
- [`07-client-acquisition-7-methods.md`](07-client-acquisition-7-methods.md): seven ways to find clients with no capital and no audience.

## The one principle behind the whole thing

**A confused mind does not buy, does not implement, does not get ROI, and does not upsell.** Every artifact here is made stupid simple on purpose. Corey iterated the report twelve times asking only: what can I delete, simplify, or rearrange to make the ROI clearer and the next step easier. Hold that bar.

## Automation

There is a Claude skill that runs Phases 2 and 3 for you (extract pain points, research real tools, fill the report template): invoke `/ai-tools-assessment` in Claude Code. The skill carries a baseline copy of the prompt and template. **This folder is canonical.** When you refine the prompt or template here, mirror the change into the skill at `C:\Users\djcim\.claude\skills\ai-tools-assessment\SKILL.md` so the two never drift.
