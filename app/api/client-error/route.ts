/*
  Recebe os erros de JavaScript enviados pelo captador do <head>
  (lib/error-beacon.ts) e grava cada um como uma linha JSON nos logs da
  Vercel, com o prefixo [client-error] para filtrar. Não guarda nada além
  disso e nunca devolve erro ao navegador.
*/

const MAX_BYTES = 8 * 1024;

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max) : '');
const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (!raw || raw.length > MAX_BYTES) return new Response(null, { status: 204 });

    const data = JSON.parse(raw) as Record<string, unknown>;
    const entry = {
      type: str(data.type, 30),
      kind: str(data.kind, 20),
      message: str(data.message, 300),
      file: str(data.file, 300),
      line: num(data.line),
      col: num(data.col),
      stack: str(data.stack, 2000),
      page: str(data.page, 200),
      ref: str(data.ref, 100),
      inApp: data.inApp === true,
      ua: str(data.ua, 300),
    };
    console.error('[client-error]', JSON.stringify(entry));
  } catch {
    // corpo inválido: ignora em silêncio
  }
  return new Response(null, { status: 204 });
}
