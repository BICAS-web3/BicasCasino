import { Metadata } from 'next'

import RPSGame from './(components)/PRSGame'

export const metadata: Metadata = {
  title: 'Games - RPS',
  description: 'RPS game page '
}

const RPS = () => {
  return <RPSGame />
}

export default RPS
