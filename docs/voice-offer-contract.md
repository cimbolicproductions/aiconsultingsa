# Voice offer contract

**Internal reference. Not published.** Created 2026-09-13 as W0 of `docs/NEXT-BUILD-aiconsultingsa-voice-demo.md`.
Review date: **2026-10-13**, or sooner if Dominic approves a complete written pilot scope.

This file is the single factual reference for what the website, the FAQ, the metadata, the JSON-LD, the
lead confirmation, and the demo assistant are allowed to say about the voice offer. It is a shared list
of approved facts, not a runtime framework. Nothing here is loaded by any code.

If a claim is not in this file, it does not go on the site.

---

## 1. Identity

| Item | Exact value | Rule |
|---|---|---|
| Business name | AI Consulting SA | Never a second brand or domain. |
| Canonical site | `https://aiconsultingsa.com/` | No other domain is owned or implied. |
| Business phone | `+12108028945`, display `(210) 802-8945` | Label: **"Talk to Dominic."** Never replace this globally with the demo number. |
| Public demo phone | `+15139607996`, display `(513) 960-7996` | Label: **"Try the auto shop demo."** Never described as a San Antonio number. It is a 513 area code. |
| Service area | San Antonio, TX, US | Plus the existing nearby cities already in the schema. |
| Street address / ZIP | **UNCONFIRMED** | Do not invent one. Do not publish a street address, opening hours, or staffed-office coordinates. |
| Google Business Profile URL | **UNCONFIRMED** | Status is unknown, not proven missing. Verify before creating anything. |
| Bing Places / Apple Business URL | **UNCONFIRMED** | Same rule. |

## 2. Published prices, as currently published

These are prices already on the site. Publishing them again is not new approval of new terms.

| Service | Published price | Role |
|---|---|---|
| AI phone answering (voice) | **$250/month, no setup fee** | Primary offer on `/ai-phone-answering/`. |
| Missed call textback | **$250 setup, optional $50/month support, provider charges separate** | Secondary alternative, kept below the voice offer. |
| AEO / ChatGPT optimization | **$500 per page, or $1,500 for up to five, no retainer** | Separate visibility offer. Keep out of the phone decision path. |
| AI Tools Assessment | **$999**, implementation separately scoped | For an unclear or broader workflow problem. Not a prerequisite to the phone offer. |

### Approved inquiry-stage price sentence

> **AI phone answering: $250/month, with no setup fee.** We agree on call coverage, expected volume and
> the follow up process before activation. Shop calendar integrations and repair price quoting require
> separate scoping.

### UNCONFIRMED commercial fields

Every row below is a decision Dominic has not made. Until he does, the site says nothing about it.
These values must never appear as a public placeholder, a "typically", or an example.

| Field | State |
|---|---|
| Included monthly minutes or call allowance | UNCONFIRMED |
| Overage rate past the allowance | UNCONFIRMED |
| Support hours and response window | UNCONFIRMED |
| Cancellation and refund terms | UNCONFIRMED |
| Free trial, if any | UNCONFIRMED |
| SLA or uptime commitment | UNCONFIRMED |
| Integration fees for shop software | UNCONFIRMED |
| Pilot length and review date | UNCONFIRMED |

"No contract" appears in older metadata. It is not a complete commercial policy and must not be
presented as one.

## 3. Provider costs, for internal maths only

Never publish these as a customer's total cost. Sources are dated 2026-09-13.

| Component | Verified figure | Source |
|---|---|---|
| Vapi hosting | $0.05/minute, excluding model, voice, transcription, transport | https://vapi.ai/pricing |
| Twilio US local inbound voice | $0.0085/minute | https://www.twilio.com/en-us/voice/pricing/us |
| Twilio US local number | $1.15/month | same |
| Twilio US outbound voice | $0.014/minute | same |
| Twilio US long code SMS | from $0.0083 per segment, plus carrier fees | https://www.twilio.com/en-us/sms/pricing/us |
| A2P 10DLC campaign vetting | **$15**, separate from brand and monthly campaign charges | https://help.twilio.com/articles/11587910480155-A2P-10DLC-Campaign-Vetting-Fee-Changes-January-2023 |

