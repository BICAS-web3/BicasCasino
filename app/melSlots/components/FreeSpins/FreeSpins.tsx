import {FC} from 'react'

interface FreeSpinsProps {}

export const FreeSpins:FC<FreeSpinsProps> = () => {
    return (
        <div className='h-[auto] sm:h-full flex flex-col items-center justify-center'>
            <h2 className="text-[12px] sm:text-[26px] font-bold uppercase mb-[14px]">правила бесплатных спинов</h2>
            <p className="text-[10px] sm:text-[16px] max-w-[850px] text-center font-semibold block mb-[14px]">
                Функция “Бесплатных спинов” присуждается, когда 4 или более символов MELLSPIN выпадают в любом месте экрана.
            </p>
            <p className="text-[10px] sm:text-[16px] max-w-[850px] text-center font-semibold mb-[14px]">
                Раунд начинается с 15 бесплатных спинов.
            </p>
            <p className="text-[10px] sm:text-[16px] max-w-[850px] text-center font-semibold mb-[14px]">
                Во время раунда БЕСПЛАТНЫХ СПИНОВ всякий раз, когда выпадает символ МНОЖИТЕЛЬ и спин приводит к выигрышу, значение МНОЖИТЕЛЬ добавляется к общему коэффициенту. В течении всего раунда, всякий раз, когда появляется новый символ МНОЖИТЕЛЬ, который приводит к выигрышу, общее значение множителя также используется для умножения выигрыша.
            </p>
            <p className="text-[10px] sm:text-[16px] max-w-[850px] text-center font-semibold mb-[14px]">
                Всякий раз, когда 3 или более символов MELLSPIN появляются во время РАУНДА БЕСПЛАТНЫХ СПИНОВ,присуждается 5 дополнительных бесплатных спинов. Во время раунда бесплатных спинов специальные барабаны учавствуют в игре.
            </p>
        </div>
    )
}