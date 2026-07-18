# AI Tools Assessment Offer Alignment

Date: 2026-07-17
Site: https://aiconsultingsa.com/
Status: Published at commit `d227bb1`; Resend delivery replacement implemented locally, not yet deployed

## Sources

- `D:\Documents\My thoughts\Transcripts\The_1000hour_Solo_AI_business_Full_Course.md`
- `D:\Documents\My thoughts\Knowledge Base\business\The $1,000 per Hour Solo AI Business - AI Tools Assessment Playbook.md`
- `D:\Documents\My thoughts\Personal Applications\The $1,000 per Hour Solo AI Business - AI Tools Assessment Playbook - Personal Application.md`
- `D:\Documents\My thoughts\Projects\AI First Solutions.md`
- Historical SEO evidence: `docs/keyword-fix/final-report.md`

The transcript and vault notes were discovered and read through the Obsidian connector before implementation.

## Offer Implemented

1. Free website form that collects the owner's name, business, email, optional phone, and repeated workflow.
2. $999 AI Tools Assessment with one 45 minute recorded discovery, with permission.
3. Human verified research producing three to seven prioritized recommendations.
4. A nine part report summarized through an effort versus impact matrix, four day quick start, transparent ROI assumptions, and next steps.
5. A 30 minute report review.
6. Optional self implementation, separately scoped implementation, or ongoing advisory.

Implementation remains separate from the assessment. The website does not include checkout, customer accounts, transcript upload, report generation, or customer data storage.

## SEO Baseline Before Editing

Google Search Console data ended 2026-07-15.

### Last 28 days

- Homepage: 4 clicks, 134 impressions, 2.99% CTR, average position 12.31.
- `ai consulting san antonio`: 1 click, 31 impressions, 3.23% CTR, average position 6.58.
- Document automation page: 0 clicks, 18 impressions, average position 44.67.

### Last 90 days

- Homepage: 6 clicks, 242 impressions, 2.48% CTR, average position 11.94.
- `ai consulting san antonio`: 2 clicks, 59 impressions, 3.39% CTR, average position 4.81.
- `ai services near me`: 1 click, 1 impression, average position 1.
- Document automation page: 0 clicks, 18 impressions, average position 44.67.

Search Console anonymizes part of the query data. The first lead's exact query or landing page could not be attributed from these reports, so every existing route and primary search intent was protected.

## Files Changed

- `src/AIConsultingServicesPage.jsx`
- `index.html`
- `public/ai-tools-assessment-san-antonio/index.html`
- `public/ai-phone-answering/index.html`
- `public/ai-document-automation-san-antonio/index.html`
- `public/small-business-automation-san-antonio/index.html`
- `public/sitemap.xml`
- `vercel.json`
- `README.md`
- `AGENTS.md`
- `.env.example`
- `api/lead.js`
- `tests/lead-form-contract.test.mjs`
- `docs/ai-tools-assessment/implementation-report.md`

Lead capture posts to `/api/lead/`. The Vercel Function reads `LEAD_RECIPIENT_EMAIL`, `RESEND_API_KEY`, and `RESEND_FROM_EMAIL` from server-only project configuration. It sends one authenticated Resend batch containing the complete internal lead notification and a branded customer confirmation. The recipient address and credentials remain absent from browser HTML and client JavaScript. The function includes a honeypot, validates and limits fields, escapes user content before HTML rendering, adds a deterministic 24 hour idempotency key, times out provider calls, logs safe provider details, returns visible error pages, and redirects only after Resend accepts both emails.

## Claims Deliberately Excluded

- Money back guarantee or five hour savings promise.
- Average hours saved.
- Assessment to implementation conversion rate.
- Provider hourly earnings or customer lifetime value.
- Testimonials, ratings, logos, case studies, or aggregate review schema.
- Published implementation or ongoing advisory prices.
- Realized ROI claims without customer measurement.

## Validation

Pre-edit checks:

- `npm install`: passed. The existing dependency tree reports 10 audit findings; no dependency upgrades were authorized in this content change.
- `npm run lint`: passed.
- `npm run build`: passed.
- Focused acceptance gate: failed before implementation because the assessment route did not exist, as expected.

Post-edit checks:

