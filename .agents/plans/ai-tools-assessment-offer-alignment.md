# Implementation Plan: AI Tools Assessment Offer Alignment

## Overview

- **Feature description:** Reposition AI Consulting SA around Corey Ganim's four phase AI Tools Assessment while preserving the site's current San Antonio SEO footprint and verified implementation proof. The site should present a clear offer ladder: free 15 minute fit call, $999 paid assessment, scoped implementation, and optional ongoing advisory.
- **Feature type:** Enhancement to positioning, offer architecture, content, SEO schema, and static service routing.
- **User story:**

  > As a San Antonio service business owner, I want a clear diagnostic before buying automation so that I know which workflow matters, which tools fit, what the likely value is, and what to do first.

- **Business value:** Converts the existing broad workflow triage message into a bounded paid product. The assessment gives prospects a lower risk first purchase and makes later implementation proposals evidence based.
- **Complexity:** Medium. The work is copy and static site architecture, but the same offer must remain consistent across React content, raw HTML fallback content, JSON-LD, three existing static pages, a new static landing page, sitemap, redirects, and project documentation.
- **Estimated scope:** One new public route, one new implementation report, and updates to approximately ten existing files. No backend, authentication, checkout, database, customer portal, or AI recommendation engine.

### Current state

- Repository: `D:\GitHub\ai first solutions`
- Production domain: `https://aiconsultingsa.com`
- Stack: React 19, Vite 7, Tailwind CSS 4, Lucide React, static HTML service pages, Vercel.
- Homepage entry: `src/App.jsx` renders `src/AIConsultingServicesPage.jsx`.
- Current primary CTA: `Book the workflow triage call` using `https://calendly.com/aiconsultingsa-com/free-ai-audit-call`.
- Current message: `Bring me the workflow your team keeps doing by hand.`
- Current offer: free 15 minute triage followed by broadly scoped implementation.
- Proven demand signal: the current SEO site generated its first lead by 2026-07-17. Treat the existing titles, H1s, canonical URLs, local service pages, internal links, schema, and crawlable fallback as working acquisition assets rather than copy to replace wholesale.
- Current service routes:
  - `/ai-phone-answering/`
  - `/ai-document-automation-san-antonio/`
  - `/small-business-automation-san-antonio/`
- Current worktree contains unrelated user changes in `.claude/settings.local.json` and `.claude/worktrees/`. Do not modify, delete, stage, or revert them.

### Target offer architecture

1. **Free fit call:** 15 minutes. Confirm fit, workflow frequency, authority, urgency, recording expectations, and whether a paid assessment makes sense.
2. **AI Tools Assessment:** $999. Includes a 45 minute recorded discovery, transcript analysis, human verified research, three to seven recommendations, effort versus impact prioritization, a four day quick start, ROI assumptions, and a 30 minute review.
3. **Implementation:** Scoped after the assessment. Existing phone, document, and workflow automation pages become examples of possible implementation paths.
4. **Ongoing advisory:** Optional AI Concierge style engagement after implementation need is proven. Do not lead with this offer or publish a price in this pass.

### Public claim boundaries

- Publish the $999 assessment price to make the offer concrete.
- Do not publish the episode's money back guarantee yet. Its measurement period, refund trigger, and definition of identified versus realized savings are not defined for AI Consulting SA.
- Do not publish Corey's self reported average of seven hours saved, 50 to 60 percent expansion rate, $3,000 to $10,000 lifetime value, or $1,000 per hour economics as Dominic's results.
- Do not use `$1,000/hour` in customer facing copy. It describes provider economics, not customer value.
- Do not add testimonials, ratings, client logos, aggregate review schema, or measured ROI without real permission and evidence.
- Keep the existing verified proof items, but do not strengthen their claims beyond what the current site and vault support.
- Present time and ROI outputs as estimates with visible assumptions until a customer measures actual results.

## Prerequisites

### Required reading

Read these before editing. For vault files, search with the Obsidian connector first and then read the live note through the connector.

