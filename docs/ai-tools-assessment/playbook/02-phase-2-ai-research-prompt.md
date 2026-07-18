# Phase 2: AI Research (the exact prompt)

Take the transcript from the Phase 1 note-taker and hand it to Claude. Claude catches patterns you missed and finds tools you did not know existed. It gets you 60 to 70 percent of the way there on your first few assessments and close to copy-paste by your fourth, fifth, or sixth as the prompt gets dialed in.

## The simple baseline prompt (Corey's words, verbatim)

Good enough to start. Attach the transcript, then:

> I just had a call with a business owner. Attached is the transcript of our conversation. I need you to go on the internet and research off-the-shelf SaaS or AI tools that can fix those pain points.

## The production prompt (use this one)

This is the baseline expanded so the output maps straight onto the [report template](03-phase-3-report-template.md). Paste it above the transcript.

```
You are my research analyst for an AI Tools Assessment. Attached is the transcript
of a 45-minute discovery call with a small business owner.

CONTEXT
- Business: <name, industry, headcount, rough revenue>
- Their effective hourly rate: $<rate>   (used for ROI math; if unknown, say so)

DO THIS
1. Extract every distinct pain point, bottleneck, or dreaded/repetitive task in the
   transcript. Quote the line that shows it. Estimate hours per week it costs.
2. For each pain point, go on the internet and find a specific, real, off-the-shelf
   SaaS or AI tool that fixes it. Prefer tools that are simple for a non-technical
   owner to adopt. Right-size to the business: a 4-person landscaper does not need
   Salesforce.
3. For each recommended tool, verify against its own current website and return:
   - Tool name and one-line description
   - The exact pain point it solves
   - Current price (per month): pull the real number, do not guess
   - Setup time (realistic, in minutes/hours)
   - Estimated hours/week it saves
   - Which of the three ROI levers it pulls: EFFECTIVENESS (makes money),
     EFFICIENCY (saves time), or QUALITY (better product/service)
4. Separate the findings into two buckets:
   - QUICK WINS: high impact, low effort. An off-the-shelf tool they can sign up for
     and use immediately.
   - MAJOR PROJECTS: high impact, high effort. No off-the-shelf fix; needs a build
     (a custom Claude skill, a knowledge base, an automation). These become upsells.
5. Total the reclaimable hours/week across the quick wins. Flag if it is under 5.

RULES
- Never invent a tool, a price, or a statistic. If you cannot verify it, mark it
  "unverified: needs manual check" and move on.
- Directories to mine: futurepedia.io and theresanaiforthat.com (both tag tools by
  industry, e.g. filter for "real estate" or "HVAC").
- Output as a structured list I can drop straight into the report template.
```

## The human QA step (do not skip)

Claude's output is a draft, not the deliverable. Review every recommendation before it reaches the report.

**Decision rule for substitutions (right-sizing):** if a prescribed tool is too heavy, too expensive, or too enterprise for this specific business, swap it for the simplest tool that solves the same pain without losing capability the client actually needs. State the swap. The canonical example: Claude prescribes Salesforce to a four-person landscaping business that just needs follow-up. Sub in a lightweight small-business CRM instead.

Check each line:

- [ ] Is this tool real and still live? (Open its site.)
- [ ] Is the price current?
- [ ] Is it right-sized for this business?
- [ ] Does it actually solve the quoted pain?
- [ ] Does it pull at least one of the three levers?

## The three ROI levers

Every tool you prescribe must pull at least one, or it is not worth the client's time:

1. **Effectiveness**: makes them more money.
2. **Efficiency**: saves them time.
3. **Quality**: improves their product or service.

The majority lever across your recommendations becomes the report's "primary focus."

## A note on what you are really selling

Most of what you prescribe is plain SaaS the owner simply did not know existed. No AI involved at all much of the time. Sometimes the right answer is "turn this exact workflow into a Claude skill" (20 to 30 minutes to build), which most owners have never done. That gap is the doorway to the AI Concierge upsell.

## Turning this into a real Claude skill (evals over time)

After a few assessments, feed past transcripts **and** their finished reports back into your Claude setup so it learns what "good" looks like for you. That is what moves you from 60 percent drafts to near copy-paste. The `/ai-tools-assessment` skill is the home for that refinement.
