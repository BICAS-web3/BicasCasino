import { FC, useEffect, useState } from 'react'
import { useUnit } from 'effector-react'

import { RegistrM } from '@/states'

// import * as api from "@/shared/api";
import { EyeClose, EyeOpen } from '@/src/shared/SVGs'

import clsx from 'clsx'

interface SigninProps {}

export const Signin: FC<SigninProps> = () => {
  const [inPorgress, setInProgress] = useState(false)
  const [errorData, setErrorData] = useState(false)

  const [setIsSignup, setAuth, setAccessToken, setRefreshToken] = useUnit([
    RegistrM.setIsSignup,
    RegistrM.setAuth,
    RegistrM.setAccessToken,
    RegistrM.setRefreshToken
  ])

  useEffect(() => {
    const exist = localStorage.getItem('auth')
    if (exist) {
      setAccessToken(exist)
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [])

  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState(false)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [startLogin, setStartLogin] = useState(false)

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false)
      }, 1500)
    }
  }, [error])

  // useEffect(() => {
  //   if (startLogin) {
  //     if (name && password) {
  //       ;(async () => {
  //         setInProgress(true)
  //         const data = await api.loginUser({
  //           login: name,
  //           password: password
  //         })
  //         if (data?.status === 'OK') {
  //           console.log(data.body)
  //           setAccessToken((data.body as any).access_token)
  //           setRefreshToken((data.body as any).refresh_token)
  //           localStorage.setItem('auth', (data.body as any).access_token)
  //           setAuth(true)
  //           setName('')
  //           setPassword('')
  //         } else if ((data.body as any)?.status !== 'OK') {
  //           setAuth(false)
  //           console.log(data)
  //           if ((data.body as any)?.error === 'Wrong login or password') {
  //             setName('')
  //             setPassword('')
  //             setErrorData(true)
  //           }
  //           setInProgress(false)
  //         }
  //       })()
  //     } else {
  //       setError(true)
  //       setName('')
  //       setPassword('')
  //     }
  //     setStartLogin(false)
  //   }
  // }, [startLogin])

  return (
    <div
      className='
        flex flex-col gap-[10px] sm:gap-[20px] mt-[10px] sm:mt-[20px] 
      '
    >
      <div className='flex flex-col gap-[4px] sm:gap-[5px]'>
        <span
          className='text-[14px] sm:text-[13px] font-normal leading-[22px] tracking-def
          text-left text-bets-title-color '
        >
          Username
        </span>
        <input
          value={name}
          onChange={el => {
            setName(el.target.value)
            setErrorData(false)
          }}
          type='text'
          className={`
              bg-[#121212] rounded-[8px] p-[7.5px_10px] sm:p-[15px_20px] text-white text-[13px]
              sm:text-[16px] font-normal h-[42px] leading-[22px] tracking-def text-left
              ${error && !name ? 'border border-[red]' : ''}
              ${errorData ? 'border border-[red]' : ''}
            `}
          placeholder={errorData ? 'Wrong data' : ''}
        />
      </div>
      <div className='flex flex-col gap-[4px] sm:gap-[5px] relative'>
        <span
          className='text-[14px] sm:text-[13px] font-normal leading-[22px] tracking-def
          text-left text-bets-title-color '
        >
          Password
        </span>
        <input
          value={password}
          onChange={el => {
            setErrorData(false)
            setPassword(el.target.value)
          }}
          type={showPassword ? 'text' : 'password'}
          className={`
          bg-[#121212] rounded-[8px] p-[7.5px_10px] sm:p-[15px_20px] text-white text-[13px]
          sm:text-[16px] font-normal h-[42px] leading-[22px] tracking-def text-left
          ${error && !password ? 'border border-[red]' : ''}
          ${errorData ? 'border border-[red]' : ''}
        `}
        />
        {showPassword ? (
          <EyeOpen
            onClick={() => setShowPassword(prev => !prev)}
            className='
            absolute bottom-[10px] sm:bottom-[15px] sm:right-[15px] w-[18px] sm:w-[20px] cursor-pointer h-[18px] sm:h-[20px]
          '
          />
        ) : (
          <EyeClose
            onClick={() => setShowPassword(prev => !prev)}
            className='
            absolute bottom-[10px] sm:bottom-[15px] sm:right-[15px] w-[18px] sm:w-[20px] cursor-pointer h-[18px] sm:h-[20px]
          '
          />
        )}
      </div>
      <button
        onClick={() => setStartLogin(true)}
        className='
            text-[16px] h-[40px] border border-orange cursor-pointer flex
            justify-center items-center rounded-[8px] w-full text-orange
            font-bold leading-[16px] tracking-def text-center transition-all duration-300
            relative overflow-hidden after:transition-all after:opacity-0 after:duration-300
            after:invisible after:w-[40px] after:h-[40px] after:absolute after:bottom-[-20px]
            after:left-[50%] after:translate-x-[-50%] after:bg-[#ffb800] after:mix-blend-hard-light
            after:rounded-[100px] after:blur-[50px] hover:after:opacity-100 hover:after:visible
            active:after:blur-[45px] active:after:w-[50px] active:after:h-[50px]
          '
      >
        {inPorgress ? 'In process' : 'Sign In'}
      </button>
      <span
        className='
          cursor-pointer text-[16px] font-normal leading-[22px] tracking-def text-bets-title-color
          text-right
        '
        onClick={() => setIsSignup('recovery')}
      >
        Forgot Password?
      </span>
    </div>
  )
}
