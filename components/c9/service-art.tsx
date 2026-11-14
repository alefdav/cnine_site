import type { CSSProperties, ReactNode } from 'react';
import type { ServiceSlug } from '@/lib/c9';
import { Clouds } from '@/components/c9/clouds';
import { Icon } from '@/components/c9/icon';

/*
  A peça de cada serviço na hero (o objeto que o serviço entrega) e o
  conteúdo da faixa escura "#mostra". Tudo que é conversa, página ou post
  é exemplo e diz isso na tela; os números do Nexus têm fonte na própria
  faixa.
*/

const bar = (p: string) => ({ '--p': p }) as CSSProperties;

export const HERO_ART: Record<ServiceSlug, ReactNode> = {
  'google-meu-negocio': (
    <div className="art">
      <div className="top">
        <span className="ic sm">
          <Icon name="search" size={16} />
        </span>
        laboratório nilópolis<small>Google Maps</small>
      </div>
      <ol className="ladder">
        <li>
          <b>Agosto</b>
          <span>Fora dos 20 primeiros</span>
          <i style={bar('8%')} />
        </li>
        <li>
          <b>Dia 6</b>
          <span>#4 para exame toxicológico</span>
          <i style={bar('62%')} />
        </li>
        <li className="on">
          <b>Outubro</b>
          <span>1º no Maps</span>
          <i style={bar('100%')} />
        </li>
      </ol>
      <p className="tagline">
        <Icon name="pin" size={14} />
        Cliente C9: Nexus Lab, Nilópolis, RJ
      </p>
    </div>
  ),
  'trafego-pago': (
    <div className="art">
      <div className="top">
        <span className="av">C9</span>Conta de anúncio<small>como fica</small>
      </div>
      <ul className="acct">
        <li><span>Titular</span><b>Seu negócio</b></li>
        <li><span>Pagamento</span><b>Cartão do seu negócio, direto no Google e na Meta</b></li>
        <li><span>C9</span><b>Acesso de gestor</b></li>
        <li><span>Se encerrar</span><b>A conta e o histórico ficam com você</b></li>
      </ul>
      <p className="tagline">
        <Icon name="lock" size={14} />A C9 não revende clique
      </p>
    </div>
  ),
  'sites-e-paginas': (
    <div className="art page">
      <Clouds w={480} h={200} seed={45} cell={6} ang={45} col="ht-page" puffs={[[420, 20, 110], [320, -10, 80], [480, 120, 90]]} />
      <div className="pt">
        <b>Seu negócio</b>
        <span className="sw">
          <i className="on">PT</i>
          <i>ES</i>
        </span>
      </div>
      <h3>Conserto de ar-condicionado no seu bairro.</h3>
      <p>Atendimento em casa, com horário marcado.</p>
      <span className="wa">
        <Icon name="chat" size={16} />
        Chamar no WhatsApp
      </span>
      <p className="tagline">exemplo de página</p>
    </div>
  ),
  'atendimento-com-ia': (
    <div className="art">
      <div className="top">
        <span className="av">IA</span>Seu negócio<small>exemplo de conversa</small>
      </div>
      <div className="msgs">
        <div className="m t">Oi, vocês atendem sábado?<small>21:52</small></div>
        <div className="m u">Atendemos até 14h. Tenho sábado 09:30 ou 11:00. Qual fica melhor?<small>21:52</small></div>
        <div className="m t">09:30<small>21:53</small></div>
        <div className="m u">Marcado. Na sexta eu confirmo com você.<small>21:53</small></div>
        <div className="m u">Oi! Confirmando sua consulta amanhã, sábado, às 09:30. Posso manter?<small>sexta, 10:00</small></div>
      </div>
      <p className="tagline">
        <Icon name="bell" size={14} />A última mensagem é a Véspera
      </p>
    </div>
  ),
  conteudo: (
    <div className="stack">
      <div className="art post">
        <Clouds w={300} h={170} seed={65} cell={6} ang={45} col="ht-post" puffs={[[260, 20, 90], [180, -10, 70], [300, 110, 70]]} />
        <h3>Sábado tem horário extra.</h3>
        <p>Molde: troque a foto e o preço</p>
      </div>
      <div className="art story">
        <Clouds w={170} h={260} seed={66} cell={5} ang={0} col="ht-story" banks={[{ y: 210, rmin: 40, rmax: 70, jit: 30 }]} body={{ y: 230, soft: 40 }} />
        <h3>Antes e depois</h3>
        <p className="cap">Cena, em motion</p>
      </div>
      <div className="art mail">
        <b>Faz tempo que você não aparece por aqui</b>
        <p>Carta: para quem comprou e sumiu.</p>
      </div>
    </div>
  ),
  'sistemas-sob-medida': (
    <div className="art">
      <div className="top">
        <span className="av">IA</span>Assistente da equipe<small>exemplo</small>
      </div>
      <div className="msgs">
        <div className="m t">Quais orçamentos estão parados?</div>
        <div className="tool">
          <Icon name="code" size={14} />
          consultando orçamentos parados
        </div>
        <div className="m u">Encontrei os orçamentos sem resposta da semana. Quer que eu prepare uma mensagem para cada paciente?</div>
        <div className="m t">Quero. E gera o PDF do mais antigo.</div>
      </div>
      <p className="tagline">
        <Icon name="lock" size={14} />
        Login seguro, dado real do sistema
      </p>
    </div>
  ),
};

