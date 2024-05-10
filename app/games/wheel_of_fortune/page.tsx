import { Metadata } from 'next'
import WheelGame from './(components)/wheelGame'

export const metadata: Metadata = {
  title: 'Games - Wheel',
  description: 'Wheel game page '
}

const Wheel = () => {
  return <WheelGame />
}

export default Wheel
