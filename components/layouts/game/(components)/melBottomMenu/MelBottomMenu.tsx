import { FC } from 'react'
import { MelSettings } from './MelSettings'
import { MelCreditBet } from './MelCreditBet'
import { MelPlayBlock } from './MelPlayBlock'

interface MelBottomMenuProps {}

export const MelBottomMenu: FC<MelBottomMenuProps> = () => {
  return (
    <div className='max-w-[1300px] flex justify-between w-full absolute bottom-0 left-1/2 -translate-x-1/2 p-[10px] items-center h-[115px]'>
      <MelCreditBet />
      <span className='hidden md:block text-[18px] mt-[10px] mad:text-[28px] text-nowrap font-normal uppercase'>
        делайте ваши ставки
      </span>
      <MelPlayBlock />
    </div>
  )
}
