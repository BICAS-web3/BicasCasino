'use client'

import { SocketProvider } from '@/components/providers/socket.provider'
import { ThemeProvider } from '@/components/providers/theme.provider'

import Footer from '@/components/custom/footer'
import Header from '@/components/custom/header'

import Sidebar from '@/components/custom/sidebar'

import ModalProvider from './modal.provider'
import StoreProvider from './store.provider'

import { useLayoutEffect, useState } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from 'next-auth/react'
import Preload from '@/components/custom/preload'
import { Metadata } from 'next'




type Props = {
  children: React.ReactNode
}
const MainProvider = ({ children }: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  useLayoutEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <StoreProvider>
      <SocketProvider>
        <ThemeProvider attribute='class' defaultTheme='system'>
          <SessionProvider>
            {!loaded ? (
              <Preload />
            ) : (
              <main className='min-h-screen flex flex-col relative '>
                <Header />
                <div className='flex flex-col sm:flex-row flex-nowrap relative'>
                  <Sidebar />
                  <div className='w-auto tbb:pl-[90px] flex-1 flex justify-between flex-col min-h-screen overflow-hidden'>
                    {children}
                    <Footer />
                  </div>
                </div>
                <Toaster />
              </main>
            )}
            <ModalProvider />
          </SessionProvider>
        </ThemeProvider>
      </SocketProvider>
    </StoreProvider>
  )
}

export default MainProvider
