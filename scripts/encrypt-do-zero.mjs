// Cifra os 7 PDFs da série "Do Zero ao Lançamento" para private/ (o repo é público).
// Uso, com a pasta pdf/ do zip da série:
//   EBOOK_PDF_KEY=... node scripts/encrypt-do-zero.mjs <pasta-com-os-pdfs>
// Mesmo formato de scripts/encrypt-ebook.mjs: iv (12) + tag (16) + texto cifrado, AES-256-GCM.
// O nome de saída casa com `encryptedFile` em lib/ebooks.ts (ebook-do-zero-<livro>.pdf.enc).
import { createCipheriv, randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const BOOKS = [
  '01-o-metodo',
  '02-com-lovable',
  '03-com-o-claude',
  '04-colocando-no-ar',
  '05-identificando-tendencias',
  '06-memoria-obsidian-ia',
  '07-biblioteca-de-prompts',
];

const [dir] = process.argv.slice(2);
const key = Buffer.from(process.env.EBOOK_PDF_KEY ?? process.env.EBOOK_PARAGUAI_PDF_KEY ?? '', 'base64');
if (!dir || key.length !== 32) {
  console.error('Uso: EBOOK_PDF_KEY=<32 bytes em base64> node scripts/encrypt-do-zero.mjs <pasta-com-os-pdfs>');
  process.exit(1);
}

for (const book of BOOKS) {
  const src = path.join(dir, `do-zero-ao-lancamento-${book}.pdf`);
  const out = `private/ebook-do-zero-${book.slice(3)}.pdf.enc`;
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const body = Buffer.concat([cipher.update(readFileSync(src)), cipher.final()]);
  writeFileSync(out, Buffer.concat([iv, cipher.getAuthTag(), body]));
  console.log(`${out}: ${body.length} bytes cifrados`);
}
