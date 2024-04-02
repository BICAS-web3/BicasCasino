import PlinkoGame from '@/components/custom/plinko'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Games - Plinko',
  description: 'Plinko game page '
}

const Plinko = () => {
  return <PlinkoGame />
}

export default Plinko
