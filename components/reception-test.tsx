'use client';

import { whatsappLink, type ContentType, type Language } from '@/lib/content';
import { Reveal } from '@/components/reveal';

export function ReceptionTest({ t, lang }: { t: ContentType; lang: Language }) {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1fr_420px] lg:gap-16">
        <Reveal>
          <h2 className="text-4xl font-extrabold leading-[1.04] tracking-tighter md:text-5xl">
            {t.test.titleTop}
            <br />
            {t.test.titleBottom}
          </h2>

          {t.test.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-5 max-w-[46ch] text-lg leading-relaxed text-muted"
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-8">
            <a
              href={whatsappLink(lang)}
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-bold text-white transition-colors hover:bg-primary-hover active:translate-y-px"
            >
              {t.test.cta}
            </a>
          </div>

          <p className="mt-5 font-mono text-sm text-muted">{t.test.contactNote}</p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="overflow-hidden rounded-[20px] border border-line bg-background"
        >
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-black tracking-tighter text-white">
              C9
            </span>
            <span>
              <span className="block text-sm font-bold">{t.test.chatName}</span>
              <span className="block text-xs font-medium text-primary">
                {t.test.chatStatus}
              </span>
            </span>
          </div>

          <div className="flex flex-col gap-2.5 bg-surface p-5">
            {t.test.thread.map((line, i) => (
              <p
                key={i}
                className={
                  line.from === 'us'
                    ? 'max-w-[86%] self-end rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm leading-snug text-white'
                    : 'max-w-[86%] self-start rounded-2xl rounded-bl-md border border-line bg-background px-4 py-2.5 text-sm leading-snug'
                }
              >
                {line.text}
                {line.time ? (
                  <span
                    className={
                      line.from === 'us'
                        ? 'mt-1.5 block text-[11px] text-white/70'
                        : 'mt-1.5 block text-[11px] text-muted'
                    }
                  >
                    {line.time}
                  </span>
                ) : null}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
