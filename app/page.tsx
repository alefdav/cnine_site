'use client';

import { useEffect, useState } from 'react';
import { content, type Language } from '@/lib/content';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Systems } from '@/components/systems';
import { Protocol } from '@/components/protocol';
import { Results } from '@/components/results';
import { Closing } from '@/components/closing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cloudnine.com';

export default function Page() {
  const [lang, setLang] = useState<Language>('pt');
  const t = content[lang];

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <Systems t={t} />
        <Protocol t={t} />
        <Results t={t} />
      </main>
      <Closing t={t} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'C9 Company',
            url: SITE_URL,
            logo: `${SITE_URL}/logo.png`,
            description:
              lang === 'pt'
                ? 'Agência de growth: tráfego pago, automação com IA e design de conversão operando como um único sistema.'
                : 'Growth agency: paid traffic, AI automation and conversion design running as a single system.',
            sameAs: [
              'https://www.instagram.com/c9company',
              'https://www.linkedin.com/company/c9company',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Sales',
              availableLanguage: ['Portuguese', 'English'],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'C9 Company',
            description:
              lang === 'pt'
                ? 'Serviços de marketing de performance, automação com IA e otimização de conversão'
                : 'Performance marketing, AI automation and conversion optimization services',
            serviceType: [
              'Digital Marketing',
              'Performance Marketing',
              'AI Automation',
              'Conversion Optimization',
            ],
            areaServed: {
              '@type': 'Country',
              name: ['BR', 'US'],
            },
          }),
        }}
      />
    </>
  );
}
