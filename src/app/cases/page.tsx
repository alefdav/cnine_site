'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Componente de cabeçalho de página
const PageHeader = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cases de Sucesso
          </h1>
          <p className="text-xl text-blue-100">
            Conheça algumas das histórias de transformação que proporcionamos aos nossos clientes.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Componente de Métricas
const MetricsSection = () => {
  const metrics = [
    { value: "+350%", label: "de ROI médio" },
    { value: "-40%", label: "no custo por lead" },
    { value: "+10k", label: "leads gerados" },
    { value: "+200", label: "clientes satisfeitos" }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-md"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">{metric.value}</div>
              <div className="text-gray-600">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente de Cases
const CasesSection = () => {
  const cases = [
    {
      title: "E-commerce de Moda",
      category: "Tráfego Pago",
      description: "Estratégia completa de Google e Facebook Ads para uma loja de moda online, resultando em aumento de 300% nas vendas em apenas 3 meses.",
      results: [
        "300% de aumento nas vendas",
        "Redução de 35% no custo por aquisição",
        "Aumento de 250% no ROI das campanhas"
      ],
      image: "/case1.jpg",
      testimonial: {
        quote: "A estratégia de tráfego pago da AlefDigital transformou nosso negócio. Agora temos um fluxo constante de vendas a um custo muito menor.",
        author: "Ana Silva",
        position: "CEO, Loja X"
      }
    },
    {
      title: "SaaS B2B",
      category: "Design + Automação",
      description: "Redesign de landing page e implementação de fluxos de automação para uma empresa de software B2B, aumentando a taxa de conversão e a eficiência do time de vendas.",
      results: [
        "Aumento de 45% na taxa de conversão",
        "Redução de 60% no tempo de qualificação de leads",
        "15 horas semanais economizadas pelo time comercial"
      ],
      image: "/case2.jpg",
      testimonial: {
        quote: "O redesign da nossa landing page combinado com as automações implementadas mudou completamente nossa forma de gerar e qualificar leads. Nosso time de vendas agora só fala com leads realmente qualificados.",
        author: "Carlos Oliveira",
        position: "Diretor de Marketing, Empresa Y"
      }
    },
    {
      title: "Clinica de Estética",
      category: "Tráfego Pago + Design",
      description: "Estratégia integrada de marketing digital para clínica de estética, incluindo redesign de marca, site e campanhas de anúncios segmentadas por procedimento.",
      results: [
        "Aumento de 200% no agendamento de consultas",
        "Redução de 45% no custo por lead",
        "Consolidação da marca como referência no segmento"
      ],
      image: "/case3.jpg",
      testimonial: {
        quote: "Depois de trabalhar com a AlefDigital, nossa clínica está sempre com a agenda cheia. O investimento retornou em menos de dois meses.",
        author: "Patricia Mendes",
        position: "Proprietária, Clínica Z"
      }
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
            Projetos que Geraram Resultados Reais
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça como transformamos desafios em oportunidades para nossos clientes
          </p>
        </motion.div>

        <div className="space-y-24">
          {cases.map((caseItem, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-12 items-center"
            >
              <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                <div className="bg-gray-100 rounded-xl p-4 relative">
                  <Image
                    src={caseItem.image}
                    alt={caseItem.title}
                    width={600}
                    height={400}
                    className="rounded-lg w-full h-auto"
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-sm px-4 py-2 rounded-bl-lg rounded-tr-lg">
                    {caseItem.category}
                  </div>
                </div>
              </div>
              <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                <span className="text-blue-600 font-semibold">Case #{index + 1}</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">{caseItem.title}</h3>
                <p className="text-gray-600 mb-6">{caseItem.description}</p>
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Resultados:</h4>
                  <ul className="space-y-2">
                    {caseItem.results.map((result, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
                  <p className="italic text-gray-600 mb-4">{caseItem.testimonial.quote}</p>
                  <div className="font-semibold">{caseItem.testimonial.author}</div>
                  <div className="text-sm text-gray-500">{caseItem.testimonial.position}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Seção de Clientes
const ClientsSection = () => {
  const clients = [
    "logo1.svg", "logo2.svg", "logo3.svg", "logo4.svg", 
    "logo5.svg", "logo6.svg", "logo7.svg", "logo8.svg"
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Clientes que Confiam em Nós
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Empresas de diversos segmentos que escolheram nossa agência para impulsionar seus resultados
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
          {clients.map((logo, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm"
            >
              <Image
                src={`/${logo}`}
                alt={`Cliente ${index + 1}`}
                width={120}
                height={60}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Final
const CtaSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-6">
            Quer ser nosso próximo case de sucesso?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Entre em contato agora mesmo e descubra como podemos impulsionar seu negócio com nossas estratégias de marketing digital.
          </p>
          <Link href="/contato" className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
            Começar agora
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const CasesPage = () => {
  return (
    <>
      <PageHeader />
      <MetricsSection />
      <CasesSection />
      <ClientsSection />
      <CtaSection />
    </>
  );
};

export default CasesPage; 