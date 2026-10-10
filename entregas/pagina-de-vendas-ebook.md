# Página de vendas — "Claude no ADM Logístico"

Especificação completa da página que fica entre o anúncio e o checkout.
Base: simulações do synBe Lite de 08 a 10/10/2026 (ebook, objeções, primeira tela) e decisões do Alef em 10/10. O que ainda depende de checagem está marcado como **[a confirmar]**.

**Decisões já tomadas:** título único para todos os anúncios · entrega automática pela página de obrigado · nada sobre o autor na página (só a empresa no rodapé) · pedidos testados no Claude, ChatGPT, Gemini e Copilot · prova social só real (sem depoimentos inventados).

**Materiais prontos em `entregas/pagina-ebook-assets/`:** `print-pedido-3-cruzamento.png` e `print-pedido-2-atrasados.png` (resultado real do Claude), `animacao-hero.html` (animação da primeira tela) e as planilhas de exemplo usadas (`*.csv`).

> **Como ler os números:** eles vêm de pessoas sintéticas e servem para **comparar opções e ordenar dúvidas**, não para prever vendas. Na simulação, ~20% dos visitantes compram; o normal no mundo real é 1–4%.

---

## 0. Resumo em 5 linhas

1. **Sempre ter esta página antes do checkout.** Indo direto ao checkout, 71% dos que saíram acharam que era golpe.
2. **Primeira tela:** promessa de tempo + tabela se montando + preço no botão + "funciona mesmo se você nunca usou IA" + garantia de 7 dias.
3. **Ordem logo abaixo:** dá para usar sem saber IA → serve para a sua rotina → prova real → quem fez → garantia e Pix → segurança de dados → perguntas → botão final.
4. **Prova antes de segurança.** Abrir com LGPD ou só com história deixa 76–82% sentindo que "falta prova".
5. **O preço não é o problema.** R$ 17,90 fica na mediana do que as pessoas pagariam. O atrito está no Pix sem garantia e no autor desconhecido.

---

## 1. Público e contexto de chegada

| Item | Definição |
|---|---|
| Quem chega | Profissional do administrativo de CD ou operação logística (auxiliar, assistente, analista, líder). Salário de R$ 2–6 mil. Usa Excel com PROCV ou menos. |
| De onde vem | Reels patrocinado no Instagram (anúncio C1 "Saia no horário sem PROCV", ou C2/C3). |
| Dispositivo | **Celular.** Tudo é pensado para tela de ~390 px de largura. |
| Estado mental | Curioso, com pouca paciência, desconfiado de autor desconhecido, com medo de colocar dado da empresa na IA. |
| Melhor público | Quem **já usa IA no trabalho por conta própria**, líderes e supervisores, e quem trabalha em empresa que incentiva IA. |
| Público mais difícil | Quem já tem **Copilot ou Gemini da empresa** ("isso serve pra mim?") e quem é muito sensível a preço. |

---

## 2. Estrutura (de cima para baixo)

| # | Seção | Dúvida que responde | Por que nessa posição |
|---|---|---|---|
| 0 | Primeira tela | "O que é e por que me importa?" | Decide se a pessoa fica nos primeiros 5 segundos. |
| 1 | Dá para usar sem saber IA | "Consigo fazer isso?" | Dúvida nº 1 de quem fica (40%; 86% entre quem nunca usou IA). |
| 2 | Serve para a sua rotina | "Isso é para o meu trabalho?" | Dúvida nº 2 (34%; 71% entre quem tem IA da empresa). |
| 3 | Prova real | "Funciona mesmo?" | "Falta prova" é o motivo nº 1 de saída nas páginas (50–82%). |
| 4 | Por que confiar | "Quem está vendendo? Já funcionou para alguém?" | "Autor desconhecido, sem depoimento" aparece em 20–28% das objeções. Sem expor o autor: a confiança vem da amostra, da prova real, da garantia e da empresa identificada. |
| 5 | Garantia e pagamento | "E se eu não gostar? Pix é seguro?" | "Só Pix, sem garantia" aparece em 33–43% das objeções. |
| 6 | Segurança de dados | "Posso usar com as planilhas da empresa?" | Pesa muito para quem tem empresa que proíbe IA, mas não segura ninguém sozinha no topo. |
| 7 | Perguntas frequentes | Objeções restantes | ChatGPT grátis, Copilot, conta no Claude, formato. |
| 8 | Fechamento | "Vou comprar." | Repete a oferta e a garantia. |
| — | Botão fixo no rodapé | — | Aparece depois que a pessoa rola a primeira tela. |

