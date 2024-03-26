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
        <main className='min-h-screen flex flex-col'>
          <Header />
          <div className='w-full flex px-4 sm:pl-[287px] pt-[100px] sm:pr-[30px] h-full flex-[1_1_auto]'>
            <Sidebar />
            <div className='w-full flex-[1_1_auto]'>
              {children}
              <Footer />
            </div>
          </div>
        </main>
      </SocketProvider>
    </ThemeProvider>
  )
}

export default MainProvider
