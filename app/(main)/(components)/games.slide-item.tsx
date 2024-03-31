import Image from 'next/image'
import { FC } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import Link from 'next/link'
import { UsersSVG } from './icons'

interface Props {
  image: string
  link: string
}

const GameSlideItem = ({ image, link }: Props) => (
  <Link
    href={link}
    className='flex flex-col rounded-[8px] overflow-hidden w-fit'
  >
    <div className='relative w-[206px] aspect-square p-[10px] flex flex-col items-end'>
      <Image
        className='absolute top-0 left-0 aspect-square object-contain'
        src={image}
        alt={`game-slider--${link}-image`}
        sizes='206'
        fill
      />
      <div className='flex items-center gap-1 bg-black/60 relative w-max px-2 py-[2px] rounded-[13px] text-xs text-white z-10'>
        <UsersSVG />
        <span>330</span>
      </div>
    </div>
    {/* footer */}
    <div className='w-full items-center flex justify-between px-[10px] py-4 bg-[#181818]'>
      <span className='text-[#7E7E7E]'>GK Originals</span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Info className='text-[#979797] w-5 h-5 aspect-square object-contain' />
          </TooltipTrigger>
          <TooltipContent>
            <p>Some information</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </Link>
)

export default GameSlideItem