- Focused assessment content acceptance gate: passed.
- `npm run lint`: passed.
- `npm run build`: passed with 1,703 modules transformed.
- `vercel.json`: parsed successfully.
- `public/sitemap.xml`: parsed successfully and contains five unique canonical routes.
- Homepage and all four static page JSON-LD blocks: parsed successfully.
- Visible FAQ questions and answers versus FAQPage JSON-LD: exact match on all five pages.
- Stale CTA and unsupported claim search: no matches.
- Customer facing em dash search: no matches.
- Vite preview route checks: all five routes returned status 200 with one expected H1, distinct title, correct canonical, and a website form or assessment path.
- Browser desktop checks at 1440 by 900: homepage and assessment page passed with sticky navigation, readable offer terms, working FAQ interaction, no horizontal overflow, and no broken images.
- Browser mobile checks at 390 by 844: homepage and assessment page passed with no horizontal overflow, no clipped headings, paragraphs, links, or buttons, and a usable mobile navigation layout.
- Homepage form wiring: React and raw HTML fallback forms both post to `/api/lead/` with matching named fields and a honeypot. Provider-only configuration stays in the server function.
- Native form validation: an empty submit stayed on the homepage, focused the name field, and reported the four required fields as invalid.
- Form success state: the `?submitted=true#contact` return URL displayed the confirmation message and landed on the contact section.
- Existing service pages: each preserved its original title and H1, displayed the assessment bridge, exposed form and phone links, and routed its primary CTAs to `/#contact`.
- Browser console and page error logs: empty.
- Service page form CTA click: navigated to `/#contact` and displayed the form successfully on a 390 by 844 viewport.
- Initial hash navigation: the React page now scrolls to the requested section after render, preventing full-page links to `/#contact` from missing the form.
- Customer-facing Calendly search: no matches across the homepage and four static pages.
- Lead form contract suite: ten tests passed for employee limit removal, public recipient privacy, private route wiring, missing or invalid configuration, invalid input, provider rejection, network failure, malformed provider acceptance, two email batch construction, HTML escaping, and idempotency.
- Public source and build leak scan: zero recipient email literals and zero 2 to 20 employee-limit matches in the browser source, `dist`, or Vercel build output.
- Vercel environment configuration: `LEAD_RECIPIENT_EMAIL` is configured for Production without embedding its value in the site bundle. `RESEND_API_KEY` and `RESEND_FROM_EMAIL` remain required before the replacement can deploy.
- Current Vercel CLI build: passed and emitted the `/api/lead/` function with the Vite production output. The older global CLI could not validate the project's Node 24 setting, so the current CLI was used.
- Local Vercel function check: homepage returned 200 with the private form action, incomplete POST returned a visible 400 error, and GET returned 405 without contacting the email provider.

The Vercel `.html` to trailing slash redirect is present and parses in `vercel.json`. Runtime redirect behavior remains a deployment verification item because Vite preview does not execute Vercel redirect rules.

Production deployment verification on 2026-07-17 reproduced three FormSubmit failures. Every valid request reached the function, but FormSubmit returned an opaque non-JSON HTTP 403 and no success redirect. The replacement Resend integration remains unverified end to end until its API key and sending domain are configured.

## External Follow Ups

- Create or connect a Resend account, verify the chosen `aiconsultingsa.com` sending domain or subdomain, and configure `RESEND_API_KEY` plus `RESEND_FROM_EMAIL` in Vercel Production.
- After deployment, submit one production test from an unrelated email address. Confirm that the complete lead arrives in the private inbox, Reply To targets the customer, and the customer receives the branded confirmation.
- Run the first paid assessment with explicit recording and AI data processing consent.
- Measure implemented changes after 14 and 30 days before publishing a result claim.
- Decide whether a future implementation credit policy is useful and document it transparently before offering it.
- Configure and test a Namecheap email forwarder only after the source alias and private destination inbox are confirmed. No DNS or email account changes were authorized in this session.
- Commit, push, and deploy the Resend replacement only after its production variables are configured.

## Deviations From Plan

- The first lead's exact query or landing page was not visible in GSC. The implementation followed the default of preserving every existing SEO route and primary intent.
- The repository has no third-party test runner. A focused Node test suite now checks public copy, recipient privacy, private API routing, missing configuration, invalid input, provider rejection, provider network failure, and accepted submissions.
- The browser CLI initially failed through its default launch path. It was pointed at the installed Playwright Chromium executable, after which the required QA passed.
- After the initial implementation, Dominic replaced Calendly scheduling with an on-site lead form. He then removed the 2 to 20 employee positioning limit and required the recipient address to stay out of public HTML. The first production deployment proved that FormSubmit rejected every server delivery with HTTP 403, so the implementation now uses an authenticated Resend batch for the internal lead notification and customer confirmation.
