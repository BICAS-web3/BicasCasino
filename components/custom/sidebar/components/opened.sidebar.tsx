'use client'
import { cn } from '@/lib/utils'
const languagesList = [
  {
    ico: usaIco,
    id: 'usa',
    title: 'en',
    mobTitle: 'english'
  },
  {
    ico: uaIco,
    id: 'ua',
    title: 'ua',
    mobTitle: 'ukranian'
  },
  {
    ico: indIco,
    id: 'india',
    title: 'in',
    mobTitle: 'indian'
  },
  {
    ico: chinaIco,
    id: 'china',
    title: 'cn',
    mobTitle: 'chinise'
  },
  {
    ico: portugalIco,
    id: 'portugal',
    title: 'pt',
    mobTitle: 'portuguese'
  },
  {
    ico: spainIco,
    id: 'spain',
    title: 'es',
    mobTitle: 'spanish'
  }
]
import Link from 'next/link'

import { FC, useState } from 'react'
import Image from 'next/image'
import rightArr from '@/public/sidebar_icons/rightArrIco.webp'

import usaIco from '@/public/countries_images/usaIco.svg'
import uaIco from '@/public/countries_images/uaIco.svg'
import indIco from '@/public/countries_images/indiaIco.svg'
import chinaIco from '@/public/countries_images/chinaIco.svg'
import portugalIco from '@/public/countries_images/portugalIco.svg'
import spainIco from '@/public/countries_images/spainIco.svg'
import {
  AffilateSVG,
  AppleBtnSVG,
  ArrowSVG,
  BonusSVG,
  CarBtnSVG,
  CoinButtonSVG,
  DiceButtonSVG,
  GameSVG,
  HTPSVG,
  HomeSVG,
  LeaderboardSVG,
  MinesSVG,
  MoonSVG,
  NFTSVG,
  PlinkoSVG,
  RPCButtonSVG,
  RaceSVG,
  RocketSVG,
  SupportSVG,
  ThimblesSVG,
  VipSVG,
  WheelSVG
} from './icons'
import { usePathname } from 'next/navigation'
import { gamesList } from '../sidebar'

interface OpenedSideBarProps {}
const OpenedSideBar: FC<OpenedSideBarProps> = () => {
  const [gamesAreOpen, setOpen] = useState(true)
  const [activeTheme, setActiveTheme] = useState('dark')
  const handleChangeTheme = () => {
    activeTheme === 'dark' ? setActiveTheme('light') : setActiveTheme('dark')
  }
  const [activeLanguage, setActiveLanguage] = useState(languagesList[0])
  const [activeLanguagesList, setActiveLanguagesList] = useState(languagesList)

  const handleLanguageChange = (id: any) => {
    const lang = languagesList.filter(item => item.id === id)[0]
    setActiveLanguage(lang)
  }

  const path = usePathname()

  const active_link =
    path === '/games/CoinFlip' ||
    path === '/games/Dice' ||
    path === '/games/RockPaperScissors' ||
    path === '/games/Poker' ||
    path === '/games/Mines' ||
    path === '/games/Plinko' ||
    path === '/games/Rocket' ||
    path === '/games/Slots' ||
    path === '/games/WheelFortune' ||
    path === '/games/Apples' ||
    path === '/games/Race' ||
    path === '/games/Cars' ||
    path === '/games/BlackJack' ||
    path === '/games/Thimbles' ||
    path === '/games/Crash' ||
    path === '/games/Roulette' ||
    path === '/leaderboard'

  interface GameIconProps {
    iconId: string
    className?: string
  }
  const GameIcon: FC<GameIconProps> = ({ iconId, className }) => {
    if (iconId === 'coin') {
      return <CoinButtonSVG className={className} />
    } else if (iconId === 'dice') {
      return <DiceButtonSVG className={className} />
    } else if (iconId === 'rps') {
      return <RPCButtonSVG className={className} />
    } else if (iconId === 'mines') {
      return <MinesSVG className={className} />
    } else if (iconId === 'plinko') {
      return <PlinkoSVG className={className} />
    } else if (iconId === 'rocket') {
      return <RocketSVG className={className} />
    } else if (iconId === 'wheelFortune') {
      return <WheelSVG className={className} />
    } else if (iconId === 'apples') {
      return <AppleBtnSVG className={className} />
    } else if (iconId === 'race') {
      return <RaceSVG className={className} />
    } else if (iconId === 'cars') {
      return <CarBtnSVG className={className} />
    } else if (iconId === 'thimbles') {
      return <ThimblesSVG className={className} />
    } else {
      return <h3>no games yet</h3>
    }
  }
  return (
    <>
      <div className='h-auto mt-0 sm:mt-5 sm:h-full w-full relative flex flex-col items-center gap-[5px]'>
        {/* <div
        //   className={`${s.mobile_languages_block} ${
        //     activeLanguagesBlock === true && s.visible
        //   }`}
        >
          <div className='pb-5'>
            <div className='px-4 flex items-center justify-between'>
              <div
                className={
                  'flex items-center gap-[15px] text-grey-acc text-xs font-medium leading-[17px]'
                }
                // onClick={() => setActiveLanguagesBlock(false)}
              >
                <Image
                  className=' rotate-[180-deg]'
                  src={rightArr}
                  alt='back'
                />
                Back
              </div>
              <span className='text-white-acc text-center font-[nunit-sans] text-xs font-bold leading-5'>
                Language
              </span>
            </div>
            <div className='mt-[30px] flex flex-col gap-[6px]'>
              {activeLanguagesList.map((item, ind) => (
                <div
                  className='h-[50px] px-4 flex justify-between items-center rounded-[5px] bg-[#121212]'
                  onClick={() => handleLanguageChange(item.id)}
                >
                  <div className='flex gap-[10px] items-center text-[#979797] font-[nunito-sans] font-extrabold leading-[128%] uppercase'>
                    <Image src={item.ico} alt={item.id} />
                    {item.mobTitle}
                  </div>
                  <div
                    className={`w-3 h-3 rounded-[50%] border border-[#252525] bg-[#181818] ${
                      activeLanguage.id === item.id &&
                      'bg-[#ffe09d] border border-[#ffe09d] drop-shadow-[0px_0px_4px_#d18b34]'
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        <Link
          href={'/'}
          className={cn(
            'cursor-pointer flex items-center w-full sm:w-[83%] xl:w-[217px] min-h-[50px] pl-4 rounded-[5px] xl:rounded-[20px] bg-[#121212] text-[#979797] font-[nunito-sans] font-extrabold leading-[21px] uppercase duration-100',
            path === '/' && 'active_link'
          )}
        >
          <div className='mb-[3px] h-[18px]'>
            <HomeSVG className='mr-[11px]' />
          </div>
          home
        </Link>
        <Link
          href={'/Bonus'}
          className={cn(
            'cursor-pointer flex items-center w-full sm:w-[83%] xl:w-[217px] min-h-[50px] pl-4 rounded-[5px] xl:rounded-[20px] bg-[#121212] text-[#979797] font-[nunito-sans] font-extrabold leading-[21px] uppercase duration-100',
            path === '/Bonus' && 'active_link'
          )}
        >
          <div className='mb-[3px] h-[18px]'>
            <BonusSVG className='mr-[11px]' />
          </div>
          bonus
        </Link>
        <Link
          href='/VipClub'
          className={cn(
            'cursor-pointer flex items-center w-full sm:w-[83%] xl:w-[217px] min-h-[50px] pl-4 rounded-[5px] xl:rounded-[20px] bg-[#121212] text-[#979797] font-[nunito-sans] font-extrabold leading-[21px] uppercase duration-100',
            path === '/VipClub' && 'active_link'
          )}
        >
          <div className={'flex justify-center items-center'}>
            <LeaderboardSVG className='mr-[11px] mb-[2px]' />
          </div>
          vip club
        </Link>
        <div
          className={cn(
            'w-[217px] rounded-[20px] bg-[#121212] flex flex-col relative duration-1000 min-h-[650px]',
            !gamesAreOpen && 'max-h-[50px] min-h-[50px]'
          )}
        >
          <div
            className={
              'cursor-pointer border-b border-[#121212] text-[#979797] px-4 h-[50px] w-full flex justify-between items-center required: z-10'
            }
            onClick={() => {
              setOpen(!gamesAreOpen)
            }}
          >
            <div
              className={cn(
                'gap-[11px] items-center justify-center h-[18px] text-[#979797] grid grid-cols-[19px_auto]',
                active_link && 'text-white'
              )}
            >
              <GameSVG className={active_link ? 'text-white' : ''} />
              <span className='text-base mt-[1px] font-extrabold uppercase'>
                games
              </span>
            </div>
            <div
              className={cn(
                'h-full flex justify-center items-center',
                gamesAreOpen && 'h-[9px] duration-500'
              )}
            >
              <ArrowSVG
                className={
                  !gamesAreOpen ? 'h-[9px] duration-500 rotate-[180deg]' : ''
                }
              />
            </div>
          </div>
          <div
            className={cn(
              'w-full absolute z-[1] top-[50px] duration-500 flex flex-col',
              !gamesAreOpen && 'scale-y-0 origin-[top_center] invisible'
            )}
          >
            {gamesList.map(item => (
              <Link
                key={item.title}
                href={item.link}
                className={cn(
                  `w-full h-[50px] pl-4 gap-[11px] items-center text-grey-acc font-[nunito-sans] font-bold text-sm leading-[17px] bg-[#121212] cursor-pointer duration-200 grid grid-cols-[19px_auto] ease-in-out hover:text-[#ffe09d]`,
                  path === item.link && 'game_active'
                )}
              >
                <GameIcon iconId={item.icon} />
                {item.title}
              </Link>
            ))}
            <Link
              href={'/leaderboard'}
              className={cn(
                'w-full sm:w-auto h-[50px] pl-4 flex gap-[11px] items-center text-grey-acc font-[nunito-sans] font-bold text-sm leading-[17px] bg-[#121212] cursor-pointer duration-200 ease-in-out rounded-[0_0_20px_20px] border-t border-[#1d1d1d] relative hover:text-[#e5c787]',
                path === '/leaderboard' && 'game_active'
              )}
            >
              <VipSVG />
              LeaderBoard
            </Link>
          </div>
        </div>
        <div className='sm:rounded-[20px] flex bg-[#121212] flex-col w-full rounded-[5px] sm:w-[83%] xl:w-[217px]'>
          <div
            className={
              'text-[#979797] cursor-pointer flex gap-[11px] items-center duration-100 h-[50px] pl-4'
            }
          >
            <div className='w-[18px] h-[18px] flex items-center justify-center'>
              <HTPSVG />
            </div>
            <div
              className={
                'font-[nunito-sans] font-extrabold leading-[21px] text-left uppercase'
              }
            >
              how to play{' '}
              {/* <span className='absolute text-white bottom-0 right-5 rotate-[1deg]'>
                Soon…
              </span> */}
            </div>
          </div>
          <Link
            href={'/nftmarket'}
            className={cn(
              'text-[#979797] cursor-pointer flex gap-[11px] items-center duration-100 h-[50px] pl-4',
              path === '/nftmarket' && 'active_link'
            )}
          >
            <div className='w-[18px] h-[18px] flex items-center justify-center'>
              <NFTSVG />
            </div>
            <div
              className={
                'font-[nunito-sans] font-extrabold leading-[21px] text-left uppercase'
              }
            >
              nft market
            </div>
          </Link>
          <div
            className={
              'text-[#979797] cursor-pointer flex gap-[11px] items-center duration-100 h-[50px] pl-4'
            }
            onClick={() =>
              window.open('https://affiliate.greekkeepers.io/', '_blank')
            }
          >
            <div className='w-[18px] h-[18px] flex items-center justify-center'>
              <AffilateSVG />
            </div>
            <div
              className={
                'font-[nunito-sans] font-extrabold leading-[21px] text-left uppercase'
              }
            >
              affiliate
            </div>
          </div>
          <Link
            className={cn(
              'text-[#979797] flex gap-[11px] items-center h-[50px] pl-4',
              path === '/Support' && 'active_link'
            )}
            href='/Support'
          >
            <div className='w-[18px] h-[18px] flex items-center justify-center'>
              <SupportSVG />
            </div>
            <div
              className={
                'font-[nunito-sans] font-extrabold leading-[21px] text-left uppercase'
              }
            >
              support
            </div>
          </Link>
        </div>
        <div
          className={
            'h-[50px] mx-4 rounded-[5px] px-[10px] py-5 w-full flex sm:hidden items-center justify-between bg-[#121212]'
          }
        >
          <div className={'flex gap-[10px] items-center justify-center'}>
            <Image
              className='w-4 h-4'
              src={(activeLanguage as any).ico}
              alt='active_language_ico'
            />
            <span
              className={
                'text-[#979797] font-[nunito-sans] font-extrabold leading-[128%] uppercase'
              }
            >
              language
            </span>
          </div>
        </div>
        <div
          className={
            'h-[50px] mx-4 rounded-[5px] px-[10px] py-5 w-full flex sm:hidden items-center justify-between bg-[#121212]'
          }
        >
          <div className={'flex gap-[10px] items-center justify-center'}>
            <MoonSVG />
            <span
              className={
                'text-[#979797] font-[nunito-sans] font-extrabold leading-[128%] uppercase'
              }
            >
              dark theme
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default OpenedSideBar
