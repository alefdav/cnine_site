import { Fragment } from 'react';
import Link from 'next/link';
import { SERVICES, type ServiceSlug } from '@/lib/c9';
import { EMAIL, LEGAL_ID, LEGAL_NAME, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/lib/content';
import { Icon } from '@/components/c9/icon';

/*
  Barra e rodapé do site de 2026-11. A barra vive dentro da hero (fundo
  noturno). Acima de 1180px mostra os seis serviços; abaixo, um <details>
  "Serviços" abre a mesma lista, sem JS.
*/
export function SiteNav({ current }: { current?: ServiceSlug }) {
  const links = SERVICES.map((s) => (
    <Link key={s.slug} href={`/${s.slug}`} aria-current={s.slug === current ? 'page' : undefined}>
      {s.nav}
    </Link>
  ));
  return (
    <header className="nav">
      <Link className="logo" href="/">
        C9.
      </Link>
      <nav className="links" aria-label="Serviços">
        {links}
      </nav>
      <div className="nr">
        <details className="mnav">
          <summary>
            <Icon name="menu" size={18} />
            Serviços
          </summary>
          <nav aria-label="Serviços">{links}</nav>
        </details>
        <a className="ncta" href="#diagnostico">
          Agendar diagnóstico
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="w">
        <div className="ft">
          <div>
            <Link className="logo" href="/">
              C9<span>.</span>
            </Link>
            <p className="about">
              Google, anúncio, página, atendimento com IA e sistema sob medida trabalhando como uma coisa só.
            </p>
          </div>
          <div>
            <p className="fh">Serviços</p>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`}>{s.nav}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="fh">Resgate</p>
            <ul>
              <li>
                <Link href="/sos-wordpress">SOS WordPress</Link>
              </li>
              <li>
                <Link href="/sos-vibe-code">SOS Vibe Code</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="fh">Contato</p>
            <ul>
              <li>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>WhatsApp {WHATSAPP_DISPLAY}</a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>Rio de Janeiro, RJ</li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>
            {LEGAL_NAME}, {LEGAL_ID}
          </span>
          <span>
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos</Link>
            © 2026 C9 Company
          </span>
        </div>
      </div>
    </footer>
  );
}

/* Quebra de linha editorial: "linha 1\nlinha 2" vira linha 1<br/>linha 2. */
export function Lines({ text }: { text: string }) {
  const parts = text.split('\n');
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {p}
          {i < parts.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}
