import {FC} from 'react'
import en1 from '@/public/images/mell/en1.png'
import en2 from '@/public/images/mell/en2.png'
import en3 from '@/public/images/mell/en3.png'
import en4 from '@/public/images/mell/en4.png'
import en5 from '@/public/images/mell/en5.png'

interface FallProps {}

export const Fall:FC<FallProps> = () => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-center text-[26px] font-bold block mb-[8px] uppercase w-full'>функция “падение”</h1>
            <p className="text-[16px] uppercase font-bold max-w-[800px] mb-[8px] text-center">
                Функция “падение” означает, что после каждого спина, выигрышные комбинации оплачиваются и все выигрышные символы исчезают. Оставшиеся символы падают вниз экрана и пустые позиции заменяются символами, падающими сверху.
            </p>
            <p className="text-[16px] uppercase block mb-[8px] font-bold max-w-[800px] text-center">
                Падение продолжится до тех пор, пока не останется выигрышныхкомбинаций в результате падения. ограничений по количеству падений нет.
            </p>
            <p className="text-[16px] uppercase font-bold max-w-[800px] text-center">
                Все выигрыши добавляются к балансу игрока после того, как все падения, случившиеся в результате базового спина, были сыграны.
            </p>
            <div className='flex items-center gap-[5vw] mt-[45px] mb-[45px]'>
                <img src={en1.src} alt='en' />
                <img src={en2.src} alt='en' />
                <img src={en3.src} alt='en' />
                <img src={en4.src} alt='en' />
                <img src={en5.src} alt='en' />
            </div>
            <p className='text-[16px] text-center max-w-[850px] font-semibold leading-[22px]'>
                Это символы “множитель”. Они присутствуют на всех барабанах и могут случайным образом выпадать во время спинов и падений как в основной игре, так и в Бесплатных спинах.
            </p>
            <p className='text-[16px] text-center max-w-[850px] font-semibold leading-[22px]'>
                Каждый раз, когда выпадает символ Multiplier, он принимает случайное значение множителя 2х, 3х, 4х, 5х, 8х, 10х, 12х, 15х, 20х, 25х, 50х, 100х, 250х или  500х.
            </p>
            <p className='text-[16px] text-center max-w-[850px] font-semibold leading-[22px]'>
            Когда последовательность падений заканчивается, значения всех символов МНОЖИТЕЛЬ на экране суммируются, и общий выигрыш последовательности умножается на окончательное значение.
            </p>
        </div>
    )
}