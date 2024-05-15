import { Poker as GamePoker } from './(components)/Poker'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Games - Poker',
  description: 'Poker game page'
}

const Poker = () => {
  return <GamePoker gameText='text' />
}

export default Poker
