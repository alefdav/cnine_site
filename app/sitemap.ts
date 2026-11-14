import { MetadataRoute } from 'next';
import { EBOOKS } from '@/lib/ebooks';
import { SERVICES } from '@/lib/c9';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://c9company.com.br';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...SERVICES.map((s) => ({
      url: `${baseUrl}/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...['sos-wordpress', 'sos-vibe-code', 'claude-no-adm-logistico', 'claude-no-adm-logistico-v2', 'termos', 'privacidade', 'achados-natal', ...Object.values(EBOOKS).filter((e) => e.live).map((e) => e.salesPath.slice(1))].map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
