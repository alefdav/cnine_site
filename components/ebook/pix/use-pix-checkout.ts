'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { track } from '@/lib/meta-pixel';
import { EBOOK_CHECKOUT_EVENT, EBOOKS, type EbookSlug } from '@/lib/ebooks';

/*
  Lógica da janela de compra de um guia (lib/ebooks.ts): resumo + e-mail
  opcional → QR do Pix → consulta o status a cada 4 s → página de obrigado
  quando o Pix cai. A aparência fica com quem usa o hook: PixCheckout (páginas
  antigas, Tailwind) e PixSheet (sistema c9).

  O Pix gerado fica no localStorage: no celular, abrir o app do banco pode
  matar a aba, e quem volta precisa achar o mesmo QR (e ser levado ao
  download se já pagou), não um Pix novo.
*/

export interface PendingPix {
  id: string;
  brCode: string;
  brCodeBase64: string;
  expiresAt: string;
  /* Valor cobrado (com order bump) e o obrigado do que foi comprado (série, no upgrade). */
  amount?: number;
  thankYouPath?: string;
}

/* Order bump: nada, o livro complementar, ou a troca pela série. */
export type Extra = 'none' | 'bump' | 'upgrade';

export type Step = 'summary' | 'creating' | 'qr' | 'expired';

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

export function formatLeft(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

export function usePixCheckout(slug: EbookSlug) {
  const ebook = EBOOKS[slug];
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>('summary');
  const [pix, setPix] = useState<PendingPix | null>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [extra, setExtra] = useState<Extra>('none');

  const goToThankYou = useCallback(
    (paid: PendingPix) => {
      savePending(slug, null);
      window.location.assign(`${paid.thankYouPath ?? ebook.thankYouPath}?pix=${encodeURIComponent(paid.id)}`);
    },
    [slug, ebook.thankYouPath],
  );

  const checkStatus = useCallback(
    async (pending: PendingPix) => {
      try {
        const res = await fetch(`/api/pix/${encodeURIComponent(pending.id)}`, { cache: 'no-store' });
        if (!res.ok) return;
        const { status } = (await res.json()) as { status: string };
        if (status === 'PAID') goToThankYou(pending);
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
        void checkStatus(pending);
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
    if (pending) void checkStatus(pending);
  }, [checkStatus, slug]);

  // Consulta a cada 4 s com o QR aberto, e na hora em que a aba volta a ficar visível.
  useEffect(() => {
    if (step !== 'qr' || !pix) return;
    const poll = () => {
      if (document.visibilityState === 'visible') void checkStatus(pix);
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
        body: JSON.stringify({
          product: slug,
          email: email.trim() || undefined,
          utm: utmFromUrl(),
          ...(extra === 'bump' && { bump: true }),
          ...(extra === 'upgrade' && { upgrade: true }),
        }),
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

  async function copyCode(fieldId: string) {
    if (!pix) return;
    try {
      await navigator.clipboard.writeText(pix.brCode);
    } catch {
      const field = document.getElementById(fieldId) as HTMLTextAreaElement | null;
      field?.select();
      document.execCommand('copy');
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  const close = () => dialog.current?.close();
  const left = pix ? new Date(pix.expiresAt).getTime() - now : 0;

  // Total do pedido com a escolha do order bump (o servidor recalcula; isto é só o que a tela mostra).
  const bumpEbook = ebook.bump ? EBOOKS[ebook.bump] : undefined;
  const upgradeEbook = ebook.upgrade ? EBOOKS[ebook.upgrade] : undefined;
  const totalCents =
    pix?.amount ??
    (extra === 'upgrade' && upgradeEbook
      ? upgradeEbook.priceCents
      : ebook.priceCents + (extra === 'bump' && bumpEbook ? bumpEbook.priceCents : 0));

  return {
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
  };
}
