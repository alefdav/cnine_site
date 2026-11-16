import type { EbookSlug } from '@/lib/ebooks';

/*
  Texto das páginas de venda da série "Do Zero ao Lançamento" (7 ebooks,
  sistema visual c9 de 2026-11). Preço, páginas e capítulos vêm de
  lib/ebooks.ts; aqui fica só o texto.

  Diagnóstico Schwartz: consciência 3 (a pessoa já sabe que dá para criar
  site e app com IA e já ouviu falar de Lovable e do Claude), sofisticação 4
  ("crie um app em 5 minutos com IA" está em todo lugar). Mecanismo: a parte
  difícil não é o código. É saber o que construir, validar, não perder o fio
  do projeto, publicar no lugar certo e cobrar, tudo no plano grátis e com
  os limites dele ditos antes.

  Regras: todo número, limite e prompt sai dos PDFs (conferidos em novembro
  de 2026). Nada de depoimento, contador, estoque ou preço riscado. Sem
  travessão e sem jargão de marketing. "\n" marca a quebra editorial dos
  títulos (Lines, em components/c9/chrome).
*/

export type DzPath =
  | 'o-metodo'
  | 'com-lovable'
  | 'com-o-claude'
  | 'colocando-no-ar'
  | 'identificando-tendencias'
  | 'memoria-obsidian-ia'
  | 'biblioteca-de-prompts';

/* A faixa escura de cada página mostra uma peça real do livro. */
export type DzBand =
  | { kind: 'steps'; h2: string; lede: string; cols?: 3 | 4; items: [string, string, string][] }
  | { kind: 'compare'; h2: string; lede: string; rows: string[]; cols: { name: string; cells: string[] }[]; note?: string }
  | { kind: 'criteria'; h2: string; lede: string; items: [string, string][]; note: string }
  | { kind: 'code'; h2: string; lede: string; label: string; code: string; side: [string, string][] };

export interface DzBook {
  path: DzPath;
  slug: EbookSlug;
  role: 'Livro base' | 'Trilha' | 'Bônus';
  seoTitle: string;
  description: string;
  h1: [string, string];
  lede: string;
  /* Linha do cartão do livro na página da série. */
  card: string;
  pain: { h2: string; lede: string; rows: [string, string][] };
  /* Capítulos reais do sumário, com uma linha do que tem em cada um. */
  chapters: [string, string][];
  /* "Capítulo" ou "Parte" no sumário. */
  unit: string;
  extra?: string;
  band: DzBand;
  sample: { from: string; prompt: string };
  forWho: string[];
  notFor: string[];
  faq: [string, string][];
  closing: string;
  /* Por que o livro do order bump (lib/ebooks.ts, `bump`) combina com este. */
  bumpPitch: string;
  firstSteps: { title: string; body: string }[];
}

export const DZ_EDITION = 'novembro de 2026';

/* Plano de 30 dias (fechamento de O Método). */
const PLAN_30: [string, string, string][] = [
  ['Semana 1', 'Ideia e validação', 'Escolher a trilha, publicar a primeira página e conversar com 10 pessoas.'],
  ['Semana 2', 'Planejar', 'Versão mínima com as três listas, direção de design e a especificação com o Claude.'],
  ['Semana 3', 'Construir', 'Uma ou duas tarefas por dia, cada uma testada no celular. Caderno atualizado no fim do dia.'],
  ['Semana 4', 'Lançar e vender', 'Conta de recebimento, preço, oferta de cliente fundador e 5 mensagens por dia.'],
];

const HOW_TO_GET =
  'Assim que o Pix é confirmado, a própria página abre o download do PDF. Sem cadastro e sem sair daqui.';
const REFUND = 'Você tem 7 dias para pedir o dinheiro de volta. Chame no WhatsApp com o código da compra e o valor volta pelo Pix.';