Regra geral: **cada seção cabe em no máximo uma tela de celular**. Se passar disso, corte.

---

## 3. Seção por seção

### Seção 0 — Primeira tela (o que aparece sem rolar)

**Objetivo:** fazer a pessoa ficar, entender o produto em 5 segundos e ver o preço.
**Base:** variante H1, a melhor nas duas medidas. Pelo Jev, 72% ficam (41% no checkout direto). Só 14% saem achando que é golpe, contra 71% no checkout direto.

**Elementos obrigatórios, nesta ordem:**

1. **Título** (grande, até 2 linhas no celular):
   > Cruze a planilha do WMS com a da transportadora em 2 minutos, sem PROCV
2. **Subtítulo** (1–2 linhas):
   > 12 pedidos prontos para copiar e colar no Claude. **Funciona mesmo se você nunca usou IA.**
3. **Animação curta** (4 s em loop, sem som, leve, em GIF/WebP ou vídeo mudo):
   - duas planilhas entram e viram **uma tabela com linhas verde (bate), laranja (diferente) e vermelha (falta)**;
   - **colunas que o público reconhece:** `Pedido`, `NF`, `CT-e`, `Transportadora`, `Status`;
   - dados fictícios, mas com cara de dado real (números de pedido, nomes de transportadora genéricos).
4. **Botão principal** (verde, largura total):
   > Quero o guia por R$ 17,90
5. **Linha abaixo do botão** (letra pequena):
   > Pix · acesso imediato ao PDF · **7 dias para pedir o dinheiro de volta**

**Não colocar na primeira tela:** formulário, CPF, texto longo, lista de capítulos, foto genérica de banco de imagem, vídeo longo, selos sem significado.

**Título único** para os 3 anúncios: os três falam de PROCV e de cruzar planilhas, então esse título continua a promessa de qualquer um deles. Só vale fazer uma página por anúncio quando houver tráfego suficiente para comparar.

**Animação pronta:** `pagina-ebook-assets/animacao-hero.html` tem 6 s em loop, só CSS, ~4 KB, e respeita "reduzir movimento". Ela usa os pedidos do resultado real do pedido 3 (PV-48213 com peso +12 kg, PV-48224 com volumes 2 → 4 etc.).

---

### Seção 1 — "Dá para usar mesmo sem nunca ter usado IA"

**Objetivo:** tirar o medo de "não vou conseguir".
**Base:** é a próxima dúvida mais citada (40% na H1). Entre quem nunca usou IA, chega a 86%.

**Elementos:**
- **Título:** "Você não precisa saber IA. Precisa saber o que pedir."
- **3 passos com print de celular ou tela**, um por linha:
  1. **Crie sua conta grátis no Claude** (2 minutos, só e-mail). [print da tela de cadastro]
  2. **Anexe as duas planilhas** (a do WMS e a da transportadora). [print]
  3. **Cole o pedido pronto do guia** e receba a tabela. [print do resultado]
- **Linha de apoio:** "O guia mostra cada clique, com tela de exemplo."
- **Nota sobre o plano grátis:** "Os pedidos funcionam no plano gratuito do Claude, que tem limite de mensagens por período." **[a confirmar no momento da publicação: limites atuais do plano grátis]**
- **Dica obrigatória:** "Anexe a planilha em vez de colar o texto." No teste de 10/10, com a planilha colada como texto, o Claude errou contas (deixou passar uma divergência e somou errado uma transportadora). Com o arquivo anexado, ele calcula com código e acertou tudo.

**Evitar:** termos técnicos (prompt, LLM, token). Use "pedido".

---

### Seção 2 — "Serve para a sua rotina"

