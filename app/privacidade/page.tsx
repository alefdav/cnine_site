import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';
import { LEGAL_ID, LEGAL_NAME, WHATSAPP_DISPLAY } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description: 'Como a C9 Company trata os dados de quem visita o site e compra seus produtos.',
  alternates: { canonical: '/privacidade' },
};

export default function Page() {
  return (
    <LegalPage title="Política de privacidade" updated="13/10/2026">
      <p>
        Esta política explica como a {LEGAL_NAME}, {LEGAL_ID}, trata os dados de quem visita este site e compra os
        nossos produtos, de acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018).
      </p>

      <h2>1. Dados que coletamos</h2>
      <ul>
        <li>
          <strong>Navegação:</strong> páginas visitadas, cliques, rolagem, tipo de aparelho e origem da visita, por meio
          de cookies e das ferramentas Meta Pixel (Meta) e Microsoft Clarity (Microsoft). O Clarity grava a sessão de
          forma anônima, mascarando campos de texto.
        </li>
        <li>
          <strong>Compra:</strong> nome, e-mail e os dados pedidos pela AbacatePay para processar o Pix. Esses dados são
          tratados pela AbacatePay no checkout.
        </li>
        <li>
          <strong>Atendimento:</strong> nome, número e mensagens de quem fala com a gente pelo WhatsApp.
        </li>
      </ul>

      <h2>2. Para que usamos</h2>
      <ul>
        <li>Entregar o produto comprado e prestar suporte.</li>
        <li>Medir e melhorar as páginas e os anúncios.</li>
        <li>Cumprir obrigações legais, como reembolsos e registros fiscais.</li>
      </ul>

      <h2>3. Com quem compartilhamos</h2>
      <p>
        Só com os serviços necessários para o site funcionar: Meta, Microsoft, AbacatePay e a empresa que hospeda o
        site. Não vendemos dados pessoais.
      </p>

      <h2>4. Seus direitos</h2>
      <p>
        Você pode pedir acesso, correção ou exclusão dos seus dados, ou retirar o seu consentimento, pelo WhatsApp{' '}
        {WHATSAPP_DISPLAY}. Também pode bloquear cookies nas configurações do seu navegador.
      </p>

      <h2>5. Contato</h2>
      <p>Encarregado de dados: {LEGAL_NAME}, pelo WhatsApp {WHATSAPP_DISPLAY}.</p>
    </LegalPage>
  );
}
