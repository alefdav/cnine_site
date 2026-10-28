import { AbacatePayError, checkPix } from '@/lib/abacatepay';
import { PIX_ID_PATTERN } from '@/lib/ebooks';

/* Status do Pix para a janela de compra, consultado a cada poucos segundos. */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!PIX_ID_PATTERN.test(id)) return Response.json({ error: 'id inválido' }, { status: 400 });

  try {
    const pix = await checkPix(id);
    return Response.json({ status: pix.status }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    const status = err instanceof AbacatePayError && err.status === 404 ? 404 : 502;
    return Response.json({ error: 'status indisponível' }, { status });
  }
}
