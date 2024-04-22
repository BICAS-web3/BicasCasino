import { useUnit } from 'effector-react'
import clsx from 'clsx'
import { GameModel } from '@/states'
import { PaperButton, RockButton, ScissorsButton } from '../(icons)'

const RpsPicker = ({ className }: { className?: string }) => {
  const [pickedValue, pickValue, active] = useUnit([
    GameModel.$pickedValueRPS,
    GameModel.pickValueRPS,
    GameModel.$activeRPS
  ])

  const buttons = [
    { value: GameModel.RPSValue.Rock, Icon: RockButton },
    { value: GameModel.RPSValue.Scissors, Icon: ScissorsButton },
    { value: GameModel.RPSValue.Paper, Icon: PaperButton }
  ]

  const selectHand = (value: GameModel.RPSValue) => {
    active && pickValue(value)
  }

  return (
    <div className={`w-full sm:w-fit grid grid-cols-3 gap-x-1.5  ${className}`}>
      {buttons.map(({ value, Icon }, index) => (
        <div
          key={index}
          onClick={selectHand.bind('', value)}
          className={clsx(
            'duration-300 cursor-pointer bg-[#202020] flex items-center justify-center group hover:bg-[#2e2e2e] h-[50px] w-full sm:w-[92px] xl:w-[138px] xl:h-[75px]',
            pickedValue === value && 'bg-[#2e2e2e]',
            index === 0 && 'rounded-[5px] sm:rounded-[12px_5px_5px_12px]',
            index === buttons.length - 1 &&
              'rounded-[5px] sm:rounded-[5px_12px_12px_5px]'
          )}
        >
          <Icon
            className={clsx(
              pickedValue === value ? 'text-[#eaeaea]' : 'text-[#7e7e7e]',
              'group-hover:text-[#eaeaea] duration-300'
            )}
          />
        </div>
      ))}
    </div>
  )
}

export default RpsPicker
