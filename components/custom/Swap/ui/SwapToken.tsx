import { FC } from 'react'
import drax from '@/public/tokens/DRAX.svg'
import bnb from '@/public/tokens/bnb.svg'
import arb from '@/public/tokens/arb.svg'
import usdt from '@/public/tokens/usdt.svg'
import clsx from 'clsx'
import {
  IToken,
  TokenExchangeDropdown
} from '@/src/shared/ui/TokenExchangeDropdown'
import { TokenExchangeInput } from '@/src/shared/ui/TokenExchangeInput'
const tokenList: IToken[] = [
  { id: 1, name: 'DRAX', iconToken: drax },
  { id: 2, name: 'BNB', iconToken: bnb },
  { id: 3, name: 'ARB', iconToken: arb },
  { id: 4, name: 'USDT', iconToken: usdt }
]
export interface SwapTokenProps {
  className?: string
  token: any
  setToken: (el: any) => void
}

export const SwapToken: FC<SwapTokenProps> = props => {
  const { className, token, setToken } = props

  return (
    <form
    // className={s.initial_exchange}
    >
      <TokenExchangeDropdown tokenList={tokenList} />
      <TokenExchangeInput />
    </form>
  )
}
