'use client';

import Link from 'next/link';
import { whatsappLink, type ContentType, type Language } from '@/lib/content';
import { SkySwitch } from '@/components/sky-switch';

interface NavProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: ContentType;
}

/*
  Landing page: a barra não tem menu. Toda rolagem interna nasce do próprio
  conteúdo, e o único destino da página é o WhatsApp.
*/
export function Nav({ lang, setLang, t }: NavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-hero-line bg-hero/90 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 md:px-8"
        aria-label={lang === 'pt' ? 'Barra principal' : 'Main bar'}
      >
        <Link
          href="/"
          className="text-xl font-black tracking-tighter text-hero-ink"
          aria-label="C9 Company"
        >
          C9<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <SkySwitch t={t} />

          <button
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className="rounded-full border border-hero-line px-3 py-1.5 text-xs font-bold tracking-wide text-hero-soft transition-colors hover:text-hero-ink"
            aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para português'}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>

          <a
            href={whatsappLink(lang)}
            className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90 active:translate-y-px sm:px-5"
          >
            <span className="hidden sm:inline">{t.cta}</span>
            <span className="sm:hidden">{t.ctaShort}</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
