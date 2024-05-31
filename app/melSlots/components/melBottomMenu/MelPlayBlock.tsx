import { FC } from 'react'
import Border from '@/public/images/mell/borderImg.svg'
import Minus from '@/public/images/mell/minus.svg'
import Plus from '@/public/images/mell/plus.svg'
import AutoBorder from '@/public/images/mell/autoBorder.svg'
import AutoIco from '@/public/images/mell/autoIco.svg'
import { useUnit } from 'effector-react'
import { GameModel } from '@/states'

interface MelPlayBlockProps {}

export const MelPlayBlock: FC<MelPlayBlockProps> = () => {
  const [setIsPlaying] = useUnit([GameModel.setIsPlaying])
  return (
    <div className='hidden tbb:flex gap-[15px] items-center'>
      <div className='w-[70px] cursor-pointer  h-[70px] relative flex items-center justify-center'>
        <Minus className='w-[40px] h-[40px]' />
        <Border className='w-full h-full absolute top-0 left-0' />
      </div>
      <div className='relative top-[-30px] cursor-pointer flex w-[120px] h-[120px] items-center justify-center'>
        <AutoIco className='w-[60%]' />
        <Border className='w-full h-full absolute top-0 left-0' />
        <div
          onClick={() => setIsPlaying(true)}
          className='absolute bottom-[-10px] w-[110px] h-[32px] flex items-center justify-center'
        >
          <span className='relative z-[10] uppercase text-[12px] font-bold'>
            авто игра
          </span>
          <AutoBorder className='absolute w-full h-full top-0 left-0' />
        </div>
      </div>
      <div className='w-[70px] cursor-pointer  h-[70px] relative flex items-center justify-center'>
        <Plus className='w-[40px] h-[40px]' />
        <Border className='w-full h-full absolute top-0 left-0' />
      </div>
    </div>
  )
}
