'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { ContentType, Language } from '@/lib/content';

interface NavProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: ContentType;
}

export function Nav({ lang, setLang, t }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '#sistemas', label: t.nav.systems },
    { href: '#protocolo', label: t.nav.protocol },
    { href: '#resultados', label: t.nav.results },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8"
        aria-label={lang === 'pt' ? 'Navegação principal' : 'Main navigation'}
      >
        <a href="/" className="text-xl font-black tracking-tighter" aria-label="C9 Company">
          C9<span className="text-primary">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className="rounded-full border border-line px-3 py-1 text-xs font-bold tracking-wide text-muted transition-colors hover:border-ink hover:text-ink"
            aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para português'}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <a
            href="#contato"
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-hover active:translate-y-px"
          >
            {t.cta}
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 md:hidden"
          aria-label={isOpen ? (lang === 'pt' ? 'Fechar menu' : 'Close menu') : lang === 'pt' ? 'Abrir menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-start justify-center gap-8 bg-background px-8 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-black tracking-tighter transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setIsOpen(false)}
            className="mt-4 rounded-full bg-primary px-7 py-3 text-lg font-bold text-white"
          >
            {t.cta}
          </a>
          <button
            onClick={() => {
              setLang(lang === 'pt' ? 'en' : 'pt');
              setIsOpen(false);
            }}
            className="mt-8 text-sm font-bold tracking-wide text-muted"
          >
            {lang === 'pt' ? 'Switch to English' : 'Mudar para português'}
          </button>
        </div>
      )}
    </header>
  );
}
