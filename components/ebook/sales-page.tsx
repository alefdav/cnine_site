import Image from 'next/image';
import {
  AlarmClock,
  BookOpenCheck,
  Building2,
  Landmark,
  ChevronDown,
  ClipboardCheck,
  FileSpreadsheet,
  FileText,
  GitCompareArrows,
  Mail,
  MessageCircle,
  NotebookPen,
  Paperclip,
  Receipt,
  ShieldCheck,
  Sunrise,
  Truck,
  TrendingUp,
  Warehouse,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CITY, LEGAL_ID, LEGAL_NAME, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/lib/content';
import { Reveal } from '@/components/reveal';
import { BuyButton } from '@/components/ebook/buy-button';
import { CopyBox } from '@/components/ebook/copy-box';
import { SalesTracking } from '@/components/ebook/sales-tracking';
import { StickyBuy } from '@/components/ebook/sticky-buy';
import {
  ExitIntent,
  InteractiveCross,
  PurchaseToasts,
  SavingsCalculator,
  ScrollProgress,
} from '@/components/ebook/teste/boosters';

/*
  Variantes de teste ligadas por ?v= na própria URL (urgência e dopamina
  exageradas). Sem o parâmetro, a página é a de verdade. Todo evento do
  pixel leva `test_variant` para separar o que cada testador fez.
*/
export type SalesVariant = 'urgencia' | 'dopamina' | 'combo';

export function parseVariant(v: string | string[] | undefined): SalesVariant | undefined {
  const value = Array.isArray(v) ? v[0] : v;
  return value === 'urgencia' || value === 'dopamina' || value === 'combo' ? value : undefined;
}

const wrap = 'mx-auto max-w-6xl px-5 md:px-8';
const narrow = 'mx-auto max-w-[44rem] px-5 md:px-8';
const band = 'py-16 md:py-24';
const eyebrow = 'font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-primary';
const h2 = 'mt-3 text-[2rem] font-extrabold leading-[1.06] tracking-tighter md:text-[2.625rem]';
const lede = 'mt-4 text-lg leading-relaxed text-muted';
const buyLarge =
  'buy-pulse flex h-14 w-full items-center justify-center rounded-full px-8 text-[17px] font-bold transition-colors active:translate-y-px sm:w-auto';

const PRICE = 'R$ 17,90';

const SAMPLE = `Trabalho no administrativo de um centro de distribuição.
Anexei a exportação de pedidos do WMS de hoje.
Liste os pedidos atrasados.
Considere atrasado o pedido cuja Data_Prometida é anterior a hoje
e cujo Status não é "Entregue" nem "Cancelado".
Monte uma tabela agrupada por transportadora, do maior para o menor atraso.
Não altere os dados originais.`;

const PEDIDO_3 = `Cruze WMS_expedicao_outubro e RapidoSul_coletas_outubro por Pedido.
Antes, mostre as diferenças de formato e como vai tratar.
Mantenha os originais. Separe em: batem, diferentes, só na 1, só na 2.
Marque duplicidades sem apagar.`;

const steps = [
  {
    title: 'Abra o Claude',
    body: 'Crie a conta grátis com seu e-mail, em uns 2 minutos. Se você já usa ChatGPT, Gemini ou Copilot, pode usar a que tem.',
  },
  {
    title: 'Anexe as planilhas',
    body: 'A do WMS e a da transportadora, do jeito que saem do sistema. Anexe o arquivo: não cole o texto.',
  },
  {
    title: 'Cole o pedido do guia',
    body: 'Troque o que está entre [colchetes] pelo seu caso e envie. A tabela volta pronta para conferir.',
  },
];

const pedidos: { icon: LucideIcon; name: string; result: string }[] = [
  { icon: Sunrise, name: 'Briefing da manhã', result: 'Só o que exige ação hoje, por prioridade, com responsável e prazo' },
  { icon: AlarmClock, name: 'Pedidos atrasados', result: 'Atrasos por faixa de dias e por transportadora, com quantidade e valor' },
  { icon: GitCompareArrows, name: 'Cruzar duas planilhas', result: 'O que bate, o que está diferente, o que falta e as duplicidades' },
  { icon: Warehouse, name: 'Inventário', result: 'Divergência e impacto em R$ por SKU, do maior para o menor' },
  { icon: Receipt, name: 'Auditoria de frete', result: 'Só os CT-es com diferença, com o motivo provável e a evidência' },
  { icon: Truck, name: 'Ocorrência de entrega', result: 'Linha do tempo da NF: o que está comprovado e o que falta' },
  { icon: Mail, name: 'Cobrança de transportadora', result: 'E-mail firme e educado, já com assunto' },
  { icon: MessageCircle, name: 'Aviso ao cliente', result: 'Mensagem clara, sem culpar ninguém e sem prometer o que não pode' },
  { icon: TrendingUp, name: 'Relatório semanal', result: 'Semana atual × anterior × média de 4 semanas, fato separado de hipótese' },
  { icon: NotebookPen, name: 'Ata de reunião', result: 'Decisão, ação, responsável e prazo, mais o que ficou sem decisão' },
  { icon: FileText, name: 'POP', result: 'Procedimento com exceções, registros e controle de versão' },
  { icon: ClipboardCheck, name: 'Revisar a própria resposta', result: 'Confere as contas e aponta o que você deve verificar antes de usar' },
];

const chapters = [
  'Primeiros passos: como pedir bem',
  'O briefing da manhã',
  'Pedidos atrasados sem PROCV',
  'Planilhas sem dor: limpar e cruzar',
  'Inventário: físico x sistema',
  'Auditoria de frete e CT-e',
  'Ocorrências: entender o que aconteceu',
  'E-mails e mensagens em segundos',
  'Indicadores e relatório semanal',
  'Atas, POPs e treinamento',
  'Rotinas que rodam sozinhas',
  'Regras de segurança',
];

const faq = [
  {
    q: 'Já uso o ChatGPT de graça. Por que pagar?',
    a: 'Você não paga pela IA, paga pelos pedidos prontos para a logística: as regras de cruzamento, as colunas e os formatos de saída. Eles foram testados no ChatGPT também.',
  },
  {
    q: 'Nunca usei IA. Vou conseguir?',
    a: 'Sim. O primeiro capítulo ensina a pedir bem, e cada pedido vem pronto: você só troca o que está entre [colchetes].',
  },
  {
    q: 'Preciso pagar o Claude?',
    a: 'Não. Os pedidos funcionam no plano gratuito do Claude, que tem limite de mensagens por período.',
  },
  {
    q: 'Minha empresa usa Copilot ou Gemini. Serve?',
    a: 'Serve. Os pedidos foram testados no Claude, no ChatGPT, no Gemini e no Copilot.',
  },
  {
    q: 'Posso usar com as planilhas da empresa?',
    a: 'Sim, com os cuidados do capítulo de segurança: anonimize nomes, CNPJs e valores antes de anexar, e siga a política da sua empresa.',
  },
  {
    q: 'Colo a planilha ou anexo?',
    a: 'Anexe o arquivo. Assim a IA calcula com precisão. Colar o texto da planilha aumenta a chance de erro de conta.',
  },
  {
    q: 'Como recebo o guia?',
    a: 'Logo depois do Pix você vai direto para a página de download do PDF. Dá para baixar ou abrir no navegador.',
  },
  {
    q: 'Funciona no celular?',
    a: 'O PDF abre no celular. Para cruzar planilhas, o computador é mais confortável.',
  },
];

const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Olá! Tenho uma dúvida sobre o guia Claude no ADM Logístico.',
)}`;

function Grain() {
  return (
    <svg className="grain-layer pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      <filter id="ebook-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#ebook-grain)" />
    </svg>
  );
}

function HeroAnimation() {
  return (
    <div
      className="hero-anim"
      role="img"
      aria-label="Duas planilhas viram uma tabela: pedidos que batem em verde, diferentes em laranja e faltando em vermelho"
    >
      <div className="sheet s1">
        <b>WMS</b>
        <i /><i /><i /><i /><i />
      </div>
      <div className="sheet s2">
        <b>Transportadora</b>
        <i /><i /><i /><i /><i />
      </div>
      <div className="result">
        <div className="row head"><span>Pedido</span><span>NF</span><span>Resultado</span></div>
        <div className="row ok"><span>PV-48210</span><span>31500</span><span>✔ bate</span></div>
        <div className="row dif"><span>PV-48213</span><span>31503</span><span>⚠ peso +12 kg</span></div>
        <div className="row ok"><span>PV-48214</span><span>31504</span><span>✔ bate</span></div>
        <div className="row dif"><span>PV-48224</span><span>31514</span><span>⚠ volumes 2 → 4</span></div>
        <div className="row falta"><span>PV-48230</span><span>31520</span><span>✖ sem coleta</span></div>
      </div>
    </div>
  );
}

function ProofShot({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 40rem, 100vw"
        className="h-auto w-full rounded-2xl border border-line"
      />
      <figcaption className="mt-3 text-sm text-muted">Resultado real do Claude · planilhas de exemplo, dados fictícios</figcaption>
    </figure>
  );
}

/* Bloco de confiança junto do botão: responde "Pix é seguro?" e "quem está vendendo". */
function TrustBlock({ className = '' }: { className?: string }) {
  const items: { icon: LucideIcon; text: React.ReactNode }[] = [
    { icon: Landmark, text: <>Pix processado pela AbacatePay · PDF liberado na hora</> },
    { icon: Building2, text: <>{LEGAL_NAME} · {LEGAL_ID}</> },
  ];
  return (
    <ul className={`grid gap-2 rounded-2xl bg-background/12 p-4 text-left text-[14.5px] leading-snug ${className}`}>
      {items.map(({ icon: Icon, text }, i) => (
        <li key={i} className="flex gap-2.5">
          <Icon size={17} strokeWidth={1.75} className="mt-px flex-none" aria-hidden />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

export function SalesPage({ variant }: { variant?: SalesVariant }) {
  const urgency = variant === 'urgencia' || variant === 'combo';
  const dopamine = variant === 'dopamina' || variant === 'combo';

  return (
    <div className="lp-lock">
      <SalesTracking variant={variant} />
      {dopamine && <ScrollProgress />}
      <main>
        {/* 0. Primeira tela */}
        <section className="lp-sky relative overflow-hidden pb-14 text-background md:pb-24">
          <Grain />
          <div className={`relative z-20 ${wrap}`}>
            <div className="flex h-14 items-center md:h-[72px]">
              <span className="text-[22px] font-extrabold tracking-tighter">
                C9<span className="opacity-60">.</span>
              </span>
            </div>

            <div className="grid gap-6 pt-2 md:gap-9 md:pt-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
              <div>
                <span className="rise inline-flex h-[30px] items-center gap-2 rounded-full bg-background/12 px-3.5 text-[13.5px] font-bold">
                  <FileSpreadsheet size={15} strokeWidth={2} aria-hidden />
                  Guia em PDF · 34 páginas
                </span>
                <h1 className="rise rise-1 mt-4 text-[clamp(2rem,7.4vw,3.75rem)] font-extrabold leading-[1.04] tracking-tighter">
                  Cruze a planilha do WMS com a da transportadora{' '}
                  <span className="text-[var(--lp-moon)]">em 2 minutos, sem PROCV</span>
                </h1>
                <p className="rise rise-2 mt-4 max-w-[40ch] text-lg leading-relaxed text-background/85 md:text-[19px]">
                  12 pedidos prontos para copiar e colar{' '}
                  <strong className="font-bold text-background">no ChatGPT, Gemini, Copilot ou Claude que você já usa.</strong>{' '}
                  Funciona mesmo se você nunca usou IA.
                </p>
              </div>

              <div className="rise rise-3 lg:row-span-2">
                <HeroAnimation />
              </div>

              <div className="rise rise-4">
                <BuyButton
                  id="hero-buy"
                  variant={variant}
                  placement="hero"
                  className={`${buyLarge} bg-background text-primary hover:bg-tint`}
                >
                  Quero o guia por {PRICE}
                </BuyButton>
                <TrustBlock className="mt-4" />
              </div>
            </div>
          </div>
        </section>

        {/* 1. Dá para usar sem saber IA */}
        <section className={`bg-background ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>Sem curso, sem jargão</p>
              <h2 className={h2}>Você não precisa saber IA. Precisa saber o que pedir.</h2>
            </Reveal>
            <ol className="mt-10 border-t border-line">
              {steps.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2.75rem_1fr] gap-x-3 border-b border-line py-6">
                  <span className="pt-1 font-mono text-[15px] font-medium text-primary">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-[21px] font-extrabold tracking-tight">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex gap-3 rounded-2xl bg-tint p-5">
              <Paperclip size={22} strokeWidth={1.75} className="mt-0.5 flex-none text-primary" aria-hidden />
              <p className="leading-relaxed">
                <strong className="font-bold">Anexe a planilha em vez de colar o texto.</strong> Com o arquivo anexado, a IA
                calcula de verdade. Com o texto colado, ela pode errar contas.
              </p>
            </div>
            <p className="mt-5 text-sm text-muted">
              Os pedidos funcionam no plano gratuito do Claude, que tem limite de mensagens por período.
            </p>
          </div>
        </section>

        {/* 2. Prova real, logo depois dos 3 passos */}
        <section className={`bg-surface ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>Resultado real</p>
              <h2 className={h2}>O pedido 3 do guia, feito de verdade.</h2>
              <p className={lede}>Duas planilhas de exemplo anexadas no Claude e o pedido do guia. Esta foi a resposta.</p>
            </Reveal>

            {dopamine && (
              <div className="mt-10">
                <InteractiveCross variant={variant} />
              </div>
            )}

            <div className="mt-10 rounded-2xl border border-dashed border-line bg-background p-5">
              <p className="font-mono text-[12.5px] uppercase tracking-[0.08em] text-muted">O pedido</p>
              <p className="mt-2 whitespace-pre-line font-mono text-[14.5px] leading-relaxed">{PEDIDO_3}</p>
            </div>
            <div className="my-3 flex justify-center text-muted" aria-hidden>
              <ChevronDown size={22} strokeWidth={1.75} />
            </div>
            <ProofShot
              src="/ebook/pedido-3-cruzamento.png"
              alt="Resultado do pedido 3: 18 pedidos batem, 4 diferentes, 3 faltam e 1 duplicado, com a lista de cada divergência"
              width={1080}
              height={1241}
            />

            <div className="mt-14">
              <h3 className="text-[22px] font-extrabold tracking-tight">E o pedido 2: os atrasados por transportadora.</h3>
              <div className="mt-5">
                <ProofShot
                  src="/ebook/pedido-2-atrasados.png"
                  alt="Resultado do pedido 2: 8 atrasados de 30, R$ 12.459,93 parados, a Rapido Sul com 55% do valor"
                  width={1080}
                  height={1034}
                />
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-[26px] font-extrabold leading-tight tracking-tighter">Teste um pedido agora, de graça.</h3>
              <p className="mt-2 leading-relaxed text-muted">
                Este é 1 dos pedidos do guia. Teste agora na IA que você usa.
              </p>
              <div className="mt-5">
                <CopyBox text={SAMPLE} celebrate={dopamine} />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Serve para a sua rotina */}
        <section className={`bg-background ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>O que tem dentro</p>
              <h2 className={h2}>Os 12 pedidos cobrem a rotina do administrativo logístico.</h2>
            </Reveal>
            <ul className="mt-10 grid gap-2.5">
              {pedidos.map(({ icon: Icon, name, result }, i) => (
                <li key={name} className="flex gap-4 rounded-2xl bg-background p-4">
                  <span className="flex size-10 flex-none items-center justify-center rounded-full bg-tint text-primary">
                    <Icon size={19} strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold">
                      <span className="mr-1.5 font-mono text-[13px] font-medium text-muted">{i + 1}</span>
                      {name}
                    </h3>
                    <p className="mt-0.5 text-[15px] leading-snug text-muted">{result}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-line bg-background p-6">
              <h3 className="text-[19px] font-extrabold tracking-tight">E se eu já uso ChatGPT, Gemini ou Copilot?</h3>
              <p className="mt-2 leading-relaxed text-muted">
                <strong className="font-bold text-ink">
                  Os pedidos foram testados no Claude, no ChatGPT, no Gemini e no Copilot.
                </strong>{' '}
                O valor do guia está nos pedidos montados para a logística: as regras de cruzamento, as colunas e os formatos
                de saída. Se a sua empresa já libera o Copilot ou o Gemini, use com ele.
              </p>
            </div>

            <details className="group mt-4 rounded-2xl border border-line bg-background">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 font-bold [&::-webkit-details-marker]:hidden">
                Ver os 12 capítulos
                <ChevronDown size={20} strokeWidth={1.75} className="flex-none transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <ol className="px-6 pb-5">
                {chapters.map((c, i) => (
                  <li key={c} className="flex gap-3 border-t border-line py-2.5 text-[15px]">
                    <span className="w-6 flex-none font-mono text-muted">{i + 1}</span>
                    {c}
                  </li>
                ))}
              </ol>
            </details>

            {dopamine && (
              <div className="mt-8">
                <SavingsCalculator variant={variant} />
              </div>
            )}

            <p className="mt-6 text-[15px] text-muted">
              Não é curso de programação nem de automação. É para quem vive em planilha e quer sair no horário.
            </p>
          </div>
        </section>

        {/* 4. Por que confiar */}
        <section className={`bg-surface ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>Por que confiar</p>
              <h2 className={h2}>Feito para o administrativo logístico, e você vê antes de comprar.</h2>
            </Reveal>
            <ul className="mt-10 grid gap-3">
              {[
                {
                  icon: BookOpenCheck,
                  title: 'Um método, não uma lista de dicas',
                  body: 'Cada capítulo pega uma tarefa real e mostra o pedido, o resultado e o que conferir antes de usar.',
                },
                {
                  icon: ClipboardCheck,
                  title: 'Testado em 4 IAs',
                  body: 'Claude, ChatGPT, Gemini e Copilot. Os prints acima são respostas reais do Claude, conferidas contra o gabarito.',
                },
                {
                  icon: Building2,
                  title: 'Empresa identificada',
                  body: `${LEGAL_NAME} · ${LEGAL_ID}. Suporte pelo WhatsApp ${WHATSAPP_DISPLAY}.`,
                },
              ].map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-4 rounded-2xl bg-background p-5">
                  <span className="flex size-10 flex-none items-center justify-center rounded-full bg-tint text-primary">
                    <Icon size={19} strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Pagamento */}
        <section className={`bg-background ${band}`}>
          <div className={narrow}>
            <h2 className="text-[1.875rem] font-extrabold leading-[1.08] tracking-tighter md:text-[2.25rem]">
              Como funciona o pagamento
            </h2>
            <ol className="mt-4 grid gap-3">
              {[
                'Clique no botão e confira o guia e o preço.',
                'Gere o QR Code ou copie o código Pix e pague no app do seu banco.',
                'Assim que o Pix cai, você vai direto para a página de download do PDF.',
              ].map((item, i) => (
                <li key={item} className="grid grid-cols-[2.25rem_1fr] gap-2 leading-relaxed">
                  <span className="font-mono text-[15px] font-medium text-primary">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm text-muted">Pagamento só por Pix, processado pela AbacatePay.</p>
          </div>
        </section>

        {/* 6. Segurança de dados */}
        <section className={`bg-surface ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>Dados da empresa</p>
              <h2 className={h2}>Use sem expor dado de cliente.</h2>
            </Reveal>
            <ul className="mt-8 grid gap-4">
              {[
                'O guia ensina a anonimizar: trocar nome de cliente, CNPJ e valores por códigos antes de anexar.',
                'Você pode testar qualquer pedido primeiro com uma planilha fictícia.',
                'Um capítulo inteiro de regras de segurança: o que pode ir para a IA e o que nunca deve ir.',
              ].map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <ShieldCheck size={20} strokeWidth={1.75} className="mt-0.5 flex-none text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. Perguntas frequentes */}
        <section className={`bg-background ${band}`}>
          <div className={narrow}>
            <h2 className="text-[2rem] font-extrabold leading-[1.06] tracking-tighter md:text-[2.625rem]">Perguntas frequentes</h2>
            <div className="mt-8 border-t border-line">
              {faq.map(({ q, a }) => (
                <details key={q} className="group border-b border-line">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                    {q}
                    <ChevronDown size={20} strokeWidth={1.75} className="flex-none text-muted transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="pb-5 leading-relaxed text-muted">{a}</p>
                </details>
              ))}
            </div>
            <p className="mt-6 text-[15px] text-muted">
              Outra dúvida?{' '}
              <a href={whatsapp} className="font-bold text-primary underline underline-offset-4">
                Fale no WhatsApp
              </a>
              .
            </p>
          </div>
        </section>

        {/* 8. Fechamento */}
        <section id="closing" className="lp-close relative overflow-hidden py-20 text-background md:py-28">
          <Grain />
          <div className={`relative z-20 ${narrow} text-center`}>
            <h2 className="text-[2.375rem] font-extrabold leading-[1.04] tracking-tighter md:text-[3.25rem]">
              Saia no horário sem PROCV.
            </h2>
            <p className="mt-4 font-mono text-[15px] text-background/85">34 páginas · 12 pedidos prontos · acesso imediato</p>
            <p className="mt-8 text-[3rem] font-extrabold leading-none tracking-tighter">{PRICE}</p>
            <div className="mt-8 flex flex-col items-center">
              <BuyButton variant={variant} placement="closing" className={`${buyLarge} bg-background text-primary hover:bg-tint`}>
                Quero o guia por {PRICE}
              </BuyButton>
              <TrustBlock className="mt-5 w-full max-w-md" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-deep pt-10 pb-28 text-sm text-background/60 md:pb-10">
        <div className={`${wrap} flex flex-col gap-3 md:flex-row md:items-center md:justify-between`}>
          <span className="text-xl font-extrabold tracking-tighter text-background">
            C9<span className="opacity-60">.</span>
          </span>
          <p>Claude é marca da Anthropic; guia independente.</p>
          <p>
            {LEGAL_NAME} · {LEGAL_ID} · {CITY} · WhatsApp {WHATSAPP_DISPLAY}
          </p>
        </div>
      </footer>

      <StickyBuy heroId="hero-buy" closingId="closing" variant={variant} />
      {urgency && <PurchaseToasts />}
      {urgency && <ExitIntent variant={variant} />}
    </div>
  );
}
