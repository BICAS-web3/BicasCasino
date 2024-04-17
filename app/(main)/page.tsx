import { Metadata } from 'next'

const Banner = dynamic(() => import('./(components)/main.banner'), {
  loading: () => (
    <div className='flex flex-nowrap gap-x-5 gap-y-4 h-[240px] w-full'>
      {[...Array(3)].map((_, index) => (
        <div
          className='w-[507px] h-[240px]'
          key={`main-banner-skeleton--${index}`}
        >
          <Skeleton className='h-full w-full rounded-xl' key={index} />
        </div>
      ))}
    </div>
  ),
  ssr: false
})

import GameBanners from './(components)/game.banners'

const MarqueeLine = dynamic(() => import('./(components)/marquee'), {
  loading: () => (
    <div className='flex justify-between items-center flex-nowrap gap-x-2 gap-y-4 h-[50px] w-full'>
      <Skeleton className='h-full flex-1 rounded-xl' />
      <Skeleton className='h-full w-40 rounded-xl' />
      <Skeleton className='h-full w-40 rounded-xl' />
    </div>
  ),
  ssr: false
})
import Preview from './(components)/preview'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'GreekKeepers: WEB 3.0 Crypto Games',
  description: 'GreekKeepers: WEB 3.0 Crypto Games'
}
const Home = () => (
  <div className='flex flex-col px-0 sm:px-10 py-2 sm:py-5 mx-auto max-w-full sm:max-w-screen-2xl overflow-hidden w-full h-full'>
    <MarqueeLine />
    <Preview className='mt-[15px]' />
    <div className='px-[15px]'>
      <Banner />
      <GameBanners className='mt-[15px]' />
    </div>
  </div>
)
export default Home
