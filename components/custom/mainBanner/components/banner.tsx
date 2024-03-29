'use client'
import { useRef } from 'react'

import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import 'swiper/css/effect-fade'
import 'swiper/css'

import banner_1 from '@/public/main_banner/banner_1.png'
import banner_2 from '@/public/main_banner/banner_2.png'
import banner_3 from '@/public/main_banner/banner_3.png'

import { cn } from '@/lib/utils'

import Slide from '@/components/ui/slider'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { SidebarModel } from '@/states'
import { useUnit } from 'effector-react'

const banners = [
  {
    img: banner_1,
    title: 'exclusive Greekkeepers Games',
    btn: 'Join game'
  },
  {
    img: banner_2,
    title: 'You can bet on the BSC, Polygon and Arbitrum networks',
    btn: 'Play now'
  },
  {
    img: banner_3,
    title: 'Get your $100 deposit bonus in the DRAXB token',
    btn: 'Claim your deposit bonus'
  },
  {
    img: banner_1,
    title: 'exclusive Greekkeepers Games',
    btn: 'Join game'
  },
  {
    img: banner_2,
    title: 'You can bet on the BSC, Polygon and Arbitrum networks',
    btn: 'Play now'
  }
]
export const Banner = () => {
  const isLeptop = useMediaQuery('(max-width:1024px)')
  const isMedium = useMediaQuery('(max-width:768px)')
  const swiperRef = useRef<SwiperRef>(null)

  const [open] = useUnit([SidebarModel.$open])

  return (
    <Swiper
      ref={swiperRef}
      slidesPerView={isMedium ? 'auto' : isLeptop ? 2 : 3}
      className='w-full'
      autoplay={{
        delay: 4500,
        disableOnInteraction: false
      }}
      speed={1000}
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      spaceBetween={20}
      style={{ display: 'flex !important' }}
      pagination={{
        el: '#custom_swiper_banner_pagination',
        clickable: true
      }}
    >
      {banners.map((item, i) => (
        <SwiperSlide
          className={cn(
            'min-w-[288px] h-[136px] pb-[17px]',
            '2xl:h-[240px] min-h-[136px] md:h-[194px] md:min-h-[194px] 2xl:min-h-[240px]',
            open
              ? 'max-w-[520px] md:min-w-[314px] lg:h-[174px] lg:min-h-[174px]'
              : 'max-w-[507px] md:min-w-[370px] lg:h-[148px] lg:min-h-[148px]'
          )}
          key={item.title}
        >
          <Slide
            className={cn(
              'h-[136px] md:h-[194px] 2xl:h-[240px]',
              open ? 'lg:h-[174px]' : 'lg:h-[148px]'
            )}
            img={item.img}
          />
        </SwiperSlide>
      ))}
      <div
        className={cn(
          'gap-1 xl:gap-2 duration-200 flex z-10',
          '-translate-x-1/2 left-1/2 absolute bottom-0'
        )}
        id='custom_swiper_banner_pagination'
      ></div>
    </Swiper>
  )
}

export default Banner
