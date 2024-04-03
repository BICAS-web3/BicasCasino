import { FC, useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface PopularGamesItemProps {
  image: string
  id: string
  link: string
  title: string
}

export const PopularGamesItem: FC<PopularGamesItemProps> = props => {
  return (
    <Card
      className='
        overflow-hidden relative cursor-pointer tb:p-[20px] p-[12px] box-border relative rounded-[20px]
        border border-[#202020] tb:h-[180px] h-[120px]  group
      '
      onClick={() => {
        location.href = props.link
      }}
    >
      <CardContent>
        <img
          alt='game-bg-static'
          className='
          transition-all duration-500 rounded-[20px] h-full absolute object-cover
          w-full top-0 left-0 bottom-0 right-0 group-hover:scale-[1.2]
        '
          src={props.image}
        />
        <span
          className='
          text-[#e9e9f5] text-[1.1875rem] tbs:text-[1.5625rem] font-extrabold leading-[30px] tracking-[1.5px] z-10 uppercase absolute
          left-[10px] tbs:left-[10px] sm:text-[1.0125rem]
          '
        >
          {props.title}
        </span>
      </CardContent>
    </Card>
  )
}
