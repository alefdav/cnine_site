import Image from 'next/image';
import Link from 'next/link';
import { SITE_URL } from '@/lib/c9';
import { DZ_EDITION, DZ_PAGES, DZ_SAMPLE_PAGES, DZ_SERIES, type DzPath } from '@/lib/do-zero';
import { DZ_BOOKS, DZ_SEPARATE_CENTS, EBOOKS, formatBRL } from '@/lib/ebooks';
import { HeroClouds, Grain } from '@/components/c9/clouds';
import { Icon } from '@/components/c9/icon';
import { Lines } from '@/components/c9/chrome';
import { Clarity } from '@/components/clarity';
import { SalesTracking } from '@/components/ebook/sales-tracking';
import { BuyBlock, DraftBanner, EbookFooter, EbookNav, StickyBuy } from '@/components/c9/ebook/chrome';
import { Author, Band, Closing, Faq, FaqJsonLd, Fit, Offer, Pain, Sample } from '@/components/c9/ebook/sections';
import { PixSheet } from '@/components/c9/ebook/pix-sheet';

/*
  Página da série completa (7 livros, um Pix só). Mesma família das páginas
  de livro, com duas seções próprias: a estante dos 7 livros (#livros, cada
  um com a sua página) e a tabela do que é grátis em cada ferramenta.
*/

const SAMPLE: [DzPath, number][] = [
  ['o-metodo', 1],
  ['com-lovable', 2],
  ['com-o-claude', 3],
  ['colocando-no-ar', 1],
  ['identificando-tendencias', 1],
  ['memoria-obsidian-ia', 1],
];

const BY_SLUG = new Map(Object.values(DZ_PAGES).map((b) => [b.slug, b]));