1. `D:\GitHub\ai first solutions\AGENTS.md`
2. `C:\Users\djcim\.claude\CLAUDE.md`
3. `D:\GitHub\ai first solutions\src\AIConsultingServicesPage.jsx`
4. `D:\GitHub\ai first solutions\index.html`
5. `D:\GitHub\ai first solutions\public\static-page.css`
6. `D:\GitHub\ai first solutions\public\ai-phone-answering\index.html`
7. `D:\GitHub\ai first solutions\public\ai-document-automation-san-antonio\index.html`
8. `D:\GitHub\ai first solutions\public\small-business-automation-san-antonio\index.html`
9. `D:\GitHub\ai first solutions\public\sitemap.xml`
10. `D:\GitHub\ai first solutions\vercel.json`
11. `D:\GitHub\ai first solutions\docs\keyword-fix\final-report.md`
12. `D:\Documents\My thoughts\Transcripts\The_1000hour_Solo_AI_business_Full_Course.md`
13. `D:\Documents\My thoughts\Knowledge Base\business\The $1,000 per Hour Solo AI Business - AI Tools Assessment Playbook.md`
14. `D:\Documents\My thoughts\Personal Applications\The $1,000 per Hour Solo AI Business - AI Tools Assessment Playbook - Personal Application.md`
15. `D:\Documents\My thoughts\Projects\AI First Solutions.md`

### Source truth from the episode

- Primary offer: $999 AI Tools Assessment.
- The source suggested owner led businesses with roughly 2 to 20 employees and $500,000 to $5 million in annual revenue. Dominic later removed employee count as a public eligibility limit.
- Discovery: 45 minutes, recorded and transcribed with permission.
- Recommendations: three to seven off the shelf AI or SaaS tools.
- Fulfillment sequence: discovery, AI assisted analysis and research, human QA and report production, then a 30 minute review.
- Report: cover, executive summary, effort versus impact matrix, quick wins, recommended solutions, four day plan, major projects, financial impact, and next steps.
- Closing questions: most urgent recommendation, self implementation versus help, and resolution timeline.
- ROI correction for implementation: `weekly hours saved × 4.33 × hourly value - monthly tool costs`.
- Assessment recommendations require human judgment. Do not automatically surface or publish unverified AI output.

### Dependencies

- Install no new runtime or UI dependencies.
- Continue using the existing React, Tailwind, Lucide, and shared static page CSS patterns.
- Do not add a CMS, form provider, payment processor, analytics SDK, or backend in this pass.

### Environment setup

```powershell
Set-Location -LiteralPath 'D:\GitHub\ai first solutions'
git status --short --branch
git log -10 --oneline
npm install
```

Before implementation, confirm the existing unrelated `.claude` changes are still present and remain untouched.

## Architecture Decisions

### 1. Keep the existing homepage H1

- Keep: `Bring me the workflow your team keeps doing by hand.`
- Reason: it is clear, aligned with the assessment, and already tied to the site's strongest local SEO work.
- Change the supporting copy and page structure so the answer to that promise is a paid diagnostic before implementation.

### 2. Use a fit call before the paid assessment

- Keep the existing Calendly link as the scheduling destination unless Dominic supplies a replacement URL.
- Change visible labels to `Book a 15 minute fit call` or `Book the assessment fit call`.
- Treat the current `free-ai-audit-call` slug as an external naming mismatch, not a reason to invent a new URL.
- External follow up: rename or recreate the Calendly event to match the visible offer. This is outside the repository and requires explicit authorization in the execution session.

### 3. Make the assessment the primary paid product

- Publish a flat `$999` price.
- State exactly what is included and what is not.
- Do not describe the 15 minute fit call as the assessment.
- Do not suggest that a full assessment happens free on the qualification call.

### 4. Preserve current service pages as implementation paths

- Do not remove or broadly rewrite the existing SEO pages.
- Keep their H1s, canonical URLs, core keyword targeting, and verified proof.
- Reframe their CTAs and a short bridge section so each route starts with the assessment rather than an immediate build.

### 5. Add a dedicated static assessment page

- Create `/ai-tools-assessment-san-antonio/` as static HTML under `public/`.
- Reuse `public/static-page.css` and the current static page structure.
- Reason: raw crawlable HTML preserves the existing SEO architecture and avoids adding a client side router.

### 6. Keep delivery human led

- This repository remains a marketing site.
- Do not build transcript upload, AI research, report generation, pricing calculators, customer accounts, checkout, or data storage.
- Operational delivery continues from the vault runbook until a separate product request authorizes automation.

### 7. Reduce the public expansion menu

