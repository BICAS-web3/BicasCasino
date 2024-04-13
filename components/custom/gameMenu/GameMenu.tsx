import { FC } from 'react'
import { GameCreditBet } from '../gameCreditBet/GameCreditBet'
import { GameWager } from '../gameWager/GameWager'
import { GamePlayBlock } from '../gamePlayBlock/GamePlayBlock'
import { usePathname } from 'next/navigation'
import GameAmount from '../gameAmount'

interface GameMenuProps {}

export const GameMenu: FC<GameMenuProps> = () => {
  const path = usePathname()

  return (
    <div className='bg-[#151515] p-[20px_16px_30px_16px] grid grid-cols-2 md:flex gap-[15px] items-center justify-between rounded-[0_0_20px_20px] '>
      <GameCreditBet />
      <GameWager />
      <div className='flex items-center gap-[172px]'>
        {path.includes('mines') && (
          <GameAmount min={1} max={24} title='Number of mines' />
        )}
        <GamePlayBlock />
      </div>
    </div>
  )
}
