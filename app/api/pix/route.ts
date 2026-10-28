import { AbacatePayError, createPix, type PixUtm } from '@/lib/abacatepay';
import { EBOOKS, ebookBySlug, PIX_EXPIRES_IN_SECONDS } from '@/lib/ebooks';

/*
  Cria o Pix de um guia (body.product = slug em lib/ebooks.ts; sem ele, o
  Paraguai, primeiro guia). O preço sai daqui, nunca do navegador. Sem
  objeto `customer` (a API exige nome, e-mail, CPF e celular juntos): o e-mail
  opcional vai no metadata, só para o suporte achar a compra.
*/

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const UTM_KEYS = ['source', 'medium', 'campaign', 'content', 'term'] as const;

/*
  Sinais para a API de Conversões do Meta casar a venda com o clique no
  anúncio (cookies do pixel, IP e navegador). Ficam no metadata do Pix e o
  webhook os usa quando o pagamento cai. Nada disso vai para o navegador.
*/
function metaSignals(request: Request): Record<string, string> {
  const cookies = Object.fromEntries(
    (request.headers.get('cookie') ?? '')
      .split(';')
      .map((c) => c.trim().split('='))
      .filter(([k, v]) => k && v)
      .map(([k, ...v]) => [k, v.join('=')]),
  );
  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim();
  const ua = request.headers.get('user-agent') ?? '';
  const signals: Record<string, string> = {};
  if (cookies._fbp) signals.fbp = cookies._fbp.slice(0, 120);
  if (cookies._fbc) signals.fbc = cookies._fbc.slice(0, 300);
  if (ip) signals.ip = ip.slice(0, 64);
  if (ua) signals.ua = ua.slice(0, 300);
  return signals;
}

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

  const ebook = body.product === undefined ? EBOOKS.paraguai : ebookBySlug(body.product);
  if (!ebook) return Response.json({ error: 'Guia não encontrado.' }, { status: 400 });

  try {
    const pix = await createPix({
      amount: ebook.priceCents,
      description: ebook.shortName,
      expiresIn: PIX_EXPIRES_IN_SECONDS,
      metadata: { product: ebook.externalId, ...(email && { email }), ...metaSignals(request) },
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