- Internally preserve all six expansion offers from the source.
- Publicly show three simple outcomes after the assessment:
  1. Self implementation from the report.
  2. Scoped process or automation implementation.
  3. Ongoing advisory when recurring help is justified.
- Reason: a confused prospect should see one next decision, not six products.

### 8. Keep SEO and structured data synchronized

- Visible FAQs and FAQPage JSON-LD must match exactly.
- Static fallback content in `index.html` must reflect the React homepage's actual offer.
- Canonical URLs, sitemap entries, redirect rules, and internal links must agree.
- Do not touch historical GSC findings in `docs/keyword-fix/final-report.md` except to reference it from a new implementation report.

### 9. Protect the SEO system that produced the first lead

- Preserve the current homepage title: `AI Consultant San Antonio | AI Phone, Document & Workflow Automation`.
- Preserve the current homepage H1, canonical, geo metadata, keyword coverage, service route titles, route H1s, and internal link structure.
- Add the assessment as an offer layer and new route. Do not replace the proven local service intent with a generic AI audit site.
- Capture a fresh GSC baseline before implementation when the connector is available. Record queries, landing pages, clicks, impressions, CTR, and average position for the last 28 and 90 days.
- If Dominic can identify which page or query produced the first lead, treat that page's title, H1, primary intent, and CTA path as protected.
- Never store the lead's name, email, message, or other personal information in the repository or public implementation report.

## Step-by-Step Tasks

### Task 1: Establish the implementation baseline

- **File:** Repository state only
- **Action:** Inspect, no modification
- **Details:**
  - Run `git status --short --branch` and save the list of pre-existing changes.
  - Confirm the active branch is `main` unless the user requests another branch.
  - Run `npm run lint` and `npm run build` before edits.
  - If either baseline command fails, record the exact failure before changing files.
  - Do not clean or normalize the unrelated `.claude` changes.
  - Query GSC for the last 28 and 90 days when available. Record page and query performance without changing external state.
  - Ask Dominic for the first lead's landing page or source only if it is not visible in analytics. Do not request or record the lead's identity or message.
- **Pattern reference:** `AGENTS.md` guardrails and the existing build commands.
- **Acceptance criteria:** Pre-edit status, validation results, SEO baseline, and any known first lead landing page are recorded without personal lead data.

### Task 2: Rewrite the React homepage around the offer ladder

- **File:** `src/AIConsultingServicesPage.jsx`
- **Action:** Modify
- **Details:**
  - Keep the current H1, phone CTA, local positioning, proof section, and no list.
  - Change every primary CTA from workflow triage language to `Book a 15 minute fit call`.
  - Change hero supporting copy to explain the paid diagnostic: map the workflow, research the right tools, and receive a prioritized plan before buying implementation.
  - Replace hero chips with concrete offer signals:
    - `$999 assessment`
    - `45 minute discovery`
    - `3 to 7 recommendations`
  - Add `#assessment` to navigation.
  - Add a primary assessment section before the implementation service cards. It must state:
    - Who it is for: owner led San Antonio service businesses with a repeated workflow problem, without an employee-count eligibility limit.
    - Price: $999.
    - Inputs: one 45 minute recorded discovery with permission.
    - Outputs: three to seven verified recommendations, effort versus impact matrix, four day plan, ROI assumptions, and 30 minute review.
    - Boundary: recommendations first, implementation only if requested.
  - Reframe the `services` cards as possible implementation paths discovered after the assessment, not the initial product.
  - Replace `processSteps` with the episode's four phases:
    1. Discover the real workflow.
    2. Analyze and research suitable tools.
    3. Quality check and build the report.
    4. Review priorities and choose the next step.
  - Add a concise deliverables section summarizing the nine part report without forcing nine separate cards.
  - Add a `What happens after the assessment` section with self implementation, scoped implementation, and optional ongoing advisory.
  - Update FAQs to cover:
    - What the assessment costs.
    - What the $999 includes.
    - How the fit call differs from the assessment.
    - Whether implementation is included.
    - How recording and sensitive data are handled.
    - Whether current software must be replaced.
    - What business size is the best fit.
  - Do not publish a refund guarantee, average savings, conversion rates, or concierge pricing.
  - Keep all customer facing copy free of em dashes.
- **Pattern reference:** Existing data arrays, Tailwind cards, sticky navigation, CTA pairs, FAQ accordion, and section width conventions in the same component.
- **Acceptance criteria:** A prospect can answer price, process, deliverables, fit, and next step without opening another page.

