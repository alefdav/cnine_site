'use client';

import { useEffect } from 'react';
import { EBOOK_LOGISTICA, track, trackCustom, whenPixelReady } from '@/lib/meta-pixel';

const DEPTHS = [25, 50, 75] as const;

/*
  ViewContent ao abrir e ScrollDepth 25/50/75 (uma vez cada) na página de
  vendas de um ebook (padrão: o logístico). Com variante de teste ativa, todo
  evento leva `test_variant`; o título da primeira tela (teste A/B) vai sempre
  como `hero_headline`.
*/
type Product = { content_ids: readonly string[] } & Record<string, unknown>;

export function SalesTracking({
  variant,
  headline,
  product = EBOOK_LOGISTICA,
}: {
  variant?: string;
  headline?: string;
  product?: Product;
}) {
  useEffect(
    () =>
      whenPixelReady(() =>
        track('ViewContent', {
          ...product,
          ...(variant && { test_variant: variant }),
          ...(headline && { hero_headline: headline }),
        }),
      ),
    [variant, headline, product],
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
            content_ids: product.content_ids,
            ...(variant && { test_variant: variant }),
            ...(headline && { hero_headline: headline }),
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
  }, [variant, headline, product]);

  return null;
}
