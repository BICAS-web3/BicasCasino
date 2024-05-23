import dynamic from 'next/dynamic'
// import GameCreditBet from './game.credit-bet'

const GameCreditBet = dynamic(() => import('./game.credit-bet'), {
  ssr: false,
  loading: () => <Skeleton className='w-10 h-4' />
})

import { Skeleton } from '@/components/ui/skeleton'
import { usePathname } from 'next/navigation'
import { GameAuto } from './game.auto'
import { MinesSettings } from './game.mines'
import GamePlayBlock from './game.play-block'
import GameWager from './game.wager'
import { WheelSettings } from './game.wheel'
import { PlinkoSettings } from './game.plinko'
import { GameRollOver } from './game.rollover'

const GameMenu = () => {
  const minesGame = usePathname().includes('mines')
  const wheelGame = usePathname().includes('wheel_of_fortune')
  const plinkoGame = usePathname().includes('plinko')

  return (
    <div
      className={`bg-[#151515]  border-b border-[#252525] sm:border-none ${
        minesGame && 'game-menu-mines'
      } w-full py-5 px-4 relative  z-[5] sm:z-[2] sm:bottom-auto sm:relative grid flex-col tbs:flex tbs:flex-row items-end sm:rounded-b-[20px]`}
    >
      <GameCreditBet />
      <GameWager />
      <GameAuto />
      {wheelGame && <WheelSettings />}
      {minesGame && <MinesSettings />}
      {plinkoGame && <PlinkoSettings />}
      {/* {minesGame && <GameAmount min={1} max={24} title='Number of mines' />} */}
      <GamePlayBlock />
      {/* <GameRollOver /> */}
    </div>
  )
}

export default GameMenu
