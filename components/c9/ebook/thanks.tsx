import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/lib/content';
import { checkPurchase } from '@/lib/ebook-file';
import { EBOOKS, type EbookSlug } from '@/lib/ebooks';
import { HeroClouds, Grain } from '@/components/c9/clouds';
import { Arrow, Icon } from '@/components/c9/icon';
import { Clarity } from '@/components/clarity';
import { PurchaseOnce } from '@/components/ebook/pix/purchase-once';
import { RefreshWhilePending } from '@/components/ebook/pix/refresh-while-pending';
import { EbookFooter, EbookNav } from '@/components/c9/ebook/chrome';

/*
  Pós-compra no sistema c9 (série Do Zero ao Lançamento). O servidor confere
  o Pix na AbacatePay antes de mostrar o download; a URL sozinha não libera
  nada. Pacote: um download por livro, todos com o mesmo código de compra.
*/

const wa = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export async function EbookThanks({
  ebook: slug,
  pixId,
  firstSteps,
}: {
  ebook: EbookSlug;
  pixId: string | undefined;
  firstSteps: { title: string; body: string }[];
}) {
  const P = EBOOKS[slug];
  const status = await checkPurchase(P, pixId);
  const files = (P.parts ?? [slug]).map((s) => EBOOKS[s]);
  const link = (s: EbookSlug) => `/api/ebook/${s}/download?pix=${encodeURIComponent(pixId ?? '')}`;
  const many = files.length > 1;

  return (
    <>
      <Clarity tags={{ page: `ebook-${slug}-obrigado`, purchase: status }} />
      {status === 'paid' && pixId && P.live && <PurchaseOnce pixId={pixId} ebook={slug} />}
      {status === 'pending' && <RefreshWhilePending />}

      <section className="hero eb eb-ty">
        <HeroClouds />
        <div className="floor" />
        <EbookNav right={<span className="eb-ed">{P.shortName}</span>} />
        <div className="w hg">
          {status === 'paid' && (
            <div>
              <p className="badge">
                <b>Compra confirmada</b>Pix recebido
              </p>
              <h1>
                Obrigado.
                <br />
                <span>{many ? 'Seus 7 livros já estão aqui.' : 'Seu livro já está aqui.'}</span>
              </h1>
              <p className="l">
                {P.name}. {P.pages} páginas{many ? ' em 7 PDFs' : ''}, com checklist e prompt pronto em cada capítulo.
              </p>

              {many ? (
                <ul className="eb-dl">
                  {files.map((f) => (
                    <li key={f.slug}>
                      <Image src={f.cover.src} alt="" width={f.cover.width} height={f.cover.height} sizes="48px" />
                      <div>
                        <b>{f.shortName}</b>
                        <span>
                          <a href={link(f.slug)}>Baixar PDF</a>
                          <a href={`${link(f.slug)}&inline=1`} target="_blank" rel="noopener">
                            Abrir
                          </a>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="btns">
                  <a className="b s" href={link(slug)}>
                    Baixar o PDF <Arrow />
                  </a>
                  <a className="b g" href={`${link(slug)}&inline=1`} target="_blank" rel="noopener">
                    Abrir no navegador
                  </a>
                </div>
              )}
              <p className="eb-safe">Salve esta página nos favoritos: o link funciona de novo se você precisar baixar outra vez.</p>
              <p className="code">Código da compra: {pixId}</p>
            </div>
          )}

          {status === 'pending' && (
            <div>
              <h1>
                Esperando a
                <br />
                <span>confirmação do Pix.</span>
              </h1>
              <p className="l">Esta página atualiza sozinha. Costuma levar segundos.</p>
              <p className="eb-safe">
                Ainda não pagou? <Link href={P.salesPath}>Volte à página do livro</Link> e abra o Pix de novo: ele continua o mesmo por 30
                minutos.
              </p>
            </div>
          )}

          {(status === 'invalid' || status === 'error') && (
            <div>
              <h1>{status === 'error' ? 'Não conseguimos conferir o pagamento agora.' : 'Não achamos esta compra.'}</h1>
              <p className="l">
                {status === 'error'
                  ? 'Tente recarregar a página em alguns segundos. Se continuar, fale com a gente.'
                  : 'Se você pagou e caiu aqui, mande o comprovante do Pix no WhatsApp que a gente envia o livro.'}
              </p>
              <div className="btns">
                <a className="b s" href={wa(`Olá! Paguei ${P.shortName} e não consegui baixar. Código: ${pixId ?? '(sem código)'}`)}>
                  WhatsApp {WHATSAPP_DISPLAY} <Arrow />
                </a>
              </div>
            </div>
          )}
        </div>
        <Grain id="g1" />
      </section>

      {status === 'paid' && (
        <main>
          <section className="eb-fit">
            <div className="w">
              <h2>Por onde começar.</h2>
              <ol className="eb-steps">
                {firstSteps.map((s, i) => (
                  <li key={s.title}>
                    <span className="n">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </li>
                ))}
              </ol>
              <div className="eb-author">
                <span className="ic">
                  <Icon name="chat" />
                </span>
                <p>
                  <b>Precisa de ajuda?</b> Problema com o download ou quer pedir a devolução em até 7 dias? Chame no WhatsApp com o código da
                  compra: <a href={wa(`Olá! Comprei ${P.shortName}. Código da compra: ${pixId}`)}>WhatsApp {WHATSAPP_DISPLAY}</a>.
                </p>
              </div>
            </div>
          </section>
        </main>
      )}

      <EbookFooter />
    </>
  );
}
