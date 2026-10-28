'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy, LoaderCircle, ShieldCheck, X } from 'lucide-react';
import { track } from '@/lib/meta-pixel';
import { EBOOK_CHECKOUT_EVENT, EBOOKS, type EbookSlug } from '@/lib/ebooks';

/*
  Janela de compra de um guia (lib/ebooks.ts): resumo + e-mail opcional → QR do Pix →
  consulta o status a cada 4 s → página de obrigado quando o Pix cai.

  O Pix gerado fica no localStorage: no celular, abrir o app do banco pode
  matar a aba, e quem volta precisa achar o mesmo QR (e ser levado ao
  download se já pagou), não um Pix novo.
*/

interface PendingPix {
  id: string;
  brCode: string;
  brCodeBase64: string;
  expiresAt: string;
}

type Step = 'summary' | 'creating' | 'qr' | 'expired';

const POLL_MS = 4000;

// Mantém a chave antiga do Paraguai: quem tinha um Pix pendente antes da mudança ainda o encontra.
const storageKey = (slug: EbookSlug) => (slug === 'paraguai' ? 'paraguai_pix' : `${slug}_pix`);

function loadPending(slug: EbookSlug): PendingPix | null {
  try {
    const pix = JSON.parse(window.localStorage.getItem(storageKey(slug)) ?? 'null') as PendingPix | null;
    return pix && new Date(pix.expiresAt).getTime() > Date.now() ? pix : null;
  } catch {
    return null;
  }
}

function savePending(slug: EbookSlug, pix: PendingPix | null) {
  try {
    if (pix) window.localStorage.setItem(storageKey(slug), JSON.stringify(pix));
    else window.localStorage.removeItem(storageKey(slug));
  } catch {}
}

function utmFromUrl() {
  const here = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ['source', 'medium', 'campaign', 'content', 'term']) {
    const value = here.get(`utm_${key}`);
    if (value) utm[key] = value;
  }
  return utm;
}

function formatLeft(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

export function PixCheckout({ ebook: slug }: { ebook: EbookSlug }) {
  const ebook = EBOOKS[slug];
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>('summary');
  const [pix, setPix] = useState<PendingPix | null>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const goToThankYou = useCallback((id: string) => {
    savePending(slug, null);
    window.location.assign(`${ebook.thankYouPath}?pix=${encodeURIComponent(id)}`);
  }, [slug, ebook.thankYouPath]);

  const checkStatus = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/pix/${encodeURIComponent(id)}`, { cache: 'no-store' });
        if (!res.ok) return;
        const { status } = (await res.json()) as { status: string };
        if (status === 'PAID') goToThankYou(id);
        else if (status === 'EXPIRED' || status === 'CANCELLED') {
          savePending(slug, null);
          setPix(null);
          setStep('expired');
        }
      } catch {
        // Rede instável: a próxima consulta tenta de novo.
      }
    },
    [goToThankYou, slug],
  );

  const open = useCallback(
    (placement: string) => {
      const pending = loadPending(slug);
      if (pending) {
        setPix(pending);
        setStep('qr');
        void checkStatus(pending.id);
      } else if (step !== 'creating') {
        setStep('summary');
      }
      setError('');
      dialog.current?.showModal();
      if (ebook.live) track('InitiateCheckout', { ...ebook.pixel, num_items: 1, placement });
    },
    [checkStatus, step, slug, ebook],
  );

  // Botões da página (BuyTrigger) abrem a janela por evento.
  useEffect(() => {
    const onOpen = (e: Event) => open((e as CustomEvent<{ placement?: string }>).detail?.placement ?? 'unknown');
    window.addEventListener(EBOOK_CHECKOUT_EVENT, onOpen);
    return () => window.removeEventListener(EBOOK_CHECKOUT_EVENT, onOpen);
  }, [open]);

  // Quem volta do app do banco com um Pix pendente já pago vai direto ao download.
  useEffect(() => {
    const pending = loadPending(slug);
    if (pending) void checkStatus(pending.id);
  }, [checkStatus, slug]);

  // Consulta a cada 4 s com o QR aberto, e na hora em que a aba volta a ficar visível.
  useEffect(() => {
    if (step !== 'qr' || !pix) return;
    const poll = () => {
      if (document.visibilityState === 'visible') void checkStatus(pix.id);
    };
    const timer = window.setInterval(poll, POLL_MS);
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    document.addEventListener('visibilitychange', poll);
    return () => {
      window.clearInterval(timer);
      window.clearInterval(tick);
      document.removeEventListener('visibilitychange', poll);
    };
  }, [step, pix, checkStatus]);

  useEffect(() => {
    if (step === 'qr' && pix && new Date(pix.expiresAt).getTime() <= now) {
      savePending(slug, null);
      setPix(null);
      setStep('expired');
    }
  }, [now, pix, step, slug]);

  async function createPix() {
    setStep('creating');
    setError('');
    try {
      const res = await fetch('/api/pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: slug, email: email.trim() || undefined, utm: utmFromUrl() }),
      });
      const body = (await res.json()) as Partial<PendingPix> & { error?: string };
      if (!res.ok || !body.id || !body.brCode || !body.brCodeBase64 || !body.expiresAt) {
        throw new Error(body.error || 'Não deu para gerar o Pix agora. Tente de novo em instantes.');
      }
      const created = body as PendingPix;
      savePending(slug, created);
      setPix(created);
      setNow(Date.now());
      setStep('qr');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não deu para gerar o Pix agora.');
      setStep('summary');
    }
  }

  async function copyCode() {
    if (!pix) return;
    try {
      await navigator.clipboard.writeText(pix.brCode);
    } catch {
      const field = document.getElementById('pix-code') as HTMLTextAreaElement | null;
      field?.select();
      document.execCommand('copy');
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  const left = pix ? new Date(pix.expiresAt).getTime() - now : 0;
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
                <p className="mt-1 text-[14px] text-muted">
                  PDF · {ebook.pages} páginas · valores de outubro de 2026
                </p>
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

            <button type="button" onClick={copyCode} className={`${button} mt-5`}>
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
