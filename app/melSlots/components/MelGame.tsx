'use client'
import { useSocket } from '@/components/providers/socket.provider'
import { useUnSubscribe } from '@/lib/utils/unsubscube'
import bg from '@/public/images/mell/bg.png'
import BuyBorder from '@/public/images/mell/buyTableBorder.svg'
import historyBorder from '@/public/images/mell/historyBorder.png'
import melBg from '@/public/images/mell/mellBg.png'
import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { AutoPlaySettings } from './AutoPlaySettings/AutoPlaySettings'
import { BuyFree } from './BuyFree/BuyFree'
import { MelRules } from './MelRules/MelRules'
import { MobileRules } from './MobileRules/MobileRules'
import { Settings } from './Settings/Settings'
import { HistoryItem } from './historyBlock/HistoryItem'
import { MelBottomMenu } from './melBottomMenu/MelBottomMenu'

const testData = [
  [
    [1, 3, 4, 2, 0],
    [3, 1, 6, 4, 4],
    [1, 6, 4, 7, 8],
    [5, 2, 6, 6, 0],
    [4, 5, 7, 11, 1],
    [2, 6, 2, 3, 14]
  ]
]

function transformData(data: number[][][]): number[][][] {
  return data.map(screen =>
    screen.slice(0, 5).map(item => [...item, Math.floor(Math.random() * 15)])
  )
}

const newData = transformData(testData)

interface MelGameProps {}

interface Iresponse {
  type: 'Bet'
  id: 0
  timestamp: 1717185497
  amount: '1'
  profit: '0'
  num_games: 1
  outcomes: '[]'
  profits: '[0]'
  bet_info: '{"buy_free_spins": false, "use_free_spins": false}'
  state: '{"free_spins":0,"total_win":"0","game_fields":[[[1,3,4,2,0],[3,1,6,4,4],[1,6,4,7,8],[5,2,6,6,0],[4,5,7,11,1],[2,6,2,3,14]]],"multipliers":["8","100"],"total_win_per_tumble":["0"]}'
  uuid: '3b917666-39e9-4834-a9f5-bc177bab9015'
  game_id: 17
  user_id: 96
  username: '324er'
  coin_id: 1
  userseed_id: 1785
  serverseed_id: 198
}