### Task 3: Synchronize raw homepage HTML and structured data

- **File:** `index.html`
- **Action:** Modify
- **Details:**
  - Preserve the canonical URL, local business name, phone, service area, homepage H1, and crawlable service keywords.
  - Preserve the current title, canonical, geo metadata, keywords, and core meta description unless a change is required for factual consistency. The existing SEO system produced a lead, so offer alignment should happen primarily in visible supporting copy, fallback content, links, and structured offer data.
  - Preserve the current Open Graph and Twitter titles. Only adjust their descriptions if the visible offer would otherwise contradict them, and retain phone, document, workflow, and San Antonio language.
  - Add the assessment as the first item in `hasOfferCatalog`:
    - Service name: `AI Tools Assessment San Antonio`.
    - URL: `https://aiconsultingsa.com/ai-tools-assessment-san-antonio/`.
    - Offer price: `999`.
    - Currency: `USD`.
  - Keep the three existing implementation services in the catalog after the assessment.
  - Replace FAQPage entries with the same questions and answers shown in the React homepage. Exact visible and structured content must match.
  - Update static fallback content inside `#root` so it explains the paid assessment and links to the new assessment page.
  - Update fallback CTA text to `Book a 15 minute fit call` while retaining the current Calendly URL unless a verified replacement is supplied.
  - Keep the Calendly widget script only if it is still required by the deployed behavior. Do not remove it without verifying usage.
- **Pattern reference:** Existing JSON-LD graph and static fallback in `index.html`.
- **Acceptance criteria:** Raw HTML accurately describes the same offer rendered by React, and every JSON-LD block parses.

### Task 4: Create the dedicated AI Tools Assessment landing page

- **File:** `public/ai-tools-assessment-san-antonio/index.html`
- **Action:** Create
- **Details:**
  - Reuse `/public/static-page.css` and the structure of the three existing static service pages.
  - Recommended metadata:
    - Title: `AI Tools Assessment San Antonio | AI Consulting SA`
    - Canonical: `https://aiconsultingsa.com/ai-tools-assessment-san-antonio/`
    - H1: `Find the AI tools your business should actually use.`
    - Eyebrow: `AI Tools Assessment San Antonio`
  - Hero must show:
    - `$999 flat assessment`
    - `45 minute discovery`
    - `3 to 7 prioritized recommendations`
    - Primary CTA to the 15 minute fit call.
    - Secondary phone CTA.
  - Page sections:
    1. The problem: owners have tools and AI pressure but lack a prioritized operating diagnosis.
    2. Best fit: owner led local service businesses with repeated calls, paperwork, follow ups, and handoffs.
    3. Four phase process from the source.
    4. What the report includes, using the nine part structure.
    5. How recommendations are quality checked for size, stack, cost, security, and technical fit.
    6. Four day quick start and transparent ROI assumptions.
    7. What happens next: self implementation, scoped implementation, optional advisory.
    8. Privacy and recording expectations.
    9. FAQ and final CTA.
  - Structured data:
    - `Service` provided by the existing LocalBusiness entity.
    - `Offer` with price `999` and priceCurrency `USD`.
    - `areaServed` consistent with the existing pages.
    - `BreadcrumbList`.
    - `FAQPage` matching visible FAQs exactly.
  - Link to the homepage and all three implementation service routes.
  - Do not link to the private vault notes or transcript from the public site.
- **Pattern reference:** `public/small-business-automation-san-antonio/index.html` for a workflow focused structure and `public/static-page.css` for layout.
- **Acceptance criteria:** The route serves standalone HTML with distinct title, description, canonical, H1, schema, CTA, and internal links.

### Task 5: Reframe the three existing service pages as post-assessment paths

- **Files:**
  - `public/ai-phone-answering/index.html`
  - `public/ai-document-automation-san-antonio/index.html`
  - `public/small-business-automation-san-antonio/index.html`
