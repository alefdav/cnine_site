'use client';

import type { ReactNode } from 'react';
import { EBOOK_LOGISTICA, EBOOK_LOGISTICA_CHECKOUT_URL, track } from '@/lib/meta-pixel';

interface BuyButtonProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /* Variante de teste ativa (?v=), enviada como `test_variant` no evento. */
  variant?: string;
  /* De onde veio o clique (hero, sticky, closing, exit), para comparar botões. */
  placement?: string;
}

/* Todo botão de compra da página: leva ao Pix da AbacatePay e marca InitiateCheckout. */
export function BuyButton({ children, className, id, variant, placement }: BuyButtonProps) {
  return (
    <a
      id={id}
      href={EBOOK_LOGISTICA_CHECKOUT_URL}
      onClick={() =>
        track('InitiateCheckout', {
          ...EBOOK_LOGISTICA,
          num_items: 1,
          ...(variant && { test_variant: variant }),
          ...(placement && { placement }),
        })
      }
      className={className}
    >
      {children}
    </a>
  );
}
