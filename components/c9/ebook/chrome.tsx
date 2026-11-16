import Image from 'next/image';
import Link from 'next/link';
import { LEGAL_ID, LEGAL_NAME } from '@/lib/content';
import type { Ebook } from '@/lib/ebooks';
import { BuyTrigger } from '@/components/ebook/pix/buy-trigger';
import { Arrow } from '@/components/c9/icon';

/*
  Peças comuns das páginas de venda de ebook no sistema c9: barra sem menu
  (página de um objetivo só), bloco de compra, linha de segurança, barra fixa
  no celular, faixa de rascunho e rodapé curto.
*/

export function EbookNav({ right }: { right: React.ReactNode }) {
  return (
    <header className="nav">
      <span className="logo">C9.</span>
      <div className="nr">{right}</div>
    </header>
  );
}

export function DraftBanner({ ebook }: { ebook: Ebook }) {
  if (ebook.live) return null;
  return <p className="eb-draft">Rascunho: página fora do ar (noindex, sem eventos de compra no pixel).</p>;
}

export function SafetyLine() {
  return (
    <p className="eb-safe">
      Pix · PDF na hora · <b>7 dias para pedir o dinheiro de volta</b>
    </p>
  );
}

/* Preço + botão de compra. `more` é o botão secundário (só rola a página). */
export function BuyBlock({
  ebook,
  label,
  meta,
  placement,
  more,
  thumb = false,
}: {
  ebook: Ebook;
  label: string;
  meta: string;
  placement: string;
  more?: { href: string; text: string };
  thumb?: boolean;
}) {
  return (
    <div className="eb-buy">
      <div className="eb-row">
        {thumb && (
          <Image
            className="eb-thumb"
            src={ebook.cover.src}
            alt=""
            width={ebook.cover.width}
            height={ebook.cover.height}
            sizes="84px"
            priority
          />
        )}
        <p className="eb-price">
          <small>Pagamento único no Pix</small>
          <b>{ebook.priceLabel}</b>
          <span>{meta}</span>
        </p>
      </div>
      <div className="btns">
        <BuyTrigger placement={placement} className="b s">
          {label} <Arrow />
        </BuyTrigger>
        {more && (
          <a className="b g" href={more.href}>
            {more.text}
          </a>
        )}
      </div>
      <SafetyLine />
    </div>
  );
}

export function StickyBuy({ ebook, label }: { ebook: Ebook; label: string }) {
  return (
    <div className="eb-sticky">
      <p>
        <b>{ebook.priceLabel}</b>
        <span>Pix · PDF na hora</span>
      </p>
      <BuyTrigger placement="sticky" className="b s">
        {label}
      </BuyTrigger>
    </div>
  );
}

export function EbookFooter() {
  return (
    <footer className="eb-foot">
      <div className="w">
        <Link className="logo" href="/">
          C9<span>.</span>
        </Link>
        <nav aria-label="Documentos">
          <Link href="/termos">Termos de uso</Link>
          <Link href="/privacidade">Privacidade</Link>
        </nav>
        <p>
          Feito e vendido pela {LEGAL_NAME}, {LEGAL_ID}. Material de uso pessoal: proibida a revenda ou a distribuição.
        </p>
        <p>
          Preços e limites de ferramentas conferidos em novembro de 2026 e sujeitos a mudança. Lovable, Claude, Obsidian,
          Cloudflare, Vercel e Hostinger são marcas dos seus donos, que não patrocinam a série.
        </p>
      </div>
    </footer>
  );
}
