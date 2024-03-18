import { SettingsInit } from "@/widgets/SettingsInit";
import { Head, Html, Main, NextScript } from "next/document";
import { useEffect } from "react";
// TODO: fix meta - delete meta tag from <Head />  #24 @habdevs
const preloadModel = async () => {
  await import("@/widgets/Dice/DiceModel");
};

export default function Document() {
  useEffect(() => {
    preloadModel();
  }, []);
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192.webp"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512.webp"
        />
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/Apple180.webp" /> */}
        <link rel="apple-touch-icon" sizes="180x180" href="/Apple180.webp" />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="16x16"
          href="/favicon16.ico"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="32x32"
          href="/favicon32.ico"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="48x48"
          href="/favicon48.ico"
        />{" "}
        {/* <link rel="icon" href="/favicon.ico" type="image/x-icon" /> */}
        {/* <noscript>
          <img
            height="1"
            width="1"
            src="https://www.facebook.com/tr?id=1797283080715437&ev=PageView
                &noscript=1"
          />
        </noscript> */}
        {/* <!-- End Facebook Pixel Code --> */}
        <meta
          name="description"
          content="WEB3 decentralised gaming platform"
          key="desc"
        />
        <meta property="og:title" content="WEB3 Gaming Platform" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://game.greekkeepers.io/" />
        <meta
          property="og:description"
          content="Greek Keepers is a WEB3 fully decentralised gaming platform"
        />
        <meta
          property="og:image"
          content="https://game.greekkeepers.io/static/media/SEOBanners/main.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="game.greekkeepers.io" />
        <meta property="twitter:url" content="https://game.greekkeepers.io" />
        <meta name="twitter:title" content="WEB3 Gaming Platform" />
        <meta
          name="twitter:description"
          content="Greek Keepers is a WEB3 fully decentralised gaming platform"
        />
        <meta
          name="twitter:image"
          content="https://game.greekkeepers.io/static/media/SEOBanners/main.webp"
        />
        <noscript>
          <img
            src="https://mc.yandex.ru/watch/95845285"
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
            height="1"
            width="1"
          />
        </noscript>
      </Head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NDJSCGDF"height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          }}
        />
        <Main />
        <NextScript />
        <script
          src="https://dev.p2way.fyi/widget/getWidgetFile?file=index.js"
          defer
        ></script>
      </body>
    </Html>
  );
}
