import type { Metadata } from 'next';
import { SosLanding } from '@/components/sos/sos-landing';
import { SosJsonLd } from '@/components/sos/sos-json-ld';
import { sosWordpress } from '@/lib/sos-content';

const TITLE = 'Manutenção de site WordPress: hackeado, lento ou com erro | C9';
const DESCRIPTION =
  'Site WordPress com vírus, lento ou com erro crítico? A C9 conserta, limpa e deixa monitorado. Diagnóstico grátis e valor fechado antes de começar.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/sos-wordpress' },
  openGraph: { type: 'website', locale: 'pt_BR', url: '/sos-wordpress', title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function Page() {
  return (
    <>
      <SosLanding page={sosWordpress} />
      <SosJsonLd
        page={sosWordpress}
        serviceType="Manutenção de site WordPress"
        description={DESCRIPTION}
        offers={[
          { name: 'Diagnóstico de site WordPress', price: 0 },
        ]}
      />
    </>
  );
}
