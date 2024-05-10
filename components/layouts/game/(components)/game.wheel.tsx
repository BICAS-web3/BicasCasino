import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { GameModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import { FC } from 'react'

interface GameAutoProps {}

export const WheelSettings: FC<GameAutoProps> = () => {
  const changeInputValue = value => {
    pickRows(value[0])
  }

  const [visible, pickRows] = useUnit([
    GameModel.$wheelVisible,
    WagerModel.pickRows
  ])
  const ButtonTupe = ['Easy', 'Medium', 'Hard']
  type ButtonTupe = ['Easy', 'Medium', 'Hard']
  const [setLevel, level] = useUnit([GameModel.setLevel, GameModel.$level])
  return (
    <div
      className={`duration-300 ${
        visible ? 'opacity-1 visible' : 'opacity-0 invisible h-0 !p-0'
      } col-start-1 col-end-3 m-[0_auto] w-full max-w-[330px] tbs:absolute tbs:top-[calc(-100%_-_80px)] bg-[#151515] tbs:right-[250px] rounded-[20px] border-[#3e3e3e] p-[10px_20px_20px_20px] box-border`}
    >
      <div className='flex mb-[20px] flex-col gap-1 w-full game-amount'>
        <h3 className='text-[#7E7E7E] text-sm font-semibold'>Difficulty</h3>
        <div className='flex p-[2px] border border-[#2E2E2E] justify-between rounded-[99px]'>
          {ButtonTupe.map(type => (
            <button
              className={cn(
                'flex items-center h-8 justify-center w-full text-[13px] rounded-[99px] duration-500',
                level == type && 'bg-[#282828]'
              )}
              onClick={() => setLevel(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className='flex mb-[20px] flex-col gap-1 w-full game-amount'>
        <h3 className='text-[#7E7E7E] text-sm font-semibold'>
          Number of Angles
        </h3>
        <div className='flex gap-3 items-center py-2 px-2.5 border border-[#2E2E2E] rounded-[99px] h-9'>
          <span>10</span>
          <Slider
            step={10}
            min={10}
            max={50}
            className='w-full'
            onValueChange={changeInputValue}
          />
          <span>50</span>
        </div>
      </div>
    </div>
  )
}
