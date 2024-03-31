import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface IPreview {
  className?: string
}

const Preview = ({ className }: IPreview) => {
  return (
    <article
      className={cn(
        'relative w-full h-[383px] pt-10 pb-[25px] overflow-hidden',
        className
      )}
      style={{
        background: `url('/main_banner/layout.png') center center no-repeat`,
        backgroundSize: 'cover'
      }}
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
      {/* <Image
        className='absolute w-full h-full top-0 left-0'
        src='/main_banner/layout.png'
        fill
        alt='layout'
      /> */}
    </article>
  )
}

export default Preview
