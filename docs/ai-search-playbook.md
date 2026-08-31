# Getting cited by ChatGPT and Gemini

Why RentWashersSA gets found in AI search and aiconsultingsa.com does not, and the rule that closes the gap.

---

## The observation

RentWashersSA pulls leads out of ChatGPT and Gemini search. aiconsultingsa.com pulls essentially nothing from anywhere: **302 impressions and 5 total clicks in the 90 days ending 2026-08-29.**

The instinct that these are the same channel and one just needs more work is wrong. They are different problems.

## Why the washer site wins

Not because of AI SEO. Because of a structural gap:

**RentWashersSA publishes concrete, checkable facts about a narrow local transactional question that almost nobody else answers publicly.** Real prices. Rent to own terms. Service area. What is included.

Rent-A-Center has roughly 56x the domain authority and still will not tell a San Antonio searcher what it actually costs. So when someone asks a model "how much does it cost to rent a washer and dryer in San Antonio," RentWashersSA is one of the only sources carrying an actual answer. The model has to reach for it.

The moat is not authority. It is **willingness to publish the specifics the incumbents hide.**

## Why it did not transfer

RentWashersSA answers a query where **the product is the answer.** Someone types the thing they want to buy.

AI consulting is solution unaware. Business owners do not ask "who is an AI consultant in San Antonio." The GSC data confirms this: that entire query family showed about 38 searches a month, and the site ranked page one for it while producing 4 clicks in 90 days. The category query is a puddle.

What owners actually ask is the pain:

- how do I stop missing calls at my HVAC company
- cheapest way to answer the phone after hours for a small business
- how much does missed call text back cost
- do I need a subscription for missed call text back

**The site targeted the category. The buyers search the problem.**

## The specific failure this repo had

`/ai-phone-answering/` was well written and contained **zero dollar figures**. Not one number on the entire page. Every claim was qualitative: "Stop letting good calls die in voicemail," "Voicemail is not a sales process."

An answer engine asked what missed call handling costs had nothing to extract. So it cited the vendors, all of whom publish numbers, and all of whom are selling a monthly subscription.

Research on 2026-08-30 confirmed the whole first page of that topic is vendor owned: AIRA from $24.95/mo, Nextiva from $15/mo, Podium and Birdeye and GoHighLevel class suites at $300 to $500/mo, Vida at $200 to $800/mo. **Every source answering the money question has a financial interest in the answer.** That is the same shape of gap as Rent-A-Center refusing to publish rental prices.

## The rule

> Publish the specific numbers your competitors will not, including the ones that cost you the sale.

Applied to that page: a real cost table down to Twilio's $1.15 per month phone number and $0.008 per message, an honest comparison showing options cheaper than hiring Dominic, and a "three reasons not to hire me" section. The honest disqualifier is not a concession. It is the most citable content on the page, because nobody else can write it.

## Checklist for the remaining pages

`/ai-document-automation-san-antonio/` and `/small-business-automation-san-antonio/` have the same defect. For each:

1. **Name the real question.** Not the category. The thing an owner types at 9pm.
2. **Answer the money question with digits.** A range is fine. Vagueness is not.
3. **Show the options that beat you.** Including free and do it yourself.
4. **State who should not hire you.** Specifically, with a threshold.
5. **Cite your own numbers where possible.** RentWashersSA figures are unique to Dominic and cannot be copied. That is the strongest possible content, and it is currently unused.
6. **Date the pricing and name the source.** "Verified against Twilio's published US pricing on 30 August 2026." Models weight sourced, dated claims.
7. **Mirror it into the FAQ and the JSON-LD.** Answer engines lean on FAQ blocks heavily.

## What is still unmeasured

The RentWashersSA AI search traffic is Dominic's live observation and is **not documented anywhere in the vault.** Before investing further, confirm and size it:

- Check analytics referrers for `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`
- Ask every new lead how they found the business, and write the answer down

Ahrefs Brand Radar tracks AI citations directly but the current plan is gated (`Insufficient plan` on 2026-08-30), so the referrer check is the free substitute.

If it turns out to be two leads, this is an anecdote and outbound stays the priority. If it is twenty, this playbook is the highest leverage work in the business.
