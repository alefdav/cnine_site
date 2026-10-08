import type { Metadata } from 'next';
import { Download, MessageCircle, MoveRight } from 'lucide-react';
import { CITY, LEGAL_ID, LEGAL_NAME, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/lib/content';
import { Reveal } from '@/components/reveal';

const PDF = '/claude-no-adm-logistico.pdf';
const TITLE = 'Obrigado pela compra: Claude no Administrativo Logístico';

/* Página pós-compra: fora do índice e do sitemap, só quem comprou chega aqui. */
export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: 'Baixe seu guia Claude no Administrativo Logístico e veja por onde começar.',
  robots: { index: false, follow: false },
};

const wrap = 'mx-auto max-w-6xl px-5 md:px-8';
const h2 = 'text-[2.125rem] font-extrabold leading-[1.05] tracking-tighter md:text-[2.875rem]';

const steps = [
  {
    title: 'Leia os capítulos 1 e 12',
    body: 'O primeiro ensina a pedir bem. O último, a usar com segurança. São a base de todo o resto.',
  },
  {
    title: 'Escolha uma tarefa da semana',
    body: 'A que mais toma seu tempo hoje: atrasados, frete, inventário ou relatório. Vá direto no capítulo dela.',
  },
  {
    title: 'Use o pedido amanhã cedo',
    body: 'Copie o pedido pronto, ajuste ao seu caso e confira o resultado. O ganho aparece na primeira semana.',
  },
];

const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Olá! Comprei o guia Claude no Administrativo Logístico e tenho uma dúvida.',
)}`;

function Grain() {
  return (
    <svg className="grain-layer pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      <filter id="ty-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#ty-grain)" />
    </svg>
  );
}

export default function Page() {
  return (
    <div className="lp-lock">
      <main>
        <section className="lp-sky relative overflow-hidden pb-20 text-background md:pb-28">
          <Grain />
          <div className={`relative z-20 ${wrap}`}>
            <nav className="flex h-16 items-center md:h-[72px]">
              <span className="text-[22px] font-extrabold tracking-tighter">
                C9<span className="opacity-60">.</span>
              </span>
            </nav>

            <div className="max-w-[40rem] pt-10 md:pt-16">
              <span className="rise inline-flex h-[30px] items-center gap-2 rounded-full bg-background/12 px-3.5 text-[13.5px] font-bold">
                <i className="size-2 rounded-full bg-background shadow-[0_0_0_4px_color-mix(in_oklch,currentColor_20%,transparent)]" />
                Compra confirmada
              </span>
              <h1 className="rise rise-1 mt-5 text-[clamp(2.5rem,7vw,4.125rem)] font-extrabold leading-[1.03] tracking-tighter">
                Obrigado. Seu guia <span className="text-[var(--lp-moon)]">já está aqui.</span>
              </h1>
              <p className="rise rise-2 mt-5 max-w-[44ch] text-lg leading-relaxed text-background/80 md:text-[19px]">
                <strong className="font-bold text-background">Claude no Administrativo Logístico.</strong> 12 capítulos
                com pedidos prontos para copiar, uma biblioteca de pedidos e um plano de 30 dias.
              </p>
              <div className="rise rise-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={PDF}
                  download
                  className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-background px-8 text-base font-bold text-primary transition-colors hover:bg-tint active:translate-y-px"
                >
                  <Download size={20} strokeWidth={1.5} aria-hidden />
                  Baixar o PDF
                </a>
                <a
                  href={PDF}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-background/40 px-7 text-base font-bold transition-colors hover:border-background hover:bg-background/10"
                >
                  Abrir no navegador
                </a>
              </div>
              <p className="rise rise-4 mt-4 text-sm text-background/65">PDF, 34 páginas, 2,2 MB. Salve no celular ou no computador.</p>
            </div>
          </div>
        </section>

        <section className="bg-background py-20 md:py-28">
          <div className={wrap}>
            <Reveal className="max-w-[50ch]">
              <h2 className={h2}>Por onde começar.</h2>
              <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-muted md:text-[19px]">
                Não precisa ler na ordem. Três passos para ver resultado ainda esta semana.
              </p>
            </Reveal>
            <ol className="mt-12 grid border-t border-line md:mt-14 md:grid-cols-3">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className={`py-8 md:py-0 md:pt-8 ${i ? 'border-t border-line md:border-l md:border-t-0 md:pl-9' : ''} md:pr-9`}
                >
                  <span className="font-mono text-[15px] font-medium text-primary">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 text-[22px] font-extrabold tracking-tight">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-surface py-20 md:py-28">
          <div className={`${wrap} grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16`}>
            <Reveal className="max-w-[50ch]">
              <h2 className="text-[1.75rem] font-extrabold leading-[1.1] tracking-tighter md:text-[2.125rem]">
                Travou em algum pedido?
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Mande no WhatsApp qual capítulo e o que aconteceu. A gente ajuda a ajustar o pedido para a sua operação.
              </p>
            </Reveal>
            <a
              href={whatsapp}
              className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-primary px-8 text-base font-bold text-background transition-colors hover:bg-primary-hover active:translate-y-px"
            >
              <MessageCircle size={20} strokeWidth={1.5} aria-hidden />
              WhatsApp {WHATSAPP_DISPLAY}
              <MoveRight size={20} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-deep py-10 text-sm text-background/60">
        <div className={`${wrap} flex flex-col gap-3 md:flex-row md:items-center md:justify-between`}>
          <span className="text-xl font-extrabold tracking-tighter text-background">
            C9<span className="opacity-60">.</span>
          </span>
          <p>Material de uso pessoal. Claude é marca da Anthropic; guia independente.</p>
          <p>
            {LEGAL_NAME} · {LEGAL_ID} · {CITY}
          </p>
        </div>
      </footer>
    </div>
  );
}
