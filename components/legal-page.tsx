import type { ReactNode } from 'react';
import { CITY, LEGAL_ID, LEGAL_NAME } from '@/lib/content';

/* Moldura simples das páginas legais (termos, privacidade). */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="lp-lock min-h-screen">
      <main className="mx-auto max-w-[44rem] px-5 py-12 md:px-8 md:py-20">
        <span className="text-[20px] font-extrabold tracking-tighter text-primary">
          C9<span className="opacity-60">.</span>
        </span>
        <h1 className="mt-8 text-[2rem] font-extrabold leading-tight tracking-tighter md:text-[2.5rem]">{title}</h1>
        <p className="mt-2 text-sm text-muted">Última atualização: {updated}</p>
        <div className="mt-8 grid gap-6 leading-relaxed [&_h2]:mt-4 [&_h2]:text-[1.25rem] [&_h2]:font-extrabold [&_h2]:tracking-tight [&_li]:ml-5 [&_li]:list-disc [&_ul]:grid [&_ul]:gap-1.5">
          {children}
        </div>
      </main>
      <footer className="bg-deep py-8 text-center text-[13px] text-background/60">
        {LEGAL_NAME} · {LEGAL_ID} · {CITY}
      </footer>
    </div>
  );
}
