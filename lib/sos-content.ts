/*
  Copy das LPs de campanha SOS. Fonte: docs/lps/copy-sos.md (método Schwartz
  + pesquisa OpenSEO). Regras: sem travessão, sem número inventado, a palavra
  do público ("vírus", não "malware"; nome da ferramenta, não "vibe code").
*/
import type { LucideIcon } from 'lucide-react';
import {
  Bug,
  CalendarX,
  Coins,
  Database,
  DoorOpen,
  ExternalLink,
  Gauge,
  GitBranch,
  Globe,
  Hand,
  History,
  Hourglass,
  KeyRound,
  LockOpen,
  MailWarning,
  MousePointerClick,
  Puzzle,
  Repeat,
  ScanEye,
  SearchX,
  ShieldAlert,
  TriangleAlert,
  Users,
  UserX,
} from 'lucide-react';

export interface IconItem {
  icon: LucideIcon;
  text: string;
}

export interface IconCard {
  icon: LucideIcon;
  title: string;
  body: string;
  tech?: string;
}

export interface Step {
  title: string;
  body: string;
  tags?: string[];
  highlight?: string;
}

export interface Plan {
  who: string;
  name: string;
  price: number;
  per: string;
  items: string[];
  cta: string;
  featured?: string;
}

export interface Qa {
  q: string;
  a: string;
}

export interface SosForm {
  title: string;
  hint: string;
  choiceLabel: string;
  choices: string[];
  linkLabel: string;
  linkPlaceholder: string;
  submit: string;
  /* Rótulo do botão abaixo de 640px, onde o longo quebra em duas linhas. */
  submitShort: string;
  legal: string;
  /* Primeira linha da mensagem que chega no WhatsApp da C9. */
  messageIntro: string;
  choicePrefix: string;
  linkPrefix: string;
}

export interface SosPage {
  slug: string;
  offer: string;
  variant: 'sky' | 'night';
  nav: { secondary: string; secondaryHref: string; primary: string };
  hero: {
    headline: string;
    headlineAccent?: string;
    lead?: string;
    sub: string;
    facts?: { value: string; label: string }[];
    tools?: { label: string; items: string[] };
  };
  form: SosForm;
  signs: { title: string; lede: string; items: IconItem[]; relief?: { strong: string; rest: string } };
  mechanism?: { quote: string; quoteAccent: string; by: string; title: string; reasons: IconCard[] };
  cost: { id?: string; title: string; lede: string; cards: IconCard[]; note?: string };
  steps: { title: string; lede: string; items: Step[] };
  pricing?: { id: string; title: string; lede: string; plans: Plan[] };
  faq: Qa[];
  close: { title: string; body: string; cta: string };
  footer: string;
}

