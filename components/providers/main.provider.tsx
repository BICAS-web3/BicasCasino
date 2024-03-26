'use client'

import { ThemeProvider } from './theme.provider'

import { SocketProvider } from '@/components/providers/socket.provider'

import Header from '@/components/custom/header'
import Footer from '@/components/custom/footer'

import Sidebar from '../custom/sidebar'

import { cn } from '@/lib/utils'
import { SidebarModel } from '@/states'
import { useUnit } from 'effector-react'

type Props = {
  children: React.ReactNode
}

const MainProvider = ({ children }: Props) => {
  const [open] = useUnit([SidebarModel.$open])
  return (
    <ThemeProvider attribute='class' defaultTheme='system'>
      <SocketProvider>
        <main className='min-h-screen flex flex-col relative '>
          <Header />
          <div className='flex flex-nowrap w-screen overflow-hidden relative '>
            <Sidebar />
            <div
              className={cn(
                'flex justify-between flex-col',
                'min-h-screen pt-5 w-full '
              )}
            >
              <div
                className={cn(
                  'flex flex-col max-w-[1562px] overflow-hidden mx-auto flex-[1_1_auto]',
                  open
                    ? 'w-[calc(100vw-330px)] xl:w-[calc(100vw-370px)]'
                    : 'w-[calc(100vw-163px)] xl:w-[calc(100vw-203px)]'
                )}
              >
                {children}
              </div>
              <Footer />
            </div>
          </div>
        </main>
      </SocketProvider>
    </ThemeProvider>
  )
}

export default MainProvider
