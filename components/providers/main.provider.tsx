'use client'

import { ThemeProvider } from './theme.provider'

import { SocketProvider } from '@/components/providers/socket.provider'

import Header from '@/components/custom/header'
import Sidebar from '@/components/custom/Sidebar'
import Footer from '@/components/custom/footer'

type Props = {
  children: React.ReactNode
}

const MainProvider = ({ children }: Props) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system'>
      <SocketProvider>
        <main className='min-h-screen'>
          <Header />
          <div className='flex'>
            <Sidebar />
            <div className='w-full flex justify-between flex-col min-h-screen'>
              <div>{children}</div>
              <Footer />
            </div>
          </div>
        </main>
      </SocketProvider>
    </ThemeProvider>
  )
}

export default MainProvider
