import { Metadata } from 'next'
import MinesGame from './(components)/MinesGame'

export const metadata: Metadata = {
  title: 'Games - Mines',
  description: 'Mines game page'
}

const Wheel = () => {
  return <MinesGame />
}

export default Wheel
