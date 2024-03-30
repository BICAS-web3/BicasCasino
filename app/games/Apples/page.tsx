import AppleGame from '@/components/custom/appleGame'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Games - Apples',
  description: 'Apples game page '
}

const Apples = () => {
  return <AppleGame />
}

export default Apples
