import {FC} from 'react'
import Border from '@/public/images/mell/borderImg.svg'
import Minus from '@/public/images/mell/minus.svg'
import Plus from '@/public/images/mell/plus.svg'
import AutoIco from '@/public/images/mell/autoIco.svg'

import Settings from "@/public/images/mell/htpSettings.svg"
import Info from "@/public/images/mell/htpInfo.svg"

interface HtpProps {}

export const Htp:FC<HtpProps> = () => {
    return (
        <div className='flex flex-col'>
            <h2 className="text-[12px] sm:text-[26px] text-center font-bold uppercase mb-[14px]">как играть</h2>
            <div className='text-center flex flex-col items-center'>
                <p className="text-[10px] sm:text-[16px] font-bold flex items-center gap-[10px]">
                    Чтобы изменить ставку, откройте меню ставок и нажмите 
                    <div className='w-[30px] h-[30px] sm:w-[40px] cursor-pointer sm:h-[40px] relative inline-flex items-center justify-center'>
                        <Plus className='w-[15px] h-[15px]' />
                        <Border className='w-full h-full absolute top-0 left-0' />
                    </div>
                    или
                    <div className='w-[30px] h-[30px] sm:w-[40px] cursor-pointer sm:h-[40px] relative inline-flex items-center justify-center'>
                        <Minus className='w-[15px] h-[15px]' />
                        <Border className='w-full h-full absolute top-0 left-0' />
                    </div>
                </p>
                <p className="text-[10px] sm:text-[16px] font-bold block mt-[8px]">
                    Выберите ставку, которую вы хотите использовать в игре.
                </p>
            </div>
            <div className='text-center flex flex-col items-center mt-[40px]'>
                <h2 className="text-[12px] sm:text-[26px] text-center font-bold leading-[35px] uppercase mb-[8px]">ГЛАВНЫЙ ИНТЕРФЕЙС ИГРЫ</h2>
                <p className="text-[10px] sm:text-[16px] font-bold flex items-center gap-[10px]">
                    <Settings className='w-[33px] h-[33px]' /> Открывает меню, содержащее НАСТРОЙКИ игры.
                </p>
                <p className="text-[10px] sm:text-[16px] font-bold flex items-center gap-[10px]">
                    <Info className='w-[33px] h-[33px]' /> Открывает информационную страницу.
                </p>
            </div>
            <p className='text-[10px] sm:text-[16px] font-bold block mb-[8px] mt-[40px] text-center'>
                Напротив ярлыков КРЕДИТ и СТАВКА отображается текущий баланс и текущая общая ставка.
            </p>
            <p className='text-[10px] sm:text-[16px] font-bold text-center'>
                Нажатием на эти ярлыки можно переключаться между монетами и валютой
            </p>
            <div className='text-[10px] sm:text-[16px] justify-center m-[30px_auto_0_auto] font-bold text-center max-w-[690px] flex items-center gap-[10px]'>
                <div className='min-w-[30px] min-h-[30px] sm:w-[40px] cursor-pointer sm:h-[40px] relative inline-flex items-center justify-center'>
                    <Plus className='w-[15px] h-[15px]' />
                    <Border className='w-full h-full absolute top-0 left-0' />
                </div>
                и
                <div className='min-w-[30px] min-h-[30px] sm:w-[40px] cursor-pointer sm:h-[40px] relative inline-flex items-center justify-center'>
                    <Minus className='w-[15px] h-[15px]' />
                    <Border className='w-full h-full absolute top-0 left-0' />
                </div>
                Повышают или понижают текущую ставку и открывают меню ставок, где вы можете изменить значения.
            </div>
            <div className='text-[10px] sm:text-[16px] justify-center m-[30px_auto_0_auto] font-bold text-center max-w-[690px] flex items-center gap-[10px]'>
                <div className='min-w-[62px] cursor-pointer h-[62px] relative inline-flex items-center justify-center'>
                    <AutoIco className='w-[40px] h-[40px]' />
                    <Border className='w-full h-full absolute top-0 left-0' />
                </div>
                Начинает игру
            </div>
        </div>
    )
}