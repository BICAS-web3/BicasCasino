import dynamic from 'next/dynamic'
// import GameCreditBet from './game.credit-bet'

const GameCreditBet = dynamic(() => import('./game.credit-bet'), {
  ssr: false,
  loading: () => <Skeleton className='w-10 h-4' />
})

import GamePlayBlock from './game.play-block'
import GameWager from './game.wager'
import GameAmount from './game.amount'
import { Skeleton } from '@/components/ui/skeleton'
import { usePathname } from 'next/navigation'

const GameMenu = () => {
  const minesGame = usePathname().includes('mines')
  return (
    <div className='bg-[#151515] py-5 px-4 flex flex-wrap gap-5 items-center rounded-b-[20px] '>
      <GameCreditBet />
      <GameWager />

      {minesGame ? (
        <GameAmount min={1} max={24} title='Number of mines' />
      ) : null}
      <GamePlayBlock />
    </div>
  )
}

export default GameMenu
