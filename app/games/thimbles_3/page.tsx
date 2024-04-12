import { ThimblesGame } from './(components)/ThimblesGame'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Games - Thimbles',
  description: 'Thimbles game page '
}

const Thimbles = () => {
  return <ThimblesGame />
}

export default Thimbles
