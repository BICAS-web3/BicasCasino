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

type Props = {
  children: React.ReactNode
}
const MainProvider = ({ children }: Props) => {
  const [
    access_token,
    setUserInfo,
    socketAuth,
    setSocketAuth,
    setSocketLogged,
    socketReset,
    setGamesList
  ] = useUnit([
    RegistrModel.$access_token,
    UserModel.setUserInfo,
    UserModel.$socketAuth,
    UserModel.setSocketAuth,
    UserModel.setSocketLogged,
    UserModel.$socketReset,
    GameModel.setGamesList
  ])
  useEffect(() => {
    if (access_token) {
      ;(async () => {
        const response = await api.getUserInfo({ bareer: access_token })
        if (response.status === 'OK') {
          setUserInfo((response as any).body)
          console.log('2user info', response.body)
        } else {
          console.log('err', response.body)
        }
      })()
    }
  }, [access_token])

  const [errorSeed, setErrorSeed] = useState(false)

  useEffect(() => {
    if (access_token) {
      ;(async () => {
        const response = await api.getServerSeed({ bareer: access_token })
        console.log('server seed', response)
        if (response.status === 'OK' && (response.body as any)?.seed) {
          setSeed(true)
        } else {
          setSeed(false)
          setErrorSeed(true)
        }
      })()
      ;(async () => {
        const response = await api.getClientSeed({ bareer: access_token })
        console.log('client seed', response)
        if (response.status === 'OK' && (response.body as any)?.seed) {
          // setSeed((prev) => [...prev, response]);
        } else {
          setErrorSeed(true)
        }
      })()
    }
  }, [access_token, errorSeed])

  const server_seed = { type: 'NewServerSeed' }
  const data = { type: 'Auth', token: access_token }

  const seed_data = {
    type: 'NewClientSeed',
    seed:
      Math.random() +
      'Insane 1wereesawesewrsjvhgvhhvvhewrreewrdefwrefdsewrwsswqerewreesdfedr0wereewrwr0%rawefewerretwrreewrewrtedsf ewedswin seed'
  }

  const [seeds, setSeed] = useState<boolean | null>(null)
  const socket = useSocket()

  //?-----------------------------------------------------------------------------
  useEffect(() => {
    if (
      // (!seeds || errorSeed) &&
      socket &&
      socket.readyState === WebSocket.OPEN &&
      !socketAuth
    ) {
      socket.send(JSON.stringify({ type: 'GetUuid' }))
      if (access_token) {
        socket.send(JSON.stringify(data))
        setSocketAuth(true)
        setErrorSeed(false)
        setSocketLogged(true)
        socket.send(JSON.stringify(seed_data))
      }
    }
  }, [
    socket,
    access_token,
    // socket?.readyState,
    seeds,
    errorSeed,
    socket?.OPEN,
    socketAuth
  ])

  // useEffect(() => {
  //   if (socket && socket.readyState === WebSocket.OPEN) {
  //     socket.send(JSON.stringify(data));
  //     socket.send(JSON.stringify(seed_data));
  //   }
  // }, [socketReset]);
  // useEffect(() => alert(socketReset), [socketReset]);

  //!-----------------------------------------------------------------------------

  useEffect(() => {
    if (
      seeds === false &&
      seeds !== null &&
      socket &&
      socket.readyState === WebSocket.OPEN
    ) {
      socket.send(JSON.stringify(server_seed))
    }
  }, [seeds, socket?.readyState, socketReset])

  useEffect(() => {
    // alert(5)
    // alert(JSON.stringify(socket))
    if (socket && socket.readyState === WebSocket.OPEN) {
      // alert(5)
    }
  }, [seeds, socket?.readyState, socketReset])

  //?-----------------------------------------------------------------------------

  useEffect(() => {
    ;(async () => {
      if (access_token) {
        const data = await api.getGames({ bareer: access_token })
        if (data.status === 'OK') {
          setGamesList((data.body as any).games)
          console.log(data.body)
        }
      }
    })()
  }, [access_token])

  const [otToken, setOtToken] = useState<any | undefined>()

  useEffect(() => {
    ;(async () => {
      if (access_token) {
        const response = await api.getOneTimeToken({ bareer: access_token })
        if (response.status === 'OK') {
          setOtToken((response as any).body)
          console.log('ONE TIME TOKEN---', response.body)
        } else {
          console.log('ONE TIME TOKEN ERROR', response.body)
        }
      }
    })()
  }, [access_token])
  return (
    <StoreProvider>
      <ThemeProvider attribute='class' defaultTheme='system'>
        <SessionProvider>
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
        </SessionProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default MainProvider
