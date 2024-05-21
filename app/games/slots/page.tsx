import { Metadata } from 'next'
import { SlotsGame } from './components/SlotsGame'

export const metadata: Metadata = {
  title: 'Games - Slots',
  description: 'Slots game page '
}

const Slots = () => {
  return <SlotsGame />
}

export default Slots
