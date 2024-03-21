import { Metadata } from 'next'
import Card from '@/app/(main)/(components)/Card'
import { Footer } from '@/components/custom/Footer/Footer'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page '
}
export default function Home() {
  return (
    <>
      <section className='space-y-6 pb-8 py-8  md:py-16 lg:py-20 '>
        <Footer />
      </section>
    </>
  )
}
