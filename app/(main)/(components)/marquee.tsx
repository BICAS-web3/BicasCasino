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
import { useTranslation } from 'react-i18next'

const MarqueeItem = dynamic(() => import('./marquee.item'), {
  loading: () => <Skeleton className='w-6 h-6 mx-[7.5px] rounded-full' />,
  ssr: false
})

export const MarqueeLine = () => {
  useEffect(() => {
    ;(async () => {
      const data = await getTokensGeneral({ bareer: '' })
      console.log('tokensData::', data)
    })()
  }, [])
  const { t } = useTranslation()
  return (
    <div className='relative w-full sm:w-full bg-[#212121] sm:rounded-[99px] max-h-[50px] flex items-center justify-between py-[1px] sm:py-0.5 sm:pl-0.5'>
      <Marquee
        pauseOnHover
        autoFill
        speed={100}
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
      <div className='relative flex items-center '>
        <div className='flex justify-center items-center mr-[-20px] bg-[#212121] z-10 rounded-[99px]'>
          
         
        </div>
        <div className='ml-[-10px]'>
          <div className='flex justify-center items-center bg-[#23302A] min-w-[60px] h-[40px] px-5 mr-1 rounded-[99px] z-0'>
            <span className='bg-[#F57731] w-2 h-2 rounded-full  mr-2 ml-5' />{' '}
            {t('pages.main.Live')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarqueeLine
