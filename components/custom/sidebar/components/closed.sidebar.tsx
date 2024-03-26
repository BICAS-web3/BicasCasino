'use client'

interface GameIconProps {
  iconId: string
  className?: string
}

import { cn } from '@/lib/utils'

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

import { FC } from 'react'

import Link from 'next/link'
import {
  AffilateSVG,
  AppleBtnSVG,
  BonusSVG,
  CarBtnSVG,
  CoinButtonSVG,
  DiceButtonSVG,
  GameSVG,
  HTPSVG,
  HomeSVG,
  LeaderboardSVG,
  MinesSVG,
  NFTSVG,
  PlinkoSVG,
  RPCButtonSVG,
  RaceSVG,
  RocketSVG,
  SupportSVG,
  ThimblesSVG,
  WheelSVG
} from './icons'
import { usePathname, useRouter } from 'next/navigation'
import { gamesList } from '../sidebar'
import ClosedLink from './close.link'

// interface ClosedSideBarProps {
//   pickedGame: number | null
//   activePage: string | undefined
// }
const ClosedSideBar = () => {
  const {} = useRouter()
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
  return (
    <>
      <div className='mt-5 w-[calc(100%-20px)] gap-[5px] flex flex-col pl-[10px]'>
        <ClosedLink title='Home' Icon={HomeSVG} id='home-tooltip' link='/' />
        <ClosedLink
          title='Bonus'
          Icon={BonusSVG}
          id='bonus-tooltip'
          link='/Bonus'
        />
        <ClosedLink
          title='Vip'
          Icon={LeaderboardSVG}
          id='vip-tooltip'
          link='/VipClub'
        />
        <div
          className={cn(
            'cursor-pointer flex justify-center items-center duration-100 w-[50px] h-[50px] mx-auto rounded-[12px] group',
            active_link && 'active_link'
          )}
        >
          <GameSVG />
          <div
            className={'top-[100px] fixed hidden left-[65px] group-hover:flex'}
          >
            <div
              className={cn(
                'z-[2] whitespace-nowrap ml-[25px] text-grey-acc font-semibold font-[sourse-sans-3] rounded-[8px] bg-[#282828] justify-center items-center',
                'before:content-[""] before:absolute before:top-[22px] before:right-[88%] -mt-[7px] bordr-[7px] border-transparent rounded-[2px]'
              )}
            >
              <div className='max-w-max flex overflow-y-scroll overflow-x-hidden scroll rounded-[8px] bg-[#282828] -mr-5 relative flex-col'>
                {gamesList.map((item, ind) => (
                  <Link
                    href={item.link}
                    className={cn(
                      ' cursor-pointer flex items-center p-[15px] duration-500 hover:bg-black-acc',
                      path === item.link ? 'active_link' : 'not_active'
                    )}
                  >
                    <GameIcon className='mr-[10px]' iconId={item.icon} />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-[10px] flex flex-col gap-[3px] pl-[10px]'>
        <div
          className={cn(
            'cursor-pointer h-[50px] w-[50px] overflow-hidden rounded-[12px] duration-300 flex justify-center items-center relative',
            'after:content-[""] after:rounded-[50%] after:w-[15px] after:h-[15px] after:block after:opacity-0 after:visible-[no] after:bg-[rgba(198,149,81,0.9)]',
            'after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:blur-[10px] hover:bg-[#0f0f0f] active:after:opacity-[1] active:after:visible',
            path === '/nftmarket' && 'active_link'
          )}
        >
          <HTPSVG />
          <div
            className={cn(
              'fixed l-20 w-auto bg-[#282828] hidden justify-center items-center h-9 px-20',
              'text-grey-acc text-base whitespace-nowrap font-semibold leading-[90%]',
              'before:content-[""] before:absolute top-[18px] right-full -mt-[7px] border-[7px] rounded-[2px] border-transparent'
            )}
            data-id='htp-tooltip'
          >
            How to play
          </div>
        </div>
        <Link
          href={'/nftmarket'}
          className={cn(
            'cursor-pointer h-[50px] w-[50px] overflow-hidden rounded-[12px] duration-300 flex justify-center items-center relative',
            'after:content-[""] after:rounded-[50%] after:w-[15px] after:h-[15px] after:block after:opacity-0 after:visible-[no] after:bg-[rgba(198,149,81,0.9)]',
            'after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:blur-[10px] hover:bg-[#0f0f0f] active:after:opacity-[1] active:after:visible',
            path === '/nftmarket' && 'active_link'
          )}
        >
          <NFTSVG />
          <div
            className={cn(
              'fixed l-20 w-auto bg-[#282828] hidden justify-center items-center h-9 px-20',
              'text-grey-acc text-base whitespace-nowrap font-semibold leading-[90%]',
              'before:content-[""] before:absolute top-[18px] right-full -mt-[7px] border-[7px] rounded-[2px] border-transparent'
            )}
            data-id='nft-tooltip'
          >
            NFT Market
          </div>
        </Link>
        <div
          className={cn(
            'cursor-pointer h-[50px] w-[50px] overflow-hidden rounded-[12px] duration-300 flex justify-center items-center relative',
            'after:content-[""] after:rounded-[50%] after:w-[15px] after:h-[15px] after:block after:opacity-0 after:visible-[no] after:bg-[rgba(198,149,81,0.9)]',
            'after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:blur-[10px] hover:bg-[#0f0f0f] active:after:opacity-[1] active:after:visible'
          )}
          onClick={() =>
            window.open('https://affiliate.greekkeepers.io/', '_blank')
          }
        >
          <AffilateSVG />
          <div
            className={cn(
              'fixed l-20 w-auto bg-[#282828] hidden justify-center items-center h-9 px-20',
              'text-grey-acc text-base whitespace-nowrap font-semibold leading-[90%]',
              'before:content-[""] before:absolute top-[18px] right-full -mt-[7px] border-[7px] rounded-[2px] border-transparent'
            )}
            data-id='affilate-tooltip'
          >
            Affiliate
          </div>
        </div>
        <div
        //! className={s.closed_swap_wrap}
        >
          <div
            className={cn(
              'fixed l-20 w-auto bg-[#282828] hidden justify-center items-center h-9 px-20',
              'text-grey-acc text-base whitespace-nowrap font-semibold leading-[90%]',
              'before:content-[""] before:absolute top-[18px] right-full -mt-[7px] border-[7px] rounded-[2px] border-transparent'
            )}
            data-id='swap-tooltip'
          >
            Swap
          </div>
        </div>
        <Link
          href='/Support'
          className={cn(
            'cursor-pointer h-[50px] w-[50px] overflow-hidden rounded-[12px] duration-300 flex justify-center items-center relative',
            'after:content-[""] after:rounded-[50%] after:w-[15px] after:h-[15px] after:block after:opacity-0 after:visible-[no] after:bg-[rgba(198,149,81,0.9)]',
            'after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%] after:blur-[10px] hover:bg-[#0f0f0f] active:after:opacity-[1] active:after:visible',
            path === '/Support' && 'active_link'
          )}
        >
          <SupportSVG />
          <div
            className={cn(
              'fixed l-20 w-auto bg-[#282828] hidden justify-center items-center h-9 px-20',
              'text-grey-acc text-base whitespace-nowrap font-semibold leading-[90%]',
              'before:content-[""] before:absolute top-[18px] right-full -mt-[7px] border-[7px] rounded-[2px] border-transparent'
            )}
            data-id='support-tooltip'
          >
            Support
          </div>
        </Link>
      </div>
    </>
  )
}
export default ClosedSideBar
