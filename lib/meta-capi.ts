import { createHash } from 'node:crypto';
import { META_PIXEL_ID } from '@/lib/meta-pixel';

/*
  API de Conversões do Meta: o Purchase sai do servidor quando a AbacatePay
  confirma o Pix, mesmo que o comprador feche a aba antes da página de
  obrigado. O event_id é o id do Pix, o mesmo eventID do Purchase do
  navegador, então o Meta conta uma compra só. Token em META_CAPI_TOKEN.
*/
const GRAPH = 'https://graph.facebook.com/v26.0';

export interface CapiPurchase {
  eventId: string;
  eventTime: number; // segundos desde 1970
  value: number;
  contentIds: readonly string[];
  contentName: string;
  sourceUrl: string;
  email?: string;
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
}

const sha256 = (value: string) => createHash('sha256').update(value.trim().toLowerCase()).digest('hex');

export async function sendCapiPurchase(p: CapiPurchase): Promise<{ ok: boolean; detail: string }> {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return { ok: false, detail: 'META_CAPI_TOKEN ausente' };

  const userData: Record<string, unknown> = {};
  if (p.email) userData.em = [sha256(p.email)];
  if (p.ip) userData.client_ip_address = p.ip;
  if (p.userAgent) userData.client_user_agent = p.userAgent;
  if (p.fbp) userData.fbp = p.fbp;
  if (p.fbc) userData.fbc = p.fbc;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: 'Purchase',
        event_time: p.eventTime,
        event_id: p.eventId,
        action_source: 'website',
        event_source_url: p.sourceUrl,
        user_data: userData,
        custom_data: {
          currency: 'BRL',
          value: p.value,
          content_ids: p.contentIds,
          content_type: 'product',
          content_name: p.contentName,
          num_items: 1,
        },
      },
    ],
  };
  // Código de "Testar eventos" do Gerenciador de Eventos, só enquanto se testa.
  if (process.env.META_CAPI_TEST_EVENT_CODE) body.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE;

  try {
    const res = await fetch(`${GRAPH}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
    const json = (await res.json().catch(() => null)) as { events_received?: number; error?: { message?: string } } | null;
    if (!res.ok) return { ok: false, detail: json?.error?.message ?? `HTTP ${res.status}` };
    return { ok: true, detail: `events_received=${json?.events_received ?? '?'}` };
  } catch (err) {
    return { ok: false, detail: err instanceof Error ? err.message : 'falha de rede' };
  }
}
