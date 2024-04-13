import { Slider } from '@/components/ui/slider'
import { WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

interface IGameAmount {
  min: number
  max: number
  step?: number
  inputType?: WagerModel.RangeType
  title: string
}

const GameAmount = ({ min, max, step, inputType, title }: IGameAmount) => {
  const [pickedValue, pickValue] = useUnit([
    inputType == WagerModel.RangeType.Bets
      ? WagerModel.$pickedValue
      : WagerModel.$pickedRows,
    inputType == WagerModel.RangeType.Bets
      ? WagerModel.pickValue
      : WagerModel.pickRows
  ])

  useEffect(() => {
    pickValue(min)
  }, [])

  const changeInputValue = value => {
    pickValue(value[0])
  }
  return (
    <div className='flex flex-col gap-1 gradient'>
      <h3 className='text-[#7E7E7E] text-sm font-semibold'>
        {title}: {pickedValue}
      </h3>
      <div className='flex gap-3 items-center py-[9px] px-2.5 border border-[#2E2E2E] rounded-[99px] h-9'>
        <span>{min}</span>
        <Slider
          step={step}
          min={min}
          max={max}
          className='w-[255px]'
          onValueChange={changeInputValue}
        />
        <span>{max}</span>
      </div>
    </div>
  )
}

export default GameAmount
