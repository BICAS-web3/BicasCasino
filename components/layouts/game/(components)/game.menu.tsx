import dynamic from 'next/dynamic'
// import GameCreditBet from './game.credit-bet'

const GameCreditBet = dynamic(() => import('./game.credit-bet'), {
  ssr: false,
  loading: () => <Skeleton className='w-10 h-4' />
})

import GamePlayBlock from './game.play-block'
import GameWager from './game.wager'
import { Skeleton } from '@/components/ui/skeleton'

const GameMenu = () => {
  return (
    <div className='bg-[#151515] p-[20px_16px_30px_16px] grid grid-cols-2 md:flex gap-[15px] items-center justify-between rounded-[0_0_20px_20px] '>
      <GameCreditBet />
      <GameWager />
      <GamePlayBlock />
    </div>
  )
}

export default GameMenu
