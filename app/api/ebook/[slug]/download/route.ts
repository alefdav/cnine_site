import { checkPurchase, readEbook } from '@/lib/ebook-file';
import { ebookBySlug } from '@/lib/ebooks';

/*
  Entrega o PDF só para Pix pago deste guia (/api/ebook/<slug>/download?pix=<id>).
  `?inline=1` abre no navegador em vez de baixar.
*/
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const ebook = ebookBySlug((await params).slug);
  if (!ebook) return new Response('Guia não encontrado.', { status: 404 });

  const url = new URL(request.url);
  const check = await checkPurchase(ebook, url.searchParams.get('pix'));

  if (check === 'error') return new Response('Não deu para conferir o pagamento agora. Tente de novo.', { status: 503 });
  if (check !== 'paid') return new Response('Pagamento não encontrado para este guia.', { status: 403 });

  try {
    const pdf = await readEbook(ebook);
    const disposition = url.searchParams.get('inline') === '1' ? 'inline' : 'attachment';
    return new Response(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': String(pdf.length),
        'Content-Disposition': `${disposition}; filename="${ebook.fileName}"`,
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex',
      },
    });
  } catch (err) {
    console.error(`[ebook-${ebook.slug}] download`, err instanceof Error ? err.message : err);
    return new Response('Não deu para abrir o arquivo agora. Fale com a gente no WhatsApp.', { status: 500 });
  }
}
