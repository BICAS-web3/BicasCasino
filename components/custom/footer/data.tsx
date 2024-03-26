import {
  Discord,
  Facebook,
  Instagram,
  Main,
  Medium,
  Reddit,
  Telegram,
  Twitter
} from './icons'

export const games = [
  {
    list: [
      {
        title: 'games',
        path: '/games/GamesPage'
      },
      {
        title: 'swap',
        path: ''
      },
      {
        title: 'profile',
        path: ''
      }
    ]
  },
  {
    list: [
      {
        title: 'leader board',
        path: '/leaderboard'
      },
      {
        title: 'affiliate',
        path: ''
      },
      {
        title: 'nft market',
        path: ''
      }
    ]
  },
  {
    list: [
      {
        title: 'how to play',
        path: ''
      },
      {
        title: 'support',
        path: ''
      }
    ]
  }
]

export const socials = [
  {
    href: 'https://t.me/greekkeepers',
    title: 'telegram',
    icon: <Telegram className='w-8 h-8 aspect-square object-contain' />
  },
  {
    href: 'https://instagram.com/greekkeepers?igshid=NTc4MTIwNjQ2YQ==',
    title: 'instagram',
    icon: <Instagram className='w-8 h-8 aspect-square object-contain' />
  },
  {
    href: 'https://twitter.com/GreekKeepers',
    title: 'twitter',
    icon: <Twitter className='w-8 h-8 aspect-square object-contain' />
  },
  {
    href: 'https://discord.gg/ReJVd2xJSk',
    title: 'discord',
    icon: <Discord className='w-8 h-8 aspect-square object-contain' />
  },
  {
    href: 'https://www.facebook.com/profile.php?id=100092326343777',
    title: 'facebook',
    icon: <Facebook className='w-8 h-8 aspect-square object-contain' />
  },
  {
    href: 'https://www.reddit.com/user/GreekKeepers/?rdt=59831',
    title: 'reddit',
    icon: <Reddit className='w-8 h-8 aspect-square object-contain' />
  },
  {
    href: 'https://medium.com/@greekkeepers',
    title: 'medium',
    icon: <Medium className='w-8 h-8 aspect-square object-contain' />
  },
  {
    href: 'https://www.greekkeepers.io/',
    title: 'main-logo',
    icon: <Main className='w-8 h-8 aspect-square object-contain' />
  }
]

export const footer_text = [
  'BSC METAVERSE LIMITED Suite 305,',
  'Griffith Corporate Centre',
  'P.O. Box 1510, Beachmont Kingstown St. Vincent and the Grenadines',
  '6818 BC 2023'
]
