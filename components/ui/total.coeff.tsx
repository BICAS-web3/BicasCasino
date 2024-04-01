import { FC } from 'react'

interface ITotalCoeff {
    className?: string
    fullWon: number
    fullLost: number
    totalValue: number
}

const TotalCoeff: FC<ITotalCoeff> = props => {
    const { className, fullLost, fullWon, totalValue } = props

    return (
        <div
            className={`gap-0 text-[0.625rem] sm:text-xs xl:text-sm xl:gap-[5px] absolute bottom-[10px] left-[10px] z-[2] text-white flex flex-col font-bold ${className}`}
        >
            <span className='text-[#4ed26c]'>{fullWon.toFixed(2)}</span>
            <span className='text-[#fc3c37]'>{fullLost.toFixed(2)}</span>
            <div>
                Total:&nbsp;
                <span
                    className={
                        totalValue > 0 ? 'text-[#4ed26c]' : 'text-[#fc3c37]'
                    }
                >
                    {Math.abs(totalValue).toFixed(2)}
                </span>
            </div>
        </div>
    )
}

export default TotalCoeff
