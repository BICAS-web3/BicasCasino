import { useSession } from 'next-auth/react'

import { Separator } from '@/components/ui/separator'

import BalanceSwitcher from './components/balance.switch'
import Wallet from './components/wallet'
import Logo from './components/logo'
import User from './components/user'
import { useEffect, useState } from 'react'

import * as api from '@/api'
import { useSocket } from '@/components/providers/socket.provider'
import { useUnit } from 'effector-react'
import { GameModel, RegistrModel, UserModel } from '@/states'
import { setRefreshToken } from '@/states/registration_model.store'
const Header = () => {
  const [
    access_token,
    setUserInfo,
    socketAuth,
    setSocketAuth,
    setSocketLogged,
    socketReset,
    setGamesList,
    refresh_token
  ] = useUnit([
    RegistrModel.$access_token,
    UserModel.setUserInfo,
    UserModel.$socketAuth,
    UserModel.setSocketAuth,
    UserModel.setSocketLogged,
    UserModel.$socketReset,
    GameModel.setGamesList,
    RegistrModel.$refresh_token
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
  const sessionData = useSession()
  console.log('session data:', sessionData.data)

  useEffect(() => {
    ;(async () => {
      if (refresh_token) {
        const response = await api.refreshToken({
          bareer: access_token,
          refresh_token: refresh_token
        })
        if (response.status === 'OK') {
          const token = response.body
        }
        // setRefreshToken(newRefreshToketn.)
      }
    })()
  }, [refresh_token])

  // useEffect(() => alert(`${refresh_token}`), [])
  return (
    <header className='flex justify-between items-center px-5 py-3 box-border sticky min-h-max top-0 z-[50] w-full bg-black'>
      <Logo />
      <div className='flex items-center gap-4'>
        <BalanceSwitcher />
        <Wallet />
        <Separator orientation='vertical' className='min-h-10' />
        <User />
      </div>
    </header>
  )
}

export default Header