export function SeriesPageView() {
  const P = EBOOKS['dz-serie'];
  const S = DZ_SERIES;
  const label = `Quero a série por ${P.priceLabel}`;
  const meta = `7 livros · ${P.pages} páginas · 42 prompts prontos`;
  const separate = formatBRL(DZ_SEPARATE_CENTS);
  const saving = formatBRL(DZ_SEPARATE_CENTS - P.priceCents);

  return (
    <>
      {P.live && <SalesTracking product={P.pixel} />}
      <Clarity tags={{ page: 'ebook-dz-serie' }} />
      <DraftBanner ebook={P} />

      <section className="hero eb">
        <HeroClouds />
        <div className="floor" />
        <EbookNav right={<span className="eb-ed">Conferido em {DZ_EDITION}</span>} />
        <div className="w hg">
          <div>
            <p className="badge">
              <b>7 ebooks</b>Série Do Zero ao Lançamento
            </p>
            <h1>
              {S.h1[0]}
              <br />
              <span>{S.h1[1]}</span>
            </h1>
            <p className="l">{S.lede}</p>
            <BuyBlock ebook={P} label={label} meta={meta} placement="hero" more={{ href: '#livros', text: 'Ver os 7 livros' }} />
          </div>
          <div className="art eb-shelf">
            <div className="top">
              <Icon name="layers" size={18} />
              Do Zero ao Lançamento
              <span>PDF</span>
            </div>
            <div className="grid">
              {DZ_BOOKS.map((b, i) => (
                <Image
                  key={b.slug}
                  src={b.cover.src}
                  alt={`Capa: ${b.shortName}`}
                  width={b.cover.width}
                  height={b.cover.height}
                  sizes="(min-width: 900px) 110px, 22vw"
                  priority={i < 4}
                />
              ))}
              <p className="sum">
                <b>{P.pages}</b>
                <span>páginas no total</span>
              </p>
            </div>
          </div>
        </div>
        <Grain id="g1" />
      </section>

      <main>
        <Pain {...S.pain} />

        <section className="eb-in" id="livros">
          <div className="w">
            <div className="ih">
              <div>
                <h2>
                  Sete livros,
                  <br />
                  um caminho só.
                </h2>
                <p className="eb-meta">
                  {P.pages} páginas · {P.chapters} capítulos · conferido em {DZ_EDITION}
                </p>
              </div>
              <p className="lede">Comece pelo Método. Escolha uma trilha de construção. Abra os outros quando chegar a hora.</p>
            </div>
            <div className="eb-books">
              {DZ_BOOKS.map((b) => {
                const page = BY_SLUG.get(b.slug)!;
                return (
                  <Link key={b.slug} className="eb-bk" href={b.salesPath}>
                    <Image src={b.cover.src} alt="" width={b.cover.width} height={b.cover.height} sizes="(min-width: 900px) 260px, 96px" />
                    <span className="role">{page.role}</span>
                    <h3>{b.shortName}</h3>
                    <p>{page.card}</p>
                    <span className="go">
                      Ver o livro <span>{b.pages} p. · {b.priceLabel}</span>
                    </span>
                  </Link>
                );
              })}
              <a className="eb-bk all" href="#oferta">
                <b>7</b>
                <p>Os sete juntos, num Pix só, por {P.priceLabel}. Separados, saem por {separate}.</p>
                <span className="go">
                  Ver a oferta <Icon name="arrow" size={18} />
                </span>
              </a>
            </div>
          </div>
        </section>

        <Band
          band={{
            kind: 'steps',
            h2: 'Do zero ao primeiro\ncliente em 30 dias.',
            lede: 'O plano que fecha O Método e amarra a série: cerca de uma hora por dia, sem gastar nada para começar.',
            items: S.plan,
          }}
          seed={33}
        />

        <section className="eb-tools-s">
          <div className="w">
            <div className="ih">
              <h2>
                <Lines text={'Tudo começa\nno plano grátis.'} />
              </h2>
              <p className="lede">Os livros dizem onde o grátis acaba antes que ele te pegue. Limites conferidos em {DZ_EDITION}.</p>
            </div>
            <div className="eb-tools" role="table" aria-label="Ferramentas da série e o limite do plano grátis">
              {S.tools.map(([name, use, limit]) => (
                <div key={name} role="row" className={name === 'Claude Code' ? 'paid' : undefined}>
                  <b role="cell">{name}</b>
                  <span role="cell">{use}</span>
                  <p role="cell">{limit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Fit forWho={S.forWho} notFor={S.notFor}>
          <Author />
        </Fit>

        <Sample
          from={DZ_PAGES['o-metodo'].sample.from + ' · O Método'}
          prompt={DZ_PAGES['o-metodo'].sample.prompt}
          pages={SAMPLE.map(([path, i]) => ({
            src: `/do-zero/pagina-${path}-${i}.webp`,
            caption: `${EBOOKS[DZ_PAGES[path].slug].shortName} · ${DZ_SAMPLE_PAGES[path][i - 1].split(' · ')[1]}`,
          }))}
        />

        <Offer
          ebook={P}
          label={label}
          rows={[
            ...DZ_BOOKS.map((b) => ({ text: `${b.shortName} · ${b.pages} páginas`, price: b.priceLabel })),
            { text: 'Download dos 7 PDFs na hora, assim que o Pix cai' },
          ]}
          total={separate}
          save={`Você economiza ${saving} levando a série`}
        />

        <Faq faq={S.faq} topic="a série Do Zero ao Lançamento" />
      </main>

      <Closing h2={'Sua primeira página\nestá a uma tarde.'} meta={meta} label={label} seed={77} />
      <EbookFooter />
      <StickyBuy ebook={P} label="Quero a série" />
      <PixSheet ebook="dz-serie" />

      <FaqJsonLd
        faq={S.faq}
        product={{
          name: P.name,
          description: S.description,
          url: `${SITE_URL}${P.salesPath}`,
          image: `${SITE_URL}/do-zero/og-serie.jpg`,
          price: P.priceCents / 100,
        }}
      />
    </>
  );
}
