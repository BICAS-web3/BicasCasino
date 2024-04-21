import MainProvider from '@/components/providers/main.provider'
import './globals.css'

import { Nunito_Sans, Source_Sans_3 } from 'next/font/google'
import localFont from 'next/font/local'
import Head from 'next/head'
import { Metadata } from 'next'

const source_sans_3 = Source_Sans_3({
  subsets: ['cyrillic']
})

const nunito_sans = Nunito_Sans({
  subsets: ['cyrillic']
})

export const metadata: Metadata = {
  title: 'GreekKeepers: WEB 3.0 Crypto Games',
  description: 'GreekKeepers: WEB 3.0 Crypto Games',
  icons: {
    icon: "/images/marquee/draxma.png",
  },
}

function MainLayout({ children }) {
  return (
    <html suppressHydrationWarning suppressContentEditableWarning lang='en'>
      <body
        className={`${nunito_sans.className} ${source_sans_3.className} dark:bg-primary-dark`}
        suppressHydrationWarning
        suppressContentEditableWarning
      >
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  )
}

export default MainLayout
