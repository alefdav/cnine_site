import type { SosPage } from '@/lib/sos-content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://c9company.com.br';

/* Só o que tem preço fixo público (o diagnóstico grátis). O resto é orçado caso a caso. */
interface Offer {
  name: string;
  price: number;
}

/* Service + FAQPage. Sem aggregateRating: não há avaliação publicada pra citar. */
export function SosJsonLd({
  page,
  serviceType,
  description,
  offers,
}: {
  page: SosPage;
  serviceType: string;
  description: string;
  offers: Offer[];
}) {
  const url = `${SITE_URL}/${page.slug}`;
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.offer,
      serviceType,
      description,
      url,
      areaServed: { '@type': 'Country', name: 'BR' },
      provider: { '@type': 'Organization', name: 'C9 Company', url: SITE_URL },
      offers: offers.map((o) => ({
        '@type': 'Offer',
        name: o.name,
        price: o.price,
        priceCurrency: 'BRL',
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
