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
- The homepage is founder led and pain first. Dominic is presented as a San Antonio operator who diagnoses calls, paperwork, and handoff problems before recommending AI or software.
- Keep the public assessment method aligned with the canonical playbook: Diagnose, Research, Prescribe, Review. Implementation is optional, separately scoped, and never implied to be part of the $999 assessment.
- The homepage founder panel is a 16:9 media slot that currently uses `public/founder-avatar.svg`. When a real introduction video is added, use a poster and click to load facade, do not autoplay the full player, and provide a transcript.
- Homepage hero QA must include 1366x768, 390x844, and the 1520x734 CSS viewport produced by a typical 125% browser zoom. On desktop, the primary and phone CTAs, the supporting price line, and the full founder panel must fit inside `window.innerHeight` with no horizontal overflow. Verify this with DOM rectangles, not a width-only screenshot.
- The static long-tail page is `public/ai-phone-answering/index.html`.
- Static long-tail pages under `public/<slug>/index.html` must be verified with `npm run build` plus `npm run preview`; Vite dev may serve the React homepage fallback for trailing slash routes like `/ai-phone-answering/`.
- Keep sitemap URLs canonical and absolute. For GSC domain properties, submit the full sitemap URL: `https://aiconsultingsa.com/sitemap.xml`.
- Keep the React homepage, raw homepage fallback, visible FAQs, JSON-LD, static service page CTAs, sitemap, and redirects aligned to the same offer.
- Lead capture uses matching React and raw homepage forms that post to `/api/lead/`. The Vercel Function sends an authenticated Resend batch with the private lead notification and customer confirmation. Production requires `LEAD_RECIPIENT_EMAIL`, `RESEND_API_KEY`, and `RESEND_FROM_EMAIL` on a verified sending domain. Never put these values in client code or public HTML. Static service CTAs route to `/#contact`; keep both form copies, the API contract, customer confirmation copy, and success URL synchronized.
- DNS for `aiconsultingsa.com` is managed at Namecheap, not Vercel. The nameservers are `dns1/dns2.registrar-servers.com`, so the Vercel CLI and MCP cannot write these records.
- Namecheap Mail Settings is set to `Custom MX`. It must stay there. Namecheap hides the MX record type entirely in `Email Forwarding` mode, which makes the Resend `send` subdomain records impossible to add. Switching modes silently drops the root `eforward*.registrar-servers.com` MX records and the locked root SPF TXT.
- `hello@aiconsultingsa.com` is send only and receives no inbound mail. That is not a regression, since no email redirect was ever defined. Lead replies work because the notification sets `reply_to` to the lead address and the confirmation sets it to `LEAD_RECIPIENT_EMAIL`. To make the address receive mail, add the five `eforward*` MX records back as Custom MX rows and define a redirect under Domain > Redirect Email.
- Never transcribe a Resend DKIM value from the dashboard. The UI truncates it and a relayed copy has already been silently corrupted once. Read records from the Resend API instead, and validate that the base64 after `p=` decodes to a well formed key whose ASN.1 declared length matches its actual byte length.

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

<!-- growth-brain:start -->
## Growth Brain

At session start, read only `D:\Documents\My thoughts\Growth Brain\Businesses\ai-first-solutions\agent-brief.md`. State its `reviewed_through`, verdict, and next move in one sentence, then ask Dominic whether to refresh the evidence or inspect the change. Open its linked notes only for growth work. Never apply, commit, push, deploy, or start an experiment without Dominic's explicit approval in the current session.
<!-- growth-brain:end -->
