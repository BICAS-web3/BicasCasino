'use client'

import { GameLayout as Layout } from '@/components/custom/gameLayout/GameLayout'
import LostMessage from '@/components/custom/lostMessage'
import WinMessage from '@/components/custom/winMessage'
import { GameModel, RegistrModel } from '@/states'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'

function GameLayout({ children }) {
  const [gameStatus, profit, result, multiplier, lost, access_token] = useUnit([
    GameModel.$gameStatus,
    GameModel.$profit,
    GameModel.$result,
    GameModel.$multiplier,
    GameModel.$lost,
    RegistrModel.$access_token
  ])

  return (
    <Layout>
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
    </Layout>
  )
}

export default GameLayout
