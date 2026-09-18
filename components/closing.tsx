'use client';

import { MoveRight } from 'lucide-react';
import { whatsappLink, type ContentType, type Language } from '@/lib/content';
import { Reveal } from '@/components/reveal';

export function Closing({ t, lang }: { t: ContentType; lang: Language }) {
  return (
    <section id="contato" className="relative overflow-hidden bg-primary text-white">
      <div
        className="absolute inset-0 bg-[radial-gradient(110%_80%_at_50%_-20%,oklch(0.60_0.135_238)_0%,transparent_62%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-28 text-center md:px-8 md:py-36">
        <Reveal>
          <h2 className="text-4xl font-extrabold leading-[1.04] tracking-tighter md:text-[3.5rem]">
            {t.closing.titleTop}
            <br />
            {t.closing.titleBottom}
          </h2>
          <p className="mx-auto mt-6 max-w-[50ch] text-lg leading-relaxed text-white/80">
            {t.closing.subtitle}
          </p>
          <div className="mt-9">
            <a
              href={whatsappLink(lang)}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-bold text-primary transition-colors hover:bg-tint active:translate-y-px"
            >
              {t.cta}
              <MoveRight
                size={20}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
          <p className="mt-5 text-sm text-white/70">{t.closing.fine}</p>
        </Reveal>
      </div>
    </section>
  );
}