export const sosWordpress: SosPage = {
  slug: 'sos-wordpress',
  offer: 'SOS WordPress',
  variant: 'sky',
  nav: { secondary: 'Quanto custa', secondaryHref: '#preco', primary: 'Mandar meu site' },
  hero: {
    headline: 'Seu site WordPress caiu, ficou lento ou pegou vírus?',
    lead: 'A gente conserta e fica de olho depois.',
    sub: 'Você manda o endereço, a gente responde o que está acontecendo e quanto custa pra resolver, antes de qualquer compromisso.',
    facts: [
      { value: 'R$ 0', label: 'pro diagnóstico' },
      { value: '24 h', label: 'pra responder' },
      { value: '1 cópia', label: 'antes de mexer em tudo' },
    ],
  },
  form: {
    title: 'Pedir o diagnóstico',
    hint: 'Só o endereço e o que está acontecendo. O resto a gente olha.',
    choiceLabel: 'O que está acontecendo',
    choices: ['Pegou vírus', 'Fora do ar', 'Muito lento', 'Erro crítico', 'Quero manutenção'],
    linkLabel: 'Endereço do site',
    linkPlaceholder: 'www.seusite.com.br',
    submit: 'Mandar meu site pro diagnóstico',
    submitShort: 'Pedir diagnóstico grátis',
    legal: 'Abre o WhatsApp com a mensagem pronta. Sem senha nesta etapa.',
    messageIntro: 'Olá! Quero o diagnóstico grátis do SOS WordPress.',
    choicePrefix: 'Problema',
    linkPrefix: 'Site',
  },
  signs: {
    title: 'Sinais de que seu site WordPress precisa de manutenção.',
    lede: 'Se você reconheceu um desses, o problema não vai sumir sozinho. Costuma piorar em silêncio.',
    items: [
      { icon: TriangleAlert, text: 'Aparece “Houve um erro crítico no seu site” ou uma tela branca' },
      { icon: ExternalLink, text: 'Clicam no seu link e vão parar num site estranho' },
      { icon: ShieldAlert, text: 'O Google avisa que o seu site pode ser perigoso' },
      { icon: Hourglass, text: 'Demora tanto pra abrir que a pessoa desiste antes' },
      { icon: Puzzle, text: 'Você atualizou um plugin e alguma coisa parou' },
      { icon: CalendarX, text: 'Ninguém mexe no site há meses e você não sabe se está em dia' },
      { icon: KeyRound, text: 'Quem fez o site sumiu e você não tem nem a senha' },
      { icon: UserX, text: 'Apareceu um usuário administrador que ninguém criou' },
    ],
  },
  cost: {
    title: 'Site hackeado não é só um site fora do ar.',
    lede: 'O estrago continua enquanto ninguém olha. E voltar demora mais do que cair.',
    cards: [
      {
        icon: MousePointerClick,
        title: 'Você paga o clique e perde a pessoa',
        body: 'Com o aviso de site perigoso na tela, quem veio do seu anúncio volta pra trás antes de ver qualquer coisa.',
      },
      {
        icon: MailWarning,
        title: 'Seu e-mail vai pro lixo dos clientes',
        body: 'Vírus em WordPress costuma ficar escondido mandando spam pelo seu domínio. Aí até o seu orçamento cai na caixa de spam.',
      },
      {
        icon: SearchX,
        title: 'O Google tira suas páginas da busca',
        body: 'Página infectada sai do resultado. Depois de limpa, ainda leva tempo até o Google confiar de novo.',
      },
      {
        icon: DoorOpen,
        title: 'Limpar sem fechar a porta é pagar duas vezes',
        body: 'Se o jeito por onde o vírus entrou continua aberto, ele volta. Às vezes na mesma semana.',
      },
    ],
  },
  steps: {
    title: 'Suporte e manutenção de site WordPress, em três passos.',
    lede: 'Nada é atualizado direto no site que está no ar. É por isso que o conserto não quebra outra coisa.',
    items: [
      {
        title: 'Diagnóstico',
        body: 'A gente abre o site e te conta o que está errado, em português, com o que precisa ser feito e quanto custa. Você decide depois.',
      },
      {
        title: 'Conserto numa cópia',
        body: 'Tudo é feito primeiro numa cópia do site. Só vai pro ar depois de testado, sempre com um ponto de volta se algo não sair como esperado.',
      },
      {
        title: 'Monitoramento',
        body: 'O site passa a ser varrido todo dia: plugin, tema e usuário administrador. Apareceu um usuário que ninguém criou ou um plugin que ninguém instalou, você fica sabendo antes do Google.',
        highlight: 'Painel pra você acompanhar tudo',
      },
    ],
  },
  pricing: {
    id: 'preco',
    title: 'Quanto custa a manutenção de um site WordPress.',
    lede: 'Preço aberto, sem precisar ligar pra descobrir. O diagnóstico é grátis e você sabe o valor antes de qualquer coisa.',
    plans: [
      {
        who: 'Pra quem tem um problema agora',
        name: 'SOS pontual',
        price: 399,
        per: 'por atendimento',
        items: [
          'Diagnóstico completo do que está errado',
          'Remoção de vírus e limpeza do site',
          'Correção de erro, lentidão ou atualização quebrada',
          'Fechar a porta por onde o problema entrou',
          'Prazo combinado junto com o diagnóstico',
        ],
        cta: 'Resolver agora',
      },
      {
        who: 'Manutenção mensal WordPress',
        name: 'Plano mensal',
        price: 199,
        per: 'por mês',
        featured: 'Pra não passar por isso de novo',
        items: [
          'Atualização de WordPress, tema e plugins, testada numa cópia',
          'Backup que a gente testa de verdade, não só guarda',
          'Monitoramento diário de plugin, tema e usuário, num painel que você acompanha',
          'Suporte pelo WhatsApp com um especialista em WordPress',
          'Se voltar a acontecer, o suporte continua sem custo extra',
        ],
        cta: 'Quero o plano mensal',
      },
    ],
  },
  faq: [
    {
      q: 'Quanto custa a manutenção de um site WordPress?',
      a: 'O SOS pontual sai por R$ 399 e o plano mensal por R$ 199 por mês. O diagnóstico é grátis, e você recebe o valor fechado antes de a gente mexer em qualquer coisa.',
    },
    {
      q: 'Preciso passar minha senha?',
      a: 'Pro diagnóstico, não. Pro conserto, você cria um acesso temporário só pra isso e apaga quando terminar. Sua senha pessoal fica com você.',
    },
    {
      q: 'Vou perder o conteúdo do site?',
      a: 'Antes de mexer, a gente faz uma cópia completa do site. Se algo não sair como esperado, ele volta exatamente como estava.',
    },
    {
      q: 'Meu site é antigo e o tema é velho. Tem jeito?',
      a: 'Tem. A gente atualiza o projeto pra versão atual do WordPress, com tema e plugins em dia. Se o site estiver velho demais pra valer a pena remendar, você recebe junto uma proposta de redesign, e decide com os dois caminhos na mesa.',
    },
    {
      q: 'Quanto tempo demora?',
      a: 'A resposta do diagnóstico chega em até 24 horas. O prazo do conserto depende do que aparecer, e a gente combina com você junto com o valor.',
    },
    {
      q: 'Vocês fazem site novo?',
      a: 'Não é o foco desta página. Aqui é consertar e manter o site que você já tem, sem jogar fora o que funciona.',
    },
  ],
  close: {
    title: 'Manda o endereço do seu site.',
    body: 'Em até 24 horas você sabe o que está acontecendo e quanto custa pra resolver, sem pagar nada por isso.',
    cta: 'Mandar meu site pro diagnóstico',
  },
  footer: 'SOS WordPress · manutenção e suporte de site WordPress',
};

