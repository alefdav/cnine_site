import { EBOOK_EUA, EBOOK_PARAGUAI } from '@/lib/meta-pixel';

/*
  Registro dos guias vendidos com Pix na própria página. Só dado público:
  pode ir para o cliente. A chave da API e a do PDF ficam nas rotas de
  servidor. Um guia novo entra aqui, com o PDF cifrado em private/.
*/
export type EbookSlug = 'paraguai' | 'eua';

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
  /* Nome do arquivo que o comprador baixa */
  fileName: string;
  /* PDF cifrado em private/ (scripts/encrypt-ebook.mjs) */
  encryptedFile: string;
  cover: { src: string; width: number; height: number };
  salesPath: string;
  thankYouPath: string;
  /*
    Rascunho oculto enquanto false: noindex, fora do sitemap, faixa de
    rascunho e nenhum evento de compra no pixel. O checkout funciona se houver
    chave no ambiente.
  */
  live: boolean;
  pixel: typeof EBOOK_PARAGUAI | typeof EBOOK_EUA;
}

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
    fileName: 'Morar-nos-Estados-Unidos-Plano-B.pdf',
    encryptedFile: 'ebook-eua.pdf.enc',
    cover: { src: '/ebook-eua/capa.webp', width: 600, height: 852 },
    salesPath: '/morar-nos-estados-unidos',
    thankYouPath: '/obrigado-morar-nos-estados-unidos',
    live: false,
    pixel: EBOOK_EUA,
  },
};

export function ebookBySlug(slug: unknown): Ebook | undefined {
  return typeof slug === 'string' && slug in EBOOKS ? EBOOKS[slug as EbookSlug] : undefined;
}

export function ebookByExternalId(externalId: unknown): Ebook | undefined {
  return Object.values(EBOOKS).find((e) => e.externalId === externalId);
}

/* Pix expira em 30 min: tempo de abrir o app do banco sem pressa. */
export const PIX_EXPIRES_IN_SECONDS = 1800;

/* `pix_char_` + letras e números: o formato dos ids da AbacatePay. */
export const PIX_ID_PATTERN = /^pix_char_[A-Za-z0-9]{8,64}$/;

/* Botões da página (BuyTrigger) abrem a janela do Pix (PixCheckout) por este evento. */
export const EBOOK_CHECKOUT_EVENT = 'ebook:checkout';
