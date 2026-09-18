'use client';

import type { ContentType } from '@/lib/content';
import { Reveal } from '@/components/reveal';

export function Audience({ t }: { t: ContentType }) {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="text-4xl font-extrabold leading-[1.04] tracking-tighter md:text-5xl">
            {t.audience.title}
          </h2>
          <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-muted">
            {t.audience.lede}
          </p>
        </Reveal>

        <div className="mt-13 grid gap-5 md:grid-cols-3">
          {t.audience.cards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={0.06 * i}
              className="h-full rounded-[20px] border border-line bg-background p-7 md:p-8"
            >
              <h3 className="text-xl font-extrabold tracking-tight">{card.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted">{card.desc}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 leading-relaxed text-muted">{t.audience.note}</p>
      </div>
    </section>
  );
}
