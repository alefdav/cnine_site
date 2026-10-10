# Página de vendas: o que ela precisa ter

Guia aplicado ao ebook **"Claude no ADM Logístico"** (PDF, 34 páginas, 12 pedidos prontos, R$ 17,90 via Pix).

Contexto: o anúncio já gera cliques baratos (R$ 0,15 a R$ 0,25), mas o clique cai direto no checkout. A página entra entre o anúncio e o checkout para fazer o que o checkout não faz: explicar, provar e convencer.

---

## Princípios antes da estrutura

1. **Continuidade com o anúncio.** A primeira tela precisa repetir a promessa do gancho que trouxe a pessoa. Quem clicou em "Saia no horário sem PROCV" tem que ler isso no topo, não outra coisa.
2. **Celular primeiro.** Quase todo o tráfego vem de Reels e Stories. Texto curto, fonte grande, botão grande, página leve (menos de 2 segundos para abrir).
3. **Um único objetivo.** Nenhum menu, nenhum link para outras páginas, nenhum rodapé cheio. Só o botão de compra, repetido.
4. **Mostrar o produto.** Ebook barato vende quando a pessoa vê o que vai receber. Prints de páginas valem mais que adjetivos.
5. **Ticket baixo = página curta.** Para R$ 17,90 não precisa de carta de vendas gigante. Leitura total de 1 a 2 minutos.

---

## Estrutura, de cima para baixo

### 1. Primeira dobra (o que aparece sem rolar)

É a parte mais importante: a maioria decide aqui.

- **Título com a promessa do anúncio.** Ex.: *"Pare de perder a tarde no PROCV: aprenda a pedir para a IA cruzar suas planilhas de logística."*
- **Subtítulo concreto.** Ex.: *"Guia em PDF com 12 pedidos prontos para copiar e colar: WMS × transportadora, pedidos atrasados, auditoria de frete CT-e e relatório semanal."*
- **Imagem do produto.** Capa do ebook em mockup (celular ou tablet), não só uma capa chapada.
- **Botão de compra visível.** Texto de ação + preço: *"Quero o guia por R$ 17,90"*.
- **Linha de segurança abaixo do botão.** *"Pagamento via Pix · acesso imediato ao PDF"*.

### 2. A dor (reconhecimento)

3 a 4 frases curtas que descrevem o dia do administrativo logístico. A pessoa precisa pensar "sou eu".

- Duas planilhas que não batem e uma tarde inteira de PROCV.
- Fatura de frete conferida CT-e por CT-e, na mão.
- Relatório da semana montado na sexta às 18h.

### 3. A virada (a ideia nova)

Uma frase que explica por que existe uma saída: *"A diferença não é saber mais Excel. É saber o que pedir para a IA, com as regras certas."*

Aqui cabe um **antes × depois** visual: um print de duas planilhas bagunçadas ao lado da tabela pronta que a IA devolve.

### 4. O que tem dentro (prova de conteúdo)

A seção que mais pesa para ebook.

- **Lista dos 12 pedidos prontos**, com nome claro de cada um (ex.: "Cruzar planilha do WMS com a da transportadora").
- **3 a 4 prints de páginas reais** do PDF, com legenda curta.
- **Números do produto:** 34 páginas, 12 pedidos, telas de exemplo, linguagem sem jargão.

### 5. Para quem é (e para quem não é)

- **É para:** assistente/analista administrativo de logística, CD, transportadora, quem vive em planilha.
- **Não é para:** quem procura curso de programação ou automação avançada.

Dizer para quem não é aumenta a confiança de quem é.

### 6. Prova social

Use só prova **real**. Nada de depoimento inventado.

- Prints de comentários e reações dos anúncios (já houve curtidas no Instagram).
- Mensagens de compradores, com permissão (peça ao primeiro comprador um retorno curto).
- Enquanto não houver depoimentos: mostre o **autor** (quem fez, por que entende do assunto) e o número de pedidos testados.

### 7. Oferta e preço

