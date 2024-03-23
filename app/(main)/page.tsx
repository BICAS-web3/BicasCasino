import { Metadata } from 'next'
import Banner from '@/components/custom/banner'
import GameBanners from '@/components/custom/gameBanners'
export const metadata: Metadata = {
  title: 'GreekKeepers: WEB 3.0 Crypto Games',
  description: 'GreekKeepers: WEB 3.0 Crypto Games'
}
export default function Home() {
  return (
    <>
      <Banner />
      <GameBanners />
    </>
  )
}
