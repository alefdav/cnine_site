'use client';

import { useEffect } from 'react';
import { EBOOK_LOGISTICA, pixelReady, track } from '@/lib/meta-pixel';

const STORAGE_KEY = 'purchase_ebook_logistica';

/*
  Purchase do ebook, uma vez por navegador: o eventID fica no localStorage
  e, se já existir, refresh ou volta para a página não contam de novo.
  O snippet do pixel é afterInteractive e pode chegar depois deste efeito,
  então espera `window.fbq` existir antes de disparar.
*/
export function PurchasePixel() {
  useEffect(() => {
    let alreadyTracked = false;
    try {
      alreadyTracked = window.localStorage.getItem(STORAGE_KEY) !== null;
    } catch {}
    if (alreadyTracked) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (!pixelReady()) {
        if (tries >= 100) window.clearInterval(timer);
        return;
      }
      window.clearInterval(timer);

      const eventID = crypto.randomUUID();
      try {
        window.localStorage.setItem(STORAGE_KEY, eventID);
      } catch {}
      track('Purchase', { ...EBOOK_LOGISTICA, num_items: 1 }, { eventID });
    }, 100);

    return () => window.clearInterval(timer);
  }, []);

  return null;
}
