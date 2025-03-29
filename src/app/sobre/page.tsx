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
            Sobre Nós
          </h1>
          <p className="text-xl text-blue-100">
            Conheça nossa história, valores e a equipe que transforma resultados.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Seção Nossa História
const HistorySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-600 font-semibold">Nossa História</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
              De uma ideia a resultados extraordinários
            </h2>
            <p className="text-gray-600 mb-4">
              A AlefDigital nasceu em 2018 com uma missão clara: transformar a forma como as empresas utilizam o marketing digital para gerar resultados.
            </p>
            <p className="text-gray-600 mb-4">
              Fundada por profissionais com mais de 10 anos de experiência no mercado digital, identificamos uma lacuna entre as estratégias tradicionais de marketing e a necessidade real dos negócios por resultados mensuráveis e escaláveis.
            </p>
            <p className="text-gray-600 mb-4">
              Começamos com uma pequena equipe focada exclusivamente em tráfego pago, mas logo expandimos nossos serviços para incluir design estratégico e automação, criando uma abordagem integrada que aborda todos os aspectos do funil de vendas digital.
            </p>
            <p className="text-gray-600">
              Hoje, somos reconhecidos como uma das agências de marketing digital com maior taxa de retenção de clientes, graças à nossa abordagem baseada em dados e resultados comprovados.
            </p>
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
                src="/office.jpg"
                alt="Nosso escritório"
                width={600}
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
  );
};

// Seção Missão, Visão e Valores
const MissionSection = () => {
  const values = [
    {
      icon: "🎯",
      title: "Missão",
      description: "Transformar o marketing digital em resultados tangíveis e escaláveis para nossos clientes, através de estratégias personalizadas e dados precisos."
    },
    {
      icon: "👁️",
      title: "Visão",
      description: "Ser reconhecida como a agência de marketing digital que mais gera resultados mensuráveis e ROI positivo para seus clientes no Brasil."
    },
    {
      icon: "⭐",
      title: "Valores",
      values: [
        "Transparência em todos os resultados",
        "Inovação constante em estratégias",
        "Compromisso com ROI positivo",
        "Foco no cliente e suas necessidades"
      ]
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
            O que nos guia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossos princípios e valores que orientam cada projeto e decisão
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow p-8"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              {item.description && <p className="text-gray-600 mb-6">{item.description}</p>}
              
              {item.values && (
                <ul className="space-y-2">
                  {item.values.map((value, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">{value}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Seção Equipe
const TeamSection = () => {
  const team = [
    {
      name: "Alexandre Silva",
      position: "CEO & Fundador",
      bio: "10+ anos de experiência em marketing digital e estratégia de negócios. Especialista em crescimento exponencial.",
      image: "/team1.jpg"
    },
    {
      name: "Mariana Costa",
      position: "Diretora de Tráfego Pago",
      bio: "Especialista em Google e Facebook Ads com certificações avançadas e histórico de cases de sucesso em diferentes setores.",
      image: "/team2.jpg"
    },
    {
      name: "Rafael Mendes",
      position: "Diretor de Design",
      bio: "Designer com foco em conversão e experiência do usuário. Combina estética com resultados mensuráveis há mais de 8 anos.",
      image: "/team3.jpg"
    },
    {
      name: "Juliana Santos",
      position: "Especialista em Automação",
      bio: "Certificada em diversas plataformas de automação de marketing. Especialista em criar fluxos que convertem e escalam.",
      image: "/team4.jpg"
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
            Conheça Nossa Equipe
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Profissionais apaixonados e especializados que transformam estratégias em resultados
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Seção Certificações
const CertificationsSection = () => {
  const certifications = [
    { name: "Google Ads", image: "/cert-google.jpg" },
    { name: "Facebook Blueprint", image: "/cert-facebook.jpg" },
    { name: "HubSpot", image: "/cert-hubspot.jpg" },
    { name: "SEMrush", image: "/cert-semrush.jpg" }
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
            Nossas Certificações
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Investimos continuamente em capacitação e certificações para oferecer o melhor para nossos clientes
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-32 mb-4">
                <Image
                  src={cert.image}
                  alt={`Certificação ${cert.name}`}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-gray-900">{cert.name}</h3>
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
            Vamos trabalhar juntos!
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Entre em contato conosco e descubra como nossa equipe pode ajudar seu negócio a alcançar novos patamares.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato" className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
              Fale Conosco
            </Link>
            <Link href="/cases" className="inline-block bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 transition-colors">
              Ver Nossos Cases
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutPage = () => {
  return (
    <>
      <PageHeader />
      <HistorySection />
      <MissionSection />
      <TeamSection />
      <CertificationsSection />
      <CtaSection />
    </>
  );
};

export default AboutPage; 