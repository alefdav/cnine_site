'use client';

import { useState } from 'react';
import { Icon } from '@/components/c9/icon';

/* Botão "copiar" do prompt de amostra: prova que o prompt é para usar, não só para ler. */
export function CopyPrompt({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {}
  }

  return (
    <button type="button" className="eb-copy" onClick={copy}>
      <Icon name={copied ? 'ok' : 'doc'} size={18} />
      <span aria-live="polite">{copied ? 'Prompt copiado' : 'Copiar o prompt'}</span>
      {!copied && <small>e testar agora</small>}
    </button>
  );
}
