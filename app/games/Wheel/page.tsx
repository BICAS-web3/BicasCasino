import WheelGame from '@/components/custom/wheelGame'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Games - Wheel',
  description: 'Wheel game page '
}

const Wheel = () => {
  return <WheelGame/>
}

export default Wheel
