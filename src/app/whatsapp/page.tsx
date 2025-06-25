'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles.css';

// Namespace para compatibilidade com o TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
  
  interface Window {
    fbq: any;
  }
}

export default function WhatsAppPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 30, seconds: 0 });
  const [chatIndex, setChatIndex] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [roiInputs, setRoiInputs] = useState({ dailyChats: 50, avgTicket: 150 });

  // Função para rastrear eventos do Meta Pixel
  const trackEvent = (eventName: string, params = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, params);
    }
  };

  // Contador regressivo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulador de chat
  const chatMessages = [
    { type: 'user', message: 'Olá! Gostaria de saber sobre seus produtos.', delay: 0 },
    { type: 'bot', message: 'Olá! 👋 Ficamos felizes com seu interesse!', delay: 2000 },
    { type: 'bot', message: 'Temos várias opções incríveis. O que você procura?', delay: 4000 },
    { type: 'user', message: 'Estou procurando tênis esportivos.', delay: 6000 },
    { type: 'bot', message: 'Perfeito! Temos uma promoção especial hoje! 🏃‍♂️', delay: 8000 },
    { type: 'bot', message: 'Posso te mostrar nossos modelos mais vendidos?', delay: 10000 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (chatIndex < chatMessages.length) {
        setChatIndex(prev => prev + 1);
      } else {
        // Reiniciar o chat após completar
        setTimeout(() => setChatIndex(0), 3000);
      }
    }, chatIndex === 0 ? 1000 : 2000);
    
    return () => clearTimeout(timer);
  }, [chatIndex, chatMessages.length]);

  // Casos de uso
  const useCases = [
    {
      title: "E-commerce",
      icon: "🛍️",
      description: "Automatize pedidos, rastreamento e suporte ao cliente",
      results: ["40% + vendas", "24/7 atendimento", "85% satisfação"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Restaurantes", 
      icon: "🍕",
      description: "Receba pedidos automaticamente e gerencie entregas",
      results: ["60% + pedidos", "15min economia", "90% precisão"],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Serviços",
      icon: "🔧", 
      description: "Agende consultas e envie lembretes automáticos",
      results: ["50% + agendamentos", "30% menos faltas", "95% pontualidade"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Saúde",
      icon: "🏥",
      description: "Confirme consultas e envie resultados de exames", 
      results: ["70% - no-shows", "100% conformidade", "98% satisfação"],
      color: "from-purple-500 to-pink-500"
    }
  ];

  // Depoimentos
  const testimonials = [
    {
      name: "Maria Silva",
      role: "CEO, Loja Fashion",
      company: "Fashion Store",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: "Aumentei minhas vendas em 40% no primeiro mês! A automação é incrível e economizei mais de R$ 3.000 por mês com equipe.",
      rating: 5,
      results: "40% + vendas"
    },
    {
      name: "João Santos", 
      role: "Proprietário",
      company: "Pizzaria do João",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: "Economizei 15 horas por semana e meus clientes adoram o atendimento rápido. Nunca mais perdemos um pedido!",
      rating: 5,
      results: "15h economizadas"
    },
    {
      name: "Ana Costa",
      role: "Consultora Financeira", 
      company: "ConsultFin",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "Meus clientes adoram o atendimento rápido. A IA entende perfeitamente as dúvidas e nunca mais perdemos um lead!",
      rating: 5,
      results: "95% satisfação"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // FAQ
  const faqs = [
    {
      question: "Preciso ter conhecimento técnico para usar?",
      answer: "Absolutamente não! Nossa solução foi criada para ser plug-and-play. Nossos especialistas cuidam de toda a configuração inicial e você recebe treinamento completo em 30 minutos."
    },
    {
      question: "Quanto tempo leva para implementar?", 
      answer: "A implementação leva em média 5 dias úteis. Isso inclui configuração personalizada, treinamento da IA com seu histórico de conversas e testes completos antes do go-live."
    },
    {
      question: "A IA realmente entende meu negócio?",
      answer: "Sim! Nossa IA é treinada especificamente para seu setor e tipo de negócio. Ela aprende com suas conversas anteriores e melhora continuamente, garantindo respostas cada vez mais precisas."
    },
    {
      question: "E se a IA não souber responder algo?",
      answer: "A IA identifica quando não pode responder e transfere automaticamente para um humano. Você também pode definir horários específicos para atendimento humano ou criar fluxos personalizados."
    },
    {
      question: "Qual o investimento mensal?",
      answer: "Nossos planos começam em R$ 297/mês e incluem tudo: configuração, treinamento, suporte e atualizações. O ROI é garantido - a maioria dos clientes economiza mais de R$ 2.000/mês."
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim, não temos contratos de fidelidade. Você pode cancelar com 30 dias de antecedência. Mas temos certeza de que ficará tão satisfeito quanto nossos mais de 500 clientes ativos."
    }
  ];

  // Calculadora ROI
  const calculateROI = () => {
    const monthlySavings = roiInputs.dailyChats * 30 * 2; // R$ 2 por atendimento economizado
    const extraSales = roiInputs.dailyChats * 0.15 * roiInputs.avgTicket * 30; // 15% mais conversões
    const totalROI = monthlySavings + extraSales;
    return { monthlySavings, extraSales, totalROI };
  };

  const roi = calculateROI();

  // Formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    trackEvent('Lead', {
      content_name: 'Formulário C9 WhatsApp',
      content_category: 'Contact',
      value: 1
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsFormSubmitted(true);
      trackEvent('CompleteRegistration');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.15) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Hero Content */}
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <span>🚀</span>
                <span>Mais de 500 empresas já transformaram seus resultados</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                Transforme visitantes em{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  vendas automáticas
                </span>
                <br />no WhatsApp
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
                Nossa IA revoluciona seu atendimento no WhatsApp, convertendo mais leads 
                em clientes enquanto você dorme. <strong>Sem necessidade de equipe de suporte.</strong>
              </p>

              <div className="space-y-8">
                <motion.button 
                  onClick={() => {
                    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
                    trackEvent('InitiateCheckout');
                  }}
                  className="group relative bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center">
                    🎯 Quero Aumentar Minhas Vendas
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></div>
                </motion.button>
                
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="flex -space-x-2">
                    {testimonials.slice(0, 4).map((testimonial, idx) => (
                      <img key={idx} src={testimonial.image} alt="" className="w-12 h-12 rounded-full border-3 border-white shadow-sm" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong className="text-gray-900">+500 empresas</strong> já aumentaram suas vendas
                  </div>
                </div>
              </div>

              {/* Urgency Timer */}
              <motion.div 
                className="mt-10 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-3xl">⏰</span>
                  <div className="text-center">
                    <div className="text-orange-800 font-medium text-sm">OFERTA ESPECIAL TERMINA EM:</div>
                    <div className="text-3xl font-bold text-orange-900 font-mono">
                      {String(timeLeft.hours).padStart(2, '0')}:
                      {String(timeLeft.minutes).padStart(2, '0')}:
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Visual - WhatsApp Simulator */}
            <motion.div 
              className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Phone Mockup */}
              <div className="relative w-80 h-[640px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="bg-green-500 h-10 flex items-center justify-center relative">
                    <div className="w-24 h-4 bg-black rounded-full"></div>
                  </div>
                  
                  {/* WhatsApp Header */}
                  <div className="bg-green-500 text-white px-4 py-4 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-lg">
                      🤖
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">Assistente IA - C9</div>
                      <div className="text-xs text-green-100">online agora</div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-6 h-6 text-white">📞</div>
                      <div className="w-6 h-6 text-white">📹</div>
                      <div className="w-6 h-6 text-white">⋮</div>
                    </div>
                  </div>
                  
                  {/* Messages Area */}
                  <div className="flex-1 p-4 space-y-4 h-[500px] overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100" 
                       style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23e5e7eb" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}>
                    {chatMessages.slice(0, chatIndex).map((msg, index) => (
                      <motion.div 
                        key={index} 
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`max-w-[70%] px-3 py-2 rounded-lg shadow-sm text-sm ${
                          msg.type === 'user' 
                            ? 'bg-green-500 text-white rounded-br-sm' 
                            : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
                        }`}>
                          {msg.message}
                        </div>
                      </motion.div>
                    ))}
                    {chatIndex < chatMessages.length && (
                      <div className="flex justify-start">
                        <div className="bg-white px-3 py-2 rounded-lg rounded-bl-sm border border-gray-200 shadow-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Input Area */}
                  <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2">
                    <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-500">
                      Digite uma mensagem...
                    </div>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                      🎤
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Metrics - Melhor posicionamento */}
              <motion.div 
                className="absolute -top-6 -left-12 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">📈</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">+40%</div>
                    <div className="text-xs text-gray-500 font-medium">Mais Vendas</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -right-12 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">⭐</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">95%</div>
                    <div className="text-xs text-gray-500 font-medium">Satisfação</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <h2>Por que automatizar seu atendimento?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <i className="fas fa-robot"></i>
              <h3>Automatização completa</h3>
              <p>Nunca mais perca um cliente por falta de resposta. Atendimento 24/7.</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-bolt"></i>
              <h3>Implementação assistida</h3>
              <p>Nossos consultores ajudam em todo o processo de implementação.</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-fingerprint"></i>
              <h3>Personalização</h3>
              <p>Adapte a mensagem conforme o perfil da sua empresa.</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-chart-line"></i>
              <h3>Aumente vendas</h3>
              <p>Responda imediatamente e converta mais leads em clientes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>Como funciona</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Preencha seu dados de contato</h3>
                <p>Leva apenas alguns segundos para começar.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Receba o contato de um de nossos consultores</h3>
                <p>Um especialista entrará em contato para entender seu negócio.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Implementação personalizada para seu negócio</h3>
                <p>Configuramos a solução ideal para suas necessidades específicas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="examples">
        <div className="container">
          <h2>Exemplos de uso</h2>
          <div className="examples-grid">
            <div className="example-card">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Restaurante" />
              <h3>Restaurantes</h3>
              <p>Receba pedidos automaticamente e atualize os clientes sobre o status da entrega.</p>
            </div>
            <div className="example-card">
              <img src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Loja online" />
              <h3>Lojas online</h3>
              <p>Responda dúvidas frequentes e ofereça recomendações personalizadas.</p>
            </div>
            <div className="example-card">
              <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Profissional autônomo" />
              <h3>Profissionais autônomos</h3>
              <p>Agende consultas e envie lembretes automáticos para seus clientes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section - Como Funciona */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Veja como funciona na prática
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa IA aprende com seu negócio e atende seus clientes automaticamente, 
              24 horas por dia, 7 dias por semana
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            {[
              {
                step: "1",
                icon: "💬",
                title: "Cliente envia mensagem",
                description: "Qualquer dúvida, pedido ou solicitação chega no seu WhatsApp Business",
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "2", 
                icon: "🤖",
                title: "IA processa e entende",
                description: "Nossa inteligência artificial analisa e compreende a intenção do cliente",
                color: "from-green-500 to-green-600"
              },
              {
                step: "3",
                icon: "⚡",
                title: "Resposta instantânea",
                description: "Cliente recebe resposta personalizada e precisa em segundos",
                color: "from-purple-500 to-purple-600"
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`relative mx-auto w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg`}>
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-900 shadow-md">
                    {step.step}
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full animate-pulse opacity-20"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Results Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { metric: "40%", label: "Mais vendas", color: "from-blue-50 to-blue-100", textColor: "text-blue-600" },
              { metric: "60%", label: "Menos tempo gasto", color: "from-green-50 to-green-100", textColor: "text-green-600" },
              { metric: "95%", label: "Satisfação dos clientes", color: "from-purple-50 to-purple-100", textColor: "text-purple-600" }
            ].map((result, index) => (
              <motion.div 
                key={index}
                className={`bg-gradient-to-br ${result.color} rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`text-5xl font-bold ${result.textColor} mb-3`}>{result.metric}</div>
                <div className={`${result.textColor.replace('600', '800')} font-medium`}>{result.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Perfeito para seu tipo de negócio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como nossa automação se adapta a diferentes setores e gera resultados reais
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {useCases.map((useCase, index) => (
              <motion.div 
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`bg-gradient-to-br ${useCase.color} rounded-2xl p-6 text-white h-full shadow-lg hover:shadow-2xl transition-all duration-300`}>
                  <div className="text-5xl mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-sm opacity-90 mb-6 leading-relaxed">{useCase.description}</p>
                  
                  <div className="space-y-2">
                    {useCase.results.map((result, idx) => (
                      <div key={idx} className="bg-white bg-opacity-20 rounded-lg px-3 py-2 text-sm font-medium backdrop-blur-sm">
                        ✓ {result}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ROI Calculator */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">💰 Calcule seu ROI</h3>
              <p className="text-gray-600">Descubra quanto você pode economizar e ganhar com automação</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quantos atendimentos você faz por dia?
                  </label>
                  <input 
                    type="number" 
                    value={roiInputs.dailyChats} 
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                    onChange={(e) => setRoiInputs({ ...roiInputs, dailyChats: Number(e.target.value) })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Qual seu ticket médio? (R$)
                  </label>
                  <input 
                    type="number" 
                    value={roiInputs.avgTicket} 
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                    onChange={(e) => setRoiInputs({ ...roiInputs, avgTicket: Number(e.target.value) })}
                  />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Economia com equipe:</span>
                  <span className="text-lg font-bold text-green-600">R$ {roi.monthlySavings.toLocaleString()}/mês</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Vendas extras (15%):</span>
                  <span className="text-lg font-bold text-blue-600">R$ {roi.extraSales.toLocaleString()}/mês</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-gray-900 font-semibold text-lg">ROI total mensal:</span>
                  <span className="text-2xl font-bold text-purple-600">R$ {roi.totalROI.toLocaleString()}</span>
                </div>
                <div className="text-center pt-4">
                  <div className="text-sm text-gray-600">Investimento: R$ 297/mês</div>
                  <div className="text-lg font-bold text-green-600">
                    Retorno: {Math.round((roi.totalROI / 297) * 100)}% ao mês
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Mais de 500 empresas já transformaram seus resultados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja o que nossos clientes estão dizendo sobre os resultados obtidos
            </p>
          </motion.div>

          {/* Main Testimonial */}
          <div className="max-w-4xl mx-auto mb-16">
            <motion.div 
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12 relative shadow-xl border"
              key={currentTestimonial}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-8xl text-blue-200 absolute top-4 left-4 font-serif">"</div>
              <div className="relative z-10">
                <p className="text-xl lg:text-2xl text-gray-800 mb-8 leading-relaxed italic">
                  {testimonials[currentTestimonial].quote}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover shadow-md"
                    />
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</div>
                      <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                      <div className="text-blue-600 font-medium">{testimonials[currentTestimonial].company}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex space-x-1 mb-2 justify-end">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">⭐</span>
                      ))}
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {testimonials[currentTestimonial].results}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? 'bg-blue-500 w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>

          {/* Company Logos */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16 overflow-hidden">
            <p className="text-center text-gray-600 mb-6 font-medium">Empresas que confiam na C9:</p>
            <div className="relative">
              <div className="flex animate-scroll space-x-12 items-center">
                {[
                  '🏪 Fashion Store', '🍕 Pizzaria do João', '💼 ConsultFin', 
                  '🏥 Clínica Saúde+', '🔧 ServiTech', '📱 TechStore',
                  '🍔 Burger House', '👕 Moda & Estilo', '🏋️ Fit Academy'
                ].map((logo, idx) => (
                  <div key={idx} className="flex-shrink-0 bg-white rounded-xl px-6 py-4 text-gray-700 font-medium shadow-sm border whitespace-nowrap">
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Empresas atendidas", color: "text-green-600" },
              { number: "1M+", label: "Mensagens processadas", color: "text-blue-600" },
              { number: "40%", label: "Aumento médio em vendas", color: "text-purple-600" },
              { number: "95%", label: "Satisfação dos clientes", color: "text-orange-600" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="formulario" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Comece a vender mais hoje mesmo
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Preencha os dados e receba uma <strong>demonstração personalizada gratuita</strong> 
                em até 24 horas. Sem compromisso.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "✅ Demonstração gratuita personalizada",
                  "✅ Sem compromisso ou obrigação de compra", 
                  "✅ Implementação em apenas 5 dias úteis",
                  "✅ Suporte completo durante todo o processo"
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-green-500 text-xl font-bold">✓</span>
                    <span className="text-gray-700 font-medium">{benefit.replace('✅ ', '')}</span>
                  </motion.div>
                ))}
              </div>

              {!isFormSubmitted ? (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                        Nome completo *
                      </label>
                      <input 
                        type="text" 
                        id="nome" 
                        name="nome" 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-2">
                        Nome da empresa *
                      </label>
                      <input 
                        type="text" 
                        id="empresa" 
                        name="empresa" 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900"
                        placeholder="Nome da sua empresa"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail profissional *
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp *
                      </label>
                      <input 
                        type="tel" 
                        id="whatsapp" 
                        name="whatsapp" 
                        placeholder="+55 (11) 99999-9999"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="setor" className="block text-sm font-medium text-gray-700 mb-2">
                      Setor da empresa
                    </label>
                    <select 
                      id="setor" 
                      name="setor"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900"
                    >
                      <option value="">Selecione seu setor</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="restaurante">Restaurante/Food</option>
                      <option value="servicos">Serviços</option>
                      <option value="saude">Saúde/Clínicas</option>
                      <option value="educacao">Educação</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <motion.button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🚀 Quero Minha Demonstração Gratuita
                  </motion.button>

                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <span className="text-xl">🔒</span>
                    <span>Seus dados estão 100% seguros. Não compartilhamos com terceiros.</span>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-6xl text-green-500 mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-3">Solicitação recebida com sucesso!</h3>
                  <p className="text-green-700 mb-4 text-lg">
                    Um de nossos especialistas entrará em contato em até 24 horas.
                  </p>
                  <p className="text-sm text-green-600">
                    Prepare suas dúvidas! Mostraremos como a automação pode transformar seu negócio 
                    e aumentar suas vendas.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Visual Demo */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4 border">
                <div className="flex items-center space-x-3 bg-blue-50 rounded-xl p-4">
                  <span className="text-3xl">📱</span>
                  <div>
                    <div className="font-bold text-blue-900 text-lg">Nova mensagem!</div>
                    <div className="text-blue-700">Cliente interessado em seus produtos</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-green-50 rounded-xl p-4">
                  <span className="text-3xl">🤖</span>
                  <div>
                    <div className="font-bold text-green-900 text-lg">IA respondeu automaticamente!</div>
                    <div className="text-green-700">Cliente atendido em 2 segundos</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-purple-50 rounded-xl p-4">
                  <span className="text-3xl">💰</span>
                  <div>
                    <div className="font-bold text-purple-900 text-lg">Venda realizada!</div>
                    <div className="text-purple-700">Conversão automática sem intervenção</div>
                  </div>
                </div>
              </div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-orange-100 border border-orange-200 rounded-xl p-4 max-w-xs shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <div className="font-bold text-orange-800">Oferta especial!</div>
                    <div className="text-orange-700 text-sm">Demonstração gratuita por tempo limitado</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Dúvidas frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Esclarecemos as principais questões sobre nossa solução de automação
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                >
                  <h3 className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</h3>
                  <span className={`text-2xl transition-transform duration-300 flex-shrink-0 ${
                    faqOpen === index ? 'rotate-45' : ''
                  }`}>
                    +
                  </span>
                </button>
                
                {faqOpen === index && (
                  <motion.div 
                    className="px-6 pb-5"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-4">Ainda tem dúvidas?</p>
            <button 
              onClick={() => {
                document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
                trackEvent('InitiateCheckout', { content_name: 'FAQ CTA' });
              }}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Fale com um especialista
            </button>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.15) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Não deixe seus concorrentes saírem na frente
            </h2>
            <p className="text-xl opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Enquanto você pensa, eles já estão vendendo mais com automação no WhatsApp. 
              <strong>Seja o próximo a transformar seus resultados.</strong>
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { stat: "87%", desc: "dos clientes preferem WhatsApp", icon: "📱" },
              { stat: "3x", desc: "mais conversões que email", icon: "📈" },
              { stat: "24/7", desc: "atendimento sem pausas", icon: "🤖" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm border border-white border-opacity-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-3xl font-bold mb-2">{item.stat}</div>
                <div className="opacity-90">{item.desc}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button 
              onClick={() => {
                document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
                trackEvent('InitiateCheckout', { content_name: 'Final CTA' });
              }}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-10 py-5 rounded-xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 mb-8"
            >
              🎯 Sim, Quero Aumentar Minhas Vendas Agora!
            </button>

            <div className="bg-white bg-opacity-10 rounded-xl p-6 max-w-md mx-auto backdrop-blur-sm border border-white border-opacity-20">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-3xl">🛡️</span>
                <div className="text-left">
                  <div className="font-bold text-lg">Garantia de 30 dias</div>
                  <div className="text-sm opacity-90">
                    Se não aumentar suas vendas, devolvemos 100% do investimento
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 