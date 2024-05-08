import {FC} from 'react'

interface AutoplayProps {}

export const Autoplay:FC<AutoplayProps> = () => {
    return (
        <div className='flex flex-col h-full items-center justify-center'>
            <div className='max-w-[810px] text-center'>
                <h2 className="text-[12px] sm:text-[26px] font-bold uppercase mb-[14px]">автоигра</h2>
                <p className="text-[10px] sm:text-[16px] font-bold block mb-[8px]">
                    Нажмите кнопки, показывающие количество возможных автоспинов, чтобы начать автоигру.
                </p>
                <p className="text-[10px] sm:text-[16px] font-bold block mb-[8px]">
                    Опция НЕ ПОКАЗЫВАТЬ ЭКРАНЫ автоматически пропускает экраны начала и окончания особых функций игры после короткого промежутка времени.
                </p>
            </div>
        </div>
    )
}