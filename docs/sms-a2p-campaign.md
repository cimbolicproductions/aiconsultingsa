# Demo line A2P 10DLC campaign: ready to submit

Prepared 2026-09-15. **Not submitted.** Submitting charges a non-refundable $15 vetting fee and
starts $1.50/month on approval, so it waits for Dominic's go.

## Why this exists

Every text from the demo line (513) 960-7996 has been `undelivered` with error **30034**, including
the 2026-08-18 test: the number is on no registered campaign. Texting was switched off in the demo
repo (`DEMO_SMS_ENABLED` unset, commit `baa92dc` in `D:\GitHub\voice agents\demo-line`) until this
campaign is approved.

## Account facts this relies on (read from Twilio 2026-09-15)

| Item | Value |
|---|---|
| Brand | `BN3a5509858bd4ce08afa6475b1dc884dc`, APPROVED, STANDARD, legal name The Podcast Authority LLC |
| Existing campaign | `QE2c6890…` on `MG374c…`, VERIFIED, RentWashersSA only (number …5239). Do not reuse it. |
| Service to use | `MG49c6da8d73c7c44e1da8e7f7dc62e769`, an empty unregistered Low Volume Mixed service. Rename it "AI Consulting SA Demo Line". |
| Number | +15139607996, SMS capable, `sms_url` points at Vapi |

## Prerequisites, in order

1. **Dominic files the Texas assumed name** for "AI Consulting SA" under The Podcast Authority LLC
   (SOS Form 503, $25, SOSDirect). The pages already name the LLC.
2. `https://aiconsultingsa.com/privacy/` and `https://aiconsultingsa.com/sms-terms/` are live and
   linked from every footer.
3. Submit the campaign below. Expect up to 5 business days. If rejected, fix **only** the named field
   and resubmit the same campaign (no new fee). Deleting and recreating costs another $15.
4. Only after status is VERIFIED:
   - Add +15139607996 to the service.
   - Update the demo prompt so the agent asks the two consent questions **verbatim** as published on
     `/sms-terms/`, and only texts on a yes. Today it asks neither.
   - Update the two text bodies in the demo code to match the samples below (brand name first,
     STOP language). Today they carry neither.
   - Remove the "Current status: texting is switched off" panel from `/sms-terms/`.
   - Set `DEMO_SMS_ENABLED=true` in the `ai-receptionist-demo` Vercel project and redeploy.
   - Place one test call, then confirm `delivered` in Twilio Messaging logs, not just `queued`.

## Campaign fields

**Use case:** `LOW_VOLUME` (Low Volume Mixed)

**Description**

> AI Consulting SA (https://aiconsultingsa.com) is a San Antonio, TX AI consulting business operated by
> The Podcast Authority LLC dba AI Consulting SA. It runs a public demonstration phone line,
> (513) 960-7996, where auto shop owners call to hear an AI receptionist. This campaign sends
> informational messages only to callers who say yes on that call: a confirmation of a setup call they
> booked, and a link to the recording of their own call. It also sends internal new lead alerts to the
> business owner's own phone. No marketing or promotional content and no third party traffic. At most
> two messages per consenting call. Program terms: https://aiconsultingsa.com/sms-terms/. Reply STOP to
> opt out, HELP for help.

**Message flow**

> Full opt in details and the exact consent script are publicly documented at
> https://aiconsultingsa.com/sms-terms/ (privacy policy: https://aiconsultingsa.com/privacy/). Consent is
> collected verbally during a recorded call to our demo line, (513) 960-7996, which is published at
> https://aiconsultingsa.com/ai-phone-answering/. The AI assistant asks before sending anything, with the
> disclosures read out before the caller answers. After a caller books a setup call it asks: "Want a text
> confirming that time? It's one text. Message and data rates may apply. Reply HELP for help or STOP to
> opt out. Yes or no?" Near the end of the call it asks: "Want me to text you a link to this call's
> recording? It's one text. Message and data rates may apply. Reply HELP for help or STOP to opt out.
> Yes or no?" A text is sent only after an explicit yes, and the call recording and transcript retain
> that consent. Saying no does not affect the demo or the booking. Consent is not a condition of any
> purchase. Internal lead alerts go only to the business owner's own phone.

**Message samples**

1. `AI Consulting SA: You're set for Tue Sep 22 at 5 PM. Dominic will call you on this number to set up your AI receptionist. Reply STOP to opt out.`
2. `AI Consulting SA: Here's the recording of your demo call: https://ai-receptionist-demo-eight.vercel.app/recording?c=[CallId]&e=[Expiry]&s=[Signature] Link works for 14 days. Reply STOP to opt out.`
3. `AI Consulting SA: New demo lead. [Name] at [ShopName], call back [Phone]. Interest: hot.`

Sample 2's link host must be confirmed at submission. A vercel.app link reads as unbranded, and the
RentWashersSA lesson was that samples should use the brand's own domain. If a reviewer flags it, serve
the recording link from an aiconsultingsa.com path instead.

**Flags:** `has_embedded_links: true`, `has_embedded_phone: true` (HELP reply names the business line),
`age_gated: false`, `direct_lending: false`.

**Opt in keywords:** `START` · **Opt in message:** `AI Consulting SA: You're opted back in to demo line texts. Msg&data rates may apply. Reply STOP to cancel, HELP for help.`

**Opt out keywords:** `STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT, REVOKE` · **Opt out message:** `AI Consulting SA: You're unsubscribed and will get no more texts from this number. Reply START to resubscribe.`

**Help keywords:** `HELP, INFO` · **Help message:** `AI Consulting SA demo line. Call (210) 802-8945 or email aiconsultingsa.com@gmail.com. Msg&data rates may apply. Reply STOP to opt out.`
