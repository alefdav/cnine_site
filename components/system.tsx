'use client';

import type { ContentType } from '@/lib/content';
import { Reveal } from '@/components/reveal';

export function System({ t }: { t: ContentType }) {
  return (
    <section id="sistema" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="grid items-end gap-8 lg:grid-cols-2 lg:gap-14">
          <h2 className="text-4xl font-extrabold leading-[1.04] tracking-tighter md:text-5xl">
            {t.system.titleTop}
            <br />
            {t.system.titleBottom}
          </h2>
          <p className="max-w-[54ch] text-lg leading-relaxed text-muted">
            {t.system.lede}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="flex h-full flex-col justify-between rounded-[20px] bg-deep p-8 text-white md:p-9">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-accent">
                {t.system.reception.kicker}
              </p>
              <h3 className="mt-3.5 text-2xl font-extrabold tracking-tight md:text-[1.7rem]">
                {t.system.reception.title}
              </h3>
              <p className="mt-3 max-w-[42ch] leading-relaxed text-white/70">
                {t.system.reception.desc}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-2.5">
              {t.system.reception.chat.map((line, i) => (
                <p
                  key={i}
                  className={
                    line.from === 'us'
                      ? 'max-w-[84%] self-end rounded-2xl rounded-br-md bg-white px-4 py-3 text-sm font-medium leading-snug text-deep'
                      : 'max-w-[84%] self-start rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 text-sm leading-snug'
                  }
                >
                  {line.text}
                </p>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-5">
            {t.system.pieces.map((piece, i) => (
              <Reveal
                key={piece.title}
                delay={0.08 * (i + 1)}
                className="flex h-full flex-col rounded-[20px] border border-line p-8 md:p-9"
              >
                <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-primary">
                  {piece.kicker}
                </p>
                <h3 className="mt-3.5 text-2xl font-extrabold tracking-tight md:text-[1.7rem]">
                  {piece.title}
                </h3>
                <p className="mt-3 max-w-[40ch] leading-relaxed text-muted">
                  {piece.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <p className="mt-9 text-lg font-bold tracking-tight">{t.system.close}</p>
      </div>
    </section>
  );
}
