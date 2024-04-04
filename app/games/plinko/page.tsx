import { Metadata } from 'next'
import PlinkoGame from './(components)/plinko'

export const metadata: Metadata = {
  title: 'Games - Plinko',
  description: 'Plinko game page '
}

const Plinko = () => {
  return <PlinkoGame />
}

export default Plinko
