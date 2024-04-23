import { FC, useEffect, useState } from 'react'
import GameAmount from './game.amount'
import { GameModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import { Slider } from '@/components/ui/slider'
import GameWager from './game.wager'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface GameAutoProps {}

export const GameAuto: FC<GameAutoProps> = () => {
  const [isWheel, setIsWheel] = useState(false)

  const path = usePathname()
  const navigate = useRouter()

  useEffect(() => {
    if (path.includes('wheel_of_fortune')) {
      setIsWheel(true)
    } else {
      setIsWheel(false)
    }
  }, [path])

  const [value, setValue] = useState(1)

  useEffect(() => {
    setValue(1)
  }, [])

  const changeInputValue = value => {
    pickRows(value[0])
  }

  const [inpValue, setInpValue] = useState(1.98)

  const [visible, pickRows] = useUnit([
    GameModel.$autoVisible,
    WagerModel.pickRows
  ])
  const ButtonTupe = ['Easy', 'Medium', 'Hard']
  type ButtonTupe = ['Easy', 'Medium', 'Hard']
  const [setLevel, level] = useUnit([GameModel.setLevel, GameModel.$level])
  return (
    <div
      className={`durarion-300 ${
        visible ? 'opacity-1 visible' : 'opacity-0 invisible h-0 !p-0'
      } col-start-1 col-end-3 m-[0_auto] w-full max-w-[330px] tbs:absolute tbs:top-[calc(-100%_-_80px)] bg-[#151515] tbs:right-[50px] rounded-[20px] border-[#3e3e3e] p-[10px_20px_20px_20px] box-border`}
    >
      {isWheel ? (
        <>
          {' '}
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
        </>
      ) : (
        <>
          {' '}
          <div className='flex mb-[20px] flex-col gap-1 w-full game-amount'>
            <h3 className='text-[#7E7E7E] text-sm font-semibold'>
              Number of games
            </h3>
            <div className='flex gap-3 items-center py-2 px-2.5 border border-[#2E2E2E] rounded-[99px] h-9'>
              <span>{value}</span>
              <Slider
                step={1}
                min={1}
                max={100}
                className='w-full'
                onValueChange={changeInputValue}
              />
              <span>100</span>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-[10px]'>
            <div className='flex flex-col gap-[5px]'>
              <span className='text-[#7E7E7E] text-[13px] font-medium'>
                Stop Gain
              </span>
              <div className='h-[36px] p-[0_10px] rounded-[30px] border border-[#2e2e2e] flex items-center text-[#7e7e7e] text-[12px] font-bold'>
                No limit
              </div>
            </div>
            <div className='flex flex-col gap-[5px]'>
              <span className='text-[#7E7E7E] text-[13px] font-medium'>
                Stop Loss
              </span>
              <div className='h-[36px] pl-[10px] rounded-[30px] border border-[#2e2e2e] flex items-center justify-between text-[#7e7e7e] text-[12px] font-bold'>
                <input
                  className='bg-inherit outline-none border-none w-full'
                  value={inpValue}
                  onChange={e => setInpValue(parseInt(e.target.value))}
                />
                <div
                  onClick={() => setInpValue(0)}
                  className='bg-[#20202066] rounded-[0_30px_30px_0] h-full min-w-[40px] flex items-center cursor-pointer justify-center'
                >
                  <svg
                    width='10'
                    height='10'
                    viewBox='0 0 10 10'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M1.5 0L0 1.5L3.5 5L0 8.5L1.5 10L5 6.5L8.5 10L10 8.5L6.5 5L10 1.5L8.5 0L5 3.5L1.5 0Z'
                      fill='#7E7E7E'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
