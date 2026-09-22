import type { Metadata } from 'next';
import { SosLanding } from '@/components/sos/sos-landing';
import { SosJsonLd } from '@/components/sos/sos-json-ld';
import { sosVibeCode } from '@/lib/sos-content';

const TITLE = 'SOS Vibe Code: seu app do Lovable pronto pra produção | C9';
const DESCRIPTION =
  'Fez seu app no Lovable, v0, Bolt ou Cursor e travou? Um dev lê o código que a IA escreveu, corrige e coloca no ar com segurança. Auditoria de 20 min grátis.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/sos-vibe-code' },
  openGraph: { type: 'website', locale: 'pt_BR', url: '/sos-vibe-code', title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function Page() {
  return (
    <>
      <SosLanding page={sosVibeCode} />
      <SosJsonLd
        page={sosVibeCode}
        serviceType="Correção e colocação em produção de app gerado por IA"
        description={DESCRIPTION}
        offers={[
          { name: 'Auditoria de 20 minutos', price: 0 },
          { name: 'Sprint de produção', price: 299 },
        ]}
      />
    </>
  );
}
