'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  BarChart3, 
  Bot, 
  Layers, 
  Menu, 
  X, 
  Zap, 
  TrendingUp, 
  MoveRight,
  Hexagon,
  CircleDashed
} from 'lucide-react';

/* --- TYPES --- */
type Language = 'en' | 'pt';

interface ContentType {
  nav: {
    services: string;
    process: string;
    results: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      desc: string;
      icon: React.ReactNode;
    }>;
  };
  process: {
    title: string;
    steps: Array<{
      title: string;
      desc: string;
    }>;
  };
  metrics: {
    title: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    rights: string;
  };
}

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: ContentType;
  isScrolled: boolean;
}

interface ComponentProps {
  t: ContentType;
}

/* --- CONTENT DATABASE (ENGLISH & PORTUGUESE) --- */
const content: Record<Language, ContentType> = {
  en: {
    nav: {
      services: "Services",
      process: "Protocol",
      results: "Impact",
      contact: "Start Now"
    },
    hero: {
      eyebrow: "SYSTEMS OF INTELLIGENCE",
      headline: "Atmospheric Growth.",
      subheadline: "We don't just run ads. We engineer high-altitude digital ecosystems using AI automation and performance architecture.",
      ctaPrimary: "Initiate Launch",
      ctaSecondary: "Explore Systems"
    },
    services: {
      title: "The Trinity",
      subtitle: "Three pillars of modern dominance.",
      items: [
        {
          id: "01",
          title: "Performance",
          desc: "Paid traffic engineering. We turn capital into predictable revenue streams using algorithmic targeting.",
          icon: <BarChart3 className="w-8 h-8" />
        },
        {
          id: "02",
          title: "Intelligence",
          desc: "AI-driven workflows. Replacing manual labor with sleepless, error-free automation agents.",
          icon: <Bot className="w-8 h-8" />
        },
        {
          id: "03",
          title: "Experience",
          desc: "Conversion-focused design. Interfaces built to persuade, retain, and convert at scale.",
          icon: <Layers className="w-8 h-8" />
        }
      ]
    },
    process: {
      title: "Ascension Protocol",
      steps: [
        { title: "Diagnosis", desc: "System audit & bottleneck identification." },
        { title: "Blueprint", desc: "Strategic mapping of unit economics." },
        { title: "Deployment", desc: "Launch of campaigns & automation assets." },
        { title: "Scale", desc: "Algorithmic optimization & expansion." }
      ]
    },
    metrics: {
      title: "By The Numbers",
      stats: [
        { value: "300%", label: "ROI Average" },
        { value: "50k+", label: "Leads Captured" },
        { value: "24/7", label: "Active Systems" }
      ]
    },
    cta: {
      title: "Ready to Ascend?",
      subtitle: "Leave the ground level behind.",
      button: "Schedule Briefing"
    },
    footer: {
      rights: "© 2024 C9 Company. Engineered for Growth."
    }
  },
  pt: {
    nav: {
      services: "Serviços",
      process: "Protocolo",
      results: "Impacto",
      contact: "Começar"
    },
    hero: {
      eyebrow: "SISTEMAS DE INTELIGÊNCIA",
      headline: "Crescimento Atmosférico.",
      subheadline: "Não apenas rodamos anúncios. Engenharamos ecossistemas digitais de alta altitude usando automação IA e arquitetura de performance.",
      ctaPrimary: "Iniciar Lançamento",
      ctaSecondary: "Explorar Sistemas"
    },
    services: {
      title: "A Trindade",
      subtitle: "Três pilares de dominância moderna.",
      items: [
        {
          id: "01",
          title: "Performance",
          desc: "Engenharia de tráfego pago. Transformamos capital em fluxos de receita previsíveis usando segmentação algorítmica.",
          icon: <BarChart3 className="w-8 h-8" />
        },
        {
          id: "02",
          title: "Inteligência",
          desc: "Fluxos guiados por IA. Substituindo trabalho manual por agentes de automação incansáveis e precisos.",
          icon: <Bot className="w-8 h-8" />
        },
        {
          id: "03",
          title: "Experiência",
          desc: "Design focado em conversão. Interfaces construídas para persuadir, reter e converter em escala.",
          icon: <Layers className="w-8 h-8" />
        }
      ]
    },
    process: {
      title: "Protocolo de Ascensão",
      steps: [
        { title: "Diagnóstico", desc: "Auditoria de sistema e gargalos." },
        { title: "Blueprint", desc: "Mapeamento estratégico da economia unitária." },
        { title: "Deploy", desc: "Lançamento de campanhas e ativos de automação." },
        { title: "Escala", desc: "Otimização algorítmica e expansão." }
      ]
    },
    metrics: {
      title: "Em Números",
      stats: [
        { value: "300%", label: "Média de ROI" },
        { value: "50k+", label: "Leads Captados" },
        { value: "24/7", label: "Sistemas Ativos" }
      ]
    },
    cta: {
      title: "Pronto para Subir?",
      subtitle: "Deixe o nível do solo para trás.",
      button: "Agendar Briefing"
    },
    footer: {
      rights: "© 2024 C9 Company. Engenharia de Crescimento."
    }
  }
};

