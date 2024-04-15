import { DraxMiniSVG } from '@/components/custom/header/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { stringRemoveSpacing } from '@/lib/string'

const bets = ['min', '/2', 'x2', 'max']
const titles = ['Wager', 'Max: 0']

const GameWager = () => {
  const handleInput = e => {
    console.log(e.target.value)
  }
  const handleBet = value => {
    console.log(value)
  }
  return (
    <div className='w-full sm:w-fit my-0 mx-auto col-start-1 col-end-3 row-start-1 flex flex-col gap-2'>
      <div className='flex items-center justify-between flex-nowrap'>
        {titles.map((title, index) => (
          <span
            key={`game-wager--${stringRemoveSpacing(title)}-${index}`}
            className='text-sm font-semibold leading-5 tracking-wide text-[#7e7e7e]'
          >
            {title}
          </span>
        ))}
      </div>
      <div className='rounded-[20px] border h-9 pl-2.5 flex items-center border-[#363636]'>
        <div className='flex items-center gap-3.5 w-full max-w-full sm:max-w-36 pr-2.5'>
          <Input
            type='number'
            placeholder='0.0000'
            variant='borderNone'
            className='placeholder-[#eaeaea] w-full'
            onChange={handleInput}
          />
          <DraxMiniSVG className='min-w-3.5 h-3.5 aspect-square object-contain' />
        </div>
        {bets.map((bet, index) => (
          <Button
            variant='wager'
            key={`game-wager-bet--${stringRemoveSpacing(bet)}-${index}`}
            className={`h-full ${
              index + 1 === bets.length
                ? 'rounded-[0_20px_20px_0] border-none'
                : ''
            } ${index === 0 ? 'border-l border-l-[#363636]' : ''}`}
            onClick={() => handleBet(bet)}
          >
            {bet}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default GameWager