- **Action:** Modify
- **Details:**
  - Preserve each page's title, canonical, H1, core service description, verified proof, and FAQ intent.
  - Add `AI Tools Assessment` to header and footer navigation.
  - Change primary CTA labels to `Book a 15 minute fit call`.
  - Add a compact section before each implementation process explaining that the paid assessment maps the workflow, compares off the shelf tools, and decides whether a custom build is justified.
  - Link that section to `/ai-tools-assessment-san-antonio/`.
  - Keep phone and implementation specific content intact.
  - Update visible FAQ copy and JSON-LD only where the assessment changes the answer. Visible and structured answers must match exactly.
  - Do not add the $999 price to every service page if it makes the service itself appear to cost $999. Make clear that $999 is the assessment, not the implementation.
- **Pattern reference:** Existing static sections, `.panel`, `.grid-3`, `.steps`, FAQ details, and CTA blocks.
- **Acceptance criteria:** Each service page remains focused on its keyword while clearly routing new buyers through the assessment.

### Task 6: Update routing and discovery files

- **File:** `vercel.json`
- **Action:** Modify
- **Details:** Add a permanent redirect from `/ai-tools-assessment-san-antonio/index.html` to the canonical trailing slash URL. Preserve all existing redirects and the `www` redirect.
- **Pattern reference:** Existing static page redirects.

- **File:** `public/sitemap.xml`
- **Action:** Modify
- **Details:**
  - Add `https://aiconsultingsa.com/ai-tools-assessment-san-antonio/`.
  - Give the assessment page priority `0.9` and weekly change frequency during the pilot period.
  - Update homepage and modified page `lastmod` values to the actual implementation date.
  - Preserve canonical absolute URLs.
- **Pattern reference:** Existing four URL entries.

- **Acceptance criteria:** XML parses, all five canonical routes are present once, and the `.html` path redirects to the slash route.

### Task 7: Replace boilerplate documentation and record the implementation

- **File:** `README.md`
- **Action:** Modify
- **Details:**
  - Replace the Vite starter README with the actual project purpose, stack, commands, production domain, route list, offer architecture, and static route testing gotcha from `AGENTS.md`.
  - Document that the site is a marketing site and customer delivery remains human led.

- **File:** `AGENTS.md`
- **Action:** Modify only if the implementation establishes a durable new convention
- **Details:**
  - Add the assessment route to project notes.
  - Add the consistency rule: homepage React, raw fallback, visible FAQs, JSON-LD, and static service page CTAs must describe the same offer.
  - Do not rewrite unrelated instructions.

- **File:** `docs/ai-tools-assessment/implementation-report.md`
- **Action:** Create
- **Details:** Record:
  - Source transcript and vault note paths.
  - Offer decisions actually implemented.
  - Files changed.
  - Claims deliberately excluded.
  - Validation results.
  - External follow ups such as Calendly naming and first pilot measurement.
  - Any deviation from this plan and why.
- **Pattern reference:** `docs/keyword-fix/final-report.md` for evidence and validation style, without rewriting that historical report.
- **Acceptance criteria:** A future agent can identify the offer, routes, verification commands, and deferred decisions without reconstructing this session.

### Task 8: Verify content consistency mechanically

- **Files:** All modified HTML and JSX files
- **Action:** Validate
- **Details:**
  - Search all customer facing files for stale CTA text:
    - `workflow triage call`
    - `free AI audit`
    - `15 minutes`, where it could be confused with the paid assessment
  - Confirm `$999` always refers to the assessment, never implementation.
  - Confirm `45 minute` refers to paid discovery and `30 minute` refers to report review.
  - Confirm there are no public guarantee, average savings, conversion rate, or provider hourly earnings claims.
  - Confirm `Corey Ganim`, Greg Isenberg, the transcript, and private vault paths do not appear in customer facing HTML unless Dominic explicitly requests attribution.
  - Confirm no em dashes were added to customer facing copy.
  - Confirm all CTA URLs are identical unless there is an intentional phone link.
- **Pattern reference:** `rg` searches and HTML parsing used in `docs/keyword-fix/final-report.md`.
- **Acceptance criteria:** No stale or contradictory offer language remains.

### Task 9: Run build, browser, route, schema, and responsive QA

- **Files:** Built output and local preview
- **Action:** Validate
- **Details:** Follow the testing strategy and validation commands below. Do not consider lint and build alone sufficient.
- **Acceptance criteria:** Every required command and browser check passes, or the implementation report records the exact failure and remaining work.

### Task 10: Configure reliable lead email forwarding after explicit authorization

