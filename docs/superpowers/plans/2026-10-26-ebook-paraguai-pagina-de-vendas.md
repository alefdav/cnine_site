# Ebook Paraguai: página de vendas com Pix transparente. Plano de implementação

> Executado em sequência na mesma sessão (o Alef pediu tudo de uma vez). Spec: `docs/superpowers/specs/2026-10-26-ebook-paraguai-pagina-de-vendas-design.md`.

**Goal:** página `/morar-no-paraguai` em rascunho oculto, com Pix gerado na própria página, página de obrigado e download protegido do PDF.

**Architecture:** Server Components para as páginas. Rotas de servidor em `app/api/` falam com a API v2 da AbacatePay com `ABACATEPAY_API_KEY`. Um único componente cliente de checkout abre a janela do Pix, chamado por botões espalhados pela página via evento. O PDF fica cifrado no repo (o repositório é público) e é decifrado no servidor só para Pix pago.

**Tech Stack:** Next.js 16 App Router, Tailwind v4, lucide-react, Node `crypto` (AES-256-GCM), API AbacatePay v2.

## Fatos verificados antes do plano (2026-10-26, chave de dev)

- `POST /v2/transparents/create` aceita `{ method: "PIX", data: { amount, description, expiresIn, metadata, utm } }` sem `customer`.
- `GET /v2/transparents/check?id=` devolve `{ id, status, expiresAt }`.
- `GET /v2/transparents/get?id=` devolve também `amount`, `metadata`, `devMode`, `brCode`, `brCodeBase64`.
- O repo `alefdav/cnine_site` é **público** (github.com responde 200). Por isso o PDF não pode entrar em claro no git.
- O PDF tem 48 páginas e 16 capítulos, com sumário real na página 4.

## Arquivos

| arquivo | responsabilidade |
|---|---|
| `lib/ebook-paraguai.ts` | constantes do produto (nome, preço em centavos, externalId, flag `LIVE`), seguras para o cliente |
| `lib/meta-pixel.ts` | `EBOOK_PARAGUAI` para os eventos |
| `lib/abacatepay.ts` | cliente da API v2, só no servidor (`createPix`, `checkPix`, `getPix`) |
| `lib/ebook-file.ts` | decifra o PDF (AES-256-GCM, chave `EBOOK_PARAGUAI_PDF_KEY`) |
| `scripts/encrypt-ebook.mjs` | cifra o PDF de `entregas/` para `private/ebook-paraguai.pdf.enc` |
| `app/api/pix/route.ts` | POST: cria o Pix (preço fixo no servidor, e-mail opcional no metadata, UTMs) |
| `app/api/pix/[id]/route.ts` | GET: status |
| `app/api/ebook/paraguai/download/route.ts` | GET: confere pago + valor + produto e entrega o PDF |
| `components/ebook/paraguai/pix-checkout.tsx` | janela de compra: resumo, e-mail, QR, copiar, consulta de status |
| `components/ebook/paraguai/buy-trigger.tsx` | botão que abre a janela (evento `paraguai:checkout`) |
| `components/ebook/paraguai/sticky-bar.tsx` | barra fixa do celular |
| `components/ebook/paraguai/purchase-once.tsx` | Purchase com eventID igual ao id do Pix, uma vez por Pix |
| `components/ebook/sales-tracking.tsx` | aceita `product` (padrão: ebook logístico) |
| `app/morar-no-paraguai/page.tsx` | página de vendas |
| `app/obrigado-morar-no-paraguai/page.tsx` | confere o Pix no servidor e mostra o download |
| `app/globals.css` | tokens `.lp-paraguai` |
| `next.config.ts` | `outputFileTracingIncludes` do PDF cifrado |
| `public/ebook-paraguai/*.webp` | capa e páginas de amostra |
| `app/termos/page.tsx` | termos genéricos para os guias, mais a cláusula de conteúdo informativo |

Desvio da spec: o `StickyBar` e o `BuyButton` do ebook logístico ficam intocados. A página do Paraguai usa gatilho próprio, porque o botão abre a janela do Pix em vez de um link.

## Tarefas

1. Assets: mover o PDF para `entregas/ebook-paraguai/`, cifrar para `private/`, renderizar a capa e 3 páginas em webp.
2. `.env.local` com `ABACATEPAY_API_KEY` (dev) e `EBOOK_PARAGUAI_PDF_KEY`.
3. `lib/` (produto, cliente AbacatePay, decifrar o PDF).
4. Rotas de API, testadas com curl: criar, consultar e, depois de simular o pagamento pelo MCP, baixar (200) e não pago (403).
5. Componentes do checkout.
6. Página de vendas, página de obrigado e tokens de CSS.
7. Termos.
8. Verificação: `tsc`, `lint`, `build` e Playwright a 390 px com o fluxo completo (gerar Pix → simular pagamento → obrigado → download). Regressão das páginas do ebook logístico.
9. Commit, `EBOOK_PARAGUAI_PDF_KEY` na Vercel (produção e preview), push e conferência em produção (`noindex`; checkout responde erro controlado sem a chave da AbacatePay).
10. Vault: sessão, histórico, hub, pendências, decisões, features e ambiente.
