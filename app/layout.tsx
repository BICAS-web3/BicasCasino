'use client'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { EffectorNext } from '@effector/next'
import MainProvider from '@/components/providers/main.provider'
import { Fonts } from '@/src/shared/fonts'
import { SocketProvider } from '@/components/providers/socket.provider'
import { Payment } from '@/components/custom/Payment/Payment'

const montserrat = Montserrat({ subsets: ['latin'] })

function MainLayout({ children }) {
  return (
    <html suppressHydrationWarning suppressContentEditableWarning lang='en'>
      <body
        className={`${montserrat.className} dark:bg-primary-dark`}
        suppressHydrationWarning
        suppressContentEditableWarning
      >
        <Payment />
        <EffectorNext>
          <Fonts />
          <SocketProvider>
            <MainProvider>{children}</MainProvider>
          </SocketProvider>
        </EffectorNext>
      </body>
    </html>
  )
}

export default MainLayout
