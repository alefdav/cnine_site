'use client';

import Image from 'next/image';
import { Check, Copy, LoaderCircle, ShieldCheck, X } from 'lucide-react';
import type { EbookSlug } from '@/lib/ebooks';
import { formatLeft, usePixCheckout } from '@/components/ebook/pix/use-pix-checkout';

/*
  Janela de compra de um guia nas páginas antigas (Tailwind, tema lp-*). A
  lógica (Pix, consulta, localStorage) está em use-pix-checkout; o sistema c9
  usa a mesma lógica com outra aparência (components/c9/ebook/pix-sheet).
*/

export function PixCheckout({ ebook: slug }: { ebook: EbookSlug }) {
  const { ebook, dialog, step, pix, email, setEmail, error, copied, left, createPix, copyCode } = usePixCheckout(slug);
  const button =
    'flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-[17px] font-bold text-accent-ink transition-colors hover:bg-accent/90 active:translate-y-px disabled:opacity-70';

  return (
    <dialog
      ref={dialog}
      aria-labelledby="pix-title"
      onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      className="pix-sheet m-0 mt-auto max-h-none w-full max-w-none rounded-t-3xl bg-background p-0 text-ink backdrop:bg-[oklch(0.15_0.04_262/0.6)] md:m-auto md:max-w-[26rem] md:rounded-3xl"
    >
      <div className="max-h-[92dvh] overflow-y-auto px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:px-7 md:pb-7">
        <div className="flex items-start justify-between gap-4">
          <p id="pix-title" className="pt-1 text-[13px] font-bold uppercase tracking-[0.06em] text-muted">
            {step === 'qr' ? 'Pague com Pix' : 'Seu pedido'}
          </p>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="-mr-2 flex size-10 flex-none items-center justify-center rounded-full text-muted hover:bg-surface"
            aria-label="Fechar"
          >
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>

        {(step === 'summary' || step === 'creating' || step === 'expired') && (
          <>
            <div className="mt-2 flex gap-4">
              <Image
                src={ebook.cover.src}
                alt=""
                width={ebook.cover.width}
                height={ebook.cover.height}
                sizes="72px"
                className="h-auto w-[72px] flex-none rounded-md border border-line"
              />
              <div>
                <p className="font-bold leading-snug">{ebook.name}</p>
                <p className="mt-1 text-[14px] text-muted">{ebook.checkoutLine}</p>
                <p className="mt-2 text-[1.75rem] font-extrabold leading-none tracking-tighter">{ebook.priceLabel}</p>
              </div>
            </div>

            {step === 'expired' && (
              <p className="mt-5 rounded-xl bg-tint px-4 py-3 text-[15px]">O Pix anterior expirou. Gere um novo, leva 2 segundos.</p>
            )}

            <form
              className="mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                void createPix();
              }}
            >
              <label htmlFor="pix-email" className="text-[15px] font-semibold">
                Seu e-mail <span className="font-normal text-muted">(opcional)</span>
              </label>
              <input
                id="pix-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="mt-2 h-12 w-full rounded-xl border border-line bg-background px-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
              />
              <p className="mt-1.5 text-[13px] text-muted">Só para o suporte achar sua compra se você precisar. Não mandamos propaganda.</p>

              {error && (
                <p role="alert" className="mt-4 rounded-xl bg-[oklch(0.95_0.04_25)] px-4 py-3 text-[15px] text-[oklch(0.42_0.15_25)]">
                  {error}
                </p>
              )}

              <button type="submit" disabled={step === 'creating'} className={`${button} mt-5`}>
                {step === 'creating' ? (
                  <>
                    <LoaderCircle size={20} className="animate-spin" aria-hidden />
                    Gerando o Pix…
                  </>
                ) : (
                  `Gerar Pix de ${ebook.priceLabel}`
                )}
              </button>
            </form>

            <ul className="mt-5 grid gap-1.5 text-[14px] text-muted">
              <li className="flex gap-2">
                <ShieldCheck size={18} strokeWidth={1.75} className="flex-none text-primary" aria-hidden />
                7 dias para pedir o dinheiro de volta
              </li>
              <li className="flex gap-2">
                <Check size={18} strokeWidth={2} className="flex-none text-primary" aria-hidden />
                Sem CPF e sem cadastro. O download abre aqui quando o Pix cai.
              </li>
            </ul>
          </>
        )}

        {step === 'qr' && pix && (
          <div className="mt-1">
            <ol className="grid gap-1 text-[15px] leading-snug">
              <li>
                <strong>1.</strong> Copie o código abaixo ou leia o QR no app do seu banco.
              </li>
              <li>
                <strong>2.</strong> Confira o valor de {ebook.priceLabel} e pague.
              </li>
              <li>
                <strong>3.</strong> Volte para cá: o download abre sozinho.
              </li>
            </ol>

            <button type="button" onClick={() => copyCode('pix-code')} className={`${button} mt-5`}>
              {copied ? <Check size={20} strokeWidth={2.5} aria-hidden /> : <Copy size={20} strokeWidth={2} aria-hidden />}
              {copied ? 'Código copiado' : 'Copiar código Pix'}
            </button>
            <textarea
              id="pix-code"
              readOnly
              value={pix.brCode}
              rows={2}
              aria-label="Código Pix copia e cola"
              className="mt-3 w-full resize-none rounded-xl border border-line bg-surface px-3 py-2 font-mono text-[12px] leading-snug text-muted"
            />

            {/* data: URL vinda da AbacatePay: next/image não otimiza, então <img> direto. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pix.brCodeBase64}
              alt="QR code do Pix"
              width={228}
              height={228}
              className="mx-auto mt-3 size-[200px] rounded-xl border border-line bg-white p-2 md:size-[228px]"
            />

            <p className="mt-4 flex items-center justify-center gap-2 text-[14px] text-muted" aria-live="polite">
              <LoaderCircle size={16} className="animate-spin" aria-hidden />
              Esperando o pagamento · expira em {formatLeft(left)}
            </p>
          </div>
        )}
      </div>
    </dialog>
  );
}
