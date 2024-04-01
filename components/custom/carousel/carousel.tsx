// import Swiper core and required modules

import { Swiper } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/autoplay'
// import 'swiper/css/effect-fade'
import 'swiper/css/grid'
import 'swiper/css/pagination'

import {
  AutoplayOptions,
  GridOptions,
  NavigationOptions,
  PaginationOptions,
  SwiperModule
} from 'swiper/types'

type CarouselProps = {
  children: React.ReactNode | React.ReactNode[]
  modules: SwiperModule[]
  grid?: GridOptions
  effect?: string
  autoplay?: AutoplayOptions
  breakpoints?: any
  spacing: number
  loop?: boolean
  slides?: number | 'auto'
  navigation?: NavigationOptions
  pagination?: PaginationOptions
  containerClassName?: string
  onBeforeInit?: (swiper) => void
  onSwiper?: (swiper) => void
  onSlideChange?: (swiper) => void
}

export const Carousel = ({
  children,
  modules,
  autoplay,
  grid,
  loop,
  slides,
  spacing,
  breakpoints,
  navigation,
  effect,
  pagination,
  containerClassName,
  onBeforeInit,
  onSwiper,
  onSlideChange
}: CarouselProps) => (
  <div className={`flex ${containerClassName}`}>
    <Swiper
      speed={1000}
      onBeforeInit={onBeforeInit}
      effect={effect}
      loop={!!loop}
      autoplay={!!autoplay}
      modules={modules}
      breakpoints={breakpoints || undefined}
      spaceBetween={spacing}
      slidesPerView={slides}
      navigation={!!navigation}
      pagination={!!pagination}
      grid={grid || undefined}
      onSwiper={onSwiper}
      onSlideChange={onSlideChange}
    >
      {children}
    </Swiper>
  </div>
)

export default Carousel
