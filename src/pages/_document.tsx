import { SettingsInit } from '@/widgets/SettingsInit';
import { Head, Html, Main, NextScript } from 'next/document';
// TODO: fix meta - delete meta tag from <Head />  #24 @habdevs
export default function Document() {
    return (
        <Html lang='en'>
            <Head >
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <noscript>
                    <img height="1" width="1"
                        src="https://www.facebook.com/tr?id=1797283080715437&ev=PageView
                &noscript=1"/>
                </noscript>
                {/* <!-- End Facebook Pixel Code --> */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}