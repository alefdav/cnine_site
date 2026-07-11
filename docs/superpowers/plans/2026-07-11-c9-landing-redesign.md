# C9 Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. This is a visual redesign: verification is `npm run build` + browser screenshots + the taste-skill Pre-Flight Check, not unit tests.

**Goal:** Full visual redesign (overhaul) of the C9 Company single-page landing, preserving content/positioning and the bilingual PT/EN structure, with PT as the new default language.

**Architecture:** Split the current 660-line `app/page.tsx` monolith into a content model (`lib/content.ts`) plus one client component per section under `components/`. Design tokens move to OKLCH CSS variables in `app/globals.css` via Tailwind v4 `@theme`. Motion is CSS keyframes + a small IntersectionObserver reveal component (no `window.addEventListener('scroll')`, `prefers-reduced-motion` respected everywhere).

**Tech Stack:** Next.js 16 (App Router), Tailwind v4, Geist + Geist Mono (next/font, already wired), lucide-react (existing dependency, kept).

---

## Design brief (locked)

- **Register:** brand. **Dials:** VARIANCE 7 / MOTION 5 / DENSITY 4.
- **Theme:** light, locked (brand insists: Cloud Nine = daylight sky; boilerplate dark-mode override in globals.css is removed so the page renders identically regardless of system preference).
- **Palette (OKLCH, committed strategy - blue carries the identity):**
  - `--bg: oklch(1 0 0)` pure white
  - `--surface: oklch(0.972 0.007 240)` cloud tint
  - `--ink: oklch(0.2 0.02 250)` near-black cool
  - `--muted: oklch(0.45 0.02 248)` (>=4.5:1 on bg)
  - `--primary: oklch(0.58 0.14 240)` engineered sky-cobalt (white text on fills)
  - `--deep: oklch(0.22 0.05 255)` upper-atmosphere navy (the one dark color-block section)
- **Type:** Geist display (tracking-tight, weights 600-800), Geist Mono only for numeric data. Hero headline <= 2 lines, `clamp()` capped ~5rem.
- **CTA intent:** exactly one conversion label used everywhere: PT "Agendar diagnóstico" / EN "Book a diagnostic". Hero secondary: PT "Ver os sistemas" / EN "See the systems" (navigation intent, used once).
- **Section map (5 distinct layout families, max 2 eyebrows total):**
  1. Nav: sticky, one line, <=72px, blur + hairline.
  2. Hero: asymmetric split - left-aligned copy, right: real above-the-clouds photograph (verified Unsplash URL) in an engineered clipped frame. Page-load stagger.
  3. Systems: asymmetric bento (1 tall + 2 stacked, `2fr 1fr`), >=1 cell with real visual variation (image / deep tint). No three-equal-cards.
  4. Protocol: the single dark color-block ("ascent") section, deep navy; 4 numbered steps as a real sequence (vertical rail, not cards).
  5. Results: full-width hairline band, mono numerals, context sentence per stat - not the big-number-card template.
  6. Final CTA: drenched primary-blue section, single button.
  7. Footer: compact; keeps the giant C9. wordmark; language toggle lives in nav.
- **Copy:** preserve voice ("Protocolo de Ascensão", systems vocabulary), PT becomes source language. Fix broken strings: "Engenharamos" -> "Projetamos e operamos", "Trindade/dominância" -> "Os três sistemas / Três sistemas, uma operação". No em-dashes anywhere.
- **SEO integrity:** remove fake `aggregateRating` (4.9/127 invented reviews - penalty risk) and the `SearchAction` (site has no search). Keep Organization + ProfessionalService JSON-LD. `<html lang="pt-BR">`, PT-primary metadata with EN alternate.

---

### Task 1: Design tokens + global CSS

**Files:**
- Modify: `app/globals.css`

- [ ] Replace boilerplate with OKLCH tokens above, `@theme inline` mappings (`--color-*`, fonts), remove the `prefers-color-scheme: dark` override and the `Arial` body font (use `var(--font-geist-sans)`).
- [ ] Add keyframes: `rise` (opacity 0 / translateY 16px -> 1 / 0) with `cubic-bezier(0.16,1,0.3,1)`, utilities `.reveal` / `.reveal.is-visible`, stagger delays, and a `@media (prefers-reduced-motion: reduce)` block forcing everything visible/static.
- [ ] Verify: `npm run build` passes.

### Task 2: Content model

**Files:**
- Create: `lib/content.ts`

- [ ] Move `Language`, `ContentType` (without React nodes - icons become string keys) and both language objects out of page.tsx. PT first. Apply the copy fixes from the brief. Single CTA label constant reused by nav/hero/cta.

### Task 3: Reveal utility

**Files:**
- Create: `components/reveal.tsx`

- [ ] Client component: wraps children, IntersectionObserver adds `is-visible` once at 20% visibility, disconnects after fire. Skips entirely (renders visible) when `matchMedia('(prefers-reduced-motion: reduce)')` matches. Content is visible-by-default if JS never runs (class only *adds* the animation start state via JS, so headless/no-JS never ships blank sections).

### Task 4-9: Sections (nav, hero, systems, protocol, results, cta+footer)

**Files:**
- Create: `components/nav.tsx`, `components/hero.tsx`, `components/systems.tsx`, `components/protocol.tsx`, `components/results.tsx`, `components/closing.tsx` (final CTA + footer)
- Modify: `app/page.tsx` (thin client shell: lang state + section composition + JSON-LD)

- [ ] Build each section per the locked brief. Nav uses `position: sticky` + permanent hairline/blur (no scroll listener). Mobile: every multi-column section declares its `<768px` single-column collapse.
- [ ] Hero image: verify candidate Unsplash above-the-clouds URLs resolve (HTTP 200 + visual check) before wiring; if none verify, use `https://picsum.photos/seed/c9-altitude/1600/1200` and flag.
- [ ] `app/page.tsx` composes sections, holds `lang` state (default `'pt'`), renders cleaned JSON-LD.

### Task 10: Layout metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] `lang="pt-BR"`, PT-primary title/description, `alternateLocale` en_US, theme-color synced to new primary, remove duplicated manual `<head>` tags Next already emits via metadata.

### Task 11: Verification

- [ ] `npm run build` - expect success, no type errors.
- [ ] `npm run dev` + Playwright: screenshot desktop (1440px) and mobile (390px), both languages; check nav single line, hero fits viewport, CTA contrast, no overflow.
- [ ] Run taste-skill Section 14 Pre-Flight Check + impeccable absolute-bans sweep against the final code. Fix any failure before declaring done.

### Task 12: DESIGN.md

- [ ] Generate DESIGN.md from the shipped tokens/components (impeccable `document` format) so future work stays on-brand.
