import Link from 'next/link';
import { waLink, waQuestion, SITE_URL } from '@/lib/c9';
import { CLOSING, type ServicePage } from '@/lib/c9-services';
import { BandClouds, Grain, HeroClouds } from '@/components/c9/clouds';
import { Arrow, Icon } from '@/components/c9/icon';
import { Lines, SiteFooter, SiteNav } from '@/components/c9/chrome';
import { BAND, HERO_ART } from '@/components/c9/service-art';
import { LEGAL_NAME, WHATSAPP_NUMBER } from '@/lib/content';

/*
  Modelo das seis páginas de serviço: hero noturna com a peça do serviço,
  dor em três linhas, o que entra, faixa escura (#mostra) entre bancos de
  nuvem, perguntas, fechamento (#diagnostico) e rodapé.
*/
export function ServicePageView({ p }: { p: ServicePage }) {
  return (
    <>
      <section className="hero">
        <HeroClouds />
        <div className="floor" />
        <SiteNav current={p.slug} />
        <div className="w hg">
          <div>
            <h1>
              {p.h1[0]}
              <br />
              <span>{p.h1[1]}</span>
            </h1>
            <p className="l">{p.lede}</p>
            <div className="btns">
              <a className="b s" href={waLink(p.title)}>
                Agendar diagnóstico <Arrow />
              </a>
              <a className="b g" href="#mostra">
                {p.cta2}
              </a>
            </div>
          </div>
          {HERO_ART[p.slug]}
        </div>
        <Grain id="g1" />
      </section>

      <main>
        <section className="pain">
          <div className="w split">
            <div>
              <h2>
                <Lines text={p.pain.h2} />
              </h2>
              <p className="lede">{p.pain.lede}</p>
            </div>
            <ol className="rows">
              {p.pain.rows.map(([h, t], i) => (
                <li key={h}>
                  <span className="n">0{i + 1}</span>
                  <div>
                    <h3>{h}</h3>
                    <p>{t}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="inc">
          <div className="w">
            <div className="ih">
              <h2>
                <Lines text={p.inc.h2} />
              </h2>
              <p className="lede">{p.inc.lede}</p>
            </div>
            <div className={p.inc.big ? 'g3 bigs' : 'g3'}>
              {p.inc.items.map(([icon, h, t]) => (
                <div key={h} className={p.inc.big ? 'it big' : 'it'}>
                  <span className="ic">
                    <Icon name={icon} size={p.inc.big ? 24 : 22} />
                  </span>
                  <h3>{h}</h3>
                  <p>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dk" id="mostra">
          <BandClouds seed={p.seed} />
          <div className="ceil" />
          <div className="w">{BAND[p.slug]}</div>
          <div className="dfloor" />
          <Grain id="g2" />
        </section>

        <section className="faq">
          <div className="w">
            <div className="side">
              <h2>
                Perguntas
                <br />
                antes de fechar.
              </h2>
              <p>A sua não está aqui? Pergunte direto para quem vai cuidar do seu {p.short}.</p>
              <a href={waQuestion(p.title)}>Perguntar no WhatsApp</a>
            </div>
            <div className="fq">
              {p.faq.map(([q, a]) => (
                <div key={q} className="fi">
                  <h3>{q}</h3>
                  <p>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Closing seed={p.seed + 10} topic={p.title} />
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: p.title,
              serviceType: p.serviceType,
              description: p.description,
              url: `${SITE_URL}/${p.slug}`,
              areaServed: { '@type': 'Country', name: 'BR' },
              provider: {
                '@type': 'Organization',
                name: 'C9 Company',
                legalName: LEGAL_NAME,
                url: SITE_URL,
                telephone: `+${WHATSAPP_NUMBER}`,
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: p.faq.map(([q, a]) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            },
          ]),
        }}
      />
    </>
  );
}

/* Fechamento comum (home e serviços): o único lugar onde o CTA é o centro. */
export function Closing({ seed, topic }: { seed: number; topic?: string }) {
  return (
    <section className="end" id="diagnostico">
      <BandClouds seed={seed} endBand />
      <div className="ceil" />
      <div className="w">
        <h2>
          <Lines text={CLOSING.h2} />
        </h2>
        <p className="lede">{CLOSING.lede}</p>
        <div className="btns">
          <a className="b s" href={waLink(topic)}>
            Agendar diagnóstico <Arrow />
          </a>
          {topic && (
            <Link className="b g" href="/">
              Ver todos os serviços
            </Link>
          )}
        </div>
      </div>
      <div className="dfloor" />
      <Grain id="g3" />
    </section>
  );
}
