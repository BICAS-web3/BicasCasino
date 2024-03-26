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
          'relative w-[100px] md:w-[183px] lg:w-[192px] xl:w-[176px] 2xl:w-[206px] h-[100px] md:h-[183px] lg:h-[192px] xl:h-[176px] 2xl:h-[206px] p-[10px] pl-[15px]',
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
          'w-full items-center flex justify-center md:justify-between',
          'md:px-[10px] md:py-4 bg-[#181818]'
        )}
      >
        <span className='text-[10px] md:text-[15px] xl:text-base text-grey-acc leading-6'>
          GK Originals
        </span>{' '}
        <span
          className={cn(
            'hidden md:flex w-5 h-5 border border-[#3E3E3E] justify-center items-center',
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
