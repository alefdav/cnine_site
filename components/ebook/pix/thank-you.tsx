import Link from 'next/link';
import { Download, LoaderCircle, MessageCircle } from 'lucide-react';
import { LEGAL_ID, LEGAL_NAME, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/lib/content';
import { checkPurchase } from '@/lib/ebook-file';
import { EBOOKS, type EbookSlug } from '@/lib/ebooks';
import { Clarity } from '@/components/clarity';
import { PurchaseOnce } from '@/components/ebook/pix/purchase-once';
import { RefreshWhilePending } from '@/components/ebook/pix/refresh-while-pending';

/*
  Pós-compra de um guia vendido com Pix. O servidor confere o Pix na
  AbacatePay (pago, valor do guia e metadata do produto) antes de mostrar o
  download; a URL sozinha não libera nada. Cada página passa o tema (classe
  lp-*), a frase do que vem no guia e os primeiros passos.
*/

const narrow = 'mx-auto max-w-[44rem] px-5 md:px-8';

function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export async function ThankYou({
  ebook: slug,
  pixId,
  theme,
  includes,
  firstSteps,
}: {
  ebook: EbookSlug;
  pixId: string | undefined;
  theme: string;
  /* Completa "<nome>. N páginas, N capítulos e ..." */
  includes: string;
  firstSteps: { title: string; body: string }[];
}) {
  const P = EBOOKS[slug];
  const status = await checkPurchase(P, pixId);
  const download = `/api/ebook/${slug}/download?pix=${encodeURIComponent(pixId ?? '')}`;

  return (
    <div className={`${theme} min-h-dvh`}>
      <Clarity tags={{ page: `ebook-${slug}-obrigado`, purchase: status }} />
      {status === 'paid' && pixId && P.live && <PurchaseOnce pixId={pixId} ebook={slug} />}
      {status === 'pending' && <RefreshWhilePending />}

      <main>
        <section className="pg-hero pb-14 text-background md:pb-20">
          <div className={narrow}>
            <div className="flex h-14 items-center md:h-16">
              <span className="text-[20px] font-extrabold tracking-tighter">
                C9<span className="opacity-60">.</span>
              </span>
            </div>

            {status === 'paid' && (
              <div className="pt-6 md:pt-10">
                <span className="inline-flex h-[30px] items-center gap-2 rounded-full bg-background/12 px-3.5 text-[13.5px] font-bold">
                  <i className="size-2 rounded-full bg-accent" />
                  Compra confirmada
                </span>
                <h1 className="mt-5 text-[clamp(2.1rem,7vw,3.5rem)] font-extrabold leading-[1.04] tracking-tighter">
                  Obrigado. Seu guia <span className="text-hl">já está aqui.</span>
                </h1>
                <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-background/80">
                  <strong className="font-bold text-background">{P.name}.</strong> {P.pages} páginas, {P.chapters} capítulos e{' '}
                  {includes}.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={download}
                    className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-accent px-8 text-base font-bold text-accent-ink transition-colors hover:bg-accent/90 active:translate-y-px"
                  >
                    <Download size={20} strokeWidth={1.75} aria-hidden />
                    Baixar o PDF
                  </a>
                  <a
                    href={`${download}&inline=1`}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex h-14 items-center justify-center rounded-full border border-background/40 px-7 text-base font-bold transition-colors hover:border-background hover:bg-background/10"
                  >
                    Abrir no navegador
                  </a>
                </div>
                <p className="mt-4 text-sm text-background/70">
                  Salve esta página nos favoritos: o link funciona de novo se você precisar baixar outra vez.
                </p>
                <p className="mt-2 font-mono text-[12.5px] text-background/60">Código da compra: {pixId}</p>
              </div>
            )}

            {status === 'pending' && (
              <div className="pt-6 md:pt-10">
                <h1 className="text-[clamp(2rem,7vw,3.25rem)] font-extrabold leading-[1.05] tracking-tighter">
                  Esperando a confirmação do Pix
                </h1>
                <p className="mt-4 flex items-center gap-2 text-lg text-background/80" aria-live="polite">
                  <LoaderCircle size={20} className="animate-spin" aria-hidden />
                  Esta página atualiza sozinha. Costuma levar segundos.
                </p>
                <p className="mt-6 max-w-[46ch] leading-relaxed text-background/75">
                  Ainda não pagou?{' '}
                  <Link href={P.salesPath} className="font-bold text-hl underline underline-offset-4">
                    Volte à página do guia
                  </Link>{' '}
                  e abra o Pix de novo: ele continua o mesmo por 30 minutos.
                </p>
              </div>
            )}

            {(status === 'invalid' || status === 'error') && (
              <div className="pt-6 md:pt-10">
                <h1 className="text-[clamp(2rem,7vw,3.25rem)] font-extrabold leading-[1.05] tracking-tighter">
                  {status === 'error' ? 'Não conseguimos conferir o pagamento agora' : 'Não achamos esta compra'}
                </h1>
                <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-background/80">
                  {status === 'error'
                    ? 'Tente recarregar a página em alguns segundos. Se continuar, fale com a gente.'
                    : 'Se você pagou e caiu aqui, mande o comprovante do Pix no WhatsApp que a gente envia o guia.'}
                </p>
                <a
                  href={whatsappLink(`Olá! Paguei o guia ${P.shortName} e não consegui baixar. Código: ${pixId ?? '(sem código)'}`)}
                  className="mt-8 inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-accent px-8 text-base font-bold text-accent-ink"
                >
                  <MessageCircle size={20} strokeWidth={1.75} aria-hidden />
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </div>
            )}
          </div>
        </section>

        {status === 'paid' && (
          <>
            <section className="bg-background py-14 md:py-20">
              <div className={narrow}>
                <h2 className="text-[1.875rem] font-extrabold leading-[1.08] tracking-tighter md:text-[2.5rem]">Por onde começar</h2>
                <ol className="mt-8 grid gap-3">
                  {firstSteps.map((s, i) => (
                    <li key={s.title} className="flex gap-4 rounded-2xl bg-surface p-5">
                      <span className="font-mono text-[15px] font-semibold text-primary">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <p className="text-[19px] font-extrabold tracking-tight">{s.title}</p>
                        <p className="mt-1.5 leading-relaxed text-muted">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section className="bg-surface py-14 md:py-20">
              <div className={narrow}>
                <h2 className="text-[1.6rem] font-extrabold leading-[1.1] tracking-tighter">Precisa de ajuda?</h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Problema com o download ou quer pedir a devolução em até 7 dias? Chame no WhatsApp com o código da compra.
                </p>
                <a
                  href={whatsappLink(`Olá! Comprei o guia ${P.shortName}. Código da compra: ${pixId}`)}
                  className="mt-6 inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-deep px-8 text-base font-bold text-background"
                >
                  <MessageCircle size={20} strokeWidth={1.75} aria-hidden />
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-deep py-8 text-center text-[13px] text-background/60">
        <p>
          {LEGAL_NAME} · {LEGAL_ID}
        </p>
        <p className="mt-2">Material de uso pessoal. Proibida a revenda ou distribuição.</p>
      </footer>
    </div>
  );
}
