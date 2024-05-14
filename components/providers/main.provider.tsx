'use client'

import { SocketProvider } from '@/components/providers/socket.provider'
import { ThemeProvider } from '@/components/providers/theme.provider'

import Header from '@/components/custom/header'

import Sidebar from '@/components/custom/sidebar'

import ModalProvider from './modal.provider'
import StoreProvider from './store.provider'

import { useLayoutEffect, useState } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from 'next-auth/react'
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

  const [open, chatVisibility] = useUnit([SidebarModel.$open, ChatM.$chatVisibility])

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
                <div
                  className={`flex flex-col sm:flex-row flex-nowrap relative`}
                >
                  <Chat />
                  <Sidebar />
                  <MainWrap>
                    {children}
                  </MainWrap>
                </div>
                <Toaster position='top-right' />
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
