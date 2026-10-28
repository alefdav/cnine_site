import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AlertTriangle, Check, ChevronDown, FileText, Landmark, ShieldCheck, X } from 'lucide-react';
import { LEGAL_ID, LEGAL_NAME, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/lib/content';
import { EBOOKS } from '@/lib/ebooks';
import { Reveal } from '@/components/reveal';
import { Clarity } from '@/components/clarity';
import { SalesTracking } from '@/components/ebook/sales-tracking';
import { BuyTrigger } from '@/components/ebook/pix/buy-trigger';
import { PixCheckout } from '@/components/ebook/pix/pix-checkout';

/*
  Página de vendas do ebook "Morar nos Estados Unidos" (Coleção Plano B),
  feita sobre o molde de /morar-no-paraguai.

  Diagnóstico Schwartz: consciência 3 (já pensa nos EUA e já ouviu falar de
  EB-3 e de agência), sofisticação 4 (todo mundo promete "green card pelo
  trabalho"). Mecanismo: o mapa das 15 rotas com custo e prazo e as perguntas
  que expõem a agência ruim, antes de o leitor pagar alguém. Todo número sai
  do PDF (texto em entregas/ebook-eua/texto.txt), edição de outubro de 2026.
*/

const P = EBOOKS.eua;

const TITLE = 'Antes de pagar uma agência para morar nos EUA, leia isto';
const DESCRIPTION =
  'Os 15 caminhos legais para morar nos Estados Unidos, quanto custa cada um e quanto demora, e as 10 perguntas que separam agência séria de golpe. Valores de outubro de 2026. R$ 27,90 no Pix.';

export const metadata: Metadata = {
  title: { absolute: 'Morar nos Estados Unidos: os 15 caminhos legais | Guia em PDF' },
  description: DESCRIPTION,
  alternates: { canonical: P.salesPath },
  robots: P.live ? undefined : { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: P.salesPath,
    siteName: 'C9 Company',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: P.cover.src, width: P.cover.width, height: P.cover.height }],
  },
};

const narrow = 'mx-auto max-w-[44rem] px-5 md:px-8';
const band = 'py-14 md:py-24';
const eyebrow = 'font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-primary';
const h2 = 'mt-3 text-[1.875rem] font-extrabold leading-[1.08] tracking-tighter md:text-[2.5rem]';
const buyLarge =
  'buy-pulse flex h-14 w-full items-center justify-center whitespace-nowrap rounded-full bg-accent px-5 text-[17px] font-bold text-accent-ink [--pulse:var(--accent)] transition-colors hover:bg-accent/90 active:translate-y-px';

