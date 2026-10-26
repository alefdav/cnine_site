import { createDecipheriv } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { AbacatePayError, getPix } from '@/lib/abacatepay';
import { EBOOK_PARAGUAI_PRODUCT, PIX_ID_PATTERN } from '@/lib/ebook-paraguai';

/*
  O repo é público, então o PDF pago fica cifrado em private/ (AES-256-GCM,
  gerado por scripts/encrypt-ebook.mjs) e só é decifrado aqui, com a chave
  EBOOK_PARAGUAI_PDF_KEY. Formato: iv (12) + tag (16) + texto cifrado.
*/
const ENCRYPTED_PDF = path.join(process.cwd(), 'private', 'ebook-paraguai.pdf.enc');

export async function readEbookParaguai(): Promise<Buffer> {
  const key = Buffer.from(process.env.EBOOK_PARAGUAI_PDF_KEY ?? '', 'base64');
  if (key.length !== 32) throw new Error('EBOOK_PARAGUAI_PDF_KEY ausente ou inválida');

  const blob = await readFile(ENCRYPTED_PDF);
  const decipher = createDecipheriv('aes-256-gcm', key, blob.subarray(0, 12));
  decipher.setAuthTag(blob.subarray(12, 28));
  return Buffer.concat([decipher.update(blob.subarray(28)), decipher.final()]);
}

/* `error`: a AbacatePay não respondeu; vale tentar de novo, não é compra inválida. */
export type PurchaseCheck = 'paid' | 'pending' | 'invalid' | 'error';

/*
  O id do Pix é a chave de acesso ao PDF: só libera Pix pago, no valor do guia
  e criado para este produto (metadata.product). Outro Pix da mesma conta,
  mesmo pago, não abre o arquivo.
*/
export async function checkParaguaiPurchase(pixId: string | undefined | null): Promise<PurchaseCheck> {
  if (!pixId || !PIX_ID_PATTERN.test(pixId)) return 'invalid';
  try {
    const pix = await getPix(pixId);
    const ours = pix.amount === EBOOK_PARAGUAI_PRODUCT.priceCents && pix.metadata?.product === EBOOK_PARAGUAI_PRODUCT.externalId;
    if (!ours) return 'invalid';
    return pix.status === 'PAID' ? 'paid' : 'pending';
  } catch (err) {
    return err instanceof AbacatePayError && err.status === 404 ? 'invalid' : 'error';
  }
}
