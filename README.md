# deps.dev — personal portfolio

Portfolio of **Angelo "Deps" Depamaylo** ([@Bubblez360](https://github.com/Bubblez360)) —
full-stack developer & IT specialist, Zamboanga City, PH.

Built with React 19 + Vite + TypeScript + Tailwind v4. Designed, reviewed, and
shipped with an AI-assisted workflow — plan of record lives in
[docs/designs/portfolio-v1.md](docs/designs/portfolio-v1.md) (CEO-style scope
review, 3-round adversarial spec loop).

## How it works

- **One content source.** Every word on the site lives in
  [`src/data/content.ts`](src/data/content.ts), schema-validated by Vitest
  **inside the build script** — bad content physically cannot deploy.
- **GitHub stats without an API dependency.** A weekly GitHub Action runs
  [`scripts/snapshot.mjs`](scripts/snapshot.mjs) and commits
  `src/data/snapshot.json`; the commit itself triggers the redeploy and keeps
  the scheduled workflow from being suspended for inactivity. Zero client-side
  API calls.
- **Generative hero.** Seeded bubble-field canvas (Bubblez360, literally) —
  main-thread rAF, paused off-viewport and on hidden tabs, renders a single
  static frame under `prefers-reduced-motion`.
- **Ctrl+K command palette** (cmdk) — sections, theme, copy email.
- **Contact form that can't break.** Web3Forms behind `VITE_WEB3FORMS_KEY`;
  when the key is absent the form doesn't render and email buttons take over.

## Commands

```bash
npm run dev      # local dev
npm test         # vitest (content schema + snapshot generator)
npm run build    # schema gate → sitemap gen → tsc → vite build
node scripts/snapshot.mjs   # refresh GitHub snapshot manually
node scripts/og.mjs         # regenerate the OG image
```

## Design system

Tokens, typography (Bricolage Grotesque + Fragment Mono), color strategy, and
bans in [DESIGN.md](DESIGN.md). Product rules in [PRODUCT.md](PRODUCT.md).
