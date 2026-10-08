/*
  Meta Pixel (pixel "PX´s C9", conta c9company). O ID não é segredo; a env
  existe só para trocar de pixel sem mexer no código.
*/
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1344402923355724';

type FbqParams = Record<string, unknown>;

export interface FbqOptions {
  eventID?: string;
}

export type FbqEvent = 'PageView' | 'ViewContent' | 'InitiateCheckout' | 'Purchase' | 'Lead' | 'Contact';

declare global {
  interface Window {
    fbq?: (command: string, ...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function pixelReady(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

/* Nunca quebra: em SSR, ou com o pixel bloqueado, só não faz nada. */
export function track(event: FbqEvent, params?: FbqParams, options?: FbqOptions): boolean {
  if (!pixelReady()) return false;
  try {
    if (options) window.fbq!('track', event, params ?? {}, options);
    else if (params) window.fbq!('track', event, params);
    else window.fbq!('track', event);
    return true;
  } catch {
    return false;
  }
}

/* Ebook "Claude no ADM Logístico". */
export const EBOOK_LOGISTICA = {
  content_ids: ['ebook-logistica'],
  content_type: 'product',
  content_name: 'Claude no ADM Logístico',
  value: 17.9,
  currency: 'BRL',
} as const;

export const EBOOK_LOGISTICA_CHECKOUT_URL = 'https://app.abacatepay.com/pay/bill_HLLxP43NzPteT1z5BgswQwkj';
