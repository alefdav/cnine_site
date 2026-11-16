import type { Metadata } from 'next';
import { EbookThanks } from '@/components/c9/ebook/thanks';

/* Pós-compra da série completa: os 7 PDFs liberados pelo mesmo Pix. */
export const metadata: Metadata = {
  title: { absolute: 'Seus 7 livros: Do Zero ao Lançamento' },
  robots: { index: false, follow: false },
};

const firstSteps = [
  { title: 'Leia O Método primeiro', body: 'É o livro base: ideia, validação, versão mínima, cobrança e os primeiros clientes. Os outros partem dele.' },
  { title: 'Escolha uma trilha de construção', body: 'Com Lovable se você quer construir conversando. Com o Claude se quer controle sobre os arquivos.' },
  { title: 'Siga o plano de 30 dias', body: 'Cerca de uma hora por dia, do zero ao primeiro cliente. Use a Biblioteca de Prompts em cada etapa.' },
];

export default async function Page({ searchParams }: { searchParams: Promise<{ pix?: string | string[] }> }) {
  const raw = (await searchParams).pix;
  return <EbookThanks ebook="dz-serie" pixId={Array.isArray(raw) ? raw[0] : raw} firstSteps={firstSteps} />;
}
