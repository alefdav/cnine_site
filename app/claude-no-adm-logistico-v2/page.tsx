import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  AlarmClock,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileText,
  GitCompareArrows,
  Mail,
  MessageCircle,
  NotebookPen,
  Receipt,
  ShieldCheck,
  Sunrise,
  Truck,
  TrendingUp,
  Warehouse,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CITY, LEGAL_ID, LEGAL_NAME, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/lib/content';
import { Reveal } from '@/components/reveal';
import { Clarity } from '@/components/clarity';
import { BuyButton } from '@/components/ebook/buy-button';
import { SalesTracking } from '@/components/ebook/sales-tracking';
import { StickyBar } from '@/components/ebook/v2/sticky-bar';
import { UtmPassthrough } from '@/components/ebook/v2/utm-passthrough';

/*
  Versão B da página de vendas do ebook (teste A/B contra /claude-no-adm-logistico).
  Clarity: 88% dos visitantes no celular não passam da primeira tela, então ela
  precisa vender sozinha: promessa, mockup, preço, botão e garantia sem rolar,
  com a barra de compra fixa desde o carregamento. Estrutura inspirada na
  sequência dor → antes/depois → conteúdo → oferta → garantia → FAQ.
*/

const TITLE = 'Saia no horário sem passar a tarde no PROCV';
const DESCRIPTION =
  'Guia em PDF com 12 pedidos prontos para copiar e colar na IA e cruzar as planilhas da logística. R$ 17,90 no Pix, PDF na hora.';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Claude no ADM Logístico` },
  description: DESCRIPTION,
  alternates: { canonical: '/claude-no-adm-logistico-v2' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/claude-no-adm-logistico-v2',
    siteName: 'C9 Company',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const narrow = 'mx-auto max-w-[44rem] px-5 md:px-8';
const band = 'py-14 md:py-24';
const eyebrow = 'font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-primary';
const h2 = 'mt-3 text-[1.875rem] font-extrabold leading-[1.08] tracking-tighter md:text-[2.5rem]';
const buyLarge =
  'buy-pulse flex h-14 w-full items-center justify-center rounded-full px-8 text-[17px] font-bold transition-colors active:translate-y-px';

const PRICE = 'R$ 17,90';

const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Olá! Comprei o guia Claude no ADM Logístico e quero pedir a devolução.',
)}`;

const pains = [
  'Duas planilhas que não batem e uma tarde inteira de PROCV para achar a diferença.',
  'A fatura de frete conferida CT-e por CT-e, na mão, com medo de deixar passar cobrança errada.',
  'O relatório da semana montado na sexta às 18h, enquanto todo mundo já foi embora.',
];

const pedidos: { icon: LucideIcon; name: string }[] = [
  { icon: Sunrise, name: 'Briefing da manhã: o que exige ação hoje' },
  { icon: AlarmClock, name: 'Pedidos atrasados por transportadora' },
  { icon: GitCompareArrows, name: 'Cruzar a planilha do WMS com a da transportadora' },
  { icon: Warehouse, name: 'Inventário: físico × sistema' },
  { icon: Receipt, name: 'Auditoria de frete CT-e por CT-e' },
  { icon: Truck, name: 'Ocorrência de entrega: linha do tempo da NF' },
  { icon: Mail, name: 'E-mail de cobrança para a transportadora' },
  { icon: MessageCircle, name: 'Aviso de atraso para o cliente' },
  { icon: TrendingUp, name: 'Relatório semanal para o gestor' },
  { icon: NotebookPen, name: 'Ata de reunião com responsável e prazo' },
  { icon: FileText, name: 'POP: procedimento padrão' },
  { icon: ClipboardCheck, name: 'Revisar a resposta da IA antes de usar' },
];

const pages = [
  { src: '/ebook/v2/pagina-cruzar.webp', w: 720, h: 867, caption: 'Capítulo 4 · Limpar e cruzar planilhas' },
  { src: '/ebook/v2/pagina-atrasados.webp', w: 720, h: 590, caption: 'Capítulo 3 · Pedidos atrasados sem PROCV' },
  { src: '/ebook/v2/pagina-frete.webp', w: 720, h: 902, caption: 'Capítulo 6 · Auditoria de frete e CT-e' },
];

