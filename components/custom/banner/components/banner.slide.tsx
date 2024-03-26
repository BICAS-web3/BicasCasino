import { FC, useEffect, useState } from 'react'
import 'swiper/css/effect-fade'
import 'swiper/css'

import { cn } from '@/lib/utils'

import Button from './banner.button'
import { KycSVG, TgSVG } from './icons'
import Text from './banner.text'

interface ISlide {
  text?: string
  subTitle?: string
  isBtn?: boolean
  img?: any
  btnFirstText?: string
  btnSecondText?: string
  imgMob?: any
  subText?: string
  extraText?: string
}

interface IBannerSlide {
  ind: number
  slide: ISlide
}

const BannerSlide: FC<IBannerSlide> = ({ ind, slide }) => {
  const [is650, setIs650] = useState(false)
  const [is700, setIs700] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 700 && width > 650) {
        setIs650(false)
        setIs700(true)
      } else if (width < 650) {
        setIs650(true)
        setIs700(false)
      } else {
        setIs650(false)
        setIs700(false)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <img
        className={cn(
          'absolute w-full left-0 top-0 right-0 bottom-0 h-full',
          'rounded-[0] sm:rounded-[20px] border border-black-acc object-cover',
          ind === 8 && 'w-auto -l-[120px] sm:-l-[280px] md:w-full',
          'first:right-[-100px] sm:first:right-0'
        )}
        src={
          (slide.imgMob && is700) || (slide.imgMob && is650)
            ? slide.imgMob.src
            : slide.img.src
        }
        alt='slide-imd'
        data-id={ind + 1}
      />
      {slide?.text && (
        <Text withText={slide.subText ? true : false} ind={ind} type='text'>
          {slide.text}
        </Text>
      )}
      {slide.subText && (
        <Text ind={ind} type='subText'>
          {slide.subText}
        </Text>
      )}
      {slide.extraText && (
        <Text ind={ind} type='extraText'>
          {slide.extraText}
        </Text>
      )}
      {slide.subTitle && (
        <div
          className={cn(
            'mb-[10px] sm:mb-6 z-10 relative flex items-center',
            'text-[0.625rem] sm:text-base md:text-xl text-white-acc font-bold',
            ind === 0 && 'mt-3'
          )}
        >
          <KycSVG
            className={
              'w-[21px] h-[23px] sm:w-10 sm:h-11 xl:w-11 xl:h-12 mr-[14px]'
            }
          />
          Without KYC <br /> just connect your wallet and play
        </div>
      )}
      {slide.isBtn === true && (
        <button
          className={cn(
            'active:bg-[linear-gradient(114deg,#ffe297_-4.17%,#d29650_48.32%,#8e5b2d_104.97%)] active:shadow-[0px_0px_11px_0px_rgba(249,131,44,0.5),0px_4px_4px_0px rgba(0,0,0,0.25)]',
            'hover:linear-gradient(114deg,#f8eeb8_-4.17%,#dbb370_59.03%,#8e5b2d_112.39%) hover:shadow-[0px_0px_11px_0px_rgba(249,131,44,0.5)]',
            'rounded-[5px] duration-200 px-5 bg-[linear-gradient(114deg,#f8eeb8_-4.17%,#dbb370_59.03%,#8e5b2d_112.39%)] sm:rounded-xl z-10 relative border-none cursor-pointer',
            'min-h-[30px] min-w-[100px] mb-[30px] flex items-center justify-center sm:min-w-[250px] w-fit sm:min-h-[50px]',
            'text-sm font-extrabold sm:text-lg text-center text-[#0f0f0f]'
          )}
        >
          {!is650 ? slide.btnFirstText : slide.btnSecondText}
        </button>
      )}
      {ind === 8 && (
        <div
          className={cn(
            'mt-[38px] sm:mt-[15px] mr-0 ml-0 md:mr-10 lg:mr-0 lg:mt-[10px] lg:ml-[60px] xl:mr-[220px] xl:mt-12',
            'w-full sm:w-auto flex items-center gap-3 z-10 relative'
          )}
        >
          <Button
            className={cn(
              'bg-[linear-gradient(93deg,#1b4480_-62.3%,#0f3b72_-15.04%,#3582b6_100.1%)]',
              'hover:bg-[linear-gradient(96deg,#1b4480_-62.3%,#0f3b72_-28.71%,#3582b6_100.1%)]'
            )}
            link='https://chain.link/vrf'
          >
            Chainlink VRF
          </Button>
          <Button
            className={cn('bg-[#359dbf] hover:bg-[#127595]')}
            link='https://docs.chain.link/vrf'
          >
            Documentation
          </Button>
        </div>
      )}
      {ind === 7 && (
        <div
          className={cn(
            'w-fill md:w-[calc(100%-88px)] flex gap-[12px] xl:left-[100px]',
            'left-[10px] bottom-4 sm:bottom-10 md:left-11 md:bottom-[30px] xl:bottom-[60px] absolute' // xl:left-full
          )}
        >
          <Button
            className={cn(
              'bg-[linear-gradient(104deg,#674619_12.48%,#bf8921_92.02%)]',
              'hover:bg-[linear-gradient(112deg,#674619_17.46%,#bf8921_141.04%)]'
            )}
            link='https://pancakeswap.finance/swap?outputCurrency=0x7f7F49B6128F7CB89BAaB704F6EA1662A270455b'
          >
            buy
          </Button>
          <Button
            className={cn(
              'bg-[linear-gradient(93deg,#f8eeb8_-62.3%,#dbb370_0.29%,#8e5b2d_100.1%)]',
              'hover:bg-[linear-gradient(93deg,#f8eeb8_-62.3%,#dbb370_-61.32%,#8e5b2d_54.25%)]'
            )}
            link='https://www.dextools.io/app/en/bnb/pair-explorer/0x1853b96b239a01a7023715f83c890e0b6977411c'
          >
            Dextools
          </Button>
        </div>
      )}
      {ind === 6 && (
        <Button
          className={cn(
            'bg-[linear-gradient(87deg,#2681c6_0%,#005ba1_95.1%)]',
            'hover:bg-[linear-gradient(87deg,#005ba1_0%,#005ba1_95.1%)]',
            'w-full sm:w-[200px] text-white z-10 shadow-[0px_0px_10px_0px_#0069ca]',
            'absolute bottom-4 left-[10px] text-[10px] md:b-10 xl:bottom-[30px] md:left-[44px] xl:left-[100px]'
          )}
          link='https://t.me/ChainSpyRobot?start=6218277349'
        >
          Join X-bot
        </Button>
      )}
      {ind === 5 && (
        <div
          className={cn(
            'w-[calc(100%-20px)] md:w-[calc(100%-88px)] gap-[12px] flex left-[10px]',
            'bottom-4 sm:bottom-10 md:left-11 md:bottom-[30px] xl:bottom-[60px] absolute xl:left-[100px]' // xl:left-full
          )}
        >
          <Button
            className={cn(
              'bg-[linear-gradient(104deg,#7e4fd3_12.48%,#4c248a_92.02%)] uppercase',
              'hover:bg-[linear-gradient(104deg,#4c248a_12.48%,#4c248a_92.02%)] text-white'
            )}
            link='https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x42021D43B367a57b4E32763c39439B272CC73B12&inputCurrency=0x55d398326f99059fF775485246999027B3197955'
          >
            buy
          </Button>
          <Button
            className={cn(
              'bg-[linear-gradient(90deg,#14d1ec_0%,#019ec5_100%)] text-white',
              'hover:bg-[linear-gradient(90deg,#019ec5_0%,#019ec5_100%)]'
            )}
            link='https://www.dextools.io/app/ru/bnb/pair-explorer/0x0cd67a185f94332c589cb5eb512c67ae7406f45d'
          >
            Dextools
          </Button>
        </div>
      )}
      {ind === 4 && (
        <Button
          className={cn(
            'w-[165px] sm:w-[235px] px-[10px] bottom-[30px] right-[30px] xl:bottom-[77px] xl:right-[170px] absolute gap-[10px]',
            'text-xs sm:text-lg text-white md:w-[175px] z-10 ',
            'shadow-[0px_0px_10px_0px_#0069ca] bg-[linear-gradient(93deg,#15d4ee_0%,#009ec5_78.1%)]'
          )}
          link='https://t.me/HFT_Crypto_Signals_bot'
        >
          {is700 || is650 ? 'Join Telegram Bot' : 'Join Bot'}
          <TgSVG className='w-[17px] h-[17px] sm:w-auto sm:h-auto' />
        </Button>
      )}
    </>
  )
}

export default BannerSlide
