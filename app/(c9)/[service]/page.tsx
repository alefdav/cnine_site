import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/c9';
import { SERVICE_PAGES } from '@/lib/c9-services';
import { ServicePageView } from '@/components/c9/service-page';

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

function find(slug: string) {
  return (SERVICE_PAGES as Record<string, (typeof SERVICE_PAGES)[keyof typeof SERVICE_PAGES]>)[slug];
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const p = find((await params).service);
  if (!p) return {};
  return {
    title: { absolute: p.seoTitle },
    description: p.description,
    alternates: { canonical: `/${p.slug}` },
    openGraph: { type: 'website', locale: 'pt_BR', url: `/${p.slug}`, title: p.seoTitle, description: p.description },
    twitter: { card: 'summary_large_image', title: p.seoTitle, description: p.description },
  };
}

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const p = find((await params).service);
  if (!p) notFound();
  return <ServicePageView p={p} />;
}
