import { FC } from 'react'
import DcIco from '@/public/images/tokens/DRAX.svg'
import { Input } from '@/components/ui/input'
import {
  BonusCoinSVG,
  DraxMiniSVG
} from '@/components/custom/header/components/icons'
import { Button } from '@/components/ui/button'
import { BetItem } from './BetItem'

export const bets = ['min', '/2', 'x2', 'max']

interface GameWagerProps {}

export const GameWager: FC<GameWagerProps> = () => {
  return (
    <div className='w-[fit-content] m-[0_auto] col-start-1 col-end-3  row-start-1 flex flex-col gap-[8px]'>
      <div className='flex items-center justify-between'>
        <span className='text-[14px] font-semibold leading-[20px] tracking-[4%] text-[#7e7e7e]'>
          Wager
        </span>
        <span className='text-[13px] font-medium leading-[18.5px] tracking-[4%] text-[#7e7e7e]'>
          Max: 0
        </span>
      </div>
      <div className='rounded-[20px] border-[1px] h-[36px] pl-[10px] flex items-center border-[#363636] '>
        <div className='flex items-center gap-[15px] w-full max-w-[140px] pr-[10px] '>
          <Input
            type='number'
            placeholder='0.0000'
            variant='borderNone'
            className='placeholder-[#eaeaea] w-full '
          />
          <DraxMiniSVG className='min-w-[14px] h-[14px] aspect-square object-contain' />
        </div>
        {bets.map((bet, ind) => (
          <BetItem key={ind} value={bet} id={ind} />
        ))}
      </div>
    </div>
  )
}
