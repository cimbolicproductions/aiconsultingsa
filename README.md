# AI Consulting SA

Marketing site for [aiconsultingsa.com](https://aiconsultingsa.com), a San Antonio AI consulting service for owner led businesses with repeated calls, paperwork, follow ups, and operational handoffs.

## Offer

The site presents a simple offer ladder:

1. Free website form where the owner shares the workflow and contact details.
2. $999 AI Tools Assessment with a 45 minute discovery, three to seven recommendations, a prioritized report, and a 30 minute review.
3. Separately scoped implementation when the assessment identifies justified work.
4. Optional ongoing advisory after recurring support is proven useful.

This repository is only the marketing site. Assessment research, human quality control, reporting, and customer delivery remain human led outside the website.

Website leads post to `/api/lead/`, a Vercel Function that reads the server-only `LEAD_RECIPIENT_EMAIL` setting and relays accepted submissions to FormSubmit. The recipient address is not included in the browser HTML. The first live submission still requires the recipient to confirm the FormSubmit activation email before later leads are forwarded.

## Stack

- React 19 and Vite 7
- Tailwind CSS 4 for the React homepage
- Standalone static HTML service pages using `public/static-page.css`
- Lucide React icons
- Vercel hosting and canonical redirects

## Commands

```powershell
npm install
npm run dev
npm run lint
npm run build
npm run preview -- --host 127.0.0.1
```

## Routes

- `/` React homepage with crawlable raw HTML fallback
- `/ai-tools-assessment-san-antonio/` primary paid assessment
- `/ai-phone-answering/` phone implementation path
- `/ai-document-automation-san-antonio/` document implementation path
- `/small-business-automation-san-antonio/` workflow implementation path

## Verification note

Always run `npm run build` and test static trailing slash routes through `npm run preview`. Vite development mode may serve the React homepage fallback for a static route such as `/ai-phone-answering/`, which can hide a routing or metadata problem.

Keep the React homepage, raw fallback, visible FAQs, JSON-LD, static service page CTAs, sitemap, and redirects synchronized whenever the offer changes.
