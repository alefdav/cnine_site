'use client';

import type { ReactNode } from 'react';
import { EBOOK_CHECKOUT_EVENT } from '@/lib/ebooks';

/* Todo botão de compra da página: abre a janela do Pix (components/ebook/pix/pix-checkout). */
export function BuyTrigger({ children, className, placement }: { children: ReactNode; className?: string; placement: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(EBOOK_CHECKOUT_EVENT, { detail: { placement } }))}
      className={className}
    >
      {children}
    </button>
  );
}
