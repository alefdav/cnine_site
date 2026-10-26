# Página de vendas: ebook "Como morar no Paraguai em 2026"

- **data:** 2026-10-26
- **status:** aprovado (estrutura); copy abaixo para revisão
- **rota:** `/morar-no-paraguai` (cnine_site)
- **preço:** R$ 17,90, só Pix (AbacatePay)
- **fonte de todo número:** `entregas/ebook-paraguai/dossie.md` (pesquisa de out/2026)

## Contexto

O Google Trends (Brasil, últimas 24 h, 2026-10-26) mostrou "grande aumento" em buscas como "como morar no paraguai", "como é morar no paraguai", "aluguel no paraguai", "o que precisa para morar no paraguai", "emprego no paraguai", "custo de vida no paraguai" e "morar no paraguai é bom". As buscas sobre Uruguai estão caindo (-20% e -70%).

O ebook ainda está sendo escrito. A página fica **pronta e oculta**. Quando o Alef mandar capa, link de checkout e número de páginas, os placeholders são trocados e a flag de lançamento é virada.

## Diagnóstico (Schwartz)

```
Consciência: 3, com parte em 2. A pessoa já sabe que dá para morar lá e procura
  "como", "o que precisa", "quanto custa". Quem busca "morar lá é bom?" ainda decide (2).
Sofisticação: 4. YouTube, blogs e consultorias de imigração já dizem "é fácil, só com RG",
  "custo de vida baixo", "imposto zero". Repetir a promessa não diferencia.
Mecanismo: cada valor tem data e fonte oficial, conferido depois do reajuste de 1º/7/2026,
  e o guia mostra os prazos e proibições que fazem o brasileiro perder dinheiro ou o direito.
  Fatos do dossiê: a Res. DNM 478/2026 mudou a taxa e muitos sites ainda mostram Gs. 2.230.040;
  a temporária não é prorrogada e a janela de 90 dias, se perdida, tira o direito ao acordo;
  a Lei 2532/2005 anula compra de terra rural por brasileiro a menos de 50 km da fronteira.
```

Teste da troca de marca: um blog genérico não consegue dizer "a taxa antiga ainda aparece em todo lugar, a nova é esta, com a resolução". Passa.

## Decisões

| decisão | escolha | por quê |
|---|---|---|
| ângulo | Paraguai na frente, Uruguai como comparativo | é onde a busca está subindo |
| título | "Como morar no Paraguai em 2026 usando o seu RG, sem passaporte" | "só com o seu RG" seria enganoso: a residência pede certidões apostiladas |
| estrutura | curta, modelo da v2 do ebook logístico | Clarity da v2: 88% no celular não passam da primeira tela; R$ 17,90 pede leitura de 2 a 3 min |
| casa | rota no cnine_site, mesmo pixel e Clarity | mais rápido de publicar; C9 COMPANY LTDA só no rodapé, sem autor |
| visual | próprio do tema (dossiê / guia de viagem), não o céu azul da C9 | a cara de "agência de IA" destoa do tema mudança |
| pré-lançamento | rascunho oculto com flag `live` | não vender o que ainda não existe |

## Regras de integridade (valem para toda a copy)

- Todo número tem data e fonte visível na página. Conversão em reais sempre com "≈" e a nota do câmbio de outubro de 2026.
- Nada de depoimento, contador, "pessoas vendo", estoque ou preço riscado. A simulação de 10/10 mostrou que urgência falsa vende menos e 98% percebem a pressão.
- Nada de "imposto zero" sem a ressalva da fonte da renda.
- Não é consultoria jurídica nem contábil, e a página diz isso.
- Sem travessão e sem jargão de marketing na copy.
- O que falta aparece como `[PREENCHER: ...]` visível no código e na página de rascunho.

## Copy, seção por seção

### 0. Primeira tela (vende sozinha no celular)

