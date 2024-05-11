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
import { WheelSettings } from './game.wheel'
import { MinesSettings } from './game.mines'

const GameMenu = () => {
  const minesGame = usePathname().includes('mines')
  const wheelGame = usePathname().includes('wheel_of_fortune')

  return (
    <div
      className={`bg-[#151515]  border-b border-[#252525] sm:border-none ${
        minesGame && 'game-menu-mines'
      } w-full py-5 px-4 fixed bottom-[52px] z-[2] sm:bottom-auto sm:relative grid flex-col tbs:flex tbs:flex-row items-end sm:rounded-b-[20px]`}
    >
      <GameCreditBet />
      <GameWager />
      <GameAuto />
      {wheelGame && <WheelSettings />}
      {minesGame && <MinesSettings />}
      {/* {minesGame && <GameAmount min={1} max={24} title='Number of mines' />} */}
      <GamePlayBlock />
    </div>
  )
}

export default GameMenu
