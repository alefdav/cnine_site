'use client';

import Image from 'next/image';
import { MoveRight } from 'lucide-react';
import type { ContentType } from '@/lib/content';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1400&q=80';

export function Hero({ t }: { t: ContentType }) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 md:px-8 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-0">
      <div className="lg:col-span-7">
        <h1 className="rise text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-[1.02] tracking-tighter">
          {t.hero.headline.split(' ')[0]}
          <br />
          <span className="text-primary">
            {t.hero.headline.split(' ').slice(1).join(' ')}
          </span>
        </h1>
        <p className="rise rise-2 mt-6 max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl">
          {t.hero.subheadline}
        </p>
        <div className="rise rise-3 mt-9 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contato"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-4 text-base font-bold text-white transition-colors hover:bg-primary-hover active:translate-y-px"
          >
            {t.cta}
            <MoveRight
              size={20}
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#sistemas"
            className="inline-flex items-center justify-center rounded-full border border-line px-8 py-4 text-base font-bold text-ink transition-colors hover:border-ink active:translate-y-px"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      <div className="rise rise-4 lg:col-span-5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] sm:aspect-[16/10] lg:aspect-[4/5]">
          <Image
            src={HERO_IMAGE}
            alt={t.hero.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
