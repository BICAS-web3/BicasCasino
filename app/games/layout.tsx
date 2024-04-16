'use client'

import LostMessage from '@/components/custom/lostMessage'
import WinMessage from '@/components/custom/winMessage'
import GameLayout from '@/components/layouts/game/game.layout'
import { GameModel } from '@/states'
import { useUnit } from 'effector-react'

function Layout({ children }) {
  const [gameStatus, profit, result, multiplier, lost] = useUnit([
    GameModel.$gameStatus,
    GameModel.$profit,
    GameModel.$result,
    GameModel.$multiplier,
    GameModel.$lost
  ])

  return (
    <GameLayout>
      <>
        {gameStatus === GameModel.GameStatus.Won && (
          <WinMessage
            resIco={result?.coin_id}
            multiplier={Number(multiplier.toFixed(2)).toString()}
            cf={100}
            profit={profit}
          />
        )}
        {gameStatus == GameModel.GameStatus.Lost && (
          <div
            className='left-[calc(50%-72px)] top-auto sm:top-[-1px] sm:left-[calc(50%-90.405px)] sm:bottom-auto bottom-0 absolute z-[7] min-w-max'
            data-winlostid='win_message'
          >
            <LostMessage amount={lost.toFixed(2)} />
          </div>
        )}
        {children}
      </>
    </GameLayout>
  )
}

export default Layout