const faq = [
  {
    q: 'Como recebo o PDF?',
    a: 'Logo depois do Pix você vai direto para a página de download. Dá para baixar ou abrir no navegador, no celular ou no computador.',
  },
  {
    q: 'Preciso pagar alguma IA?',
    a: 'Não. Os pedidos funcionam no plano gratuito do Claude, que tem limite de mensagens por período. Também foram testados no ChatGPT, no Gemini e no Copilot.',
  },
  {
    q: 'Funciona com o sistema que eu uso?',
    a: 'Funciona com qualquer WMS, ERP ou TMS que exporte planilha (Excel ou CSV). Você anexa o arquivo exportado e cola o pedido.',
  },
  {
    q: 'Preciso saber programar?',
    a: 'Não. Você copia o pedido, troca o que está entre [colchetes] pelo seu caso e envia. Não tem fórmula nem código.',
  },
  {
    q: 'E se eu não gostar?',
    a: `Me chama no WhatsApp ${WHATSAPP_DISPLAY} em até 7 dias depois da compra e eu devolvo o seu Pix.`,
  },
];

/* Celular com a capa real do PDF. Pequeno de propósito: não pode empurrar o botão. */
function PhoneMockup({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative rounded-[22px] border-[5px] border-[oklch(0.18_0.02_250)] bg-[oklch(0.18_0.02_250)] shadow-[0_18px_40px_-14px_oklch(0.15_0.06_250/0.7)] ${className}`}
    >
      <span className="absolute top-1 left-1/2 z-10 h-1.5 w-8 -translate-x-1/2 rounded-full bg-[oklch(0.18_0.02_250)]" aria-hidden />
      <Image
        src="/ebook/v2/capa.webp"
        alt="Capa do guia Claude no Administrativo Logístico aberta no celular"
        width={300}
        height={425}
        priority
        sizes="120px"
        className="h-auto w-full rounded-[16px]"
      />
    </div>
  );
}

function SafetyLine({ className = '' }: { className?: string }) {
  return (
    <p className={`text-[14px] ${className}`}>
      Pix · PDF na hora · <strong className="font-bold">Garantia de 7 dias</strong>
    </p>
  );
}

/* Antes: as duas exportações como chegam, com os formatos que quebram o PROCV. */
function MessySheet({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-background">
      <p className="border-b border-line bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">{title}</p>
      <table className="w-full font-mono text-[11.5px] leading-tight">
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i === 0 ? 'text-muted' : ''}>
              {r.map((c, k) => (
                <td key={k} className="border-b border-line px-2 py-1.5 whitespace-nowrap">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  return (
    <div className="lp-lock">
      <SalesTracking />
      <Clarity tags={{ page: 'ebook-vendas-v2' }} />
      <UtmPassthrough />

      <main>
        {/* 1. Primeira tela: vende sozinha em 390×844, acima da barra fixa */}
        <section className="lp-sky relative overflow-hidden pb-8 text-background md:pb-20">
          <div className={`relative z-20 ${narrow}`}>
            <div className="flex h-11 items-center md:h-16">
              <span className="text-[20px] font-extrabold tracking-tighter">
                C9<span className="opacity-60">.</span>
              </span>
            </div>

            <h1 className="rise rise-1 mt-1 text-[clamp(1.75rem,7.6vw,3.25rem)] font-extrabold leading-[1.05] tracking-tighter">
              Saia no horário sem passar a tarde no PROCV.{' '}
              {/* O Clarity mostrou metade dos toques aqui (azul-claro parece link): agora é link para o checkout. */}
              <BuyButton
                placement="headline"
                className="text-[var(--lp-moon)] underline decoration-[var(--lp-moon)]/45 decoration-2 underline-offset-[6px]"
              >
                A IA cruza as planilhas da logística por você.
              </BuyButton>
            </h1>
            <p className="rise rise-2 mt-3 text-[17px] leading-snug text-background/90 md:text-lg">
              Guia em PDF com 12 pedidos prontos para copiar e colar.
            </p>

            <div className="rise rise-3 mt-5 flex items-center gap-5">
              <PhoneMockup className="w-[104px] flex-none md:w-[130px]" />
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.06em] text-background/75">Acesso completo</p>
                <p className="text-[2.75rem] font-extrabold leading-none tracking-tighter">{PRICE}</p>
                <ul className="mt-3 grid gap-1 text-[14px] leading-snug text-background/90">
                  {['34 páginas, sem jargão', 'Funciona no ChatGPT, Gemini, Copilot ou Claude', 'Pagamento único no Pix'].map((t) => (
                    <li key={t} className="flex gap-1.5">
                      <Check size={16} strokeWidth={2.5} className="mt-px flex-none" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rise rise-4 mt-6">
              <BuyButton placement="hero" className={`${buyLarge} bg-background text-primary hover:bg-tint`}>
                Quero o guia por {PRICE}
              </BuyButton>
              <SafetyLine className="mt-2.5 text-center text-background/85" />
            </div>

            <a
              href="#dor"
              className="mt-6 flex flex-col items-center gap-0.5 text-[13px] font-semibold text-background/80"
            >
              Veja o que tem dentro
              <ChevronDown size={22} strokeWidth={2} className="animate-bounce" aria-hidden />
            </a>
          </div>
        </section>

        {/* 2. A dor */}
        <section id="dor" className={`bg-background ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>Você conhece esse dia</p>
              <h2 className={h2}>O problema não é você. É o PROCV.</h2>
            </Reveal>
            <ul className="mt-8 grid gap-3">
              {pains.map((p) => (
                <li key={p} className="flex gap-3 rounded-2xl bg-surface p-4 text-[16.5px] leading-snug">
                  <X size={20} strokeWidth={2.25} className="mt-0.5 flex-none text-[oklch(0.55_0.18_25)]" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Antes × depois */}
        <section className={`bg-surface ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>Antes × depois</p>
              <h2 className={h2}>Duas planilhas que não conversam. Uma tabela pronta.</h2>
            </Reveal>

            <p className="mt-8 font-bold">Antes: o que sai do WMS e da transportadora</p>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              <MessySheet
                title="WMS_expedicao.xlsx"
                rows={[
                  ['Pedido', 'NF', 'Peso', 'Data'],
                  ['000123', '031503', '46,0', '08/10/2026'],
                  ['000124', '031504', '38,9', '08/10/2026'],
                  ['000130', '031520', '63,0', '09/10/2026'],
                ]}
              />
              <MessySheet
                title="transportadora.csv"
                rows={[
                  ['pedido', 'nf', 'peso_kg', 'coleta'],
                  ['123', '31503', '58.0', '2026-10-08'],
                  ['124', '31504', '38.9', '2026-10-08'],
                  ['124', '31504', '38.9', '2026-10-08'],
                ]}
              />
            </div>
            <p className="mt-2 text-[14px] text-muted">Zeros à esquerda, vírgula × ponto, datas diferentes. O PROCV não acha nada.</p>

            <div className="my-5 flex justify-center text-primary" aria-hidden>
              <ChevronDown size={28} strokeWidth={2} />
            </div>

            <p className="font-bold">Depois: a resposta real da IA com o pedido 3 do guia</p>
            <figure className="mt-3">
              <Image
                src="/ebook/v2/resultado-cruzamento.webp"
                alt="Resultado real: 18 pedidos batem, 4 diferentes, 3 faltam e 1 duplicado, com cada divergência explicada"
                width={720}
                height={827}
                sizes="(min-width: 768px) 40rem, 100vw"
                className="h-auto w-full rounded-2xl border border-line"
              />
              <figcaption className="mt-2 text-[13.5px] text-muted">
                Resultado real do Claude com as planilhas anexadas · planilhas de exemplo, dados fictícios
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 4. O que tem dentro */}
        <section className={`bg-background ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>O que tem dentro</p>
              <h2 className={h2}>12 pedidos prontos para a rotina do administrativo logístico.</h2>
            </Reveal>
            <ol className="mt-8 grid gap-2">
              {pedidos.map(({ icon: Icon, name }, i) => (
                <li key={name} className="flex items-center gap-3 rounded-xl bg-surface px-3.5 py-3">
                  <span className="w-5 flex-none font-mono text-[13px] text-muted">{i + 1}</span>
                  <Icon size={19} strokeWidth={1.75} className="flex-none text-primary" aria-hidden />
                  <span className="text-[15.5px] font-semibold leading-snug">{name}</span>
                </li>
              ))}
            </ol>

            <p className="mt-10 font-bold">Páginas do guia</p>
            <p className="mt-1 text-[14px] text-muted">Arraste para o lado.</p>
            <div className="-mx-5 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
              {pages.map((p) => (
                <figure key={p.src} className="w-[78%] flex-none snap-start md:w-[46%]">
                  <Image
                    src={p.src}
                    alt={p.caption}
                    width={p.w}
                    height={p.h}
                    sizes="(min-width: 768px) 20rem, 78vw"
                    className="h-auto w-full rounded-xl border border-line"
                  />
                  <figcaption className="mt-2 text-[13.5px] text-muted">{p.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Para quem é / não é */}
        <section className={`bg-surface ${band}`}>
          <div className={narrow}>
            <Reveal>
              <h2 className="text-[1.875rem] font-extrabold leading-[1.08] tracking-tighter md:text-[2.5rem]">Para quem é</h2>
            </Reveal>
            <ul className="mt-5 grid gap-2.5">
              {[
                'Auxiliar, assistente ou analista administrativo de logística',
                'Quem trabalha em CD, armazém, operador logístico ou transportadora',
                'Quem vive em planilha e quer parar de perder tempo com PROCV',
                'Líder que quer padronizar relatórios e conferências do time',
              ].map((t) => (
                <li key={t} className="flex gap-3 leading-snug">
                  <Check size={20} strokeWidth={2.5} className="mt-px flex-none text-[oklch(0.55_0.13_155)]" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <h3 className="mt-10 text-[22px] font-extrabold tracking-tight">Não é para quem</h3>
            <ul className="mt-4 grid gap-2.5">
              {['Procura curso de programação ou automação avançada', 'Quer um sistema pronto que roda sozinho sem conferência'].map((t) => (
                <li key={t} className="flex gap-3 leading-snug text-muted">
                  <X size={20} strokeWidth={2.25} className="mt-px flex-none text-[oklch(0.55_0.18_25)]" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. Quem fez: só prova real (sem depoimento inventado) */}
        <section className={`bg-background ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>Quem fez</p>
              <h2 className={h2}>Feito pela C9 Company, testado na prática.</h2>
            </Reveal>
            <ul className="mt-8 grid gap-3">
              {[
                'Cada capítulo pega uma tarefa real do administrativo logístico e mostra o pedido, o resultado e o que conferir antes de usar.',
                'Os pedidos foram testados no Claude, no ChatGPT, no Gemini e no Copilot.',
                'O resultado acima é uma resposta real do Claude, conferida contra o gabarito das planilhas de exemplo.',
                `Empresa identificada: ${LEGAL_NAME} · ${LEGAL_ID} · ${CITY}.`,
              ].map((t) => (
                <li key={t} className="flex gap-3 leading-relaxed">
                  <ShieldCheck size={20} strokeWidth={1.75} className="mt-0.5 flex-none text-primary" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. Oferta */}
        <section className={`bg-surface ${band}`}>
          <div className={narrow}>
            <div className="overflow-hidden rounded-3xl border-2 border-primary bg-background">
              <div className="bg-primary px-6 py-3 text-center text-[14px] font-bold uppercase tracking-[0.06em] text-background">
                Tudo o que você recebe
              </div>
              <div className="p-6 md:p-8">
                <ul className="grid gap-2.5">
                  {[
                    'Guia em PDF com 34 páginas e 12 capítulos',
                    '12 pedidos prontos para copiar e colar',
                    'Biblioteca de pedidos e plano de 30 dias',
                    'Capítulo de regras de segurança: o que pode e o que não pode ir para a IA',
                    'Acesso imediato depois do Pix',
                  ].map((t) => (
                    <li key={t} className="flex gap-3 leading-snug">
                      <Check size={20} strokeWidth={2.5} className="mt-px flex-none text-primary" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 rounded-2xl bg-tint p-4 text-[15px] leading-relaxed">
                  Se você ganha R$ 3.000 por mês, uma tarde de 4 horas no PROCV custa cerca de{' '}
                  <strong className="font-bold">R$ 68 do seu tempo</strong>. O guia custa menos que uma hora disso.
                </div>
                <div className="mt-7 text-center">
                  <p className="text-[13px] font-bold uppercase tracking-[0.06em] text-muted">Pagamento único</p>
                  <p className="text-[3.25rem] font-extrabold leading-none tracking-tighter text-ink">{PRICE}</p>
                  <BuyButton placement="offer" className={`${buyLarge} mt-6 bg-primary text-background [--pulse:var(--primary)] hover:bg-primary-hover`}>
                    Quero o guia por {PRICE}
                  </BuyButton>
                  <SafetyLine className="mt-3 text-muted" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Garantia */}
        <section className={`bg-background ${band}`}>
          <div className={`${narrow} flex flex-col items-center text-center`}>
            <div className="flex size-28 flex-col items-center justify-center rounded-full border-4 border-double border-primary text-primary">
              <span className="text-[2.25rem] font-extrabold leading-none">7</span>
              <span className="text-[12px] font-bold uppercase tracking-[0.08em]">dias de</span>
              <span className="text-[12px] font-bold uppercase tracking-[0.08em]">garantia</span>
            </div>
            <h2 className="mt-6 text-[1.75rem] font-extrabold leading-[1.1] tracking-tighter md:text-[2.25rem]">
              Garantia de 7 dias
            </h2>
            <p className="mt-3 max-w-[34ch] text-lg leading-relaxed text-muted">
              Se o guia não te ajudar, me chama no WhatsApp em até 7 dias e devolvo o seu Pix.
            </p>
            <a href={whatsapp} className="mt-4 font-bold text-primary underline underline-offset-4">
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className={`bg-surface ${band}`}>
          <div className={narrow}>
            <h2 className="text-[1.875rem] font-extrabold leading-[1.08] tracking-tighter md:text-[2.5rem]">Perguntas frequentes</h2>
            <div className="mt-6 grid gap-2.5">
              {faq.map(({ q, a }, i) => (
                <details key={q} open={i === 0} className="group rounded-2xl bg-background px-5">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                    {q}
                    <ChevronDown size={20} strokeWidth={1.75} className="flex-none text-muted transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="pb-5 leading-relaxed text-muted">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Chamada final */}
        <section className="lp-close relative overflow-hidden py-16 text-background md:py-24">
          <div className={`relative z-20 ${narrow} text-center`}>
            <h2 className="text-[2.25rem] font-extrabold leading-[1.05] tracking-tighter md:text-[3rem]">
              Hoje você ainda sai no horário.
            </h2>
            <p className="mt-3 text-lg text-background/85">12 pedidos prontos para nunca mais passar a tarde no PROCV.</p>
            <div className="mx-auto mt-8 max-w-md">
              <BuyButton placement="closing" className={`${buyLarge} bg-background text-primary hover:bg-tint`}>
                Quero o guia por {PRICE}
              </BuyButton>
              <SafetyLine className="mt-3 text-background/85" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-deep pt-8 pb-28 text-center text-[13px] text-background/60 md:pb-8">
        <nav className="flex justify-center gap-6">
          <Link href="/termos" className="underline underline-offset-4 hover:text-background">
            Termos de uso
          </Link>
          <Link href="/privacidade" className="underline underline-offset-4 hover:text-background">
            Privacidade
          </Link>
        </nav>
        <p className="mt-3">
          {LEGAL_NAME} · {LEGAL_ID}
        </p>
      </footer>

      <StickyBar />
    </div>
  );
}
