import { Metadata } from 'next'
import AppleGame from './(components)/wrapper'

export const metadata: Metadata = {
  title: 'Games - Apples',
  description: 'Apples game page'
}

const Apples = () => {
  return <AppleGame />
}

export default Apples
