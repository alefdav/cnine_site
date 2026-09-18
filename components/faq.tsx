'use client';

import type { ContentType } from '@/lib/content';
import { Reveal } from '@/components/reveal';

export function Faq({ t }: { t: ContentType }) {
  return (
    <section id="perguntas" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="text-4xl font-extrabold leading-[1.04] tracking-tighter md:text-5xl">
            {t.faq.titleTop}
            <br />
            {t.faq.titleBottom}
          </h2>
        </Reveal>

        <dl className="mt-12">
          {t.faq.items.map((item, i) => (
            <Reveal
              key={item.q}
              delay={0.04 * i}
              className="grid gap-3 border-t border-line py-8 last:border-b md:grid-cols-[420px_1fr] md:gap-14"
            >
              <dt className="text-xl font-bold leading-snug tracking-tight">
                {item.q}
              </dt>
              <dd className="max-w-[60ch] leading-relaxed text-muted">{item.a}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
