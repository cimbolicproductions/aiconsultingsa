# AI Consulting SA Codex Instructions

This project is the `aiconsultingsa.com` Vite/React site. Codex should treat the user's global Claude memory as the canonical operating policy:

- Canonical cross-tool memory: `C:\Users\djcim\.claude\CLAUDE.md`
- Codex bridge rules: `C:\Users\djcim\.codex\AGENTS.md`

## Project Commands

```bash
npm run build
npm run lint
npm run dev
```

## Project Notes

- Production domain: `https://aiconsultingsa.com`
- Public crawl files live in `public/robots.txt` and `public/sitemap.xml`.
- Vercel canonical redirects live in `vercel.json`.
- The primary paid offer page is `public/ai-tools-assessment-san-antonio/index.html` at `/ai-tools-assessment-san-antonio/`.
- The static long-tail page is `public/ai-phone-answering/index.html`.
- Static long-tail pages under `public/<slug>/index.html` must be verified with `npm run build` plus `npm run preview`; Vite dev may serve the React homepage fallback for trailing slash routes like `/ai-phone-answering/`.
- Keep sitemap URLs canonical and absolute. For GSC domain properties, submit the full sitemap URL: `https://aiconsultingsa.com/sitemap.xml`.
- Keep the React homepage, raw homepage fallback, visible FAQs, JSON-LD, static service page CTAs, sitemap, and redirects aligned to the same offer.
- Lead capture uses matching React and raw homepage forms that post to `/api/lead/`. The Vercel Function sends an authenticated Resend batch with the private lead notification and customer confirmation. Production requires `LEAD_RECIPIENT_EMAIL`, `RESEND_API_KEY`, and `RESEND_FROM_EMAIL` on a verified sending domain. Never put these values in client code or public HTML. Static service CTAs route to `/#contact`; keep both form copies, the API contract, customer confirmation copy, and success URL synchronized.

## Memory And Closeout Rules

- At the start of a substantial task, read this file and the Codex bridge rules at `C:\Users\djcim\.codex\AGENTS.md`.
- For substantial sessions, document durable project outcomes in the Obsidian vault before final handoff. Capture what shipped, why, how it works, gotchas, and follow-ups. Do not dump raw session narration.
- Prefer Obsidian/vault MCP tools for discovery and writes when available. If unavailable, say so and use the safest available fallback only for durable notes the user clearly wants preserved.
- Update this `AGENTS.md` when a new project-specific convention, command, architecture fact, or repeated gotcha is discovered.
- For novel cross-project lessons, update `C:\Users\djcim\.claude\CLAUDE.md` under `## Cross-Project Lessons` and mirror any Codex-specific operating lesson into `C:\Users\djcim\.codex\AGENTS.md`.
- In the final handoff for substantial work, state which vault notes, `AGENTS.md`, or global memory files were updated. If no durable update was warranted, say so briefly.

## Guardrails

- Never revert user or other-agent changes without explicit request.
- Before large edits or any push, check `git status`, recent commits, and what is leaving the branch.
- Verify changes with the smallest useful check: usually `npm run build`, `npm run lint`, or a targeted browser/live URL check.
- Avoid em dashes in user-facing copy unless quoting source text.
