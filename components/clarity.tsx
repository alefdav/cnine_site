import Script from 'next/script';

/*
  Microsoft Clarity (gravação de sessão e mapa de calor). O ID não é segredo;
  a env existe só para trocar de projeto sem mexer no código.
*/
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'yvk5l5kgm8';

/*
  `tags` viram filtros no painel do Clarity (ex.: test_variant=combo). Vão no
  mesmo snippet, logo depois do stub, para entrar na fila antes da tag carregar.
*/
export function Clarity({ tags }: { tags?: Record<string, string | undefined> }) {
  const sets = Object.entries(tags ?? {})
    .filter(([, value]) => value)
    .map(([key, value]) => `clarity("set",${JSON.stringify(key)},${JSON.stringify(value)});`)
    .join('');

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");${sets}`}
    </Script>
  );
}
