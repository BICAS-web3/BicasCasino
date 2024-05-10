import {
  BitcoinSVG,
  BonusCoinSVG,
  DogeSVG,
  DraxMiniSVG,
  EthereumSVG,
  LtcSVG,
  UsdtSVG
} from '../../icons'

export const draxTypesList = [
  {
    bonusCoins: 10000,
    usdPrice: 10
  },
  {
    bonusCoins: 50000,
    usdPrice: 50
  },
  {
    bonusCoins: 100000,
    usdPrice: 100
  },
  {
    bonusCoins: 500000,
    usdPrice: 500
  },
  {
    bonusCoins: 1000000,
    usdPrice: 1000
  },
  {
    bonusCoins: 2000000,
    usdPrice: 2000
  }
]

export const crypto_data = [
  {
    id: '1',
    network: 'default',
    label: 'BTC',
    value: 'btc',
    address: '37FmyiYEgAHu2ENf7CyPiepdVWDqy8TZ5d',
    icon: <BitcoinSVG className='aspect-square object-contain' />
  },
  {
    id: '2',
    network: ['erc20'],
    label: 'ETH',
    value: 'eth',
    address: '1234',
    icon: <EthereumSVG className='aspect-square object-contain' />
  },
  {
    id: '3',
    network: 'default',
    label: 'Doge',
    value: 'doge',
    address: '37FmyiYEgAHu2ENf7CyPiepdVWDqy8TZ5d',
    icon: <DogeSVG className='aspect-square object-contain' />
  },
  {
    id: '4',
    network: 'default',
    label: 'LTC',
    value: 'ltc',
    address: '37FmyiYEgAHu2ENf7CyPiepdVWDqy8TZ5d',
    icon: <LtcSVG className='aspect-square object-contain' />
  },
  {
    id: '5',
    network: ['TRC20', 'ERC20'],
    label: 'USDT',
    value: 'usdt',
    address: '37FmyiYEgAHu2ENf7CyPiepdVWDqy8TZ5d',
    icon: <UsdtSVG className='aspect-square object-contain' />
  }
]

export const tips_data = [
  {
    id: '1',
    label: 'DC',
    value: 'dc',
    address: '37FmyiYEgAHu2ENf7CyPiepdVWDqy8TZ5d',
    icon: <BonusCoinSVG className='aspect-square object-contain' />
  },
  {
    id: '2',
    label: 'DRAX',
    value: 'drax',
    address: '1234',
    icon: <DraxMiniSVG className='aspect-square object-contain' />
  }
]