- Rótulo pequeno: `Guia em PDF · edição de outubro de 2026`
- **H1:** Como morar no Paraguai em 2026 usando o seu RG, sem passaporte
- **Subtítulo:** O passo a passo da residência, quanto custa viver em Assunção e os prazos que fazem brasileiro perder dinheiro. Com comparativo do Uruguai.
- Mockup da capa: `[PREENCHER: capa do ebook]` (até lá, uma capa tipográfica provisória com o título)
- **Botão:** Quero o guia por R$ 17,90
- Abaixo do botão: Pix · PDF na hora · 7 dias para pedir o dinheiro de volta
- Selo: Valores conferidos em fontes oficiais em outubro de 2026

Ordem no celular: rótulo → título → subtítulo → botão → linha de garantia → capa. O botão fica na primeira tela a 390 px.

### 1. Mudar é fácil. Errar também.

Lead: O Acordo de Residência do Mercosul abriu a porta. O problema está nos detalhes que os vídeos de 10 minutos pulam.

Cinco cartões, erro em negrito e custo embaixo:

1. **Pagar pela tabela velha.** Desde 1º de julho de 2026 a residência temporária custa Gs. 2.341.540 (≈ R$ 2.040). Muita página ainda mostra Gs. 2.230.040, o valor de antes do reajuste.
2. **Ser barrado no embarque.** O RG não vence, mas companhia aérea e fronteira recusam com frequência RG com mais de 10 anos de emissão.
3. **Perder o direito ao acordo.** A residência temporária vale 2 anos e não é prorrogada. A permanente só pode ser pedida nos 90 dias antes do vencimento. Passou do prazo, você sai do acordo e cai na lei geral.
4. **Comprar terra que a lei anula.** Brasileiro não pode ser dono de imóvel rural a menos de 50 km da fronteira paraguaia (Lei 2532/2005). O negócio é nulo.
5. **Pagar imposto em dois países.** Sem a Comunicação e a Declaração de Saída Definitiva na Receita Federal, você continua residente fiscal no Brasil.

Fecho: O guia mostra o caminho certo, com a data e a fonte de cada número.

### 2. Quanto custa morar em Assunção

| item | ≈ por mês ou por vez | fonte |
|---|---|---|
| Residência temporária Mercosul (uma vez) | R$ 2.040 (Gs. 2.341.540) | Migraciones, Res. 478/2026 |
| Aluguel de 1 quarto fora do centro | R$ 1.920 | Numbeo, out/2026 |
| Aluguel de 1 quarto no centro | R$ 3.170 | Numbeo, out/2026 |
| Gasto de uma pessoa, sem aluguel | R$ 3.040 | Numbeo, out/2026 |
| Salário mínimo | R$ 2.650 (Gs. 3.044.000) | Decreto 6225/2026 |

Nota: Conversão pelo câmbio de outubro de 2026 (R$ 1 ≈ Gs. 1.150). No guia: Ciudad del Este, Encarnación, bairros de Assunção e o orçamento de uma família.

### 3. O que precisa para morar no Paraguai

1. No Brasil: certidão de nascimento (e de casamento, se houver) e antecedentes criminais, tudo apostilado em cartório.
2. Entre no Paraguai com RG de menos de 10 anos ou CIN e guarde o comprovante de entrada.
3. Em Assunção, tire o antecedentes para estrangeiros na Polícia Nacional.
4. Dê entrada na Dirección Nacional de Migraciones e pague a taxa.
5. Receba o carnê de residência temporária, válido por 2 anos.
6. Entre o 21º e o 24º mês, peça a permanente e a cédula paraguaia.

Linha de apoio: No guia, cada passo tem a lista de documentos, o custo e o que conferir antes de sair de casa.

### 4. Paraguai ou Uruguai?

| | Paraguai | Uruguai |
|---|---|---|
| Residência para brasileiro | temporária de 2 anos, depois permanente | permanente direto |
| Custo da residência | ≈ R$ 4.580 no total | isenta |
| Apostila dos documentos | obrigatória | dispensada |
| Gasto de 1 pessoa, sem aluguel | ≈ R$ 3.040 | ≈ R$ 4.890 |
| Imposto sobre renda do exterior | 0% (sistema territorial)* | 12% para novos residentes |

\* Serviço prestado de dentro do Paraguai pode contar como renda local. O guia explica quando.

