import { Metadata } from 'next'
import { CarsRace } from './components/CarsRace'

export const metadata: Metadata = {
  title: 'Games - Cars',
  description: 'Cars game page '
}

const Cars = () => {
  return <CarsRace gameText='text' />
}

export default Cars