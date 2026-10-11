import { NextResponse, type NextRequest } from 'next/server';

/*
  Teste A/B do título da primeira tela do ebook: sorteia "dor" ou "solucao"
  na primeira visita, guarda num cookie por 30 dias (a pessoa sempre vê o
  mesmo título) e repassa à página como ?h=. Um ?h= já na URL vence o sorteio,
  para conferir cada versão.
*/
const COOKIE = 'lp_ebook_h';
const HEADLINES = ['dor', 'solucao'];

export function proxy(request: NextRequest) {
  if (HEADLINES.includes(request.nextUrl.searchParams.get('h') ?? '')) return NextResponse.next();

  const saved = request.cookies.get(COOKIE)?.value;
  const headline = saved && HEADLINES.includes(saved) ? saved : HEADLINES[Math.random() < 0.5 ? 0 : 1];

  const target = request.nextUrl.clone();
  target.searchParams.set('h', headline);
  const response = NextResponse.rewrite(target);
  if (headline !== saved) {
    response.cookies.set(COOKIE, headline, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/claude-no-adm-logistico',
      sameSite: 'lax',
    });
  }
  return response;
}

export const config = { matcher: '/claude-no-adm-logistico' };
