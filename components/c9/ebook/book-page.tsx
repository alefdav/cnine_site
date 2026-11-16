import Image from 'next/image';
import Link from 'next/link';
import { SITE_URL } from '@/lib/c9';
import { DZ_EDITION, DZ_PATHS, DZ_SAMPLE_PAGES, type DzBook } from '@/lib/do-zero';
import { DZ_SEPARATE_CENTS, EBOOKS, formatBRL } from '@/lib/ebooks';
import { HeroClouds, Grain } from '@/components/c9/clouds';
import { Clarity } from '@/components/clarity';
import { SalesTracking } from '@/components/ebook/sales-tracking';
import { BuyBlock, DraftBanner, EbookFooter, EbookNav, StickyBuy } from '@/components/c9/ebook/chrome';
import { Band, Closing, Faq, FaqJsonLd, Fit, Inside, Offer, Pain, Sample, SeriesUpsell } from '@/components/c9/ebook/sections';
import { PixSheet } from '@/components/c9/ebook/pix-sheet';

/*
  Modelo das 7 páginas de livro da série Do Zero ao Lançamento:
  hero noturna com a capa → dor → o que tem dentro (#dentro) → faixa escura
  com uma peça real do livro → para quem → prompt de amostra → oferta (com a
  série como única saída) → perguntas → fechamento. Texto em lib/do-zero.ts.
*/
export function BookPageView({ b }: { b: DzBook }) {
  const P = EBOOKS[b.slug];
  const series = EBOOKS['dz-serie'];
  const n = DZ_PATHS.indexOf(b.path) + 1;
  const seed = 40 + n * 7;
  const label = `Quero o livro por ${P.priceLabel}`;
  const meta = `${P.pages} páginas · ${P.chapters} ${b.unit === 'Parte' ? 'partes' : 'capítulos'} · PDF`;
  const pages = DZ_SAMPLE_PAGES[b.path].map((caption, i) => ({ src: `/do-zero/pagina-${b.path}-${i + 1}.webp`, caption }));

  return (
    <>
      {P.live && <SalesTracking product={P.pixel} />}
      <Clarity tags={{ page: `ebook-${b.slug}` }} />
      <DraftBanner ebook={P} />

      <section className="hero eb">
        <HeroClouds />
        <div className="floor" />
        <EbookNav
          right={
            <Link className="eb-ed" href={series.salesPath}>
              Série completa
            </Link>
          }
        />
        <div className="w hg">
          <div>
            <p className="badge">
              <b>{b.role}</b>Do Zero ao Lançamento · livro {n} de 7
            </p>
            <h1>
              {b.h1[0]}
              <br />
              <span>{b.h1[1]}</span>
            </h1>
            <p className="l">{b.lede}</p>
            <BuyBlock
              ebook={P}
              label={label}
              meta={meta}
              placement="hero"
              thumb
              more={{ href: '#dentro', text: 'Ver o que tem dentro' }}
            />
          </div>
          <figure className="eb-art cover eb-cover">
            <Image
              src={P.cover.src}
              alt={`Capa do ebook ${P.name}`}
              width={P.cover.width}
              height={P.cover.height}
              sizes="360px"
              priority
            />
            <figcaption>
              <span>PDF · {P.pages} páginas</span>
              <span>Conferido em {DZ_EDITION}</span>
            </figcaption>
          </figure>
        </div>
        <Grain id="g1" />
      </section>

      <main>
        <Pain {...b.pain} />
        <Inside
          h2={'O que tem\ndentro.'}
          lede="Cada capítulo termina com checklist, o erro mais comum daquela etapa e um prompt pronto para copiar."
          meta={`${P.pages} páginas · ${P.chapters} ${b.unit === 'Parte' ? 'partes' : 'capítulos'} · conferido em ${DZ_EDITION}`}
          unit={b.unit}
          chapters={b.chapters}
          extra={b.extra}
          pages={pages}
        />
        <Band band={b.band} seed={seed} />
        <Fit forWho={b.forWho} notFor={b.notFor} />
        <Sample from={b.sample.from} prompt={b.sample.prompt} />
        <Offer
          ebook={P}
          label={label}
          rows={[
            { text: `${P.name}, em PDF` },
            { text: `${P.pages} páginas e ${P.chapters} ${b.unit === 'Parte' ? 'partes' : 'capítulos'}, com valores e limites conferidos em ${DZ_EDITION}` },
            { text: 'Checklist, erro comum e prompt pronto em cada capítulo' },
            { text: 'Download na hora, assim que o Pix cai' },
          ]}
        >
          <SeriesUpsell series={series} separate={formatBRL(DZ_SEPARATE_CENTS)} />
        </Offer>
        <Faq faq={b.faq} topic={`o ebook ${P.shortName}`} />
      </main>

      <Closing h2={b.closing} meta={meta} label={label} seed={seed + 3} />
      <EbookFooter />
      <StickyBuy ebook={P} label="Quero o livro" />
      <PixSheet ebook={b.slug} bumpPitch={b.bumpPitch} />

      <FaqJsonLd
        faq={b.faq}
        product={{
          name: P.name,
          description: b.lede,
          url: `${SITE_URL}${P.salesPath}`,
          image: `${SITE_URL}${P.cover.src}`,
          price: P.priceCents / 100,
        }}
      />
    </>
  );
}
