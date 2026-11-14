import { WHATSAPP_NUMBER } from '@/lib/content';

/*
  Site institucional de 2026-11 (redesign vintage: retícula de nuvem + grão).
  A home é o apanhado; cada serviço tem a sua página. Ver D-016 no vault.
*/

export const SERVICES = [
  { slug: 'google-meu-negocio', nav: 'Google e Maps' },
  { slug: 'trafego-pago', nav: 'Anúncios' },
  { slug: 'sites-e-paginas', nav: 'Páginas e sites' },
  { slug: 'atendimento-com-ia', nav: 'Atendimento com IA' },
  { slug: 'conteudo', nav: 'Conteúdo' },
  { slug: 'sistemas-sob-medida', nav: 'Sistemas' },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]['slug'];

/* Todo CTA de diagnóstico abre o WhatsApp com a mensagem pronta. */
export function waLink(topic?: string): string {
  const text = topic
    ? `Oi! Quero agendar um diagnóstico com a C9 (${topic}).`
    : 'Oi! Quero agendar um diagnóstico com a C9.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function waQuestion(topic: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Oi! Tenho uma pergunta sobre ${topic}.`)}`;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://c9company.com.br';
