import { cn } from '@/lib/utils'

interface ITotalCoeff {
    className?: string
    fullWon: number
    fullLost: number
    totalValue: number
}

const TotalCoeff = ({
    className,
    fullLost,
    fullWon,
    totalValue
}: ITotalCoeff) => (
    <div
        className={cn(
            'gap-0 text-[0.625rem] sm:text-xs xl:text-sm xl:gap-[5px]',
            'absolute bottom-[10px] left-[10px] z-[2] text-white flex flex-col font-bold',
            className
        )}
    >
        <span className='text-[#4ed26c]'>{fullWon.toFixed(2)}</span>
        <span className='text-[#fc3c37]'>{fullLost.toFixed(2)}</span>
        <div>
            Total:&nbsp;
            <span
                className={cn(
                    totalValue > 0 && 'text-[#4ed26c]',
                    totalValue < 0 && 'text-[#fc3c37]'
                )}
            >
                {Math.abs(totalValue).toFixed(2)}
            </span>
        </div>
    </div>
)

export default TotalCoeff
