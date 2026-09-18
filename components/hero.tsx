'use client';

import Image from 'next/image';
import { MoveRight } from 'lucide-react';
import { whatsappLink, type ContentType, type Language } from '@/lib/content';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1600&q=80';

export function Hero({ t, lang }: { t: ContentType; lang: Language }) {
  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div className="night-sky absolute inset-0" aria-hidden />

      {/* Grão: SVG inline, sem asset externo e sem custo de rede. */}
      <svg
        className="grain-layer pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      <div className="clouds-mask pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[46%] min-h-[240px]">
        <Image
          src={HERO_IMAGE}
          alt={t.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      <div className="relative z-20 mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl flex-col items-center px-5 pb-40 pt-14 text-center md:px-8 md:pb-56 md:pt-20">
        <a
          href="#protocolo"
          className="rise inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 py-1.5 pl-1.5 pr-4 text-sm text-white/80 transition-colors hover:border-white/40 hover:text-white"
        >
          <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-night">
            {t.hero.badgeTag}
          </span>
          <span className="hidden sm:inline">{t.hero.badgeText}</span>
          <span className="sm:hidden">{t.hero.badgeShort}</span>
        </a>

        <h1 className="rise rise-1 mt-7 text-[clamp(2.75rem,7.5vw,5.5rem)] font-extrabold leading-[1.0] tracking-tighter">
          {t.hero.headlineTop}
          <br />
          <span className="text-accent">{t.hero.headlineBottom}</span>
        </h1>

        <p className="rise rise-2 mt-6 max-w-[50ch] text-lg leading-relaxed text-white/65 md:text-xl">
          {t.hero.subheadline}
        </p>

        <div className="rise rise-3 mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href="#sistema"
            className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-4 text-base font-bold text-white transition-colors hover:border-white active:translate-y-px"
          >
            {t.hero.ctaSecondary}
          </a>
          <a
            href={whatsappLink(lang)}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-base font-bold text-night transition-opacity hover:opacity-90 active:translate-y-px"
          >
            {t.cta}
            <MoveRight
              size={20}
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
