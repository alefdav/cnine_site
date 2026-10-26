import { AbacatePayError, createPix, type PixUtm } from '@/lib/abacatepay';
import { EBOOK_PARAGUAI_PRODUCT, PIX_EXPIRES_IN_SECONDS } from '@/lib/ebook-paraguai';

/*
  Cria o Pix do ebook Paraguai. O preço sai daqui, nunca do navegador. Sem
  objeto `customer` (a API exige nome, e-mail, CPF e celular juntos): o e-mail
  opcional vai no metadata, só para o suporte achar a compra.
*/

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const UTM_KEYS = ['source', 'medium', 'campaign', 'content', 'term'] as const;

function readUtm(raw: unknown): PixUtm {
  const utm: PixUtm = {};
  if (!raw || typeof raw !== 'object') return utm;
  for (const key of UTM_KEYS) {
    const value = (raw as Record<string, unknown>)[key];
    if (typeof value === 'string' && value.trim()) utm[key] = value.trim().slice(0, 100);
  }
  return utm;
}

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {}

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (email && !EMAIL.test(email)) {
    return Response.json({ error: 'Confira o e-mail ou deixe o campo em branco.' }, { status: 400 });
  }

  try {
    const pix = await createPix({
      amount: EBOOK_PARAGUAI_PRODUCT.priceCents,
      description: EBOOK_PARAGUAI_PRODUCT.shortName,
      expiresIn: PIX_EXPIRES_IN_SECONDS,
      metadata: { product: EBOOK_PARAGUAI_PRODUCT.externalId, ...(email && { email }) },
      utm: readUtm(body.utm),
    });
    return Response.json(
      { id: pix.id, brCode: pix.brCode, brCodeBase64: pix.brCodeBase64, expiresAt: pix.expiresAt },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (err) {
    console.error('[pix] create', err instanceof Error ? err.message : err);
    const status = err instanceof AbacatePayError && err.status === 503 ? 503 : 502;
    return Response.json({ error: 'Não deu para gerar o Pix agora. Tente de novo em instantes.' }, { status });
  }
}