function Head({ h2, lede }: { h2: [string, string]; lede: string }) {
  return (
    <div className="dh">
      <h2>
        {h2[0]}
        <br />
        {h2[1]}
      </h2>
      <p className="lede">{lede}</p>
    </div>
  );
}

const Ok = ({ name }: { name: Parameters<typeof Icon>[0]['name'] }) => <Icon name={name} size={20} />;

export const BAND: Record<ServiceSlug, ReactNode> = {
  'google-meu-negocio': (
    <>
      <Head h2={['De fora do top 20', 'a 1º no Maps.']} lede="Nexus Lab, laboratório em Nilópolis. A primeira mudança foi a categoria do perfil." />
      <div className="tl">
        <div><b>Dia 0</b><h3>Categorias corrigidas</h3><p>O Google não sabia para que buscas mostrar o laboratório.</p></div>
        <div><b>Dia 6</b><h3>#4 no mapa</h3><p>Para “exame toxicológico” em Nilópolis.</p></div>
        <div><b>Outubro</b><h3>1º no Maps</h3><p>Para “laboratório nilópolis”.</p></div>
      </div>
      <div className="stats">
        <div className="stat"><span className="num">+111%</span><p>ligações e WhatsApp em setembro, contra a média de junho a agosto</p></div>
        <div className="stat"><span className="num">2.516</span><p>aparições no Google em 23 dias, eram 1.240</p></div>
        <div className="stat"><span className="num">51</span><p>cliques no site em 23 dias, eram 26</p></div>
      </div>
      <p className="src">Search Console e Perfil da Empresa do próprio laboratório, setembro e outubro de 2026.</p>
    </>
  ),
  'trafego-pago': (
    <>
      <Head h2={['Você paga o Google.', 'A gente faz render.']} lede="A verba nunca passa pela C9. A gestão é cobrada à parte, por escrito." />
      <div className="flow">
        <div className="fl"><span className="k">01</span><h3>Sua conta</h3><p>Você paga o Google e a Meta direto, no cartão do negócio.</p></div>
        <div className="fl"><span className="k">02</span><h3>Anúncio local</h3><p>Só para a sua região e para quem procura o que você faz.</p></div>
        <div className="fl"><span className="k">03</span><h3>Conversa</h3><p>O clique cai na sua página ou direto no WhatsApp.</p></div>
        <div className="fl"><span className="k">04</span><h3>Relatório</h3><p>Quanto foi gasto e quantas conversas vieram.</p></div>
      </div>
    </>
  ),
  'sites-e-paginas': (
    <>
      <Head h2={['Português ou espanhol,', 'a mesma página.']} lede="A C9 já roda o mesmo sistema para uma operação no México, com atendimento em espanhol." />
      <div className="duo">
        <div className="spec">
          <Clouds w={300} h={220} seed={46} cell={6} ang={45} col="sky-4" puffs={[[260, 30, 100], [170, 0, 80], [300, 130, 80]]} />
          <h3>Conserto de ar-condicionado no seu bairro.</h3>
          <span className="lang">PT</span>
          <span className="wa">Chamar no WhatsApp</span>
        </div>
        <div className="spec" lang="es">
          <Clouds w={300} h={220} seed={47} cell={6} ang={45} col="sky-4" puffs={[[260, 30, 100], [170, 0, 80], [300, 130, 80]]} />
          <h3>Reparación de aire acondicionado en tu colonia.</h3>
          <span className="lang">ES</span>
          <span className="wa">Escríbenos por WhatsApp</span>
        </div>
      </div>
      <p className="src">Exemplos de página. O texto de cada uma sai do diagnóstico do seu negócio.</p>
    </>
  ),
  'atendimento-com-ia': (
    <>
      <Head h2={['Véspera:', 'a vaga não fica parada.']} lede="Horário vazio é dinheiro que não volta. A Véspera confirma antes." />
      <div className="tl">
        <div><b>Dia anterior</b><h3>Mensagem no WhatsApp</h3><p>Confirma dia e horário da consulta.</p></div>
        <div><b>Sem resposta</b><h3>Uma ligação</h3><p>Em português, pedindo a confirmação.</p></div>
        <div><b>Não pode vir</b><h3>Outro horário</h3><p>Oferece uma nova data na mesma conversa.</p></div>
      </div>
    </>
  ),
  conteudo: (
    <>
      <Head h2={['Você troca a foto.', 'O resto é com a gente.']} lede="Conteúdo aqui serve para o cliente lembrar de você e chamar, não para curtida." />
      <div className="cols">
        <div className="cl">
          <h3>Você</h3>
          <ul>
            <li><Ok name="img" />Troca a foto e o preço</li>
            <li><Ok name="ok" />Aprova antes de ir ao ar</li>
          </ul>
        </div>
        <div className="cl us">
          <h3>A C9</h3>
          <ul>
            <li><Ok name="layers" />Escreve e desenha cada post</li>
            <li><Ok name="video" />Faz os stories e os vídeos</li>
            <li><Ok name="mail" />Manda o e-mail para a sua base</li>
          </ul>
        </div>
      </div>
    </>
  ),
  'sistemas-sob-medida': (
    <>
      <Head h2={['O que já está', 'no ar.']} lede="Quatro sistemas construídos pela C9, rodando em negócio de verdade." />
      <div className="eg">
        <div className="ec">
          <span className="ic"><Icon name="doc" size={24} /></span>
          <div><h3>Portal de resultados e orçamento em PDF</h3><p>O paciente baixa o exame sozinho. A equipe gera o orçamento em segundos.</p><span className="live">No ar no Nexus Lab</span></div>
        </div>
        <div className="ec">
          <span className="ic"><Icon name="spark" size={24} /></span>
          <div><h3>IA que consulta o sistema</h3><p>Um servidor com 18 ferramentas deixa a IA ver agenda, exames e orçamentos.</p><span className="live">No ar no Nexus Lab</span></div>
        </div>
        <div className="ec">
          <span className="ic"><Icon name="cal" size={24} /></span>
          <div><h3>Agenda, caixa e comissão</h3><p>Para barbearia e salão, com cobrança por Pix Automático.</p></div>
        </div>
        <div className="ec">
          <span className="ic"><Icon name="building" size={24} /></span>
          <div><h3>Portaria digital</h3><p>Encomenda e visita registradas, com aviso no WhatsApp do morador.</p><span className="live">Num condomínio de 64 apartamentos</span></div>
        </div>
      </div>
    </>
  ),
};
