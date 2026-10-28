import type { Metadata } from 'next';
import { EBOOKS } from '@/lib/ebooks';
import { ThankYou } from '@/components/ebook/pix/thank-you';

/* Pós-compra do ebook Paraguai (conferência do Pix em components/ebook/pix/thank-you). */
export const metadata: Metadata = {
  title: { absolute: `Seu guia: ${EBOOKS.paraguai.shortName}` },
  description: 'Baixe o seu guia Paraguai ou Uruguai? e veja por onde começar.',
  robots: { index: false, follow: false },
};

const firstSteps = [
  { title: 'Comece pelo capítulo 1', body: 'O teste de perfil diz qual dos dois países combina com a sua renda e o seu plano.' },
  { title: 'Vá para a residência', body: 'Capítulo 3 para o Paraguai, capítulo 4 para o Uruguai. Separe os documentos antes de viajar.' },
  { title: 'Imprima o checklist', body: 'O capítulo 15 tem o que fazer antes de ir, nas primeiras duas semanas e até o 90º dia.' },
];

export default async function Page({ searchParams }: { searchParams: Promise<{ pix?: string | string[] }> }) {
  const raw = (await searchParams).pix;
  return (
    <ThankYou
      ebook="paraguai"
      pixId={Array.isArray(raw) ? raw[0] : raw}
      theme="lp-paraguai"
      includes="o checklist dos 90 dias"
      firstSteps={firstSteps}
    />
  );
}
