import { Slider } from '@/components/ui/slider'
import { GameModel } from '@/states'
import { useUnit } from 'effector-react'
import { RefObject, useState } from 'react'

const RollState = ({ rangeRef }: { rangeRef: RefObject<HTMLInputElement> }) => {
  const [rollOver, RollValue, setRollValue] = useUnit([
    GameModel.$RollOver,
    GameModel.$RollValue,
    GameModel.setRollValue
  ])
  const [localValue, setLocalValue] = useState(50.5)
  const onChange = el => {
    setLocalValue(el)
    if (el > 95) {
      setRollValue(95)
    } else {
      setRollValue(el)
    }
  }
  return (
    <div className='w-full flex justify-center items-center sm:block sm:w-fit mx-auto mt-auto px-5 z-[3] relative mb-5 bg-[rgba(15,15,15,0.2)] p-[20px_0_0_0]'>
      <div className='mt-auto relative z-[1] flex items-center gap-[10px] mb-3 md:mb-[15px]'>
        <span className='absolute left-1/2 -translate-x-1/2 -top-5 text-[#eaeaea] text-center text-sm font-black uppercase'>
          {localValue}
        </span>
        <span className='text-[#eaeaea] text-center text-sm font-black uppercase'>
          {rollOver ? 5 : 0.1}
        </span>
        <Slider
          ref={rangeRef}
          className='w-[230px] sm:w-[538px] xl:w-[948px]'
          min={rollOver ? 5 : 0.1}
          max={rollOver ? 99.9 : 95}
          onValueChange={onChange}
          step={0.1}
        />
        <span className='text-[#eaeaea] text-center text-sm font-black uppercase'>
          {rollOver ? 99.9 : 95}
        </span>
      </div>
    </div>
  )
}

export default RollState
