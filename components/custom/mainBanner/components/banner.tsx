'use client'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import BannerItem from './banner.item'
import { useRef } from 'react'

import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules'
import banner_1 from '@/public/main_banner/banner_1.png'
import banner_2 from '@/public/main_banner/banner_2.png'
import banner_3 from '@/public/main_banner/banner_3.png'

import 'swiper/scss'
import 'swiper/css/effect-fade'
import { cn } from '@/lib/utils'

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
  const swiperRef = useRef<SwiperRef>(null)
  return (
    <Swiper
      ref={swiperRef}
      slidesPerView={'auto'}
      className='w-full'
      autoplay={{
        delay: 4500,
        disableOnInteraction: false
      }}
      wrapperClass='pb-[17px]'
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
          className={cn('w-[507px] max-w-[507px] h-[240px] min-h-[240px]')}
          key={item.title}
        >
          <BannerItem
            ind={i}
            img={item.img}
            title={item.title}
            btnTitle={item.btn}
          />
        </SwiperSlide>
      ))}{' '}
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
