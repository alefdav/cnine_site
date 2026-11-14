import type { IconName } from '@/components/c9/icon';
import type { ServiceSlug } from '@/lib/c9';

/*
  Texto das seis páginas de serviço. A peça da hero e a faixa escura de cada
  página são componentes próprios (components/c9/service-art.tsx); aqui fica
  só o que é texto. "\n" marca a quebra de linha editorial dos títulos.
  Regra: número só com fonte (Nexus: Search Console e Perfil da Empresa do
  laboratório). Nada de preço, depoimento ou prazo inventado.
*/

export interface ServicePage {
  slug: ServiceSlug;
  /* Nome curto do serviço, usado em "quem vai cuidar do seu ___" e no WhatsApp. */
  short: string;
  title: string;
  seoTitle: string;
  description: string;
  serviceType: string;
  h1: [string, string];
  lede: string;
  cta2: string;
  seed: number;
  pain: { h2: string; lede: string; rows: [string, string][] };
  inc: { h2: string; lede: string; big?: boolean; items: [IconName, string, string][] };
  faq: [string, string][];
}

export const SERVICE_PAGES: Record<ServiceSlug, ServicePage> = {
  'google-meu-negocio': {
    slug: 'google-meu-negocio',
    short: 'Google',
    title: 'Google e Maps',
    seoTitle: 'Google Meu Negócio e SEO local para negócio local | C9',
    description:
      'Perfil da Empresa no Google arrumado, SEO local e medição de cada ligação e WhatsApp. O Nexus Lab saiu de fora do top 20 para 1º no Google Maps.',
    serviceType: 'SEO local e Perfil da Empresa no Google',
    h1: ['Apareça no mapa', 'quando procurarem você.'],
    lede: 'Perfil no Google arrumado, SEO local e medição de cada ligação.',
    cta2: 'Ver o caso Nexus',
    seed: 21,
    pain: {
      h2: 'Quem busca liga\npara os três primeiros.',
      lede: 'O perfil existe, mas o Google não sabe para que buscas mostrar você.',
      rows: [
        ['Categoria errada', 'O Google mostra o seu perfil para buscas que não são o seu serviço.'],
        ['Sem foto, horário e avaliação', 'Quem compara três perfis escolhe o que parece aberto e confiável.'],
        ['Ninguém mede', 'Você não sabe quantas ligações o Google te mandou no mês.'],
      ],
    },
    inc: {
      h2: 'O que a gente arruma\ne o que a gente mede.',
      lede: 'Seis peças, todas no nome do seu negócio.',
      items: [
        ['grid', 'Categorias e serviços', 'A troca que tirou o Nexus de fora do top 20.'],
        ['img', 'Fotos, horários e descrição', 'Perfil com cara de negócio aberto.'],
        ['star', 'Avaliações', 'Pedido no momento certo e resposta a cada uma.'],
        ['pin', 'SEO local na sua página', 'Cidade, bairro e serviço como as pessoas buscam.'],
        ['phone', 'Ligações e WhatsApp', 'Quantos contatos o Google mandou, todo mês.'],
        ['chart', 'Search Console', 'Em que buscas você aparece e quem clica.'],
      ],
    },
    faq: [
      ['Em quanto tempo aparece resultado?', 'Depende da cidade e da concorrência. No Nexus, a primeira subida veio em 6 dias. Posição com data marcada a gente não promete.'],
      ['Preciso ter site?', 'Não para começar. O perfil funciona sozinho, e a página entra quando ele já traz busca.'],
      ['Já tenho perfil. Começa do zero?', 'Não. A gente parte dele, corrige o que está errado e mantém as avaliações que você já tem.'],
    ],
  },
  'trafego-pago': {
    slug: 'trafego-pago',
    short: 'anúncio',
    title: 'Anúncios e prospecção',
    seoTitle: 'Gestor de tráfego pago local: Google Ads e Meta Ads | C9',
    description:
      'Google Ads e Meta Ads só para a sua região, com a verba na conta do seu negócio, e prospecção ativa pelo WhatsApp, escrita caso a caso.',
    serviceType: 'Gestão de tráfego pago local e prospecção de clientes',
    h1: ['Anúncio para quem', 'está perto e precisa.'],
    lede: 'Google e Instagram na sua região, com a verba na sua conta.',
    cta2: 'Ver como a verba anda',
    seed: 31,
    pain: {
      h2: 'Anúncio caro\né anúncio para longe.',
      lede: 'Verba que vai para fora da sua região ou para um clique que não vira conversa.',
      rows: [
        ['Público largo demais', 'Gente de outra cidade clica, e você paga.'],
        ['Clique que cai no Instagram', 'Sem página e sem botão de WhatsApp, a pessoa volta.'],
        ['Conta no nome da agência', 'Trocou de fornecedor, perdeu o histórico.'],
      ],
    },
    inc: {
      h2: 'Anúncio e prospecção\nno mesmo plano.',
      lede: 'Quem procura recebe o anúncio. Quem tem demanda recebe uma mensagem.',
      items: [
        ['search', 'Google Ads local', 'Para quem já busca o seu serviço na região.'],
        ['users', 'Meta Ads', 'Instagram e Facebook para quem mora perto.'],
        ['img', 'Criativos de catálogo', 'O seu serviço e o seu preço, prontos para rodar.'],
        ['target', 'Prospecção ativa', 'A gente levanta quem já tem demanda perto de você.'],
        ['chat', 'Abordagem no WhatsApp', 'Mensagem escrita caso a caso, sem disparo em massa.'],
        ['chart', 'Relatório do mês', 'Cada número com a fonte: a conta do anúncio.'],
      ],
    },
    faq: [
      ['Qual a verba mínima?', 'Sai no diagnóstico, de acordo com a sua cidade e o seu serviço. Você paga direto à plataforma.'],
      ['A C9 cobra por clique?', 'Não. A gestão é cobrada à parte, e a verba fica na conta do seu negócio.'],
      ['Prospecção é disparo em massa?', 'Não. Cada abordagem é escrita para quem já mostrou que precisa do seu serviço.'],
    ],
  },
  'sites-e-paginas': {
    slug: 'sites-e-paginas',
    short: 'site',
    title: 'Páginas e sites',
    seoTitle: 'Criação de site e página de conversão para negócio local | C9',
    description:
      'Página de conversão ou site institucional, em português ou espanhol, feita para virar mensagem no WhatsApp. Domínio e acessos no nome do seu negócio.',
    serviceType: 'Criação de sites e páginas de conversão',
    h1: ['Página que vira', 'mensagem no WhatsApp.'],
    lede: 'Página de conversão ou site completo, em português ou espanhol.',
    cta2: 'Ver em espanhol',
    seed: 41,
    pain: {
      h2: 'Perfil de Instagram\nnão é página.',
      lede: 'Quem clica precisa entender em segundos o que você faz e onde fica.',
      rows: [
        ['Não explica o serviço', 'A pessoa não sabe se você faz o que ela precisa.'],
        ['Endereço escondido', 'Sem cidade e bairro à vista, ela não sabe se você atende.'],
        ['Botão longe', 'Se o WhatsApp não está à mão, ela chama o próximo.'],
      ],
    },
    inc: {
      h2: 'Da página única\nao site inteiro.',
      lede: 'Domínio, acessos e conteúdo sempre no nome do seu negócio.',
      items: [
        ['page', 'Página de conversão', 'Um serviço, uma página, um botão de WhatsApp.'],
        ['building', 'Site institucional', 'Para quem tem vários serviços ou unidades.'],
        ['refresh', 'Redesign', 'Cara nova sem perder o que já aparece no Google.'],
        ['globe', 'Português ou espanhol', 'A mesma página para o Brasil e para o México.'],
        ['pin', 'SEO local', 'Cidade, bairro e serviço como as pessoas buscam.'],
        ['video', 'Vídeo da entrega', 'A página pronta, em vídeo, para o seu Instagram.'],
      ],
    },
    faq: [
      ['Quanto tempo leva?', 'O prazo sai no plano, por escrito. Nada vai ao ar antes da sua aprovação.'],
      ['O site fica no meu nome?', 'Fica. Domínio e acessos são do seu negócio, com ou sem a C9.'],
      ['Já tenho site. Precisa refazer?', 'Nem sempre. O diagnóstico mostra se basta ajustar a página que já existe.'],
    ],
  },
  'atendimento-com-ia': {
    slug: 'atendimento-com-ia',
    short: 'atendimento',
    title: 'Atendimento com IA',
    seoTitle: 'Agente de IA no WhatsApp que responde e agenda | C9',
    description:
      'Agente de IA no WhatsApp que responde em segundos, agenda e passa para a sua equipe, e a Véspera, que confirma a consulta no dia anterior.',
    serviceType: 'Agente de IA para WhatsApp e confirmação de agendamento',
    h1: ['Ninguém fica sem resposta,', 'nem às 22h.'],
    lede: 'Agente de IA no WhatsApp que responde, agenda e chama sua equipe.',
    cta2: 'Ver a Véspera',
    seed: 51,
    pain: {
      h2: 'Quem responde primeiro\nfica com o cliente.',
      lede: 'A mensagem que espera até de manhã já marcou com outro.',
      rows: [
        ['Mensagem fora do horário', 'Às 22h ninguém responde, e ele não espera.'],
        ['Só quer saber o preço', 'A equipe gasta o dia com quem não vai marcar.'],
        ['Marcou e não veio', 'Ninguém confirmou na véspera, e a vaga ficou parada.'],
      ],
    },
    inc: {
      h2: 'Um atendente que\nnão sai do WhatsApp.',
      lede: 'Com o jeito e as regras do seu negócio, escritos junto com você.',
      items: [
        ['chat', 'Resposta em segundos', 'De dia, de noite e no fim de semana.'],
        ['filter', 'Triagem', 'Separa quem quer preço de quem quer marcar.'],
        ['cal', 'Agendamento', 'Oferece horário livre e marca na conversa.'],
        ['users', 'Passa para uma pessoa', 'Quando o caso sai do script, chama a equipe.'],
        ['mic', 'Atendimento por voz', 'Em português, para quem prefere ligar.'],
        ['bell', 'Véspera', 'Confirma a consulta no dia anterior.'],
      ],
    },
    faq: [
      ['Parece robô?', 'Ele responde com o jeito e as regras do seu negócio e passa a conversa para a sua equipe quando o cliente precisa de uma pessoa.'],
      ['Preciso trocar o meu número?', 'Na maioria dos casos, não. No diagnóstico a gente confere se o número que o cliente já conhece pode receber o atendimento.'],
      ['Quem vê as conversas?', 'Você e a sua equipe. As conversas ficam registradas para consulta.'],
    ],
  },
  conteudo: {
    slug: 'conteudo',
    short: 'conteúdo',
    title: 'Conteúdo recorrente',
    seoTitle: 'Posts, stories e e-mail todo mês para negócio local | C9',
    description:
      'Molde, Cena e Carta: posts prontos para trocar a foto, stories e vídeos em motion e e-mail para quem já comprou de você, todo mês.',
    serviceType: 'Conteúdo recorrente para redes sociais e e-mail',
    h1: ['Quem já comprou', 'lembra e volta.'],
    lede: 'Posts, stories e e-mail todo mês, sem agência de social media.',
    cta2: 'Ver o que você faz',
    seed: 61,
    pain: {
      h2: 'Perfil parado\nparece negócio fechado.',
      lede: 'E quem comprou uma vez esquece de você até precisar de novo.',
      rows: [
        ['Sem tempo para postar', 'O dia a dia ganha, e o último post é de meses atrás.'],
        ['Pacote que mede curtida', 'Social media que entrega seguidor, não cliente.'],
        ['Base esquecida', 'Você tem o contato de quem comprou e nunca manda nada.'],
      ],
    },
    inc: {
      big: true,
      h2: 'Três peças,\ntodo mês.',
      lede: 'Contrate as três ou só a que está faltando.',
      items: [
        ['layers', 'Molde', 'O post pronto. Você troca a foto e o preço e publica.'],
        ['video', 'Cena', 'Stories e vídeos em motion com a sua marca.'],
        ['mail', 'Carta', 'E-mail para a sua base, para quem já comprou voltar.'],
      ],
    },
    faq: [
      ['Preciso aparecer em vídeo?', 'Não. A Cena trabalha com motion, a partir da sua marca e das suas fotos.'],
      ['Posso contratar só um?', 'Pode. Molde, Cena e Carta funcionam separados.'],
      ['A Carta usa a minha lista?', 'Usa os contatos de quem já comprou de você, com descadastro em todo e-mail.'],
    ],
  },
  'sistemas-sob-medida': {
    slug: 'sistemas-sob-medida',
    short: 'sistema',
    title: 'Sistemas sob medida',
    seoTitle: 'Sistema sob medida com IA para o seu negócio | C9',
    description:
      'Sistema web feito para o seu processo, com IA que consulta os dados reais do negócio: agenda, orçamento, portal do cliente e Pix Automático.',
    serviceType: 'Desenvolvimento de sistemas sob medida com IA',
    h1: ['Seu sistema próprio,', 'com IA dentro.'],
    lede: 'A C9 constrói o sistema e liga a IA nos seus dados.',
    cta2: 'Ver o que já está no ar',
    seed: 71,
    pain: {
      h2: 'Planilha, caderno\ne três aplicativos.',
      lede: 'Quando o negócio cresce, a informação se espalha e ninguém acha nada.',
      rows: [
        ['Aplicativo pronto não serve', 'Falta o que você precisa e sobra o que você paga.'],
        ['Informação espalhada', 'Agenda num lugar, orçamento em outro, caixa no caderno.'],
        ['Equipe procura em vez de atender', 'Cada pergunta do cliente vira uma busca em planilha.'],
      ],
    },
    inc: {
      h2: 'Do problema\nao sistema no ar.',
      lede: 'Feito para o seu processo, não o contrário.',
      items: [
        ['code', 'Sistema web', 'Agenda, orçamento, estoque, o que o negócio pede.'],
        ['spark', 'IA que consulta', 'A equipe pergunta e recebe o dado real.'],
        ['doc', 'Portal do cliente', 'O cliente baixa o que é dele sem ligar.'],
        ['pix', 'Pix Automático', 'Cobrança recorrente dentro do sistema.'],
        ['chat', 'WhatsApp ligado', 'Avisos e confirmações saem sozinhos.'],
        ['wrench', 'Manutenção', 'Ajuste e suporte depois que vai ao ar.'],
      ],
    },
    faq: [
      ['Quanto custa um sistema?', 'Depende do tamanho. O valor sai no plano, por escrito, depois do diagnóstico.'],
      ['O sistema e os dados ficam meus?', 'Ficam. Os dados são do seu negócio, e você recebe os acessos.'],
      ['Preciso de equipe técnica?', 'Não. A C9 constrói, coloca no ar e cuida da manutenção.'],
    ],
  },
};

export const CLOSING = {
  h2: 'Seu cliente está\nprocurando agora.',
  lede: 'Em 30 minutos a gente mostra onde ele se perde no caminho até você e o que fechar primeiro.',
};
