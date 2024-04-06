'use client'

import { ThemeProvider } from './theme.provider'

import { SocketProvider } from '@/components/providers/socket.provider'

import Footer from '@/components/custom/footer'
import Header from '@/components/custom/header'

import Sidebar from '@/components/custom/sidebar/index'

import ModalProvider from './modal.provider'
import StoreProvider from './store.provider'

import { Nunito_Sans, Source_Sans_3 } from 'next/font/google'
import localFont from 'next/font/local'
import { useEffect, useState } from 'react'

import * as api from '@/api'
import { useSocket } from '@/components/providers/socket.provider'
import { useUnit } from 'effector-react'
import { GameModel, RegistrModel, UserModel } from '@/states'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/components/ui/sonner'

type Props = {
  children: React.ReactNode
}
const MainProvider = ({ children }: Props) => {
  return (
    <StoreProvider>
      <SocketProvider>
        <ThemeProvider attribute='class' defaultTheme='system'>
          <SessionProvider>
            <main className='min-h-screen flex flex-col relative '>
              <Header />
              <div className='flex flex-nowrap relative'>
                <Sidebar />
                <div className='w-auto flex-1 flex justify-between flex-col min-h-screen overflow-hidden'>
                  {children}
                  <Footer />
                </div>
              </div>
              <Toaster />
            </main>
            <ModalProvider />
          </SessionProvider>
        </ThemeProvider>
      </SocketProvider>
    </StoreProvider>
  )
}

export default MainProvider
