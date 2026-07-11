export type Language = 'pt' | 'en';

export type SystemIcon = 'performance' | 'intelligence' | 'experience';

export interface ContentType {
  nav: {
    systems: string;
    protocol: string;
    results: string;
  };
  cta: string;
  hero: {
    headline: string;
    subheadline: string;
    ctaSecondary: string;
    imageAlt: string;
  };
  systems: {
    title: string;
    subtitle: string;
    items: Array<{
      icon: SystemIcon;
      title: string;
      desc: string;
    }>;
  };
  protocol: {
    title: string;
    intro: string;
    steps: Array<{
      title: string;
      desc: string;
    }>;
  };
  results: {
    title: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  closing: {
    title: string;
    subtitle: string;
  };
  footer: {
    rights: string;
  };
}

export const content: Record<Language, ContentType> = {
  pt: {
    nav: {
      systems: 'Sistemas',
      protocol: 'Protocolo',
      results: 'Resultados',
    },
    cta: 'Agendar diagnóstico',
    hero: {
      headline: 'Crescimento atmosférico.',
      subheadline:
        'Tráfego pago, automação com IA e design de conversão operando como um único sistema de crescimento para o seu negócio.',
      ctaSecondary: 'Ver os sistemas',
      imageAlt:
        'Mar de nuvens visto de cima, com céu azul limpo acima da camada',
    },
    systems: {
      title: 'Os três sistemas',
      subtitle: 'Cada motor cobre uma camada da operação.',
      items: [
        {
          icon: 'performance',
          title: 'Performance',
          desc: 'Engenharia de tráfego pago. Capital vira receita previsível com segmentação algorítmica e testes contínuos.',
        },
        {
          icon: 'intelligence',
          title: 'Inteligência',
          desc: 'Automação com IA. Fluxos que substituem trabalho manual e operam sem pausa, com precisão auditável.',
        },
        {
          icon: 'experience',
          title: 'Experiência',
          desc: 'Design de conversão. Páginas e funis construídos para persuadir, reter e converter em escala.',
        },
      ],
    },
    protocol: {
      title: 'Protocolo de Ascensão',
      intro: 'Quatro etapas, na ordem. Do solo à altitude de cruzeiro.',
      steps: [
        {
          title: 'Diagnóstico',
          desc: 'Auditoria completa do funil e identificação dos gargalos que travam a operação.',
        },
        {
          title: 'Blueprint',
          desc: 'Mapa estratégico com metas, canais e economia unitária definidos antes de investir.',
        },
        {
          title: 'Deploy',
          desc: 'Lançamento das campanhas e dos ativos de automação em produção.',
        },
        {
          title: 'Escala',
          desc: 'Otimização algorítmica contínua e expansão do que comprova retorno.',
        },
      ],
    },
    results: {
      title: 'Resultados de operação',
      stats: [
        { value: '300%', label: 'ROI médio nas contas ativas' },
        { value: '50k+', label: 'leads captados para clientes' },
        { value: '24/7', label: 'sistemas de automação no ar' },
      ],
    },
    closing: {
      title: 'Pronto para subir?',
      subtitle:
        'Uma call de 30 minutos para mapear onde a sua operação perde receita.',
    },
    footer: {
      rights: '© 2026 C9 Company. Engenharia de crescimento.',
    },
  },
  en: {
    nav: {
      systems: 'Systems',
      protocol: 'Protocol',
      results: 'Results',
    },
    cta: 'Book a diagnostic',
    hero: {
      headline: 'Atmospheric growth.',
      subheadline:
        'Paid traffic, AI automation and conversion design running as a single growth system for your business.',
      ctaSecondary: 'See the systems',
      imageAlt: 'Sea of clouds seen from above, clear blue sky over the layer',
    },
    systems: {
      title: 'The three systems',
      subtitle: 'Each engine covers one layer of the operation.',
      items: [
        {
          icon: 'performance',
          title: 'Performance',
          desc: 'Paid traffic engineering. Capital becomes predictable revenue through algorithmic targeting and continuous testing.',
        },
        {
          icon: 'intelligence',
          title: 'Intelligence',
          desc: 'AI automation. Workflows that replace manual labor and run around the clock with auditable precision.',
        },
        {
          icon: 'experience',
          title: 'Experience',
          desc: 'Conversion design. Pages and funnels built to persuade, retain and convert at scale.',
        },
      ],
    },
    protocol: {
      title: 'Ascension Protocol',
      intro: 'Four stages, in order. From the ground to cruising altitude.',
      steps: [
        {
          title: 'Diagnosis',
          desc: 'Full funnel audit and identification of the bottlenecks holding the operation back.',
        },
        {
          title: 'Blueprint',
          desc: 'Strategic map with goals, channels and unit economics defined before spending.',
        },
        {
          title: 'Deploy',
          desc: 'Launch of campaigns and automation assets into production.',
        },
        {
          title: 'Scale',
          desc: 'Continuous algorithmic optimization, expanding what proves its return.',
        },
      ],
    },
    results: {
      title: 'Operating results',
      stats: [
        { value: '300%', label: 'average ROI across active accounts' },
        { value: '50k+', label: 'leads captured for clients' },
        { value: '24/7', label: 'automation systems running' },
      ],
    },
    closing: {
      title: 'Ready to climb?',
      subtitle:
        'A 30-minute call to map where your operation is losing revenue.',
    },
    footer: {
      rights: '© 2026 C9 Company. Growth engineering.',
    },
  },
};
