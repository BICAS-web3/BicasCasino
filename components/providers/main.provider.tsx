'use client'

import { ThemeProvider } from './theme.provider'

import { SocketProvider } from '@/components/providers/socket.provider'

import Header from '@/components/custom/header'
import Sidebar from '../custom/sidebar'
import Footer from '@/components/custom/footer'

type Props = {
  children: React.ReactNode
}

const MainProvider = ({ children }: Props) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system'>
      <SocketProvider>
        <main className='min-h-screen flex flex-col relative'>
          <Header />
          <div className='flex flex-nowrap'>
            <Sidebar />
            <div className='flex-1 flex justify-between flex-col min-h-screen'>
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
