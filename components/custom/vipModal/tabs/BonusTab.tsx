import {FC} from 'react'

const bonusList = [
    {
        title: 'Welcome Vip Bonus'
    },
    {
        title: 'Level 4 Up Bonus'
    },
    {
        title: 'Level 5 Up Bonus'
    },
    {
        title: 'Level 6 Up Bonus'
    },
    {
        title: 'Level 7 Up Bonus'
    },
    {
        title: 'Level 8 Up Bonus'
    },
    {
        title: 'Level 9 Up Bonus'
    },
    {
        title: 'Level 10 Up Bonus'
    },
]

interface BonusTabProps {}

export const BonusTab:FC<BonusTabProps> = () => {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <span className="text-[16px] text-[#979797] font-semiboldd">Title</span>
                <span className="text-[16px] text-[#979797] font-semiboldd">Operation</span>
            </div>
            <div className='flex flex-col gap-[14px] mt-[10px]'>
                {
                    bonusList.map((item, ind) => (
                        <div className='flex items-center justify-between gap-[10px]'>
                            <span className='text-[16px] text-[#979797] font-semibold'>{item.title}</span>
                            <button className="bg-[#202020] border min-w-[120px] h-[40px] border-[#363636] rounded-[5px] flex items-center justify-center text-[#7E7E7E] text-[16x] font-medium">Claim</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}