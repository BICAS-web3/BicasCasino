'use client'
import { Montserrat } from 'next/font/google'
import './globals.css'

import MainProvider from '@/components/providers/main.provider'

const montserrat = Montserrat({ subsets: ['latin'] })

function MainLayout({ children }) {
  return (
    <html suppressHydrationWarning suppressContentEditableWarning lang='en'>
      <body
        className={`${montserrat.className} dark:bg-primary-dark`}
        suppressHydrationWarning
        suppressContentEditableWarning
      >
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  )
}

export default MainLayout
