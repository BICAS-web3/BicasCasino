import Image, { StaticImageData } from 'next/image'
import { FC } from 'react'

import { cn } from '@/lib/utils'
import { UsersSVG } from './icons'
import Link from 'next/link'

interface IGameBanner {
  img: StaticImageData
  link: string
}

const GameBanner: FC<IGameBanner> = props => {
  const { img, link } = props

  return (
    <Link
      href={link}
      className={cn('flex flex-col rounded-[8px] overflow-hidden w-fit')}
    >
      <div
        className={cn(
          'relative w-[206px] h-[206px] p-[10px] pl-[15px]',
          'flex flex-col justify-between'
        )}
      >
        <Image
          className='absolute w-full h-full top-0 left-0'
          src={img}
          alt={'title'}
        />
        <div
          className={cn(
            'ml-auto flex items-center gap-[3px] py-[2px] px-[6px] bg-[#00000066] rounded-[13px]',
            'text-[10px] text-white relative z-10'
          )}
        >
          <UsersSVG /> 330
        </div>
      </div>
      <div
        className={cn(
          'w-full items-center flex justify-between',
          'px-[10px] py-4 bg-[#181818]'
        )}
      >
        <span className='text-[#7E7E7E]'>GK Originals</span>{' '}
        <span
          className={cn(
            'flex w-5 h-5 border border-[#3E3E3E] justify-center items-center',
            'text-[#979797] text-sm rounded-full'
          )}
        >
          !
        </span>
      </div>
    </Link>
  )
}

export default GameBanner
