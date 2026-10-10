import type { Metadata } from 'next';
import { SalesPage, parseVariant } from '@/components/ebook/sales-page';

const TITLE = 'Cruze a planilha do WMS com a da transportadora em 2 minutos, sem PROCV';
const DESCRIPTION =
  'Guia em PDF com 12 pedidos prontos para copiar e colar no Claude, para o administrativo logístico. Funciona mesmo se você nunca usou IA. R$ 17,90 no Pix.';

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Claude no ADM Logístico` },
  description: DESCRIPTION,
  alternates: { canonical: '/claude-no-adm-logistico' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/claude-no-adm-logistico',
    siteName: 'C9 Company',
    title: TITLE,
    description: DESCRIPTION,
  },
};

/* ?v=urgencia | dopamina | combo liga as variantes de teste; sem ele, a página de verdade. */
export default async function Page({ searchParams }: { searchParams: Promise<{ v?: string | string[] }> }) {
  const { v } = await searchParams;
  return <SalesPage variant={parseVariant(v)} />;
}