- **System:** Namecheap Free Email Forwarding for `aiconsultingsa.com`
- **Action:** External configuration, not a repository change
- **Current evidence:**
  - Public MX records point to `eforward1.registrar-servers.com` through `eforward5.registrar-servers.com`.
  - Public SPF includes `spf.efwd.registrar-servers.com`.
  - This indicates Namecheap's forwarding mail path is already active. A new mail provider or DNS migration is not required merely to forward a domain alias.
- **Required inputs:**
  - Source alias that received or should receive leads: unknown — needs Dominic.
  - Destination normal inbox: unknown — needs Dominic.
  - Receive only forwarding versus the ability to reply from the domain address: unknown — needs Dominic.
- **Details:**
  1. Confirm whether the missed message went to an `@aiconsultingsa.com` alias or was a Calendly/account notification sent to another mailbox.
  2. If it went to an `@aiconsultingsa.com` alias, sign into Namecheap and open `Domain List` > `Manage` for the domain.
  3. Confirm `Advanced DNS` > `Mail Settings` remains set to `Email Forwarding`. The current MX and SPF records suggest this is already true.
  4. Open the `Domain` tab, find `Redirect Email`, and add a forwarder from the source alias to Dominic's normal inbox.
  5. Consider a catch all only if Dominic wants every unconfigured domain alias delivered to the normal inbox. A catch all can increase spam and should not replace explicit aliases for `hello`, `contact`, or the address already exposed to leads.
  6. Allow up to one hour for activation.
  7. Test from a third party address that is different from the destination inbox. Namecheap warns that testing from the destination address can fail.
  8. Verify the forwarded message arrives, retains the original sender, and does not land in spam.
  9. If the missed message was a Calendly notification rather than domain mail, update the Calendly notification/account destination or add a forwarding rule at that source mailbox instead. Do not change DNS for a Calendly notification problem.
- **Important limitation:** Namecheap Free Email Forwarding receives and redirects mail but does not provide SMTP or a full mailbox for sending as the domain alias. If Dominic wants replies to come from the `@aiconsultingsa.com` address, plan a full mailbox such as Namecheap Private Email, Google Workspace, or another verified SMTP service as a separate task.
- **Official reference:** `https://www.namecheap.com/support/knowledgebase/article.aspx/308/2214/how-to-set-up-free-email-forwarding/`
- **Repository rule:** Do not place Dominic's normal private email address in source code, public HTML, schema, or committed documentation.
- **Acceptance criteria:** A test message from an unrelated address reaches the normal inbox within the expected forwarding window. Reply behavior is documented as receive only unless a full mailbox is separately configured.

### Task 11: Close out without unauthorized publishing

- **File:** `D:\Documents\My thoughts\Projects\AI First Solutions.md`
- **Action:** Update through the Obsidian connector after implementation
- **Details:** Record what shipped, offer decisions, routes, verification, external dependencies, and the first customer follow up. Link the existing public and personal research notes.
- **Pattern reference:** Existing dated project updates in the vault note.
- **Acceptance criteria:** Durable vault context matches the implemented repository state.

- **Repository publication:** Do not commit, push, deploy, rename the Calendly event, or request GSC indexing unless the user explicitly authorizes those actions in the execution session.

## Testing Strategy

### Static analysis

- Run ESLint across the React code.
- Build with Vite.
- Parse `vercel.json` as JSON.
- Parse `public/sitemap.xml` as XML.
- Extract and parse every `application/ld+json` block from the homepage and four static pages.
- Search for stale CTA text and prohibited public claims.

### Route verification

Run a Vite preview, not only the dev server. The project instructions note that Vite dev can serve the React fallback for trailing slash static routes.

Verify status 200 and expected H1 for:

- `/`
- `/ai-tools-assessment-san-antonio/`
- `/ai-phone-answering/`
- `/ai-document-automation-san-antonio/`
- `/small-business-automation-san-antonio/`

Verify each route has:

- A distinct title.
- The expected canonical URL.
- One primary H1.
- A visible assessment or fit call path.
- Working internal links.
- No broken asset references.

### Browser QA

Use the browser automation tool available in the execution session.

- Homepage desktop and mobile:
  - Sticky navigation works.
  - FAQ accordion works.
  - Offer price and deliverables are readable.
  - Fit call and phone CTAs work.
  - No horizontal overflow or clipped text.
- Assessment page desktop and mobile:
  - $999 is clearly the assessment price.
  - 15 minute fit call, 45 minute discovery, and 30 minute review are not conflated.
  - Four phase process and deliverables are scannable.
  - FAQ and internal links work.
