import { GameModel } from '@/states'
import { Side } from '@/states/game_model.store'
import { useUnit } from 'effector-react'

const Selector = ({ className }: { className?: string }) => {
  const [pickedSide, pickSide, active] = useUnit([
    GameModel.$pickedSide,
    GameModel.pickSide,
    GameModel.$active
  ])

  const handleSide = (item: Side) => {
    if (active) pickSide(item)
  }
  return (
    <div
      className={`flex w-full sm:w-[288px] xl:w-[385px] h-9 sm:h-8 rounded-[99px] border border-[#2E2E2E] text-sm font-bold p-[2px] gap-[5px] relative ${className}`}
    >
      <button
        onClick={handleSide.bind('', Side.Heads)}
        className={`w-full flex items-center justify-center h-full rounded-[99px] border duration-500 ${
          pickedSide === Side.Heads
            ? 'border-[#2E2E2E] bg-[#2E2E2E]'
            : 'border-transparent'
        }`}
      >
        Heads
      </button>
      <button
        onClick={handleSide.bind('', Side.Tails)}
        className={`w-full flex items-center justify-center h-full rounded-[99px] border duration-500 ${
          pickedSide === Side.Tails
            ? 'border-[#2E2E2E] bg-[#2E2E2E]'
            : 'border-transparent'
        }`}
      >
        Tails
      </button>
    </div>
  )
}

export default Selector
