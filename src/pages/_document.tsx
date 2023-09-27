import { SettingsInit } from '@/widgets/SettingsInit';
import { Head, Html, Main, NextScript } from 'next/document';
// TODO: fix meta - delete meta tag from <Head />  #24 @habdevs
export default function Document() {
    return (
        <Html lang='en'>
            <Head >
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}