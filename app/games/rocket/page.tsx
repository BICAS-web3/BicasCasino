import RocketGame from '@/components/custom/rocketGame'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Games - Rocket',
  description: 'Rocket game page '
}

const Rocket = () => {
  return <RocketGame />
}

export default Rocket