- Existing service pages:
  - Original service intent remains dominant.
  - Assessment bridge is visible but not mistaken for the service price.
  - CTA and phone links work.

### Content acceptance tests

- A prospect can answer these questions from the homepage:
  1. What is the first paid product?
  2. What does it cost?
  3. What meetings are included?
  4. What deliverables are included?
  5. Is implementation included?
  6. What happens after the assessment?
- The public site contains no invented proof or guarantee.
- The ROI formula in documentation uses 4.33 weeks per month.
- Existing local SEO phrases remain in metadata, schema, navigation, or supporting copy even when the visible offer is simplified.

## Validation Commands

```powershell
Set-Location -LiteralPath 'D:\GitHub\ai first solutions'

# Confirm user changes remain separate.
git status --short --branch
git diff -- . ':!.claude/settings.local.json' ':!.claude/worktrees'

# Required project checks.
npm run lint
npm run build

# Parse repository JSON.
Get-Content -LiteralPath 'vercel.json' -Raw | ConvertFrom-Json | Out-Null

# Parse sitemap XML.
[xml](Get-Content -LiteralPath 'public\sitemap.xml' -Raw) | Out-Null

# Confirm all expected canonical URLs exist once in the sitemap.
rg -n "https://aiconsultingsa.com/(ai-tools-assessment-san-antonio|ai-phone-answering|ai-document-automation-san-antonio|small-business-automation-san-antonio)?/" public\sitemap.xml

# Find stale CTA and unsupported claim language.
rg -n -i "workflow triage call|free AI audit|money.back|seven hours|50%|60%|1,000/hour|thousand dollars an hour" src index.html public -g '*.jsx' -g '*.html'

# Confirm offer terms appear in the intended files.
rg -n "\$999|45 minute|30 minute|3 to 7|four day" src\AIConsultingServicesPage.jsx index.html public\ai-tools-assessment-san-antonio\index.html

# Inspect all structured data blocks with a temporary one shot Node command.
@'
import fs from 'node:fs';
const files = [
  'index.html',
  'public/ai-tools-assessment-san-antonio/index.html',
  'public/ai-phone-answering/index.html',
  'public/ai-document-automation-san-antonio/index.html',
  'public/small-business-automation-san-antonio/index.html',
];
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!blocks.length) throw new Error(`${file}: no JSON-LD`);
  for (const [index, block] of blocks.entries()) JSON.parse(block[1]);
  console.log(`${file}: ${blocks.length} JSON-LD block(s) valid`);
}
'@ | node --input-type=module

# Preview must be used for static trailing slash routes.
npm run preview -- --host 127.0.0.1
```

While preview is running, verify each route in a second shell or browser:

```powershell
$routes = @(
  '/',
  '/ai-tools-assessment-san-antonio/',
  '/ai-phone-answering/',
  '/ai-document-automation-san-antonio/',
  '/small-business-automation-san-antonio/'
)
foreach ($route in $routes) {
  $response = Invoke-WebRequest -Uri ("http://127.0.0.1:4173" + $route) -UseBasicParsing
  [pscustomobject]@{ Route = $route; Status = $response.StatusCode; Bytes = $response.Content.Length }
}
```

Browser QA is still required after these commands.

## Rollback Plan

- Before implementation, record `git status --short` and the exact files already modified by the user.
- Keep the feature diff limited to files listed in this plan.
- If the feature needs to be abandoned before commit, revert only the files created or modified by the execution session. Never use `git reset --hard` or broad checkout commands.
- Remove the new assessment route, its sitemap entry, and its Vercel redirect together so no orphan URL remains.
- Restore homepage React copy, raw fallback copy, and JSON-LD as one unit. Do not roll back only one representation of the offer.
- Never touch `.claude/settings.local.json` or `.claude/worktrees/` during rollback.
- If changes have been committed, use a normal revert commit only after user authorization.

## Notes

### Assumptions made

