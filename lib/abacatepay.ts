/*
  Cliente mínimo da API v2 da AbacatePay para o Pix transparente (QR code na
  própria página). A chave vem de ABACATEPAY_API_KEY e nunca vai para o
  navegador. Formatos conferidos com a chave de teste em 2026-10-26.
*/
const API = 'https://api.abacatepay.com/v2';

export type PixStatus =
  | 'PENDING'
  | 'PAID'
  | 'EXPIRED'
  | 'CANCELLED'
  | 'UNDER_DISPUTE'
  | 'REFUNDED'
  | 'REDEEMED'
  | 'APPROVED'
  | 'FAILED';

export interface Pix {
  id: string;
  amount: number;
  status: PixStatus;
  devMode: boolean;
  brCode: string;
  brCodeBase64: string;
  expiresAt: string;
  metadata?: Record<string, unknown>;
}

export interface PixUtm {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

export class AbacatePayError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

export function hasAbacatePayKey(): boolean {
  return Boolean(process.env.ABACATEPAY_API_KEY);
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const key = process.env.ABACATEPAY_API_KEY;
  if (!key) throw new AbacatePayError('ABACATEPAY_API_KEY ausente', 503);

  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...init?.headers },
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });
  const body = (await res.json().catch(() => null)) as { data?: T; error?: string | null } | null;
  if (!res.ok || !body?.data) {
    // Id desconhecido volta como 400 "Payment intent not found", não 404.
    const notFound = res.status === 404 || /not found/i.test(body?.error ?? '');
    throw new AbacatePayError(body?.error || `AbacatePay respondeu ${res.status}`, notFound ? 404 : 502);
  }
  return body.data;
}

export function createPix(input: {
  amount: number;
  description: string;
  expiresIn: number;
  metadata: Record<string, string>;
  utm?: PixUtm;
}): Promise<Pix> {
  const { utm, ...data } = input;
  return call<Pix>('/transparents/create', {
    method: 'POST',
    body: JSON.stringify({ method: 'PIX', data: { ...data, ...(utm && Object.keys(utm).length && { utm }) } }),
  });
}

/* Status leve: só id, status e expiração. */
export function checkPix(id: string): Promise<Pick<Pix, 'id' | 'status' | 'expiresAt'>> {
  return call(`/transparents/check?id=${encodeURIComponent(id)}`);
}

/* Pix completo, com valor e metadata: usado para liberar o download. */
export function getPix(id: string): Promise<Pix> {
  return call<Pix>(`/transparents/get?id=${encodeURIComponent(id)}`);
}
