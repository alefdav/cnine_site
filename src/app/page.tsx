'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import './cloud-styles.css';

// Animação para os elementos que aparecem na tela
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Hero Section 
const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-sky-400 via-sky-500 to-blue-600 text-white py-20 md:py-28 relative overflow-hidden">
      {/* Clouds Background Animation */}
      <div className="absolute inset-0 overflow-hidden w-full h-full">
        <div className="cloudPane">
          <div className="stars">
            <div className="star" id="star1"></div>
            <div className="star"></div>
            <div className="star" id="star2"></div>
            <div className="star"></div>
            <div className="star" id="star3"></div>
            <div className="star"></div>
            <div className="star" id="star4"></div>
            <div className="star"></div>  
            <div className="star" id="star5"></div>
            <div className="star"></div>  
            <div className="star" id="star6"></div>
            <div className="star"></div>  
            <div className="star" id="star7"></div>
            <div className="star"></div>  
            <div className="star" id="star8"></div>
            <div className="star"></div>  
            <div className="star" id="star9"></div>
            <div className="star"></div>  
            <div className="star" id="star10"></div>
            <div className="star"></div> 
            <div className="star" id="star11"></div>
            <div className="star"></div> 
          </div>

          <div className="bigCloud" id="cloud1">
            <div className="largeCircle" id="circ1">
              <div className="largeCircle" id="circ1shadow"></div>
            </div>
            <div className="middleCircle" id="circ2">
              <div className="middleCircle" id="circ2shadow"></div>
            </div>
            <div className="middleCircle" id="circ3">
              <div className="middleCircle" id="circ3shadow"></div>
            </div>
            <div className="smallCircle" id="circ4"></div>
            <div className="smallCircle" id="circ5">
              <div className="smallCircle" id="circ5shadow"></div>
            </div>
            <div className="smallCircle" id="circ6">
              <div className="smallCircle" id="circ6shadow"></div>
            </div>
          </div>

          <div className="bigCloud" id="cloud2">
            <div className="largeCircle" id="circ1">
              <div className="largeCircle" id="circ1shadow"></div>
            </div>
            <div className="middleCircle" id="circ2">
              <div className="middleCircle" id="circ2shadow"></div>
            </div>
            <div className="middleCircle" id="circ3">
              <div className="middleCircle" id="circ3shadow"></div>
            </div>
            <div className="smallCircle" id="circ4"></div>
            <div className="smallCircle" id="circ5">
              <div className="smallCircle" id="circ5shadow"></div>
            </div>
            <div className="smallCircle" id="circ6">
              <div className="smallCircle" id="circ6shadow"></div>
            </div>
          </div>

          <div className="bigCloud" id="cloud3">
            <div className="largeCircle" id="circ1">
              <div className="largeCircle" id="circ1shadow"></div>
            </div>
            <div className="middleCircle" id="circ2">
              <div className="middleCircle" id="circ2shadow"></div>
            </div>
            <div className="middleCircle" id="circ3">
              <div className="middleCircle" id="circ3shadow"></div>
            </div>
            <div className="smallCircle" id="circ4"></div>
            <div className="smallCircle" id="circ5">
              <div className="smallCircle" id="circ5shadow"></div>
            </div>
            <div className="smallCircle" id="circ6">
              <div className="smallCircle" id="circ6shadow"></div>
            </div>
          </div>

          <div className="bigCloud" id="cloud4">
            <div className="largeCircle" id="circ1">
              <div className="largeCircle" id="circ1shadow"></div>
            </div>
            <div className="middleCircle" id="circ2">
              <div className="middleCircle" id="circ2shadow"></div>
            </div>
            <div className="middleCircle" id="circ3">
              <div className="middleCircle" id="circ3shadow"></div>
            </div>
            <div className="smallCircle" id="circ4"></div>
            <div className="smallCircle" id="circ5">
              <div className="smallCircle" id="circ5shadow"></div>
            </div>
            <div className="smallCircle" id="circ6">
              <div className="smallCircle" id="circ6shadow"></div>
            </div>
          </div>

          <div className="bigCloud" id="cloud5">
            <div className="largeCircle" id="circ1">
              <div className="largeCircle" id="circ1shadow"></div>
            </div>
            <div className="middleCircle" id="circ2">
              <div className="middleCircle" id="circ2shadow"></div>
            </div>
            <div className="middleCircle" id="circ3">
              <div className="middleCircle" id="circ3shadow"></div>
            </div>
            <div className="smallCircle" id="circ4"></div>
            <div className="smallCircle" id="circ5">
              <div className="smallCircle" id="circ5shadow"></div>
            </div>
            <div className="smallCircle" id="circ6">
              <div className="smallCircle" id="circ6shadow"></div>
            </div>
          </div>

          <div className="bigCloud" id="cloud6">
            <div className="largeCircle" id="circ1">
              <div className="largeCircle" id="circ1shadow"></div>
            </div>
            <div className="middleCircle" id="circ2">
              <div className="middleCircle" id="circ2shadow"></div>
            </div>
            <div className="middleCircle" id="circ3">
              <div className="middleCircle" id="circ3shadow"></div>
            </div>
            <div className="smallCircle" id="circ4"></div>
            <div className="smallCircle" id="circ5">
              <div className="smallCircle" id="circ5shadow"></div>
            </div>
            <div className="smallCircle" id="circ6">
              <div className="smallCircle" id="circ6shadow"></div>
            </div>
          </div>

          <div className="bigCloud" id="cloud7">
            <div className="largeCircle" id="circ1">
              <div className="largeCircle" id="circ1shadow"></div>
            </div>
            <div className="middleCircle" id="circ2">
              <div className="middleCircle" id="circ2shadow"></div>
            </div>
            <div className="middleCircle" id="circ3">
              <div className="middleCircle" id="circ3shadow"></div>
            </div>
            <div className="smallCircle" id="circ4"></div>
            <div className="smallCircle" id="circ5">
              <div className="smallCircle" id="circ5shadow"></div>
            </div>
            <div className="smallCircle" id="circ6">
              <div className="smallCircle" id="circ6shadow"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Texto e conteúdo principal com z-index maior para ficar na frente das nuvens */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-50 relative z-20">
        <div className=" gap-8 items-center text-center justify-center w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              📈 Transformamos cliques em vendas!
            </h1>
            <p className="text-xl mb-6">
              Estratégias avançadas de tráfego pago, design e automação para escalar seu negócio digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/contato" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                👉 Fale com um especialista
              </Link>
              <Link href="/cases" className="inline-block bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-colors">
                Ver Cases de Sucesso
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Seção de Serviços
const ServicesSection = () => {
  const services = [
    {
      icon: "🔥",
      title: "Tráfego Pago",
      description: "Maximizamos seus resultados no Google, Facebook e Instagram Ads com campanhas otimizadas que geram mais leads e vendas.",
      link: "/servicos#trafego"
    },
    {
      icon: "🎨",
      title: "Design de Alta Conversão",
      description: "Criamos landing pages, criativos e branding estratégico que convertem visitantes em clientes.",
      link: "/servicos#design"
    },
    {
      icon: "🤖",
      title: "Automação",
      description: "Fluxos inteligentes para captar e nutrir leads no piloto automático, economizando tempo e melhorando resultados.",
      link: "/servicos#automacao"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluções personalizadas para maximizar seus resultados no mundo digital
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-8">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link href={service.link} className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
                  Saiba mais
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Seção de Resultados
const ResultsSection = () => {
  const stats = [
    { value: "350%", label: "Aumento médio em ROI" },
    { value: "40%", label: "Redução em custo por lead" },
    { value: "10K+", label: "Leads gerados em 6 meses" },
    { value: "85%", label: "Taxa de satisfação dos clientes" }
  ];

  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Resultados que Transformam Negócios
          </h2>
          <p className="text-blue-100">
            Dados reais de clientes que confiaram em nossa expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 text-center"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Seção de Depoimentos
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "A estratégia de tráfego pago implementada pela Cloud Nine aumentou nossas vendas em 300% em apenas 2 meses.",
      author: "Ana Silva",
      company: "Loja X",
      image: "/testimonial1.jpg"
    },
    {
      quote: "O redesign da nossa landing page aumentou a taxa de conversão em 45%. Definitivamente o melhor investimento que fizemos.",
      author: "Carlos Oliveira",
      company: "Empresa Y",
      image: "/testimonial2.jpg"
    },
    {
      quote: "As automações implementadas economizaram mais de 20 horas semanais da nossa equipe, permitindo focar no crescimento do negócio.",
      author: "Mariana Costa",
      company: "Startup Z",
      image: "/testimonial3.jpg"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Depoimentos de quem transformou seu negócio com nossas estratégias
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-8 shadow-md"
            >
              <svg className="h-8 w-8 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.29 16.3q-2.54 0-4.17-1.625Q.5 13.05.5 10.5q0-2.65 1.62-4.275Q3.74 4.6 6.5 4.6q2.58 0 4.29 1.625Q12.5 7.85 12.5 10.5q0 1.3-.45 2.45-.45 1.15-1.2 2.05L6.3 19.4q-.15.15-.325.213Q5.8 19.675 5.625 19.675q-.175 0-.35-.063Q5.1 19.55 5 19.4q-.2-.2-.2-.438 0-.237.2-.437L8.7 14.8q.7-.9 1.125-1.875t.425-2.425q0-1.8-1.125-3-1.125-1.2-2.875-1.2-1.7 0-2.85 1.175Q2.25 8.65 2.25 10.5q0 1.75 1.225 2.925Q4.7 14.6 6.5 14.6q.35 0 .688-.062.337-.063.712-.188.25-.1.462-.075.213.025.363.225.2.25.125.512-.075.263-.35.363-.625.25-1.025.363-.4.112-.725.112z"></path>
              </svg>
              <p className="text-gray-600 italic mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Seção CTA
const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para transformar seu marketing digital?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Agende uma consultoria gratuita com nossa equipe e descubra como podemos ajudar seu negócio a crescer.
          </p>
          <Link href="/contato" className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors text-lg">
            Quero agendar minha consultoria
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div>
      <Hero />
      <ServicesSection />
      <ResultsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