export const MelGame: FC<MelGameProps> = () => {
  const socket = useSocket()
  const [start, setStart] = useState(true)
  const [keep, setKeep] = useState(false)

  const [
    profit,
    betsAmount,
    cryptoValue,
    stopGain,
    stopLoss,
    setGameStatus,
    gameStatus,
    setWonStatus,
    setLostStatus,
    setCoefficient,
    setWaitingResponse,
    gamesList,
    result,
    setResult,
    socketLogged,
    isDrax,
    userInfo,
    multiplier,
    setCryptoValue,
    socketReset,
    isPlaying,
    setIsPlaying
  ] = useUnit([
    GameModel.$profit,
    WagerModel.$pickedValue,
    WagerModel.$cryptoValue,
    WagerModel.$stopGain,
    WagerModel.$stopLoss,
    GameModel.setGameStatus,
    GameModel.$gameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    GameModel.setCoefficient,
    GameModel.setWaitingResponse,
    GameModel.$gamesList,
    GameModel.$result,
    GameModel.setResult,
    UserModel.$socketLogged,
    UserModel.$isDrax,
    UserModel.$userInfo,
    GameModel.$multiplier,
    WagerModel.setCryptoValue,
    UserModel.$socketReset,
    GameModel.$isPlaying,
    GameModel.setIsPlaying
  ])

  useEffect(() => {
    setGameStatus(null)
  }, [])

  const [gameFields, setGameFields] = useState<number[][][]>([[[]]])

  useEffect(() => {
    console.log(gameFields)
  }, [gameFields[0]])

  useEffect(() => {
    if (
      socket &&
      socket.readyState === WebSocket.OPEN &&
      gamesList.length > 0
    ) {
      socket?.send(JSON.stringify({ type: 'UnsubscribeAllBets' }))
      if (!subscribed) {
        socket?.send(
          JSON.stringify({
            type: 'SubscribeBets',
            payload: [17]
          })
        )
        setCubscribed(true)
      }
    }
  }, [socket, socket?.readyState, gamesList.length, socketReset])
  const [coefficientData, setCoefficientData] = useState<number[]>([])

  useEffect(() => {
    if (result) {
      if (result.type === 'State' && result.state) {
        setCryptoValue(Number(result.amount))
        if (result?.amount && start) {
          setIsPlaying(true)

          setStart(false)
        }
        setKeep(true)
      } else if (result.type === 'Bet' && result.state) {
        const dataState = JSON.parse(result.state)
        if (dataState) {
          const isFreeSpins = dataState.free_spins
          const game_fields = dataState.game_fields as number[][][]
          setGameFields(game_fields)
        }
        const fullAmount = Number(result.amount) * result.num_games!
        setCoefficientData(prev => [
          fullAmount === 0 ? 0 : Number(result.profit) / fullAmount,
          ...prev
        ])
        setWaitingResponse(false)
        if (
          Number(result.profit) > Number(result.amount) ||
          Number(result.profit) === Number(result.amount)
        ) {
          setGameStatus(GameModel.GameStatus.Won)
          const multiplier = Number(
            Number(result.profit) / Number(result.amount)
          )
          setWonStatus({
            profit: Number(result.profit),
            multiplier,
            token: 'DRAX'
          })
        } else if (Number(result.profit) < Number(result.amount)) {
          setGameStatus(GameModel.GameStatus.Lost)
          setLostStatus(Number(result.profit) - Number(result.amount))
        }
        setIsPlaying(false)
      }
    }
    setResult(null)
  }, [result, start])
  const [access_token] = useUnit([RegistrModel.$access_token])

  const [betData, setBetData] = useState({})
  const [defaultBet, setDefaultBet] = useState(true)
  const [isFreeSpins, setIsFreeSpins] = useState(false)
  const [buyFreeSpins, setBuyFreeSpins] = useState(false)
  useEffect(() => {
    const responseBet = () => {
      if (defaultBet) {
        return '{"buy_free_spins": false, "use_free_spins": false}'
      } else if (isFreeSpins) {
        return '{"buy_free_spins": false, "use_free_spins": true}'
      } else if (buyFreeSpins) {
        return '{"buy_free_spins": false, "use_free_spins": true}'
      } else {
        return '{"buy_free_spins": false, "use_free_spins": false}'
      }
    }

    setBetData({
      type: 'MakeBet',
      game_id: gamesList.find(item => item.name === 'BigSlots')?.id || 17,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: responseBet(),
      amount: `${cryptoValue || 0}`,
      stop_loss: Number(stopLoss) || 0,
      stop_win: Number(stopGain) || 0,
      num_games: betsAmount
    })
  }, [stopGain, stopLoss, cryptoValue, isDrax, betsAmount, isPlaying])
  const [subscribed, setCubscribed] = useState(false)
  useEffect(() => {
    if (
      socket &&
      isPlaying &&
      access_token &&
      socket.readyState === WebSocket.OPEN
    ) {
      socket.send(JSON.stringify(betData))
    }
    if (
      socket &&
      access_token &&
      socket.readyState === WebSocket.OPEN &&
      !subscribed &&
      gamesList?.length > 0
    ) {
      socket.send(
        JSON.stringify({
          type: 'SubscribeBets',
          payload: [gamesList.find(item => item.name === 'BigSlots')?.id || 17]
        })
      )
      setCubscribed(true)
    }
  }, [socket, isPlaying, access_token, gamesList])

  useEffect(() => {
    if (
      access_token &&
      socket &&
      socket.readyState === WebSocket.OPEN &&
      gamesList?.length > 0 &&
      socketLogged
    ) {
      socket.send(
        JSON.stringify({
          type: 'GetState',
          game_id: gamesList.find(item => item.name === 'BigSlots')?.id || 17,
          coin_id: isDrax ? 2 : 1
        })
      )
    }
  }, [socket, gamesList, isDrax, isPlaying, access_token, socketLogged])

  useEffect(() => {
    return () => useUnSubscribe({ gamesList, socket, name: 'BigSlots' })
  }, [])

  return (
    <div className='w-full min-h-[1000px] sm:min-h-[1100px] xsl:min-h-[910px] pb-5 sm:p-10 sm:pb-5 flex flex-col relative'>
      <div
        className={`relative flex justify-start pt-[30px] flex-col flex-[1_1_auto] sm:rounded-[20px_20px_0_0] overflow-hidden sm:max-h-max sm:min-h-[594px] xl:min-h-[618px] 3xl:min-h-[680px] `}
      >
        <MelRules />
        <AutoPlaySettings />
        <Settings />
        <MobileRules />
        {/* <WinBlock winValue={10} title='ad' text='asd' /> */}
        <BuyFree />
        <span className='mell-title ml-0 xsl:ml-[150px] mb-[30px] mde:ml-[0] uppercase relative w-full z-10 text-center font-bold text-[15px] sm:text-[20px] tmd:text-[29px]'>
          Символы оплачиваются, где бы они не выпали
        </span>
        <div className='mel-slots-table ml-0 xsl:ml-[300px] mde:ml-[0] h-full max-h-[550px] z-[20] items-center flex justify-center mb-[70px] relative'>
          <div className='max-w-[850px] h-[100vh] w-full relative items-center flex justify-center max-h-[600px]'>
            <div className='absolute hidden sm:flex left-[25px] xsl:left-[-100%] gap-[20px] flex-row xsl:flex-col top-[90%] tbbs:top-[100%] xsl:top-[auto] bottom-[auto] xsl:bottom-[30px] w-full items-end'>
              <div className='w-full min-w-[10px] sxs:min-w-[140px] max-w-[10px] sxs:max-w-[190px] p-[30px_10px_10px_5px] xsl:p-[20px_10px_10px_5px] h-[140px] flex flex-col items-center text-center relative'>
                <BuyBorder className='absolute w-full h-full top-0 left-0' />
                <span className='buy-text relative z-[5] uppercase text-center text-[10px] xsl:text-[15px] font-medium'>
                  купить <br /> бесплатные <br /> спины
                </span>
                <span className='buy-qt-text relative z-[5] flex items-end text-[18px] xsl:text-[28px] font-extrabold leading-[40px] gap-[15px]'>
                  20,00{' '}
                  <span className='uppercase text-[16px] xsl:text-[24px] leading-[40px] xsl:leading-[35px]'>
                    dc
                  </span>
                </span>
              </div>
              <div className='w-full max-w-[190px] xsl:max-w-[190px] justify-end p-[20px_15px_10px_15px] h-[220px] xsl:h-[260px] flex flex-col items-center text-center relative'>
                <img
                  src={historyBorder.src}
                  className='absolute w-full h-full top-0 left-0'
                />
                <HistoryItem />
              </div>
            </div>
            <div className='w-full h-full z-[1] relative px-[70px] py-10'>
              {newData.map((screen, i) => (
                <div className='flex flex-col gap-[10px]' key={i + 4}>
                  {screen.map((item, j) => (
                    <div className=' w-full flex justify-between' key={j}>
                      {item.map((number, i) => (
                        <div
                          key={i + number}
                          className='relative z-[1] w-auto h-auto flex-auto '
                        >
                          <Image
                            width={97}
                            height={90}
                            src={`/images/melslots/${number}.png`}
                            alt=''
                            className='max-h-[91px]'
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <Image
              width={870}
              height={606}
              alt='bg'
              src={bg}
              className='absolute p-[20px] top-0 left-0 w-full'
            />
          </div>
        </div>
        <div className='flex sm:hidden p-[0_10px] relative z-[2] bottom-[130px] items-end'>
          <div className='w-full max-w-[190px] p-[30px_10px_10px_5px] xsl:p-[20px_10px_10px_5px] h-[140px] flex flex-col items-center text-center relative'>
            <BuyBorder className='absolute w-full h-full top-0 left-0' />
            <span className='buy-text relative z-[5] uppercase text-center text-[10px] xsl:text-[15px] font-medium'>
              купить <br /> бесплатные <br /> спины
            </span>
            <span className='buy-qt-text relative z-[5] flex items-end text-[18px] xsl:text-[28px] font-extrabold leading-[40px] gap-[15px]'>
              20,00{' '}
              <span className='uppercase text-[16px] xsl:text-[24px] leading-[40px] xsl:leading-[35px]'>
                dc
              </span>
            </span>
          </div>
          <div className='w-full max-w-[190px] xsl:max-w-[190px] justify-end p-[20px_15px_10px_15px] h-[220px] xsl:h-[260px] flex flex-col items-center text-center relative'>
            <img
              src={historyBorder.src}
              className='absolute w-full h-full top-0 left-0'
            />
            <HistoryItem />
          </div>
        </div>
        <img
          src={melBg.src}
          className='absolute object-cover w-full h-full top-0 left-0'
        />
        <MelBottomMenu />
      </div>
    </div>
  )
}