- Preço em destaque: **R$ 17,90**.
- Ancoragem honesta: comparar com o custo de uma tarde de trabalho perdida, não com um "preço cheio" falso.
- Reforço do que a pessoa recebe: PDF + 12 pedidos + acesso imediato.
- Botão de compra de novo.

### 8. Garantia

Reduz o risco percebido e costuma aumentar a conversão em ticket baixo.

- Ex.: *"Se o guia não te ajudar, me chama no WhatsApp em até 7 dias que eu devolvo o seu Pix."*
- Lembrete legal: compras on-line já têm direito de arrependimento de 7 dias pelo CDC. Transformar isso em garantia explícita só deixa claro o que já vale.

### 9. Perguntas frequentes (quebra de objeção)

4 a 6 perguntas curtas:

- **Como recebo o PDF?** (explicar exatamente: e-mail e/ou WhatsApp logo após o Pix)
- **Preciso pagar alguma IA?** (responder com honestidade se a versão gratuita serve)
- **Funciona com o sistema que eu uso?** (WMS, ERP, planilhas em geral)
- **Preciso saber programar?** (não)
- **E se eu não gostar?** (garantia)

### 10. Chamada final

Repetir a promessa em uma frase + botão + linha de segurança (Pix · acesso imediato).

---

## Elementos técnicos (não pule)

- **Pixel do Meta na página** com o evento `ViewContent` ao carregar e `InitiateCheckout` no clique do botão. Isso dá sinal para o Meta otimizar antes mesmo da compra.
- **Evento de compra pelo servidor.** Com Pix, muita gente não volta para a página de obrigado. O `Purchase` deve sair do webhook do Abacate Pay para a API de Conversões.
- **Entrega automática do PDF.** O mesmo webhook envia o PDF por e-mail (e/ou WhatsApp) assim que o Pix é confirmado. Não depender da página de obrigado.
- **UTMs no link do anúncio** para saber qual gancho (C1, C2, C3) trouxe cada venda.
- **Velocidade.** Imagens comprimidas (WebP), sem vídeo pesado no topo, sem pop-ups.
- **Botão sempre à vista no celular** (barra fixa no rodapé com preço e "Comprar").
- **Página de obrigado** com o link do PDF e instrução do que fazer primeiro, como reforço, não como único meio de entrega.

---

## O que evitar

- Contador regressivo falso ou "últimas unidades" de um PDF.
- Depoimentos inventados ou números de alunos que não existem.
- Texto longo demais para um produto de R$ 17,90.
- Promessas de resultado garantido ("economize 10 horas por semana") sem base.
- Uso de marcas de terceiros (logos de Excel, Claude, WMS) que possam parecer endosso.
- Vários botões levando para lugares diferentes.

---

## Como medir se a página está funcionando

| Etapa | Métrica | Referência inicial para ticket baixo |
|---|---|---|
| Anúncio → página | Visualizações da página ÷ cliques no link | acima de 70% |
| Página → checkout | Cliques no botão ÷ visualizações | 10% a 25% |
| Checkout → venda | Vendas ÷ checkouts iniciados | 30% a 60% (Pix) |
| Resultado | Custo por venda | abaixo de R$ 17,90 para empatar |

As referências são pontos de partida, não metas garantidas. Ajuste com os seus próprios números depois de umas 300 a 500 visitas.

---

## Checklist rápido antes de publicar

- [ ] Título repete a promessa do anúncio que mais converte (hoje, o C1 "Contraste")
- [ ] Mockup do ebook na primeira dobra
- [ ] Botão com preço visível sem rolar
- [ ] Lista dos 12 pedidos + 3 a 4 prints reais
- [ ] Para quem é / não é
- [ ] Prova social real (ou autor, enquanto não houver depoimentos)
- [ ] Garantia escrita
- [ ] FAQ com "como recebo o PDF"
- [ ] Pixel com ViewContent e InitiateCheckout
- [ ] Webhook: entrega do PDF + Purchase via API de Conversões
- [ ] Testado no celular (abre rápido, botão fixo funciona)
- [ ] Link do anúncio trocado do checkout para a página, com UTMs