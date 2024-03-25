import { Metadata } from 'next'
import { Footer } from '@/components/custom/footer/Footer'
import { CustomBets } from '@/components/custom/CustomBets/CustomBets'
import { FeedbackSection } from '@/components/custom/feedbackSection/FeedbackSection'
import { Total } from '@/components/custom/total/Total'

import GameBanners from '@/components/custom/gameBanners'
import MainBanner from '@/components/custom/mainBanner'

export const metadata: Metadata = {
  title: 'GreekKeepers: WEB 3.0 Crypto Games',
  description: 'GreekKeepers: WEB 3.0 Crypto Games'
}
export default function Home() {
  return (
    <div className='flex flex-col max-w-[1562px] mx-auto'>
      {/* <MainBanner />
      <GameBanners className='mt-[15px]' /> */}
      <Total />
      <CustomBets
        title='Live bets'
        isMainPage={true}
        isGamePage={false}
        game={undefined}
      />
      <FeedbackSection />
    </div>
  )
}
