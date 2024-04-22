'use client'

import Image from 'next/image'
import Marquee from 'react-fast-marquee'

import { stringRemoveSpacing } from '@/lib/string'
import { ChevronsUp } from 'lucide-react'
import { marquee_data } from './data'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'
import { getTokensGeneral } from '@/api'

const MarqueeItem = dynamic(() => import('./marquee.item'), {
  loading: () => (
    <div className='flex'>
      <Skeleton className='w-6 h-6 aspect-square object-contain' />
      <Skeleton className='w-6 h-12' />
    </div>
  ),
  ssr: false
})

export const MarqueeLine = () => {
  useEffect(() => {
    ;(async () => {
      const data = await getTokensGeneral({ bareer: '' })
      console.log('tokensData::', data)
    })()
  }, [])
  return (
    <div className='relative w-full sm:w-full bg-[#212121] sm:rounded-[99px] max-h-[50px] flex items-center justify-between py-[1px] sm:py-0.5 sm:pl-0.5 ml-0'>
      <Marquee
        autoFill
        speed={55}
        className='px-5 py-[5px] h-[40px] sm:py-[13px] flex-1 bg-[#151515] rounded-r-full sm:rounded-[99px] z-[3] relative overflow-hidden'
      >
        {marquee_data.map((item, index) => (
          <span
            key={`merquee-item--${stringRemoveSpacing(item.title)}_${index}}`}
          >
            <MarqueeItem
              grow={item.grow}
              image={item.img}
              index={index}
              title={item.title}
            />
          </span>
        ))}
      </Marquee>
      <div className='flex justify-center items-center gap-[5px] min-w-32 sm:min-w-40'>
        <ChevronsUp className='text-[#A7F7D1] w-5 h-5' />
        <Image
          src='/images/marquee/draxma.png'
          alt='draxma'
          width={32}
          height={32}
          className='w-5 sm:w-6 h-5 sm:h-6'
        />
        DraXma
      </div>
      <div className='min-w-40 hidden sm:flex justify-center items-center gap-[5px] bg-[#7E15E6] h-full px-5 rounded-[99px]'>
        <span className='bg-[#F57731] w-2 h-2 rounded-full' /> Live Trading
      </div>
    </div>
  )
}

export default MarqueeLine
