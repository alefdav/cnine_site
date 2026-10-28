import type { Metadata } from 'next';
import { EBOOKS } from '@/lib/ebooks';
import { ThankYou } from '@/components/ebook/pix/thank-you';

/* Pós-compra do ebook EUA (conferência do Pix em components/ebook/pix/thank-you). */
export const metadata: Metadata = {
  title: { absolute: `Seu guia: ${EBOOKS.eua.shortName}` },
  description: 'Baixe o seu guia Morar nos Estados Unidos e veja por onde começar.',
  robots: { index: false, follow: false },
};

const firstSteps = [
  { title: 'Ache a sua rota no capítulo 3', body: 'A tabela das 15 rotas mostra para quem cada uma serve, quanto custa e quanto demora.' },
  {
    title: 'Leia o capítulo 9 antes de falar com agência',
    body: 'São as 10 perguntas para fazer antes de assinar qualquer contrato. O capítulo 15 mostra os golpes mais comuns.',
  },
  { title: 'Monte o seu plano de 90 dias', body: 'O capítulo 16 divide documentos, finanças e logística mês a mês, com checklist.' },
];

export default async function Page({ searchParams }: { searchParams: Promise<{ pix?: string | string[] }> }) {
  const raw = (await searchParams).pix;
  return (
    <ThankYou
      ebook="eua"
      pixId={Array.isArray(raw) ? raw[0] : raw}
      theme="lp-eua"
      includes="o plano de 90 dias"
      firstSteps={firstSteps}
    />
  );
}
