'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { confetti } from './teste/boosters';

/* Caixa com o texto de um pedido do guia e botão para copiar. `celebrate` solta confete (variantes de teste). */
export function CopyBox({ text, celebrate }: { text: string; celebrate?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (celebrate) confetti({ x: clientX, y: clientY });
      window.setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-background">
      <pre className="overflow-x-auto whitespace-pre-wrap px-5 pt-5 pb-4 font-mono text-[14.5px] leading-relaxed text-ink">
        {text}
      </pre>
      <div className="border-t border-line px-3 py-3">
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-tint text-[15px] font-bold text-primary transition-colors hover:bg-primary hover:text-background"
        >
          {copied ? <Check size={18} strokeWidth={2} aria-hidden /> : <Copy size={18} strokeWidth={1.75} aria-hidden />}
          <span aria-live="polite">{copied ? 'Pedido copiado' : 'Copiar o pedido'}</span>
        </button>
      </div>
    </div>
  );
}
