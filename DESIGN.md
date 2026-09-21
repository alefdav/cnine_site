# DESIGN.md

Visual system of the C9 Company landing page. Generated from the shipped code (2026-07-11 redesign). Every future surface reads this before adding UI.

## Theme

The brand is the sky (Cloud Nine), so the page shows the sky at the visitor's own hour. `data-daypart` on `<html>` selects one of four palettes, and every token in `:root` is redefined per daypart:

| Daypart | Local hours | Sky |
|---|---|---|
| `dawn` | 05–09 | Indigo above, ember below, amber accent |
| `day` | 09–17 | Ice white; the **only** daypart where hero, nav and footer are light |
| `dusk` | 17–20 | Violet above, burnt rose below, coral accent |
| `night` | 20–05 | Cobalt night above the cloud layer. The baseline, and the fallback with no JS |

The attribute is written **before first paint** by the inline script in `app/layout.tsx`, from `localStorage['c9-sky']` (a sky the visitor pinned in the top bar) or from their clock. The HTML ships with `data-daypart="night"`, so bots, no-JS and prerender all get the night. The hour ranges in that script mirror `daypartFromHour()` in `lib/content.ts`; change one, change the other.

Structure holds in every daypart: the hero opens above the layer, the body runs light, the Protocol section darkens (`--deep`), the closing CTA is drenched in `--primary` and the footer returns to the sky surface.

Two token groups: **page body** (`--bg`, `--surface`, `--ink`, `--muted`, `--primary`, `--deep`, `--tint`, `--line`) and **sky surfaces** (`--hero-*`, `--accent`, `--accent-ink`) used by hero, nav and footer, which are the ones that invert between light and dark. Sky surfaces highlight with `--accent`; body surfaces with `--primary`. Never mix the two on one background.

**A component must never write a literal color.** One hardcoded `text-white` and a daypart breaks in that section.

## Color

Tokens live in `app/globals.css` (`:root` + Tailwind v4 `@theme inline`). OKLCH only.

| Token | Value | Role |
|---|---|---|
| `--bg` / `bg-background` | `oklch(1 0 0)` | Page background, pure white |
| `--surface` / `bg-surface` | `oklch(0.972 0.007 240)` | Alternating section background |
| `--ink` / `text-ink` | `oklch(0.2 0.02 250)` | Body and heading text |
| `--muted` / `text-muted` | `oklch(0.45 0.02 248)` | Secondary text (>=4.5:1 on bg) |
| `--primary` / `bg-primary` | `oklch(0.52 0.14 240)` | Brand sky-cobalt: CTAs, accents, drenched CTA section. Always white text on fills |
| `--primary-hover` | `oklch(0.46 0.14 243)` | Hover state of primary fills |
| `--deep` / `bg-deep` | `oklch(0.22 0.05 255)` | Upper-atmosphere navy: Protocol section, featured bento cell |
| `--tint` / `bg-tint` | `oklch(0.94 0.025 230)` | Sky-tinted chips, icon backgrounds, giant footer wordmark |
| `--line` / `border-line` | `oklch(0.9 0.01 240)` | Hairlines and borders |
| `--night` / `bg-night` | `oklch(0.19 0.045 258)` | Night sky above the layer: hero ground, nav, footer |
| `--night-2` | `oklch(0.27 0.06 262)` | Upper glow of the hero gradient |
| `--accent` / `text-accent` | `oklch(0.62 0.15 238)` | Lit cobalt: the single highlight on dark surfaces (badge, CTA, numerals, logo dot) |

Strategy: **committed**. One hue family (sky-cobalt) carries the identity across the whole page. `--primary` is its light-surface voice, `--accent` its dark-surface voice; there is no second hue. Theme-color meta hex: `#16233d`.

## Typography

- **Sans (display + body):** Geist via `next/font`, variable `--font-geist-sans`.
- **Mono:** Geist Mono, variable `--font-geist-mono`. Used ONLY for numeric data (stat values, step numerals).
- Display: `font-extrabold tracking-tighter`, hero at `clamp(2.75rem, 7vw, 5rem)`, section headings `text-4xl md:text-5xl`.
- Body: `text-lg leading-relaxed`, secondary copy in `text-muted`, line length capped with `max-w-[Nch]`.
- No serif anywhere. Emphasis via weight and the primary color, never via a second family.

