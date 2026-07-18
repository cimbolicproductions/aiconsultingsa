# Phase 3: The Report (the design template)

This is the client-facing deliverable and the single most iterated piece of the whole model (twelve rewrites). It is built in **Claude Design** (Gamma works too; Claude Design is easier). A downloadable, plug-and-play version of this exact template lives at **[audittemplate.ai](https://audittemplate.ai)**: grab it and drop it into Claude Design.

## The design principle (read before you build)

**A confused mind does not buy, implement, get ROI, or upsell.** Even though they already paid, a confused client freezes and does nothing, which means no ROI and no upsell. So the only question while building is: what can I delete, simplify, or rearrange to make the ROI clearer and the next step easier? Keep it stupid simple.

## The nine parts

Fill every field. If a value is unknown, write `unknown: get from client`, never a guess. Numbers must trace to the client's own words or a tool's own website.

### 1. Title slide

```
AI Tools Assessment
Client: <business name>
Date: <date>
Business type: <industry>
Primary focus: <Effectiveness | Efficiency | Quality>
```

### 2. Executive summary

Only room for the essentials. That is the point.

```
Your main pain point(s): <one or two, in plain language>
The outcome you'll get: <the single main result of implementing this report>
Hours you can reclaim each week: <5-10; the average lands around 7>
Primary focus of this report: <Effectiveness | Efficiency | Quality>
```

### 3. Effort vs Impact Matrix

The framework that makes the whole report legible at a glance. A 2x2:

```
                 HIGH IMPACT
                     |
   QUICK WINS        |     MAJOR PROJECTS
   (this report)     |     (what comes next)
   low effort ───────┼─────── high effort
                     |
   (skip / later)    |     (nice-to-have)
                     |
                 LOW IMPACT
```

- **Top-left = Quick Wins:** high impact, low effort. Off-the-shelf tools they can just sign up for. This report focuses here.
- **Top-right = Major Projects:** high impact, high effort. No off-the-shelf fix; needs a build. These are teed up later as upsells.

### 4. Quick wins summary

One line per win: the pain in a phrase, an arrow, the tool. Nothing more.

```
<5 hours a week in email>            →  <SaneBox>
<Taking notes by hand in meetings>   →  <Fathom.ai>
<...>                                →  <...>
```

### 5. Recommended solutions (the deep dive)

The heart of the report. You will spend about half the review call on this slide. One block per tool:

```
Tool: <name>
Solves: <the exact pain point>
Cost: $<x>/month
Setup time: <e.g. 30 minutes>
Time saved: <e.g. 2 hours/week>
```

Then it is boom, boom, boom, one to the next. This is the pain / tool / cost / setup / savings rhythm.

### 6. Four-day quick start plan

The antidote to overwhelm. Four days, one tiny action each, no more than 5 to 10 minutes a day. Following it gets them the vast majority of the report's benefit in four days.

```
Day 1: <one simple action, ~5 min>  → benefit: <...>
Day 2: <one simple action, ~5 min>  → benefit: <...>
Day 3: <one simple action, ~5 min>  → benefit: <...>
Day 4: <one simple action, ~5 min>  → benefit: <...>
```

### 7. What comes after quick wins

Where you tee up the upsell without pitching. Pull the Major Projects from the top-right quadrant and describe them plainly. When you talk through these on the review call, the client's natural next question is "can you help us do that?" That is the seed.

```
Beyond the quick wins, these higher-impact projects need a build:
- <Major project 1: e.g. a custom Claude skill for your onboarding workflow>
- <Major project 2: e.g. a knowledge base so buyers self-serve>
```

### 8. Financial impact

Quantify the ROI in the client's own numbers. Transparent assumptions, no invented figures.

```
Monthly net ROI = (weekly hours reclaimed × your hourly rate × ~4.3 weeks) − monthly tool cost

Weekly hours reclaimed: <e.g. 7>
Your hourly rate: $<e.g. 150>
Monthly tool cost: $<avg lands around 60>
→ Monthly net ROI: $<result>
```

The average prescribed tool stack runs about $60/month. Reclaiming ~7 hours a week against most owners' hourly value lands the ROI in the four figures a month, sometimes five. State assumptions on the slide so it reads as honest math, not a sales claim.

### 9. Next steps

```
1. Follow the four-day quick start plan above.
2. Book your review call so we can walk it together and prioritize.
```

## Output format from Claude

When the `/ai-tools-assessment` skill fills this, it returns the nine sections as clean markdown in this exact order so you can paste them into Claude Design (or the audittemplate.ai template) and format. Then email the finished report to the client before the [review call](04-phase-4-review-call.md).

## Honesty guardrails (align with the site's discipline)

- ROI uses the client's **own** stated hours and hourly rate. Label every assumption.
- Do not put a money-back or guaranteed-5-hours promise in the report unless you have decided to stand behind it; the public site deliberately omits it.
- No fabricated stats, testimonials, or averages presented as this client's result.