const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Olá! Comprei o guia Morar nos Estados Unidos e quero pedir a devolução. O código da compra é: ',
)}`;

/* O que ninguém conta: cada item sai de um capítulo do guia (7, 9, 15 e 2). */
const facts = [
  {
    title: 'O pacote custa o preço de um apartamento.',
    body: 'Agências que vendem EB-3 no Brasil cobram de US$ 18 mil a US$ 40 mil, segundo os próprios sites. Com mudança e reserva, o processo inteiro fica entre R$ 110 mil e R$ 220 mil.',
  },
  {
    title: 'Uma parte dessa cobrança é proibida.',
    body: 'Pela lei americana (20 CFR 656.12), a empresa não pode cobrar do trabalhador os custos do PERM: nem o advogado dela, nem desconto no salário, nem trabalho de graça.',
  },
  {
    title: 'Agência de fachada existe.',
    body: 'Em abril de 2026, a polícia da Flórida prendeu quatro brasileiros ligados à Legacy Immigra, acusados de um esquema de mais de US$ 20 milhões. Uma vítima vendeu a casa e perdeu US$ 17 mil sem nenhum documento protocolado.',
  },
  {
    title: 'Visto de turista não deixa trabalhar, nem por bico.',
    body: 'Nem diária, nem app de entrega, nem faxina. E ficar além do prazo do I-94 pode render proibição de 3 ou de 10 anos para voltar.',
  },
  {
    title: 'O caminho reabriu, mas devagar.',
    body: 'A pausa dos vistos de imigrante para 75 países, Brasil incluído, foi anulada pela Justiça em agosto de 2026. Entre 21 de agosto e 30 de setembro, só 706 pedidos afetados foram decididos.',
  },
];

/* Recorte da tabela do capítulo 3 (páginas 9 e 10). */
const routes = [
  { name: 'EB-3 qualificado', who: 'Técnico com 2+ anos de experiência ou graduado, com oferta de emprego', cost: 'Taxas pela empresa; agência US$ 18–40 mil', time: '3–4+ anos' },
  { name: 'EB-3 sem diploma', who: 'Cuidador, limpeza, frigorífico, hotel, construção', cost: 'Agência US$ 19–40 mil', time: '5–7+ anos' },
  { name: 'EB-2 NIW', who: 'Mestrado, ou graduação + 5 anos de experiência, com projeto de interesse nacional', cost: 'Advogado US$ 10–20 mil + taxas', time: '2–4+ anos' },
  { name: 'H-1B', who: 'Graduado com oferta de emprego especializado', cost: 'Custos da empresa', time: 'Sorteio anual' },
  { name: 'EB-5', who: 'Investidor com US$ 800 mil ou US$ 1,05 milhão', cost: '≈ US$ 890–965 mil no total', time: '2–4 anos' },
  { name: 'Família', who: 'Cônjuge, pai, mãe ou filho de cidadão americano', cost: 'US$ 2–5 mil em taxas', time: 'Cônjuge: ≈ 1–2 anos' },
];

/* 5 das 10 perguntas do capítulo 9 (página 24). */
const questions = [
  { q: 'Quem é o advogado responsável? Ele tem licença ativa em algum estado americano?', note: 'Dá para conferir no site da State Bar do estado.' },
  { q: 'Qual é o nome da empresa empregadora? Posso falar com ela diretamente?', note: '' },
  { q: 'Alguma parte do meu pagamento cobre custos do PERM ou do advogado da empresa?', note: 'Se sim, é ilegal.' },
  { q: 'O que acontece com o meu dinheiro se o PERM for negado ou a empresa desistir?', note: '' },
  { q: 'A agência me promete prazo ou resultado garantido?', note: 'Se sim, desconfie. Quem decide é o consulado ou o USCIS.' },
];

/* Capítulo 10: aluguel de 1 quarto (ApartmentAdvisor ago/2026 e Zillow mar/2026) e renda do MIT (fev/2026). */
const cities = [
  { city: 'Orlando (FL)', rent: 'US$ 1.360–1.940', month: 'US$ 4.360', note: 'Grande comunidade brasileira. Sem imposto de renda estadual. Carro é quase obrigatório.' },
  { city: 'Miami e Pompano Beach (FL)', rent: 'US$ 2.350–2.670', month: 'US$ 4.480', note: 'Pompano e Deerfield concentram brasileiros. Seguro de casa e de carro são caros.' },
  { city: 'Boston e Framingham (MA)', rent: 'US$ 2.830–3.150', month: 'US$ 5.630', note: 'Uma das maiores comunidades do país. Inverno rigoroso e imposto estadual de 5%.' },
];

/* Sumário real do PDF (páginas 3 e 4). */
const chapters = [
  'Por que os Estados Unidos?',
  'O que mudou em 2025–2026',
  'Os caminhos legais de residência',
  'O visto EB-3 em detalhe',
  'Passo a passo do EB-3',
  'Checklist de documentos',
  'Quanto custa a mudança',
  'As outras rotas em detalhe',
  'Como saber se uma agência é séria',
  'Custo de vida e cidades com comunidade brasileira',
  'Trabalho, renda e impostos',
  'Dinheiro, bancos e crédito',
  'Saúde, educação e família',
  'Carteira de motorista, carro e moradia',
  'Erros comuns e golpes',
  'Seu plano de 90 dias',
  'Perguntas frequentes',
  'Links oficiais',
  'Fontes consultadas',
];

const pages = [
  { src: '/ebook-eua/pagina-rotas.webp', caption: 'Capítulo 3 · Os caminhos legais de residência' },
  { src: '/ebook-eua/pagina-agencia.webp', caption: 'Capítulo 9 · Como saber se uma agência é séria' },
  { src: '/ebook-eua/pagina-custos.webp', caption: 'Capítulo 10 · Custo de vida e cidades' },
  { src: '/ebook-eua/pagina-golpes.webp', caption: 'Capítulo 15 · Erros comuns e golpes' },
];

const sources = [
  'USCIS (imigração dos EUA)',
  'Departamento de Estado e Visa Bulletin',
  'Departamento do Trabalho (PERM)',
  'eCFR, o código de leis federais',
  'Calculadora de salário digno do MIT',
  'Receita Federal',
];

const faq = [
  {
    q: 'Tem muita coisa de graça no Google. Por que pagar?',
    a: 'Tem, espalhado e muitas vezes escrito por quem quer vender um pacote. O guia junta as 15 rotas, os custos e os prazos num lugar só, com data e fonte, e não vende visto nenhum.',
  },
  {
    q: 'O guia consegue um visto para mim?',
    a: 'Não, e ninguém consegue garantir: a decisão é sempre do consulado americano ou do USCIS. O guia mostra os caminhos e como checar quem diz que consegue.',
  },
  {
    q: 'Serve para quem não tem diploma?',
    a: 'Sim. O EB-3 sem diploma e os vistos temporários H-2 têm espaço próprio no guia, com a fila e o custo reais.',
  },
  {
    q: 'Os vistos para brasileiros não estavam suspensos?',
    a: 'A pausa de janeiro de 2026 foi anulada pela Justiça em agosto e a decisão foi mantida em outubro. Os consulados voltaram a emitir, mas devagar. O capítulo 2 explica tudo o que mudou em 2025 e 2026.',
  },
  {
    q: 'Isso é consultoria jurídica?',
    a: 'Não. É um guia informativo e o autor não é advogado. Para o seu caso, o guia indica procurar um advogado de imigração com licença ativa nos EUA e mostra como conferir a licença.',
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
      src={P.cover.src}
      alt={`Capa do guia ${P.name}`}
      width={P.cover.width}
      height={P.cover.height}
      priority
      sizes={sizes}
      className={`h-auto rounded-md shadow-[0_18px_40px_-12px_oklch(0.1_0.05_266/0.8)] ${className}`}
    />
  );
}

export default function Page() {
  return (
    <div className="lp-eua">
      {P.live && <SalesTracking product={P.pixel} />}
      <Clarity tags={{ page: 'ebook-eua' }} />

      {!P.live && (
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

            <p className="rise mt-2 font-mono text-[12.5px] uppercase tracking-[0.08em] text-hl">Guia em PDF · {P.pages} páginas</p>
            <h1 className="rise rise-1 mt-2 text-[clamp(1.85rem,8vw,3.25rem)] font-extrabold leading-[1.04] tracking-tighter">
              Antes de pagar uma agência para morar nos EUA, <span className="text-hl">leia isto</span>
            </h1>
            <p className="rise rise-2 mt-3 text-[16.5px] leading-snug text-background/85 md:text-lg">
              Os 15 caminhos legais, quanto custa cada um e quanto demora. E as 10 perguntas que separam agência séria de golpe.
            </p>

            <div className="rise rise-3 mt-5 flex items-center gap-5">
              <Cover className="w-[92px] flex-none md:w-[130px]" sizes="(min-width: 768px) 130px, 92px" />
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.06em] text-background/70">Pagamento único</p>
                <p className="text-[2.6rem] font-extrabold leading-none tracking-tighter">{P.priceLabel}</p>
                <p className="mt-2 flex items-center gap-1.5 text-[13.5px] leading-snug text-background/85">
                  <ShieldCheck size={16} strokeWidth={2} className="flex-none text-hl" aria-hidden />
                  Coleção Plano B · valores conferidos em outubro de 2026
                </p>
              </div>
            </div>

            <div className="rise rise-4 mt-6">
              <BuyTrigger placement="hero" className={buyLarge}>
                Quero o guia por {P.priceLabel}
              </BuyTrigger>
              <SafetyLine className="mt-2.5 text-center text-background/80" />
            </div>

            <a href="#antes" className="mt-6 flex flex-col items-center gap-0.5 text-[13px] font-semibold text-background/75">
              Veja o que ninguém conta
              <ChevronDown size={22} strokeWidth={2} className="motion-safe:animate-bounce" aria-hidden />
            </a>
          </div>
        </section>

        {/* 1. O custo de errar: o que a agência não conta */}
        <section id="antes" className={`bg-background ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>Antes de assinar qualquer contrato</p>
              <h2 className={h2}>O que ninguém conta antes de você pagar</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Nos EUA ninguém ganha residência só por ser brasileiro. Quase todo caminho exige empresa, família, dinheiro ou um
                currículo fora da curva. E é nesse vão que entra quem vende promessa.
              </p>
            </Reveal>
            <ul className="mt-8 grid gap-3">
              {facts.map((m) => (
                <li key={m.title} className="flex gap-3 rounded-2xl bg-surface p-4">
                  <AlertTriangle size={20} strokeWidth={2} className="mt-0.5 flex-none text-accent" aria-hidden />
                  <p className="leading-snug">
                    <strong className="font-bold">{m.title}</strong> <span className="text-muted">{m.body}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[17px] font-semibold">O guia mostra o mapa inteiro, com a data e a fonte de cada número.</p>
          </div>
        </section>

        {/* 2. Os caminhos: responde à busca mais feita e prova que o conteúdo é sério */}
        <section className={`bg-surface ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>A pergunta mais buscada</p>
              <h2 className={h2}>Quanto custa e quanto demora cada caminho</h2>
            </Reveal>
            {/* Linhas em bloco, não tabela: a 390 px uma coluna de prazo espremia a descrição. */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-background">
              <p className="flex justify-between bg-deep px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.06em] text-background/80">
                <span>Rota e custo</span>
                <span>Prazo realista</span>
              </p>
              <ul>
                {routes.map((r) => (
                  <li key={r.name} className="border-t border-line px-4 py-3.5 first:border-t-0">
                    <p className="flex items-baseline justify-between gap-3">
                      <strong className="text-[16px] font-bold">{r.name}</strong>
                      <span className="font-mono text-[14.5px] font-semibold whitespace-nowrap tabular-nums">{r.time}</span>
                    </p>
                    <p className="mt-0.5 text-[14px] leading-snug text-muted">{r.who}</p>
                    <p className="mt-1.5 font-mono text-[13px] font-semibold text-primary">{r.cost}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
              O prazo realista soma as etapas oficiais; não existe prazo total oficial. No guia estão as 15 rotas, com EB-1A, O-1, E-2,
              L-1, H-2, F-1, J-1 e Gold Card, e o que está valendo em cada uma.
            </p>
          </div>
        </section>

        {/* 3. As perguntas para a agência */}
        <section className={`bg-background ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>Capítulo 9</p>
              <h2 className={h2}>5 das 10 perguntas que você faz antes de pagar</h2>
            </Reveal>
            <ol className="mt-8 grid gap-2.5">
              {questions.map((s, i) => (
                <li key={s.q} className="flex gap-3.5 rounded-xl bg-surface px-4 py-3.5">
                  <span className="flex size-7 flex-none items-center justify-center rounded-full bg-deep font-mono text-[13px] font-semibold text-background">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-snug">
                    {s.q}
                    {s.note && <span className="mt-1 block text-[14.5px] font-semibold text-accent">{s.note}</span>}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-muted">
              As outras 5 estão no guia, com os sinais de golpe mais comuns e como conferir a licença do advogado e a lista de
              empresas proibidas de patrocinar.
            </p>
          </div>
        </section>

        {/* 4. Custo de vida */}
        <section className={`bg-surface ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>Custo de vida</p>
              <h2 className={h2}>Quanto custa viver onde já tem brasileiro</h2>
            </Reveal>
            <div className="mt-8 grid gap-3">
              {cities.map((c) => (
                <div key={c.city} className="rounded-2xl bg-background p-5">
                  <p className="text-[19px] font-extrabold tracking-tight">{c.city}</p>
                  <dl className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <dt className="text-[12.5px] font-semibold uppercase tracking-[0.05em] text-muted">Aluguel 1 quarto</dt>
                      <dd className="mt-0.5 font-mono text-[15px] font-semibold tabular-nums">{c.rent}</dd>
                    </div>
                    <div>
                      <dt className="text-[12.5px] font-semibold uppercase tracking-[0.05em] text-muted">Renda necessária</dt>
                      <dd className="mt-0.5 font-mono text-[15px] font-semibold tabular-nums">≈ {c.month}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-[14.5px] leading-snug text-muted">{c.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
              Aluguel: ApartmentAdvisor (ago/2026) e Zillow (mar/2026). Renda: calculadora do MIT (fev/2026), renda bruta para 1
              adulto sem filhos, orçamento enxuto. No guia: 7 cidades, com Newark, Atlanta, Houston e Salt Lake City.
            </p>
          </div>
        </section>

        {/* 5. O que tem dentro */}
        <section className={`bg-background ${band}`}>
          <div className={narrow}>
            <Reveal>
              <p className={eyebrow}>O que tem dentro</p>
              <h2 className={h2}>O mapa inteiro, da primeira dúvida ao plano de 90 dias.</h2>
            </Reveal>
            <p className="mt-5 font-mono text-[14px] text-primary">
              {P.pages} páginas · {P.chapters} capítulos · plano de 90 dias · valores de outubro de 2026
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
                'Está pensando nos EUA e quer o mapa completo antes de gastar com agência ou advogado',
                'Recebeu proposta de EB-3 e quer saber o que perguntar antes de assinar',
                'Quer saber quanto custa viver nas cidades com comunidade brasileira',
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
                'Precisa de análise jurídica do seu caso (o guia não substitui advogado de imigração licenciado nos EUA)',
                'Procura visto garantido ou atalho',
                'Pensa em pedir asilo como plano B',
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
            <p className="mt-5 text-lg leading-relaxed">Cada valor do guia tem fonte e data. A prioridade é a fonte oficial:</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {sources.map((s) => (
                <li key={s} className="flex gap-2.5 leading-snug">
                  <Landmark size={18} strokeWidth={1.75} className="mt-0.5 flex-none text-primary" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-muted">
              Aluguel vem de Zillow, ApartmentAdvisor e Numbeo, que medem coisas diferentes, por isso o guia mostra faixas. Preço de
              agência vem dos sites das próprias agências.
            </p>
            <div className="mt-6 flex gap-3 rounded-2xl bg-tint p-4 leading-relaxed">
              <FileText size={20} strokeWidth={1.75} className="mt-0.5 flex-none text-primary" aria-hidden />
              <p>Regras de imigração mudam rápido. Antes de qualquer decisão, confira o Visa Bulletin do mês e o site do USCIS. O guia diz onde.</p>
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
                    'Os 15 caminhos legais, com custo e prazo de cada um',
                    'As 10 perguntas para a agência e os golpes mais comuns',
                    'Custo de vida em 7 cidades com comunidade brasileira',
                    'Checklist de documentos e plano de 90 dias',
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
              Antes de assinar com uma agência, saiba o que perguntar.
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
          Valores aproximados, de outubro de 2026. Regras de imigração mudam; confira nos sites oficiais. Guia informativo: o autor
          não é advogado e o guia não substitui um advogado de imigração licenciado nos EUA.
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

      <PixCheckout ebook="eua" />
    </div>
  );
}
