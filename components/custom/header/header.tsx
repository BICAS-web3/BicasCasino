import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'

import { Separator } from '@/components/ui/separator'
import { useSocket } from '@/components/providers/socket.provider'

import BalanceSwitcher from './components/balance.switch'
import Wallet from './components/wallet'
import Logo from './components/logo'
import User from './components/user'

import { GameModel, RegistrModel, SidebarModel, UserModel } from '@/states'
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
  const [number, setNumber] = useState(1)
  const [redirect, setRedirect] = useState<null | {
    address: string
    amount: string
    city: string
    country: string
    cpf: null
    currency: string
    custom: string
    email: string
    first_name: string
    ip: string
    item_name: string
    lang: string
    last_name: string
    merchant: string
    order: string
    payment_url: string
    phone: string
    post_code: string
    region: string
    user_id: string
  }>(null)

  useEffect(() => {
    if (access_token) {
      ;(async () => {
        const data = await api.getTokensBilliane({
          address: '49 Featherstone Street',
          amount: '2',
          city: 'Luton',
          country: 'England',
          currency: 'USD',
          email: 'ewr@erfd.re',
          first_name: 'Ilya',
          last_name: 'LastName',
          phone: '+442071234567',
          post_code: '998',
          region: 'Slindon',
          bareer: access_token
        })
        if (data.status === 'OK') {
          setRedirect((data.body as any).data)
        }
        data && console.log(data)
      })()
    }
  }, [access_token])
  const paymentUrl = 'https://paycareforyou.com'
  useEffect(() => {
    if (redirect) {
      ;(async () => {
        await fetch(`https://paycareforyou.com/payment/form`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            merchant: 'BJXWKA6SNVN6L',
            order: redirect.order,
            amount: redirect.amount,
            currency: redirect.currency,
            item_name: redirect.item_name,
            first_name: redirect.first_name,
            last_name: redirect.last_name,
            user_id: redirect.user_id,
            payment_url: redirect.payment_url,
            country: redirect.country,
            ip: redirect.ip,
            custom: redirect.custom,
            email: redirect.email,
            phone: redirect.phone,
            address: redirect.address,
            city: redirect.city,
            post_code: redirect.post_code,
            region: redirect.region,
            lang: redirect.lang
          })
        })
      })()
    }
  }, [redirect, number])
  // const session = useSession()

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
      if (!location.includes('auth')) {
        route.push('/auth/registration')
      }
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

  // useEffect(() => {
  //   if ((session as any)?.error === 'RefreshAccessTokenError') {
  //     signIn()
  //   }
  // }, [session])

  const [opened] = useUnit([SidebarModel.$open])

  // useEffect(() => {
  //   ;(async () => {
  //     const data = await fetch('https://www.dextools.io/shared/exchanges', {
  //       method: 'GET'
  //     })
  //     data && alert(JSON.stringify(data))
  //   })()
  // }, [])

  return (
    <header
      onClick={() => setNumber(prev => prev + 1)}
      className={`flex justify-between border-b-[1px] border-[#252525] items-centers h-[60px] ${
        !opened ? 'px-3 sm:!pr-10' : 'px-3'
      } sm:px-5 py-3 box-border sticky max-h-14 sm:max-h-16 top-0 z-[50] w-full bg-[#0F0F0F]`}
    >
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