Dois blocos curtos:
- **Paraguai combina com** quem traz renda do Brasil (trabalho remoto, aposentadoria, aluguel) e tem orçamento enxuto.
- **Uruguai combina com** quem prioriza instituições, saúde e escola e aguenta custo acima de São Paulo.

### 5. O que tem dentro

Números em linha: `[PREENCHER: nº] páginas · 16 capítulos · checklist dos 90 dias · valores de outubro de 2026`

Lista recolhível "Ver os 16 capítulos" com os títulos do dossiê (Paraguai ou Uruguai? O teste de perfil; Documentos para entrar; Residência no Paraguai, passo a passo; Residência no Uruguai, passo a passo; Impostos e saída definitiva do Brasil; Quanto custa viver; Moradia: alugar e comprar; Trabalho, renda e empresa; Saúde; Escola, idioma, cultura e clima; Segurança e qualidade de vida; Banco, câmbio e envio de dinheiro; Como chegar, mudança e pets; Checklist dos 90 dias e erros comuns; O que mudou em 2026; Perguntas frequentes). `[CONFIRMAR: sumário final quando o ebook fechar]`

### 6. Para quem é

- **É para você se** está pesquisando a mudança e quer o caminho inteiro num lugar só; trabalha remoto, é aposentado ou vive de renda do Brasil; está comparando Paraguai e Uruguai com a família.
- **Não é para você se** precisa de parecer jurídico ou contábil do seu caso (o guia diz quando procurar um profissional local); procura vaga de emprego garantida; quer cidadania ou passaporte paraguaio.

### 7. De onde vêm os números

Texto: Cada valor do guia tem fonte e data. A prioridade é a fonte oficial: Dirección Nacional de Migraciones do Paraguai, gub.uy, Receita Federal, Banco Central do Brasil, Ministério do Trabalho do Uruguai e INE do Paraguai. Custo de vida vem da Numbeo, uma base colaborativa, e o guia avisa onde ela costuma errar. Onde as fontes divergem, o guia mostra as duas versões.

Aviso honesto: Leis e taxas mudam. Antes de pagar qualquer taxa, confira o valor no órgão oficial. O guia diz onde.

Identificação: Feito e vendido pela C9 COMPANY LTDA, CNPJ 39.710.160/0001-60 (vem de `LEGAL_NAME` e `LEGAL_ID`).

### 8. Garantia e pagamento

- **Garantia:** Não gostou? Peça o dinheiro de volta em até 7 dias depois da compra. Sem perguntas.
- **Como pedir:** pelo WhatsApp `[PREENCHER: prazo de devolução do Pix]`. Link do WhatsApp com mensagem pré-preenchida citando o guia.
- **Pix:** Você paga no app do banco e vai direto para a página de download do PDF.

### 9. Perguntas frequentes (recolhíveis)

1. **Tem muita coisa de graça no Google. Por que pagar?** Tem, espalhado e muitas vezes desatualizado: a taxa de residência mudou em 1º de julho e muita página ainda mostra o valor antigo. O guia junta o caminho inteiro, com data e fonte em cada número.
2. **Preciso de passaporte?** Não. Para entrar e para pedir a residência basta o RG com menos de 10 anos de emissão ou a CIN. O passaporte ajuda em banco e em voo com conexão fora do Mercosul.
3. **O guia fala do Uruguai também?** Sim: residência, custos, impostos e um comparativo lado a lado.
4. **E se a lei ou a taxa mudar?** Este é o guia de outubro de 2026 e cada valor mostra a data. Antes de pagar qualquer taxa, confira no órgão oficial; o guia diz onde. `[DECIDIR: compradores recebem a próxima edição de graça?]`
5. **Isso é consultoria?** Não. É um guia de pesquisa. Para impostos e compra de imóvel, o guia indica quando falar com um contador ou escrivão local.
6. **Como recebo?** Logo depois do Pix, você vai para a página de download do PDF.
7. **E se eu não gostar?** Você tem 7 dias para pedir o dinheiro de volta.

### 10. Fechamento

