'use client'
import { Autoplay, Navigation } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'

import Carousel from '@/components/custom/carousel/carousel'
import { stringRemoveSpacing } from '@/lib/string'
import { useRef } from 'react'
import { main_banner } from './data'
import { LeftArrow } from '@/public/icons/chest/leftArrow'

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
      loop
    >
      {main_banner.map((item, i) => (
        <SwiperSlide
          style={{
            height: 240,
            width: 507,
            background: `url('${item.img}') left center no-repeat`,
            backgroundSize: 'cover'
          }}
          key={`banner-item_${stringRemoveSpacing(item.title)}_${i}`}
          className='rounded-xl max-h-40 xxs:max-h-48 smm:max-h-56'
        />
      ))}
    </Carousel>
  )
}

export default Banner