export const DZ_PAGES: Record<DzPath, DzBook> = {
  'o-metodo': {
    path: 'o-metodo',
    slug: 'dz-metodo',
    role: 'Livro base',
    seoTitle: 'O Método: da ideia ao primeiro cliente com IA, sem programar | Ebook',
    description:
      'O livro base da série Do Zero ao Lançamento: achar a ideia certa, validar sem gastar, versão mínima, memória do projeto, cobrar e os primeiros clientes sem verba. Com plano de 30 dias. R$ 24,99 no Pix.',
    h1: ['Da ideia ao primeiro cliente,', 'sem saber programar.'],
    lede: 'O livro base da série: achar a ideia certa, validar sem gastar, definir a versão mínima, cobrar e conseguir os primeiros clientes sem verba. Fecha com um plano de 30 dias.',
    card: 'Da ideia ao primeiro cliente, com plano de 30 dias.',
    pain: {
      h2: 'Projeto com IA\nmorre antes do código.',
      lede: 'A IA escreve rápido. O que derruba o projeto é construir sem uma pergunta, sem memória e sem preço.',
      rows: [
        ['Começar pela solução', '"Quero fazer um app de..." O livro começa pelo problema, com o teste das três perguntas antes de qualquer tela.'],
        ['Acreditar no "eu usaria"', 'Todo mundo diz sim para não te desanimar. Validação é compromisso: o WhatsApp, 20 minutos de teste, um sinal em dinheiro.'],
        ['Lançar e esperar', 'Lançar não é publicar. É ir atrás das pessoas, uma por vez, com um exemplo na mão.'],
      ],
    },
    unit: 'Capítulo',
    chapters: [
      ['A ideia certa', 'Onde as boas ideias moram e o teste das três perguntas.'],
      ['Validar sem gastar', '10 conversas, uma página de exemplo e o compromisso pequeno.'],
      ['A versão mínima', '"Meu cliente consegue ___ sem ___" e as três listas.'],
      ['A memória do projeto', 'O caderno de 5 páginas que impede o projeto de virar bagunça.'],
      ['Recebendo dinheiro', 'Pix sem mensalidade, quanto cobrar e o básico do CNPJ.'],
      ['Os primeiros clientes sem verba', 'Abordagem direta, follow-up, bastidor e indicação.'],
      ['Depois do lançamento', 'Os 4 números da semana e quando insistir, mudar ou parar.'],
    ],
    extra: 'Mais a introdução e o plano de 30 dias, com cerca de uma hora por dia.',
    band: {
      kind: 'steps',
      h2: 'Do zero ao primeiro\ncliente em 30 dias.',
      lede: 'O plano que fecha o livro: cerca de uma hora por dia, sem gastar nada para começar.',
      items: PLAN_30,
    },
    sample: {
      from: 'Capítulo 1 · A ideia certa',
      prompt:
        'Tenho esta ideia: [descreva]. Aja como um investidor cético. Me faça 10 perguntas duras sobre quem tem esse problema, como resolve hoje e se pagaria por uma solução. Uma pergunta por vez. Só passe para a próxima depois da minha resposta. No final, me diga com sinceridade se a ideia parece forte ou fraca e por quê.',
    },
    forWho: [
      'Tem uma ideia de site, app ou ferramenta e não sabe por onde começar',
      'Já começou um projeto com IA e travou no meio',
      'Quer vender um sistema ou serviço simples para negócios da sua região',
    ],
    notFor: [
      'Quer aprender a programar (o livro ensina a conduzir a IA, não a escrever código)',
      'Procura renda garantida ou ideia pronta',
    ],
    faq: [
      ['Preciso de alguma ferramenta paga?', 'Não. Tudo no livro começa no plano gratuito, e ele avisa antes quando um limite do grátis pode te pegar. Você só paga quando o projeto provar que merece.'],
      ['O livro ensina a construir?', 'Ele ensina o método, que vale para qualquer ferramenta. Para construir, cada trilha da série mostra o passo a passo: Com Lovable (sem código) ou Com o Claude (mais controle).'],
      ['Preciso fazer anúncio?', 'Não. O livro não depende de anúncio pago: os primeiros clientes vêm de esforço direto. Para quem quiser testar depois, o capítulo 6 explica o básico, como o hook rate.'],
      ['Como recebo?', HOW_TO_GET],
      ['E se eu não gostar?', REFUND],
    ],
    closing: 'Comece pelo problema,\nnão pelo app.',
    bumpPitch: 'Os 42 prompts da série num só lugar, um para cada etapa do método.',
    firstSteps: [
      { title: 'Responda as três perguntas do capítulo 1', body: 'Quem tem o problema, como resolve hoje e se pagaria. Por escrito, antes de abrir qualquer ferramenta.' },
      { title: 'Marque as 10 conversas do capítulo 2', body: 'A mensagem de WhatsApp para pedir a conversa já está no livro. Pergunte sobre o passado, nunca sobre o futuro.' },
      { title: 'Siga o plano de 30 dias', body: 'Uma hora por dia, da ideia ao primeiro cliente. Está no fechamento do livro.' },
    ],
  },

  'com-lovable': {
    path: 'com-lovable',
    slug: 'dz-lovable',
    role: 'Trilha',
    seoTitle: 'Com Lovable: construa seu site ou app com IA, sem código | Ebook',
    description:
      'A trilha para quem nunca programou: primeira página no ar na primeira tarde, design sem cara de IA e como construir sem estourar os créditos grátis do Lovable. R$ 17,99 no Pix.',
    h1: ['Construa seu site ou app', 'conversando com a IA.'],
    lede: 'A trilha para quem nunca programou: sua primeira página no ar na primeira tarde, um design sem cara de IA e um jeito de construir que não estoura os créditos grátis do mês.',
    card: 'Construir conversando, sem escrever código.',
    pain: {
      h2: 'Os créditos grátis\nacabam no erro.',
      lede: 'O plano gratuito do Lovable dá 5 créditos por dia, até 30 por mês. Rende o mês inteiro ou acaba em dois dias, dependendo de como você pede.',
      rows: [
        ['O pedido gigante', '"Crie um sistema completo com login, pagamento e relatório." Parece pronto e quebra na primeira mudança. E os créditos vão no conserto.'],
        ['A cara de feito por IA', 'Degradê roxo, "transforme seu negócio", emoji em todo título. O livro transforma o seu gosto em regras escritas.'],
        ['Um ajuste por mensagem', 'Uma mensagem para a cor, outra para o texto. Junte os ajustes e planeje no Claude, onde não gasta crédito.'],
      ],
    },
    unit: 'Capítulo',
    chapters: [
      ['Passo zero, seu kit grátis', '5 contas grátis e uma página sua publicada no mesmo dia.'],
      ['Suas ferramentas grátis', 'O que cada uma faz e onde o plano gratuito acaba.'],
      ['Design sem ser designer', 'Três direções, uma escolha e as regras de gosto.'],
      ['Construindo com IA, passo a passo', 'Especificação, plano e uma tarefa por vez.'],
      ['Colocando no ar', 'Domínio, a lista antes de lançar, Google e WhatsApp Business.'],
    ],
    band: {
      kind: 'steps',
      h2: 'Planeje onde é grátis.\nConstrua onde gasta.',
      lede: 'O jeito do capítulo 4, o mesmo que o autor usa nos projetos dele: especificação, plano, tarefas.',
      items: [
        ['Passo 1 · no Claude', 'A especificação', 'O problema, o público, as telas em palavras e o que não entra.'],
        ['Passo 2 · no Claude', 'O plano', 'Tarefas pequenas, em ordem. Cada uma cabe numa mensagem e se testa em minutos.'],
        ['Passo 3 · no Lovable', 'Uma tarefa por vez', 'Pediu, testou no celular, marcou no caderno. Só então a próxima.'],
        ['Se errou duas vezes', 'Pare', 'Volte ao Claude, explique o problema e peça um pedido melhor.'],
      ],
    },
    sample: {
      from: 'Capítulo 4 · Construindo com IA, passo a passo',
      prompt:
        'Esta é a especificação do meu projeto: [cole]. Quebre em tarefas pequenas, em ordem, para eu pedir uma por vez no Lovable. Cada tarefa deve caber em uma mensagem e ser testável em poucos minutos. Para cada uma, escreva: o pedido exato para colar no Lovable e como eu testo se deu certo.',
    },
    forWho: [
      'Nunca programou e quer construir conversando, em português',
      'Quer validar uma ideia com uma página no ar ainda esta semana',
      'Já tentou o Lovable e gastou os créditos sem terminar',
    ],
    notFor: [
      'Quer ser dono dos arquivos e escolher a hospedagem (a trilha Com o Claude é para isso)',
      'Precisa de domínio próprio sem pagar nada (no Lovable isso exige plano pago)',
    ],
    faq: [
      ['Preciso pagar o Lovable?', 'Não para começar. O plano gratuito dá 5 créditos por dia, até 30 por mês, e publica num endereço lovable.app. Domínio próprio exige plano pago, e o livro sugere esse gasto só depois do primeiro cliente.'],
      ['Lovable ou Claude: qual trilha?', 'Lovable se você nunca programou e quer construir conversando, sem lidar com arquivos. Claude se você quer mais controle e não depender de plataforma. As duas começam de graça.'],
      ['Dá para fazer pelo celular?', 'Para construir, você vai precisar de um computador e de um e-mail. O celular é onde você testa cada tarefa, como o seu cliente vai usar.'],
      ['O livro ensina a escolher a ideia?', 'Não. Ideia, validação, preço e primeiros clientes estão no livro base, O Método. Esta trilha cuida da parte do meio: construir e publicar.'],
      ['Como recebo?', HOW_TO_GET],
      ['E se eu não gostar?', REFUND],
    ],
    closing: 'Sua primeira página\nno ar ainda hoje.',
    bumpPitch: 'Para quando o projeto for vender: domínio, hospedagem e quando pagar.',
    firstSteps: [
      { title: 'Reserve uma tarde para o capítulo 1', body: 'Crie as contas grátis e publique sua primeira página. O pedido para colar no Lovable já está no livro.' },
      { title: 'Escreva suas regras de gosto', body: 'Do capítulo 3: anote no caderno o que te incomoda ("sem degradê", "fotos reais") e cole em todo pedido.' },
      { title: 'Especificação antes do Lovable', body: 'Escreva no Claude, de graça, e leve para o Lovable só o pedido pronto. É o que poupa os créditos.' },
    ],
  },

  'com-o-claude': {
    path: 'com-o-claude',
    slug: 'dz-claude',
    role: 'Trilha',
    seoTitle: 'Com o Claude: do chat grátis ao Claude Code, sem depender de plataforma | Ebook',
    description:
      'Páginas completas no chat gratuito do Claude, publicadas de graça na Cloudflare, e o momento certo de passar para o Claude Code. Com exemplo de CLAUDE.md. R$ 17,99 no Pix.',
    h1: ['Do chat grátis ao Claude Code,', 'sem ficar preso a plataforma.'],
    lede: 'A trilha para quem quer controle: páginas completas no chat gratuito do Claude, publicadas de graça na Cloudflare, e o momento certo de passar para o Claude Code.',
    card: 'Do chat grátis ao Claude Code, com os arquivos na sua mão.',
    pain: {
      h2: 'Pagar cedo\nou sofrer no grátis.',
      lede: 'Os dois erros mais comuns: assinar para aprender, ou tentar montar um sistema inteiro copiando e colando do chat.',
      rows: [
        ['Assinar antes de validar', 'O Claude Code começa no plano Pro, US$ 20 por mês. O livro mostra quando ele se paga e quando o grátis basta.'],
        ['Copiar e colar um sistema', 'Login, banco de dados e muitas telas pelo chat viram um pesadelo. Isso é trabalho do nível 2.'],
        ['Aprovar tudo sem ler', 'O Claude Code mexe nos arquivos de verdade. Plano antes de código e uma versão salva por tarefa.'],
      ],
    },
    unit: 'Capítulo',
    chapters: [
      ['Qual nível é o seu', 'O teste que diz se o seu projeto cabe no grátis.'],
      ['Nível 1, sua página no chat grátis', 'Um index.html completo, testado no navegador antes de publicar.'],
      ['Publicando de graça na Cloudflare', 'Endereço .pages.dev em menos de um minuto, com uso comercial.'],
      ['Nível 2, quando e como usar o Claude Code', 'Onde ele roda, o que você precisa e como ele trabalha.'],
      ['Trabalhando bem com o Claude Code', 'CLAUDE.md, plano antes de código, versões salvas e resumo do dia.'],
    ],
    band: {
      kind: 'code',
      h2: 'Um manual que a IA\nlê todo dia.',
      lede: 'O CLAUDE.md do capítulo 5: o que nunca muda no projeto, num arquivo que o Claude Code lê antes de começar a trabalhar.',
      label: 'CLAUDE.md · exemplo do livro',
      code: `# Projeto: Confirma Fácil
## O que é
Sistema para clínicas pequenas confirmarem
consultas da véspera pelo WhatsApp.
## Para quem
Recepcionista de clínica, usando no celular, com pressa.
## Regras
- Tudo em português do Brasil.
- Celular primeiro.
- Sem degradê roxo, sem emojis nos títulos.
- Nunca apagar dados: arquivar.
## Antes de terminar qualquer tarefa
- Testar o fluxo principal.
- Me mostrar um resumo do que mudou.
- Salvar uma versão (commit) se tudo funcionou.`,
      side: [
        ['Plano antes de código', 'Corrigir um plano custa uma mensagem. Corrigir código errado custa uma tarde.'],
        ['Pontos de salvamento', 'Uma versão salva depois de cada tarefa que funcionou. Se a próxima der errado, você volta.'],
        ['Resumo no fim do dia', 'No dia seguinte o Claude Code começa sabendo onde parou.'],
      ],
    },
    sample: {
      from: 'Capítulo 4 · Nível 2, quando e como usar o Claude Code',
      prompt:
        'Antes de escrever qualquer código, leia esta especificação: [cole]. Me explique em linguagem simples como você pretende organizar o projeto, quais ferramentas vai usar e por quê. Não crie nenhum arquivo ainda. Quero aprovar o plano primeiro.',
    },
    forWho: [
      'Quer ser dono dos arquivos do projeto e escolher onde ele mora',
      'Precisa de páginas de venda ou de captura sem pagar hospedagem',
      'Vai construir algo com login e banco de dados e quer saber quando assinar',
    ],
    notFor: [
      'Quer só conversar e ver o app pronto, sem lidar com arquivos (comece pela trilha Com Lovable)',
      'Precisa de login e banco de dados sem pagar nada (o nível 2 é pago)',
    ],
    faq: [
      ['Vou ter que pagar o Claude?', 'O nível 1 é todo no plano gratuito, inclusive a publicação na Cloudflare. O Claude Code começa no Pro: US$ 20 por mês, ou US$ 17 por mês no plano anual (conferido em novembro de 2026). É a única exceção paga da série, e o livro diz quando vale.'],
      ['Preciso saber programar?', 'Não. O livro explica o que é HTML, CSS e JavaScript em uma frase cada. Você não precisa entender cada linha, mas precisa entender o que vai acontecer antes de aprovar.'],
      ['Por que Cloudflare e não Vercel?', 'Porque o plano grátis da Cloudflare Pages permite uso comercial e não cobra por visita. O grátis da Vercel é só para uso pessoal. O livro Colocando no Ar compara as opções.'],
      ['Como recebo?', HOW_TO_GET],
      ['E se eu não gostar?', REFUND],
    ],
    closing: 'Seus arquivos,\nseu endereço.',
    bumpPitch: 'O Claude Code lendo e escrevendo as notas do projeto sozinho.',
    firstSteps: [
      { title: 'Descubra o seu nível no capítulo 1', body: 'Se o projeto é página, site simples ou ferramenta sem login, fique no grátis.' },
      { title: 'Prepare o pedido antes de abrir o chat', body: 'O capítulo 2 lista o que juntar no caderno. Quanto melhor o pedido, menos mensagens você gasta.' },
      { title: 'Publique na Cloudflare', body: 'O passo a passo do capítulo 3 coloca sua página no ar em menos de um minuto.' },
    ],
  },

  'colocando-no-ar': {
    path: 'colocando-no-ar',
    slug: 'dz-no-ar',
    role: 'Trilha',
    seoTitle: 'Colocando no Ar: Cloudflare, Vercel ou Hostinger, onde publicar | Ebook',
    description:
      'Cloudflare Pages, Vercel e Hostinger lado a lado: hospedagem, domínio e DNS em linguagem simples, uso comercial no plano grátis e quando começar a pagar. R$ 17,99 no Pix.',
    h1: ['Onde publicar seu projeto', 'e quando começar a pagar.'],
    lede: 'Cloudflare Pages, Vercel e Hostinger lado a lado, em linguagem simples: hospedagem, domínio e DNS sem medo, e o caminho do grátis ao pago sem surpresa na conta.',
    card: 'Cloudflare, Vercel e Hostinger lado a lado.',
    pain: {
      h2: 'O grátis errado\nsai caro.',
      lede: 'Quase toda hospedagem promete ser a melhor. A diferença está nos termos de uso, que pouca gente lê antes de publicar.',
      rows: [
        ['Vender no plano que proíbe', 'O plano Hobby da Vercel é só para uso pessoal e não comercial. Isso inclui o site de um negócio, mesmo pequeno.'],
        ['Domínio no nome de outra pessoa', 'Se a relação com quem fez o site acaba, o endereço vai junto. Registre sempre no seu nome.'],
        ['Esquecer a renovação', 'O domínio vence, o site sai do ar e alguém pode registrar o seu nome.'],
      ],
    },
    unit: 'Capítulo',
    chapters: [
      ['Hospedagem, domínio e DNS sem complicação', 'O que é cada coisa, e por que ficam em lugares separados.'],
      ['As opções lado a lado', 'A tabela de custo, uso comercial, tráfego e dificuldade.'],
      ['Cloudflare Pages, o grátis que deixa vender', 'Publicar por upload ou pelo GitHub e ligar o domínio.'],
      ['Vercel, ótima para testar, paga para vender', 'Quando usar, e o que fazer quando o projeto começa a vender.'],
      ['Hostinger, quando o projeto pede painel', 'WordPress, e-mail com domínio e o preço da renovação.'],
      ['Depois de publicar', 'A lista de conferência e o que anotar no caderno do projeto.'],
    ],
    band: {
      kind: 'compare',
      h2: 'As três opções,\nlado a lado.',
      lede: 'A tabela do capítulo 2, conferida em novembro de 2026. Antes de decidir, o livro manda conferir a página de preços e os termos de cada serviço.',
      rows: ['Plano grátis', 'Uso comercial no grátis', 'Visitas no grátis', 'Melhor para', 'Quando pagar'],
      cols: [
        { name: 'Cloudflare Pages', cells: ['Sim', 'Permitido', 'Sem limite de tráfego', 'Sites e páginas que vendem, de graça', 'Raramente'] },
        { name: 'Vercel', cells: ['Sim (Hobby)', 'Não permitido', '100 GB por mês', 'Projetos em Next.js, testes e protótipos', 'Assim que o projeto for comercial'] },
        { name: 'Hostinger', cells: ['Não (planos pagos)', 'Não se aplica', 'Depende do plano', 'WordPress, e-mail com domínio, cliente que quer painel', 'Desde o início'] },
      ],
      note: 'Para vender na Vercel, o plano Pro custa US$ 20 por mês por pessoa. Domínio .com.br: cerca de R$ 40 por ano no Registro.br.',
    },
    sample: {
      from: 'Capítulo 2 · As opções lado a lado',
      prompt:
        'Meu projeto é [descreva], feito com [ferramenta]. Ele vai [vender / não vender] e espero [número] visitas por mês. Compare Cloudflare Pages, Vercel e Hostinger para o meu caso, considerando custo, uso comercial e facilidade para quem não é dev. Termine com uma recomendação e o motivo.',
    },
    forWho: [
      'Tem um projeto pronto e não sabe onde colocar',
      'Vai começar a vender e quer ter certeza de que o plano permite',
      'Faz sites para clientes e precisa explicar domínio e hospedagem',
    ],
    notFor: [
      'Procura configuração avançada de servidor',
      'Já publica com tranquilidade e conhece os termos de cada plano',
    ],
    faq: [
      ['Os links do livro são patrocinados?', 'Alguns links podem ser de parceiros, e o livro avisa isso logo na introdução: se você contratar por eles, o autor pode receber uma comissão, sem custo a mais para você. Nenhuma das empresas patrocina a série.'],
      ['Serve para quem constrói no Lovable?', 'Sim. O Lovable já publica sozinho num endereço lovable.app, e o livro mostra quando vale ligar domínio próprio (no Lovable, isso exige plano pago).'],
      ['Preciso saber usar o GitHub?', 'Não. A Cloudflare Pages aceita que você arraste a pasta do projeto. O GitHub entra só se você quiser publicação automática.'],
      ['Como recebo?', HOW_TO_GET],
      ['E se eu não gostar?', REFUND],
    ],
    closing: 'Publique uma vez,\nno lugar certo.',
    bumpPitch: 'Páginas completas no chat grátis do Claude, prontas para a Cloudflare.',
    firstSteps: [
      { title: 'Ache o seu caso na tabela do capítulo 2', body: 'Vai vender ou não? É página simples, Next.js ou WordPress? A linha certa decide a hospedagem.' },
      { title: 'Registre o domínio no seu nome', body: 'No Registro.br, com renovação automática. Guarde onde está a senha, nunca a senha no caderno.' },
      { title: 'Faça a lista de conferência', body: 'O capítulo 6 tem o que testar no celular de outra pessoa, fora do seu Wi-Fi, antes de divulgar.' },
    ],
  },

  'identificando-tendencias': {
    path: 'identificando-tendencias',
    slug: 'dz-tendencias',
    role: 'Trilha',
    seoTitle: 'Identificando Tendências: ache ideias de negócio com dados gratuitos | Ebook',
    description:
      'Google Trends, Biblioteca de Anúncios da Meta, avaliações e redes: como separar tendência de moda e escolher a ideia com uma planilha de pontuação. R$ 17,99 no Pix.',
    h1: ['Ache ideias que valem o teste', 'com dados gratuitos.'],
    lede: 'Como ler os rastros que as pessoas deixam no Google, nos anúncios, nas avaliações e nas redes, separar tendência de moda e escolher a ideia com uma planilha de pontuação.',
    card: 'Ideias a partir do que as pessoas procuram, compram e reclamam.',
    pain: {
      h2: 'Ideia boa\nnão cai do céu.',
      lede: 'Quem espera inspiração constrói em cima de moda, ou desiste quando acha o primeiro concorrente.',
      rows: [
        ['Construir em cima de moda', 'Quando o projeto fica pronto, o pico já passou. Antes, olhe pelo menos 12 meses de histórico.'],
        ['Fugir da concorrência', 'Concorrência mostra que existe mercado. O ideal são concorrentes medianos, com falhas que você consegue resolver.'],
        ['Confundir viralização com demanda', 'Muita visualização mostra curiosidade. Demanda é quando alguém procura, compra ou reclama.'],
      ],
    },
    unit: 'Capítulo',
    chapters: [
      ['Tendência não é moda', 'Moda, tendência e sazonal, e a pergunta do "daqui a um ano".'],
      ['O que as pessoas procuram', 'Google Trends em 5 anos, consultas em ascensão e o autocompletar.'],
      ['Onde o dinheiro já está', 'Biblioteca de Anúncios da Meta e as listas de mais vendidos.'],
      ['Onde as pessoas reclamam', 'Avaliações de 1 a 3 estrelas, Reclame Aqui, comentários e grupos.'],
      ['Onde está a atenção', 'TikTok Creative Center, Instagram e YouTube.'],
      ['Da tendência à ideia', 'A planilha de pontuação e o calendário de datas sazonais.'],
    ],
    band: {
      kind: 'criteria',
      h2: 'Cinco notas\ndecidem a ideia.',
      lede: 'A planilha do capítulo 6: nota de 1 a 5 em cada critério. Acima de 18, a ideia vai para a validação. Abaixo de 12, fica para depois.',
      items: [
        ['Dor', 'O problema incomoda de verdade? Aparece nas reclamações?'],
        ['Dinheiro', 'Já tem gente pagando por soluções parecidas?'],
        ['Acesso', 'Eu consigo falar com essas pessoas facilmente?'],
        ['Concorrência', 'Os concorrentes são medianos, com falhas que eu resolvo?'],
        ['Momento', 'O interesse está estável ou subindo, e não caindo?'],
      ],
      note: 'Se tiver que escolher um critério, o livro escolhe acesso: uma ideia razoável com um público que você conhece costuma dar certo.',
    },
    sample: {
      from: 'Capítulo 4 · Onde as pessoas reclamam',
      prompt:
        'Estas são reclamações reais de clientes de [tipo de negócio]: [cole a lista]. Agrupe em temas, conte quantas vezes cada tema aparece e, para os 3 maiores, sugira uma solução simples que um iniciante consiga construir com IA e cobrar por ela.',
    },
    forWho: [
      'Quer empreender com IA e ainda não tem a ideia',
      'Tem várias ideias e não sabe qual testar primeiro',
      'Quer se preparar para Natal, Black Friday ou volta às aulas com antecedência',
    ],
    notFor: [
      'Procura uma lista pronta de "ideias que vendem"',
      'Quer pular a validação (os dados apontam o caminho, as conversas confirmam)',
    ],
    faq: [
      ['Preciso pagar alguma ferramenta?', 'Não. Google Trends, o autocompletar do Google, a Biblioteca de Anúncios da Meta, o TikTok Creative Center, o Reclame Aqui e as listas de mais vendidos são gratuitos.'],
      ['Serve para quem vende produto físico?', 'Os sinais funcionam para qualquer mercado, e o livro usa os mais vendidos do Mercado Livre e da Amazon. O foco, porém, são problemas que você consegue resolver com uma página, ferramenta, ebook, serviço ou sistema.'],
      ['Já tenho a ideia. Serve para mim?', 'A planilha de pontuação ajuda a conferir se ela vale o teste. Para validar com pessoas reais, o caminho está no livro base, O Método.'],
      ['Como recebo?', HOW_TO_GET],
      ['E se eu não gostar?', REFUND],
    ],
    closing: 'Leia os rastros\nantes de construir.',
    bumpPitch: 'Achou a ideia? O Método valida com 10 conversas e leva ao primeiro cliente.',
    firstSteps: [
      { title: 'Pesquise 10 termos no Google Trends', body: 'Brasil, últimos 5 anos. Anote as consultas em ascensão: é ali que o assunto novo aparece.' },
      { title: 'Anote 30 reclamações com a frase exata', body: 'Avaliações de 1 a 3 estrelas do seu nicho. As palavras do cliente vendem na sua página depois.' },
      { title: 'Pontue 5 oportunidades', body: 'A planilha do capítulo 6. A maior nota vai para a validação de O Método.' },
    ],
  },

  'memoria-obsidian-ia': {
    path: 'memoria-obsidian-ia',
    slug: 'dz-obsidian',
    role: 'Trilha',
    seoTitle: 'Memória com Obsidian + IA: a IA nunca mais esquece o seu projeto | Ebook',
    description:
      'O sistema de notas no Obsidian para a IA e você saberem onde cada projeto parou: uma pasta por projeto, decisões que não se perdem e o protocolo para o Claude Code. R$ 17,99 no Pix.',
    h1: ['A IA esquece entre conversas.', 'O seu projeto não precisa.'],
    lede: 'O sistema de notas que o autor usa com dezenas de projetos ao mesmo tempo: uma pasta por projeto no Obsidian, decisões que não se perdem e um protocolo para a IA ler no começo e escrever no fim.',
    card: 'O sistema para a IA nunca esquecer o que já foi decidido.',
    pain: {
      h2: 'Um diário\nnão é memória.',
      lede: 'Centenas de notas soltas, o mesmo projeto com mais de dez nomes e uma tarde para descobrir onde parou. Este livro nasceu desse problema.',
      rows: [
        ['A IA desfaz uma decisão', 'Você pede uma mudança e ela desfaz algo que foi feito de propósito. Você só percebe depois.'],
        ['Você repete um erro antigo', 'Uma ideia testada e descartada semanas antes volta como se fosse nova.'],
        ['Retomar custa uma tarde', 'Sem um resumo do estado atual, voltar a um projeto pausado é reler tudo.'],
      ],
    },
    unit: 'Capítulo',
    chapters: [
      ['Por que projetos se perdem', 'Os três esquecimentos e a solução em uma frase.'],
      ['Instalando o Obsidian', 'O vault, o mínimo de Markdown e backup grátis.'],
      ['A estrutura, uma pasta por projeto', 'O "agora" separado do "porquê".'],
      ['Os arquivos, um por um', 'O hub de até 100 linhas, a tabela de estado e os gatilhos.'],
      ['Decisões que não se perdem', 'O formato, com as alternativas descartadas.'],
      ['Ensinando a IA a usar a memória', 'No chat grátis, à mão, e automático com o Claude Code.'],
      ['Mantendo a memória viva', 'A revisão semanal de 15 minutos.'],
    ],
    band: {
      kind: 'code',
      h2: 'Uma pasta por projeto,\nsempre igual.',
      lede: 'A estrutura do capítulo 3. Os arquivos que mudam mostram o agora. Os que só crescem guardam o porquê.',
      label: 'projetos/ · exemplo do livro',
      code: `projetos/
└── confirma-facil/
    ├── confirma-facil.md   ← o hub
    ├── funcionalidades.md
    ├── decisoes.md
    ├── pendencias.md
    ├── historico.md
    ├── ambiente.md
    ├── glossario.md
    └── sessoes/
        └── 2026-11-16 - formulario de cadastro.md`,
      side: [
        ['O hub, até 100 linhas', 'O único arquivo que a IA lê sempre. Os outros, só quando a tarefa pede.'],
        ['Decisão não se apaga', 'Mudou de ideia? Uma decisão nova, e a antiga ganha a marca substituída.'],
        ['Nota guarda onde está a senha', 'Nunca a senha. Se o vault for para a nuvem, ela iria junto.'],
      ],
    },
    sample: {
      from: 'Capítulo 3 · A estrutura, uma pasta por projeto',
      prompt:
        'Crie a estrutura de memória para o meu projeto [nome], que é [descreva]. Quero os arquivos: hub (no máximo 100 linhas), funcionalidades, decisoes, pendencias, historico, ambiente e glossario. Preencha só com o que eu te contei. O que você não souber, escreva "a definir". Nunca invente.',
    },
    forWho: [
      'Toca mais de um projeto e perde o fio entre eles',
      'Usa IA todo dia e cansou de explicar o projeto de novo',
      'Usa o Claude Code e quer que ele leia e escreva as notas sozinho',
    ],
    notFor: [
      'Quer personalizar o Obsidian com temas e plugins',
      'Procura um gerenciador de tarefas para uma equipe',
    ],
    faq: [
      ['Preciso pagar o Obsidian?', 'Não. O Obsidian é gratuito. A sincronização paga é dispensável: o livro mostra como fazer backup de graça no Google Drive, no OneDrive ou no GitHub.'],
      ['Funciona com qualquer IA?', 'Sim: Claude, ChatGPT ou outra, colando o hub no começo da conversa. Com o Claude Code fica automático, porque ele lê e escreve as notas sozinho.'],
      ['Preciso saber Markdown?', 'Só quatro coisas: título, lista, negrito e link entre notas. O capítulo 2 ensina as quatro.'],
      ['Como recebo?', HOW_TO_GET],
      ['E se eu não gostar?', REFUND],
    ],
    closing: 'Pare de explicar\no projeto de novo.',
    bumpPitch: 'Com os prompts de fim de sessão e de revisão semanal, prontos para colar.',
    firstSteps: [
      { title: 'Instale o Obsidian e crie o vault', body: 'Com a pasta projetos e o backup no Drive, no OneDrive ou no GitHub.' },
      { title: 'Monte a pasta do primeiro projeto', body: 'Os 7 arquivos e a pasta sessoes. O prompt do capítulo 3 preenche sem inventar.' },
      { title: 'Registre as 3 primeiras decisões', body: 'No formato do capítulo 5, com as alternativas descartadas.' },
    ],
  },

  'biblioteca-de-prompts': {
    path: 'biblioteca-de-prompts',
    slug: 'dz-prompts',
    role: 'Bônus',
    seoTitle: 'Biblioteca de Prompts: 42 prompts para criar e lançar seu projeto com IA | Ebook',
    description:
      'Todos os prompts da série Do Zero ao Lançamento, organizados por etapa do projeto, mais 6 prompts do dia a dia do autor. Funcionam no Claude e no ChatGPT grátis. R$ 12,99 no Pix.',
    h1: ['42 prompts prontos', 'para cada etapa do projeto.'],
    lede: 'Todos os prompts da série, organizados pela etapa em que você está, e mais 6 do dia a dia de trabalho do autor. Copie, troque o que está entre colchetes e cole na IA que você usa.',
    card: 'Os 42 prompts da série num só lugar, prontos para copiar.',
    pain: {
      h2: 'Pedido vago,\nresposta genérica.',
      lede: 'A IA responde ao que você pede. Sem contexto, formato e limite, ela inventa ou devolve o óbvio. As três regras abrem o livro.',
      rows: [
        ['Sem contexto', 'Quem é o público, qual é o problema, o que já foi decidido. Todo prompt do livro já pede isso.'],
        ['Sem formato', 'Lista, tabela, passos, número máximo de linhas. A resposta já vem pronta para usar.'],
        ['Sem dizer o que não quer', '"Sem termos técnicos", "sem frases genéricas", "não invente; se não souber, pergunte".'],
      ],
    },
    unit: 'Parte',
    chapters: [
      ['O Método', '7 prompts, da ideia à decisão de insistir, mudar ou parar.'],
      ['Com Lovable', '5 prompts, do kit grátis ao texto da página.'],
      ['Com o Claude', '5 prompts, do nível certo ao CLAUDE.md.'],
      ['Colocando no Ar', '6 prompts, da escolha da hospedagem à conferência final.'],
      ['Identificando Tendências', '6 prompts, da moda à planilha de pontuação.'],
      ['Memória com Obsidian + IA', '7 prompts, da estrutura à revisão semanal.'],
      ['Prompts do meu dia a dia', '6 prompts do trabalho do autor, adaptados para qualquer pessoa.'],
    ],
    band: {
      kind: 'steps',
      cols: 3,
      h2: 'Seis prompts\ndo trabalho real.',
      lede: 'A parte 7: os prompts que o autor usa no dia a dia, adaptados para qualquer pessoa usar.',
      items: [
        ['Vendas', 'Prospecção consultiva', '3 ou 4 linhas, com o contexto do contato e uma pergunta aberta no fim.'],
        ['Design', 'Direção de arte que não parece IA', 'A especificação visual que outra IA segue sem adivinhar.'],
        ['Revisão', 'Revisor de afirmações', 'Aponta o que comprovar, suavizar ou remover antes de publicar.'],
        ['Produto', 'Três direções antes de construir', 'Três versões da tela, com focos diferentes. A decisão fica com você.'],
        ['Vendas', 'Resposta a quem respondeu', 'Classifica a intenção e avança a conversa um passo, sem pressionar.'],
        ['Memória', 'Fim de sessão', 'Nota, histórico, decisões e pendências, só com o que aconteceu.'],
      ],
    },
    sample: {
      from: 'Parte 7 · Revisor de afirmações',
      prompt:
        'Leia o texto abaixo como se fosse o dono do negócio e um fiscal ao mesmo tempo. Liste cada afirmação que pode ser falsa, exagerada ou que precise de comprovação (números, origem de produtos, resultados prometidos, regras da profissão). Para cada uma, diga se devo comprovar, suavizar ou remover. Texto: [cole].',
    },
    forWho: [
      'Usa IA no plano grátis e quer respostas melhores',
      'Está seguindo a série e quer os prompts num lugar só',
      'Vende serviços e quer prospectar sem parecer robô',
    ],
    notFor: [
      'Procura prompts para gerar imagem ou vídeo',
      'Quer um prompt que dispense pensar (a IA erra e às vezes inventa; quem decide é você)',
    ],
    faq: [
      ['Funciona no ChatGPT?', 'Sim. Os prompts funcionam no Claude, no ChatGPT ou em outra IA, todos nos planos gratuitos.'],
      ['Preciso ter os outros livros?', 'Não, mas cada prompt rende mais quando você já seguiu o capítulo correspondente, porque ele parte do que você preparou antes.'],
      ['Como recebo?', HOW_TO_GET],
      ['E se eu não gostar?', REFUND],
    ],
    closing: 'Copie, ajuste\ne cole.',
    bumpPitch: 'O caminho completo por trás dos prompts, com plano de 30 dias.',
    firstSteps: [
      { title: 'Leia as três regras da introdução', body: 'Contexto, formato e o que você não quer. Elas melhoram qualquer prompt, inclusive os seus.' },
      { title: 'Vá direto à parte da sua etapa', body: 'Ideia, construção, publicação, tendências ou memória. Cada parte segue a ordem dos capítulos.' },
      { title: 'Salve a sua versão', body: 'Quando um prompt funcionar bem, guarde a sua versão no caderno do projeto ou no Obsidian.' },
    ],
  },
};

