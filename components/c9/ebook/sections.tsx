import Image from 'next/image';
import Link from 'next/link';
import { waQuestion } from '@/lib/c9';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/lib/content';
import { DZ_BOOKS, type Ebook } from '@/lib/ebooks';
import type { DzBand } from '@/lib/do-zero';
import { BandClouds, Grain } from '@/components/c9/clouds';
import { Arrow, Icon } from '@/components/c9/icon';
import { Lines } from '@/components/c9/chrome';
import { BuyTrigger } from '@/components/ebook/pix/buy-trigger';
import { SafetyLine } from '@/components/c9/ebook/chrome';
import { CopyPrompt } from '@/components/c9/ebook/copy-prompt';

/*
  Seções das páginas de venda de ebook (sistema c9). A ordem fica na página:
  dor → o que tem dentro → faixa escura com uma peça real do livro → para
  quem → amostra de prompt → oferta → perguntas → fechamento.
*/

const two = (i: number) => String(i + 1).padStart(2, '0');

export function Pain({ h2, lede, rows }: { h2: string; lede: string; rows: [string, string][] }) {
  return (
    <section className="pain">
      <div className="w split">
        <div>
          <h2>
            <Lines text={h2} />
          </h2>
          <p className="lede">{lede}</p>
        </div>
        <ol className="rows">
          {rows.map(([h, t], i) => (
            <li key={h}>
              <span className="n">{two(i)}</span>
              <div>
                <h3>{h}</h3>
                <p>{t}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Inside({
  h2,
  lede,
  meta,
  unit,
  chapters,
  extra,
  pages,
}: {
  h2: string;
  lede: string;
  meta: string;
  unit: string;
  chapters: [string, string][];
  extra?: string;
  pages: { src: string; caption: string }[];
}) {
  return (
    <section className="eb-in" id="dentro">
      <div className="w">
        <div className="ih">
          <div>
            <h2>
              <Lines text={h2} />
            </h2>
            <p className="eb-meta">{meta}</p>
          </div>
          <p className="lede">{lede}</p>
        </div>
        <ol className="eb-ch" aria-label={`${unit}s`}>
          {chapters.map(([h, t], i) => (
            <li key={h}>
              <span className="n">{two(i)}</span>
              <div>
                <h3>{h}</h3>
                <p>{t}</p>
              </div>
            </li>
          ))}
        </ol>
        {extra && <p className="eb-extra">{extra}</p>}

        <p className="eb-ph">Páginas de verdade, sem retoque</p>
        <div className="eb-pages">
          {pages.map((p) => (
            <figure key={p.src}>
              <Image src={p.src} alt={`Página do livro: ${p.caption}`} width={720} height={900} sizes="(min-width: 900px) 360px, 72vw" />
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function BandBody({ band }: { band: DzBand }) {
  switch (band.kind) {
    case 'steps':
      return (
        <div className={band.cols === 3 ? 'flow c3' : 'flow'}>
          {band.items.map(([k, h, p]) => (
            <div key={h} className="fl">
              <span className="k">{k}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      );
    case 'compare':
      return (
        <>
          <div className="eb-cmp">
            {band.cols.map((c, ci) => (
              <div key={c.name} className={ci === 0 ? 'fl on' : 'fl'}>
                <h3>{c.name}</h3>
                <dl>
                  {band.rows.map((r, ri) => (
                    <div key={r}>
                      <dt>{r}</dt>
                      <dd>{c.cells[ri]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          {band.note && <p className="src">{band.note}</p>}
        </>
      );
    case 'criteria':
      return (
        <>
          <ol className="eb-crit">
            {band.items.map(([h, p]) => (
              <li key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
                <i aria-hidden="true" />
              </li>
            ))}
          </ol>
          <p className="src">{band.note}</p>
        </>
      );
    case 'code':
      return (
        <div className="eb-code">
          <div className="art">
            <div className="top">
              <Icon name="doc" size={18} />
              {band.label}
            </div>
            <pre>{band.code}</pre>
          </div>
          <ul className="eb-side">
            {band.side.map(([h, p]) => (
              <li key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

export function Band({ band, seed }: { band: DzBand; seed: number }) {
  return (
    <section className="dk" id="mostra">
      <BandClouds seed={seed} />
      <div className="ceil" />
      <div className="w">
        <div className="dh">
          <h2>
            <Lines text={band.h2} />
          </h2>
          <p className="lede">{band.lede}</p>
        </div>
        <BandBody band={band} />
      </div>
      <div className="dfloor" />
      <Grain id="g2" />
    </section>
  );
}

export function Fit({ forWho, notFor, children }: { forWho: string[]; notFor: string[]; children?: React.ReactNode }) {
  return (
    <section className="eb-fit">
      <div className="w">
        <h2>
          Para quem é,
          <br />e para quem não é.
        </h2>
        <div className="eb-fg">
          <div className="eb-fc">
            <h3>É para você se</h3>
            <ul>
              {forWho.map((t) => (
                <li key={t}>
                  <Icon name="ok" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="eb-fc no">
            <h3>Não é para você se</h3>
            <ul>
              {notFor.map((t) => (
                <li key={t}>
                  <Icon name="no" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

export function Author() {
  return (
    <div className="eb-author">
      <span className="ic">
        <Icon name="code" />
      </span>
      <p>
        <b>Quem escreveu.</b> O dev que constrói os sites, sistemas e páginas de venda da C9, para clientes e para projetos
        próprios. Os exemplos vêm desse trabalho: o painel de um clube que controlava mensalidades num caderno, a página de
        uma clínica com a paleta tirada das fotos da sala, o sistema de memória que nasceu de centenas de notas soltas.
      </p>
    </div>
  );
}

export function Sample({ from, prompt, pages }: { from: string; prompt: string; pages?: { src: string; caption: string }[] }) {
  return (
    <section className="eb-sample">
      <div className="w split">
        <div>
          <h2>
            Todo capítulo
            <br />
            termina em ação.
          </h2>
          <p className="lede">Nada de teoria solta. Cada capítulo fecha com três coisas para fazer no mesmo dia.</p>
          <ul className="eb-three">
            <li>
              <span className="ic">
                <Icon name="ok" />
              </span>
              <span className="t">
                <b>Checklist</b>O que precisa estar pronto antes de seguir.
              </span>
            </li>
            <li>
              <span className="ic">
                <Icon name="no" />
              </span>
              <span className="t">
                <b>Erro comum</b>O que mais dá errado naquela etapa.
              </span>
            </li>
            <li>
              <span className="ic">
                <Icon name="chat" />
              </span>
              <span className="t">
                <b>Prompt pronto</b>Um texto para copiar e colar na IA, como este ao lado.
              </span>
            </li>
          </ul>
        </div>
        <figure className="eb-prompt">
          <figcaption className="from">
            <Icon name="chat" size={18} />
            {from}
          </figcaption>
          <blockquote>{prompt}</blockquote>
          <CopyPrompt text={prompt} />
        </figure>
      </div>
      {pages && (
        <div className="w">
          <p className="eb-ph">Páginas de verdade, sem retoque</p>
          <div className="eb-pages">
            {pages.map((p) => (
              <figure key={p.src}>
                <Image src={p.src} alt={`Página da série: ${p.caption}`} width={720} height={900} sizes="(min-width: 900px) 360px, 72vw" />
                <figcaption>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

const refundLink = (name: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Comprei ${name} e quero pedir a devolução. O código da compra é: `,
  )}`;

export function Offer({
  ebook,
  label,
  rows,
  total,
  save,
  children,
}: {
  ebook: Ebook;
  label: string;
  rows: { text: string; price?: string }[];
  total?: string;
  save?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="eb-offer" id="oferta">
      <div className="w">
        <div className="eb-card">
          <h2>Tudo o que você recebe</h2>
          <ul>
            {rows.map((r) => (
              <li key={r.text}>
                <Icon name="ok" />
                <span>{r.text}</span>
                {r.price ? <small>{r.price}</small> : <span />}
              </li>
            ))}
          </ul>
          {total && (
            <p className="eb-tot">
              Comprando um a um <b>{total}</b>
            </p>
          )}
          <div className="eb-pay">
            <small>Pagamento único no Pix</small>
            <strong>{ebook.priceLabel}</strong>
            {save && <p className="save">{save}</p>}
            <BuyTrigger placement="offer" className="b s">
              {label} <Arrow />
            </BuyTrigger>
            <SafetyLine />
          </div>
        </div>

        <div className="eb-trust">
          <div>
            <h3>
              <span className="ic">
                <Icon name="shield" />
              </span>
              Garantia de 7 dias
            </h3>
            <p>Não gostou? Peça o dinheiro de volta em até 7 dias depois da compra, sem perguntas. É só chamar no WhatsApp com o código da compra.</p>
            <a href={refundLink(ebook.shortName)}>WhatsApp {WHATSAPP_DISPLAY}</a>
          </div>
          <div>
            <h3>
              <span className="ic">
                <Icon name="pix" />
              </span>
              Como funciona o Pix
            </h3>
            <p>O QR code aparece aqui mesmo. Você paga no app do banco e o download abre sozinho quando o pagamento cai. Sem CPF e sem cadastro.</p>
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}

/* Cartão da série nas páginas de cada livro: a única saída da página. */
export function SeriesUpsell({ series, separate }: { series: Ebook; separate: string }) {
  return (
    <div className="eb-up">
      <span className="mini" aria-hidden="true">
        {DZ_BOOKS.map((b) => (
          <Image key={b.slug} src={b.cover.src} alt="" width={b.cover.width} height={b.cover.height} sizes="40px" />
        ))}
      </span>
      <div>
        <b>Este livro faz parte de uma série de 7.</b>
        <p>
          Os 7 juntos saem por {series.priceLabel} no Pix. Comprando um a um, {separate}.
        </p>
        <Link href={series.salesPath}>
          Ver a série completa <Icon name="arrow" size={18} />
        </Link>
      </div>
    </div>
  );
}

export function Faq({ faq, topic }: { faq: [string, string][]; topic: string }) {
  return (
    <section className="faq">
      <div className="w">
        <div className="side">
          <h2>
            Perguntas
            <br />
            antes de comprar.
          </h2>
          <p>A sua não está aqui? Pergunte direto para quem escreveu.</p>
          <a href={waQuestion(topic)}>Perguntar no WhatsApp</a>
        </div>
        <div className="fq">
          {faq.map(([q, a]) => (
            <div key={q} className="fi">
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing({ h2, meta, label, seed }: { h2: string; meta: string; label: string; seed: number }) {
  return (
    <section className="end">
      <BandClouds seed={seed} endBand />
      <div className="ceil" />
      <div className="w">
        <h2>
          <Lines text={h2} />
        </h2>
        <p className="eb-meta">{meta}</p>
        <div className="btns">
          <BuyTrigger placement="closing" className="b s">
            {label} <Arrow />
          </BuyTrigger>
        </div>
        <SafetyLine />
      </div>
      <div className="dfloor" />
      <Grain id="g3" />
    </section>
  );
}

/* FAQPage em JSON-LD (as mesmas perguntas da seção). */
export function FaqJsonLd({ faq, product }: { faq: [string, string][]; product: { name: string; description: string; url: string; image: string; price: number } }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.image,
            url: product.url,
            brand: { '@type': 'Brand', name: 'C9 Company' },
            offers: {
              '@type': 'Offer',
              price: product.price.toFixed(2),
              priceCurrency: 'BRL',
              availability: 'https://schema.org/InStock',
              url: product.url,
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
          },
        ]),
      }}
    />
  );
}
