'use client';

// Importação simplificada do React
import React from 'react';
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
  // Referência para o formulário
  const formRef = React.useRef(null);
  
  // Hook de efeito para inicialização
  React.useEffect(() => {
    // Adicionar o CSS do Font Awesome
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);
    
    // Adicionar o CSS do Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(fontLink);
    
    // Inicializar o contador regressivo
    const timerElement = document.getElementById('timer');
    const counterElement = document.querySelector('.counter');
    
    // Aguardar a renderização dos elementos
    setTimeout(() => {
      if (timerElement) {
        startCountdown(timerElement);
      }
      
      if (counterElement) {
        animateCounter(counterElement);
      }
      
      // Configurar classes para animação
      setupAnimations();
      
      // Configurar eventos para FAQ
      setupFaqToggles();
      
      // Configurar formulário
      setupForm();
      
      // Configurar scroll suave
      setupSmoothScroll();
      
      // Efeito de destaque no formulário
      highlightFormAfterDelay();
    }, 100);
    
    // Configurar animação ao scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
      // Remover links adicionados
      document.head.removeChild(link);
      document.head.removeChild(fontLink);
    };
  }, []);
  
  // Função para rastrear eventos do Meta Pixel
  const trackEvent = (eventName, params = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, params);
    }
  };
  
  // Funções auxiliares
  const startCountdown = (element) => {
    const hoursLeft = 2;
    const minutesLeft = 30;
    const secondsLeft = 0;
    
    let totalSeconds = hoursLeft * 3600 + minutesLeft * 60 + secondsLeft;
    
    const updateTimer = () => {
      if (!element) return;
      
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      element.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      if (totalSeconds > 0) {
        totalSeconds--;
        setTimeout(updateTimer, 1000);
      } else {
        element.textContent = "OFERTA ENCERRADA";
      }
    };
    
    updateTimer();
  };
  
  const animateCounter = (element) => {
    const maxValue = 17;
    let currentValue = 0;
    
    const interval = setInterval(() => {
      if (currentValue >= maxValue) {
        clearInterval(interval);
        return;
      }
      
      currentValue++;
      element.textContent = currentValue.toString();
    }, 100);
  };
  
  const setupAnimations = () => {
    const elementsToAnimate = document.querySelectorAll('.benefit-card, .example-card, .step, .faq-item, .testimonial-item');
    elementsToAnimate.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      }
    });
    
    // Executar uma vez para elementos visíveis no carregamento inicial
    setTimeout(handleScrollAnimation, 500);
  };
  
  const handleScrollAnimation = () => {
    const elements = document.querySelectorAll('.benefit-card, .example-card, .step, .faq-item, .testimonial-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;
      
      if (elementPosition < screenHeight * 0.9) {
        element.classList.add('fade-in');
      }
    });
  };
  
  const setupFaqToggles = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          // Fechar outras FAQs abertas
          faqItems.forEach((otherItem, i) => {
            if (i !== index && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle na FAQ atual
          item.classList.toggle('active');
        });
      }
    });
  };
  
  const setupForm = () => {
    const form = document.getElementById('lead-form');
    const whatsappInput = document.getElementById('whatsapp');
    
    if (whatsappInput) {
      whatsappInput.addEventListener('input', (e) => {
        const input = e.target;
        let value = input.value;
        
        // Remove tudo que não é número
        value = value.replace(/\D/g, '');
        
        // Aplica a máscara
        if (value.length > 0) {
          if (value.length <= 2) {
            value = `+${value}`;
          } else if (value.length <= 4) {
            value = `+${value.substring(0, 2)} ${value.substring(2)}`;
          } else if (value.length <= 9) {
            value = `+${value.substring(0, 2)} ${value.substring(2, 4)} ${value.substring(4)}`;
          } else {
            value = `+${value.substring(0, 2)} ${value.substring(2, 4)} ${value.substring(4, 9)}-${value.substring(9, 13)}`;
          }
        }
        
        input.value = value;
      });
    }
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        
        if (nome === '' || email === '' || whatsapp === '') {
          alert('Por favor, preencha todos os campos obrigatórios.');
          return;
        }
        
        // Validação básica de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Por favor, insira um e-mail válido.');
          return;
        }
        
        // Rastrear evento de Lead no Meta Pixel
        trackEvent('Lead', {
          content_name: 'Formulário ZapMind',
          content_category: 'WhatsApp',
          value: 1,
          currency: 'BRL'
        });
        
        // Preparar os dados para envio
        const formData = {
          nome: nome,
          email: email,
          whatsapp: "'" + whatsapp, // Adicionando aspa simples no início para evitar que o Google Sheets interprete como fórmula
          data: new Date().toLocaleDateString('pt-BR'),
          hora: new Date().toLocaleTimeString('pt-BR'),
          origem: window.location.href
        };
        
        // Simulação de envio de formulário
        const submitButton = form.querySelector('.btn-submit');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // URL do Web App do Google Script
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzVJ0N4utjURt1SgvYQgsIGa1bnTpIj1vjrREd9zMY7LcGzrUP5SH6_n2SK2SORvbfb3Q/exec';
        
        // Enviar dados para o Google Sheets
        fetch(scriptURL, {
          method: 'POST',
          mode: 'no-cors', // Necessário para contornar problemas de CORS
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(() => {
          // Como estamos usando mode: 'no-cors', não podemos acessar a resposta
          // Então vamos considerar sucesso e mostrar a mensagem
          form.innerHTML = `
            <div class="success-message">
              <i class="fas fa-check-circle" style="color: var(--primary); font-size: 3rem; margin-bottom: 1rem;"></i>
              <h3>Solicitação recebida com sucesso!</h3>
              <p>Um de nossos consultores entrará em contato com você nas próximas 24 horas para agendar sua consultoria gratuita.</p>
              <p class="small-text" style="margin-top: 20px; font-size: 0.9rem;">Enquanto isso, que tal preparar suas dúvidas? Nosso consultor poderá mostrar como a solução pode ser adaptada ao seu negócio.</p>
            </div>
          `;
          
          // Rastrear evento de conclusão no Meta Pixel
          trackEvent('CompleteRegistration', {
            content_name: 'Registro Concluído',
            status: 'success'
          });
          
          // Rolar para o topo da mensagem de sucesso
          form.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
          console.error('Erro ao enviar formulário:', error);
          submitButton.disabled = false;
          submitButton.textContent = originalText || 'Enviar';
          alert('Ocorreu um erro ao enviar seus dados. Por favor, tente novamente ou entre em contato diretamente conosco.');
        });
      });
    }
  };
  
  const setupSmoothScroll = () => {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        if (href === '#formulario') {
          // Rastrear evento de clique no botão CTA
          trackEvent('InitiateCheckout', {
            content_name: 'Clique em CTA',
            content_category: 'Botão Principal'
          });
        }
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };
  
  const highlightFormAfterDelay = () => {
    setTimeout(() => {
      const formContainer = document.querySelector('.form-container');
      if (formContainer instanceof HTMLElement) {
        formContainer.classList.add('highlight-form');
        formContainer.style.transition = 'box-shadow 0.5s ease';
        formContainer.style.boxShadow = '0 0 30px rgba(37, 211, 102, 0.3)';
        
        setTimeout(() => {
          if (formContainer) {
            formContainer.style.boxShadow = '';
          }
        }, 3000);
      }
    }, 10000);
  };

  // Função para lidar com cliques em botões CTA
  const handleCtaClick = () => {
    trackEvent('InitiateCheckout', {
      content_name: 'Clique em CTA',
      content_category: 'Botão Principal'
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Atenda seus clientes automaticamente no WhatsApp <span className="highlight">— sem precisar de um time de suporte</span></h1>
            <p className="subheadline">Deixe seu contato e nossos consultores mostrarão como a IA pode revolucionar seu atendimento ao cliente.</p>
            <div className="countdown">
              <p>Oferta por tempo limitado: <span id="timer">00:00:00</span></p>
            </div>
            <div className="cta-primary">
              <a href="#formulario" className="btn-primary" onClick={handleCtaClick}>Quero conhecer a solução</a>
              <p className="social-proof"><i className="fas fa-check-circle"></i> Mais de 500 empresas já estão usando</p>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80" alt="Demonstração de atendimento WhatsApp automatizado" />
            <div className="floating-card testimonial">
              <i className="fas fa-quote-left"></i>
              <p>&ldquo;Aumentei minhas vendas em 40% no primeiro mês!&rdquo;</p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Cliente" className="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <span>Maria S., Loja de Roupas</span>
              </div>
            </div>
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

      {/* Form Section */}
      <section id="formulario" className="form-section">
        <div className="container">
          <div className="form-container">
            <h2>Agende uma consultoria gratuita</h2>
            <p>Preencha seus dados e receba o contato de um especialista</p>
            <form id="lead-form" ref={formRef}>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" name="nome" placeholder="Seu nome completo" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" placeholder="Seu melhor e-mail" required />
              </div>
              <div className="form-group">
                <label htmlFor="whatsapp">WhatsApp</label>
                <input 
                  type="tel" 
                  id="whatsapp" 
                  name="whatsapp" 
                  placeholder="+55 00 00000-0000" 
                  required 
                />
              </div>
              <input type="hidden" id="origem" name="origem" value="Landing Page ZapMind" />
              <button type="submit" className="btn-submit" onClick={() => trackEvent('Contact')}>QUERO FALAR COM UM ESPECIALISTA</button>
              <p className="form-disclaimer">
                <i className="fas fa-lock"></i> Seus dados estão seguros. Não compartilhamos com terceiros.
              </p>
            </form>
            <div className="guarantee">
              <i className="fas fa-shield-alt"></i>
              <p><strong>Consultoria gratuita:</strong> Sem compromisso ou obrigação de compra.</p>
            </div>
          </div>
          <div className="trust-signals">
            <div className="testimonials">
              <div className="testimonial-item">
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p>&ldquo;Economizei mais de R$3.000 por mês com equipe de atendimento!&rdquo;</p>
                <div className="testimonial-author">
                  <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Cliente" className="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  <span>João P., Consultoria</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <h2>Dúvidas Frequentes</h2>
          <div className="faq-items">
            <div className="faq-item">
              <div className="faq-question">
                <h3>Preciso ter conhecimento técnico para usar?</h3>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="faq-answer">
                <p>Não! Nossa solução foi criada para ser extremamente fácil de usar. Nossos consultores te ajudam em todo o processo de implementação, sem necessidade de conhecimento técnico.</p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                <h3>Como funciona a cobrança?</h3>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="faq-answer">
                <p>Oferecemos planos mensais e anuais com diferentes limites de mensagens. Nosso consultor apresentará as opções mais adequadas para seu negócio.</p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                <h3>Quanto tempo leva para implementar?</h3>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="faq-answer">
                <p>Após a consultoria, a implementação leva em média 5 dias úteis, dependendo da complexidade do seu negócio e necessidades específicas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <div className="container">
          <h2>Não perca mais clientes por falta de respostas rápidas</h2>
          <p>Junte-se a centenas de empresas que já transformaram seu atendimento</p>
          <a href="#formulario" className="btn-primary" onClick={handleCtaClick}>QUERO FALAR COM UM ESPECIALISTA</a>
          <div className="urgency">
            <p><i className="fas fa-clock"></i> Consultoria gratuita por tempo limitado. Vagas restantes: <span className="counter">17</span></p>
          </div>
        </div>
      </section>
    </>
  );
} 