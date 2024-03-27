import { FC, useEffect, useState } from 'react'
import { useUnit } from 'effector-react'

import arr from '@/public/registration/arr.png'

import { RegistrM } from '@/states'

// import * as api from '@/shared/api'
import { EyeClose, EyeOpen } from '@/src/shared/SVGs'

import clsx from 'clsx'

interface SignupProps {}

export const Signup: FC<SignupProps> = () => {
  const [inPorgress, setInProgress] = useState(false)

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

  const [ageCheckbox, setAgeCheckbox] = useState(true)
  const [policyCheckbox, setPolicyCheckbox] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState(false)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [startRegister, setStartRegister] = useState(false)

  const [userExist, setUserExist] = useState(false)

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false)
      }, 1500)
    }
  }, [error])

  // useEffect(() => {
  //   if (startRegister) {
  //     if (ageCheckbox && policyCheckbox && name && password) {
  //       ;(async () => {
  //         setInProgress(true)
  //         const data = await api.registerUser({
  //           username: name,
  //           password: password
  //         })
  //         if (data?.status === 'OK') {
  //           const dataObj = await api.loginUser({
  //             login: name,
  //             password: password
  //           })
  //           if (dataObj?.status === 'OK') {
  //             console.log(dataObj)
  //             localStorage.setItem('auth', (dataObj.body as any).access_token)
  //             setAccessToken((dataObj.body as any).access_token)
  //             setRefreshToken((dataObj.body as any).refresh_token)
  //             setAuth(true)
  //             setName('')
  //             setPassword('')
  //           } else if (data?.status !== 'OK') {
  //             setInProgress(false)
  //             setAuth(false)
  //           }
  //         }
  //         if (data?.status !== 'OK') {
  //           setName('')
  //           setPassword('')
  //           setUserExist(true)
  //           setInProgress(false)
  //         }
  //       })()
  //     } else {
  //       setError(true)
  //       // setName("");
  //       // setPassword("");
  //     }
  //     setStartRegister(false)
  //   }
  // }, [startRegister])

  return (
    <div
      className='
        sm:mt-[20px] mt-[10px] flex flex-col justify-between
      '
    >
      <div
        className='
          flex flex-col gap-[10px] sm:gap[20px]
        '
      >
        <div
          className='
            flex flex-col gap-[4px] sm:gap-[5px]
          '
        >
          <span
            // className={clsx(
            //   s.input_item_title,
            //   error && !name && s.input_item_title_err
            // )}
            className={`
              text-[14px] sm:text-[13px] font-normal leading-[22px] tracking-def
              text-left text-bets-title-color 
              ${error && !name ? 'text-[red]' : ''}
            `}
          >
            Username
          </span>
          <input
            value={name}
            onChange={el => {
              setName(el.target.value)
              setUserExist(false)
            }}
            type='text'
            // className={clsx(s.input, error && !name && s.input_err)}
            className={`
              bg-[#121212] rounded-[8px] p-[7.5px_10px] sm:p-[15px_20px] text-white text-[13px]
              sm:text-[16px] font-normal h-[42px] leading-[22px] tracking-def text-left
              ${error && !name ? 'border border-[red]' : ''}
            `}
          />
        </div>
        <div className='relative flex flex-col gap-[4px] sm:gap-[5px]'>
          <span
            className={`
            text-[14px] sm:text-[13px] font-normal leading-[22px] tracking-def
            text-left text-bets-title-color 
            ${error && !password ? 'text-[red]' : ''}
          `}
          >
            Password
          </span>
          <input
            value={password}
            onChange={el => setPassword(el.target.value)}
            type={showPassword ? 'text' : 'password'}
            className={`
              bg-[#121212] rounded-[8px] p-[7.5px_10px] sm:p-[15px_20px] text-white text-[13px]
              sm:text-[16px] font-normal h-[42px] leading-[22px] tracking-def text-left
              ${error && !name ? 'border border-[red]' : ''}
            `}
            placeholder={userExist ? 'User exist' : ''}
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
        <div
          className='
            cursor-pointer flex items-center gap-[20px]
          '
          onClick={() => setAgeCheckbox(!ageCheckbox)}
        >
          <div
            // className={clsx(
            //   s.checkbox,
            //   ageCheckbox && s.active_checkbox,
            //   error && !ageCheckbox && s.checkbox_err
            // )}
            className={`
              min-h-[14px] min-w-[14px] max-h-[14px] max-w-[14px]
              flex items-center justify-center border border-[#e5c787] rounded-[2px] bg-inherit
              transition-all duration-300
              ${error && !ageCheckbox ? '!border-[red]' : ''}
              ${
                ageCheckbox
                  ? 'shadow-[0px_0px_4px_0px_#d18b34] bg-[#c4a562]'
                  : ''
              }
            `}
          >
            <img
              src={arr.src}
              className={`
              opacity-0 invisible transition-all duration-300
              ${ageCheckbox ? 'opacity-100 !visible' : ''}
            `}
              alt='arr-ico'
            />
          </div>
          <p
            className='
            text-[12px] font-normal leading-[16px] tracking-def
            text-bets-title-color 
          '
          >
            I am at least 18 years old and not a resident of the restricted
            states.
          </p>
        </div>
        <div
          className='
          cursor-pointer flex items-center gap-[20px]
        '
          onClick={() => setPolicyCheckbox(!policyCheckbox)}
        >
          <div
            // className={clsx(
            //   s.checkbox,
            //   policyCheckbox && s.active_checkbox,
            //   error && !policyCheckbox && s.checkbox_err
            // )}
            className={`
            min-h-[14px] min-w-[14px] max-h-[14px] max-w-[14px]
            flex items-center justify-center border border-[#e5c787] rounded-[2px] bg-inherit
            transition-all duration-300
            ${error && !policyCheckbox ? '!border-[red]' : ''}
            ${
              policyCheckbox
                ? 'shadow-[0px_0px_4px_0px_#d18b34] bg-[#c4a562]'
                : ''
            }
          `}
          >
            <img
              src={arr.src}
              className={`
            opacity-0 invisible transition-all duration-300
            ${policyCheckbox ? 'opacity-100 !visible' : ''}`}
              alt='arr-ico'
            />
          </div>
          <p
            className='
            text-[12px] font-normal leading-[16px] tracking-def
            text-bets-title-color 
          '
          >
            I accept the GreekKeepers <span>Terms of Use</span> and
            <span className='text-orange'> Privacy Policy.</span>
          </p>
        </div>
        <button
          onClick={() => setStartRegister(true)}
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
          {inPorgress ? 'In process' : 'Sign Up'}
        </button>
        <div className='flex items-center'>
          <span
            className='
              text-[13px] font-normal text-bets-title-color leading-[17px]
              tracking-def
            '
          >
            Already have an account?
          </span>
          <span
            className='
              cursor-pointer text-orange text-[16px] font-semibold leading-[22px] tracking-def mb-[3px]
            '
            onClick={() => setIsSignup('in')}
          >
            &nbsp; Sign in
          </span>
        </div>
      </div>
    </div>
  )
}
