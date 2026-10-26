/*
  Ebook "Paraguai ou Uruguai?" (produto prod_uyJ56LPA3n5ZL2HyxcCLKQFm na
  AbacatePay). Só dado público: pode ir para o cliente. A chave da API e a do
  PDF ficam nas rotas de servidor.
*/
export const EBOOK_PARAGUAI_PRODUCT = {
  externalId: 'ebook-paraguai-uruguai-2026',
  name: 'Paraguai ou Uruguai? O Guia Definitivo do Brasileiro que Quer se Mudar em 2026',
  shortName: 'Paraguai ou Uruguai? Guia 2026',
  priceCents: 1790,
  priceLabel: 'R$ 17,90',
  pages: 48,
  chapters: 16,
  fileName: 'Paraguai-ou-Uruguai-Guia-2026.pdf',
} as const;

/*
  Rascunho oculto enquanto false: noindex, fora do sitemap, faixa de rascunho
  e nenhum evento de compra no pixel. O checkout funciona se houver chave no
  ambiente (com a chave de teste, dá para testar o fluxo inteiro).
*/
export const EBOOK_PARAGUAI_LIVE = false;

/* Pix expira em 30 min: tempo de abrir o app do banco sem pressa. */
export const PIX_EXPIRES_IN_SECONDS = 1800;

/* `pix_char_` + letras e números: o formato dos ids da AbacatePay. */
export const PIX_ID_PATTERN = /^pix_char_[A-Za-z0-9]{8,64}$/;

export const PARAGUAI_CHECKOUT_EVENT = 'paraguai:checkout';
