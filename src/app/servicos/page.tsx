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
            Nossos Serviços
          </h1>
          <p className="text-xl text-blue-100">
            Estratégias personalizadas que transformam visitantes em clientes e impulsionam seus resultados de marketing digital.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ServicesPage = () => {
  return (
    <>
      <PageHeader />
      
      {/* Tráfego Pago */}
      <section id="trafego" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-blue-600 text-white text-3xl w-16 h-16 rounded-full flex items-center justify-center mb-6">
                🔥
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tráfego Pago
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Maximizamos seus resultados no Google, Facebook e Instagram Ads com campanhas otimizadas para gerar mais leads e vendas, reduzindo custos e aumentando o ROI.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Campanhas de Google Ads com alta conversão</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Anúncios de Facebook e Instagram que engajam</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Otimização de campanhas baseada em dados</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Relatórios detalhados e análise de ROI</span>
                </li>
              </ul>
              <Link href="/contato" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Quero gerar mais leads
              </Link>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-100 rounded-xl p-8 relative z-10">
                <Image
                  src="/trafego-pago.jpg"
                  alt="Tráfego Pago"
                  width={500}
                  height={400}
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="absolute top-4 right-4 w-64 h-64 bg-blue-200 rounded-full opacity-50 -z-10"></div>
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-purple-200 rounded-full opacity-50 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Design */}
      <section id="design" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative order-2 md:order-1"
            >
              <div className="bg-white rounded-xl p-8 relative z-10 shadow-lg">
                <Image
                  src="/design.jpg"
                  alt="Design de Alta Conversão"
                  width={500}
                  height={400}
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="absolute top-4 left-4 w-48 h-48 bg-purple-200 rounded-full opacity-50 -z-10"></div>
              <div className="absolute bottom-4 right-4 w-24 h-24 bg-blue-200 rounded-full opacity-50 -z-10"></div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="order-1 md:order-2"
            >
              <div className="bg-purple-600 text-white text-3xl w-16 h-16 rounded-full flex items-center justify-center mb-6">
                🎨
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Design de Alta Conversão
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Criamos identidades visuais e landing pages que convertem visitantes em clientes, focando em design estratégico que gera resultados mensuráveis.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Landing pages otimizadas para conversão</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Identidade visual e branding estratégico</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Criativos para redes sociais e ads</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-purple-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Otimização UX/UI baseada em testes</span>
                </li>
              </ul>
              <Link href="/contato" className="inline-block bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                Quero um design que converte
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Automação */}
      <section id="automacao" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-indigo-600 text-white text-3xl w-16 h-16 rounded-full flex items-center justify-center mb-6">
                🤖
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Automação de Marketing
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Fluxos inteligentes que economizam tempo e melhoram a experiência do usuário, nutrindo leads e aumentando taxas de conversão no piloto automático.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Funis de vendas automatizados</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Email marketing e sequências de nutrição</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Chatbots e atendimento automatizado</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">Integrações entre plataformas e CRM</span>
                </li>
              </ul>
              <Link href="/contato" className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Quero automatizar meu marketing
              </Link>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-100 rounded-xl p-8 relative z-10">
                <Image
                  src="/automacao.jpg"
                  alt="Automação de Marketing"
                  width={500}
                  height={400}
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="absolute top-4 right-4 w-48 h-48 bg-indigo-200 rounded-full opacity-50 -z-10"></div>
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-blue-200 rounded-full opacity-50 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-6">
              Pronto para impulsionar seus resultados?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Entre em contato agora mesmo e descubra como podemos ajudar seu negócio a crescer com nossas soluções personalizadas.
            </p>
            <Link href="/contato" className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
              Agendar uma consulta gratuita
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;