1. Dominic wants the repository aligned to the business model, not a software implementation of assessment fulfillment.
2. The current homepage H1 and three local service routes should be preserved because they already support the site's local SEO positioning.
3. `$999` is the intended public assessment price for this alignment.
4. The existing Calendly URL remains usable until a verified replacement is supplied.
5. The assessment is human delivered. AI assists research, but Dominic reviews every recommendation.
6. Public implementation prices and concierge pricing remain scoped after diagnosis rather than copied from Corey's business.
7. The historical keyword report remains unchanged; a separate implementation report records this offer change.
8. The current SEO structure is treated as validated because it produced the first lead. Offer alignment should extend it, not replace it.
9. The domain is currently using Namecheap Free Email Forwarding based on its public MX and SPF records.

### Defaults when information is missing

- **Calendly replacement URL:** unknown — needs Dominic. Default: keep the existing verified URL and update only visible labels.
- **Money back guarantee terms:** unknown — needs Dominic. Default: do not publish a guarantee.
- **First pilot customer:** unknown — needs Dominic. Not required for the marketing site implementation.
- **AI Concierge price and capacity:** unknown — needs Dominic. Default: mention optional ongoing advisory without price or scarcity.
- **Direct checkout:** not authorized. Default: qualify through the fit call.
- **Lead receiving alias:** unknown — needs Dominic. Default: do not guess or create an alias.
- **Normal forwarding destination:** unknown — needs Dominic. Default: do not write any private inbox into repository files.
- **Send as domain email:** unknown — needs Dominic. Default: configure receive only forwarding and explain that replies require a full mailbox or SMTP service.
- **First lead landing page or query:** unknown — needs Dominic if analytics cannot identify it. Default: preserve every current SEO route and primary intent.

### Risks

- Changing the homepage offer without synchronizing raw fallback and schema can create contradictory search signals.
- Adding `$999` near implementation pages can make visitors think a custom build costs $999.
- Calling the 15 minute fit call an audit can make the paid assessment feel duplicative.
- Publishing the five hour refund promise before defining its terms creates legal, trust, and delivery risk.
- Copying source results as Dominic's proof would be misleading.
- Overloading the page with all six expansion offers recreates the confusion the source warns against.
- A new static route may look correct under Vite dev while actually serving the React fallback. Preview and raw HTML checks are mandatory.
- The current README is boilerplate. If it remains stale, the next execution agent may misunderstand the repository.
- A broad homepage rewrite could erase the search intent that generated the first lead. Make additive, evidence preserving changes and compare the post change GSC baseline.
- A catch all email forwarder can attract spam. Prefer explicit aliases unless there is a clear operational reason for a wildcard.
- Forwarding solves missed inbound mail but does not let Dominic send replies from the domain address.

### Explicitly out of scope

- Stripe checkout or paid booking.
- Automated transcript upload or storage.
- Customer authentication or portal.
- AI generated reports inside the website.
- CRM, email, or Calendly API integration.
- Legal drafting for guarantee terms or data processing agreements.
- Publishing unverified customer case studies.
- Publishing Dominic's normal private email address.
- Migrating email providers or creating a paid mailbox unless Dominic asks to send as the domain address.
- Commit, push, Vercel deployment, or GSC indexing without explicit authorization.

### Definition of done

- [ ] Homepage clearly presents the fit call, $999 assessment, deliverables, process, and post-assessment paths.
- [ ] Dedicated assessment route exists with correct metadata, canonical, schema, and mobile layout.
- [ ] Existing service pages remain keyword focused and route prospects through the assessment.
- [ ] Existing SEO titles, H1s, canonicals, local keyword coverage, and internal links that produced the first lead remain intact.
- [ ] Raw homepage fallback, React content, visible FAQs, JSON-LD, sitemap, and redirects agree.
- [ ] No unsupported guarantee, result, conversion, or hourly earnings claims are public.
- [ ] Lint, build, JSON, XML, JSON-LD, route, desktop, and mobile checks pass.
- [ ] README and implementation report describe the actual system.
- [ ] User's unrelated `.claude` changes remain untouched.
- [ ] AI First Solutions vault note is updated after implementation.
- [ ] If email forwarding is authorized, an external test message reaches Dominic's normal inbox and no private inbox is committed to the repository.

## Execution Handoff

Start the next session with a clean context and say:

> Execute `D:\GitHub\ai first solutions\.agents\plans\ai-tools-assessment-offer-alignment.md`. Read the required transcript and vault notes through the Obsidian connector first. Implement the repository changes, run every validation gate, do browser QA, and stop before commit, push, deploy, Calendly changes, or GSC actions unless I explicitly authorize them.
