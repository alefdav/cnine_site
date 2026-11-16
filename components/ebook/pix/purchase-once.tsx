'use client';

import { useEffect } from 'react';
import { track, whenPixelReady } from '@/lib/meta-pixel';
import { EBOOKS, type EbookSlug } from '@/lib/ebooks';

/*
  Purchase de um guia (lib/ebooks.ts), só depois de o servidor confirmar o Pix pago.
  eventID = id do Pix: serve para deduplicar quando a API de Conversões
  entrar, e o localStorage impede contar de novo no refresh.
*/
export function PurchaseOnce({
  pixId,
  ebook,
  bump,
}: {
  pixId: string;
  ebook: EbookSlug;
  /* Livro do order bump, quando o Pix o inclui: soma no valor e nos content_ids. */
  bump?: EbookSlug;
}) {
  useEffect(() => {
    const key = `purchase_${pixId}`;
    try {
      if (window.localStorage.getItem(key)) return;
    } catch {}

    return whenPixelReady(() => {
      try {
        window.localStorage.setItem(key, '1');
      } catch {}
      const main = EBOOKS[ebook].pixel;
      const extra = bump ? EBOOKS[bump].pixel : undefined;
      track(
        'Purchase',
        extra
          ? { ...main, content_ids: [...main.content_ids, ...extra.content_ids], value: main.value + extra.value, num_items: 2 }
          : { ...main, num_items: 1 },
        { eventID: pixId },
      );
    });
  }, [pixId, ebook, bump]);

  return null;
}
