import { Metadata } from 'next'
import 'swiper/css/effect-fade'
import 'swiper/css'
import GameBanners from '@/components/custom/gameBanners'
import MainBanner from '@/components/custom/mainBanner'

export const metadata: Metadata = {
  title: 'GreekKeepers: WEB 3.0 Crypto Games',
  description: 'GreekKeepers: WEB 3.0 Crypto Games'
}
const Home = () => {
  return (
    <>
      <MainBanner />
      <GameBanners className='mt-[15px]' />
    </>
  )
}

export default Home
