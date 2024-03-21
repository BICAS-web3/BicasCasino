import { Montserrat } from 'next/font/google'
import './globals.css'
import { EffectorNext } from '@effector/next'
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
        <EffectorNext values={pageProps?.values}>
          <Fonts />
          <SocketProvider>
            {' '}
            <MainProvider>{children}</MainProvider>
          </SocketProvider>
        </EffectorNext>
      </body>
    </html>
  )
}

export default MainLayout
