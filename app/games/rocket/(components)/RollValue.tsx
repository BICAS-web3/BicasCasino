import { GameModel } from '@/states'
import { useUnit } from 'effector-react'
import { ChangeEvent, RefObject } from 'react'

const RollState = ({ rangeRef }: { rangeRef: RefObject<HTMLInputElement> }) => {
  const [rollOver, RollValue, setRollValue] = useUnit([
    GameModel.$RollOver,
    GameModel.$RollValue,
    GameModel.setRollValue
  ])
  const onChange = (el: ChangeEvent<HTMLInputElement>) => {
    const number_value = Number(el.target.value.toString())

    setRollValue(number_value)
  }
  return (
    <div className='w-full flex justify-center items-center sm:block sm:w-fit mx-auto mt-auto px-5 z-[3] relative mb-5 bg-[rgba(15,15,15,0.2)] p-[20px_0_0_0]'>
      <div className='mt-auto relative z-[1] flex items-center gap-[10px] mb-3 md:mb-[15px]'>
        <span
          className={
            'absolute left-1/2 -translate-x-1/2 -top-5 text-[#eaeaea] text-center text-sm font-black uppercase'
          }
        >
          {RollValue}
        </span>
        <span className='text-[#eaeaea] text-center text-sm font-black uppercase'>
          {rollOver ? 5 : 0.1}
        </span>
        <input
          className={`dice_range ${rollOver ? 'dice_over' : 'dice_under'}`}
          type='range'
          min={rollOver ? 5 : 0.1}
          max={rollOver ? 99.9 : 95}
          value={RollValue}
          onChange={onChange}
          ref={rangeRef}
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
