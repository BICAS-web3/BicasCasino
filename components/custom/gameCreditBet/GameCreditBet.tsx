import { FC } from 'react'

interface GameCreditBetProps {}

export const GameCreditBet: FC<GameCreditBetProps> = () => {
  return (
    <div className='grid grid-cols-2 gap-[8px] min-w-[100px] w-[fit-content]'>
      <div className='flex flex-col gap-[4px]'>
        <span className='text-right block font-extrabold leading-[18px] uppercase text-[#7E7E7E] tracking-[4%] text-[14px]'>
          credit
        </span>
        <span className='text-right block font-extrabold leading-[18px] uppercase text-[#7E7E7E] tracking-[4%] text-[14px]'>
          bet
        </span>
      </div>
      <div className='flex flex-col gap-[4px]'>
        <span className='leading-[18px] text-[#7e7e7e] tracking-[4%] text-[14px] font-medium nowrap'>
          8181 <span className='text-[10px] leading-[12px] '>dc</span>
        </span>
        <span className='leading-[18px] text-[#7e7e7e] tracking-[4%] text-[14px] font-medium nowrap '>
          10 <span className='text-[10px] leading-[12px]'>dc</span>
        </span>
      </div>
    </div>
  )
}
