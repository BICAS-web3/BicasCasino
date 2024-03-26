import '@fontsource/nunito-sans'
import './globals.css'

import MainProvider from '@/components/providers/main.provider'

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
