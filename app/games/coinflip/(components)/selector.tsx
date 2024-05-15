import { GameModel } from '@/states'
import { Side } from '@/states/game_model.store'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import useSound from 'use-sound'

const Selector = ({ className }: { className?: string }) => {
  const [pickSide, active, setInitialValue, initialValue] = useUnit([
    GameModel.pickSide,
    GameModel.$active,
    GameModel.setInitialValue,
    GameModel.$initialValue
  ])
  const [playSounds] = useUnit([GameModel.$playSounds])
  const [coinflipChange] = useSound('/music/coinflip_change.mp3')

  const handleSide = (item: Side) => {
    if (active) {
      pickSide(item)
      setInitialValue(item)
      playSounds !== 'off' && coinflipChange()
    }
  }

  const { t } = useTranslation()

  return (
    <div
      className={`flex w-full sm:w-[288px] xl:w-[385px] h-9 sm:h-8 rounded-[99px] border border-[#2E2E2E] text-sm font-bold p-[2px] gap-[5px] relative ${className}`}
    >
      <button
        onClick={handleSide.bind('', Side.Heads)}
        className={`w-full flex items-center justify-center h-full rounded-[99px] border duration-500 uppercase ${
          initialValue === Side.Heads
            ? 'border-[#2E2E2E] bg-[#2E2E2E]'
            : 'border-transparent'
        }`}
      >
        {t(`pages.games.Heads`)}
      </button>
      <button
        onClick={handleSide.bind('', Side.Tails)}
        className={`w-full flex items-center justify-center h-full rounded-[99px] border duration-500 uppercase ${
          initialValue === Side.Tails
            ? 'border-[#2E2E2E] bg-[#2E2E2E]'
            : 'border-transparent'
        }`}
      >
        {t(`pages.games.Tails`)}
      </button>
    </div>
  )
}

export default Selector
