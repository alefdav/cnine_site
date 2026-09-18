export type Language = 'pt' | 'en';

export type ServiceIcon =
  | 'whatsapp'
  | 'voice'
  | 'page'
  | 'traffic'
  | 'prospect'
  | 'measure';

export type ChatSide = 'them' | 'us';

export interface ChatLine {
  from: ChatSide;
  text: string;
  time?: string;
}

export interface ContentType {
  nav: {
    system: string;
    protocol: string;
    services: string;
    faq: string;
  };
  cta: string;
  hero: {
    badgeTag: string;
    badgeText: string;
    badgeShort: string;
    headlineTop: string;
    headlineBottom: string;
    subheadline: string;
    ctaSecondary: string;
    imageAlt: string;
  };
  proof: {
    items: Array<{ value: string; label: string }>;
  };
  system: {
    titleTop: string;
    titleBottom: string;
    lede: string;
    reception: {
      kicker: string;
      title: string;
      desc: string;
      chat: ChatLine[];
    };
    pieces: Array<{ kicker: string; title: string; desc: string }>;
    close: string;
  };
  test: {
    titleTop: string;
    titleBottom: string;
    paragraphs: string[];
    cta: string;
    contactNote: string;
    chatName: string;
    chatStatus: string;
    thread: ChatLine[];
  };
  services: {
    title: string;
    lede: string;
    items: Array<{ icon: ServiceIcon; title: string; desc: string }>;
    extraLabel: string;
    extraText: string;
  };
  protocol: {
    title: string;
    lede: string;
    steps: Array<{ title: string; desc: string }>;
  };
  pledges: {
    titleTop: string;
    titleBottom: string;
    items: Array<{ title: string; desc: string }>;
    close: string;
    closeAccent: string;
  };
  notDoing: {
    titleTop: string;
    titleBottom: string;
    lede: string;
    items: string[];
  };
  audience: {
    title: string;
    lede: string;
    cards: Array<{ title: string; desc: string }>;
    note: string;
  };
  faq: {
    titleTop: string;
    titleBottom: string;
    items: Array<{ q: string; a: string }>;
  };
  closing: {
    titleTop: string;
    titleBottom: string;
    subtitle: string;
    fine: string;
  };
  footer: {
    tagline: string;
    rights: string;
    privacy: string;
  };
}

/* Contato real da operação, usado em todo CTA da página. */
export const WHATSAPP_NUMBER = '5521920075681';
export const WHATSAPP_DISPLAY = '(21) 92007-5681';
export const EMAIL = 'contato@c9company.com.br';
export const LEGAL_NAME = 'C9 COMPANY LTDA';
export const LEGAL_ID = 'CNPJ 39.710.160/0001-60';
export const CITY = 'Rio de Janeiro / RJ';

