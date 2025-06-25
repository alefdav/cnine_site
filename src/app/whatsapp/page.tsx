'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Tipos TypeScript
interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
  results: string;
}

interface UseCase {
  title: string;
  icon: string;
  description: string;
  results: string[];
  color: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ChatMessage {
  type: 'user' | 'bot';
  message: string;
  delay: number;
}

interface ROIInputs {
  dailyChats: number;
  avgTicket: number;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

// Hook customizado para timer
const useTimer = (initialTime: TimeLeft) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

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

  return timeLeft;
};

// Hook customizado para tracking
const useTracking = () => {
  const trackEvent = useCallback((eventName: string, params = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, params);
    }
  }, []);

  return { trackEvent };
};

// Componente Button reutilizável
const Button: React.FC<{
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-200';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

// Componente Card reutilizável
const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}> = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 ${hover ? 'hover:shadow-xl transition-all duration-300' : ''} ${className}`}
      whileHover={hover ? { y: -5 } : {}}
    >
      {children}
    </motion.div>
  );
};

// Componente Input reutilizável
const Input: React.FC<{
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, type = 'text', placeholder, required = false, value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
      />
    </div>
  );
};

// Componente Timer
const Timer: React.FC<{ timeLeft: TimeLeft }> = ({ timeLeft }) => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex items-center justify-center space-x-4">
        <span className="text-3xl">⏰</span>
        <div className="text-center">
          <div className="text-amber-800 font-medium text-sm">OFERTA ESPECIAL TERMINA EM:</div>
          <div className="text-2xl lg:text-3xl font-bold text-amber-900 font-mono">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Componente WhatsApp Simulator
const WhatsAppSimulator: React.FC = () => {
  const [chatIndex, setChatIndex] = useState(0);
  
  const chatMessages: ChatMessage[] = useMemo(() => [
    { type: 'user', message: 'Olá! Gostaria de saber sobre seus produtos.', delay: 0 },
    { type: 'bot', message: 'Olá! 👋 Ficamos felizes com seu interesse!', delay: 2000 },
    { type: 'bot', message: 'Temos várias opções incríveis. O que você procura?', delay: 4000 },
    { type: 'user', message: 'Estou procurando tênis esportivos.', delay: 6000 },
    { type: 'bot', message: 'Perfeito! Temos uma promoção especial hoje! 🏃‍♂️', delay: 8000 },
    { type: 'bot', message: 'Posso te mostrar nossos modelos mais vendidos?', delay: 10000 }
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (chatIndex < chatMessages.length) {
        setChatIndex(prev => prev + 1);
      } else {
        setTimeout(() => setChatIndex(0), 3000);
      }
    }, chatIndex === 0 ? 1000 : 2000);
    
    return () => clearTimeout(timer);
  }, [chatIndex, chatMessages.length]);

  return (
    <div className="relative w-full max-w-sm mx-auto lg:max-w-none lg:w-80">
      <div className="relative bg-black rounded-[2.5rem] p-2 shadow-2xl">
        <div className="w-full h-[600px] bg-white rounded-[2rem] overflow-hidden relative">
          {/* Status Bar */}
          <div className="bg-emerald-500 h-10 flex items-center justify-center relative">
            <div className="w-24 h-4 bg-black rounded-full"></div>
          </div>
          
          {/* WhatsApp Header */}
          <div className="bg-emerald-500 text-white px-4 py-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center text-lg">
              🤖
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">Assistente IA - C9</div>
              <div className="text-xs text-emerald-100">online agora</div>
            </div>
            <div className="flex space-x-2 text-white">
              <span>📞</span>
              <span>📹</span>
              <span>⋮</span>
            </div>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 p-4 space-y-4 h-[460px] overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100">
            <AnimatePresence>
              {chatMessages.slice(0, chatIndex).map((msg, index) => (
                <motion.div 
                  key={index} 
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`max-w-[70%] px-3 py-2 rounded-lg shadow-sm text-sm ${
                    msg.type === 'user' 
                      ? 'bg-emerald-500 text-white rounded-br-sm' 
                      : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
                  }`}>
                    {msg.message}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
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
          <div className="bg-gray-100 p-4 flex items-center space-x-2">
            <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-500">
              Digite uma mensagem...
            </div>
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
              🎤
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Stats */}
      <motion.div 
        className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-emerald-100"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-center">
          <div className="text-emerald-600 font-bold text-lg">+40%</div>
          <div className="text-xs text-gray-600">Mais Vendas</div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-blue-100"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <div className="text-center">
          <div className="text-blue-600 font-bold text-lg">95%</div>
          <div className="text-xs text-gray-600">Satisfação</div>
        </div>
      </motion.div>
    </div>
  );
};

// Componente principal
export default function WhatsAppPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [roiInputs, setRoiInputs] = useState<ROIInputs>({ dailyChats: 50, avgTicket: 150 });
  
  const timeLeft = useTimer({ hours: 2, minutes: 30, seconds: 0 });
  const { trackEvent } = useTracking();

  // Debug FAQ state
  useEffect(() => {
    console.log('FAQ state changed:', faqOpen);
  }, [faqOpen]);

  // Dados
  const testimonials: Testimonial[] = useMemo(() => [
    {
      name: "Maria Silva",
      role: "CEO",
      company: "Loja Fashion",
      image: "https://img.freepik.com/fotos-gratis/jovem-mulher-bonita-segurando-um-livro_23-2148396358.jpg?t=st=1750819439~exp=1750823039~hmac=4bc81434587781194f0d17382ec8033b7156a4091cfd03309d5a13bf63f5c910&w=1380",
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
  ], []);

  const useCases: UseCase[] = useMemo(() => [
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
      color: "from-emerald-500 to-green-500"
    },
    {
      title: "Saúde",
      icon: "🏥",
      description: "Confirme consultas e envie resultados de exames", 
      results: ["70% - no-shows", "100% conformidade", "98% satisfação"],
      color: "from-purple-500 to-pink-500"
    }
  ], []);

  const faqs: FAQ[] = useMemo(() => [
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
      answer: "Nossos planos começam em R$ 600/mês e incluem tudo: configuração, treinamento, suporte e atualizações. O ROI é garantido - a maioria dos clientes economiza mais de R$ 2.000/mês."
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim, não temos contratos de fidelidade. Você pode cancelar com 30 dias de antecedência. Mas temos certeza de que ficará tão satisfeito quanto nossos mais de 500 clientes ativos."
    }
  ], []);

  // Efeitos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Calculadora ROI
  const calculateROI = useCallback(() => {
    const monthlySavings = roiInputs.dailyChats * 30 * 2;
    const extraSales = roiInputs.dailyChats * 0.15 * roiInputs.avgTicket * 30;
    const totalROI = monthlySavings + extraSales;
    return { monthlySavings, extraSales, totalROI };
  }, [roiInputs]);

  const roi = useMemo(() => calculateROI(), [calculateROI]);

  // Handlers
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

  const scrollToForm = useCallback(() => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
    trackEvent('InitiateCheckout');
  }, [trackEvent]);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(16, 185, 129, 0.15) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
            {/* Hero Content */}
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <span>🚀</span>
                <span>Mais de 10 empresas já transformaram seus resultados</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                Transforme visitantes em{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  vendas automáticas
                </span>
                <br />no WhatsApp
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed">
                Nossa IA revoluciona seu atendimento no WhatsApp, convertendo mais leads 
                em clientes enquanto você dorme. <strong>Sem necessidade de equipe de suporte.</strong>
              </p>

              <div className="space-y-8">
                <Button size="lg" onClick={scrollToForm} className="w-full lg:w-auto">
                  🎯 Quero Aumentar Minhas Vendas
                </Button>
                
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="flex -space-x-2">
                    {testimonials.slice(0, 4).map((testimonial, idx) => (
                      <img 
                        key={idx} 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full border-3 border-white shadow-sm" 
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong className="text-gray-900">+10 empresas</strong> já aumentaram suas vendas
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="mt-10">
                <Timer timeLeft={timeLeft} />
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div 
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <WhatsAppSimulator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Por que automatizar seu atendimento?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Descubra como nossa solução pode transformar completamente a forma como você atende seus clientes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🤖",
                title: "Automatização completa",
                description: "Nunca mais perca um cliente por falta de resposta. Atendimento 24/7."
              },
              {
                icon: "🚀",
                title: "Implementação assistida",
                description: "Nossos consultores ajudam em todo o processo de implementação."
              },
              {
                icon: "🎯",
                title: "Personalização",
                description: "Adapte a mensagem conforme o perfil da sua empresa."
              },
              {
                icon: "📈",
                title: "Aumente vendas",
                description: "Responda imediatamente e converta mais leads em clientes."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Como funciona
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Em apenas 3 passos simples, você terá sua automação funcionando perfeitamente
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "1",
                title: "Preencha seus dados de contato",
                description: "Leva apenas alguns segundos para começar.",
                icon: "📝"
              },
              {
                step: "2", 
                title: "Receba o contato de um de nossos consultores",
                description: "Um especialista entrará em contato para entender seu negócio.",
                icon: "📞"
              },
              {
                step: "3",
                title: "Implementação personalizada para seu negócio",
                description: "Configuramos a solução ideal para suas necessidades específicas.",
                icon: "⚡"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="text-center relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                    {step.step}
                  </div>
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </Card>
                
                {index < 2 && (
                  <div className="hidden absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 z-0"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Perfeito para seu tipo de negócio
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Veja como nossa automação se adapta a diferentes setores e gera resultados reais
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${useCase.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-6`}>
                    {useCase.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 mb-6">{useCase.description}</p>
                  <div className="space-y-2">
                    {useCase.results.map((result, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <span className="text-emerald-500 mr-2">✓</span>
                        <span className="text-gray-700">{result}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              💰 Calcule seu ROI
            </h2>
            <p className="text-lg text-gray-600">
              Descubra quanto você pode economizar e ganhar com automação
            </p>
          </motion.div>

          <Card className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantos atendimentos você faz por dia?
                </label>
                <input
                  type="number"
                  value={roiInputs.dailyChats}
                  onChange={(e) => setRoiInputs(prev => ({ ...prev, dailyChats: parseInt(e.target.value) || 0 }))}
                  className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qual seu ticket médio? (R$)
                </label>
                <input
                  type="number"
                  value={roiInputs.avgTicket}
                  onChange={(e) => setRoiInputs(prev => ({ ...prev, avgTicket: parseInt(e.target.value) || 0 }))}
                  className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-6 text-white">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-sm opacity-90">Economia com equipe:</div>
                  <div className="text-2xl font-bold">R$ {roi.monthlySavings.toLocaleString()}/mês</div>
                </div>
                <div>
                  <div className="text-sm opacity-90">Vendas extras (15%):</div>
                  <div className="text-2xl font-bold">R$ {roi.extraSales.toLocaleString()}/mês</div>
                </div>
                <div>
                  <div className="text-sm opacity-90">ROI total mensal:</div>
                  <div className="text-2xl font-bold">R$ {roi.totalROI.toLocaleString()}</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/20 text-center">
                <div className="text-sm opacity-90">Investimento: R$ 297/mês</div>
                <div className="text-lg font-semibold">
                  Retorno: {Math.round((roi.totalROI / 297) * 100)}% ao mês
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Mais de 10 empresas já transformaram seus resultados
            </h2>
            <p className="text-lg text-gray-600">
              Veja o que nossos clientes estão dizendo sobre os resultados obtidos
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                    ))}
                  </div>
                  <blockquote className="text-xl lg:text-2xl text-gray-700 mb-8 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                      <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                      <div className="text-sm text-gray-500">{testimonials[currentTestimonial].company}</div>
                    </div>
                    <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                      {testimonials[currentTestimonial].results}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mt-16">
            {[
              { number: "10+", label: "Empresas atendidas" },
              { number: "1M+", label: "Mensagens processadas" },
              { number: "40%", label: "Aumento médio em vendas" },
              { number: "95%", label: "Satisfação dos clientes" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="formulario" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Comece a vender mais hoje mesmo
            </h2>
            <p className="text-lg text-gray-600">
              Preencha os dados e receba uma <strong>demonstração personalizada gratuita</strong> em até 24 horas. Sem compromisso.
            </p>
          </motion.div>

          <Card className="max-w-2xl mx-auto">
            {!isFormSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input label="Nome completo" placeholder="Seu nome completo" required />
                  <Input label="Nome da empresa" placeholder="Nome da sua empresa" required />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input label="E-mail profissional" type="email" placeholder="seu@email.com" required />
                  <Input label="WhatsApp" placeholder="+55 (11) 99999-9999" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Setor da empresa
                  </label>
                  <select className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200">
                    <option>Selecione seu setor</option>
                    <option>E-commerce</option>
                    <option>Restaurante/Food</option>
                    <option>Serviços</option>
                    <option>Saúde/Clínicas</option>
                    <option>Educação</option>
                    <option>Outro</option>
                  </select>
                </div>
                
                <div className="space-y-4">
                  {[
                    "✓ Demonstração gratuita personalizada",
                    "✓ Sem compromisso ou obrigação de compra", 
                    "✓ Implementação em apenas 5 dias úteis",
                    "✓ Suporte completo durante todo o processo"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center text-emerald-700">
                      <span className="mr-2">{benefit.split(' ')[0]}</span>
                      <span>{benefit.substring(2)}</span>
                    </div>
                  ))}
                </div>

                <Button type="submit" size="lg" className="w-full">
                  🚀 Quero Minha Demonstração Gratuita
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  🔒 Seus dados estão 100% seguros. Não compartilhamos com terceiros.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Obrigado!</h3>
                <p className="text-gray-600 mb-6">
                  Recebemos seus dados e entraremos em contato em até 24 horas para agendar sua demonstração personalizada.
                </p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-emerald-800 text-sm">
                    📱 Fique atento ao seu WhatsApp - nossa equipe entrará em contato por lá!
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Dúvidas frequentes
            </h2>
            <p className="text-lg text-gray-600">
              Esclarecemos as principais questões sobre nossa solução de automação
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div 
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 cursor-pointer hover:shadow-xl transition-all duration-300" 
                  onClick={() => {
                    console.log('FAQ clicked:', index, 'Current open:', faqOpen);
                    setFaqOpen(faqOpen === index ? null : index);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: faqOpen === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-emerald-500 text-xl flex-shrink-0"
                    >
                      ▼
                    </motion.div>
                  </div>
                  <AnimatePresence mode="wait">
                    {faqOpen === index && (
                      <motion.div
                        key={`faq-${index}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Ainda tem dúvidas?</p>
            <Button variant="secondary" onClick={scrollToForm}>
              Fale com um especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Não deixe seus concorrentes saírem na frente
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Enquanto você pensa, eles já estão vendendo mais com automação no WhatsApp.
              <br /><strong>Seja o próximo a transformar seus resultados.</strong>
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: "📱", stat: "87%", label: "dos clientes preferem WhatsApp" },
                { icon: "📈", stat: "3x", label: "mais conversões que email" },
                { icon: "🤖", stat: "24/7", label: "atendimento sem pausas" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <div className="text-3xl font-bold mb-1">{item.stat}</div>
                  <div className="text-sm opacity-90">{item.label}</div>
                </motion.div>
              ))}
            </div>

            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-white text-emerald-600 hover:bg-gray-100 shadow-xl"
            >
              🎯 Sim, Quero Aumentar Minhas Vendas Agora!
            </Button>

            <div className="mt-8 flex items-center justify-center space-x-2 text-sm opacity-90">
              <span>🛡️</span>
              <span><strong>Garantia de 30 dias</strong> - Se não aumentar suas vendas, devolvemos 100% do investimento</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

