import type { Metadata } from 'next';
import { CITY, EMAIL, LEGAL_NAME, WHATSAPP_NUMBER } from '@/lib/content';
import { SERVICES, SITE_URL } from '@/lib/c9';
import { SERVICE_PAGES } from '@/lib/c9-services';
import { SiteFooter } from '@/components/c9/chrome';
import { Closing } from '@/components/c9/service-page';
import {
  HOME_FAQ,
  HomeAudience,
  HomeCase,
  HomeFaq,
  HomeHero,
  HomePromises,
  HomeProcess,
  HomeServices,
} from '@/components/c9/home';

const TITLE = 'C9 Company | Seu negócio no topo do Google e com a agenda cheia';
const DESCRIPTION =
  'A C9 cuida do Google, do anúncio, do site e do atendimento no WhatsApp para negócio local. Um time só responde por tudo. O Nexus Lab saiu de fora do top 20 para 1º no Google Maps.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'pt_BR', url: '/', siteName: 'C9 Company', title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <main>
        <HomeServices />
        <HomeCase />
        <HomeProcess />
        <HomePromises />
        <HomeAudience />
        <HomeFaq />
      </main>
      <Closing seed={111} />
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'C9 Company',
              legalName: LEGAL_NAME,
              url: SITE_URL,
              email: EMAIL,
              telephone: `+${WHATSAPP_NUMBER}`,
              description: DESCRIPTION,
              address: { '@type': 'PostalAddress', addressLocality: 'Rio de Janeiro', addressRegion: 'RJ', addressCountry: 'BR' },
              areaServed: [{ '@type': 'Country', name: 'BR' }, { '@type': 'Country', name: 'MX' }],
              knowsAbout: SERVICES.map((s) => SERVICE_PAGES[s.slug].serviceType),
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: `Serviços da C9 em ${CITY}`,
                itemListElement: SERVICES.map((s) => ({
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: SERVICE_PAGES[s.slug].title, url: `${SITE_URL}/${s.slug}` },
                })),
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: HOME_FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
            },
          ]),
        }}
      />
    </>
  );
}
