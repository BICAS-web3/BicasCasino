import { EffectorNext } from "@effector/next";
import type { AppProps } from "next/app";
import { Fonts } from "@/shared/fonts";
import "@/shared/styles/index.scss";
import Script from "next/script";
import * as fbq from '../shared/tools/index';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
            fbq('init', '326275033324451');
            fbq('init', '1482796345845307');
            fbq('track', 'PageView');
          `,
        }}
      />

      <EffectorNext values={pageProps?.values}>
        <Fonts />
        <Component {...pageProps} />
      </EffectorNext>
    </>

  );
}
