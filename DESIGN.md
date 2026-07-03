# DESIGN.md — Portfolio Design System

Read before any visual/UI decision. Deviations need explicit approval.

## Direction: "Workshop Editorial"

Editorial confidence carried by **scale and layout**, not serif costume. The voice:
hands-on, bright, resourceful — a builder who fixes PCs, ships POS systems for
sari-sari stores, and makes generative art. Light-first. Violet is identity.

Named references: Stripe purple-on-white restraint (color mechanics) ×
type-specimen scale confidence (layout). NOT the saturated editorial-serif lane
(no display serif, no italic magazine headlines, no ruled three-column grids).

## Typography

- **Bricolage Grotesque Variable** — the single family. Optical sizing does the
  register shift: display cuts at hero sizes, calm text at body sizes.
  - Display: weight 700–800, `font-optical-sizing: auto`, tight-but-legal
    letter-spacing (never below -0.04em), `text-wrap: balance`
  - Body: weight 400, 16px+ mobile, line-height 1.6, max 70ch
  - UI/labels: weight 500–600
- **Fragment Mono** — tech tags, timestamps, small data labels ONLY. Never body.
- Type scale: fluid clamp(), ratio ≥1.25. Hero ceiling: clamp max 5.5rem.
- NO other families. NO all-caps body. Caps only for short labels.

## Color (OKLCH, Committed strategy — violet carries identity surfaces)

Light (default):
- `--paper`   oklch(98.5% 0.005 300) — violet-tinted near-white (NOT warm cream)
- `--ink`     oklch(20% 0.02 300)
- `--ink-soft` oklch(38% 0.02 300) — secondary text (≥4.5:1 on paper)
- `--accent`  oklch(47% 0.21 295) — deep violet (#6D28D9 family), text-safe on paper
- `--accent-bright` oklch(61% 0.19 294) — #8B5CF6 family, large elements only on light
- `--surface` oklch(96% 0.008 300)
- `--line`    oklch(88% 0.01 300)

Dark (.dark class, warm graphite — NOT pure black):
- `--paper`   oklch(19% 0.015 300)
- `--ink`     oklch(93% 0.01 300)
- `--ink-soft` oklch(72% 0.015 300)
- `--accent`  oklch(70% 0.17 294) — lifted violet for contrast on graphite
- `--surface` oklch(23% 0.015 300)
- `--line`    oklch(32% 0.015 300)

Rules: body text ≥4.5:1 always. Violet is semantic (identity, interaction,
emphasis) — never decorative sprinkles. Gray text never sits on violet surfaces
(use violet-tinted transparency of ink instead).

## Layout

- Single page, sections as full thoughts — one dominant idea per fold.
- Asymmetry over centered-everything. TindaPOS card is BIG; other projects compact.
  No identical card grids.
- Fluid spacing: clamp() section gaps; tight groupings inside, generous between.
- Max content width 72rem; text columns ≤70ch.
- z-index scale: dropdown 10 · sticky 20 · overlay 30 · modal 40 · toast 50.

## Motion (motion.dev)

- Ease: ease-out quart/expo. 150–300ms micro, ≤600ms reveals. No bounce.
- Content visible by default — reveals enhance, never gate.
- Each section's reveal fits what it reveals (no uniform fade-up reflex).
- `prefers-reduced-motion: reduce` → crossfade/instant everywhere; canvas renders
  one static frame.
- Gen-art canvas: seeded, main-thread rAF, IntersectionObserver + visibilityState
  pause, feature-detect → static SVG.

## Bans (from impeccable + plan)

Gradient text · glassmorphism-by-default · side-stripe borders · hero-metric
template · identical card grids · uppercase tracked eyebrow above every section ·
numbered section markers as scaffold · emoji as icons (SVG only: Lucide) ·
scale-transform hovers that shift layout · cream/beige body bg · pure-black dark
mode · display serif editorial costume.

## Touch & a11y

44px minimum touch targets · visible focus rings (violet, 2px offset) ·
keyboard-complete · semantic landmarks · alt text carries voice.
