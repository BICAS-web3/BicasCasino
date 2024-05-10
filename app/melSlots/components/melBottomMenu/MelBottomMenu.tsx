import {FC} from 'react'
import { MelSettings } from './MelSettings'
import { MelCreditBet } from './MelCreditBet'
import { MelPlayBlock } from './MelPlayBlock'

interface MelBottomMenuProps {}

export const MelBottomMenu:FC<MelBottomMenuProps> = () => {
    return (
        <div className="bg-[#D9D9D929] box-border h-[115px] p-[10px] absolute bottom-0 left-0 w-full z-[10] flex items-center justify-center">
            <div className='max-w-[1300px] flex justify-between w-full'>
                <MelCreditBet />
                <span className="hidden md:block text-[18px] mt-[10px] mad:text-[28px] text-nowrap font-normal uppercase">делайте ваши ставки</span>
                <MelPlayBlock />
            </div>
        </div>
    )
}