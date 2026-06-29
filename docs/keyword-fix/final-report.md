# Keyword Fix Report

Generated: 2026-06-28
Site: https://aiconsultingsa.com/
Mode: research plus implementation

## Executive Summary

Top wins implemented:

1. Repositioned the homepage around the current winning query: "AI consultant San Antonio."
2. Replaced the broad, overproduced AI consulting page with a cleaner workflow triage offer for service businesses.
3. Added static crawlable homepage fallback content inside `#root`, so raw HTML now contains meaningful service copy before React runs.
4. Moved structured data into raw HTML for the homepage and added service, breadcrumb, and FAQ schema to static long-tail pages.
5. Added two distinct long-tail service pages:
   - `/ai-document-automation-san-antonio/`
   - `/small-business-automation-san-antonio/`
6. Added a second reducer pass that centers the offer on one workflow triage call and adds clear "what I will not automate" trust sections.

Top risks:

1. No one can honestly guarantee page one rankings. GSC shows the core query is already close, but durable rankings still need deployment, indexing, GBP work, and proof signals.
2. Google Search Console currently shows limited data volume, so early changes should be measured by impressions and CTR before making another broad rewrite.
3. The static service pages need indexing requests after deployment.
4. The site needs real testimonials or named case studies over time. Do not fabricate review schema.
5. Semrush keyword reports were unavailable because the current plan does not include MCP report access.

## Data Sources

Google Search Console, last 90 days ending 2026-06-25:

- `ai consulting san antonio`: 35 impressions, 1 click, average position 3.34 for the homepage.
- `ai services near me`: 1 impression, 1 click, average position 1 for the homepage.
- Broader Texas queries have weak positions around 78 to 80, so the local San Antonio wedge is stronger than broad Texas positioning.

Firecrawl SERP checks:

- Core query: `AI consultant San Antonio small business automation AI workflow consultant`
  - Target site appeared in the result set near the top.
  - Relevant local competitors included Opinosis Analytics and The Automators.
- Phone answering query: `San Antonio AI phone answering small business virtual receptionist Twilio AI`
  - National results use "AI virtual receptionist", "AI receptionist", "call answering", "appointments", and "after hours" language.
  - Few strongly local pages appeared, which supports keeping `/ai-phone-answering/`.
- Document automation query: `San Antonio document automation AI paperwork automation small business consultant`
  - Local and broad competitors exist, but results are mostly broad process automation or enterprise document automation.
  - A small business paperwork automation page is a reasonable long-tail wedge.

Google Autocomplete checks:

- `ai consultant san antonio` returned `ai consulting san antonio`.
- `ai automation san antonio` returned `ai automation san antonio`.
- `ai phone answering small business` returned `ai phone answering for small business` and `best ai phone answering service for small business`.
- `ai document automation` returned document automation variants, including document management and document assembly terms.
- `ai workflow automation` returned tools, platforms, examples, specialist, and course variants.

## Positioning Brief

Narrow buyer:

San Antonio service business owners with 5 to 50 employees who are losing time or revenue to missed calls, paperwork, quotes, follow ups, and manual handoffs.

Frustration language:

- "Calls go to voicemail while I am on a job."
- "My office staff is buried in PDFs and spreadsheets."
- "We keep copying the same customer details between tools."

Hook:

Bring me the workflow your team keeps doing by hand.

Relief:

One painful workflow gets observed, scoped, built, tested, and handed to the team instead of selling a generic AI workshop or strategy deck.

Proof layer:

The page now emphasizes working systems already built: Twilio voice agent, PDF to spreadsheet automation, and small business operations tooling.

Trust layer:

The site now says what will not be automated: judgment heavy work without review, useful existing software unless it is the bottleneck, and demos when a simpler rule or checklist would solve the problem.

## Keyword Map

| URL | Primary target | Secondary targets |
| --- | --- | --- |
| `/` | AI consultant San Antonio | AI consulting San Antonio, AI automation San Antonio, AI workflow automation, Twilio AI consultant |
| `/ai-phone-answering/` | AI phone answering for small business | AI receptionist San Antonio, virtual receptionist AI, Twilio AI consultant |
| `/ai-document-automation-san-antonio/` | AI document automation San Antonio | PDF to spreadsheet automation, document processing automation, AI paperwork automation |
| `/small-business-automation-san-antonio/` | small business automation San Antonio | business process automation San Antonio, AI workflow automation, CRM automation San Antonio |

## Implementation Status

Changed:

- `src/AIConsultingServicesPage.jsx`: clean React homepage rewrite focused on one workflow triage offer, local proof, and clear no list constraints.
- `index.html`: new meta description, static SEO fallback content, static LocalBusiness/WebSite/FAQ JSON-LD, and the stripped homepage H1.
- `public/ai-phone-answering/index.html`: lightweight static page focused on missed calls, Twilio AI phone answering, escalation, and summary workflows.
- `public/ai-document-automation-san-antonio/index.html`: long-tail static service page focused on repeated paperwork, exception flags, and human review.
- `public/small-business-automation-san-antonio/index.html`: long-tail static service page focused on repeated handoffs across calls, quotes, CRM, and follow ups.
- `public/static-page.css`: shared lightweight CSS for static pages.
- `public/sitemap.xml`: added new canonical URLs.
- `vercel.json`: added canonical redirects for new static `index.html` paths.
- `public/robots.txt`: removed em dash in comment.

Verified:

- `npm run build`
- `npm run lint`
- JSON-LD parses in source and built output.
- `public/sitemap.xml` and `vercel.json` parse successfully.
- Vite preview serves all four canonical URLs with status 200, distinct titles, distinct canonicals, and schema blocks.
- Browser QA with system Chrome checked homepage desktop, homepage mobile, and all three static routes for expected H1s, no horizontal overflow, no clipped CTA text, and call or Calendly CTAs.

## Next 30/60/90 Days

30 days:

- Deploy the changes.
- Submit `https://aiconsultingsa.com/sitemap.xml` in the GSC domain property.
- Request indexing for the homepage and three service pages.
- Add GBP services that match the page themes: AI consulting, business process automation, AI phone answering, document automation.

60 days:

- Watch GSC impressions and CTR for each page.
- If `/ai-phone-answering/` gets impressions, add a short pricing/process section and one real call workflow example.
- If document automation gets impressions, add one anonymized before and after workflow diagram or sample output.

90 days:

- Create one real case study page only after a project ships.
- Add internal links from any future blog or case study pages back to the matching service page.
- Consider one more static page only if GSC or calls reveal a distinct intent, such as "AI receptionist San Antonio" or "AI quote follow up automation."

## Useful Source Links

- Target site: https://aiconsultingsa.com/
- Opinosis local AI consulting result: https://www.opinosis-analytics.com/ai-consulting-in-san-antonio/
- The Automators San Antonio AI agency result: https://theautomators.ai/ai-agency-san-antonio/
- DOCUmation local process automation result: https://www.mation.com/areas-we-serve/san-antonio-tx-process-automation/
- Dialpad AI virtual receptionist result: https://www.dialpad.com/solutions/ai-virtual-receptionist/
- RingCentral AI receptionist result: https://www.ringcentral.com/ai-receptionist.html
- Dapta AI virtual receptionist small business guide: https://dapta.ai/blog-posts/ai-virtual-receptionist-for-small-business/
