import { createDecipheriv } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { AbacatePayError, getPix } from '@/lib/abacatepay';
import { PIX_ID_PATTERN, resolvePurchase, type Ebook, type Purchase } from '@/lib/ebooks';

/*
  O repo é público, então o PDF pago fica cifrado em private/ (AES-256-GCM,
  gerado por scripts/encrypt-ebook.mjs) e só é decifrado aqui. Todos os guias
  usam a mesma chave: EBOOK_PDF_KEY, ou EBOOK_PARAGUAI_PDF_KEY, o nome antigo.
  Formato: iv (12) + tag (16) + texto cifrado.
*/
export async function readEbook(ebook: Ebook): Promise<Buffer> {
  if (!ebook.encryptedFile) throw new Error(`${ebook.slug} não tem arquivo próprio (pacote)`);
  const key = Buffer.from(process.env.EBOOK_PDF_KEY ?? process.env.EBOOK_PARAGUAI_PDF_KEY ?? '', 'base64');
  if (key.length !== 32) throw new Error('EBOOK_PDF_KEY ausente ou inválida');

  const blob = await readFile(path.join(process.cwd(), 'private', ebook.encryptedFile));
  const decipher = createDecipheriv('aes-256-gcm', key, blob.subarray(0, 12));
  decipher.setAuthTag(blob.subarray(12, 28));
  return Buffer.concat([decipher.update(blob.subarray(28)), decipher.final()]);
}

/* `error`: a AbacatePay não respondeu; vale tentar de novo, não é compra inválida. */
export type PurchaseCheck = 'paid' | 'pending' | 'invalid' | 'error';

/*
  O id do Pix é a chave de acesso ao PDF: só libera Pix pago, no valor exato
  do que foi comprado (resolvePurchase em lib/ebooks.ts), e só os arquivos
  dessa compra: o próprio guia, os guias do pacote e o livro do order bump.
  Outro Pix da mesma conta, mesmo pago, não abre o arquivo.
*/
export async function inspectPurchase(
  ebook: Ebook,
  pixId: string | undefined | null,
): Promise<{ status: PurchaseCheck; purchase?: Purchase }> {
  if (!pixId || !PIX_ID_PATTERN.test(pixId)) return { status: 'invalid' };
  try {
    const pix = await getPix(pixId);
    const purchase = resolvePurchase(pix.metadata, pix.amount);
    const covers = purchase && (purchase.main.slug === ebook.slug || purchase.files.includes(ebook.slug));
    if (!covers) return { status: 'invalid' };
    return { status: pix.status === 'PAID' ? 'paid' : 'pending', purchase };
  } catch (err) {
    return { status: err instanceof AbacatePayError && err.status === 404 ? 'invalid' : 'error' };
  }
}

export async function checkPurchase(ebook: Ebook, pixId: string | undefined | null): Promise<PurchaseCheck> {
  return (await inspectPurchase(ebook, pixId)).status;
}
