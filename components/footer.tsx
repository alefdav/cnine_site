'use client';

import {
  CITY,
  EMAIL,
  LEGAL_ID,
  LEGAL_NAME,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  type ContentType,
} from '@/lib/content';

export function Footer({ t }: { t: ContentType }) {
  return (
    <footer className="border-t border-hero-line bg-hero py-14 text-sm leading-relaxed text-hero-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:flex-row md:justify-between md:px-8">
        <div>
          <p className="text-xl font-black tracking-tighter text-hero-ink">
            C9<span className="text-accent">.</span>
          </p>
          <p className="mt-2.5">{t.footer.tagline}</p>
        </div>

        <address className="not-italic">
          {LEGAL_NAME} · {LEGAL_ID}
          <br />
          {CITY}
          <br />
          <a
            href={`mailto:${EMAIL}`}
            className="transition-colors hover:text-hero-ink"
          >
            {EMAIL}
          </a>{' '}
          ·{' '}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="transition-colors hover:text-hero-ink"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </address>

        <div>
          {t.footer.rights}
          <br />
          <a href="/privacidade" className="transition-colors hover:text-hero-ink">
            {t.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
