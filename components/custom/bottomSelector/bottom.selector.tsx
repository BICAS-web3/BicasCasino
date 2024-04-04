import { cn } from '@/lib/utils'
import { FC } from 'react'

interface IBottomSelector {
    onClick?: (el: any) => void
    data: number[]
}

const BottomSelector: FC<IBottomSelector> = ({ onClick, data }) => {
    return (
        <div
            className={
                'flex bg-black-acc rounded-b-[12px] sm:rounded-b-[12px] overflow-hidden'
            }
        >
            {data.map(cNumber => (
                <div
                    key={cNumber}
                    className={cn(
                        'flex items-center justify-center cursor-pointer w-[50px] border-r border-[#3e3e3e]',
                        'group hover:bg-[#2e2e2e] last:border-none',
                        'px-[10px] h-[30px] w-full'
                    )}
                    onClick={onClick?.bind('', cNumber)}
                >
                    <span
                        className={cn(
                            'group-hover:text-white-acc',
                            'text-grey-acc text-center text-xs font-bold uppercase'
                        )}
                    >
                        {cNumber}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default BottomSelector
