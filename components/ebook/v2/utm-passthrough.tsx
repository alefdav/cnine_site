'use client';

import { useEffect } from 'react';
import { EBOOK_LOGISTICA_CHECKOUT_URL } from '@/lib/meta-pixel';

const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

/*
  Repassa as UTMs da URL da página para todo link do checkout, para a venda
  chegar à AbacatePay com a origem do anúncio. O link aceita parâmetros extras
  (testado: responde 200 com ?utm_*).
*/
export function UtmPassthrough() {
  useEffect(() => {
    const here = new URLSearchParams(window.location.search);
    const utms = KEYS.filter((k) => here.get(k));
    if (!utms.length) return;

    document.querySelectorAll<HTMLAnchorElement>(`a[href^="${EBOOK_LOGISTICA_CHECKOUT_URL}"]`).forEach((a) => {
      const url = new URL(a.href);
      for (const k of utms) url.searchParams.set(k, here.get(k)!);
      a.href = url.toString();
    });
  }, []);

  return null;
}
