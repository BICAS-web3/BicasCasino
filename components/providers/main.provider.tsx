'use client'

import { ThemeProvider } from './theme.provider'

import { SocketProvider } from '@/components/providers/socket.provider'

import Header from '@/components/custom/header'
import Sidebar from '@/components/custom/Sidebar'
import { Footer } from '@/components/custom/Footer/Footer'

type Props = {
  children: React.ReactNode
}

const MainProvider = ({ children }: Props) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system'>
      <SocketProvider>
        <main className='min-h-screen flex flex-col '>
          {/* <Header /> */}
          <div className='flex flex-1'>
            <Sidebar />
            <div className=' w-full'>
              <div>{children}</div>
            </div>
          </div>
          <Footer />
        </main>
      </SocketProvider>
    </ThemeProvider>
  )
}

export default MainProvider
