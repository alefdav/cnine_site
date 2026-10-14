'use client';

import type { ReactNode } from 'react';
import { track } from '@/lib/meta-pixel';

/*
  Link do grupo de Natal da C9. Achados. Quando lotar, troque aqui pelo link do
  grupo novo (ou por um redirecionador que mande sempre para o grupo com vaga).
*/
export const ACHADOS_GROUP_URL = 'https://chat.whatsapp.com/BfMbTkpbT4T8SjBzAaznb0';

/* Botão de entrada no grupo: marca Lead no pixel (com o botão de origem) e abre o WhatsApp. */
export function JoinButton({ children, className, placement }: { children: ReactNode; className?: string; placement: string }) {
  return (
    <a
      href={ACHADOS_GROUP_URL}
      onClick={() => track('Lead', { content_name: 'Grupo Achados de Natal', content_category: 'whatsapp_group', placement })}
      className={className}
    >
      {children}
    </a>
  );
}
