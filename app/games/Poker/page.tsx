import { Poker as PokerGame } from '@/components/custom/poker/Poker'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Games - Poker',
  description: 'Poker game page '
}

const Poker = () => {
  return <PokerGame gameText='test' />
}

export default Poker
