import { FC } from 'react'

interface IBall {
    index: number
    value: number
}

interface ICoefficient {
    ballsArr: IBall[] | any[]
    multipliers?: any
}

const Coefficient: FC<ICoefficient> = props => {
    const { ballsArr, multipliers } = props
    return (
        <div className='absolute top-12 sm:top-5 left-1/2 -translate-x-1/2 flex flex-row-reverse gap-[10px] w-[calc(100%-20px)] sm:w-[calc(100%-262px)] xl:w-[calc(100%-358px)] overflow-x-scroll'>
            {ballsArr
                .sort((a, b) => b.index - a.index)
                .map(
                    (ball, i) =>
                        multipliers[ball.value] && (
                            <div
                                className={`text-xs sm:text-sm xl:text-lg font-black rounded-[5px] w-12 xl:w-[60px] h-6 xl:h-10 flex items-center justify-center ${
                                    multipliers[ball.value] === 1
                                        ? 'text-[#eaeaea]'
                                        : multipliers[ball.value] > 1
                                        ? 'bg-[#1ea42b]'
                                        : 'bg-[#2e2e2e]'
                                }`}
                                key={i}
                            >
                                {multipliers[ball.value]}x
                            </div>
                        )
                )}
        </div>
    )
}

export default Coefficient
