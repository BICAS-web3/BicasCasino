import Image from 'next/image'

import { FacebookSVG, GoogleSVG, TwitterSVG } from '../icons'

const SocialsLinks = () => {
  const onClick = (provider: 'google' | 'facebook' | 'twitter') => {
    console.log(provider)
  }
  return (
    <div className='mt-[40px]'>
      <div className='mb-[7px] flex justify-between gap-[20px] items-center'>
        <div className='border-b w-full border-border-black'></div>
        <span
          className='text-bets-title-color text-[11px] font-normal text-center text-nowrap
                  leading-[14px] tracking-def '
        >
          Or continue with
        </span>
        <div className='border-b w-full border-border-black'></div>
      </div>
      <div className='flex gap-[10px] justify-between w-full'>
        <button
          onClick={() => onClick('google')}
          className='w-full bg-[#202020] border border-border-black rounded-[8px]
                  cursor-pointer flex justify-center items-center px-[10px] h-[40px] transition-all
                  duration-300 hover:bg-border-black'
        >
          <GoogleSVG />
        </button>
        <button
          onClick={() => onClick('facebook')}
          className='w-full bg-[#202020] border border-border-black rounded-[8px]
                  cursor-pointer flex justify-center items-center px-[10px] h-[40px] transition-all
                  duration-300 hover:bg-border-black'
        >
          <FacebookSVG />
        </button>
        <button
          onClick={() => onClick('twitter')}
          className='w-full bg-[#202020] border border-border-black rounded-[8px]
                  cursor-pointer flex justify-center items-center px-[10px] h-[40px] transition-all
                  duration-300 hover:bg-border-black'
        >
          <TwitterSVG />
        </button>
      </div>
    </div>
  )
}

export default SocialsLinks
