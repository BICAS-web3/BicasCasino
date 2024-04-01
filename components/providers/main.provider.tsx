'use client'

import { ThemeProvider } from './theme.provider'

import { SocketProvider } from '@/components/providers/socket.provider'

import Footer from '@/components/custom/footer'
import Header from '@/components/custom/header'

import Sidebar from '@/components/custom/sidebar/index'
import ModalProvider from './modal.provider'
import StoreProvider from './store.provider'

type Props = {
  children: React.ReactNode
}
const MainProvider = ({ children }: Props) => {
  return (
    <StoreProvider>
      <ThemeProvider attribute='class' defaultTheme='system'>
        <SocketProvider>
          <main className='min-h-screen flex flex-col relative '>
            <Header />
            <div className='flex flex-nowrap relative'>
              <Sidebar />
              <div className='w-auto flex-1 flex justify-between flex-col min-h-screen overflow-hidden'>
                {children}
                <Footer />
              </div>
            </div>
          </main>
          <ModalProvider />
        </SocketProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default MainProvider