/* --- COMPONENTS --- */

const Navbar = ({ lang, setLang, t, isScrolled }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 flex justify-center ${isScrolled ? 'pt-4' : 'pt-8'}`}>
      <div className={`w-[95%] md:w-auto transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-8 py-3' : 'px-6 py-4'}`}>
        <div className="flex justify-between md:justify-center items-center gap-12">
          {/* Desktop Menu Left */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wide" aria-label="Navigate to Services section">
              {t.nav.services}
            </a>
            <a href="#process" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wide" aria-label="Navigate to Process section">
              {t.nav.process}
            </a>
          </div>

          {/* Centered Logo */}
          <a href="/" className="flex items-center gap-1 relative group cursor-pointer z-50" aria-label="C9 Company Home">
            <div className="absolute inset-0 bg-sky-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <span className="text-2xl font-black tracking-tighter text-slate-900 z-10">C9<span className="text-sky-500">.</span></span>
          </a>

          {/* Desktop Menu Right */}
          <div className="hidden md:flex items-center gap-8">
             <a href="#results" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wide" aria-label="Navigate to Results section">
              {t.nav.results}
            </a>
            
            <button 
              onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
              className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1 rounded-md transition-colors uppercase tracking-widest"
              aria-label={`Switch to ${lang === 'en' ? 'Portuguese' : 'English'}`}
            >
              {lang === 'en' ? 'PT' : 'EN'}
            </button>

            <a href="#contact" className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-sky-600 transition-all duration-300 flex items-center gap-2 group" aria-label="Start now - Contact us">
              {t.nav.contact}
            </a>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50 relative text-slate-900" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8">
           {(['services', 'process', 'results'] as const).map((key) => (
            <a key={key} href={`#${key}`} onClick={() => setIsOpen(false)} className="text-4xl font-black text-slate-900 tracking-tighter hover:text-sky-500 transition-colors">
              {t.nav[key]}
            </a>
          ))}
          <button 
              onClick={() => { setLang(lang === 'en' ? 'pt' : 'en'); setIsOpen(false); }}
              className="mt-8 text-sm font-bold tracking-widest uppercase text-slate-400"
            >
              {lang === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'}
            </button>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ t }: ComponentProps) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F8FAFC]">
    {/* Symmetrical Atmospheric Background */}
    <div className="absolute inset-0 w-full h-full overflow-hidden flex justify-center items-center">
      <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-sky-200/30 rounded-full blur-[100px] animate-pulse-slow mix-blend-multiply" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>

    <div className="container mx-auto px-6 relative z-10 pt-20 text-center">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
        
        <div className="inline-flex items-center gap-3 animate-fade-in-up border border-slate-200 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></div>
          <span className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">{t.hero.eyebrow}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></div>
        </div>
        
        <h1 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.9] animate-fade-in-up animation-delay-100">
          {t.hero.headline.split(" ")[0]} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 bg-300% animate-gradient">
            {t.hero.headline.split(" ")[1]}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto leading-relaxed font-medium animate-fade-in-up animation-delay-200">
          {t.hero.subheadline}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in-up animation-delay-200 justify-center">
          <a href="#contact" className="bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-sky-500 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(14,165,233,0.3)] flex items-center justify-center gap-3 group" aria-label="Initiate launch - Contact us">
            {t.hero.ctaPrimary}
            <MoveRight className="group-hover:translate-x-2 transition-transform" />
          </a>
          <a href="#services" className="px-10 py-5 rounded-full font-bold text-lg text-slate-600 bg-white border border-slate-200 hover:border-slate-300 flex items-center justify-center gap-2 group transition-all hover:bg-slate-50" aria-label="Explore systems">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Services = ({ t }: ComponentProps) => (
  <section id="services" className="py-32 bg-white relative">
    <div className="container mx-auto px-6">
      
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
           <Hexagon className="w-12 h-12 text-slate-100 animate-spin-slow" />
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">{t.services.title}</h2>
        <p className="text-slate-400 text-xl font-medium">{t.services.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {t.services.items.map((item: ContentType['services']['items'][0], index: number) => (
          <div key={index} className="group relative p-12 bg-slate-50 hover:bg-slate-900 transition-all duration-700 rounded-[2rem] overflow-hidden text-center flex flex-col items-center border border-transparent hover:border-slate-800">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-10 font-black text-8xl group-hover:text-white transition-colors duration-700 select-none">
              {item.id}
            </div>
            
            <div className="relative z-10 h-full flex flex-col justify-between gap-8 mt-8">
              <div className="mx-auto w-20 h-20 bg-white group-hover:bg-sky-500 rounded-2xl flex items-center justify-center text-slate-900 group-hover:text-white shadow-xl shadow-slate-200 group-hover:shadow-sky-900/50 transition-all duration-500 transform group-hover:-translate-y-2">
                {item.icon}
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4 transition-colors duration-500">{item.title}</h3>
                <p className="text-slate-500 group-hover:text-slate-400 leading-relaxed transition-colors duration-500">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Process = ({ t }: ComponentProps) => (
  <section id="process" className="py-32 bg-slate-900 relative overflow-hidden text-white">
     {/* Grain Texture */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
    
    <div className="container mx-auto px-6 relative z-10">
      
      <div className="text-center mb-24">
        <div className="inline-flex items-center gap-2 text-sky-500 font-bold tracking-widest uppercase mb-4 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <Zap size={16} /> {t.process.title}
        </div>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight">
          From Ground <span className="text-slate-600">to Cloud 9.</span>
        </h2>
      </div>

      {/* Symmetrical Grid for Steps */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {t.process.steps.map((step: ContentType['process']['steps'][0], index: number) => (
          <div key={index} className="group p-10 rounded-3xl border border-white/5 hover:border-sky-500/30 hover:bg-white/5 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden">
             {/* Decorative Corner Number */}
             <div className="absolute top-0 left-0 p-4 text-xs font-mono text-slate-700">
               0{index + 1} //
             </div>

             <div className="mb-6 w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-sky-500 group-hover:bg-sky-500/10 transition-colors">
                <CircleDashed className="text-slate-500 group-hover:text-sky-500 transition-colors" />
             </div>
             
             <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
             <p className="text-slate-400 text-lg leading-relaxed max-w-xs">{step.desc}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
);

const Results = ({ t }: ComponentProps) => (
  <section id="results" className="py-32 bg-[#F8FAFC] relative">
    <div className="container mx-auto px-6">
       
       <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
            {t.metrics.title}
          </h2>
          <div className="w-24 h-1.5 bg-sky-500 mx-auto mt-6 rounded-full"></div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
         {t.metrics.stats.map((stat: ContentType['metrics']['stats'][0], index: number) => (
           <div key={index} className="bg-white p-12 rounded-3xl text-center shadow-sm hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-500 group border border-slate-100">
             <div className="flex justify-center mb-6">
               <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-sky-100 transition-colors">
                  <TrendingUp className="w-8 h-8 text-slate-300 group-hover:text-sky-600 transition-colors" />
               </div>
             </div>
             <div>
               <div className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4 group-hover:scale-110 transition-transform duration-300">
                 {stat.value}
               </div>
               <div className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-sky-600 transition-colors">
                 {stat.label}
               </div>
             </div>
           </div>
         ))}
       </div>
    </div>
  </section>
);

const CTA = ({ t }: ComponentProps) => (
  <section className="py-32 bg-white flex items-center justify-center border-t border-slate-50">
    <div className="container mx-auto px-6 text-center">
      <div className="relative inline-block group cursor-pointer">
        <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 relative z-10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500">
          {t.cta.title}
        </h2>
        <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-500 to-sky-400 bg-300% animate-gradient absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {t.cta.title}
        </h2>
        
        {/* Hover Reveal Image/Shape */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-sky-100/50 rounded-[50%] blur-[80px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      </div>
      
      <p className="text-2xl text-slate-500 mt-8 mb-12 font-medium max-w-2xl mx-auto">
        {t.cta.subtitle}
      </p>
      
      <div className="flex justify-center">
        <a href="#contact" className="relative overflow-hidden bg-slate-900 text-white px-16 py-6 rounded-full text-xl font-bold hover:scale-105 transition-transform duration-300 shadow-2xl shadow-slate-900/20 group inline-block" aria-label="Schedule briefing - Contact us">
          <span className="relative z-10 flex items-center gap-3">
            {t.cta.button} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>
      </div>
    </div>
  </section>
);

const Footer = ({ t }: ComponentProps) => (
  <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
    <div className="container mx-auto px-6 text-center">
        <div className="text-[10rem] md:text-[15rem] leading-none font-black text-slate-200 select-none tracking-tighter mb-12 opacity-50">
          C9.
        </div>
        
        <div className="flex gap-8 justify-center mb-8">
            {['Instagram', 'LinkedIn', 'Twitter'].map(social => (
            <a key={social} href={`https://www.${social.toLowerCase()}.com/c9company`} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-slate-400 hover:text-slate-900 uppercase tracking-wider transition-colors" aria-label={`Visit our ${social} page`}>
                {social}
            </a>
            ))}
        </div>
        <p className="text-slate-400 font-medium text-sm">{t.footer.rights}</p>
    </div>
  </footer>
);

const App = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const t = content[lang];
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://cloudnine.com';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans antialiased selection:bg-sky-500 selection:text-white bg-slate-50 text-slate-900">
      <Navbar lang={lang} setLang={setLang} t={t} isScrolled={isScrolled} />
      <Hero t={t} />
      <Services t={t} />
      <Process t={t} />
      <Results t={t} />
      <CTA t={t} />
      <Footer t={t} />

      {/* Structured Data (JSON-LD) for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "C9 Company",
            "url": siteUrl,
            "logo": `${siteUrl}/logo.png`,
            "description": lang === 'en' 
              ? "We engineer high-altitude digital ecosystems using AI automation and performance architecture."
              : "Engenharamos ecossistemas digitais de alta altitude usando automação IA e arquitetura de performance.",
            "sameAs": [
              "https://www.instagram.com/c9company",
              "https://www.linkedin.com/company/c9company",
              "https://twitter.com/c9company"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Sales",
              "availableLanguage": ["English", "Portuguese"]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "C9 Company",
            "description": lang === 'en'
              ? "AI-powered digital marketing and performance optimization services"
              : "Serviços de marketing digital e otimização de performance com IA",
            "serviceType": [
              "Digital Marketing",
              "Performance Marketing",
              "AI Automation",
              "Conversion Optimization"
            ],
            "areaServed": {
              "@type": "Country",
              "name": ["US", "BR", "Global"]
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Marketing Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Performance Marketing",
                    "description": lang === 'en'
                      ? "Paid traffic engineering with algorithmic targeting"
                      : "Engenharia de tráfego pago com segmentação algorítmica"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "AI Automation",
                    "description": lang === 'en'
                      ? "AI-driven workflows replacing manual labor"
                      : "Fluxos guiados por IA substituindo trabalho manual"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Conversion Optimization",
                    "description": lang === 'en'
                      ? "Conversion-focused design and UX optimization"
                      : "Design focado em conversão e otimização de UX"
                  }
                }
              ]
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "C9 Company",
            "url": siteUrl,
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${siteUrl}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      {/* Global Style Injections for Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient-x 4s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .bg-300\% {
          background-size: 300%;
        }
      `}</style>
    </div>
  );
};

export default App;