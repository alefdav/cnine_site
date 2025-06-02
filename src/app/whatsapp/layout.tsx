'use client';

import React from 'react';
import Script from 'next/script';

// Adicionar tipagem para o fbq
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export default function WhatsAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Função para inicializar o Pixel do Meta quando o componente montar
  React.useEffect(() => {
    // Certifique-se que o fbq está disponível
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, []);
  
  return (
    <>
      {/* Meta Pixel Code */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1344402923355724');
          fbq('track', 'PageView');
        `}
      </Script>
      
      {/* Noscript para navegadores sem JavaScript */}
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }} 
          src="https://www.facebook.com/tr?id=1344402923355724&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      
      <div className="whatsapp-layout">
        {children}
      </div>
    </>
  );
} 