'use client'

import WinMessage from '@/components/custom/winMessage'
import GameLayout from '@/components/layouts/game/game.layout'
import { GameModel } from '@/states'
import { useUnit } from 'effector-react'
import { usePathname } from 'next/navigation'

function Layout({ children }) {
  const [gameStatus, profit, result, multiplier, lost] = useUnit([
    GameModel.$gameStatus,
    GameModel.$profit,
    GameModel.$result,
    GameModel.$multiplier,
    GameModel.$lost
  ])
  const isWheel = usePathname().includes('wheel_of_fortune')

  return <GameLayout>{children}</GameLayout>
}

export default Layout