**Objetivo:** a pessoa se reconhecer nas tarefas.
**Base:** é a 2ª dúvida (34%). Para quem tem IA da empresa, chega a 71%. O gatilho de compra mais citado é ver um exemplo com uma planilha parecida com a minha (39%).

**Elementos:**
- **Título:** "Os 12 pedidos cobrem a rotina do administrativo logístico."
- **Lista de tarefas com o resultado de cada uma** (cards curtos ou lista com ícone):

| # | Pedido do guia | O que entrega |
|---|---|---|
| 1 | Briefing da manhã | Só o que exige ação hoje, em Crítico/Alto/Médio/Baixo, com responsável, prazo e fonte |
| 2 | Pedidos atrasados | Atrasos nas faixas 1, 2–3, 4–7 e mais de 7 dias, por transportadora, com quantidade e valor |
| 3 | Cruzar duas planilhas | Batem / diferentes / só na 1 / só na 2, com duplicidades marcadas sem apagar |
| 4 | Inventário | Divergência e impacto em R$ por SKU, do maior para o menor |
| 5 | Auditoria de frete | Só os CT-es com diferença, com o motivo provável e a evidência |
| 6 | Ocorrência de entrega | Linha do tempo da NF: fato comprovado, versão e o que falta |
| 7 | Cobrança de transportadora | E-mail firme e educado, com assunto |
| 8 | Aviso ao cliente | Mensagem transparente, sem culpar ninguém e sem prometer o que não pode |
| 9 | Relatório semanal | Semana atual × anterior × média de 4 semanas, separando fato de hipótese |
| 10 | Ata de reunião | Decisão, ação, responsável e prazo, mais os pontos sem decisão |
| 11 | POP | Procedimento com exceções, registros e controle de versão |
| 12 | Revisar a própria resposta | Confere as contas e aponta o que você deve verificar antes de usar |

- **Bloco "E se eu já uso ChatGPT, Gemini ou Copilot?":**
  > **Os pedidos foram testados no Claude, no ChatGPT, no Gemini e no Copilot.** O valor do guia está nos pedidos montados para a logística: as regras de cruzamento, as colunas e os formatos de saída. Se a sua empresa já libera o Copilot ou o Gemini, use com ele.

  Isso responde ao público mais difícil da simulação: quem já tem IA da empresa e pergunta "isso serve pra mim?" (71%).
- **Sumário do PDF**: os capítulos em uma lista recolhível ("Ver os 12 capítulos").

---

### Seção 3 — Prova real

**Objetivo:** mostrar que funciona. É o maior motivo de saída.
**Base:** "falta prova" é o motivo nº 1 de saída em todas as páginas testadas. Os gatilhos mais citados: ver o cruzamento de verdade, print real e demonstração.

**Elementos:**
- **2 prints de resultado real (prontos):**
  - `print-pedido-3-cruzamento.png`: pedido 3 com o WMS × a planilha da transportadora. 18 batem, 4 diferentes (peso e volumes), 3 faltando e 1 CT-e duplicado. Ele também listou antes as diferenças de formato.
  - `print-pedido-2-atrasados.png`: pedido 2 com 8 atrasados de 30, R$ 12.459,93 parados e a Rapido Sul com 55% do valor.
  - **Como foram feitos:** planilhas de exemplo com divergências plantadas, os pedidos do guia como estão no PDF (só os [colchetes] preenchidos), resposta real do Claude Sonnet 5 com as planilhas anexadas, e tudo conferido contra o gabarito. Legenda obrigatória em cada print: "Resultado real do Claude · planilhas de exemplo, dados fictícios".
  - Não usar as telas do PDF como prova: o próprio guia diz que são ilustrativas.
- **No lugar do vídeo:** sem gravação de tela, use a sequência **pedido (texto) → print do resultado**, com o pedido 3 em cima e o print logo abaixo. Se um dia gravar a tela, um vídeo de 30 s entra aqui, nunca na primeira tela (como primeira tela, o vídeo teve 23% de "parece golpe" contra 14%).
- **Amostra grátis:** o "pedido forte" do capítulo 1 (pág. 4 do PDF), numa caixa com botão "copiar":
  ```
  Trabalho no administrativo de um centro de distribuição.
  Anexei a exportação de pedidos do WMS de hoje.
  Liste os pedidos atrasados.
  Considere atrasado o pedido cuja Data_Prometida é anterior a hoje
  e cujo Status não é "Entregue" nem "Cancelado".
  Monte uma tabela agrupada por transportadora, do maior para o menor atraso.
  Não altere os dados originais.
  ```
  Legenda: "Este é 1 dos pedidos do guia. Teste agora na IA que você usa." Ele mostra a qualidade sem entregar o pedido 3, que é a promessa da primeira tela.
