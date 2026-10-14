import type { Metadata } from 'next';
import Link from 'next/link';
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import { MessageCircle } from 'lucide-react';
import { LEGAL_ID, LEGAL_NAME } from '@/lib/content';
import { Clarity } from '@/components/clarity';
import { JoinButton } from '@/components/achados/join-button';

/*
  C9. Achados: página de entrada do grupo de ofertas de Natal no WhatsApp.
  Uma tela só no celular (anúncio → página → grupo). Em vez de molde de
  landing, um papel de "lista de Natal" sobre o céu noturno da Cnine, com
  marcações à mão e voz de gente. Sem contador de membros nem desconto
  prometido: só o que é verdade.
*/

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['800'], variable: '--font-ac-display' });
const body = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-ac-body' });

const TITLE = 'Achados de Natal no WhatsApp, sem enrolação';
const DESCRIPTION =
  'Grupo gratuito no WhatsApp com achados de decoração, mesa posta e presentes de Natal garimpados todo dia. Só a gente posta, saia quando quiser.';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | C9. Achados` },
  description: DESCRIPTION,
  alternates: { canonical: '/achados-natal' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/achados-natal',
    siteName: 'C9. Achados',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const list = [
  { item: 'Enfeite que não parece de R$ 1,99', done: true },
  { item: 'Mesa posta bonita pra ceia', done: true },
  { item: 'Amigo secreto dentro do limite', done: true },
  { item: 'Cupom, quando tiver de verdade', done: false },
];

/* Varal de luzes cruzando o topo: fio em curva e lâmpadas douradas piscando. */
function Garland() {
  const bulbs = Array.from({ length: 9 }, (_, i) => {
    const x = 18 + i * 45.5;
    const y = 16 + Math.sin((i / 8) * Math.PI) * 30;
    return { x, y, warm: i % 3 === 1 };
  });
  return (
    <svg viewBox="0 0 400 76" className="pointer-events-none absolute inset-x-0 top-0 h-auto w-full" aria-hidden>
      <path d="M-4 8 Q200 92 404 8" fill="none" stroke="rgb(244 241 234 / 0.3)" strokeWidth="1.1" />
      {bulbs.map((b, i) => (
        <g key={i} className="achados-bulb">
          <circle cx={b.x} cy={b.y + 9} r="13" fill="var(--ac-gold)" opacity="0.16" />
          <rect x={b.x - 2} y={b.y - 1} width="4" height="4" rx="0.8" fill="rgb(244 241 234 / 0.45)" />
          <path
            d={`M${b.x} ${b.y + 3} c4 0 5.5 4 5.5 7 c0 3.6 -2.6 6 -5.5 6 c-2.9 0 -5.5 -2.4 -5.5 -6 c0 -3 1.5 -7 5.5 -7z`}
            fill={b.warm ? '#ffb86b' : 'var(--ac-gold)'}
          />
        </g>
      ))}
    </svg>
  );
}

/* Traço feito à mão sob "Sem enrolação." */
function Scribble() {
  return (
    <svg viewBox="0 0 220 14" className="absolute -bottom-2 left-0 h-3.5 w-[92%]" preserveAspectRatio="none" aria-hidden>
      <path d="M2 9 C 40 3, 90 3, 130 7 S 200 11, 218 4" fill="none" stroke="var(--ac-gold)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* Visto desenhado à mão para os itens da lista. */
function Tick({ done }: { done: boolean }) {
  return (
    <svg viewBox="0 0 22 22" className="mt-0.5 size-[22px] flex-none" aria-hidden>
      <rect x="2" y="2.5" width="17" height="17" rx="3" fill="none" stroke="#16233d" strokeOpacity="0.45" strokeWidth="1.4" />
      {done && <path d="M5 11.5 L9.5 16 L20 3.5" fill="none" stroke="#b8860b" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

/* Papel de lista de Natal, levemente torto, com borda serrilhada e carimbo de "grátis". */
function ChristmasList() {
  return (
    <div className="relative mx-1 mt-8 -rotate-[1.6deg]">
      <div className="relative rounded-[4px] bg-[#f4efe3] px-5 pt-5 pb-4 text-[#16233d] shadow-[0_22px_40px_-18px_rgb(0_0_0/0.75),0_2px_0_rgb(0_0_0/0.08)] [background-image:repeating-linear-gradient(transparent,transparent_31px,rgb(22_35_61/0.09)_31px,rgb(22_35_61/0.09)_32px)]">
        {/* serrilhado do topo, como folha arrancada do bloco */}
        <span
          className="absolute inset-x-0 -top-[6px] h-[7px] bg-[#f4efe3] [mask:radial-gradient(circle_at_6px_0,transparent_4px,#000_4.5px)_0_0/12px_7px_repeat-x]"
          aria-hidden
        />
        <p className="pr-16 font-[family-name:var(--font-ac-display)] text-[19px] leading-none tracking-tight">O que cai no grupo</p>
        <ul className="mt-3.5 grid gap-[10px]">
          {list.map(({ item, done }) => (
            <li key={item} className="flex gap-2.5 text-[15.5px] leading-[1.35] font-medium">
              <Tick done={done} />
              <span className={done ? '' : 'text-[#16233d]/70'}>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3.5 border-t border-dashed border-[#16233d]/25 pt-2.5 text-[13px] text-[#16233d]/70">
          Tudo com link direto da Shopee, Amazon, Mercado Livre ou Magalu.
        </p>
      </div>

      {/* carimbo */}
      <div className="absolute -top-8 -right-3 flex size-[92px] rotate-[12deg] items-center justify-center rounded-full bg-[var(--ac-gold)] text-[var(--ac-navy)] shadow-[0_8px_18px_-8px_rgb(0_0_0/0.6)]">
        <div className="flex size-[80px] flex-col items-center justify-center gap-1 rounded-full border-[1.5px] border-dashed border-[var(--ac-navy)]/70">
          <span className="font-[family-name:var(--font-ac-display)] text-[19px] leading-none">grátis</span>
          <span className="text-[8.5px] font-bold uppercase leading-none tracking-[0.1em]">pra entrar</span>
        </div>
      </div>
    </div>
  );
}

const joinClass =
  'buy-pulse flex h-[60px] w-full items-center justify-center gap-2.5 rounded-2xl bg-[var(--ac-wa)] text-[17.5px] font-bold text-white [--pulse:var(--ac-wa)] hover:brightness-110 active:translate-y-px';

export default function Page() {
  return (
    <div className={`achados ${display.variable} ${body.variable} min-h-dvh font-[family-name:var(--font-ac-body)]`}>
      <Clarity tags={{ page: 'achados-natal' }} />

      <main className="relative overflow-hidden">
        <div className="achados-stars pointer-events-none absolute inset-0" aria-hidden />
        <Garland />

        <div className="relative mx-auto flex min-h-dvh max-w-[28rem] flex-col px-6 pt-14 pb-5">
          <p className="font-[family-name:var(--font-ac-display)] text-[18px] tracking-tight text-[var(--ac-ink)]/90">
            C9<span className="text-[var(--ac-gold)]">.</span> Achados
          </p>

          <h1 className="mt-3 font-[family-name:var(--font-ac-display)] text-[clamp(1.875rem,8.6vw,3.25rem)] leading-[1.02] tracking-[-0.03em]">
            <span className="block whitespace-nowrap">Achados de Natal.</span>
            <span className="relative inline-block whitespace-nowrap text-[var(--ac-gold)]">
              Sem enrolação.
              <Scribble />
            </span>
          </h1>

          <p className="mt-4 max-w-[32ch] text-[16.5px] leading-[1.45] text-[var(--ac-muted)]">
            A gente passa o dia caçando oferta boa de Natal e manda no grupo do WhatsApp.{' '}
            <span className="text-[var(--ac-ink)]">Você só entra e escolhe.</span>
          </p>

          <ChristmasList />

          <div className="mt-6">
            <JoinButton placement="hero" className={joinClass}>
              <MessageCircle size={22} strokeWidth={2.25} aria-hidden />
              Entrar no grupo de Natal
            </JoinButton>
            <p className="mt-3 text-center text-[13px] text-[var(--ac-muted)]">
              Só a gente posta. Sem spam. Sai quando quiser.
            </p>
          </div>

          <footer className="mt-auto pt-6 text-[11px] leading-snug text-[var(--ac-muted)]/80">
            <p>
              Preços e descontos variam por produto e estoque. A gente pode receber comissão pelas compras feitas pelos links,
              sem custo extra para você.
            </p>
            <p className="mt-1.5">
              C9. Achados é uma marca da {LEGAL_NAME} · {LEGAL_ID} ·{' '}
              <Link href="/privacidade" className="underline underline-offset-2">
                Privacidade
              </Link>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
