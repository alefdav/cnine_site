import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';
import { LEGAL_ID, LEGAL_NAME, WHATSAPP_DISPLAY } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Termos de uso',
  description: 'Termos de uso e de compra dos produtos digitais da C9 Company.',
  alternates: { canonical: '/termos' },
};

export default function Page() {
  return (
    <LegalPage title="Termos de uso" updated="28/10/2026">
      <p>
        Estes termos valem para a compra e o uso dos produtos digitais vendidos pela {LEGAL_NAME}, {LEGAL_ID}, como os
        guias em PDF &quot;Claude no Administrativo Logístico&quot;, &quot;Paraguai ou Uruguai? O Guia Definitivo do
        Brasileiro que Quer se Mudar em 2026&quot; e &quot;Morar nos Estados Unidos (Coleção Plano B)&quot;.
      </p>

      <h2>1. Os produtos</h2>
      <p>
        Cada guia é um arquivo PDF. O &quot;Claude no Administrativo Logístico&quot; traz orientações e pedidos (textos
        para usar em ferramentas de inteligência artificial) e não inclui assinatura de nenhuma ferramenta de IA nem
        suporte técnico a sistemas da sua empresa. O &quot;Paraguai ou Uruguai?&quot; é um guia informativo sobre
        mudança, residência, custos e impostos, com valores levantados em outubro de 2026. O &quot;Morar nos Estados
        Unidos&quot; é um guia informativo sobre os caminhos legais de imigração para os EUA, custos, prazos e vida no
        país, com informações conferidas em outubro de 2026.
      </p>

      <h2>2. Pagamento e entrega</h2>
      <p>
        O pagamento é feito por Pix e processado pela AbacatePay. Depois da confirmação do Pix, você é levado à página
        de download do PDF. Nos guias &quot;Paraguai ou Uruguai?&quot; e &quot;Morar nos Estados Unidos&quot;, o código
        da compra (identificador do Pix) mostrado nessa página dá acesso a novos downloads.
      </p>

      <h2>3. Direito de arrependimento</h2>
      <p>
        Você pode desistir da compra em até 7 dias a partir da data do pagamento (Código de Defesa do Consumidor, art.
        49). Para isso, envie uma mensagem para o WhatsApp {WHATSAPP_DISPLAY} com o e-mail usado na compra ou o código da
        compra. O valor é devolvido por Pix.
      </p>

      <h2>4. Uso permitido</h2>
      <p>
        O guia é para uso pessoal e profissional de quem comprou. Não é permitido revender, redistribuir ou publicar o
        conteúdo, no todo ou em parte.
      </p>

      <h2>5. Responsabilidade</h2>
      <p>
        Os exemplos do guia de logística usam dados fictícios. Respostas de ferramentas de IA podem conter erros:
        confira sempre os resultados antes de usá-los em decisões, cobranças ou comunicações. Siga a política de uso de
        dados da sua empresa.
      </p>
      <p>
        O guia &quot;Paraguai ou Uruguai?&quot; é conteúdo informativo e não substitui a orientação de advogado,
        contador ou despachante. Taxas, câmbio e leis mudam: confira os valores no órgão oficial antes de pagar ou
        assinar qualquer coisa.
      </p>
      <p>
        O guia &quot;Morar nos Estados Unidos&quot; é conteúdo informativo, não é consultoria jurídica ou migratória e
        não garante visto, emprego ou aprovação de nenhum pedido, que dependem sempre das autoridades americanas. O
        autor não é advogado. Para o seu caso, procure um advogado de imigração com licença ativa nos EUA. Regras e taxas
        mudam: confira nos sites oficiais antes de pagar ou assinar qualquer coisa.
      </p>

      <h2>6. Marcas</h2>
      <p>
        Claude é marca da Anthropic. ChatGPT, Gemini, Copilot e Excel pertencem às respectivas empresas. O guia é
        independente e não tem vínculo com elas. Os guias não têm vínculo com os governos do Brasil, do Paraguai, do
        Uruguai ou dos Estados Unidos.
      </p>

      <h2>7. Contato</h2>
      <p>Dúvidas sobre estes termos: WhatsApp {WHATSAPP_DISPLAY}.</p>
    </LegalPage>
  );
}
