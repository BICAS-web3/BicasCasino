import { Metadata } from 'next'
import { Footer } from '@/components/custom/footer/Footer'
import { CustomBets } from '@/components/custom/customBets/CustomBets'
import { FeedbackSection } from '@/components/custom/feedbackSection/FeedbackSection'
import { Total } from '@/components/custom/total/Total'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page '
}
export default function Home() {
  return (
    <>
      <section className='space-y-6 pb-8 py-8  md:py-16 lg:py-20 '>
        <Total />
        <CustomBets
          title='Live bets'
          isMainPage={true}
          isGamePage={false}
          game={undefined}
        />
        <FeedbackSection />
      </section>
    </>
  )
}
