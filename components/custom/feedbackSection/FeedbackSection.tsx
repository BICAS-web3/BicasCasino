'use client'
import { FC } from 'react'
import mailIco from '@/public/misc/mailBgIco.webp'
import mailIcoMobile from '@/public/misc/mailBgMobile.webp'
import Image from 'next/image'

interface FeedbackSectionProps {}

export const FeedbackSection: FC<FeedbackSectionProps> = () => {
  return (
    <div
      className='rounded-[12px] 
    flex justify-center 
    bg-[#252019] mx-[16px] my-[20px] 
    shadow-[inset_0_0_14px_0_#9c740e,_0_0_14.8px_0_#9c740e]
    border-[1px] border-[#ffe09d]'
    >
      <div className='flex flex-col sm:flex-row sm:items-center items-start w-full max-w-[760px] justify-between gap-[20px] box-border p-[20px] relative '>
        <Image
          alt='bg-static'
          className='hidden sm:block right-[50px] absolute top-[50%] h-full translate-y-[-50%]'
          src={mailIco}
        />
        <Image
          alt='bg-static-monile'
          className='block sm:hidden absolute translate-y-[-50%] h-full top-[50%] right-0'
          src={mailIcoMobile}
        />
        <div className='flex flex-col justify-between'>
          <span className='text-[#ffbe26] text-[0.9375rem] font-black leading-[19px] tracking-[0.9px] block mb-[10px] z-10'>
            Feedback, Support and Bug Reports
          </span>
          <p className='z-10 max-w-[400px] tracking-[0.9px] leading-[12px] font-normal text-[0.5625rem] text-white'>
            If you have ant feedback, need support, or want to report bugs,
            please don’t hesitate to reach out to us on Email. We are always
            happy hear from our players and strive to improve the expirience for
            everyone.
          </p>
        </div>
        <button
          className='z-10 
          cursor-pointer 
          border-none 
          outline-0 
          outline-none 
          rounded-[8px] bg-[linear-gradient(90deg,_#ffd77c_0%,_#c37733_107.41%)] 
          flex justify-center items-center w-full h-[40px] 
          max-w-[120px] text-[#0f0f0f] text-[0.875rem] 
          font-bold leading-[normal] not-italic'
          onClick={() => {
            location.href = 'https://t.me/GKSupportt'
          }}
        >
          Contact us
        </button>
      </div>
    </div>
  )
}
