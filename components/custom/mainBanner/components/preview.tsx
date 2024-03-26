import Image from 'next/image'

import layout from '@/public/main_banner/layout.png'
import token from '@/public/main_banner/token.png'
import rocket from '@/public/main_banner/rocket.png'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  CrossSVG,
  RedSquereSVG,
  SquereSVG,
  TitleSVG,
  TrangleSVG
} from './icons'
import { FC } from 'react'

interface IPreview {
  className?: string
}

export const Preview: FC<IPreview> = ({ className }) => {
  return (
    <article
      className={cn(
        'relative w-full h-[383px] pt-10 pb-[25px] overflow-hidden',
        className
      )}
    >
      <h2 className='font-bold text-[34px] leading-[46px] relative z-[1]'>
        Hello Markus666 <br />
        Bonus on the first deposit
      </h2>
      <h1 className='text-[78px] font-black leading-[100%] relative z-[1] text-[#B4E915]'>
        +$100
        <br /> Reward
      </h1>
      <div className='mt-3 relative z-[1] flex gap-[10px]'>
        <button
          className={cn(
            'flex items-center justify-center rounded-[5px] w-[182px] h-9 text-[13px] font-semibold box-border',
            'border border-[#FFEF29] shadow-[0px_0px_10px_0px_#EC8125_inset,0px_0px_10px_0px_#EC8125E5]'
          )}
        >
          Deposit and play
        </button>
        <Button
          variant={'secondary'}
          className='w-[182px] flex items-center justify-center box-border h-9 bg-[#20202050] border border-[#363636]'
        >
          Free Play
        </Button>
      </div>
      <Image
        src={rocket}
        alt='rocket'
        className='absolute w-[195px] h-[195px] top-[99px] left-[550px] z-[1]'
      />
      <Image
        src={token}
        alt='token'
        className='absolute w-[213px] h-[182px] top-[91px] right-[430px] z-[1]'
      />
      <Image
        className='absolute w-full h-full top-0 left-0'
        src={layout}
        alt='layout'
      />
      <TitleSVG className='absolute top-[285px] right-[379px] z-[1]' />
      <CrossSVG className='absolute top-[203px] right-[702px] z-[1]' />
      <TrangleSVG className='absolute top-[43px] right-[621px] z-[1]' />
      <RedSquereSVG className='absolute top-[47px] right-[246px] z-[1]' />
      <SquereSVG className='absolute right-[221px] -bottom-[17px] z-[1]' />
    </article>
  )
}

export default Preview
