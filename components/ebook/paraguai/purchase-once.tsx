'use client';

import { useEffect } from 'react';
import { EBOOK_PARAGUAI, track, whenPixelReady } from '@/lib/meta-pixel';

/*
  Purchase do ebook Paraguai, só depois de o servidor confirmar o Pix pago.
  eventID = id do Pix: serve para deduplicar quando a API de Conversões
  entrar, e o localStorage impede contar de novo no refresh.
*/
export function PurchaseOnce({ pixId }: { pixId: string }) {
  useEffect(() => {
    const key = `purchase_${pixId}`;
    try {
      if (window.localStorage.getItem(key)) return;
    } catch {}

    return whenPixelReady(() => {
      try {
        window.localStorage.setItem(key, '1');
      } catch {}
      track('Purchase', { ...EBOOK_PARAGUAI, num_items: 1 }, { eventID: pixId });
    });
  }, [pixId]);

  return null;
}