export function whatsappLink(lang: Language): string {
  const text =
    lang === 'pt'
      ? 'Oi! Quero agendar um diagnóstico com a C9.'
      : 'Hi! I would like to book a diagnostic with C9.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const content: Record<Language, ContentType> = {
  pt: {
    nav: {
      system: 'O sistema',
      protocol: 'Protocolo',
      services: 'Serviços',
      faq: 'Perguntas',
    },
    cta: 'Agendar diagnóstico',
    hero: {
      badgeTag: 'Novo',
      badgeText: 'Protocolo de 7 dias, do diagnóstico ao primeiro teste',
      badgeShort: 'Protocolo de 7 dias',
      headlineTop: 'Crescimento',
      headlineBottom: 'atmosférico.',
      subheadline:
        'Anúncio, página e recepção automática operando como um único sistema de crescimento para o seu negócio.',
      ctaSecondary: 'Ver o sistema',
      imageAlt:
        'Mar de nuvens visto de cima, à noite, com o céu limpo acima da camada',
    },
    proof: {
      items: [
        { value: '11', label: 'negócios locais atendidos neste mês' },
        { value: '8', label: 'páginas de conversão no ar para clientes' },
        { value: '3', label: 'idiomas atendidos: português, inglês e espanhol' },
        {
          value: '24h',
          label: 'a recepção responde no WhatsApp todo dia, inclusive de madrugada',
        },
      ],
    },
    system: {
      titleTop: 'Um sistema.',
      titleBottom: 'Três peças.',
      lede: 'Dá pra contratar separado quem faz o seu site, quem roda os seus anúncios e quem programa o seu WhatsApp. Três empresas, três contratos, três culpados quando o cliente não aparece. A C9 junta as três pontas num sistema só, com um responsável só.',
      reception: {
        kicker: '03 · Recepção',
        title: 'Atende, filtra e marca o horário',
        desc: 'A recepção automática responde em segundos no WhatsApp, separa quem só quer preço de quem quer marcar, agenda o cliente e manda o lembrete. Funciona de madrugada, no domingo e no feriado. Quem prefere ligar fala com a recepção por voz, em português.',
        chat: [
          { from: 'them', text: 'Oi, vocês atendem sábado?' },
          {
            from: 'us',
            text: 'Atendemos até 14h. Tenho sábado 09:30 ou 11:00. Qual fica melhor?',
          },
          { from: 'them', text: '09:30' },
          { from: 'us', text: 'Marcado. Mando o lembrete um dia antes.' },
        ],
      },
      pieces: [
        {
          kicker: '01 · Anúncio',
          title: 'Chama quem precisa agora',
          desc: 'Campanha local para quem está na sua cidade procurando o que você faz. A verba fica na conta do seu negócio, no seu nome.',
        },
        {
          kicker: '02 · Página',
          title: 'Transforma clique em conversa',
          desc: 'Página própria, feita para converter, não para exibir. Sua, não alugada de plataforma de agendamento nem de rede social.',
        },
      ],
      close:
        'Nenhuma das três funciona sozinha. É por isso que a gente não vende nenhuma delas separada.',
    },
    test: {
      titleTop: 'Teste a recepção',
      titleBottom: 'antes de contratar.',
      paragraphs: [
        'A C9 é nova e não vai inventar depoimento que não tem. Em vez disso: manda uma mensagem no nosso WhatsApp agora. Quem responde é exatamente a mesma recepção que instalamos no seu negócio, a mesma que vai atender os seus clientes de madrugada.',
        'Se ela te atender bem, você já viu o que está comprando. Se atender mal, você não compra.',
      ],
      cta: 'Testar a recepção agora',
      contactNote: `WhatsApp ${WHATSAPP_DISPLAY} · resposta em segundos`,
      chatName: 'C9 Company',
      chatStatus: 'online',
      thread: [
        { from: 'them', text: 'Oi, queria saber como funciona', time: '23:47' },
        {
          from: 'us',
          text: 'Olá! Aqui é a recepção automática da C9, a mesma que instalamos nos nossos clientes. Posso te fazer três perguntas rápidas pra marcar o seu diagnóstico?',
          time: '23:47',
        },
        { from: 'them', text: 'Pode', time: '23:48' },
        {
          from: 'us',
          text: 'Qual é o seu ramo? Clínica, consultório, escritório…',
          time: '23:48',
        },
        { from: 'them', text: 'Clínica odontológica', time: '23:49' },
        {
          from: 'us',
          text: 'Perfeito. Tenho quinta às 10:00 ou sexta às 15:30. Qual prefere?',
          time: '23:49',
        },
        { from: 'them', text: 'Quinta 10:00', time: '23:50' },
        {
          from: 'us',
          text: 'Marcado. Quinta, 10:00. Você recebe o lembrete aqui um dia antes.',
          time: '23:50',
        },
      ],
    },
    services: {
      title: 'O que a C9 opera',
      lede: 'O sistema completo é o caminho normal. Cada peça também existe sozinha quando o seu caso pede.',
      items: [
        {
          icon: 'whatsapp',
          title: 'Recepção no WhatsApp',
          desc: 'Atende, filtra quem só quer preço, marca o horário e manda o lembrete. Passa pra uma pessoa quando o caso sai do script.',
        },
        {
          icon: 'voice',
          title: 'Recepção por voz',
          desc: 'Atende ligação em português e liga de volta para quem autorizou pelo botão. Número próprio, com opt-in registrado.',
        },
        {
          icon: 'page',
          title: 'Página de conversão',
          desc: 'Página própria, feita pra virar conversa, não pra exibir portfólio. Publicada em português, inglês ou espanhol.',
        },
        {
          icon: 'traffic',
          title: 'Tráfego pago local',
          desc: 'Campanha para quem está na sua cidade procurando agora. A verba fica na conta do seu negócio, no seu nome.',
        },
        {
          icon: 'prospect',
          title: 'Prospecção ativa',
          desc: 'Levantamento de quem já tem demanda na sua região e abordagem por WhatsApp, com mensagem escrita caso a caso.',
        },
        {
          icon: 'measure',
          title: 'Google e medição',
          desc: 'Perfil no Google em ordem, busca local trabalhada e conversão medida de verdade, do clique até o horário marcado.',
        },
      ],
      extraLabel: 'Também resolvemos emergência:',
      extraText:
        'remoção de malware em WordPress, com laudo do que foi encontrado e plano de proteção depois da limpeza.',
    },
    protocol: {
      title: 'Protocolo',
      lede: 'Quatro etapas, na ordem. Você vê o sistema funcionando antes de assinar qualquer coisa.',
      steps: [
        {
          title: 'Diagnóstico',
          desc: 'Trinta minutos. A gente olha o seu ramo, a sua cidade e a sua agenda, e mostra onde estão os clientes que você perde hoje. Se a C9 não servir pro seu caso, você ouve isso na mesma conversa.',
        },
        {
          title: 'Prévia',
          desc: 'Você recebe a página do seu negócio montada e conversa com a recepção configurada pro seu ramo. Nada disso depende de contrato assinado.',
        },
        {
          title: 'Implantação',
          desc: 'Anúncio, página e recepção no ar, configurados por nós. A conta de anúncio é aberta no nome do seu negócio, com o seu cartão.',
        },
        {
          title: 'Operação',
          desc: 'Ajuste semanal do que está convertendo, horário marcado sendo medido e uma pessoa da C9 respondendo quando você chama.',
        },
      ],
    },
    pledges: {
      titleTop: 'Três coisas que a gente',
      titleBottom: 'abriu mão. De propósito.',
      items: [
        {
          title: 'Sem fidelidade',
          desc: 'Nenhum contrato de doze meses. Nenhuma multa. Você para no mês que quiser. Se o sistema não estiver se pagando, não faz sentido continuar pagando por ele, e a gente prefere perder o cliente a prender o cliente.',
        },
        {
          title: 'A verba do anúncio nunca passa pela nossa conta',
          desc: 'Ela fica na conta do seu negócio, no seu cartão, no seu nome. Você vê cada centavo gasto direto na plataforma. A C9 não ganha comissão sobre o quanto você investe, então não tem nenhum motivo pra te mandar investir mais do que precisa.',
        },
        {
          title: 'Um negócio por ramo em cada cidade',
          desc: 'Se a gente já atende uma clínica de estética na sua cidade, não atende a sua. Isso limita o quanto a C9 pode crescer. Limita de propósito.',
        },
      ],
      close: 'Nenhuma das três decisões é boa pro nosso faturamento.',
      closeAccent: 'As três são boas pro seu resultado.',
    },
    notDoing: {
      titleTop: 'O que a C9',
      titleBottom: 'não faz.',
      lede: 'É melhor dizer isso agora do que no terceiro mês. Se você procura uma empresa que faz um pouco de tudo, não é a gente.',
      items: [
        'Não posta no seu Instagram nem gerencia a sua rede social.',
        'Não promete número de cliente. Ninguém honesto promete.',
        'Não trabalha com quem não atende com hora marcada. Loja de balcão não é o nosso caso.',
        'Não atende dois concorrentes na mesma cidade.',
        'Não coloca no site número que a operação não sustenta.',
      ],
    },
    audience: {
      title: 'Para quem funciona',
      lede: 'Negócio local que vive de cliente com hora marcada e já tem procura, mesmo sem canal próprio.',
      cards: [
        {
          title: 'Clínicas e consultórios',
          desc: 'Odontologia, estética, fisioterapia, nutrição, psicologia. Agenda cheia vale mais do que alcance.',
        },
        {
          title: 'Serviços com visita marcada',
          desc: 'Ar-condicionado, reforma, energia solar, oficina. Quem precisa hoje não espera resposta amanhã.',
        },
        {
          title: 'Operação fora do Brasil',
          desc: 'Atendimento e páginas em inglês e espanhol, com o mesmo sistema. Já entregamos no México.',
        },
      ],
      note: 'Se o seu negócio é de balcão, sem hora marcada, a C9 não é pra você. A gente diz isso na primeira conversa.',
    },
    faq: {
      titleTop: 'Perguntas que',
      titleBottom: 'sempre aparecem',
      items: [
        {
          q: 'Quanto custa?',
          a: 'Depende do ramo, da cidade e de quantas peças você liga. O valor sai no diagnóstico, junto com a estimativa de verba de anúncio, que é paga direto por você e nunca passa pela nossa conta.',
        },
        {
          q: 'A recepção parece robô?',
          a: 'Você não precisa acreditar: manda uma mensagem pro nosso WhatsApp e conversa com ela. É a mesma que instalamos. Quando o caso sai do script, ela chama uma pessoa em vez de inventar resposta.',
        },
        {
          q: 'Preciso trocar meu número?',
          a: 'Não. A recepção trabalha no número do seu negócio. Quem já tem conversa antiga com você continua no mesmo lugar.',
        },
        {
          q: 'E se eu quiser sair?',
          a: 'Você sai. Sem multa e sem aviso de trinta dias. A página e a conta de anúncio estão no nome do seu negócio, então ficam com você.',
        },
        {
          q: 'Vocês atendem meu concorrente?',
          a: 'Não. Um negócio por ramo em cada cidade. Se o seu concorrente chegar primeiro, você ouve um não.',
        },
      ],
    },
    closing: {
      titleTop: 'Quer ver como a sua',
      titleBottom: 'agenda ficaria?',
      subtitle:
        'Trinta minutos, sem compromisso. A gente olha o seu ramo, a sua cidade e a sua agenda, e mostra onde estão os clientes que você está perdendo hoje. Se a C9 não servir pro seu caso, você ouve isso na mesma conversa.',
      fine: `Ou manda mensagem no WhatsApp ${WHATSAPP_DISPLAY} e fala com a recepção primeiro.`,
    },
    footer: {
      tagline: 'Agenda cheia no automático.',
      rights: '© 2026 C9 Company',
      privacy: 'Política de Privacidade (LGPD)',
    },
  },

  en: {
    nav: {
      system: 'The system',
      protocol: 'Protocol',
      services: 'Services',
      faq: 'Questions',
    },
    cta: 'Book a diagnostic',
    hero: {
      badgeTag: 'New',
      badgeText: 'A 7-day protocol, from diagnostic to first test',
      badgeShort: '7-day protocol',
      headlineTop: 'Atmospheric',
      headlineBottom: 'growth.',
      subheadline:
        'Ads, landing page and automated reception running as a single growth system for your business.',
      ctaSecondary: 'See the system',
      imageAlt: 'Sea of clouds seen from above at night, clear sky over the layer',
    },
    proof: {
      items: [
        { value: '11', label: 'local businesses served this month' },
        { value: '8', label: 'conversion pages live for clients' },
        { value: '3', label: 'languages covered: Portuguese, English and Spanish' },
        {
          value: '24h',
          label: 'the reception answers on WhatsApp every day, including overnight',
        },
      ],
    },
    system: {
      titleTop: 'One system.',
      titleBottom: 'Three pieces.',
      lede: 'You can hire one company for your site, another for your ads and a third to program your WhatsApp. Three contracts, three suppliers, three people to blame when the customer never shows up. C9 runs the three ends as one system, with one owner.',
      reception: {
        kicker: '03 · Reception',
        title: 'Answers, filters and books the slot',
        desc: 'The automated reception answers within seconds on WhatsApp, separates price shoppers from people who want an appointment, books the slot and sends the reminder. It works overnight, on Sundays and on holidays. Whoever prefers to call talks to the voice reception, in Portuguese.',
        chat: [
          { from: 'them', text: 'Hi, are you open on Saturday?' },
          {
            from: 'us',
            text: 'We are, until 2pm. I have Saturday 9:30 or 11:00. Which works better?',
          },
          { from: 'them', text: '9:30' },
          { from: 'us', text: 'Booked. I will send the reminder a day before.' },
        ],
      },
      pieces: [
        {
          kicker: '01 · Ads',
          title: 'Reaches whoever needs you now',
          desc: 'Local campaigns for people searching in your city right now. The ad budget stays in your business account, in your name.',
        },
        {
          kicker: '02 · Page',
          title: 'Turns a click into a conversation',
          desc: 'Your own page, built to convert rather than to display. Yours, not rented from a booking platform or a social network.',
        },
      ],
      close:
        'None of the three works alone. That is why we do not sell any of them separately.',
    },
    test: {
      titleTop: 'Test the reception',
      titleBottom: 'before you hire us.',
      paragraphs: [
        'C9 is new and will not invent testimonials it does not have. Instead: send a message to our WhatsApp right now. What answers you is exactly the same reception we install in your business, the same one that will answer your customers at 3am.',
        'If it serves you well, you have already seen what you are buying. If it serves you badly, you do not buy.',
      ],
      cta: 'Test the reception now',
      contactNote: `WhatsApp ${WHATSAPP_DISPLAY} · answers within seconds`,
      chatName: 'C9 Company',
      chatStatus: 'online',
      thread: [
        { from: 'them', text: 'Hi, I wanted to know how it works', time: '23:47' },
        {
          from: 'us',
          text: 'Hello! This is C9 automated reception, the same one we install for our clients. May I ask three quick questions to book your diagnostic?',
          time: '23:47',
        },
        { from: 'them', text: 'Sure', time: '23:48' },
        {
          from: 'us',
          text: 'What is your field? Clinic, practice, office…',
          time: '23:48',
        },
        { from: 'them', text: 'Dental clinic', time: '23:49' },
        {
          from: 'us',
          text: 'Perfect. I have Thursday at 10:00 or Friday at 15:30. Which do you prefer?',
          time: '23:49',
        },
        { from: 'them', text: 'Thursday 10:00', time: '23:50' },
        {
          from: 'us',
          text: 'Booked. Thursday, 10:00. You get the reminder here a day before.',
          time: '23:50',
        },
      ],
    },
    services: {
      title: 'What C9 operates',
      lede: 'The full system is the normal path. Each piece also exists on its own when your case calls for it.',
      items: [
        {
          icon: 'whatsapp',
          title: 'WhatsApp reception',
          desc: 'Answers, filters price shoppers, books the slot and sends the reminder. Hands over to a person when the case leaves the script.',
        },
        {
          icon: 'voice',
          title: 'Voice reception',
          desc: 'Answers calls in Portuguese and calls back whoever opted in through the button. Dedicated number, with opt-in on record.',
        },
        {
          icon: 'page',
          title: 'Conversion page',
          desc: 'Your own page, built to start conversations rather than show a portfolio. Published in Portuguese, English or Spanish.',
        },
        {
          icon: 'traffic',
          title: 'Local paid traffic',
          desc: 'Campaigns for people searching in your city right now. The budget stays in your business account, in your name.',
        },
        {
          icon: 'prospect',
          title: 'Active prospecting',
          desc: 'We map who already has demand in your region and reach out on WhatsApp, with a message written case by case.',
        },
        {
          icon: 'measure',
          title: 'Google and measurement',
          desc: 'Google profile in order, local search worked properly and conversion actually measured, from click to booked slot.',
        },
      ],
      extraLabel: 'We also handle emergencies:',
      extraText:
        'WordPress malware removal, with a report of what was found and a protection plan after the cleanup.',
    },
    protocol: {
      title: 'Protocol',
      lede: 'Four stages, in order. You see the system running before signing anything.',
      steps: [
        {
          title: 'Diagnostic',
          desc: 'Thirty minutes. We look at your field, your city and your calendar, and show where the customers you lose today are going. If C9 is not right for your case, you hear that in the same conversation.',
        },
        {
          title: 'Preview',
          desc: 'You get your business page built and talk to the reception configured for your field. None of it depends on a signed contract.',
        },
        {
          title: 'Rollout',
          desc: 'Ads, page and reception live, configured by us. The ad account is opened in your business name, with your card.',
        },
        {
          title: 'Operation',
          desc: 'Weekly tuning of what converts, booked slots measured, and a person at C9 answering when you call.',
        },
      ],
    },
    pledges: {
      titleTop: 'Three things we gave up.',
      titleBottom: 'On purpose.',
      items: [
        {
          title: 'No lock-in',
          desc: 'No twelve-month contract. No penalty. You stop whichever month you want. If the system is not paying for itself, there is no sense in you paying for it, and we would rather lose a client than trap one.',
        },
        {
          title: 'The ad budget never touches our account',
          desc: 'It stays in your business account, on your card, in your name. You see every cent spent straight on the platform. C9 earns no commission on how much you invest, so we have no reason to tell you to spend more than you need.',
        },
        {
          title: 'One business per field in each city',
          desc: 'If we already serve an aesthetics clinic in your city, we do not serve yours. That limits how much C9 can grow. It limits it on purpose.',
        },
      ],
      close: 'None of the three decisions is good for our revenue.',
      closeAccent: 'All three are good for your result.',
    },
    notDoing: {
      titleTop: 'What C9',
      titleBottom: 'does not do.',
      lede: 'Better to say this now than in the third month. If you are looking for a company that does a bit of everything, we are not it.',
      items: [
        'We do not post on your Instagram or manage your social media.',
        'We do not promise a number of customers. Nobody honest does.',
        'We do not work with businesses that do not run on appointments. A walk-in shop is not our case.',
        'We do not serve two competitors in the same city.',
        'We do not publish numbers the operation cannot back up.',
      ],
    },
    audience: {
      title: 'Who it works for',
      lede: 'Local businesses that live on booked appointments and already have demand, even without a channel of their own.',
      cards: [
        {
          title: 'Clinics and practices',
          desc: 'Dentistry, aesthetics, physiotherapy, nutrition, psychology. A full calendar is worth more than reach.',
        },
        {
          title: 'Services with scheduled visits',
          desc: 'Air conditioning, renovation, solar energy, auto repair. Whoever needs it today will not wait until tomorrow.',
        },
        {
          title: 'Operations outside Brazil',
          desc: 'Service and pages in English and Spanish, on the same system. We have delivered in Mexico.',
        },
      ],
      note: 'If your business is walk-in, with no appointments, C9 is not for you. We say that in the first conversation.',
    },
    faq: {
      titleTop: 'Questions that',
      titleBottom: 'always come up',
      items: [
        {
          q: 'How much does it cost?',
          a: 'It depends on your field, your city and how many pieces you switch on. The number comes out of the diagnostic, together with the ad budget estimate, which you pay directly and which never touches our account.',
        },
        {
          q: 'Does the reception sound like a robot?',
          a: 'You do not have to take our word for it: message our WhatsApp and talk to it. It is the same one we install. When the case leaves the script, it calls a person instead of inventing an answer.',
        },
        {
          q: 'Do I need to change my number?',
          a: 'No. The reception works on your business number. Anyone with an old conversation with you stays in the same place.',
        },
        {
          q: 'What if I want to leave?',
          a: 'You leave. No penalty and no thirty-day notice. The page and the ad account are in your business name, so they stay with you.',
        },
        {
          q: 'Do you serve my competitor?',
          a: 'No. One business per field in each city. If your competitor gets there first, you hear a no.',
        },
      ],
    },
    closing: {
      titleTop: 'Want to see what your',
      titleBottom: 'calendar would look like?',
      subtitle:
        'Thirty minutes, no strings. We look at your field, your city and your calendar, and show where the customers you are losing today are going. If C9 is not right for your case, you hear that in the same conversation.',
      fine: `Or message WhatsApp ${WHATSAPP_DISPLAY} and talk to the reception first.`,
    },
    footer: {
      tagline: 'A full calendar, on autopilot.',
      rights: '© 2026 C9 Company',
      privacy: 'Privacy Policy (LGPD)',
    },
  },
};
