import { Poker as GamePoker } from '@/app/games/Poker/components/poker/Poker'
import { Metadata } from 'next'
import GameLayout from '../layout'

export const metadata: Metadata = {
  title: 'Games - Poker',
  description: 'Poker game page '
}

const Poker = () => {
  return <GamePoker gameText='text' />
}

export default Poker
