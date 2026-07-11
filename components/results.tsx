'use client';

import type { ContentType } from '@/lib/content';
import { Reveal } from './reveal';

export function Results({ t }: { t: ContentType }) {
  return (
    <section id="resultados" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="text-4xl font-extrabold tracking-tighter md:text-5xl">
            {t.results.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
            {t.results.stats.map((stat, index) => (
              <div key={stat.value} className={index > 0 ? 'md:pl-10' : ''}>
                <dd className="font-mono text-5xl font-bold tracking-tight text-primary md:text-6xl">
                  {stat.value}
                </dd>
                <dt className="mt-3 max-w-[28ch] text-base leading-relaxed text-muted">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
