'use client';

import { useEffect, useState } from 'react';
import { BuyButton } from './buy-button';

interface StickyBuyProps {
  heroId: string;
  closingId: string;
  variant?: string;
}

/*
  Barra de compra fixa no rodapé: aparece quando o botão da primeira tela já
  ficou para trás e some quando o fechamento (que tem o próprio botão) entra.
*/
export function StickyBuy({ heroId, closingId, variant }: StickyBuyProps) {
  const [pastHero, setPastHero] = useState(false);
  const [atClosing, setAtClosing] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const closing = document.getElementById(closingId);
    if (!hero || !closing || typeof IntersectionObserver === 'undefined') return;

    const heroObs = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
    const closingObs = new IntersectionObserver(([e]) => setAtClosing(e.isIntersecting));
    heroObs.observe(hero);
    closingObs.observe(closing);
    return () => {
      heroObs.disconnect();
      closingObs.disconnect();
    };
  }, [heroId, closingId]);

  const visible = pastHero && !atClosing;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-background/95 px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden ${visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'}`}
    >
      <BuyButton variant={variant} placement="sticky" className="buy-pulse flex h-12 w-full items-center justify-center rounded-full bg-primary [--pulse:var(--primary)] text-base font-bold text-background active:translate-y-px">
        Quero o guia · R$ 17,90
      </BuyButton>
    </div>
  );
}
