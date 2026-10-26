'use client';

import type { ReactNode } from 'react';
import { PARAGUAI_CHECKOUT_EVENT } from '@/lib/ebook-paraguai';

/* Todo botão de compra da página: abre a janela do Pix (components/ebook/paraguai/pix-checkout). */
export function BuyTrigger({ children, className, placement }: { children: ReactNode; className?: string; placement: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(PARAGUAI_CHECKOUT_EVENT, { detail: { placement } }))}
      className={className}
    >
      {children}
    </button>
  );
}
