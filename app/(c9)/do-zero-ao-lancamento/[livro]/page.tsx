import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DZ_PATHS, dzBook } from '@/lib/do-zero';
import { EBOOKS } from '@/lib/ebooks';
import { BookPageView } from '@/components/c9/ebook/book-page';

/* As 7 páginas de livro da série, estáticas (lib/do-zero.ts). */
export const dynamicParams = false;

export function generateStaticParams() {
  return DZ_PATHS.map((livro) => ({ livro }));
}

export async function generateMetadata({ params }: { params: Promise<{ livro: string }> }): Promise<Metadata> {
  const b = dzBook((await params).livro);
  if (!b) return {};
  const P = EBOOKS[b.slug];
  const title = `${b.h1[0]} ${b.h1[1]}`;
  return {
    title: { absolute: b.seoTitle },
    description: b.description,
    alternates: { canonical: P.salesPath },
    robots: P.live ? undefined : { index: false, follow: false },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: P.salesPath,
      siteName: 'C9 Company',
      title,
      description: b.description,
      images: [{ url: P.cover.src, width: P.cover.width, height: P.cover.height }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ livro: string }> }) {
  const b = dzBook((await params).livro);
  if (!b) notFound();
  return <BookPageView b={b} />;
}
