'use client'

import Navigation from './components/navigation'
import SocialsLinks from './components/socials.links'
import Preview from './components/preview'
import { useEffect } from 'react'

interface IRegistration {
  children: React.ReactNode
  title: string
  isSignup: 'up' | 'in' | 'recovery'
}

const Registration = ({ children, title, isSignup }: IRegistration) => {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.height = '100vh'
    return () => {
      document.documentElement.style.overflow = 'visible'
      document.documentElement.style.height = 'auto'
    }
  }, [])

  return (
    <div className='z-[170] sm:z-[110] p-0 sm:p-[90px_0] w-screen h-screen fixed top-0 left-0 flex items-center justify-center box-border bg-[rgba(0,_0,_0,_0.7)]'>
      <div className='m-0 sm:m-[0_20px] rounded-0 sm:rounded-[12px] w-full max-w-[770px] h-full sm:h-[670px] bg-black-def relative grid grid-cols-1 sm:grid-cols-2 registr-main-block'>
        <Preview />
        <div className='p-[24px] flex flex-col justify-between overflow-y-scroll overflow-x-hidden'>
          <div>
            <div className='border-b border-border-black text-inp-col text-[20px] sm:text-[18px] font-normal leading-[25px] tracking-def text-left pb-[10px]'>
              {title}
            </div>
            {isSignup !== 'recovery' && <Navigation isSignup={isSignup} />}
            {children}
          </div>
          <SocialsLinks />
        </div>
      </div>
    </div>
  )
}
export default Registration