The site's old "$4 one time plus a small monthly campaign fee" understated A2P registration and is
corrected in W1. The old universal "$3 to $15 a month" total is incomplete and must carry explicit
scenario assumptions or be replaced with a plain provider explanation.

Contribution formula for Dominic, not for the page:

`monthly fee - all provider costs - support hours x explicit hourly cost - setup amortization - payment fees - acquisition allocation`

## 4. Capabilities the launch scope can claim

**Can say.** Answers during an agreed overflow window. Collects caller name, callback number, vehicle and
service request. Sends the request to the shop's named person. Roleplay demo discloses that it records.
Books a consultation with Dominic through his own Cal event type.

**Cannot say, until separately verified.** Integration with Tekmetric, Shopmonkey, or any named shop
system. Writing to the shop's calendar. Booking a vehicle repair appointment. Diagnosing a fault.
Quoting a repair price. Guaranteed live transfer to a person. Bilingual or Spanish voice handling on the
demo (the live demo stack is Deepgram `nova-3-general`, English). Verified staff receipt of a captured
request, until demo task D2 passes.

**Never say.** Guaranteed Google rankings. Guaranteed revenue, saved dollars, or recovered jobs.
"I make sure ChatGPT recommends you." Any count of incremental jobs won from the historical deployment.

## 5. Historical proof, exact and bounded

The only auto shop deployment. Internal identity: Speedy. **Keep the name private**; naming permission
was never requested and is **UNCONFIRMED**.

| Fact | Value |
|---|---|
| Measured window | 17 to 31 August 2026 |
| Calls answered | 48 |
| Distinct caller numbers | 40 |
| Conversations over 20 seconds | 20 |
| Price paid | $250/month |
| Months paid | 1 |
| Answering since | 27 June 2026 |
| **Deployment ended** | **5 September 2026, cancelled** |
| Incremental completed jobs | Never established |

Sample limit: the call platform plan retains 14 days, so no lifetime total can be shown.

Rules. Never write "currently", "live since", "is running", or "whether he renews is still open". Never
imply an ongoing endorsement. Call volume is not ROI. The public demo line is a demonstration, never
customer proof.

Sister business (RentWashersSA) results are **owner reported**, are not AI Consulting SA client
acquisition results, and must be dated. "About 5 customers in August 2026" is the honest form.
"Five customers last month" is not, because it re-dates itself every month it stays up.

## 6. Approved phrases

- "Give callers a next step when your service advisors cannot pick up."
- "Your team confirms the next step."
- "This live AI demonstration records calls. Pretend you are a customer with a car problem. This line does not accept repair appointments."
- "I would pass that requested time to the shop for confirmation."
- "We agree on call coverage, expected volume and the follow up process before activation."
- "This message does not activate a service or book a repair appointment."
- "I help San Antonio businesses make their services easier to find and understand in search and AI answers."

## 7. Prohibited claims

1. Any current or ongoing paying phone customer.
2. Guaranteed indexing, ranking, AI citation, revenue, or ROI.
3. Invented testimonials, review counts, awards, case studies, or generic ROI percentages.
4. A required paid assessment before the phone offer.
5. Booking, quoting, or diagnosing on the launch scope.
6. A street address, opening hours, or a listing URL that has not been verified.
7. Carrier cost presented as the total cost of the service.
8. Verified staff receipt of a captured demo request before D2 passes.
9. Any customer recording, transcript, or audio without documented permission.
10. Any claimed analytics figure, click conversion rate, or per visitor call attribution. No client analytics is connected.

## 8. Publication gates

| Thing | Gate |
|---|---|
| W1 truth corrections | None beyond Dominic's approval to deploy. These make the site more accurate, not less. |
| Phone page copy, form, attribution | W0 to W4 passing locally. |
| **Live demo `tel:` CTA** | **Demo tasks D1, D2 and D3 passing**, including an approved demo deployment and one controlled live call. Local website checks are not demo verification. |
| Paid traffic to the demo | D2 honest failure handling plus a successful controlled call. |
| Naming the historical shop, or publishing audio | Documented permission. Currently UNCONFIRMED. |
| Listing creation or edits | Verified eligibility and verified existing profiles. |
