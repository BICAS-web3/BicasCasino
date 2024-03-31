'use client'

import { useUnit } from 'effector-react'

import { WagerModel } from '@/states'

import GainItem from './components/item'

const StopGain = () => {
  const [pickStopLoss, pickStopGain] = useUnit([
    WagerModel.pickStopLoss,
    WagerModel.pickStopGain
  ])

  return (
    <div className='grid grid-cols-2 gap-[5px] mt-[14px] relative'>
      <GainItem title='Stop Gain' setValue={pickStopGain} />
      <GainItem title='Stop Loss' setValue={pickStopLoss} />
    </div>
  )
}

export default StopGain
