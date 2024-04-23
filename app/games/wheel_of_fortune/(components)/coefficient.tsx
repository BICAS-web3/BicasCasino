import { cn } from '@/lib/utils'
import { GameModel } from '@/states'
import { useUnit } from 'effector-react'

const Coefficient = ({ coefficientData }: { coefficientData: any }) => {
  const [level, pickedValue] = useUnit([
    GameModel.$level,
    GameModel.$pickedValue
  ])
  return (
    <div className='w-[calc(100%-20px)] top-2.5 sm:w-[calc(100%-262px)] xl:w-[calc(100%-358px)] 3xl:w-[calc(100%-398px)] gap-2.5 overflow-x-scroll flex flex-row-reverse -translate-x-1/2 absolute t-5 left-1/2'>
      {coefficientData.map((item, i) => (
        <div
          className={cn(
            'font-extrabold text-[0.9375rem] h-[30px] w-20 xl:h-9 xl:w-[72px] rounded-[5px] flex justify-center items-center px-2.5 xl:text-sm bg-[#181818B2]',
            level === 'Hard' &&
              item > 0 &&
              item < 10 &&
              'text-[#458bf5] shadow-[0px_0px_10px_rgba(69,139,245,0.3)]',
            level === 'Hard' &&
              item > 11 &&
              'text-[#fb2e90] shadow-[0px_0px_10px_rgba(245,87,162,0.3)]',
            level === 'Easy' &&
              item > 1.3 &&
              'text-[#3ecf55] shadow-[0px_0px_10px_rgba(62,207,85,0.3)]',
            level === 'Easy' &&
              item > 0 &&
              item < 1.3 &&
              'text-[#458bf5] shadow-[0px_0px_10px_rgba(69,139,245,0.3)]',
            level === 'Medium' &&
              item > 0 &&
              item < 1.6 &&
              'text-[#458bf5] shadow-[0px_0px_10px_rgba(69,139,245,0.3)]',
            level === 'Medium' &&
              item == 2 &&
              'text-[#fbc02e] shadow-[0px_0px_10px_rgba(251,192,46,0.3)]',
            (pickedValue === 10 || pickedValue === 20 || pickedValue === 30) &&
              level === 'Medium' &&
              item < 1.6 &&
              item > 0 &&
              'text-[#458bf5] shadow-[0px_0px_10px_rgba(69,139,245,0.3)]',
            (pickedValue === 10 || pickedValue === 20 || pickedValue === 30) &&
              level === 'Medium' &&
              item < 2 &&
              item > 1.6 &&
              'text-[#fb2e90] shadow-[0px_0px_10px_rgba(245,87,162,0.3)]',
            (pickedValue === 40 || pickedValue === 50) &&
              level === 'Medium' &&
              item == 3 &&
              'text-[#fb2e90] shadow-[0px_0px_10px_rgba(245,87,162,0.3)]',
            (pickedValue === 10 || pickedValue === 20 || pickedValue === 30) &&
              level === 'Medium' &&
              item == 3 &&
              'text-[#3ecf55] shadow-[0px_0px_10px_rgba(62,207,85,0.3)]',
            level === 'Medium' &&
              pickedValue === 30 &&
              item == 4 &&
              'text-[red]',
            level === 'Medium' &&
              pickedValue === 40 &&
              item == 1.6 &&
              'text-[#3ecf55] shadow-[0px_0px_10px_rgba(62,207,85,0.3)]',
            level === 'Medium' &&
              pickedValue === 50 &&
              item == 5 &&
              'text-[#3ecf55] shadow-[0px_0px_10px_rgba(62,207,85,0.3)]',
            level === 'Medium' &&
              item < 0.1 &&
              'text-[#979797] shadow-[0px_0px_10px_rgba(255,255,255,0.3)]',
            level === 'Hard' &&
              item < 0.1 &&
              'text-[#979797] shadow-[0px_0px_10px_rgba(255,255,255,0.3)]',
            level === 'Easy' &&
              item < 0.1 &&
              'text-[#979797] shadow-[0px_0px_10px_rgba(255,255,255,0.3)]'
          )}
          key={i}
        >
          {item?.toFixed(2)}x
        </div>
      ))}
    </div>
  )
}

export default Coefficient
