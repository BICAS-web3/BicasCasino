import { FC } from 'react'
import s from './styles.module.scss'
import Link from 'next/link'
import HeaderLogo from '@/public/brand_images/logoLeft.png'
import HeaderBrandText from '@/public/brand_images/HeaderBrandText.png'
import Image from 'next/image'
import bg from '@/public/registration/formBg.webp'
import { RegistrM } from '@/states'
import { useUnit } from 'effector-react'
import { Signup } from '../Signup/Signup'
import { Signin } from '../Signin/Signin'
import clsx from 'clsx'
import googleIco from '@/public/registration/googleIco.png'
import fbIco from '@/public/registration/fbIco.png'
import twitterIco from '@/public/registration/twitterIco.png'
import { PasswordRecovery } from '../PasswordRecovery/PasswordRecovery'

interface RegistrationProps {}

export const Registration: FC<RegistrationProps> = () => {
  const [isSignup, setIsSignup] = useUnit([
    RegistrM.$isSignup,
    RegistrM.setIsSignup
  ])

  return (
    <div
      className='
        z-[170] sm:z-[110] p-0 sm:p-[90px_0] w-screen h-screen fixed
        flex items-center justify-center box-border bg-[rgba(0,_0,_0,_0.7)]
      '
    >
      <div
        className='
        m-0 sm:m-[0_20px] rounded-0 sm:rounded-[12px] w-full max-w-[770px]
          h-full sm:h-[670px] bg-black-def relative grid grid-cols-2 registr-main-block
        '
      >
        <div
          className='
            relative p-[30px] hidden sm:block
          '
        >
          <img
            src={bg.src}
            className='
              absolute object-cover w-full h-full top-0 left-0
              rounded-[12px_0_0_12px]
            '
            alt=''
          />
          <Link
            className='
            relative z-[5] flex items-center 
          '
            href='/'
          >
            <img src={HeaderLogo.src} alt={''} width={51} height={40} />
            <img
              className='
                ml-[7px]
              '
              src={HeaderBrandText.src}
              alt={''}
              width={54.71}
              height={23.71}
            />
          </Link>
          <div
            className='
            mt-[150px] flex flex-col gap-[10px] z-[5]
            relative items-center text-center
          '
          >
            <p
              className='
                text-white text-[23px] leading-[31px] font-extrabold tracking-def
                text-center
              '
            >
              Welcome to <span>GreekKeepers</span>
            </p>
            <span
              className='
                text-white text-[16px] text-center font-light tracking-def
                leading-[22px]
              '
            >
              Start your gaming journey right now!
            </span>
          </div>
        </div>
        <div
          className='
            p-[24px] flex flex-col justify-between overflow-y-scroll overflow-x-hidden
          '
        >
          <div>
            <div
              className='
                border-b border-border-black text-inp-col
                text-[20px] sm:text-[18px] font-normal leading-[25px] tracking-def
                text-left pb-[10px]
              '
            >
              {isSignup !== 'up' && isSignup !== 'in'
                ? 'Password recovery'
                : 'Registration'}
            </div>
            {isSignup !== 'recovery' && (
              <div
                className='
                  mt-[20px] flex
                '
              >
                <div
                  // className={clsx(s.signUp_btn, isSignup === 'up' && s.active)}
                  className={`
                    transition-all duration-400 cursor-pointer flex h-[45px]
                    items-center justify-center w-[80px] text-[14px] font-normal
                    leading-[19px] tracking-def border-b border-border-black
                    ${
                      isSignup === 'up'
                        ? 'bg-[linear-gradient(180deg,_rgba(255,_183,_0,_0)_19.23%,_rgba(255,_183,_0,_0.15)_100%)] border-b !border-orange !text-white'
                        : ''
                    }
                  `}
                  onClick={() => setIsSignup('up')}
                >
                  Sign Up
                </div>
                <div
                  className={`
                  transition-all duration-400 cursor-pointer flex h-[45px]
                  items-center justify-center w-[80px] text-[14px] font-normal
                  leading-[19px] tracking-def border-b border-border-black
                  ${
                    isSignup === 'in'
                      ? 'bg-[linear-gradient(180deg,_rgba(255,_183,_0,_0)_19.23%,_rgba(255,_183,_0,_0.15)_100%)] border-b !border-orange !text-white'
                      : ''
                  }
                `}
                  onClick={() => setIsSignup('in')}
                >
                  Sign In
                </div>
              </div>
            )}
            {isSignup === 'up' ? (
              <Signup />
            ) : isSignup === 'in' ? (
              <Signin />
            ) : (
              <PasswordRecovery />
            )}
          </div>
          <div
            className='
              mt-[40px]
            '
          >
            <div
              className='
                mb-[7px] flex justify-between gap-[20px] items-center
              '
            >
              <div
                className='
                  border-b w-full border-border-black
                '
              ></div>
              <span
                className='
                  text-bets-title-color text-[11px] font-normal text-center text-nowrap
                  leading-[14px] tracking-def 
                '
              >
                Or continue with
              </span>
              <div
                className='
                  border-b w-full border-border-black
                '
              ></div>
            </div>
            <div
              className='
                flex gap-[10px] justify-between w-full
              '
            >
              <div
                className='
                  w-full bg-[#202020] border border-border-black rounded-[8px]
                  cursor-pointer flex justify-center items-center px-[10px] h-[40px] transition-all
                  duration-300 hover:bg-border-black
                '
              >
                <img
                  className='w-[25px] h-[25px]'
                  src={googleIco.src}
                  alt='gg'
                />
              </div>
              <div
                className='
                  w-full bg-[#202020] border border-border-black rounded-[8px]
                  cursor-pointer flex justify-center items-center px-[10px] h-[40px] transition-all
                  duration-300 hover:bg-border-black
                '
              >
                <img className='w-[25px] h-[25px]' src={fbIco.src} alt='fb' />
              </div>
              <div
                className='
                  w-full bg-[#202020] border border-border-black rounded-[8px]
                  cursor-pointer flex justify-center items-center px-[10px] h-[40px] transition-all
                  duration-300 hover:bg-border-black
                '
              >
                <img
                  className='w-[25px] h-[25px]'
                  src={twitterIco.src}
                  alt='tw'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
