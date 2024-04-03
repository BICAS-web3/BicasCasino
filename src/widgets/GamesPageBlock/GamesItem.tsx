import { FC, useEffect, useState } from 'react'
import { StaticImageData } from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface GamesItemProps {
  image: string
  id: string
  title: string
  link: string
}

export const GamesItem: FC<GamesItemProps> = props => {
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
