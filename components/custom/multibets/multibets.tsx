'use client'
import { FC, useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
// import { MultibetsModel } from './'
import { Slider } from '@/components/ui/slider'

import { WagerModel } from '@/states'
import BottomSelector from '../bottomSelector'

interface MultibetsProps {
  inputTitle?: string
  min?: number
  max?: number
  step?: number
  customArr?: number[]
  inputType?: WagerModel.RangeType
}

const Multibets: FC<MultibetsProps> = ({
  inputTitle = 'Bets',
  min = 1,
  step = 1,
  max = 100,
  inputType = 'range',
  customArr
}) => {
  const [range, setRange] = useState([1])
  const [value, setValue] = useState(0)
  const [trackWidth, setTrackWidth] = useState(0)
  const [pickedValue, pickValue] = useUnit([
    inputType == WagerModel.RangeType.Bets
      ? WagerModel.$pickedValue
      : WagerModel.$pickedRows,
    inputType == WagerModel.RangeType.Bets
      ? WagerModel.pickValue
      : WagerModel.pickRows
  ])

  useEffect(() => {
    // pickPlinkoRows(8);
    setValue(min)
  }, [])

  useEffect(() => {
    if (inputType === 'plinkoRows') {
      //   pickPlinkoRows(value)
    }
  }, [value])

  useEffect(() => {
    pickValue(min)
  }, [])

  const changeInputValue = (e: any) => {
    pickValue(Number(e.target.value))
  }

  const handleInputBtns = (val: any) => {
    pickValue(Number(val))
  }

  useEffect(() => {
    const newTrackWidth =
      pickedValue === min ? 0 : ((pickedValue - min) / (max - min)) * 100
    setTrackWidth(newTrackWidth)
  }, [pickedValue])

  // const value = max / 4;
  const arrData =
    max > 25
      ? [15, 25, 50, max]
      : [
          min,
          Math.ceil(min + (max - min) / 4),
          ,
          Math.ceil(min + (max - min) / 2),
          max
        ]
  return (
    <div className='mt-3'>
      <h3 className='text-[#7e7e7e] text-xs font-semibold mb-1'>
        {inputTitle}
      </h3>
      <div className='flex items-center rounded-t-mb sm:rounded-t-lp bg-[#0f0f0f] py-[9.5px] px-[15px]'>
        <span className='min-w-[25px] text-white-acc text-sm font-bold uppercase mr-[10px] w-[25px]'>
          {pickedValue}
        </span>
        <div className='relative w-full h-[6px]'>
          {/* <input
            type='range'
            className={`${s.custom_range_input} ${s.custom_range_track}`}
            onChange={changeInputValue}
            value={pickedValue}
            max={max}
            min={min}
            step={step}
            style={{ '--sx': `${trackWidth}%` } as any}
          /> */}
          <Slider
            color='text-red-300'
            value={[pickedValue]}
            max={max}
            min={min}
            step={step}
          />
        </div>

        <span className='text-[#7e7e7e] text-sm font-bold uppercase ml-[10px]'>
          {max}
        </span>
      </div>
      <BottomSelector
        onClick={handleInputBtns}
        data={customArr ? customArr : (arrData as number[])}
      />
    </div>
  )
}

export default Multibets