export const sosVibeCode: SosPage = {
  slug: 'sos-vibe-code',
  offer: 'SOS Vibe Code',
  variant: 'night',
  nav: { secondary: 'O que costuma estar aberto', secondaryHref: '#riscos', primary: 'Quero a auditoria' },
  hero: {
    headline: 'Fez no Lovable e agora travou?',
    headlineAccent: 'A gente termina o que a IA começou.',
    sub: 'Uma pessoa de verdade lê o código que a IA escreveu, mostra o que está errado e coloca seu app no ar, sem você ter que jogar nada fora.',
    tools: { label: 'Serve pra app feito em', items: ['Lovable', 'v0', 'Bolt', 'Cursor', 'Replit'] },
  },
  form: {
    title: 'Auditoria de 20 minutos, grátis',
    hint: 'Você mostra o app, a gente aponta os três problemas mais urgentes. A lista fica com você, contratando ou não.',
    choiceLabel: 'Onde você fez',
    choices: ['Lovable', 'v0', 'Bolt', 'Cursor', 'Replit', 'Outro'],
    linkLabel: 'Link do app ou do preview',
    linkPlaceholder: 'meuapp.lovable.app',
    submit: 'Quero minha auditoria de 20 minutos',
    submitShort: 'Quero a auditoria grátis',
    legal: 'Resposta em até 24 horas pelo WhatsApp. Não precisa mandar código agora.',
    messageIntro: 'Olá! Quero a auditoria grátis de 20 minutos do SOS Vibe Code.',
    choicePrefix: 'Feito em',
    linkPrefix: 'App',
  },
  signs: {
    title: 'Você está aqui se...',
    lede: 'Reconheceu dois desses? Então o app já passou do ponto em que mais um prompt resolve.',
    items: [
      { icon: Bug, text: 'Pediu pra IA corrigir um erro e ela criou dois' },
      { icon: Coins, text: 'Seus créditos acabam antes do app ficar pronto' },
      { icon: Globe, text: 'Funciona no preview e quebra no seu domínio' },
      { icon: Users, text: 'Tem gente usando e você não sabe se os dados estão protegidos' },
      { icon: Hand, text: 'Tem medo de mexer porque da última vez quebrou tudo' },
      { icon: Repeat, text: 'Colou o mesmo erro no chat pela décima vez' },
    ],
    relief: {
      strong: 'Isso não quer dizer que você fez errado.',
      rest: 'Quer dizer que chegou no ponto em que a ferramenta para de ajudar. Todo mundo que constrói com IA chega nele, e o que você construiu até aqui continua valendo.',
    },
  },
  mechanism: {
    quote: 'A IA conserta o erro que você mostra.',
    quoteAccent: 'A gente lê o sistema que ela escreveu.',
    by: 'É essa a diferença. Uma pessoa lê o código inteiro antes de mudar uma linha, em vez de consertar o sintoma e torcer.',
    title: 'Por que a IA fica presa no mesmo erro.',
    reasons: [
      {
        icon: ScanEye,
        title: 'Ela vê só o pedaço que você mostra',
        body: 'O erro aparece numa tela, mas costuma nascer em outro arquivo que ela nem abriu.',
      },
      {
        icon: GitBranch,
        title: 'Cada correção mexe no que funcionava',
        body: 'Resolve o sintoma e muda algo do lado. Aí o próximo erro aparece onde estava tudo certo.',
      },
      {
        icon: History,
        title: 'Ela não lembra o que já tentou',
        body: 'Você paga crédito pela mesma tentativa várias vezes, com palavras um pouco diferentes.',
      },
    ],
  },
  cost: {
    id: 'riscos',
    title: 'O que costuma estar aberto num app feito com IA.',
    lede: 'Não aparece na tela e não dá erro. Por isso quase ninguém percebe até alguém usar contra você.',
    cards: [
      {
        icon: KeyRound,
        title: 'Chave de acesso visível no navegador',
        body: 'Qualquer pessoa que abrir o site consegue usar sua conta de IA ou de banco de dados. E a fatura vem pra você.',
        tech: 'API key no frontend',
      },
      {
        icon: Database,
        title: 'Banco de dados sem regra de acesso',
        body: 'Um usuário logado consegue ler os dados de outro usuário. Nome, e-mail, o que ele guardou no seu app.',
        tech: 'RLS desligada no Supabase',
      },
      {
        icon: Gauge,
        title: 'Nenhum limite de uso',
        body: 'Alguém dispara mil pedidos por minuto e sua conta de IA ou de servidor explode numa noite.',
        tech: 'sem rate limit',
      },
      {
        icon: LockOpen,
        title: 'Página de administrador sem senha de verdade',
        body: 'A rota existe, só está escondida. Esconder não é proteger: quem procura, acha.',
        tech: 'rota admin sem auth',
      },
    ],
    note: 'São problemas comuns em apps gerados por IA, não uma afirmação sobre o seu. A auditoria serve justamente pra saber se algum deles está no seu app.',
  },
  steps: {
    title: 'Como funciona.',
    lede: 'Você não precisa saber programar. Precisa só explicar o que o app tem que fazer.',
    items: [
      {
        title: 'Auditoria de 20 minutos',
        body: 'Você mostra o app, a gente aponta os três problemas mais urgentes. Você sai com a lista, contratando ou não.',
        tags: ['Grátis'],
      },
      {
        title: 'Sprint de produção',
        body: 'Corrige o que trava, fecha o que está aberto e coloca o app no seu domínio, funcionando com gente de verdade usando.',
        tags: ['R$ 299', 'Prazo a combinar'],
      },
      {
        title: 'Entrega no seu GitHub',
        body: 'O código continua seu. Se quiser voltar a usar o Lovable ou o Cursor depois, pode, e a IA passa a acertar mais.',
        tags: ['Código seu'],
      },
    ],
  },
  faq: [
    {
      q: 'Vou ter que jogar fora o que fiz?',
      a: 'Não. A gente parte do que existe. Na maioria das vezes o app está mais perto de pronto do que parece, e o que falta é arrumar a base.',
    },
    {
      q: 'Preciso saber programar?',
      a: 'Não. Você explica o que o app tem que fazer, do jeito que explicaria pra um amigo. A parte técnica é com a gente.',
    },
    { q: 'O código continua meu?', a: 'Sim. Tudo fica no seu GitHub, na sua conta. Você pode levar pra onde quiser.' },
    {
      q: 'Posso continuar usando o Lovable?',
      a: 'Pode. A gente deixa o projeto organizado de um jeito que a IA volta a acertar mais e gastar menos crédito.',
    },
    {
      q: 'Quanto custa?',
      a: 'A auditoria de 20 minutos é grátis. O sprint de produção sai por R$ 299, e você só decide depois da auditoria, com a lista de problemas na mão.',
    },
    {
      q: 'Quanto tempo leva?',
      a: 'A gente responde seu pedido em até 24 horas e marca a auditoria pra essa semana. O prazo do sprint depende do que aparecer na lista, e é combinado com você junto com o valor.',
    },
  ],
  close: {
    title: 'Não gaste mais nenhum crédito pra descobrir o que está errado.',
    body: 'Marca 20 minutos. Você sai com os três problemas mais urgentes do seu app, por escrito.',
    cta: 'Quero minha auditoria de 20 minutos',
  },
  footer: 'SOS Vibe Code · apps feitos com IA prontos pra produção',
};