- **H2:** Antes de fazer as malas, saiba o prazo, a taxa e a regra.
- Resumo: `[PREENCHER: nº] páginas · 16 capítulos · valores de outubro de 2026`
- Botão: Quero o guia por R$ 17,90
- Abaixo: Pix · 7 dias para pedir o dinheiro de volta

### Barra fixa (celular, desde o carregamento)

`R$ 17,90` / `Pix · PDF na hora` + botão `Quero o guia`.

### Rodapé

Empresa e CNPJ, WhatsApp, links de `/termos` e `/privacidade`, e a nota: Valores aproximados, convertidos pelo câmbio de outubro de 2026. Leis e taxas mudam; confira no órgão oficial.

### Metadados

- `<title>`: Como morar no Paraguai em 2026 | Guia em PDF
- description: Passo a passo da residência Mercosul, custo de vida em Assunção e comparativo com o Uruguai. Valores de outubro de 2026. R$ 17,90 no Pix.

## Arquitetura

**Produto (`lib/meta-pixel.ts`):**

```ts
export const EBOOK_PARAGUAI = {
  content_ids: ['ebook-paraguai'],
  content_type: 'product',
  content_name: 'Como morar no Paraguai em 2026',
  value: 17.9,
  currency: 'BRL',
} as const;
export const EBOOK_PARAGUAI_CHECKOUT_URL = ''; // [PREENCHER: link da AbacatePay]
export const EBOOK_PARAGUAI_LIVE = false;      // vira true no lançamento
```

**Componentes de compra (refatoração pequena):** `BuyButton`, `StickyBar`, `UtmPassthrough` e `SalesTracking` passam a receber o produto e o link do checkout por prop, com o ebook logístico como padrão. As páginas atuais não mudam de comportamento.

**Rascunho oculto (`EBOOK_PARAGUAI_LIVE = false`):**
- `robots: noindex, nofollow` e fora de `app/sitemap.ts`.
- Com o checkout vazio, o botão não navega: aponta para `#checkout-pendente`, que é uma faixa visível no topo dizendo "Rascunho: checkout ainda não configurado".
- O pixel não dispara `ViewContent` nem `InitiateCheckout` enquanto a página não está no ar, para não sujar o público do pixel.

**Página:** `app/morar-no-paraguai/page.tsx` (Server Component) com o conteúdo em constantes no próprio arquivo, como na v2. Os componentes cliente ficam em `components/ebook/paraguai/` só se forem específicos (ex.: capa provisória).

**Visual:** tokens próprios da página em `app/globals.css`, num escopo `.lp-paraguai` (fundo papel, tinta escura, um acento quente, números em mono nas tabelas). Sem cor literal fora dos tokens. O tema claro fica travado como nas outras LPs (`.lp-lock`). Contraste AA, `prefers-reduced-motion` respeitado e nada de animação escondendo conteúdo.

**Clarity:** `page=ebook-paraguai`.

**Fora desta entrega (fica para o lançamento):** página de obrigado e PDF do guia; o Purchase fica para a página de obrigado ou para o webhook; termos que citem o guia (hoje `/termos` só cita o ebook logístico e cláusulas de IA, então precisam de uma linha genérica para os guias e uma cláusula de "conteúdo informativo, não é consultoria").

## Checklist do lançamento (o que o Alef manda)

- [ ] Capa do ebook (imagem)
- [ ] Link do checkout da AbacatePay
- [ ] Número de páginas e sumário final
- [ ] Prazo de devolução do Pix
- [ ] Decidir se compradores recebem a próxima edição
- [ ] Ajustar `/termos` para cobrir o guia
- [ ] Página de obrigado + PDF
- [ ] Virar `EBOOK_PARAGUAI_LIVE` e conferir o sitemap

## Como verificar

- `npx tsc --noEmit`, `npm run lint` e `npm run build` limpos.
- Playwright a 390 px: botão com preço visível sem rolar, sem rolagem horizontal, barra fixa presente.
- As páginas `/claude-no-adm-logistico` e `-v2` continuam com o mesmo link de checkout e os mesmos eventos (regressão da refatoração).
- HTML da rota com `noindex` e sitemap sem a rota.
