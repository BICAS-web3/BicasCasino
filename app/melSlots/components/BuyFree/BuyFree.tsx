import { FC, useState } from 'react'
import Border from '@/public/images/mell/buyFreeBorder.svg'
import { useUnit } from 'effector-react'
import { GameModel, MellM, RegistrModel, UserModel, WagerModel } from '@/states'
import DeclineBorder from '@/public/images/mell/approveBorder.svg'
import ApproveBorder from '@/public/images/mell/declineBorder.svg'
import { useSocket } from '@/components/providers/socket.provider'

interface BuyFreeProps {}

export const BuyFree: FC<BuyFreeProps> = () => {
  const [modalVisibility, setModalVisibility] = useUnit([
    MellM.$buy,
    MellM.setBuy
  ])

  const socket = useSocket()

  const [
    betsAmount,
    cryptoValue,
    stopGain,
    stopLoss,
    gamesList,
    isDrax,
    userInfo,
    isPlaying
  ] = useUnit([
    WagerModel.$pickedValue,
    WagerModel.$cryptoValue,
    WagerModel.$stopGain,
    WagerModel.$stopLoss,
    GameModel.$gamesList,
    UserModel.$isDrax,
    UserModel.$userInfo,
    GameModel.$isPlaying
  ])
  const [access_token] = useUnit([RegistrModel.$access_token])

  const buyFreeSpeend = () => {
    if (
      socket &&
      isPlaying &&
      access_token &&
      socket.readyState === WebSocket.OPEN
    ) {
      socket.send(
        JSON.stringify({
          type: 'MakeBet',
          game_id: gamesList.find(item => item.name === 'BigSlots')?.id || 17,
          coin_id: isDrax ? 2 : 1,
          user_id: userInfo?.id || 0,
          data: { buy_free_spins: false, use_free_spins: true },
          amount: `${cryptoValue || 0}`,
          stop_loss: Number(stopLoss) || 0,
          stop_win: Number(stopGain) || 0,
          num_games: betsAmount
        })
      )
    }
  }

  return (
    <div
      className={`w-full p-[20px] h-full flex justify-center items-center absolute top-0 left-0 transition-all duration-300 bg-[rgba(0,_0,_0,_0.6)] z-[22] ${
        modalVisibility ? 'opacity-1 visible' : 'opacity-0 invisible'
      }`}
    >
      <div
        onClick={() => alert(1)}
        className='w-full relative flex flex-col items-center p-[30px] max-w-[435px] sm:h-full bg-[#000] max-h-[280px]'
      >
        <Border className='w-full h-full absolute top-0 left-0' />
        <span className='buy-text uppercase text-center text-[18px] sm:text-[28px] font-medium'>
          купить <br /> бесплатные спины
        </span>
        <span className='buy-qt-text flex items-end text-[25px] sm:text-[44px] font-extrabold leading-[60px] gap-[15px]'>
          20,00{' '}
          <span className='uppercase text-[22px] sm:text-[36px] leading-[60px] sm:leading-[53px]'>
            dc
          </span>
        </span>
        <div className='mt-0 sm:mt-[20px] justify-center w-full flex items-center gap-[20px]'>
          <div
            className='w-full max-w-[130px] h-[56px] relative cursor-pointer'
            onClick={() => setModalVisibility(false)}
          >
            <DeclineBorder className='absolute top-0 left-0 w-full h-full' />
          </div>
          <div className='w-full max-w-[130px] h-[56px] relative cursor-pointer'>
            <ApproveBorder className='absolute top-0 left-0 w-full h-full' />
          </div>
        </div>
      </div>
    </div>
  )
}
