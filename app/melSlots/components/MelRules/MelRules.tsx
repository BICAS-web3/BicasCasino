'use client'

import { MellM, PaymentModel } from '@/states'
import { useUnit } from 'effector-react'
import { X } from 'lucide-react'

import Prev from '@/public/images/mell/prev.svg'
import Next from '@/public/images/mell/next.svg'
import Close from '@/public/images/mell/close.svg'
import { useState } from 'react'
import { RulesBlock } from './components/RulesBlock'
import { Fall } from '../Fall/Fall'
import { FreeSpins } from '../FreeSpins/FreeSpins'
import { Rules } from '../Rules/Rules'
import { Htp } from '../Htp/Htp'
import { SettMenu } from '../SettMenu/SettMenu'
import { Autoplay } from '../Autoplay/Autoplay'

const tabData = ['1', '2', '3', '4']
const tabContent = [<RulesBlock />, <Fall />, <FreeSpins />, <Rules/>, <Htp />, <SettMenu/>, <Autoplay />]

export const MelRules = () => {
  const [totalVisibility, setTotalVisibility, modalVisibility, setModalVisibility] = useUnit([
    PaymentModel.$totalVisibility,
    PaymentModel.setTotalVisibility,
    MellM.$gameInfoVisibility,
    MellM.setGameInfoVisibility
  ])

  const [tabCounter, setTabCounter] = useState(0)

  const handleClose = () => {
    setTotalVisibility(false)
  }

  const tabFunction = () => {
    return tabContent[tabCounter]
  }

  const tabIncrement = () => {
    if(tabCounter === tabContent.length - 1) {
      return null
    } else {
      setTabCounter(tabCounter + 1)
    }
  }

  const tabDecrement = () => {
    if(tabCounter === 0) {
      return null
    } else {
      setTabCounter(tabCounter - 1)
    }
  }

  return (
    <div className={`w-full h-full flex justify-center absolute top-0 left-0 transition-all duration-300 bg-[rgba(0,_0,_0,_0.6)] z-[22] ${modalVisibility ? 'opacity-1 visible' : 'opacity-0 invisible'}`}>
        <div className='w-full min-h-[710px] max-w-[1115px] flex flex-col justify-between max-h-[710px] relative h-[calc(100%_-_40px)] p-[40px_20px] m-[20px] bg-[#050505F5]'>
          <X onClick={() => setModalVisibility(false)} className='absolute top-[30px] right-[30px] text-[#363636] cursor-pointer' />
          {tabFunction()}
          <div className='flex gap-[16px] items-center absolute bottom-[20px] left-[50px]'>
              <Prev onClick={tabDecrement} className='w-[45px] h-[45px] cursor-pointer' />
              <Close className='w-[45px] h-[45px] cursor-pointer' />
              <Next onClick={tabIncrement} className='w-[45px] h-[45px] cursor-pointer' />
            </div>
        </div>
    </div>
  )
}