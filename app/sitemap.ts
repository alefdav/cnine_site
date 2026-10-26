import { MetadataRoute } from 'next';
import { EBOOK_PARAGUAI_LIVE } from '@/lib/ebook-paraguai';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://c9company.com.br';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...['sos-wordpress', 'sos-vibe-code', 'claude-no-adm-logistico', 'claude-no-adm-logistico-v2', 'termos', 'privacidade', 'achados-natal', ...(EBOOK_PARAGUAI_LIVE ? ['morar-no-paraguai'] : [])].map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
