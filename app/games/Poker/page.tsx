import { Poker as GamePoker } from '@/components/custom/poker/Poker'
import { Metadata } from 'next'
import GameLayout from '../layout'

export const metadata: Metadata = {
  title: 'Games - Poker',
  description: 'Poker game page '
}

const Poker = () => {
  return (
    <GameLayout>
      <GamePoker gameText='text' />
    </GameLayout>
  )
}

export default Poker
