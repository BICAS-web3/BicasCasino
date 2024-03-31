'use client'
import { Autoplay, Navigation } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'

import Carousel from '@/components/custom/carousel/carousel'
import { stringRemoveSpacing } from '@/lib/string'
import { useRef } from 'react'
import { main_banner } from './data'

export const Banner = () => {
  const paginationREF = useRef(null)
  return (
    <Carousel
      slides={3}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false
      }}
      modules={[Autoplay, Navigation]}
      spacing={20}
      loop
      // pagination={{
      //   clickable: true,
      //   bulletClass: 'w-6 h-[2px] bg-white',
      //   bulletActiveClass: 'w-12 h-[2px] bg-black'
      // }}
    >
      {main_banner.map((item, i) => (
        <SwiperSlide
          style={{
            height: 240,
            width: 507,
            background: `url('${item.img}') center center no-repeat`,
            backgroundSize: 'cover'
          }}
          key={`banner-item_${stringRemoveSpacing(item.title)}_${i}`}
          className='rounded-xl'
        >
          <div className='flex flex-col justify-between w-full h-[240px] relative p-[30px] overflow-hidden'>
            <h3 className='max-w-[245px] relative z-[1] text-xl text-[#E9E9F5] font-bold uppercase'>
              {item.title}
            </h3>
            <button className='min-w-[182px] h-9 flex items-center justify-center px-5 mt-auto w-fit bg-[#732E6E26] border border-[#612E73A6] text-sm relative z-[1]'>
              {item.btn}
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Carousel>
  )
}

export default Banner
