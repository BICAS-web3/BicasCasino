import { Metadata } from 'next'
import Card from '@/app/(main)/(components)/Card'
import { Footer } from '@/components/custom/Footer/Footer'
import { CustomBets } from '@/components/custom/CustomBets/CustomBets'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page '
}
export default function Home() {
  return (
    <>
      <section className='space-y-6 pb-8 py-8  md:py-16 lg:py-20 '>
        <CustomBets
          title='Live bets'
          isMainPage={true}
          isGamePage={false}
          game={undefined}
        />
      </section>
    </>
  )
}
