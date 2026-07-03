# TODOS

Deferred with context — from the CEO review (docs/designs/portfolio-v1.md).

## Launch-week gate (user actions, cheapest fixes for the stated problem)

- [ ] **GitHub repo hygiene (~10 min, GitHub UI):** add descriptions + homepage
      URLs to SimplePosSystem, Upstaff_dashboard_nideps, enrollment repos,
      BuBzArtwork. Recruiters click through — empty descriptions undercut everything.
- [ ] **Align profile README:** drop Vue/Laravel claims (no public repos back them)
      or make those repos public. Fix "Zamboanaga" typos while in there.
- [ ] **Resume PDF update:** "Expected May 2026" → graduated 2026; add Claude 101 +
      Claude Code 101 (Anthropic, Jun 2026); add TindaPOS project. Then drop the
      file at `public/angelo-depamaylo-resume.pdf` and flip `HAS_RESUME_PDF`
      in `src/components/sections/Resume.tsx` — download button appears.
- [ ] **Web3Forms key (2 min, free):** create at web3forms.com with
      depamaylo.angelo360@gmail.com → set `VITE_WEB3FORMS_KEY` in Vercel env →
      redeploy. Contact form appears automatically.
- [ ] **Lighthouse mobile audit on the live URL** (DoD: Perf ≥90, target 95;
      A11y/BP/SEO 100). If Perf floor breached: lazy-load below-fold sections,
      swap `motion` imports to LazyMotion (`m` components), re-measure.

## v1.1

- [ ] **Playwright smoke + axe scan** at 375/768/1024/1440 (cut-line exercised in
      v1 — Vitest 10/10 green + live manual QA in both themes + mobile stood in).
- [ ] **Auto-built PDF resume from content.ts (M)** — deferred D5.6; hand-tuned
      PDF preferred for now.
- [ ] **Case-study pages for TindaPOS + Upstaff** — needs real screenshots from user.
- [ ] **LinkedIn:** confirm profile URL is live, then add to `content.ts` contact
      (schema test currently bans it on purpose — remove that test with the edit).
- [ ] **Custom domain (~$10/yr):** biggest credibility lever remaining. Update ONE
      line in `.env` + Vercel env + project settings. All SEO derives from it.
