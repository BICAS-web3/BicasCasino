import {FC} from 'react'
import Prev from '@/public/images/mell/prev.svg'
import Next from '@/public/images/mell/next.svg'
import Close from '@/public/images/mell/close.svg'
import Border from '@/public/images/mell/borderImg.svg'
import Minus from '@/public/images/mell/minus.svg'
import Plus from '@/public/images/mell/plus.svg'

interface SettMenuProps {}

export const SettMenu:FC<SettMenuProps> = () => {
    return (
        <div className='flex flex-col items-center'>
            <h2 className="text-[26px] text-center font-bold uppercase mb-[14px]">меню настроек</h2>
            <p className="text-[16px] text-center font-bold block mb-[8px]">
                ЗАСТАВКА - включает и выключает заставку.
            </p>
            <p className="text-[16px] text-center font-bold block mb-[8px]">
                ФОНОВАЯ МУЗЫКА - включает и выключает фоновую музыку игры.
            </p>
            <p className="text-[16px] text-center font-bold block mb-[8px]">
                ЗВУКОВЫЕ ЭФФЕКТЫ - включает и выключает звуковые эффекты игры.
            </p>
            <p className="text-[16px] text-center font-bold block mb-[8px]">
                ИСТОРИЯ ИГРЫ - открывает страницу истории игры.
            </p>
            <h2 className="text-[26px] text-center font-bold uppercase mt-[30px] mb-[14px] tracking-[4%]">ИНФОРМАЦИОННЫЙ ЭКРАН</h2>
            <p className="text-[16px] font-bold flex items-center gap-[10px] mb-[8px]">
                <Prev className='w-[32px] h-[32px]' />
                и
                <Next className='w-[32px] h-[32px]' /> Перелистывают информационные страницы.
            </p>
            <p className="text-[16px] font-bold text-center flex items-center gap-[10px] mb-[8px]">
                <Close className='w-[32px] h-[32px]' />
                Закрывает информационны экран.
            </p>
            <h2 className="text-[26px] text-center font-bold uppercase mt-[30px] mb-[14px]">меню ставок</h2>
            <p className="text-[16px] font-bold block mb-[8px]">
                В меню ставок отображается множитель ставки, доступный в игре, и текущая общая ставка в монетах и деньгах.
            </p>
            <p className="text-[16px] font-bold text-center flex items-center gap-[10px] mb-[8px]">
                Для изменения значений используйте кнопки 
                <div className='w-[40px] cursor-pointer h-[40px] relative inline-flex items-center justify-center'>
                    <Plus />
                    <Border className='w-full h-full absolute top-0 left-0' />
                </div>
                и
                <div className='w-[40px] cursor-pointer  h-[40px] relative inline-flex items-center justify-center'>
                    <Minus />
                    <Border className='w-full h-full absolute top-0 left-0' />
                </div>
                в полях «Ставка» и «Значение монеты».
            </p>
            <p className="text-[16px] text-center font-bold block mb-[8px]">
                Максимальная сумма выигрыша ограничена 5000X от суммы ставки.
            </p>
            <p className="text-[16px] text-center font-bold block mb-[8px]">
                Если общий выигрыш раунда достигает 5000X от суммы ставки, раунд немедленно заканчивается, выигрыш присуждается до установленного лимита, а все оставшиеся функции аннулируются.
            </p>
        </div>
    )
}