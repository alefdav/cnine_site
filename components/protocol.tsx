'use client';

import type { ContentType } from '@/lib/content';
import { Reveal } from './reveal';

/*
  The one dark moment on the page: the sky darkens as the operation
  climbs. A real 4-step sequence, so the numerals carry information.
*/
export function Protocol({ t }: { t: ContentType }) {
  return (
    <section id="protocolo" className="bg-deep py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="text-4xl font-extrabold tracking-tighter md:text-5xl">
              {t.protocol.title}
            </h2>
            <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-white/70">
              {t.protocol.intro}
            </p>
          </Reveal>

          <ol className="lg:col-span-7">
            {t.protocol.steps.map((step, index) => (
              <Reveal key={step.title} delay={0.06 * index}>
                <li
                  className={`flex gap-6 py-7 md:gap-10 ${
                    index > 0 ? 'border-t border-white/10' : ''
                  }`}
                >
                  <span className="pt-1 font-mono text-sm text-white/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[52ch] leading-relaxed text-white/70">
                      {step.desc}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
