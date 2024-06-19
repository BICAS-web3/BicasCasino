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
          <div className='flex justify-center items-center mr-[-20px] bg-[#212121] min-w-[70px] sm:min-w-[70px] h-[40px] z-10 rounded-[99px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='hidden sm:block lucide lucide-chevrons-up text-[#A7F7D1] w-5 h-5 ml-5'
            >
              <path d='m17 11-5-5-5 5'></path>
              <path d='m17 18-5-5-5 5'></path>
            </svg>
            <img
              alt='draxma'
              loading='lazy'
              width='24'
              height='24'
              decoding='async'
              data-nimg='1'
              src='/_next/image?url=%2Fimages%2Fmarquee%2Fdraxma.png&amp;w=48&amp;q=75'
              style={{ color: 'transparent' }}
            />
            <span className='text-[#ffffff] mr-5 hidden sm:block'>DraXma</span>
          </div>
        </div>
        <div className='ml-[10px]'>
          <div className='flex justify-center items-center bg-[#23302A] min-w-[60px] h-[40px] px-5 mr-1 rounded-[99px] z-0'>
            <span className='bg-[#F57731] w-2 h-2 rounded-full  mr-2 ml-5' />
            {t('pages.main.Live')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarqueeLine
