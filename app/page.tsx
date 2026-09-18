'use client';

import { useEffect, useState } from 'react';
import {
  CITY,
  EMAIL,
  LEGAL_NAME,
  WHATSAPP_NUMBER,
  content,
  type Language,
} from '@/lib/content';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Proof } from '@/components/proof';
import { System } from '@/components/system';
import { ReceptionTest } from '@/components/reception-test';
import { Services } from '@/components/services';
import { Protocol } from '@/components/protocol';
import { Pledges } from '@/components/pledges';
import { NotDoing } from '@/components/not-doing';
import { Audience } from '@/components/audience';
import { Faq } from '@/components/faq';
import { Closing } from '@/components/closing';
import { Footer } from '@/components/footer';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://c9company.com.br';

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
        <Hero t={t} lang={lang} />
        <Proof t={t} />
        <System t={t} />
        <ReceptionTest t={t} lang={lang} />
        <Services t={t} />
        <Protocol t={t} />
        <Pledges t={t} />
        <NotDoing t={t} />
        <Audience t={t} />
        <Faq t={t} />
      </main>
      <Closing t={t} lang={lang} />
      <Footer t={t} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'C9 Company',
            legalName: LEGAL_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/logo.png`,
            email: EMAIL,
            description:
              lang === 'pt'
                ? 'Anúncio, página e recepção automática no WhatsApp operando como um único sistema para negócios que atendem com hora marcada.'
                : 'Ads, landing page and automated WhatsApp reception running as a single system for appointment-based businesses.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Rio de Janeiro',
              addressRegion: 'RJ',
              addressCountry: 'BR',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Sales',
              telephone: `+${WHATSAPP_NUMBER}`,
              email: EMAIL,
              areaServed: ['BR', 'US', 'MX'],
              availableLanguage: ['Portuguese', 'English', 'Spanish'],
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
            areaServed: { '@type': 'Country', name: ['BR', 'US', 'MX'] },
            description:
              lang === 'pt'
                ? `Recepção automática no WhatsApp, recepção por voz, páginas de conversão, tráfego pago local e medição, operados como um sistema único a partir de ${CITY}.`
                : `Automated WhatsApp reception, voice reception, conversion pages, local paid traffic and measurement, run as a single system from ${CITY}.`,
            serviceType: [
              'WhatsApp Automation',
              'Voice AI Reception',
              'Conversion Pages',
              'Local Paid Traffic',
              'Local SEO and Measurement',
            ],
          }),
        }}
      />
    </>
  );
}
