import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'

import { Separator } from '@/components/ui/separator'
import { useSocket } from '@/components/providers/socket.provider'

import BalanceSwitcher from './components/balance.switch'
import Wallet from './components/wallet'
import Logo from './components/logo'
import User from './components/user'

import { ChatM, GameModel, RegistrModel, SidebarModel, UserModel } from '@/states'
import * as api from '@/api'
import { UserType } from '@/states/user_model.store'
import { usePathname, useRouter } from 'next/navigation'

const Header = () => {
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

  const route = useRouter()
  const location = usePathname()

  useEffect(() => {
    const access_token = localStorage.getItem('access')
    const refresh_token = localStorage.getItem('refresh')
    if (access_token) {
      setAccessToken(access_token)
      refresh_token && setRefreshToken(refresh_token)
      if (location.includes('auth')) {
        route.push('/')
      }
    } else {
      // if (!location.includes('auth')) {
      //   route.push('/auth/registration')
      // }
    }
  }, [location])
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

  const data = { type: 'Auth', token: access_token }

  useEffect(() => {
    if (socket) {
      const handleOpen = () => {
        console.log('WebSocket connected')
        socket.send(JSON.stringify({ type: 'GetUuid' }))
        if (access_token) {
          socket.send(JSON.stringify(data))
          setSocketAuth(true)
          setErrorSeed(false)
          setSocketLogged(true)
          socket.send(JSON.stringify(seed_data))
        }
      }

      socket.addEventListener('open', handleOpen)

      return () => {
        socket.removeEventListener('open', handleOpen)
      }
    }
  }, [socket, access_token])

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

  const [opened, setChat, chat] = useUnit([SidebarModel.$open, ChatM.setChatVisibility, ChatM.$chatVisibility])

  const handleChatClick = () => {

    setChat(!chat)
  }

  useEffect(() => {
    const content = document.getElementById('mainContent')
    
    // if(chat) {
    //   content?.classList.add('contentWidth')
    // } else if (chat && opened) {
    //   content?.classList.add('contentWidth')
    //   content?.classList.add('contentWidthClosed')
    // } else {
    //   content?.classList.remove('contentWidth')
    // }

  }, [chat])

  return (
    <header
      className={`flex justify-between border-b-[1px] border-[#252525] items-centers h-[60px] ${
        !opened ? 'px-3 sm:!pr-10' : 'px-3'
      } sm:px-5 py-3 box-border sticky max-h-14 sm:max-h-16 top-0 z-[55] w-full bg-[#0F0F0F]`}
    >
      <Logo />
      <div className='flex items-center gap-2 sm:gap-4'>
        <div onClick={handleChatClick}>chat</div>
        <BalanceSwitcher />
        <Wallet />
        <Separator orientation='vertical' className='min-h-10 inline' />
        <User />
      </div>
    </header>
  )
}

export default Header
// useEffect(() => {
//   // alert(JSON.stringify(socket))
//   if (
//     // (!seeds || errorSeed) &&
//     socket
//   ) {
//     socket.send(JSON.stringify({ type: 'GetUuid' }))
//     if (access_token) {
//       socket.send(JSON.stringify(data))
//       setSocketAuth(true)
//       setErrorSeed(false)
//       setSocketLogged(true)
//       socket.send(JSON.stringify(seed_data))
//     }
//   }
// }, [
//   socket,
//   access_token,
//   seeds,
//   errorSeed,
//   socket?.OPEN,
//   socketAuth,
//   WebSocket
// ])
// useEffect(() => {
//   if (access_token) {
//     if (socket) {
//       if (socket.readyState === 1) {
//         socket.send(JSON.stringify({ type: 'GetUuid' }))
//         socket.send(JSON.stringify({ type: 'Auth', token: access_token }))
//         setSocketAuth(true)
//         setErrorSeed(false)
//         setSocketLogged(true)
//         socket.send(JSON.stringify(seed_data))
//       }
//     }
//   }
// }, [socket, access_token, WebSocket, socketAuth, seed_data])
