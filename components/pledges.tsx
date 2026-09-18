'use client';

import type { ContentType } from '@/lib/content';
import { Reveal } from '@/components/reveal';

export function Pledges({ t }: { t: ContentType }) {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="text-4xl font-extrabold leading-[1.04] tracking-tighter md:text-5xl">
            {t.pledges.titleTop}
            <br />
            {t.pledges.titleBottom}
          </h2>
        </Reveal>

        <div className="mt-14">
          {t.pledges.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={0.05 * i}
              className="grid gap-4 border-t border-line py-10 last:border-b md:grid-cols-[300px_1fr] md:gap-16"
            >
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight">
                {item.title}
              </h3>
              <p className="max-w-[58ch] text-[17px] leading-relaxed text-muted">
                {item.desc}
              </p>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-[62ch] text-xl font-bold leading-snug tracking-tight">
          {t.pledges.close}{' '}
          <span className="text-primary">{t.pledges.closeAccent}</span>
        </p>
      </div>
    </section>
  );
}
