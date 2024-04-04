import { Metadata } from 'next'
import CoinFlipGame from './(components)/coinflip'

export const metadata: Metadata = {
  title: 'Games - CoinFlip',
  description: 'CoinFlip game page '
}

const CoinFlip = () => {
  return <CoinFlipGame />
}

export default CoinFlip
