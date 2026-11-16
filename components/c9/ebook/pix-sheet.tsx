'use client';

import Image from 'next/image';
import { DZ_SEPARATE_CENTS, formatBRL, type EbookSlug } from '@/lib/ebooks';
import { formatLeft, usePixCheckout } from '@/components/ebook/pix/use-pix-checkout';
import { Icon } from '@/components/c9/icon';

/*
  Janela de compra no sistema c9 (mesma lógica de PixCheckout, via
  usePixCheckout): resumo + order bump + e-mail opcional → QR do Pix →
  obrigado quando cai. No celular abre como folha presa ao rodapé; no
  desktop, centrada.

  Order bump (só nos livros, nunca na série): marcar o livro complementar
  soma o preço cheio dele; marcar a série troca o pedido pela série inteira.
  As duas caixas se excluem. `bumpPitch` diz por que o complementar combina.
*/
export function PixSheet({ ebook: slug, bumpPitch }: { ebook: EbookSlug; bumpPitch?: string }) {
  const {
    ebook,
    dialog,
    step,
    pix,
    email,
    setEmail,
    error,
    copied,
    left,
    createPix,
    copyCode,
    close,
    extra,
    setExtra,
    bumpEbook,
    upgradeEbook,
    totalCents,
  } = usePixCheckout(slug);
  const total = formatBRL(totalCents);

  return (
    <dialog
      ref={dialog}
      className="eb-sheet"
      aria-labelledby="pix-title"
      onClick={(e) => e.target === dialog.current && close()}
    >
      <div className="in">
        <div className="hd">
          <p id="pix-title">{step === 'qr' ? 'Pague com Pix' : 'Seu pedido'}</p>
          <button type="button" className="x" onClick={close} aria-label="Fechar">
            <Icon name="no" size={22} />
          </button>
        </div>

        {(step === 'summary' || step === 'creating' || step === 'expired') && (
          <>
            <div className="sum">
              <Image src={ebook.cover.src} alt="" width={ebook.cover.width} height={ebook.cover.height} sizes="72px" />
              <div>
                <b>{ebook.name}</b>
                <span>{ebook.checkoutLine}</span>
                <strong>{ebook.priceLabel}</strong>
              </div>
            </div>

            {step === 'expired' && <p className="exp">O Pix anterior expirou. Gere um novo, leva 2 segundos.</p>}

            {(bumpEbook || upgradeEbook) && (
              <div className="bumps" role="group" aria-label="Adicione ao pedido">
                {bumpEbook && (
                  <label className={extra === 'bump' ? 'opt on' : 'opt'}>
                    <input
                      type="checkbox"
                      checked={extra === 'bump'}
                      disabled={step === 'creating'}
                      onChange={(e) => setExtra(e.target.checked ? 'bump' : 'none')}
                    />
                    <Image src={bumpEbook.cover.src} alt="" width={bumpEbook.cover.width} height={bumpEbook.cover.height} sizes="44px" />
                    <span>
                      <b>Sim, quero também {bumpEbook.shortName}</b>
                      <small>
                        + {bumpEbook.priceLabel}
                        {bumpPitch ? ` · ${bumpPitch}` : ''}
                      </small>
                    </span>
                  </label>
                )}
                {upgradeEbook && (
                  <label className={extra === 'upgrade' ? 'opt up on' : 'opt up'}>
                    <input
                      type="checkbox"
                      checked={extra === 'upgrade'}
                      disabled={step === 'creating'}
                      onChange={(e) => setExtra(e.target.checked ? 'upgrade' : 'none')}
                    />
                    <span className="ic">
                      <Icon name="layers" size={20} />
                    </span>
                    <span>
                      <b>Ou leve a série completa</b>
                      <small>
                        Os 7 livros, este incluído, por {upgradeEbook.priceLabel} no total. Separados, saem por {formatBRL(DZ_SEPARATE_CENTS)}.
                      </small>
                    </span>
                  </label>
                )}
                <p className="tot">
                  Total <b>{total}</b>
                </p>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void createPix();
              }}
            >
              <label htmlFor="pix-email">
                Seu e-mail <span>(opcional)</span>
              </label>
              <input
                id="pix-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
              />
              <p className="hint">Só para o suporte achar sua compra se você precisar. Não mandamos propaganda.</p>

              {error && (
                <p role="alert" className="err">
                  {error}
                </p>
              )}

              <button type="submit" className="b s" disabled={step === 'creating'}>
                {step === 'creating' ? 'Gerando o Pix…' : `Gerar Pix de ${total}`}
              </button>
            </form>

            <ul className="ok">
              <li>
                <Icon name="shield" size={20} />7 dias para pedir o dinheiro de volta
              </li>
              <li>
                <Icon name="ok" size={20} />
                Sem CPF e sem cadastro. O download abre aqui quando o Pix cai.
              </li>
            </ul>
          </>
        )}

        {step === 'qr' && pix && (
          <div>
            <ol>
              <li>Copie o código abaixo ou leia o QR no app do seu banco.</li>
              <li>Confira o valor de {total} e pague.</li>
              <li>Volte para cá: o download abre sozinho.</li>
            </ol>

            <button type="button" className="b s" onClick={() => copyCode('pix-code')}>
              <Icon name={copied ? 'ok' : 'doc'} size={20} />
              {copied ? 'Código copiado' : 'Copiar código Pix'}
            </button>
            <textarea id="pix-code" readOnly value={pix.brCode} rows={2} aria-label="Código Pix copia e cola" />

            {/* data: URL vinda da AbacatePay: next/image não otimiza, então <img> direto. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="qr" src={pix.brCodeBase64} alt="QR code do Pix" width={216} height={216} />

            <p className="wait" aria-live="polite">
              <i aria-hidden="true" />
              Esperando o pagamento · expira em {formatLeft(left)}
            </p>
          </div>
        )}
      </div>
    </dialog>
  );
}