- **Depoimentos: só reais.** Não use personas da simulação nem pessoas inventadas: é publicidade enganosa (CDC, art. 37), viola o código do CONAR sobre testemunhal e pode derrubar os anúncios no Meta. Para ter depoimentos rápido, dê o PDF de graça para 10–15 profissionais de logística em troca de opinião sincera e autorização para publicar **primeiro nome + cargo + tipo de operação**. Até lá, a amostra grátis e os prints fazem esse papel.

---

### Seção 4 — Por que confiar (sem expor o autor)

**Objetivo:** responder "quem está vendendo?" sem nome nem foto do autor (decisão do Alef).
**Base:** "autor desconhecido" aparece em 20–28% das objeções. Sem rosto, a confiança precisa vir de outros sinais.

**Elementos:**
- **Feito para o administrativo logístico:** uma linha sobre o método, tirada da introdução do PDF ("cada capítulo pega uma tarefa real e mostra o pedido, o resultado e o que conferir").
- **Testado nas 4 IAs** (Claude, ChatGPT, Gemini, Copilot).
- **Empresa identificada:** nome da empresa, CNPJ e contato de suporte (WhatsApp/e-mail) no rodapé e perto do botão. O Decreto 7.962/2013 exige isso em vendas pela internet, e pode ser só a empresa, sem nome de pessoa. **[a confirmar: qual empresa e CNPJ (Cnine?)]**
- **Depoimentos reais** assim que existirem (ver seção 3).

**Atenção:** a Camila do anúncio é uma personagem gerada por IA. **Não apresente a Camila como autora nem como cliente real.** Isso vira problema de confiança (e de publicidade enganosa) quando alguém perceber.

---

### Seção 5 — Garantia e pagamento

**Objetivo:** tirar o risco percebido do Pix.
**Base:** "só Pix, sem garantia ou reembolso" aparece em 33–43% das objeções. É o maior atrito depois da prova.

**Elementos:**
- **Garantia de 7 dias**, destacada:
  > Não gostou? Peça o dinheiro de volta em até 7 dias depois da compra. Sem perguntas.
  Base legal: o direito de arrependimento em compras fora do estabelecimento (CDC, art. 49) já dá 7 dias. A página só deixa isso explícito.
- **Como pedir o reembolso:** canal e prazo de devolução do Pix. **[preencher: e-mail/WhatsApp de suporte e em quantos dias o valor volta]**
- **Como funciona o Pix:** "Você gera o QR Code ou copia o código, paga no app do seu banco e é levado na hora para a página de download do guia."
- **Avaliar oferecer cartão** além do Pix (reduz o medo de não ter estorno). **[decisão do Alef]**
- Selo e nome do processador de pagamento (AbacatePay).

---

### Seção 6 — Segurança de dados (LGPD)

**Objetivo:** responder a quem tem medo de expor a empresa, sem abrir a página com isso.
**Base:** abrir com segurança (H3) deixou 82% com "falta prova". Mesmo assim, é dúvida forte para quem trabalha em empresa que proíbe IA. Supervisores aceitam testes com dado fictício ou anonimizado e vetam dado de cliente.

**Elementos:**
- **Título:** "Use sem expor dado de cliente."
- 3 pontos:
  - o guia ensina a **anonimizar** (trocar nome de cliente, CNPJ e valores por códigos) antes de anexar;
  - todo pedido pode ser **testado com a planilha de exemplo** que vem com o guia **[a confirmar: incluir planilha de exemplo no pacote]**;
  - há um capítulo de **regras de segurança e LGPD**.
