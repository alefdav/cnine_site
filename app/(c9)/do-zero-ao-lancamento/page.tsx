import type { Metadata } from 'next';
import { DZ_SERIES } from '@/lib/do-zero';
import { EBOOKS } from '@/lib/ebooks';
import { SeriesPageView } from '@/components/c9/ebook/series-page';

/* Página de venda da série Do Zero ao Lançamento (7 ebooks num Pix só). */
const P = EBOOKS['dz-serie'];
const OG_TITLE = 'Do Zero ao Lançamento: tire a ideia do papel com IA, sem programar';

export const metadata: Metadata = {
  title: { absolute: DZ_SERIES.seoTitle },
  description: DZ_SERIES.description,
  alternates: { canonical: P.salesPath },
  robots: P.live ? undefined : { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: P.salesPath,
    siteName: 'C9 Company',
    title: OG_TITLE,
    description: DZ_SERIES.description,
    images: [{ url: '/do-zero/og-serie.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: OG_TITLE, description: DZ_SERIES.description, images: ['/do-zero/og-serie.jpg'] },
};

export default function Page() {
  return <SeriesPageView />;
}
