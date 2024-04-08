import { Metadata } from 'next'
import MinesGame from './(components)/MinesGame'

export const metadata: Metadata = {
  title: 'Games - Wheel',
  description: 'Wheel game page '
}

const Wheel = () => {
  return <MinesGame />
}

export default Wheel
