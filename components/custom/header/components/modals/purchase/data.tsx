import { BitcoinSVG, DogeSVG, EthereumSVG, LtcSVG, UsdtSVG } from '../../icons'

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

export const coins_list = [
  {
    title: 'BTC_BITCOIN',
    icon: <BitcoinSVG className='aspect-square object-contain' />
  },
  {
    title: 'ETH_ETHEREUM',
    icon: <EthereumSVG className='aspect-square object-contain' />
  },
  {
    title: 'USDT',
    icon: <UsdtSVG className='aspect-square object-contain' />
  },
  {
    title: 'USDC',
    icon: <UsdtSVG className='aspect-square object-contain' />
  },
  {
    title: 'TUSD',
    icon: <UsdtSVG className='aspect-square object-contain' />
  },
  { title: 'DAI_ETHEREUM', icon: <DogeSVG /> }
  // { title: 'TRX_TRON', icon: trxIco },
  // { title: 'LTC_LITECOIN', icon: ltcIco },
  // { title: 'BNB_BSC', icon: bnb },
  // { title: 'BUSD_BSC', icon: busd },
  // { title: 'TON_TON', icon: ton }
]

export const networks_list = [
  {
    title: 'ERC20',
    id: 'ETHEREUM'
  },
  {
    title: 'TRC20',
    id: 'TRON'
  }
]
