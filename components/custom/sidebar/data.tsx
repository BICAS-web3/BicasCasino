import {
  AffilateSVG,
  InfoSVG,
  NftSVG,
  SupportSVG
} from './components/icons/bottom'
import { BonusSVG, GamesSVG, HomeSVG, VipSVG } from './components/icons/top'
import {
  RpcSVG,
  AppleSVG,
  BlackJackSVG,
  CarsSVG,
  CoinSVG,
  DiceSVG,
  LeaderboardSVG,
  MinesSVG,
  PlinkoSVG,
  RaceSVG,
  RocketSVG,
  ThimblesSVG,
  WheelSVG
} from './components/icons/games'
import Image from 'next/image'

export const STopMenu = [
  {
    icon: <HomeSVG className='w-5 h-5 object-contain aspect-square' />,
    title: 'Home'
  },
  {
    icon: <BonusSVG className='w-5 h-5 object-contain aspect-square' />,
    title: 'Bonus'
  },
  {
    icon: <BonusSVG className='w-5 h-5 object-contain aspect-square' />,
    title: 'double',
    buttons: [
      {
        icon: (
          <Image
            src='/sidebar-icons/goals.png'
            alt='icon goals'
            width={16}
            height={16}
            className='w-5 h-5 object-contain aspect-square'
          />
        ),
        title: 'Goals',
        color: 'linear-gradient(40deg, #44278A 0%, #24232E 100%)'
      },
      {
        icon: (
          <Image
            src='/sidebar-icons/wheel.png'
            alt='icon wheel'
            width={16}
            height={16}
            className='w-5 h-5 object-contain aspect-square'
          />
        ),
        title: 'Wheel',
        color: 'linear-gradient(40deg, #61194F 0%, #272229 100%)'
      }
    ]
  },
  {
    icon: <VipSVG className='w-5 h-5 object-contain aspect-square' />,
    title: 'VIP Club'
  }
]

export const SGames = {
  main: {
    icon: <GamesSVG className='w-5 h-5 object-contain aspect-square' />,
    title: 'Games'
  },
  second: {
    icon: <LeaderboardSVG className='w-5 h-5 object-contain aspect-square' />,
    title: 'LeaderBoard'
  },
  items: [
    {
      title: 'Coinflip',
      icon: <CoinSVG />
    },
    {
      title: 'Dice',
      icon: <DiceSVG />
    },
    {
      title: 'Rock paper scissors',
      icon: <RpcSVG />
    },
    {
      title: 'Mines',
      icon: <MinesSVG />
    },
    {
      title: 'Plinko',
      icon: <PlinkoSVG />
    },
    {
      title: 'Rocket',
      icon: <RocketSVG />
    },
    {
      title: 'Wheel of Fortune',
      icon: <WheelSVG />
    },
    {
      title: 'Apples',
      icon: <AppleSVG />
    },
    {
      title: 'Race',
      icon: <RaceSVG />
    },
    {
      title: 'Cars',
      icon: <CarsSVG />
    },
    {
      title: 'Thimbles',
      icon: <ThimblesSVG />
    },
    {
      title: 'Race 1',
      icon: <RaceSVG />
    },
    {
      title: 'Cars 2',
      icon: <CarsSVG />
    },
    {
      title: 'Thimbles 3',
      icon: <ThimblesSVG />
    }
  ]
}

export const SBottomMenu = [
  // {
  //   icon: <InfoSVG className='w-5 h-5 object-contain aspect-square' />,
  //   title: 'How to Play'
  // },
  {
    icon: <NftSVG className='w-5 h-5 object-contain aspect-square' />,
    title: 'NFT market'
  },
  {
    icon: <AffilateSVG className='w-5 h-5 object-contain aspect-square' />,
    title: 'Affiliate'
  },
  {
    icon: <SupportSVG className='w-5 h-5 object-contain aspect-square' />,
    title: 'Support'
  }
]
