// Cifra o PDF do guia para o repo (que é público). Uso:
//   EBOOK_PARAGUAI_PDF_KEY=... node scripts/encrypt-ebook.mjs entregas/ebook-paraguai/Paraguai-ou-Uruguai-Guia-2026.pdf
// Formato do .enc: iv (12 bytes) + tag (16 bytes) + texto cifrado, AES-256-GCM.
import { createCipheriv, randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const [src, out = 'private/ebook-paraguai.pdf.enc'] = process.argv.slice(2);
const key = Buffer.from(process.env.EBOOK_PARAGUAI_PDF_KEY ?? '', 'base64');
if (!src || key.length !== 32) {
  console.error('Uso: EBOOK_PARAGUAI_PDF_KEY=<32 bytes em base64> node scripts/encrypt-ebook.mjs <pdf> [saida]');
  process.exit(1);
}

const iv = randomBytes(12);
const cipher = createCipheriv('aes-256-gcm', key, iv);
const body = Buffer.concat([cipher.update(readFileSync(src)), cipher.final()]);
writeFileSync(out, Buffer.concat([iv, cipher.getAuthTag(), body]));
console.log(`${out}: ${body.length} bytes cifrados`);
