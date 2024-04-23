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
import { GameAuto } from './game.auto'

const GameMenu = () => {
  const minesGame = usePathname().includes('mines')

  return (
    <div className={`bg-[#151515] ${minesGame && 'game-menu-mines'} py-5 px-4 relative grid flex-col tbs:flex tbs:flex-row items-center rounded-b-[20px]`}>
      <GameCreditBet />
      <GameWager />
      <GameAuto />

      {minesGame ? (
        <GameAmount min={1} max={24} title='Number of mines' />
      ) : null}
      <GamePlayBlock />
    </div>
  )
}

export default GameMenu
