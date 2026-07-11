'use client';

import { MoveRight } from 'lucide-react';
import type { ContentType } from '@/lib/content';
import { Reveal } from './reveal';

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/c9company' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/c9company' },
];

// TODO: replace with the real scheduling link (Calendly / WhatsApp / form)
const SCHEDULE_HREF = 'mailto:contato@c9company.com';

export function Closing({ t }: { t: ContentType }) {
  return (
    <>
      <section id="contato" className="bg-primary py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
          <Reveal>
            <h2 className="mx-auto max-w-[16ch] text-5xl font-extrabold tracking-tighter md:text-7xl">
              {t.closing.title}
            </h2>
            <p className="mx-auto mt-6 max-w-[44ch] text-lg leading-relaxed text-white/85 md:text-xl">
              {t.closing.subtitle}
            </p>
            <a
              href={SCHEDULE_HREF}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 text-lg font-bold text-primary transition-transform hover:scale-[1.03] active:translate-y-px"
            >
              {t.cta}
              <MoveRight
                size={20}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-line py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="select-none text-[clamp(6rem,20vw,14rem)] font-black leading-none tracking-tighter text-tint">
            C9.
          </div>
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-6">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-muted transition-colors hover:text-ink"
                >
                  {social.label}
                </a>
              ))}
            </div>
            <p className="text-sm text-muted">{t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
