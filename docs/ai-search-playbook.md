# Getting cited by ChatGPT and Gemini

Why RentWashersSA gets found in AI search and aiconsultingsa.com does not, and the rule that closes the gap.

**Status: mechanism CONFIRMED 2026-08-30** with citations from two independent engines. See Evidence below.

---

## The observation

RentWashersSA pulls leads out of ChatGPT and Gemini search. aiconsultingsa.com pulls essentially nothing from anywhere: **302 impressions and 5 total clicks in the 90 days ending 2026-08-29.**

The instinct that these are the same channel and one just needs more work is wrong. They are different problems.

---

## Evidence (2026-08-30)

Both engines, same query, "cheap washer and dryer rental," with the location inferred.

**ChatGPT** named RentWashersSA first, extracted "$60/month for the washer + dryer set," and correctly listed free delivery, installation, maintenance, repairs, and no credit check. Then it ran a comparison:

> Quack Washer and Dryer Rentals advertises **$59.99/month**, but its current terms show a service fee and tax bringing the actual total to about **$66.71/month**. There is also a 3-month minimum.
>
> So on actual recurring cost, Rent Washers SA appears cheaper at $60/month versus roughly $66.71/month for Quack.

**Gemini** listed RentWashersSA first with the fullest description, while also surfacing genuinely cheaper headline prices: Quack single units at $24.99/mo and sets at $49.99 to $59.99, and A&A Appliance Leasing at $29.99/mo with a $74.99 signup fee.

### What this actually proves

**RentWashersSA won a price comparison against a competitor advertising a lower price.** Quack's headline is $59.99 against Dominic's $60. Quack is cheaper on the sticker and lost anyway, because ChatGPT found the gap between Quack's advertised number and its real total and penalized it.

Gemini is the sharper case: Dominic is **not** the cheapest option on that page by a wide margin, and still got listed first with the most complete entry.

The lesson is not "be cheapest." It is:

> **The model rewards the number it can trust and penalizes the number it has to correct.**

---

## Why the washer site wins

Three mechanics, all verifiable on the live page right now:

**1. The price is in the title tag.**
`Washer & Dryer Rental San Antonio | $60/mo, No Credit Check`
Format: what it is, where, then the price and the single biggest objection killer. The meta description repeats it: "Washer and dryer rental in San Antonio for $60/month."

**2. Every FAQ is a question-shaped heading with a complete, self-contained answer underneath.**

> **How much is washer and dryer rental in San Antonio?**
> The standard rental set is $60/month. Delivery, installation, maintenance, and rental repairs are included.

That is a pre-built citation. The model does not synthesize anything, it lifts the sentence whole. Compare a page that makes the model assemble an answer from four paragraphs: it will reach for the easier source.

**3. The number is all in, with inclusions enumerated, so there is no gap to discover.**
$60 and here is everything that is included. Nothing hidden means nothing for a model to discount later. That is precisely what beat Quack.

The moat is not domain authority. Rent-A-Center has roughly 56x and still will not tell a San Antonio searcher what it costs. **The moat is willingness to publish a complete number.**

---

## Why it did not transfer to the consulting site

RentWashersSA answers a query where **the product is the answer.** Someone types the thing they want to buy.

AI consulting is solution unaware. Business owners do not ask "who is an AI consultant in San Antonio." GSC confirms it: that query family showed about 38 searches a month, and the site ranked page one while producing 4 clicks in 90 days. The category query is a puddle.

What owners actually ask is the pain: how do I stop missing calls, what does after hours answering cost, do I need a subscription for this.

**The site targeted the category. The buyers search the problem.**

---

## The specific failure this repo had

`/ai-phone-answering/` was well written and contained **zero dollar figures**. Nothing for an answer engine to extract, so models cite the vendors, all of whom publish numbers and all of whom sell a monthly subscription.

Research on 2026-08-30 confirmed the whole topic is vendor owned: AIRA from $24.95/mo, Nextiva from $15/mo, Podium and Birdeye and GoHighLevel class suites at $300 to $500/mo, Vida at $200 to $800/mo. **Every source answering the money question has a financial interest in the answer.** Same shape as Rent-A-Center refusing to publish rental prices.

---

## The rule

> Publish the complete number your competitors will not, in a shape the model can lift whole, including the parts that cost you the sale.

Applied to that page: a cost table down to Twilio's published $1.15/mo number and roughly $0.008 per message, an honest comparison showing the options cheaper than hiring Dominic, and a "three reasons not to hire me" section. The honest disqualifier is not a concession. It is the most citable content on the page, because nobody else can write it.

Title updated 2026-08-30 to mirror the proven pattern: `AI Phone Answering San Antonio | $250 Setup, No Monthly Fee`. "No Monthly Fee" is the direct analog of "No Credit Check", the one objection that kills the sale.

---

## Checklist for the remaining pages

`/ai-document-automation-san-antonio/` and `/small-business-automation-san-antonio/` have the same defect. For each:

1. **Put the number in the title tag.** Proven, not theoretical.
2. **Name the real question.** Not the category. The thing an owner types at 9pm.
3. **Answer the money question with digits.** A range is fine. Vagueness is not.
4. **Make the number all in and enumerate the inclusions.** Any gap between your headline and your real total is what a model will find and hold against you. This is what beat Quack.
5. **Shape every FAQ as a question with a complete standalone answer.** Do not make the model assemble it.
6. **Show the options that beat you,** including free and do it yourself.
7. **State who should not hire you,** specifically, with a threshold.
8. **Date the pricing and name the source.** "Verified against Twilio's published US pricing on 30 August 2026."
9. **Mirror it into the FAQ block and the JSON-LD.**

---

## Still unmeasured

Citation is confirmed. **Lead volume is not.** Two engines naming the business is not the same as knowing how many customers arrive that way.

- Check analytics referrers for `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`
- Ask every new lead how they found the business, and write the answer down

**One confound worth ruling out.** The ChatGPT screenshot closes with "your Rent Washers SA site is already appearing extremely prominently in my current web results," which means that session knew Dominic owns the business. Personalization or memory could be influencing placement. Re-run the same query logged out or in a temporary chat to see what a cold prospect actually gets. The Gemini result is the stronger evidence precisely because it carries no owner framing.

Ahrefs Brand Radar tracks AI citations directly but the plan is gated (`Insufficient plan`, confirmed 2026-08-30).
