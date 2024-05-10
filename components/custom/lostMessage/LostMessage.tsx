import { GameModel } from '@/states'
import { useUnit } from 'effector-react'
import { FC, useEffect } from 'react'

interface ILostMessage {
  amount: string
}

const LostMessage: FC<ILostMessage> = ({ amount }) => {
  const [setGameStatus] = useUnit([GameModel.setGameStatus])
  useEffect(() => {
    setTimeout(() => {
      setGameStatus(GameModel.GameStatus.Draw)
    }, 1000)
  }, [])
  return (
    <div
      className='sm:inline-flex flex w-[144px] px-[39px] sm:px-[35px] sm:py-5 py-[14px] flex-col sm:items-start items-center justify-center gap-[14px] sm:gap-2 sm:rounded-[0px_0px_12px_12px] rounded-[12px_12px_0px_0px] bg-[#202020]'
      data-winlostid='win_message'
    >
      <div className='text-[#7e7e7e] text-center text-sm sm:text-lg font-black uppercase min-w-max'>
        YOU LOST
      </div>
      <div className='w-full text-[#7e7e7e] text-center text-xs sm:text-base font-black flex justify-center items-center'>
        {amount}
      </div>
    </div>
  )
}
export default LostMessage
