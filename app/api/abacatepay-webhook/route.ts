import { createHmac, timingSafeEqual } from 'node:crypto';
import { AbacatePayError, getPix } from '@/lib/abacatepay';
import { ebookByExternalId, PIX_ID_PATTERN } from '@/lib/ebooks';
import { sendCapiPurchase } from '@/lib/meta-capi';

/*
  Webhook da AbacatePay (evento transparent.completed): manda o Purchase dos
  guias de lib/ebooks.ts para a API de Conversões do Meta.

  Autenticação dupla, como na documentação da AbacatePay: o segredo vai na
  URL (?webhookSecret=, igual a ABACATEPAY_WEBHOOK_SECRET) e o corpo vem
  assinado em X-Webhook-Signature (HMAC-SHA256 com a chave pública deles).

  O conteúdo do aviso não é confiado: a rota só tira dele o id do Pix e
  reconfere na API (pago, valor do guia, metadata do produto). Reenvios do
  mesmo aviso são inofensivos, porque o Meta deduplica pelo event_id.
*/

// Chave pública publicada em docs.abacatepay.com/pages/webhooks (não é segredo).
const ABACATEPAY_PUBLIC_KEY =
  't9dXRhHHo3yDEj5pVDYz0frf7q6bMKyMRmxxCPIPp3RCplBfXRxqlC6ZpiWmOqj4L63qEaeUOtrCI8P0VMUgo6iIga2ri9ogaHFs0WIIywSMg0q7RmBfybe1E5XJcfC4IW3alNqym0tXoAKkzvfEjZxV6bE0oG2zJrNNYmUCKZyV0KZ3JS8Votf9EAWWYdiDkMkpbMdPggfh1EqHlVkMiTady6jOR3hyzGEHrIz2Ret0xHKMbiqkr9HS1JhNHDX9';

const SITE_URL = 'https://cnine.company';

function safeEqual(a: string, b: string) {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

function validSignature(rawBody: string, signature: string | null) {
  if (!signature) return false;
  const expected = createHmac('sha256', ABACATEPAY_PUBLIC_KEY).update(Buffer.from(rawBody, 'utf8')).digest('base64');
  return safeEqual(expected, signature);
}

/* Acha o primeiro id de Pix (pix_char_...) em qualquer lugar do aviso. */
function findPixId(value: unknown, depth = 0): string | undefined {
  if (depth > 6 || value == null) return undefined;
  if (typeof value === 'string') return PIX_ID_PATTERN.test(value) ? value : undefined;
  if (typeof value !== 'object') return undefined;
  for (const item of Object.values(value as Record<string, unknown>)) {
    const found = findPixId(item, depth + 1);
    if (found) return found;
  }
  return undefined;
}

const str = (v: unknown) => (typeof v === 'string' && v ? v : undefined);

export async function POST(request: Request) {
  const secret = process.env.ABACATEPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[abacatepay-webhook] ABACATEPAY_WEBHOOK_SECRET ausente');
    return new Response('not configured', { status: 503 });
  }

  const url = new URL(request.url);
  const rawBody = await request.text();
  const urlSecret = url.searchParams.get('webhookSecret');
  if (urlSecret !== null && !safeEqual(urlSecret, secret)) {
    return new Response('unauthorized', { status: 401 });
  }
  if (!validSignature(rawBody, request.headers.get('x-webhook-signature'))) {
    console.warn('[abacatepay-webhook] assinatura inválida');
    return new Response('invalid signature', { status: 401 });
  }
  /*
    O cadastro guarda a URL sem o segredo e a documentação diz que a
    AbacatePay o acrescenta na entrega. Se não vier, a assinatura basta:
    nada é confiado no corpo (o Pix é reconferido na API), e um 401 aqui
    faria a AbacatePay desistir do aviso sem tentar de novo.
  */
  if (urlSecret === null) console.warn('[abacatepay-webhook] aviso sem webhookSecret na URL, aceito pela assinatura');

  let payload: { id?: string; event?: string; devMode?: boolean; data?: unknown };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response('bad json', { status: 400 });
  }

  const tag = `[abacatepay-webhook] ${payload.event} ${payload.id ?? ''}`;
  if (payload.event !== 'transparent.completed') {
    console.log(`${tag} ignorado`);
    return new Response('ignored', { status: 200 });
  }

  const pixId = findPixId(payload.data);
  if (!pixId) {
    // Formato do aviso não documentado: registra só as chaves para ajustar a busca.
    const keys = payload.data && typeof payload.data === 'object' ? Object.keys(payload.data) : [];
    console.error(`${tag} sem id de Pix; chaves de data: ${keys.join(',')}`);
    return new Response('no pix id', { status: 200 });
  }

  if (payload.devMode) {
    console.log(`${tag} devMode, ${pixId}: assinatura e segredo ok, sem envio ao Meta`);
    return new Response('dev ok', { status: 200 });
  }

  let pix;
  try {
    pix = await getPix(pixId);
  } catch (err) {
    const status = err instanceof AbacatePayError && err.status === 404 ? 200 : 502;
    console.error(`${tag} ${pixId}: falha ao conferir na AbacatePay (${err instanceof Error ? err.message : err})`);
    return new Response('lookup failed', { status });
  }

  const meta = (pix.metadata ?? {}) as Record<string, unknown>;
  const ebook = ebookByExternalId(meta.product);
  if (!ebook || pix.status !== 'PAID' || pix.amount !== ebook.priceCents) {
    console.log(`${tag} ${pixId}: não é compra paga do guia (status ${pix.status}), ignorado`);
    return new Response('not ours', { status: 200 });
  }

  const paidAt = Date.parse(pix.updatedAt ?? '') || Date.now();
  const result = await sendCapiPurchase({
    eventId: pix.id,
    eventTime: Math.floor(paidAt / 1000),
    value: ebook.pixel.value,
    contentIds: ebook.pixel.content_ids,
    contentName: ebook.pixel.content_name,
    sourceUrl: `${SITE_URL}${ebook.thankYouPath}`,
    email: str(meta.email),
    ip: str(meta.ip),
    userAgent: str(meta.ua),
    fbp: str(meta.fbp),
    fbc: str(meta.fbc),
  });

  console.log(`${tag} ${pixId} ${ebook.slug}: CAPI ${result.ok ? 'ok' : 'falhou'} (${result.detail})`);
  // Falha no Meta devolve 502 para a AbacatePay tentar de novo mais tarde.
  return new Response(result.ok ? 'ok' : 'capi failed', { status: result.ok ? 200 : 502 });
}
