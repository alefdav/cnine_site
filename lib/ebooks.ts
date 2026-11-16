import { EBOOK_EUA, EBOOK_PARAGUAI, pixelProduct, type PixelProduct } from '@/lib/meta-pixel';

/*
  Registro dos guias vendidos com Pix na própria página. Só dado público:
  pode ir para o cliente. A chave da API e a do PDF ficam nas rotas de
  servidor. Um guia novo entra aqui, com o PDF cifrado em private/.

  Um pacote (`parts`) não tem arquivo próprio: o Pix do pacote libera o
  download de cada guia da lista. Um Pix com order bump (metadata.bump) libera
  também o livro do bump. Quem decide o que um Pix comprou é resolvePurchase.
*/
export type EbookSlug =
  | 'paraguai'
  | 'eua'
  | 'dz-serie'
  | 'dz-metodo'
  | 'dz-lovable'
  | 'dz-claude'
  | 'dz-no-ar'
  | 'dz-tendencias'
  | 'dz-obsidian'
  | 'dz-prompts';

export interface Ebook {
  slug: EbookSlug;
  /* metadata.product do Pix e externalId do produto na AbacatePay */
  externalId: string;
  name: string;
  shortName: string;
  priceCents: number;
  priceLabel: string;
  pages: number;
  chapters: number;
  /* Linha do resumo da compra, embaixo do nome (janela do Pix). */
  checkoutLine: string;
  /* Nome do arquivo que o comprador baixa */
  fileName: string;
  /* PDF cifrado em private/ (scripts/encrypt-ebook.mjs). Pacote não tem. */
  encryptedFile?: string;
  /* Pacote: os guias que o Pix dele libera. */
  parts?: EbookSlug[];
  /*
    Order bump no checkout: o livro complementar, a preço cheio, ou a troca
    pela série (upgrade). O pacote não tem bump.
  */
  bump?: EbookSlug;
  upgrade?: EbookSlug;
  cover: { src: string; width: number; height: number };
  salesPath: string;
  thankYouPath: string;
  /*
    Rascunho oculto enquanto false: noindex, fora do sitemap, faixa de
    rascunho e nenhum evento de compra no pixel. O checkout funciona se houver
    chave no ambiente.
  */
  live: boolean;
  pixel: PixelProduct;
}

/*
  Série "Do Zero ao Lançamento" (7 livros, conferidos em novembro de 2026).
  Páginas em app/(c9)/do-zero-ao-lancamento, texto em lib/do-zero.ts.
  Preço de cada livro e do pacote: só aqui.
*/
const DZ_EDITION = 'conferido em novembro de 2026';
const DZ_BASE = '/do-zero-ao-lancamento';

function dz(
  slug: EbookSlug,
  path: string,
  file: string,
  name: string,
  priceCents: number,
  pages: number,
  chapters: number,
  bump: EbookSlug,
): Ebook {
  const externalId = `ebook-do-zero-${path}-2026`;
  const fullName = `Do Zero ao Lançamento: ${name}`;
  return {
    slug,
    externalId,
    name: fullName,
    shortName: name,
    priceCents,
    priceLabel: formatBRL(priceCents),
    pages,
    chapters,
    checkoutLine: `PDF · ${pages} páginas · ${DZ_EDITION}`,
    fileName: `Do-Zero-ao-Lancamento-${file}.pdf`,
    encryptedFile: `ebook-do-zero-${path}.pdf.enc`,
    cover: { src: `/do-zero/capa-${path}.webp`, width: 600, height: 750 },
    salesPath: `${DZ_BASE}/${path}`,
    thankYouPath: `${DZ_BASE}/${path}/obrigado`,
    live: false,
    pixel: pixelProduct(externalId, fullName, priceCents),
    bump,
    upgrade: 'dz-serie',
  };
}

const DZ_PARTS: EbookSlug[] = ['dz-metodo', 'dz-lovable', 'dz-claude', 'dz-no-ar', 'dz-tendencias', 'dz-obsidian', 'dz-prompts'];

