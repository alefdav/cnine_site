import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AlertTriangle, Check, ChevronDown, FileText, Landmark, ShieldCheck, X } from 'lucide-react';
import { LEGAL_ID, LEGAL_NAME, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/lib/content';
import { EBOOK_PARAGUAI } from '@/lib/meta-pixel';
import { EBOOK_PARAGUAI_LIVE, EBOOK_PARAGUAI_PRODUCT as P } from '@/lib/ebook-paraguai';
import { Reveal } from '@/components/reveal';
import { Clarity } from '@/components/clarity';
import { SalesTracking } from '@/components/ebook/sales-tracking';
import { BuyTrigger } from '@/components/ebook/paraguai/buy-trigger';
import { PixCheckout } from '@/components/ebook/paraguai/pix-checkout';

/*
  Página de vendas do ebook "Paraguai ou Uruguai?" (spec:
  docs/superpowers/specs/2026-10-26-ebook-paraguai-pagina-de-vendas-design.md).

  Diagnóstico Schwartz: consciência 3 (busca "como", "quanto custa", "o que
  precisa"), sofisticação 4 (todo mundo já diz "é fácil, só com RG").
  Mecanismo: cada valor com data e fonte oficial, conferido depois do
  reajuste de 1º/7/2026, e os prazos que fazem o brasileiro perder o direito.
  Todo número sai de entregas/ebook-paraguai/dossie.md.

  O Pix é gerado aqui mesmo (checkout transparente): os botões abrem a
  janela do PixCheckout.
*/

const TITLE = 'Como morar no Paraguai em 2026 usando o seu RG, sem passaporte';
const DESCRIPTION =
  'Passo a passo da residência Mercosul, custo de vida em Assunção e comparativo com o Uruguai. Valores de outubro de 2026. R$ 17,90 no Pix.';

export const metadata: Metadata = {
  title: { absolute: 'Como morar no Paraguai em 2026 | Guia em PDF' },
  description: DESCRIPTION,
  alternates: { canonical: '/morar-no-paraguai' },
  robots: EBOOK_PARAGUAI_LIVE ? undefined : { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/morar-no-paraguai',
    siteName: 'C9 Company',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/ebook-paraguai/capa.webp', width: 600, height: 852 }],
  },
};

const narrow = 'mx-auto max-w-[44rem] px-5 md:px-8';
const band = 'py-14 md:py-24';
const eyebrow = 'font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-primary';
const h2 = 'mt-3 text-[1.875rem] font-extrabold leading-[1.08] tracking-tighter md:text-[2.5rem]';
const buyLarge =
  'buy-pulse flex h-14 w-full items-center justify-center whitespace-nowrap rounded-full bg-accent px-5 text-[17px] font-bold text-accent-ink [--pulse:var(--accent)] transition-colors hover:bg-accent/90 active:translate-y-px';

const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Olá! Comprei o guia Paraguai ou Uruguai? e quero pedir a devolução. O código da compra é: ',
)}`;

/* Os erros que custam caro: cada um sai de um fato do dossiê, com a fonte. */
const mistakes = [
  {
    title: 'Pagar pela tabela velha.',
    body: 'Desde 1º de julho de 2026 a residência temporária custa Gs. 2.341.540 (≈ R$ 2.040). Muita página ainda mostra Gs. 2.230.040, o valor de antes do reajuste.',
  },
  {
    title: 'Ser barrado no embarque.',
    body: 'O RG não vence, mas companhia aérea e fronteira recusam com frequência RG com mais de 10 anos de emissão.',
  },
  {
    title: 'Perder o direito ao acordo.',
    body: 'A residência temporária vale 2 anos e não é prorrogada. A permanente só pode ser pedida nos 90 dias antes do vencimento. Passou do prazo, você sai do acordo e cai na lei geral.',
  },
  {
    title: 'Comprar terra que a lei anula.',
    body: 'Brasileiro não pode ser dono de imóvel rural a menos de 50 km da fronteira paraguaia (Lei 2532/2005). O negócio é nulo.',
  },
  {
    title: 'Pagar imposto em dois países.',
    body: 'Sem a Comunicação e a Declaração de Saída Definitiva na Receita Federal, você continua residente fiscal no Brasil.',
  },
];

const costs = [
  { item: 'Residência temporária Mercosul (uma vez)', value: 'R$ 2.040', note: 'Gs. 2.341.540', source: 'Migraciones, Res. 478/2026' },
  { item: 'Aluguel de 1 quarto fora do centro', value: 'R$ 1.920', source: 'Numbeo, out/2026' },
  { item: 'Aluguel de 1 quarto no centro', value: 'R$ 3.170', source: 'Numbeo, out/2026' },
  { item: 'Gasto de uma pessoa por mês, sem aluguel', value: 'R$ 3.040', source: 'Numbeo, out/2026' },
  { item: 'Salário mínimo', value: 'R$ 2.650', note: 'Gs. 3.044.000', source: 'Decreto 6225/2026' },
];

const steps = [
  'No Brasil: certidão de nascimento (e de casamento, se houver) e antecedentes criminais, tudo apostilado em cartório.',
  'Entre no Paraguai com RG de menos de 10 anos ou CIN e guarde o comprovante de entrada.',
  'Em Assunção, tire o antecedentes para estrangeiros na Polícia Nacional.',
  'Dê entrada na Dirección Nacional de Migraciones e pague a taxa.',
  'Receba o carnê de residência temporária, válido por 2 anos.',
  'Entre o 21º e o 24º mês, peça a permanente e a cédula paraguaia.',
];

const compare = [
  { label: 'Residência para brasileiro', py: 'temporária de 2 anos, depois permanente', uy: 'permanente direto' },
  { label: 'Custo da residência', py: '≈ R$ 4.580 no total', uy: 'isenta' },
  { label: 'Apostila dos documentos', py: 'obrigatória', uy: 'dispensada' },
  { label: 'Gasto de 1 pessoa, sem aluguel', py: '≈ R$ 3.040', uy: '≈ R$ 4.890' },
  { label: 'Imposto sobre renda do exterior', py: '0% (sistema territorial)*', uy: '12% para novos residentes' },
];

/* Sumário real do PDF (página 4). */
const chapters = [
  'Paraguai ou Uruguai? Descubra qual combina com você',
  'Preciso de passaporte? RG, CIN e regras de entrada',
  'Residência no Paraguai, passo a passo',
  'Residência no Uruguai, passo a passo',
  'Impostos: Brasil, Paraguai e Uruguai',
  'Quanto custa morar no Paraguai',
  'Quanto custa morar no Uruguai',
  'Aluguel e casas: como alugar e como comprar',
  'Emprego, renda e empresa própria',
  'Saúde',
  'Escola, idioma, clima e jeito de viver',
  'Segurança: morar lá é bom mesmo?',
  'Banco, câmbio e envio de dinheiro',
  'Como ir: avião, ônibus, carro, mudança e pets',
  'Checklist dos 90 dias e erros que custam caro',
  'Perguntas rápidas',
];

const pages = [
  { src: '/ebook-paraguai/pagina-residencia.webp', caption: 'Capítulo 3 · Residência no Paraguai, passo a passo' },
  { src: '/ebook-paraguai/pagina-custos.webp', caption: 'Capítulo 6 · Quanto custa morar no Paraguai' },
  { src: '/ebook-paraguai/pagina-checklist.webp', caption: 'Capítulo 15 · Checklist dos 90 dias' },
];

const sources = [
  'Dirección Nacional de Migraciones do Paraguai',
  'gub.uy (governo do Uruguai)',
  'Receita Federal',
  'Banco Central do Brasil',
  'Ministério do Trabalho do Uruguai',
  'INE do Paraguai',
];

const faq = [
  {
    q: 'Tem muita coisa de graça no Google. Por que pagar?',
    a: 'Tem, espalhado e muitas vezes desatualizado: a taxa de residência mudou em 1º de julho e muita página ainda mostra o valor antigo. O guia junta o caminho inteiro, com data e fonte em cada número.',
  },
  {
    q: 'Preciso de passaporte?',
    a: 'Não. Para entrar e para pedir a residência basta o RG com menos de 10 anos de emissão ou a CIN. O passaporte ajuda em banco e em voo com conexão fora do Mercosul.',
  },
  {
    q: 'O guia fala do Uruguai também?',
    a: 'Sim: residência, custo de vida, impostos, aluguel e um comparativo lado a lado com o Paraguai.',
  },
  {
    q: 'E se a lei ou a taxa mudar?',
    a: 'Este é o guia de outubro de 2026 e cada valor mostra a data. Antes de pagar qualquer taxa, confira no órgão oficial; o guia diz onde.',
  },
  {
    q: 'Isso é consultoria?',
    a: 'Não. É um guia de pesquisa. Para impostos e compra de imóvel, o guia indica quando falar com um contador ou escrivão local.',
  },
  {
    q: 'Como recebo?',
    a: 'Assim que o Pix é confirmado, a própria página abre o download do PDF. Sem cadastro e sem sair daqui.',
  },
  {
    q: 'E se eu não gostar?',
    a: `Você tem 7 dias para pedir o dinheiro de volta. Chame no WhatsApp ${WHATSAPP_DISPLAY} com o código da compra e o valor volta pelo Pix.`,
  },
];

function SafetyLine({ className = '' }: { className?: string }) {
  return (
    <p className={`text-[14px] ${className}`}>
      Pix · PDF na hora · <strong className="font-bold">7 dias para pedir o dinheiro de volta</strong>
    </p>
  );
}

function Cover({ className = '', sizes }: { className?: string; sizes: string }) {
  return (
    <Image
      src="/ebook-paraguai/capa.webp"
      alt={`Capa do guia ${P.name}`}
      width={600}
      height={852}
      priority
      sizes={sizes}
      className={`h-auto rounded-md shadow-[0_18px_40px_-12px_oklch(0.1_0.05_262/0.8)] ${className}`}
    />
  );
}

export default function Page() {
  return (
    <div className="lp-paraguai">
      {EBOOK_PARAGUAI_LIVE && <SalesTracking product={EBOOK_PARAGUAI} />}
      <Clarity tags={{ page: 'ebook-paraguai' }} />

      {!EBOOK_PARAGUAI_LIVE && (
        <p className="bg-[oklch(0.55_0.18_25)] px-4 py-2 text-center text-[13px] font-bold text-white">
          Rascunho: página fora do ar (noindex, sem eventos de compra no pixel).
        </p>
      )}

      <main>
        {/* 0. Primeira tela: vende sozinha a 390 px, acima da barra fixa */}
        <section className="pg-hero relative overflow-hidden pb-8 text-background md:pb-20">
          <div className={narrow}>
            <div className="flex h-11 items-center justify-between md:h-16">
              <span className="text-[20px] font-extrabold tracking-tighter">
                C9<span className="opacity-60">.</span>
              </span>
              <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-background/70">Edição out/2026</span>
            </div>

            <p className="rise mt-2 font-mono text-[12.5px] uppercase tracking-[0.08em] text-accent">Guia em PDF · {P.pages} páginas</p>
            <h1 className="rise rise-1 mt-2 text-[clamp(1.85rem,8vw,3.25rem)] font-extrabold leading-[1.04] tracking-tighter">
              Como morar no Paraguai em 2026 usando o seu RG, <span className="text-accent">sem passaporte</span>
            </h1>
            <p className="rise rise-2 mt-3 text-[16.5px] leading-snug text-background/85 md:text-lg">
              O passo a passo da residência, quanto custa viver em Assunção e os prazos que fazem brasileiro perder dinheiro.
              Com comparativo do Uruguai.
            </p>

            <div className="rise rise-3 mt-5 flex items-center gap-5">
              <Cover className="w-[92px] flex-none md:w-[130px]" sizes="(min-width: 768px) 130px, 92px" />
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.06em] text-background/70">Pagamento único</p>
                <p className="text-[2.6rem] font-extrabold leading-none tracking-tighter">{P.priceLabel}</p>
                <p className="mt-2 flex items-center gap-1.5 text-[13.5px] leading-snug text-background/85">
                  <ShieldCheck size={16} strokeWidth={2} className="flex-none text-accent" aria-hidden />
                  Valores conferidos em fontes oficiais em outubro de 2026
                </p>
              </div>
            </div>

            <div className="rise rise-4 mt-6">
              <BuyTrigger placement="hero" className={buyLarge}>
                Quero o guia por {P.priceLabel}
              </BuyTrigger>
              <SafetyLine className="mt-2.5 text-center text-background/80" />
            </div>

            <a href="#erros" className="mt-6 flex flex-col items-center gap-0.5 text-[13px] font-semibold text-background/75">
              Veja o que ninguém conta
              <ChevronDown size={22} strokeWidth={2} className="motion-safe:animate-bounce" aria-hidden />
            </a>
          </div>
        </section>

        {/* 1. Ratos maiores: o custo de errar */}
        <section id="erros" className={`bg-background ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>O que os vídeos de 10 minutos pulam</p>
              <h2 className={h2}>Mudar é fácil. Errar também.</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                O Acordo de Residência do Mercosul abriu a porta. O problema está nos detalhes.
              </p>
            </Reveal>
            <ul className="mt-8 grid gap-3">
              {mistakes.map((m) => (
                <li key={m.title} className="flex gap-3 rounded-2xl bg-surface p-4">
                  <AlertTriangle size={20} strokeWidth={2} className="mt-0.5 flex-none text-[oklch(0.55_0.17_45)]" aria-hidden />
                  <p className="leading-snug">
                    <strong className="font-bold">{m.title}</strong> <span className="text-muted">{m.body}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[17px] font-semibold">O guia mostra o caminho certo, com a data e a fonte de cada número.</p>
          </div>
        </section>

        {/* 2. Quanto custa: responde à busca mais feita e prova que o conteúdo é sério */}
        <section className={`bg-surface ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>A pergunta mais buscada</p>
              <h2 className={h2}>Quanto custa morar em Assunção</h2>
            </Reveal>
            <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-background">
              <table className="w-full text-left text-[15px]">
                <caption className="sr-only">Custos em Assunção, outubro de 2026</caption>
                <thead>
                  <tr className="bg-deep text-[12px] uppercase tracking-[0.06em] text-background/80">
                    <th scope="col" className="px-4 py-2.5 font-semibold">Item</th>
                    <th scope="col" className="px-4 py-2.5 text-right font-semibold">≈ Reais</th>
                  </tr>
                </thead>
                <tbody>
                  {costs.map((c) => (
                    <tr key={c.item} className="border-t border-line align-top">
                      <td className="px-4 py-3 leading-snug">
                        {c.item}
                        <span className="mt-0.5 block text-[12.5px] text-muted">{c.source}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-semibold whitespace-nowrap tabular-nums">
                        {c.value}
                        {c.note && <span className="mt-0.5 block text-[12px] font-normal text-muted">{c.note}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
              Conversão pelo câmbio de outubro de 2026 (R$ 1 ≈ Gs. 1.150). No guia: Ciudad del Este, Encarnación, bairros de
              Assunção e o orçamento de uma família.
            </p>
          </div>
        </section>

        {/* 3. O que precisa: passo a passo resumido */}
        <section className={`bg-background ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>Residência Mercosul</p>
              <h2 className={h2}>O que precisa para morar no Paraguai</h2>
            </Reveal>
            <ol className="mt-8 grid gap-2.5">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-3.5 rounded-xl bg-surface px-4 py-3.5">
                  <span className="flex size-7 flex-none items-center justify-center rounded-full bg-deep font-mono text-[13px] font-semibold text-background">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-snug">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-muted">No guia, cada passo tem a lista de documentos, o custo e o que conferir antes de sair de casa.</p>
          </div>
        </section>

        {/* 4. Paraguai ou Uruguai */}
        <section className={`bg-surface ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>Comparativo</p>
              <h2 className={h2}>Paraguai ou Uruguai?</h2>
            </Reveal>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-background">
              <table className="w-full min-w-[22rem] text-left text-[14.5px]">
                <caption className="sr-only">Paraguai e Uruguai para brasileiros, outubro de 2026</caption>
                <thead>
                  <tr className="bg-deep text-[12px] uppercase tracking-[0.06em] text-background/80">
                    <th scope="col" className="px-3 py-2.5 font-semibold">
                      <span className="sr-only">Critério</span>
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-semibold">Paraguai</th>
                    <th scope="col" className="px-3 py-2.5 font-semibold">Uruguai</th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map((r) => (
                    <tr key={r.label} className="border-t border-line align-top">
                      <th scope="row" className="px-3 py-3 font-semibold leading-snug">{r.label}</th>
                      <td className="px-3 py-3 leading-snug">{r.py}</td>
                      <td className="px-3 py-3 leading-snug">{r.uy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[13.5px] text-muted">
              * Serviço prestado de dentro do Paraguai pode contar como renda local. O guia explica quando.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-background p-5">
                <p className="font-bold">Paraguai combina com</p>
                <p className="mt-1.5 leading-relaxed text-muted">
                  quem traz renda do Brasil (trabalho remoto, aposentadoria, aluguel) e tem orçamento enxuto.
                </p>
              </div>
              <div className="rounded-2xl bg-background p-5">
                <p className="font-bold">Uruguai combina com</p>
                <p className="mt-1.5 leading-relaxed text-muted">
                  quem prioriza instituições, saúde e escola e aguenta custo acima de São Paulo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. O que tem dentro */}
        <section className={`bg-background ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>O que tem dentro</p>
              <h2 className={h2}>O caminho inteiro, da primeira dúvida à cédula.</h2>
            </Reveal>
            <p className="mt-5 font-mono text-[14px] text-primary">
              {P.pages} páginas · {P.chapters} capítulos · checklist dos 90 dias · valores de outubro de 2026
            </p>

            <p className="mt-8 font-bold">Páginas do guia</p>
            <p className="mt-1 text-[14px] text-muted">Arraste para o lado.</p>
            <div className="-mx-5 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
              {pages.map((p) => (
                <figure key={p.src} className="w-[74%] flex-none snap-start md:w-[46%]">
                  <Image
                    src={p.src}
                    alt={p.caption}
                    width={720}
                    height={1022}
                    sizes="(min-width: 768px) 20rem, 74vw"
                    className="h-auto w-full rounded-xl border border-line"
                  />
                  <figcaption className="mt-2 text-[13.5px] text-muted">{p.caption}</figcaption>
                </figure>
              ))}
            </div>

            <details className="group mt-8 rounded-2xl bg-surface px-5">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[17px] font-bold [&::-webkit-details-marker]:hidden">
                Ver os {P.chapters} capítulos
                <ChevronDown size={20} strokeWidth={1.75} className="flex-none text-muted transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <ol className="grid gap-2 pb-5">
                {chapters.map((c, i) => (
                  <li key={c} className="flex gap-3 leading-snug">
                    <span className="w-6 flex-none font-mono text-[13px] text-muted">{i + 1}</span>
                    {c}
                  </li>
                ))}
              </ol>
            </details>
          </div>
        </section>

        {/* 6. Para quem é */}
        <section className={`bg-surface ${band}`}>
          <div className={narrow}>
            <Reveal>
              <h2 className="text-[1.875rem] font-extrabold leading-[1.08] tracking-tighter md:text-[2.5rem]">É para você se</h2>
            </Reveal>
            <ul className="mt-5 grid gap-2.5">
              {[
                'Está pesquisando a mudança e quer o caminho inteiro num lugar só',
                'Trabalha remoto, é aposentado ou vive de renda do Brasil',
                'Está comparando Paraguai e Uruguai com a família',
              ].map((t) => (
                <li key={t} className="flex gap-3 leading-snug">
                  <Check size={20} strokeWidth={2.5} className="mt-px flex-none text-[oklch(0.5_0.12_155)]" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <h3 className="mt-10 text-[22px] font-extrabold tracking-tight">Não é para você se</h3>
            <ul className="mt-4 grid gap-2.5">
              {[
                'Precisa de parecer jurídico ou contábil do seu caso (o guia diz quando procurar um profissional local)',
                'Procura vaga de emprego garantida',
                'Quer cidadania ou passaporte paraguaio',
              ].map((t) => (
                <li key={t} className="flex gap-3 leading-snug text-muted">
                  <X size={20} strokeWidth={2.25} className="mt-px flex-none text-[oklch(0.55_0.18_25)]" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. De onde vêm os números: a prova é a fonte, não depoimento */}
        <section className={`bg-background ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>Por que confiar</p>
              <h2 className={h2}>De onde vêm os números</h2>
            </Reveal>
            <p className="mt-5 text-lg leading-relaxed">
              Cada valor do guia tem fonte e data. A prioridade é a fonte oficial:
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {sources.map((s) => (
                <li key={s} className="flex gap-2.5 leading-snug">
                  <Landmark size={18} strokeWidth={1.75} className="mt-0.5 flex-none text-primary" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-muted">
              Custo de vida vem da Numbeo, uma base colaborativa, e o guia avisa onde ela costuma errar. Onde as fontes divergem, o
              guia mostra as duas versões.
            </p>
            <div className="mt-6 flex gap-3 rounded-2xl bg-tint p-4 leading-relaxed">
              <FileText size={20} strokeWidth={1.75} className="mt-0.5 flex-none text-primary" aria-hidden />
              <p>
                Leis e taxas mudam. Antes de pagar qualquer taxa, confira o valor no órgão oficial. O guia diz onde.
              </p>
            </div>
            <p className="mt-6 text-[14px] text-muted">
              Feito e vendido pela {LEGAL_NAME}, {LEGAL_ID}.
            </p>
          </div>
        </section>

        {/* 8. Oferta + garantia + Pix */}
        <section className={`bg-surface ${band}`}>
          <div className={narrow}>
            <div className="overflow-hidden rounded-3xl border-2 border-deep bg-background">
              <div className="bg-deep px-6 py-3 text-center text-[14px] font-bold uppercase tracking-[0.06em] text-background">
                Tudo o que você recebe
              </div>
              <div className="p-6 md:p-8">
                <ul className="grid gap-2.5">
                  {[
                    `Guia em PDF com ${P.pages} páginas e ${P.chapters} capítulos`,
                    'Residência no Paraguai e no Uruguai, passo a passo',
                    'Custo de vida, aluguel, trabalho, impostos e saúde',
                    'Checklist dos 90 dias e os erros que custam caro',
                    'Download na hora, assim que o Pix cai',
                  ].map((t) => (
                    <li key={t} className="flex gap-3 leading-snug">
                      <Check size={20} strokeWidth={2.5} className="mt-px flex-none text-primary" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 text-center">
                  <p className="text-[13px] font-bold uppercase tracking-[0.06em] text-muted">Pagamento único</p>
                  <p className="text-[3.25rem] font-extrabold leading-none tracking-tighter">{P.priceLabel}</p>
                  <BuyTrigger placement="offer" className={`${buyLarge} mt-6`}>
                    Quero o guia por {P.priceLabel}
                  </BuyTrigger>
                  <SafetyLine className="mt-3 text-muted" />
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="flex items-center gap-2 text-[19px] font-extrabold tracking-tight">
                  <ShieldCheck size={22} strokeWidth={1.75} className="text-primary" aria-hidden />
                  Garantia de 7 dias
                </p>
                <p className="mt-2 leading-relaxed text-muted">
                  Não gostou? Peça o dinheiro de volta em até 7 dias depois da compra. Sem perguntas. É só chamar no WhatsApp com o
                  código da compra.
                </p>
                <a href={whatsapp} className="mt-2 inline-block font-bold text-primary underline underline-offset-4">
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </div>
              <div>
                <p className="text-[19px] font-extrabold tracking-tight">Como funciona o Pix</p>
                <p className="mt-2 leading-relaxed text-muted">
                  O QR code aparece aqui mesmo. Você paga no app do banco e o download abre sozinho quando o pagamento cai. Sem CPF e
                  sem cadastro.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className={`bg-background ${band}`}>
          <div className={narrow}>
            <h2 className="text-[1.875rem] font-extrabold leading-[1.08] tracking-tighter md:text-[2.5rem]">Perguntas frequentes</h2>
            <div className="mt-6 grid gap-2.5">
              {faq.map(({ q, a }, i) => (
                <details key={q} open={i === 0} className="group rounded-2xl bg-surface px-5">
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

        {/* 10. Fechamento */}
        <section className="pg-hero py-16 text-background md:py-24">
          <div className={`${narrow} text-center`}>
            <h2 className="text-[2.1rem] font-extrabold leading-[1.05] tracking-tighter md:text-[3rem]">
              Antes de fazer as malas, saiba o prazo, a taxa e a regra.
            </h2>
            <p className="mt-4 font-mono text-[14px] text-background/80">
              {P.pages} páginas · {P.chapters} capítulos · valores de outubro de 2026
            </p>
            <div className="mx-auto mt-8 max-w-md">
              <BuyTrigger placement="closing" className={buyLarge}>
                Quero o guia por {P.priceLabel}
              </BuyTrigger>
              <SafetyLine className="mt-3 text-background/80" />
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
        <p className={`${narrow} mt-3 leading-relaxed`}>
          Valores aproximados, convertidos pelo câmbio de outubro de 2026. Leis e taxas mudam; confira no órgão oficial. Guia
          informativo, não substitui advogado, contador ou despachante.
        </p>
      </footer>

      {/* Barra fixa no celular desde o carregamento: preço e botão nunca saem da tela. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
        <div className="flex items-center gap-3">
          <p className="flex-none leading-tight">
            <span className="block text-[19px] font-extrabold tracking-tight">{P.priceLabel}</span>
            <span className="block text-[12.5px] text-muted">Pix · PDF na hora</span>
          </p>
          <BuyTrigger
            placement="sticky"
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-accent text-base font-bold text-accent-ink active:translate-y-px"
          >
            Quero o guia
          </BuyTrigger>
        </div>
      </div>

      <PixCheckout />
    </div>
  );
}
