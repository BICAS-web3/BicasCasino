'use client'

import { ThemeProvider } from './theme.provider'

import { SocketProvider } from '@/components/providers/socket.provider'

import Header from '@/components/custom/Header'
import Sidebar from '@/components/custom/Sidebar'
import Footer from '@/components/custom/Footer'

type Props = {
  children: React.ReactNode
}

const MainProvider = ({ children }: Props) => {
  return (
    <SocketProvider>
      <ThemeProvider attribute='class' defaultTheme='system'>
        <main className='min-h-screen'>
          <Header />
          <div className='flex'>
            <Sidebar />
            <div className='w-full'>
              <div>{children}</div>
              <Footer />
            </div>
          </div>
        </main>
      </ThemeProvider>
    </SocketProvider>
  )
}

export default MainProvider
