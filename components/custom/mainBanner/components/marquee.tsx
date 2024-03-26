import Marquee from 'react-fast-marquee'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import img_1 from '@/public/marquee/1.png'
import img_2 from '@/public/marquee/2.png'
import img_3 from '@/public/marquee/3.png'
import img_4 from '@/public/marquee/4.png'
import img_5 from '@/public/marquee/5.png'
import img_6 from '@/public/marquee/6.png'
import img_7 from '@/public/marquee/7.png'
import img_8 from '@/public/marquee/8.png'
import draxma from '@/public/marquee/draxma.png'

import { ArrSVG } from './icons'

const data = [
  {
    title: 'GROK',
    img: img_1,
    grow: true
  },
  {
    title: 'APU',
    img: img_2,
    grow: true
  },
  {
    title: 'YOURAI',
    img: img_3,
    grow: false
  },
  {
    title: 'PANDORA',
    img: img_4,
    grow: false
  },
  {
    title: 'PEPE',
    img: img_5,
    grow: true
  },
  {
    title: 'BEAM',
    img: img_6,
    grow: false
  },
  {
    title: 'DEXT',
    img: img_7,
    grow: true
  },
  {
    title: 'pepecoin',
    img: img_8,
    grow: false
  }
]

export const MarqueeLine = () => {
  return (
    <>
      {' '}
      <div
        className={cn(
          'relative w-screen sm:w-full bg-[#212121] sm:rounded-[99px]',
          'flex items-center py-[1px] sm:py-[2px] sm:pl-[2px] -ml-4 sm:ml-0'
        )}
      >
        <Marquee
          autoFill
          className={cn(
            'px-5 py-[5px] sm:py-[13px] max-w-[calc(100vw-123px)] sm:max-w-[calc(100%-302px)]',
            'bg-[#151515] rounded-r-[9px] sm:rounded-[99px] z-[3] relative'
          )}
        >
          {data.map((item, i) => (
            <div
              key={item.title}
              className='flex items-center gap-[5px] mx-[7.5px]'
            >
              <span className='text-sm sm:text-base'>#{i + 1}</span>
              <ArrSVG
                className={cn(
                  item.grow ? 'text-[#A7F7D1]' : 'text-[#F7BFA7] rotate-180'
                )}
              />
              <Image
                className='w-5 sm:w-6 h-5 sm:h-6 rounded-full'
                src={item.img}
                alt={item.title}
              />
              <span className='text-sm sm:text-base'>{item.title}</span>
            </div>
          ))}
        </Marquee>
        <div
          className={cn(
            'absolute sm:rounded-[99px] bg-[#212121] top-0 right-0 sm:right-[149px] z-[2] text-sm sm:text-base',
            'flex items-center justify-end gap-[5px] w-[154px] sm:w-[207px] h-full pr-[10px] sm:pr-5'
          )}
        >
          <ArrSVG className='text-[#A7F7D1] w-[13px] h-[14px]' />
          <Image src={draxma} alt='draxma' className='w-5 sm:w-6 h-5 sm:h-6' />
          DraXma
        </div>
        <div
          className={cn(
            'absolute h-full rounded-[99px] bg-[#7E15E6] top-0 right-0 w-[213px]',
            'hidden sm:flex items-center gap-[5px] pr-5 justify-end'
          )}
        >
          <span className='bg-[#F57731] w-2 h-2 rounded-full'></span> Live
          Trading
        </div>
      </div>
    </>
  )
}

export default MarqueeLine