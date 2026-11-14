import type { CSSProperties } from 'react';
import Link from 'next/link';
import { waLink, waQuestion } from '@/lib/c9';
import { Clouds, BandClouds, Grain } from '@/components/c9/clouds';
import { Arrow, Icon, type IconName } from '@/components/c9/icon';
import { SiteNav } from '@/components/c9/chrome';

/*
  Seções da home de 2026-11: hero centrada (D-015), apanhado
  dos serviços (D-016), caso Nexus, processo, promessas, para quem e
  perguntas. O fechamento e o rodapé são os mesmos das páginas de serviço.
*/

export function HomeHero() {
  return (
    <section className="hero home">
      <Clouds className="bot" h={960} seed={4} cell={5} ang={0} col="far" base={0.62}
        puffs={[[90, 640, 190], [300, 580, 150], [1150, 580, 160], [1350, 630, 200], [1440, 720, 180], [0, 780, 200]]}
        body={{ y: 800, soft: 120 }} />
      <Clouds className="bot" h={960} seed={13} cell={6} ang={0} col="near"
        puffs={[[60, 790, 170], [250, 830, 150], [420, 870, 130], [1020, 870, 130], [1190, 820, 150], [1380, 780, 180], [720, 930, 140]]}
        body={{ y: 880, soft: 60 }} />
      <div className="floor" />
      <SiteNav />
      <div className="w hc">
        <p className="badge">
          <b>Cliente C9</b>Nexus Lab, de fora do top 20 a 1º no Google Maps
        </p>
        <h1>
          Seu negócio no topo do Google
          <br />
          <span>e com a agenda cheia.</span>
        </h1>
        <p className="l">A C9 cuida do Google, do anúncio, do site e do atendimento no WhatsApp. Um time só responde por tudo.</p>
        <div className="btns">
          <a className="b s" href={waLink()}>
            Agendar diagnóstico <Arrow />
          </a>
          <a className="b g" href="#servicos">
            Ver os serviços
          </a>
        </div>
        <div className="art chat">
          <div className="top">
            <span className="av">IA</span>Seu negócio<small>exemplo de conversa</small>
          </div>
          <div className="msgs">
            <div className="m t">Oi, vocês atendem sábado?<small>21:52</small></div>
            <div className="m u">Atendemos até 14h. Tenho sábado 09:30 ou 11:00. Qual fica melhor?<small>21:52</small></div>
            <div className="m t">09:30<small>21:53</small></div>
            <div className="m u">Marcado. Na sexta eu confirmo com você.<small>21:53</small></div>
          </div>
        </div>
      </div>
      <Grain id="g1" />
    </section>
  );
}

function Card({ href, icon, h, p }: { href: string; icon: IconName; h: string; p: string }) {
  return (
    <Link className="sv" href={href}>
      <span className="ic"><Icon name={icon} /></span>
      <h3>{h}</h3>
      <p>{p}</p>
      <span className="go">Ver a página <Icon name="arrow" size={18} /></span>
    </Link>
  );
}

export function HomeServices() {
  return (
    <section className="svc" id="servicos">
      <div className="w">
        <div className="ih">
          <h2>Tudo que leva o cliente<br />até a sua porta.</h2>
          <p className="lede">Contrate o sistema inteiro ou só a peça que falta. O diagnóstico mostra qual.</p>
        </div>
        <div className="bento">
          <Link className="sv hero-card" href="/google-meu-negocio">
            <Clouds w={460} h={600} seed={91} cell={6} ang={0} col="near" base={0.6}
              banks={[{ y: 540, rmin: 40, rmax: 80, jit: 30 }]} body={{ y: 556, soft: 40 }} />
            <span className="ic"><Icon name="pin" /></span>
            <h3>Google e Maps</h3>
            <p>Seu negócio aparece quando alguém da cidade procura.</p>
            <span className="big">1º<small>no Maps para o Nexus Lab, cliente C9</small></span>
            <span className="go">Ver a página <Icon name="arrow" size={18} /></span>
          </Link>
          <Card href="/trafego-pago" icon="target" h="Anúncios e prospecção" p="Quem precisa hoje recebe o seu nome hoje." />
          <Card href="/sites-e-paginas" icon="page" h="Páginas e sites" p="O clique vira conversa no WhatsApp." />
          <Card href="/atendimento-com-ia" icon="chat" h="Atendimento com IA" p="Resposta em segundos, inclusive às 22h." />
          <Card href="/conteudo" icon="layers" h="Conteúdo recorrente" p="Quem já comprou lembra de você e volta." />
          <Link className="sv wide" href="/sistemas-sob-medida">
            <span className="ic"><Icon name="code" /></span>
            <div>
              <h3>Sistemas sob medida</h3>
              <p>O sistema do seu negócio, com IA que consulta os dados.</p>
            </div>
            <span className="go">Ver a página <Icon name="arrow" size={18} /></span>
          </Link>
        </div>
        <div className="sos">
          <p>Site com vírus ou app parado? <span>Resgate com página própria.</span></p>
          <Link href="/sos-wordpress">SOS WordPress</Link>
          <Link href="/sos-vibe-code">SOS Vibe Code</Link>
        </div>
      </div>
    </section>
  );
}

const h = (px: number) => ({ height: `${px}px` }) as CSSProperties;

export function HomeCase() {
  return (
    <section className="case">
      <Clouds w={520} h={460} seed={71} cell={7} ang={45} col="mist" className="tr" puffs={[[410, 70, 160], [280, 30, 110], [520, 210, 130]]} />
      <div className="w">
        <div className="dh">
          <h2>De fora do top 20<br />a 1º no Maps.</h2>
          <p className="lede">O Nexus Lab é um laboratório em Nilópolis. A primeira mudança foi a categoria do perfil no Google. O resto veio de medir cada ajuste.</p>
        </div>
        <div className="tl light">
          <div><b>Dia 0</b><h3>Categorias corrigidas</h3><p>O Google não sabia para que buscas mostrar o laboratório.</p></div>
          <div><b>Dia 6</b><h3>#4 no mapa</h3><p>Para “exame toxicológico”. Antes, fora dos 20 primeiros.</p></div>
          <div><b>Outubro</b><h3>1º no Maps</h3><p>Para “laboratório nilópolis” e “exame toxicológico nilopolis”.</p></div>
        </div>
        <div className="mx">
          <figure className="mc">
            <figcaption className="lab">Aparições no Google<small>Search Console, janelas de 23 dias</small></figcaption>
            <div className="bars"><div className="bar" style={h(63)}><em>1.240</em></div><div className="bar" style={h(91)}><em>1.780</em></div><div className="bar last" style={h(128)}><em>2.516</em></div></div>
            <div className="xl"><span>Janela 1</span><span>Janela 2</span><span>Janela 3</span></div>
          </figure>
          <figure className="mc">
            <figcaption className="lab">Cliques no site<small>Search Console, janelas de 23 dias</small></figcaption>
            <div className="bars"><div className="bar" style={h(65)}><em>26</em></div><div className="bar" style={h(105)}><em>42</em></div><div className="bar last" style={h(128)}><em>51</em></div></div>
            <div className="xl"><span>Janela 1</span><span>Janela 2</span><span>Janela 3</span></div>
          </figure>
          <figure className="mc">
            <figcaption className="lab">Ligações e WhatsApp pelo Google<small>Perfil da Empresa, por mês</small></figcaption>
            <div className="bars"><div className="bar" style={h(61)}><em>15,7</em></div><div className="bar last" style={h(128)}><em>33</em></div></div>
            <div className="xl"><span>Média de junho a agosto</span><span>Setembro</span></div>
          </figure>
        </div>
        <p className="note">
          Números do Search Console e do Perfil da Empresa do próprio laboratório, setembro e outubro de 2026.{' '}
          <Link href="/google-meu-negocio">Como a gente faz no Google</Link>
        </p>
      </div>
    </section>
  );
}

export function HomeProcess() {
  const steps: [string, string | null, string, string][] = [
    ['01', '30 min', 'Diagnóstico', 'Por vídeo ou WhatsApp. A gente olha o seu Google, o seu anúncio e o seu atendimento e mostra onde o cliente se perde.'],
    ['02', 'por escrito', 'Plano', 'O que fechar primeiro, o que fica para depois, quanto custa e como cada resultado vai ser medido.'],
    ['03', null, 'Implantação', 'A gente monta e liga as peças. Nada vai ao ar antes da sua aprovação.'],
    ['04', 'todo mês', 'Operação', 'Ajuste contínuo e um relatório com os números do seu Google, do anúncio e do atendimento.'],
  ];
  return (
    <section className="proc">
      <div className="w">
        <div className="ih">
          <h2>Do primeiro papo<br />ao sistema rodando.</h2>
          <p className="lede">Quatro passos, sem pacote fechado. Você vê cada peça antes de ela ir ao ar.</p>
        </div>
        <ol className="steps">
          {steps.map(([n, t, title, p]) => (
            <li key={n} className="sp">
              <span className="n">{n}</span>
              {t && <span className="t">{t}</span>}
              <h3>{title}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HomePromises() {
  const yes: [string, string][] = [
    ['Sem fidelidade', 'Você fica porque está funcionando. Avisou, encerrou.'],
    ['A verba do anúncio fica na conta do seu negócio', 'Você paga o Google e a Meta direto. A gente não revende clique.'],
    ['Um negócio por ramo em cada cidade', 'A gente não trabalha para o seu concorrente da mesma cidade.'],
    ['Todo número com fonte', 'Search Console, Perfil da Empresa ou a conta do anúncio.'],
    ['Um responsável só', 'Uma pessoa responde por tudo, do Google até a agenda.'],
  ];
  const no: [string, string][] = [
    ['Quantidade de clientes por mês', 'Depende de preço, região e atendimento. A promessa é medir e melhorar.'],
    ['Primeiro lugar no Google com data marcada', 'Quem garante posição com prazo está chutando.'],
    ['Seguidor e curtida', 'Conteúdo aqui serve para o cliente chamar, não para métrica de vaidade.'],
  ];
  return (
    <section className="dk prom">
      <BandClouds seed={101} />
      <div className="ceil" />
      <div className="w">
        <div className="dh">
          <h2>O que a gente promete.<br />E o que não promete.</h2>
          <p className="lede">Agência que promete tudo some quando o resultado não vem. Aqui o combinado fica por escrito desde o diagnóstico.</p>
        </div>
        <div className="pc">
          <div className="pl">
            <h3>Promete</h3>
            <ul>
              {yes.map(([b, s]) => (
                <li key={b}><Icon name="ok" size={24} stroke={1.8} /><div><b>{b}</b><small>{s}</small></div></li>
              ))}
            </ul>
          </div>
          <div className="pl no">
            <h3>Não promete</h3>
            <ul>
              {no.map(([b, s]) => (
                <li key={b}><Icon name="no" size={24} stroke={1.8} /><div><b>{b}</b><small>{s}</small></div></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="dfloor" />
      <Grain id="g2" />
    </section>
  );
}

export function HomeAudience() {
  const who: [IconName, string, string, boolean?][] = [
    ['clinic', 'Clínicas e consultórios', 'Laboratório, odontologia, estética, fisioterapia. Agenda cheia e menos falta.'],
    ['wrench', 'Serviços com visita', 'Ar-condicionado, dedetização, reforma, assistência técnica. Orçamento vira visita marcada.'],
    ['shop', 'Comércio e escritórios', 'Imobiliária, advocacia, contabilidade, loja de bairro. Quem procura acha você primeiro.'],
    ['globe', 'Fora do Brasil, em espanhol', 'O mesmo sistema rodando para uma operação no México, em espanhol.', true],
  ];
  return (
    <section className="who">
      <div className="w">
        <div className="ih">
          <h2>Para quem é procurado<br />na própria região.</h2>
          <p className="lede">Se o seu cliente pesquisa no Google, liga ou chama no WhatsApp antes de fechar, a C9 foi feita para você.</p>
        </div>
        <div className="wg">
          {who.map(([icon, title, p, ex]) => (
            <div key={title} className={ex ? 'wc ex' : 'wc'}>
              <span className="ic"><Icon name={icon} /></span>
              <h3>{title}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const HOME_FAQ: [string, string][] = [
  ['Quanto custa?', 'Depende de quais peças entram. O valor sai no diagnóstico, por escrito, antes de qualquer compromisso.'],
  ['Preciso contratar o sistema inteiro?', 'Não. Dá para começar por uma peça, como o perfil no Google ou o atendimento no WhatsApp, e somar as outras depois.'],
  ['E se eu quiser sair?', 'Sem fidelidade. Você avisa, a gente entrega os acessos. A conta do anúncio, o perfil no Google e o site continuam no nome do seu negócio.'],
  ['Vocês atendem o meu concorrente?', 'Não na mesma cidade. A C9 trabalha com um negócio por ramo em cada cidade.'],
];

export function HomeFaq() {
  return (
    <section className="faq">
      <div className="w">
        <div className="side">
          <h2>Perguntas<br />antes de fechar.</h2>
          <p>As que mais aparecem no diagnóstico. A sua não está aqui?</p>
          <a href={waQuestion('a C9')}>Perguntar no WhatsApp</a>
        </div>
        <div className="fq">
          {HOME_FAQ.map(([q, a]) => (
            <div key={q} className="fi"><h3>{q}</h3><p>{a}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}
