import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DZ_PATHS, dzBook } from '@/lib/do-zero';
import { EBOOKS } from '@/lib/ebooks';
import { EbookThanks } from '@/components/c9/ebook/thanks';

/* Pós-compra de cada livro da série (o Pix é conferido em components/c9/ebook/thanks). */
export const dynamicParams = false;

export function generateStaticParams() {
  return DZ_PATHS.map((livro) => ({ livro }));
}

export async function generateMetadata({ params }: { params: Promise<{ livro: string }> }): Promise<Metadata> {
  const b = dzBook((await params).livro);
  return {
    title: { absolute: `Seu livro: ${b ? EBOOKS[b.slug].shortName : 'Do Zero ao Lançamento'}` },
    robots: { index: false, follow: false },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ livro: string }>;
  searchParams: Promise<{ pix?: string | string[] }>;
}) {
  const b = dzBook((await params).livro);
  if (!b) notFound();
  const raw = (await searchParams).pix;
  return <EbookThanks ebook={b.slug} pixId={Array.isArray(raw) ? raw[0] : raw} firstSteps={b.firstSteps} />;
}
