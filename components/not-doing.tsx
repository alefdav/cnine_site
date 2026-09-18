'use client';

import { X } from 'lucide-react';
import type { ContentType } from '@/lib/content';
import { Reveal } from '@/components/reveal';

export function NotDoing({ t }: { t: ContentType }) {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <h2 className="text-4xl font-extrabold leading-[1.04] tracking-tighter md:text-5xl">
            {t.notDoing.titleTop}
            <br />
            {t.notDoing.titleBottom}
          </h2>
          <p className="mt-6 max-w-[52ch] leading-relaxed text-muted">
            {t.notDoing.lede}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ul>
            {t.notDoing.items.map((item) => (
              <li
                key={item}
                className="grid grid-cols-[26px_1fr] gap-4 border-t border-line py-5.5 text-[17px] leading-snug first:border-t-0 first:pt-0"
              >
                <X size={18} strokeWidth={2} className="mt-1 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
