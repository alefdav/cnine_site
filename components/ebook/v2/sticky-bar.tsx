import { BuyButton } from '../buy-button';

/*
  Barra de compra da v2: fixa no rodapé do celular desde o carregamento
  (o Clarity mostrou 88% sem rolar, então o preço e o botão nunca saem da tela).
*/
export function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-background px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="flex items-center gap-3">
        <p className="flex-none leading-tight">
          <span className="block text-[19px] font-extrabold tracking-tight text-ink">R$ 17,90</span>
          <span className="block text-[12.5px] text-muted">Pix · PDF na hora</span>
        </p>
        <BuyButton
          placement="sticky"
          className="buy-pulse flex h-12 flex-1 items-center justify-center rounded-full bg-primary text-base font-bold text-background [--pulse:var(--primary)] active:translate-y-px"
        >
          Quero o guia
        </BuyButton>
      </div>
    </div>
  );
}
