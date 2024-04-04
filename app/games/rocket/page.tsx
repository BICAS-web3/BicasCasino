import { Metadata } from 'next'
import RocketGame from './(components)/rocket.game'

export const metadata: Metadata = {
  title: 'Games - Rocket',
  description: 'Rocket game page '
}

const Rocket = () => {
  return <RocketGame />
}

export default Rocket