- **"Para mostrar ao seu gestor":** um roteiro de 1 página (PDF) explicando o uso seguro. Isso ajuda a destravar o supervisor, que fica neutro em ~60% dos casos. **[preencher: criar esse roteiro]**

---

### Seção 7 — Perguntas frequentes (recolhíveis)

1. **"Já uso o ChatGPT de graça. Por que pagar?"** Você paga pelos pedidos prontos para a logística, não pela IA. Eles foram testados no ChatGPT também.
2. **"Nunca usei IA. Vou conseguir?"** Sim. O guia começa da criação da conta, com tela de exemplo em cada passo.
3. **"Preciso pagar o Claude?"** Não, os pedidos funcionam no plano gratuito, com limite de mensagens. **[a confirmar]**
4. **"Minha empresa usa Copilot ou Gemini. Serve?"** Sim, os pedidos foram testados no Claude, no ChatGPT, no Gemini e no Copilot.
5. **"Posso usar com as planilhas da empresa?"** Sim, com os cuidados do capítulo de segurança: anonimize antes, ou teste com a planilha de exemplo. Siga a política da sua empresa.
6. **"Como recebo?"** Logo após o Pix você vai para a página de download do PDF.
7. **"E se eu não gostar?"** 7 dias para pedir o dinheiro de volta.
8. **"Funciona no celular?"** O PDF abre no celular, mas o cruzamento de planilhas é mais confortável no computador. **[a confirmar]**
9. **"Colo a planilha ou anexo?"** Anexe o arquivo. Assim a IA calcula com precisão. Colar o texto da planilha aumenta a chance de erro de conta.

---

### Seção 8 — Fechamento

- Repete o título curto: "Saia no horário sem PROCV."
- Resumo da oferta em 3 linhas: 34 páginas · 12 pedidos prontos · acesso imediato.
- **Preço:** R$ 17,90 (não mexer: o preço não aparece como objeção relevante).
- Botão: "Quero o guia por R$ 17,90".
- Abaixo: "Pix · 7 dias para pedir o dinheiro de volta".

### Botão fixo no rodapé (celular)

- Aparece depois que a pessoa rola a primeira tela.
- Texto: "Quero o guia · R$ 17,90".
- Não cobre conteúdo: altura máxima de 64 px, respeitando a área segura do celular.

---

## 4. Checkout (depois do clique)

- **Pedir só o necessário.** Nome, e-mail e o que o AbacatePay exigir para o Pix. **[a confirmar: se o CPF é obrigatório e se o link aceita cartão (não consegui ler pelo conector)]** Pedir CPF de cara, sem contexto, foi o que fez o checkout direto parecer golpe. Se o CPF for obrigatório, ponha uma linha acima do campo explicando por que ele é pedido. **[a confirmar o motivo com o AbacatePay antes de escrever]**
- Mostrar no topo: **nome do produto + capa do PDF + preço + "7 dias para pedir o dinheiro de volta"**.
- Pix com QR Code e o botão "copiar código".
- Depois de pagar: redirecionamento automático para `cnine.company/obrigado-claude-no-adm-logistico`, com botões para baixar e abrir o PDF.
- **Página de obrigado:** é a ponte para a auditoria de frete. Veja a aba "O que fazer com isso" no artifact técnico.

---

## 5. Requisitos técnicos

| Item | Requisito |
|---|---|
| Velocidade | Primeira tela carregada em menos de 2 s no 4G. Animação com menos de 500 KB (WebP/MP4 mudo). Vídeo da seção 3 carregado só quando a pessoa rola até lá. |
| Layout | Uma coluna, letra mínima de 16 px, botões com pelo menos 48 px de altura e contraste alto. |
| Continuidade | Mesmas cores, fonte e promessa do anúncio. |
| Rastreamento | Pixel do Meta com `PageView`, `ViewContent`, eventos de rolagem (25/50/75%), `InitiateCheckout` no clique do botão e `Purchase` no Pix pago. |
| Endereço | Domínio próprio ou subdomínio limpo. Evitar link encurtado e domínio genérico, que aumentam a cara de golpe. |
| Legal | Política de privacidade, termos, CNPJ ou CPF do vendedor no rodapé, e contato. |

---

## 6. O que não fazer