export const EBOOKS: Record<EbookSlug, Ebook> = {
  // produto prod_uyJ56LPA3n5ZL2HyxcCLKQFm na AbacatePay
  paraguai: {
    slug: 'paraguai',
    externalId: 'ebook-paraguai-uruguai-2026',
    name: 'Paraguai ou Uruguai? O Guia Definitivo do Brasileiro que Quer se Mudar em 2026',
    shortName: 'Paraguai ou Uruguai? Guia 2026',
    priceCents: 1790,
    priceLabel: 'R$ 17,90',
    pages: 48,
    chapters: 16,
    checkoutLine: 'PDF · 48 páginas · valores de outubro de 2026',
    fileName: 'Paraguai-ou-Uruguai-Guia-2026.pdf',
    encryptedFile: 'ebook-paraguai.pdf.enc',
    cover: { src: '/ebook-paraguai/capa.webp', width: 600, height: 852 },
    salesPath: '/morar-no-paraguai',
    thankYouPath: '/obrigado-morar-no-paraguai',
    live: true,
    pixel: EBOOK_PARAGUAI,
  },
  // produto prod_urwrnabLTCuYwzfZPWk5nkbj na AbacatePay
  eua: {
    slug: 'eua',
    externalId: 'ebook-eua-2026',
    name: 'Morar nos Estados Unidos (Coleção Plano B)',
    shortName: 'Morar nos EUA (Plano B)',
    priceCents: 2790,
    priceLabel: 'R$ 27,90',
    pages: 54,
    chapters: 19,
    checkoutLine: 'PDF · 54 páginas · valores de outubro de 2026',
    fileName: 'Morar-nos-Estados-Unidos-Plano-B.pdf',
    encryptedFile: 'ebook-eua.pdf.enc',
    cover: { src: '/ebook-eua/capa.webp', width: 600, height: 852 },
    salesPath: '/morar-nos-estados-unidos',
    thankYouPath: '/obrigado-morar-nos-estados-unidos',
    live: true,
    pixel: EBOOK_EUA,
  },

  // último argumento: o livro complementar oferecido no order bump
  'dz-metodo': dz('dz-metodo', 'o-metodo', 'O-Metodo', 'O Método', 2499, 31, 7, 'dz-prompts'),
  'dz-lovable': dz('dz-lovable', 'com-lovable', 'Com-Lovable', 'Com Lovable', 1799, 24, 5, 'dz-no-ar'),
  'dz-claude': dz('dz-claude', 'com-o-claude', 'Com-o-Claude', 'Com o Claude', 1799, 20, 5, 'dz-obsidian'),
  'dz-no-ar': dz('dz-no-ar', 'colocando-no-ar', 'Colocando-no-Ar', 'Colocando no Ar', 1799, 19, 6, 'dz-claude'),
  'dz-tendencias': dz('dz-tendencias', 'identificando-tendencias', 'Identificando-Tendencias', 'Identificando Tendências', 1799, 19, 6, 'dz-metodo'),
  'dz-obsidian': dz('dz-obsidian', 'memoria-obsidian-ia', 'Memoria-Obsidian-IA', 'Memória com Obsidian + IA', 1799, 23, 7, 'dz-prompts'),
  'dz-prompts': dz('dz-prompts', 'biblioteca-de-prompts', 'Biblioteca-de-Prompts', 'Biblioteca de Prompts', 1299, 25, 7, 'dz-metodo'),
  'dz-serie': {
    slug: 'dz-serie',
    externalId: 'ebook-do-zero-serie-completa-2026',
    name: 'Do Zero ao Lançamento: a série completa',
    shortName: 'Do Zero ao Lançamento (7 livros)',
    priceCents: 7499,
    priceLabel: 'R$ 74,99',
    pages: 161,
    chapters: 43,
    checkoutLine: `7 livros em PDF · 161 páginas · ${DZ_EDITION}`,
    fileName: '',
    parts: DZ_PARTS,
    cover: { src: '/do-zero/capa-o-metodo.webp', width: 600, height: 750 },
    salesPath: DZ_BASE,
    thankYouPath: `${DZ_BASE}/obrigado`,
    live: false,
    pixel: pixelProduct('ebook-do-zero-serie-completa-2026', 'Do Zero ao Lançamento: a série completa', 7499),
  },
};

/* Os 7 livros da série, na ordem de leitura. */
export const DZ_BOOKS: Ebook[] = DZ_PARTS.map((s) => EBOOKS[s]);

/* Quanto custam os 7 comprados um a um (a âncora honesta do pacote). */
export const DZ_SEPARATE_CENTS = DZ_BOOKS.reduce((sum, e) => sum + e.priceCents, 0);

export function formatBRL(cents: number): string {
  return `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;
}

export function ebookBySlug(slug: unknown): Ebook | undefined {
  return typeof slug === 'string' && slug in EBOOKS ? EBOOKS[slug as EbookSlug] : undefined;
}

export function ebookByExternalId(externalId: unknown): Ebook | undefined {
  return Object.values(EBOOKS).find((e) => e.externalId === externalId);
}

export interface Purchase {
  /* O produto do Pix (metadata.product): o livro, ou a série no upgrade. */
  main: Ebook;
  /* O livro do order bump, quando o Pix o inclui. */
  bump?: Ebook;
  /* Tudo o que o Pix libera para baixar. */
  files: EbookSlug[];
  valueCents: number;
}

/*
  O que um Pix comprou, a partir do metadata gravado pelo servidor ao criar o
  Pix e do valor pago. O valor precisa bater exatamente com o produto (mais o
  bump, se houver), senão não é compra de guia.
*/
export function resolvePurchase(metadata: Record<string, unknown> | undefined, amount: number): Purchase | undefined {
  const main = ebookByExternalId(metadata?.product);
  if (!main) return undefined;
  const bumpOffer = main.bump ? EBOOKS[main.bump] : undefined;
  const bump = bumpOffer && metadata?.bump === bumpOffer.externalId ? bumpOffer : undefined;
  const valueCents = main.priceCents + (bump?.priceCents ?? 0);
  if (amount !== valueCents) return undefined;
  const files = main.parts ?? [main.slug];
  return { main, bump, files: bump ? [...files, bump.slug] : files, valueCents };
}

/* Pix expira em 30 min: tempo de abrir o app do banco sem pressa. */
export const PIX_EXPIRES_IN_SECONDS = 1800;

/* `pix_char_` + letras e números: o formato dos ids da AbacatePay. */
export const PIX_ID_PATTERN = /^pix_char_[A-Za-z0-9]{8,64}$/;

/* Botões da página (BuyTrigger) abrem a janela do Pix (PixCheckout) por este evento. */
export const EBOOK_CHECKOUT_EVENT = 'ebook:checkout';
