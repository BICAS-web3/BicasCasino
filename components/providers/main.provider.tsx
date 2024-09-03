'use client'

import { SocketProvider } from '@/components/providers/socket.provider'
import { ThemeProvider } from '@/components/providers/theme.provider'

import Header from '@/components/custom/header'

import Sidebar from '@/components/custom/sidebar'

import ModalProvider from './modal.provider'
import StoreProvider from './store.provider'
// import './i18n'

import '@/i18n'

import { Suspense, useLayoutEffect, useState } from 'react'

import { Toaster } from '@/components/ui/sonner'
import Preload from '@/components/custom/preload'
import { useUnit } from 'effector-react'
import { ChatM, SidebarModel } from '@/states'
import { Chat } from '../custom/chat/Chat'
import { MainWrap } from '../MainWrap'

type Props = {
  children: React.ReactNode
}
const MainProvider = ({ children }: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  useLayoutEffect(() => {
    setLoaded(true)
  }, [])

  const [open] = useUnit([SidebarModel.$open])

  return (
    <Suspense fallback={<Preload />}>
      <StoreProvider>
        <SocketProvider>
          <ThemeProvider attribute='class' defaultTheme='system'>
            {!loaded ? (
              <Preload />
            ) : (
              <main className='min-h-screen flex flex-col relative '>
                <Header />
                <div
                  className={`flex flex-col-reverse sm:flex-row flex-nowrap relative flex-[1_1_auto]`}
                >
                  <Chat />
                  <Sidebar />
                  <div
                    className={`w-auto flex-1 flex justify-between flex-col overflow-hidden ${
                      !open && 'tbbs:ml-[90px] mmd:ml-0'
                    }`}
                  >
                    {children}
                  </div>
                </div>
                <Toaster position='top-right' duration={2000} />
              </main>
            )}
            <ModalProvider />
          </ThemeProvider>
        </SocketProvider>
      </StoreProvider>
    </Suspense>
  )
}

export default MainProvider
