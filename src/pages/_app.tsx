import { EffectorNext } from "@effector/next";
import type { AppProps } from "next/app";
import { Fonts } from "@/shared/fonts";
import "@/shared/styles/index.scss";
import Script from "next/script";
import * as fbq from '../shared/tools/index';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Script
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
      /> */}

      <Script
        id="google-pixel"
        dangerouslySetInnerHTML={{
          __html: `
          
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-BMHG0YHS5M');
          
          `
        }}
      />

      <Script
        id="google-tag"
        dangerouslySetInnerHTML={{
          __html: `
          
          (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NDJSCGDF');
          
          `
        }}
      />

      <Script
        id="yandex-tag"
        dangerouslySetInnerHTML={{
          __html: `
          
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(95845285, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
            });
          
          `
        }}
      />



      <EffectorNext values={pageProps?.values}>
        <Fonts />
        <Component {...pageProps} />
      </EffectorNext>
    </>

  );
}
