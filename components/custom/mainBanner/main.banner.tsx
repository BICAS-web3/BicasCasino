import Banner from './components/banner'
import Marquee from './components/marquee'
import Preview from './components/preview'

const MainBanner = () => {
  return (
    <>
      <Marquee />
      <Preview className='mt-[15px]' />
      <Banner />
    </>
  )
}

export default MainBanner
