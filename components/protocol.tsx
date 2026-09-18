'use client';

import type { ContentType } from '@/lib/content';
import { Reveal } from '@/components/reveal';

export function Protocol({ t }: { t: ContentType }) {
  return (
    <section id="protocolo" className="bg-deep py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="text-4xl font-extrabold leading-[1.04] tracking-tighter md:text-5xl">
            {t.protocol.title}
          </h2>
          <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-white/70">
            {t.protocol.lede}
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 md:gap-x-16">
          {t.protocol.steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={0.06 * i}
              className="grid grid-cols-[56px_1fr] border-t border-white/15 py-8 md:grid-cols-[74px_1fr]"
            >
              <p className="pt-1 font-mono text-sm text-accent">
                {String(i + 1).padStart(2, '0')}
              </p>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-[38ch] leading-relaxed text-white/70">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