export const DZ_PATHS = Object.keys(DZ_PAGES) as DzPath[];

/* Página da série completa. */
export const DZ_SERIES = {
  seoTitle: 'Do Zero ao Lançamento: crie e lance seu projeto com IA, sem programar | 7 ebooks',
  description:
    'Série com 7 ebooks em PDF: o método da ideia ao primeiro cliente, as trilhas Lovable e Claude, onde publicar de graça, tendências, memória do projeto e 42 prompts prontos. R$ 74,99 no Pix.',
  h1: ['Tire a ideia do papel com IA,', 'do zero ao primeiro cliente.'] as [string, string],
  lede: 'A IA já escreve o código. O que trava é o resto: saber o que construir, validar, não se perder, publicar e cobrar. São 7 livros com o método, as ferramentas grátis e 42 prompts prontos.',
  pain: {
    h2: 'A parte difícil\nnão é o código.',
    lede: 'Quem trava num projeto com IA quase nunca trava no código. Trava num destes cinco pontos, e cada um tem um livro na série.',
    rows: [
      ['Construir o que ninguém quer', 'Meses num app que ninguém pediu. O Método valida com 10 conversas antes da primeira tela.'],
      ['Gastar os créditos no primeiro pedido', 'Um pedido gigante, um app que quebra na primeira mudança. As trilhas ensinam a planejar de graça e construir uma tarefa por vez.'],
      ['A IA esquecer o que foi decidido', 'Cada conversa começa do zero. Por volta da terceira semana, o projeto vira bagunça. O caderno do projeto resolve.'],
      ['Publicar no lugar errado', 'O plano grátis da Vercel não permite uso comercial. Colocando no Ar compara as opções antes de você vender.'],
      ['Não saber cobrar', 'Pix sem mensalidade, como dar o preço e os primeiros clientes sem verba. Está em O Método.'],
    ] as [string, string][],
  },
  /* Os limites que os livros avisam antes (conferidos em novembro de 2026). */
  tools: [
    ['Lovable', 'Construir conversando', '5 créditos por dia, até 30 por mês. Domínio próprio só no pago.'],
    ['Claude, no chat', 'Planejar e criar páginas', 'Grátis, com um limite de uso que renova.'],
    ['Claude Code', 'Projetos com login e banco', 'A partir do Pro, US$ 20 por mês. A única exceção paga da série.'],
    ['Cloudflare Pages', 'Publicar e vender', 'Grátis, com uso comercial e sem limite de tráfego.'],
    ['Vercel Hobby', 'Testar e prototipar', 'Grátis, mas só para uso pessoal e não comercial.'],
    ['Supabase', 'Banco de dados e login', 'Grátis, com 2 projetos. Pausa depois de uma semana parado.'],
    ['Domínio .com.br', 'Endereço próprio', 'Cerca de R$ 40 por ano no Registro.br. Compre depois de validar.'],
  ] as [string, string, string][],
  plan: PLAN_30,
  forWho: [
    'Tem uma ideia de site, app ou ferramenta e nunca programou',
    'Já testou o Lovable ou o chat do Claude e travou no meio',
    'Quer um produto ou uma renda própria sem pagar uma agência para começar',
  ],
  notFor: [
    'Quer aprender a programar do zero (os livros ensinam a conduzir a IA)',
    'Procura app pronto, ideia pronta ou renda garantida',
  ],
  faq: [
    ['Preciso saber programar?', 'Não. A série foi escrita para quem nunca programou. A IA escreve o código; os livros ensinam a decidir, pedir, testar, publicar e cobrar.'],
    ['Vou ter que pagar alguma ferramenta?', 'Não para começar. Tudo começa no plano grátis, e cada livro avisa antes quando um limite pode te pegar. A única exceção paga é o Claude Code (US$ 20 por mês), que é opcional e só entra quando o projeto cresce. Domínio próprio, cerca de R$ 40 por ano, só depois de validar.'],
    ['Lovable ou Claude: qual trilha eu sigo?', 'Lovable se você quer construir conversando, sem lidar com arquivos. Claude se você quer mais controle e não depender de plataforma. Na série completa você leva as duas e escolhe depois.'],
    ['Preços e limites de ferramenta não mudam?', 'Mudam. Tudo foi conferido em novembro de 2026, e cada livro diz onde conferir antes de você depender de um limite.'],
    ['A série é patrocinada por alguma dessas empresas?', 'Não. O livro Colocando no Ar avisa que alguns links podem ser de parceiros, com comissão para o autor e sem custo a mais para você.'],
    ['Como recebo?', 'Assim que o Pix é confirmado, a própria página mostra os 7 livros para baixar. Sem cadastro e sem sair daqui.'],
    ['E se eu não gostar?', REFUND],
  ] as [string, string][],
};

