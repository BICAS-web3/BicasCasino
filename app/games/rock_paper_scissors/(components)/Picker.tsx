import { FC, useEffect } from 'react'

import { useUnit } from 'effector-react'
import clsx from 'clsx'
import { GameModel } from '@/states'
import { PaperButton, RockButton, ScissorsButton } from '../(icons)'

interface RpsPickerProps {}

export const RpsPicker: FC<RpsPickerProps> = () => {
  const [pickedValue, pickValue, active] = useUnit([
    GameModel.$pickedValueRPS,
    GameModel.pickValueRPS,
    GameModel.$activeRPS
  ])

  return (
    <div className='grid grid-cols-3 gap-x-1.5 mt-5 mb-3 sm:mb-0'>
      <div
        onClick={() => active && pickValue(GameModel.RPSValue.Rock)}
        className={clsx(
          'duration-300 cursor-pointer bg-[#202020] flex w-full items-end justify-center py-[15px] sm:px-5 md:px-[35px] xl:px-[46.5px] group hover:bg-[#2e2e2e] rounded-[12px_5px_5px_12px]',
          pickedValue === GameModel.RPSValue.Rock && 'bg-[#2e2e2e]'
        )}
      >
        <RockButton
          className={`${
            pickedValue === GameModel.RPSValue.Rock
              ? 'text-[#eaeaea]'
              : 'text-[#7e7e7e]'
          } group-hover:text-[#eaeaea] duration-300`}
        />
      </div>
      <div
        onClick={() => active && pickValue(GameModel.RPSValue.Scissors)}
        className={clsx(
          'duration-300 cursor-pointer rounded-[5px]  bg-[#202020] flex w-full items-end justify-center py-[15px] sm:px-5 md:px-[35px] xl:px-[46.5px] group hover:bg-[#2e2e2e]',
          pickedValue === GameModel.RPSValue.Scissors && 'bg-[#2e2e2e]'
        )}
      >
        <ScissorsButton
          className={`${
            pickedValue === GameModel.RPSValue.Scissors
              ? 'text-[#eaeaea]'
              : 'text-[#7e7e7e]'
          } group-hover:text-[#eaeaea] duration-300`}
        />
      </div>
      <div
        onClick={() => active && pickValue(GameModel.RPSValue.Paper)}
        className={clsx(
          'duration-300 cursor-pointer bg-[#202020] flex w-full items-end justify-center py-[15px] sm:px-5 md:px-[35px] xl:px-[46.5px] group hover:bg-[#2e2e2e] rounded-[5px_12px_12px_5px]',
          pickedValue === GameModel.RPSValue.Paper && 'bg-[#2e2e2e]'
        )}
      >
        <PaperButton
          className={`${
            pickedValue === GameModel.RPSValue.Paper
              ? 'text-[#eaeaea]'
              : 'text-[#7e7e7e]'
          } group-hover:text-[#eaeaea] duration-300`}
        />
      </div>
    </div>
  )
}
