import { GamePage } from '@/components/custom/gameLayout/GamePage/GamePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Games - Poker',
  description: 'Poker game page '
}

const Poker = () => {
  return (
    <GamePage
      isPoker={true}
      wagerContent={<h1>h</h1>}
      gameInfoText='s'
      gameTitle='s'
    >
      poker
    </GamePage>
  )
}

export default Poker
