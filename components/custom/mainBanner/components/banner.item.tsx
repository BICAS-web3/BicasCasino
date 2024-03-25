import { FC } from 'react'
import Image, { StaticImageData } from 'next/image'

import { cn } from '@/lib/utils'

interface IBannerItem {
  img: StaticImageData
  title: string
  btnTitle: string
  ind: number
}

const BannerItem: FC<IBannerItem> = props => {
  const { img, title, btnTitle, ind } = props

  return (
    <div
      className={cn(
        'flex flex-col justify-between min-h-full min-w-full h-[240px]',
        'relative rounded-[12px] p-[30px] overflow-hidden'
      )}
    >
      <Image
        className='absolute w-full h-full top-0 left-0'
        src={img}
        alt='img'
      />
      {/* <h3
        className={cn(
          'max-w-[245px] relative z-[1]',
          'text-[#E9E9F5] font-bold uppercase',
          ind === 0 ? 'text-2xl' : 'text-lg'
        )}
      >
        {title}
      </h3>
      <button
        className={cn(
          'min-w-[182px] h-9 flex items-center justify-center px-5 mt-auto w-fit',
          'bg-[#732E6E26] border border-[#612E73A6] text-sm relative z-[1]'
        )}
      >
        {btnTitle}
      </button> */}
    </div>
  )
}

export default BannerItem
