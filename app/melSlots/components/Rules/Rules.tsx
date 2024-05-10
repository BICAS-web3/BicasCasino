import {FC} from 'react'

interface RulesProps {}

export const Rules:FC<RulesProps> = () => {
    return (
        <div className='h-[auto] sm:h-full flex flex-col items-center justify-center'>
            <h2 className="text-[12px] sm:text-[26px] font-bold uppercase mb-[14px]">правила игры</h2>
            <p className="text-[10px] sm:text-[16px] max-w-[812px] text-center font-semibold block mb-[8px]">
                Игры с высокой волатильностью в среднем платят реже, но шанс получить большие выигрыши за короткий промежуток времени - выше.
            </p>
            <p className="text-[10px] sm:text-[16px] max-w-[812px] text-center font-semibold block mb-[8px]">
                Символы оплачиваются в любом месте.
            </p>
            <p className="text-[10px] sm:text-[16px] max-w-[812px] text-center font-semibold block mb-[8px]">
                Все выигрыши умножаются на значение основной ставки.
            </p>
            <p className="text-[10px] sm:text-[16px] max-w-[812px] text-center font-semibold block mb-[8px]">
                Все значения выражены как реальные выигрыши в монетах.
            </p>
            <p className="text-[10px] sm:text-[16px] max-w-[812px] text-center font-semibold block mb-[8px]">
                В случае выигрыша с несколькими символами, все выигрыши добавляются к общему выигрышу.
            </p>
            <p className="text-[10px] sm:text-[16px] max-w-[812px] text-center font-semibold block mb-[8px]">
                Во время бесплатных спинов выигрыш присуждается игроку после завершения раунда.
            </p>
            <p className="text-[10px] sm:text-[16px] max-w-[812px] text-center font-semibold block mb-[8px]">
                Общий выигрыш бесплатных спинов в истории содержит весь выигрыш цикла.
            </p>
            <p className="text-[10px] sm:text-[16px] max-w-[812px] text-center font-semibold block mt-[13px] sm:mt-[30px]">
                Теоретический возврат игроку у этой игры 96.50%
            </p>
            <div className='mt-[15px] sm:mt-[30px] flex flex-col gap-[0px]'>
                <span className="text-[10px] sm:text-[16px] uppercase font-bold">минимальная ставка: $0.20</span>
                <span className="text-[10px] sm:text-[16px] uppercase font-bold">максимальная ставка: $50</span>
            </div>
        </div>
    )
}