import '@fontsource/nunito-sans'
import './globals.css'
import { EffectorNext } from '@effector/next'
import MainProvider from '@/components/providers/main.provider'
import { Fonts } from '@/src/shared/fonts'
import { SocketProvider } from '@/components/providers/socket.provider'
import { Payment } from '@/components/custom/Payment/Payment'

// const nunitoSans = NunitoSans({ subsets: ['latin'] })

function MainLayout({ children }) {
  return (
    <html suppressHydrationWarning suppressContentEditableWarning lang='en'>
      <body
        className={`dark:bg-primary-dark`}
        suppressHydrationWarning
        suppressContentEditableWarning
      >
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  )
}

export default MainLayout
