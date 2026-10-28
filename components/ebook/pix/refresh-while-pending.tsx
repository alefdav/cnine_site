'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/* Pix ainda não confirmado na página de obrigado: confere de novo a cada 5 s. */
export function RefreshWhilePending() {
  const router = useRouter();
  useEffect(() => {
    const timer = window.setInterval(() => router.refresh(), 5000);
    return () => window.clearInterval(timer);
  }, [router]);
  return null;
}
