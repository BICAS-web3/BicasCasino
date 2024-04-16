import { use, useEffect, useState } from 'react'
import { useUnit } from 'effector-react'

import { Separator } from '@/components/ui/separator'
import { useSocket } from '@/components/providers/socket.provider'

import BalanceSwitcher from './components/balance.switch'
import Wallet from './components/wallet'
import Logo from './components/logo'
import User from './components/user'

import { GameModel, RegistrModel, UserModel } from '@/states'
import * as api from '@/api'
import { useSession } from 'next-auth/react'
import { UserType } from '@/states/user_model.store'

const Header = () => {
  const { data } = useSession()
  const [
    access_token,
    setUserInfo,
    socketAuth,
    setSocketAuth,
    setSocketLogged,
    socketReset,
    setGamesList,
    refresh_token,
    setAccessToken,
    setRefreshToken
  ] = useUnit([
    RegistrModel.$access_token,
    UserModel.setUserInfo,
    UserModel.$socketAuth,
    UserModel.setSocketAuth,
    UserModel.setSocketLogged,
    UserModel.$socketReset,
    GameModel.setGamesList,
    RegistrModel.$refresh_token,
    RegistrModel.setAccessToken,
    RegistrModel.setRefreshToken
  ])

  useEffect(() => {
    const userData = (data as any)?.token?.user
    if (userData?.access_token && userData?.refresh_token) {
      setAccessToken(userData.access_token)
      setRefreshToken(userData.refresh_token)
      console.log(111, data)
    }
  }, [data])
  useEffect(() => {
    if (access_token) {
      ;(async () => {
        const response = await api.getUserInfo({ bareer: access_token })
        if (response.status === 'OK') {
          setUserInfo((response as unknown as { body: UserType }).body)
        }
      })()
    }
  }, [access_token])

  const [errorSeed, setErrorSeed] = useState(false)

  // Server seed
  useEffect(() => {
    if (access_token) {
      ;(async () => {
        const response = await api.getServerSeed({ bareer: access_token })
        if (
          response.status === 'OK' &&
          (response.body as Record<string, string>)?.seed
        ) {
          setSeed(true)
        } else {
          setSeed(false)
          setErrorSeed(true)
        }
      })()
      ;(async () => {
        const response = await api.getClientSeed({ bareer: access_token })

        if (
          response.status === 'OK' &&
          (response.body as Record<string, string>)?.seed
        ) {
        } else {
          setErrorSeed(true)
        }
      })()
    }
  }, [access_token, errorSeed])

  const seed_data = {
    type: 'NewClientSeed',
    seed:
      Math.random() +
      'Insane 1wereesawesewrsjvhgvhhvvhewrreewrdefwrefdsewrwsswqerewreesdfedr0wereewrwr0%rawefewerretwrreewrewrtedsf ewedswin seed'
  }

  const [seeds, setSeed] = useState<boolean | null>(null)
  const socket = useSocket()

  useEffect(() => {
    if (access_token) {
      if (socket) {
        if (socket!.readyState === 1) {
          socket!.send(JSON.stringify({ type: 'GetUuid' }))
          socket!.send(JSON.stringify({ type: 'Auth', token: access_token }))
          setSocketAuth(true)
          setErrorSeed(false)
          setSocketLogged(true)
          socket!.send(JSON.stringify(seed_data))
        }
      }
    }
  }, [socket, access_token, WebSocket, socketAuth, seed_data])

  useEffect(() => {
    if (
      seeds === false &&
      seeds !== null &&
      socket &&
      socket.readyState === WebSocket.OPEN
    ) {
      socket.send(JSON.stringify({ type: 'NewServerSeed' }))
    }
  }, [seeds, socket?.readyState, socketReset])

  useEffect(() => {
    ;(async () => {
      if (access_token) {
        const data = await api.getGames({ bareer: access_token })
        if (data.status === 'OK') {
          setGamesList((data.body as any).games)
        }
      }
    })()
  }, [access_token])

  // const [otToken, setOtToken] = useState<any | undefined>()

  useEffect(() => {
    ;(async () => {
      if (access_token) {
        const response = await api.getOneTimeToken({ bareer: access_token })
        if (response.status === 'OK') {
          // setOtToken((response as any).body)
        }
      }
    })()
  }, [access_token])
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await api.refreshToken({
        bareer: access_token,
        refresh_token: refresh_token
      })
      if (response.status === 'OK') {
        const token = response.body
      }
    }, 10 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [refresh_token])

  return (
    <header className='flex justify-between items-center px-3 sm:px-5 py-3 box-border sticky max-h-14 sm:max-h-16 top-0 z-[50] w-full bg-black'>
      <Logo />
      <div className='flex items-center gap-2 sm:gap-4'>
        <BalanceSwitcher />
        <Wallet />
        <Separator orientation='vertical' className='min-h-10 inline' />
        <User />
      </div>
    </header>
  )
}

export default Header
