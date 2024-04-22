import { SlotsGame } from '@/components/custom/slots/SlotsGame'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Games - Slots',
  description: 'Slots game page '
}

const Slots = () => {
  return <SlotsGame />
}

export default Slots