export function dzBook(path: string): DzBook | undefined {
  return path in DZ_PAGES ? DZ_PAGES[path as DzPath] : undefined;
}

/* Páginas de amostra (public/do-zero/pagina-<livro>-<n>.webp), legenda = capítulo real. */
export const DZ_SAMPLE_PAGES: Record<DzPath, string[]> = {
  'o-metodo': ['Capítulo 1 · A ideia certa', 'Capítulo 4 · A memória do projeto', 'Fechamento · Plano de 30 dias'],
  'com-lovable': ['Capítulo 1 · Passo zero, seu kit grátis', 'Capítulo 3 · Design sem ser designer', 'Capítulo 4 · Construindo com IA'],
  'com-o-claude': ['Capítulo 1 · Qual nível é o seu', 'Capítulo 3 · Publicando na Cloudflare', 'Capítulo 5 · Exemplo de CLAUDE.md'],
  'colocando-no-ar': ['Capítulo 2 · As opções lado a lado', 'Capítulo 1 · Hospedagem, domínio e DNS', 'Capítulo 2 · Resumo em uma frase'],
  'identificando-tendencias': ['Capítulo 6 · Da tendência à ideia', 'Capítulo 3 · Onde o dinheiro já está', 'Capítulo 2 · O que as pessoas procuram'],
  'memoria-obsidian-ia': ['Capítulo 3 · A estrutura', 'Capítulo 5 · Decisões que não se perdem', 'Capítulo 4 · Os gatilhos'],
  'biblioteca-de-prompts': ['Parte 1 · O Método', 'Parte 7 · Direção de arte', 'Introdução · Como usar a biblioteca'],
};
