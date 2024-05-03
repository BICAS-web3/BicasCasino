import { ICoefficient } from '@/types/games.types'
import { FC } from 'react'

const Coefficient: FC<ICoefficient> = ({ ballsArr }) => {
  return (
    <div className='scrollbar scrollbar-none z-[1] absolute top-[10px] sm:top-5 left-1/2 -translate-x-1/2 flex flex-row-reverse gap-[10px] w-[calc(100%-20px)] sm:w-[calc(100%-262px)] xl:w-[calc(100%-358px)] overflow-x-scroll'>
      {Array.isArray(ballsArr) &&
        ballsArr.length > 0 &&
        ballsArr.map((ball, i) => (
          <div
            className={`text-xs bg-[#181818B2] sm:text-sm font-extrabold rounded-[5px] px-[7px] min-w-12 3xl:min-w-[72px] h-6 3xl:h-9  flex items-center justify-center ${
              ball >= 1 ? 'text-[#2EE941]' : 'text-[#979797]'
            }`}
            key={i}
          >
            {ball?.toFixed(2)}x
          </div>
        ))}
    </div>
  )
}

export default Coefficient
