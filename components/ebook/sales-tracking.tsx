'use client';

import { useEffect } from 'react';
import { EBOOK_LOGISTICA, track, trackCustom, whenPixelReady } from '@/lib/meta-pixel';

const DEPTHS = [25, 50, 75] as const;

/*
  ViewContent ao abrir e ScrollDepth 25/50/75 (uma vez cada) na página de
  vendas do ebook. Com variante de teste ativa, todo evento leva `test_variant`.
*/
export function SalesTracking({ variant }: { variant?: string }) {
  useEffect(
    () => whenPixelReady(() => track('ViewContent', { ...EBOOK_LOGISTICA, ...(variant && { test_variant: variant }) })),
    [variant],
  );

  useEffect(() => {
    const sent = new Set<number>();
    let frame = 0;

    const check = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;
      for (const depth of DEPTHS) {
        if (
          pct >= depth &&
          !sent.has(depth) &&
          trackCustom('ScrollDepth', {
            percent: depth,
            content_ids: EBOOK_LOGISTICA.content_ids,
            ...(variant && { test_variant: variant }),
          })
        ) {
          sent.add(depth);
        }
      }
      if (sent.size === DEPTHS.length) window.removeEventListener('scroll', onScroll);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [variant]);

  return null;
}
