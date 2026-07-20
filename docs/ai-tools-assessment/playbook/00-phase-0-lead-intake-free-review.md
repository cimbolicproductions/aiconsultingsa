# Phase 0: Lead Intake and the Free Workflow Review

The website's front door. Every customer starts here, not at the discovery call. The site promises: "Give me the messy version. I will personally review it and tell you whether the $999 assessment makes sense. This first workflow review is free." This phase is how that promise gets kept, and how a free form submission becomes a paid, scheduled, consented discovery call.

## How leads arrive

The site form posts to `/api/lead`, which sends two Resend emails: the internal lead notification to Dominic (name, business, email, optional phone, the workflow description) and an automatic confirmation to the lead. The lead has already received a robot "thanks." That means the free review reply is the second touch and it must obviously come from a human who read their workflow.

**SLA: reply within one business day.** For a local service buyer, speed is the differentiator. A same-day personal reply from a real operator beats anything an agency does.

## Step 1: Classify the lead

Read the workflow they submitted. Sort into one of three buckets:

- **FIT**: owner-led service business, a repeated workflow (calls, paperwork, quotes, follow-ups, handoffs), happening often enough to measure. San Antonio metro preferred; remote is fine.
- **NOT YET**: real pain but vague, one-off, or not a repeated workflow. Ask one clarifying question instead of pitching.
- **WRONG FIT**: wants judgment-heavy work automated without review, wants a build with no diagnosis, or is clearly collecting free consulting. Decline warmly and point at something useful.

## Step 2: The free review reply (the actual free deliverable)

Five parts, in order. Keep it short enough to read on a phone.

1. **Reflect the workflow back in one sentence.** Proof a human read it.
2. **One genuine observation** about what is probably going on. This is the free value. Diagnose the symptom, never prescribe the tool. The "no prescribing on the first call" rule starts here: name the tool in a free email and the $999 assessment has nothing left to sell.
3. **The verdict, plainly.** Does the $999 assessment make sense for this? Yes or no, and why in one sentence.
4. **What the assessment involves, two sentences max.** 45 minute recorded call (with your permission), then three to seven verified recommendations, a four day start plan, and a 30 minute review together.
5. **The next step.** One link, one action.

### Template: FIT

> Subject: Your [workflow] - I read it
>
> Hi [Name],
>
> So every [job/estimate/customer] means [their workflow, reflected in one sentence]. Read it this morning. That pattern usually means [one honest observation about the likely bottleneck, no tool names].
>
> Straight answer on fit: yes, this is exactly what the $999 assessment is built for. We do a 45 minute recorded call (only with your permission), I research what actually fits your business, and you get three to seven prioritized recommendations, a four day start plan, and a 30 minute review where we walk it together.
>
> If you want it, the next step is here: [payment link]. Once that is in, reply with a couple of days and times that work for you and we will lock in the call. I will also send a short pre-call note about what we keep out of the recording.
>
> If you would rather talk first, call me: (210) 802-8945.
>
> Dominic

### Template: NOT YET

> Subject: Your [workflow] - one question
>
> Hi [Name],
>
> Read your note. Before I tell you whether the $999 assessment is worth it for you, one question: [the clarifying question, usually "how many times a week does this actually happen, and who touches it?"].
>
> If it turns out this is a repeated workflow eating real hours, the assessment makes sense. If it is a one-time mess, I will tell you that too and point you somewhere cheaper.
>
> Dominic

### Template: WRONG FIT

> Subject: Your [workflow] - honest answer
>
> Hi [Name],
>
> Read your note, and I owe you a straight answer: the $999 assessment is not the right buy for this. [One sentence why: it is a one-off / it needs judgment a tool should not replace / it is a build project, not a diagnosis.]
>
> What I would actually do in your shoes: [one genuinely useful pointer].
>
> If a repeated workflow starts eating your week later, I am here.
>
> Dominic

## Step 3: Payment, then scheduling (on a yes)

Payment comes before the discovery call. It filters tire kickers, and a paid client shows up prepared.

- **Payment**: a Stripe Payment Link for the $999 assessment, created once in the Stripe dashboard (Products, then Payment Links; no code needed). Put the link in the FIT email.
- **Scheduling**: no booking tool. At this volume, just agree on a time by email or text: once payment lands, propose two or three concrete windows ("Tuesday 10am, Wednesday 2pm, or Thursday morning?"), let them pick or counter, then send a Google Calendar invite with a Meet link for the agreed slot. The calendar invite is what makes it real: it carries the video link and blocks both calendars. Revisit a booking link only if the back-and-forth ever becomes the bottleneck.

## Step 4: The pre-call package (the privacy promise, kept)

The site promises: "Before the call, we agree what can be discussed and what must stay out of recordings, transcripts, and AI tools." That agreement happens here, in writing, before Phase 1. Send after payment, before the call:

> Subject: Before our call - 3 quick things
>
> 1. **Basics** (reply with these so we skip them on the call): business name, what you do, team size, and the tools you already pay for: phone system, email, calendar, CRM, spreadsheets, forms, payment tools, job software.
> 2. **Recording**: I record the call and use AI to analyze the transcript so the research is grounded in your exact words. I will confirm this again on the call before we start.
> 3. **Boundaries**: tell me anything that must stay OUT of the recording, the transcript, and any AI tool. Usual exclusions: customer names and contact details, passwords and logins, payroll or medical or legal specifics. We talk about the workflow, not the private data inside it.

Their reply is the written data-boundaries agreement. **Keep it.** Phase 1 re-confirms consent verbally on the recording; Phase 2 scrubs the transcript against these exclusions before any AI processing.

## The lead tracker

One row per lead, somewhere dead simple (a spreadsheet is fine): date in, name, business, workflow one-liner, bucket (FIT / NOT YET / WRONG FIT), replied date, paid date, discovery date, report sent date, review date, outcome, next offer.

This tracker is also the measurement layer: form submissions to replies to paid assessments is the site's real conversion funnel.

## Output of this phase

A paid client, a scheduled 45 minute discovery, a written data-boundaries agreement, and the intake basics. That bundle is the entry condition for [Phase 1](01-phase-1-discovery-call.md).
