'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { whatsappLink, type ContentType, type Language } from '@/lib/content';

interface NavProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: ContentType;
}

export function Nav({ lang, setLang, t }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '#sistema', label: t.nav.system },
    { href: '#protocolo', label: t.nav.protocol },
    { href: '#servicos', label: t.nav.services },
    { href: '#perguntas', label: t.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-40 bg-night/90 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8"
        aria-label={lang === 'pt' ? 'Navegação principal' : 'Main navigation'}
      >
        <Link
          href="/"
          className="text-xl font-black tracking-tighter text-white"
          aria-label="C9 Company"
        >
          C9<span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-bold tracking-wide text-white/80 transition-colors hover:border-white hover:text-white"
            aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para português'}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <a
            href={whatsappLink(lang)}
            className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-night transition-opacity hover:opacity-90 active:translate-y-px"
          >
            {t.cta}
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 text-white md:hidden"
          aria-label={
            isOpen
              ? lang === 'pt'
                ? 'Fechar menu'
                : 'Close menu'
              : lang === 'pt'
                ? 'Abrir menu'
                : 'Open menu'
          }
          aria-expanded={isOpen}
        >
          {isOpen ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-start justify-center gap-8 bg-night px-8 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-black tracking-tighter text-white transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappLink(lang)}
            onClick={() => setIsOpen(false)}
            className="mt-4 rounded-full bg-accent px-7 py-3 text-lg font-bold text-night"
          >
            {t.cta}
          </a>
          <button
            onClick={() => {
              setLang(lang === 'pt' ? 'en' : 'pt');
              setIsOpen(false);
            }}
            className="mt-8 text-sm font-bold tracking-wide text-white/60"
          >
            {lang === 'pt' ? 'Switch to English' : 'Mudar para português'}
          </button>
        </div>
      )}
    </header>
  );
}
