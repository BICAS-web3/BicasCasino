import { cn } from '@/lib/utils'
import { FC } from 'react'

interface ISelector {
  diceValue: any[]
  onClick?: () => void
}

const Selector: FC<ISelector> = props => {
  const { diceValue, onClick } = props
  return (
    <div
      className={
        'bg-[#151515] flex justify-center items-center gap-1.5 px-0  md:px-5 xl:px-2 py-4 relative z-[1] w-full xl:w-auto'
      }
    >
      {diceValue.map(dice => (
        <div
          key={dice.id}
          className={
            'max-w-[220px] sm:max-w-[172px] md:max-w-max min-w-[92px] mt-1.5 flex-[1_1_auto] w-full flex flex-col'
          }
        >
          <h3 className={'text-[#7e7e7e] text-sm font-semibold'}>
            {dice.title === 'Roll' ? 'Height' : dice.title}
          </h3>
          <div
            className={cn(
              'flex justify-between items-center pl-4 bg-[#0f0f0f] rounded-mb sm:rounded-lp overflow-hidden mt-1.5'
            )}
          >
            <span
              className={
                'text-[#eaeaea] text-center text-sm font-bold uppercase'
              }
            >
              {dice.value}
            </span>
            <div
              className={cn(
                'cursor-pointer h-10 w-10 flex items-center justify-center'
              )}
            >
              {dice.title !== 'Roll' && (
                <dice.img_src
                  onClick={() => {
                    dice.title === 'Roll' && onClick?.()
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Selector
