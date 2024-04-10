import { Button } from '@/components/ui/button'
import { FC } from 'react'
import { bets } from './GameWager'

interface BetItemProps {
  value: string
  id: number
  onClick?: () => void
}

export const BetItem: FC<BetItemProps> = ({ value, id, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant='wager'
      className={`h-full ${
        id + 1 === bets.length ? 'rounded-[0_20px_20px_0] border-none' : ''
      } ${id === 0 ? 'border-l border-l-[#363636]' : ''}`}
    >
      {value}
    </Button>
  )
}
