import { FC, useEffect, useState } from 'react'
import s from './styles.module.scss'
import { StaticImageData } from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface GamesItemProps {
  image: string
  id: string
  title: string
  link: string
}

export const GamesItem: FC<GamesItemProps> = props => {
  // const [isDesk, setIsDesk] = useState(false)
  // const [isLaptop, setIsLaptop] = useState(false)
  // const [isMobile, setIsMobile] = useState(false)

  // const [currentImage, setCurrentImage] = useState(props.deskImg)

  // useEffect(() => {
  //   const handleResize = () => {
  //     const width = window.innerWidth
  //     if (width < 1280 && width > 700) {
  //       setIsDesk(false)
  //       setIsLaptop(true)
  //       setIsMobile(false)
  //     } else if (width < 700) {
  //       setIsDesk(false)
  //       setIsLaptop(true)
  //       setIsMobile(false)
  //     } else {
  //       setIsDesk(true)
  //       setIsLaptop(false)
  //       setIsMobile(false)
  //     }
  //   }

  //   handleResize()

  //   window.addEventListener('resize', handleResize)

  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //   }
  // }, [])

  // useEffect(() => {
  //   if (isDesk) {
  //     setCurrentImage(props.deskImg)
  //   } else if (isLaptop) {
  //     setCurrentImage(props.laptopImg)
  //   }
  // }, [isDesk, isLaptop, isMobile])

  return (
    <Card
      onClick={() => {
        location.href = props.link
      }}
      className='
        overflow-hidden cursor-pointer tb:h-[255px] tb:p-[30px] rounded-[20px] border
        border-[#202020] h-[120px] p-[12px] sm:h-[210px] sm:p-[20px] relative
        group
      '
    >
      <CardContent>
        <img
          alt='games-item-bg-static'
          className='
          group-hover:scale-[1.3] transition-all duration-500 absolute h-full w-full
          object-cover top-0 left-0
        '
          src={props.image}
        />
      </CardContent>
      <span
        className='
        z-10 relative leading-[40px] font-extrabold tracking-[1.8px] uppercase text-[#e9e9f5]
        text-[1.1rem] tbs:text-[1.5rem] mmd:text-[1.875rem]
      '
      >
        {props.title}
      </span>
    </Card>
  )
}
