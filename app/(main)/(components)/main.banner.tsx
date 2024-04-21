'use client'
import { Autoplay, Navigation } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'

import Carousel from '@/components/custom/carousel/carousel'
import { stringRemoveSpacing } from '@/lib/string'
import { useRef } from 'react'
import { main_banner } from './data'
import Image from 'next/image'

export const Banner = () => {
  const paginationREF = useRef(null)
  return (
    <Carousel
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        512: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false
      }}
      modules={[Autoplay, Navigation]}
      spacing={20}
      loop={true}
    >
      {main_banner.map((item, i) => (
        <SwiperSlide
          style={{
            minHeight: 240,
            width: 507,
            backgroundSize: 'cover'
          }}
          key={`banner-item_${stringRemoveSpacing(item.title)}_${i}`}
          className='rounded-xl max-h-40 p-[30px_20px] overflow-hidden xxs:max-h-48 relative smm:max-h-56'
        >
          <img src={item.img} alt='imag' className='h-[240px] min-w-[490px] ob absolute right-0 top-0' width={507} height={240} />
          <span className='relative mb-[20px] block z-[10] text-[28px] sm:text-[34px] font-bold'>{item.title}</span>
          <p className='relative z-[10] text-[20px] sm:text-[24px] font-bold'>{item.text}</p>
        </SwiperSlide>
      ))}
    </Carousel>
  )
}

export default Banner
