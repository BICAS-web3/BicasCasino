import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { GameModel, WagerModel } from '@/states'
import { IGameAmount } from '@/types/games.types'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const MinesSettings = () => {
  const changeInputValue = value => {
    pickRows(value[0])
  }

  const [visible, pickRows] = useUnit([
    GameModel.$minesVisible,
    WagerModel.pickRows
  ])
  const [pickedValue, pickValue] = useUnit([
    WagerModel.$pickedRows,
    WagerModel.pickRows
  ])

  useEffect(() => {
    pickValue(1)
  }, [])

  const { t } = useTranslation()

  return (
    <div
      className={`duration-300 ${
        visible ? 'opacity-1 visible' : 'opacity-0 invisible h-0 !p-0'
      } col-start-1 col-end-3 m-[0_auto] w-full max-w-[330px] tbs:absolute tbs:top-[calc(-100%_-_10px)] bg-[#151515] tbs:right-[250px] rounded-[20px] border-[#3e3e3e] p-6 box-border`}
    >
      <div className='flex flex-col gap-1 w-full max-w-full sm:max-w-64 game-amount'>
        <h3 className='text-[#7E7E7E] text-sm font-semibold'>
          {t(`pages.games.mines`)} {pickedValue}
        </h3>
        <div className='flex gap-3 items-center py-2 px-2.5 border border-[#2E2E2E] rounded-[99px] h-9'>
          <span>{pickedValue}</span>
          <Slider
            min={1}
            max={24}
            className='w-full'
            onValueChange={changeInputValue}
          />
          <span>{24}</span>
        </div>
      </div>
    </div>
  )
}
