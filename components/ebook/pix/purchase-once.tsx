'use client';

import { useEffect } from 'react';
import { track, whenPixelReady } from '@/lib/meta-pixel';
import { EBOOKS, type EbookSlug } from '@/lib/ebooks';

/*
  Purchase de um guia (lib/ebooks.ts), só depois de o servidor confirmar o Pix pago.
  eventID = id do Pix: serve para deduplicar quando a API de Conversões
  entrar, e o localStorage impede contar de novo no refresh.
*/
export function PurchaseOnce({ pixId, ebook }: { pixId: string; ebook: EbookSlug }) {
  useEffect(() => {
    const key = `purchase_${pixId}`;
    try {
      if (window.localStorage.getItem(key)) return;
    } catch {}

    return whenPixelReady(() => {
      try {
        window.localStorage.setItem(key, '1');
      } catch {}
      track('Purchase', { ...EBOOKS[ebook].pixel, num_items: 1 }, { eventID: pixId });
    });
  }, [pixId, ebook]);

  return null;
}