- Mandar o anúncio direto para o checkout.
- Abrir a página com segurança de dados (H3) ou só com a história da Camila (H4).
- Pôr o vídeo como primeira tela.
- Inventar depoimentos (inclusive com personas da simulação) ou apresentar a Camila como pessoa real.
- Usar as telas ilustrativas do PDF como se fossem prova.
- Prometer "sem erro": o próprio guia ensina a conferir (pedido 12).
- Baixar o preço para compensar falta de prova.
- Usar jargão (prompt, LLM, token, automação).
- Página longa sem botão fixo.

---

## 7. Como validar antes e depois de publicar

### Antes: teste com 5 pessoas reais (custo zero)
Escolha 5 pessoas do público (colegas de CD, por WhatsApp ou ao vivo). Mande o link no celular dela e peça:
1. "Em 5 segundos: o que está sendo vendido e por quanto?"
2. "Você sairia agora? Por quê?"
3. "Role até onde você leria. Onde parou e por quê?"
4. "O que faltou para você comprar?"

Anote as respostas. Se 2 ou mais pessoas pararem no mesmo ponto, mexa nesse ponto antes de ligar o anúncio.

### Depois: metas e regras com dados reais (após ~300 visitas)

| Métrica | Onde ver | Meta inicial | Se ficar abaixo |
|---|---|---|---|
| Sai sem rolar (rejeição) | Pixel / analytics | menos de 50% | Revise a primeira tela: título e animação. |
| Rola até a seção 3 (prova) | Evento de rolagem 50% | mais de 30% | As seções 1 e 2 estão longas ou não convencem. |
| Clica no botão | `InitiateCheckout` / visitas | mais de 8% | Falta prova ou garantia. Teste a amostra grátis. |
| Paga o Pix | Pix pagos / checkouts abertos | mais de 40% | Atrito no checkout: campos, CPF ou confiança no Pix. |
| Compra por visita | `Purchase` / visitas | 1–4% | Compare com o anúncio: o público certo está chegando? |

As metas são pontos de partida tirados de benchmarks gerais de infoproduto, não da simulação. Ajuste depois das primeiras semanas.

---

## 8. Checklist final

- [ ] Primeira tela com título, subtítulo "funciona mesmo se você nunca usou IA", animação com colunas reais, botão com preço e linha de garantia
- [ ] Seção 1: 3 passos com print
- [ ] Seção 2: tarefas → resultado, sumário e resposta "e se eu já uso ChatGPT/Copilot"
- [ ] Seção 3: os 2 prints reais com legenda, pedido → resultado e a amostra grátis do capítulo 1
- [ ] Seção 4: método, "testado nas 4 IAs", empresa + CNPJ + contato (sem dados do autor)
- [ ] Seção 5: garantia de 7 dias, como pedir reembolso e como funciona o Pix
- [ ] Seção 6: anonimização, planilha de exemplo e roteiro para o gestor
- [ ] Seção 7: perguntas frequentes recolhíveis
- [ ] Seção 8: fechamento + botão fixo no rodapé
- [ ] Checkout pedindo o mínimo, com capa, preço e garantia no topo
- [ ] Pixel com os eventos de rolagem, checkout e compra
- [ ] Rodapé legal (privacidade, termos, identificação do vendedor e contato)
- [ ] Teste com 5 pessoas reais feito e ajustes aplicados
- [ ] Anúncio apontando para a página (não mais para o checkout)

---

### Fontes desta especificação
- Simulação `pagina-ebook` (10/10/2026): 100 visitantes vindos do anúncio C1 × 5 primeiras telas, agentes Claude Sonnet 5, medição Jev 1.13. Arquivo: `results/pagina-ebook_*.json`. Relatório: https://claude.ai/artifact/NbjWa6zcauwPQmpmdCGK1N
- Simulação `ebook-adm-logistico` (08 e 10/10/2026): motivo da compra, preço, objeções e papel do supervisor.
- Pesquisa de mercado: `data/research/mercado-adm-logistico/fontes.md` (alternativas grátis, Pix, uso de IA nas empresas).
- Direito de arrependimento: Código de Defesa do Consumidor, art. 49.
