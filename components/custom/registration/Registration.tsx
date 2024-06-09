'use client'

import { useState, useEffect } from 'react'
import Navigation from './components/navigation'
import SocialsLinks from './components/socials.links'
import Preview from './components/preview'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from '../sidebar/components/LanguageToggle'

interface IRegistration {
  children: React.ReactNode
  title: string
  isSignup: 'up' | 'in' | 'recovery'
}

const Registration = ({ children, title, isSignup }: IRegistration) => {
  const [isOpen, setIsOpen] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? 'hidden' : 'visible'
    document.documentElement.style.height = isOpen ? '100vh' : 'auto'
    return () => {
      document.documentElement.style.overflow = 'visible'
      document.documentElement.style.height = 'auto'
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-[170] sm:z-[110] p-0 sm:p-[90px_0] w-screen h-screen bg-[rgba(0,_0,_0,_0.7)]'>
      <div className='relative m-0 sm:m-[0_20px] w-full max-w-[770px] h-full sm:h-[670px] bg-black-def rounded-0 sm:rounded-[12px] grid grid-cols-1 sm:grid-cols-2'>
        <Preview />
        <div className='relative p-[24px] flex flex-col justify-between overflow-y-scroll overflow-x-hidden'>
        <button
            onClick={() => {
              handleClose()

              if (typeof window !== 'undefined') {
                window.location.href = '/' 
              }
            }}
            className='absolute top-4 right-4 z-[10] text-white text-3xl font-bold'
            >
            &times;
        </button>

          <div>
            <div className='border-b border-border-black text-inp-col text-[20px] sm:text-[18px] font-normal leading-[25px] tracking-def pb-[10px]'>
              {t(`pages.auth.titles.${title}`)}
            </div>
            {isSignup !== 'recovery' && <Navigation isSignup={isSignup} />}
            {children}
          </div>
          <LanguageToggle disabled={false} />
        </div>
      </div>
    </div>
  )
}

export default Registration