## Shape

- Interactive elements (buttons, chips, icon wells): full pill (`rounded-full`).
- Containers (bento cells, hero image frame): `rounded-[20px]`.
- Everything else square-edged with hairline borders. No other radii.

## Layout

- Content container: `max-w-6xl mx-auto px-5 md:px-8`.
- Nav: sticky, 64px, `bg-hero/90 backdrop-blur-md` + `border-hero-line`. No scroll listeners. **No menu links**: this is a landing page, so the bar carries only the wordmark, the sky switcher, the language pill and the CTA. Anchors live in the content itself (`#sistema`, `#protocolo`).
- Section rhythm: `py-24 md:py-32`; alternating `background` / `surface`; one `deep` block; one `primary` drench (closing only, the hero uses `--night`).
- Layout families in use (do not repeat one for a new section): centered drenched hero with bleeding image, hairline-divided stat band, asymmetric bento (1 tall + 2 stacked), two-col proof with chat card, three-up icon grid, two-col rail with numbered sequence, label/prose rows (pledges and FAQ), three-up cards, centered drenched CTA.
- Every multi-column layout collapses to single column below `md`/`lg` in the same component.

## Imagery

Real photography only (Unsplash, URLs verified to resolve). Brand subject: the sky seen from altitude.
- Hero: `photo-1499346030926-9a72daac6c63` (sea of clouds), desaturated and composited onto the night ground with `mix-blend-mode: screen` plus a bottom-bleeding mask (`.clouds-mask` in `globals.css`). Grain comes from an inline `feTurbulence` SVG, never an image asset.
- Deep bento cell texture: `photo-1534088568595-a066f410bcda` at 25% opacity.
- `images.unsplash.com` is allowed in `next.config.ts`. Alt text written in brand voice. No pills/labels overlaid on images, no fake UI screenshots, no hand-rolled decorative SVGs.

## Iconography

lucide-react (existing dependency), `strokeWidth={1.5}` everywhere, sized 20-28px, always inside a pill well (`bg-tint text-primary` on light, `bg-white/10` on dark).

## Motion

Dials: VARIANCE 7 / MOTION 5 / DENSITY 4.
- Page load: hero-only stagger (`.rise` + `.rise-1..4` delays, `rise` keyframe, ease `cubic-bezier(0.16,1,0.3,1)`).
- Scroll: `components/reveal.tsx` adds `.reveal-init` via JS then releases with `.is-visible` on 20% intersection (IntersectionObserver, disconnect after fire). Content is fully visible without JS.
- Hover: color shifts + `translate-x` on arrow icons; `:active` gets `translate-y-px`.
- Sky change: `.sky-shift` on `<html>` cross-fades `background-color`, `border-color` and `color` over 0.45s. The class is added by `components/sky-switch.tsx` only after first paint, so the page load itself never animates.
- `prefers-reduced-motion: reduce` disables all of the above (static, instant).
- Banned: `window.addEventListener('scroll')`, animating layout properties, bounce/elastic easings, infinite loops.

## Copy rules

- PT-BR is the source language; EN mirrors it (`lib/content.ts`).
- One CTA intent, one label: "Agendar diagnóstico" / "Book a diagnostic" in nav, hero and closing. Every one of them opens WhatsApp (`whatsappLink()` in `lib/content.ts`); the hero's secondary button only scrolls to `#sistema`, so it competes with nothing.
- No em-dashes anywhere. Numerals only where a real sequence exists (Protocol steps). One kicker is allowed and only one: the hero badge; no section eyebrows.
- Every number on the page has to survive a check against the operation. No invented ROI, no invented lead counts, no client names without written permission, no price (the price comes out of the diagnostic).
- Voice: flight/altitude engineering, concrete verbs, no marketing buzzwords.
