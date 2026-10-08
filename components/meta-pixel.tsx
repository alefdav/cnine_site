'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { META_PIXEL_ID, track } from '@/lib/meta-pixel';

/*
  O snippet base já manda o PageView do primeiro carregamento. O listener
  abaixo cobre só as navegações client-side do App Router, por isso pula a
  primeira execução.
*/
function RouteChangePageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const first = useRef(true);
  const query = searchParams.toString();

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    track('PageView');
  }, [pathname, query]);

  return null;
}

export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      <Suspense fallback={null}>
        <RouteChangePageView />
      </Suspense>
    </>
  );
}
