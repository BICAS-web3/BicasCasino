'use client'

import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import Image from 'next/image'

import { useSocket } from '@/components/providers/socket.provider'
import Coefficient from '@/components/ui/coefficient'
import TotalCoeff from '@/components/ui/total.coeff'

// import { Preload } from '@/shared/ui/Preload'

import { GameModel, RegistrModel, SessionModel, WagerModel } from '@/states'

import applesBg from '@/public/images/apples/applesBg.webp'

import AppleTable from './components/appleTable'
import Preload from '@/components/ui/preload'

const AppleGame = () => {
  const [appleData, setAppleData] = useState<IAppleData[]>([])

  const [setEmpty] = useUnit([GameModel.setEmptyField])

  useEffect(() => {
    if (appleData.length === 0) {
      setEmpty(true)
    } else {
      setEmpty(false)
    }
  }, [appleData.length])

  useEffect(() => {
    const data = appleData.map(el => el.value)
    setApples(data)
  }, [appleData])
  const [applesArr, setApplesArr] = useState(Array(27).fill({}))
  const [chunkedApplesArr, setChunkedApplesArr] = useState<any>([])

  useEffect(() => console.log(chunkedApplesArr), [chunkedApplesArr])

  useEffect(() => {
    const updateChunkedArray = () => {
      const arr: any[] = []
      const chunkSize = 3

      for (let i = 0; i < applesArr.length; i += chunkSize) {
        const chunk = applesArr.slice(i, i + chunkSize)
        let cf = 0
        switch (i) {
          case 0:
            cf = 64
            break
          case 3:
            cf = 32
            break
          case 6:
            cf = 16
            break
          case 9:
            cf = 8
            break
          case 12:
            cf = 4
            break
          case 15:
            cf = 2
            break
          case 18:
            cf = 1.7
            break
          case 21:
            cf = 1.5
            break
          case 24:
            cf = 1.3
            break
          default:
            cf = 0
            break
        }

        arr.push({ apples: chunk, cf: cf })
      }

      setChunkedApplesArr(arr)
    }

    updateChunkedArray()
  }, [applesArr])

  interface IAppleData {
    number: number
    value: number
  }
  const [isLoading, setIsLoading] = useState(false)
  const [
    lost,
    profit,
    playSounds,
    setActivePicker,
    pickSide,
    wagered,
    setWagered,
    betsAmount,
    gameAddress,
    pickedToken,
    currentBalance,
    cryptoValue,
    stopGain,
    stopLoss,
    allowance,
    setGameStatus,
    gameStatus,
    setWonStatus,
    setLostStatus,
    setCoefficient,
    waitingResponse,
    setWaitingResponse,
    setIsPlaying,
    setBetValue,
    betValue,
    pickedSide,
    appleGameResult,
    setAppleGameResult,
    reset,
    refund,
    setRefund,
    gamesList,
    // result,
    // setResult,
    // socketLogged,
    // isDrax,
    // userInfo,
    isPlaying,
    multiplier,
    setCryptoValue,
    stop,
    setStop,
    setApples
    // socketReset,
    // socketAuth
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$playSounds,
    GameModel.setActive,
    GameModel.pickSide,
    WagerModel.$Wagered,
    WagerModel.setWagered,
    WagerModel.$pickedValue,
    SessionModel.$gameAddress,
    WagerModel.$pickedToken,
    SessionModel.$currentBalance,
    WagerModel.$cryptoValue,
    WagerModel.$stopGain,
    WagerModel.$stopLoss,
    SessionModel.$currentAllowance,
    GameModel.setGameStatus,
    GameModel.$gameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    GameModel.setCoefficient,
    GameModel.$waitingResponse,
    GameModel.setWaitingResponse,
    GameModel.setIsPlaying,
    GameModel.setBetValue,
    GameModel.$betValue,
    GameModel.$pickedSide,
    GameModel.$gameResult,
    GameModel.setGameResult,
    GameModel.$reset,
    GameModel.$refund,
    GameModel.setRefund,
    GameModel.$gamesList,
    // BetsModel.$result,
    // BetsModel.setResult,
    // LayoutModel.$socketLogged,
    // BalanceModel.$isDrax,
    // LayoutModel.$userInfo,
    GameModel.$isPlaying,
    GameModel.$multiplier,
    WagerModel.setCryptoValue,
    GameModel.$stop,
    GameModel.setStop,
    GameModel.setApples
    // LayoutModel.$socketReset,
    // LayoutModel.$socketAuth
  ])

  const [mines, setMines] = useState<boolean[][]>([])

  const [appleItem, setAppleItem] = useState<number[]>([])

  //   useEffect(() => {
  //     if (result) {
  //       if (result.type === 'State' && result.state) {
  //         const dataState = JSON.parse(result.state).state
  //         setCryptoValue(Number(result.amount))
  //         if (result?.amount && start) {
  //           setIsPlaying(true)
  //           setApples(JSON.parse(result.state).picked_tiles)
  //           setMines(dataState)
  //           setStart(false)
  //           setAppleData(
  //             dataState.map((_: any, i: number) => {
  //               return {
  //                 value: 5,
  //                 number: 1
  //               }
  //             })
  //           )
  //         }
  //         console.log('first level: ', dataState)

  //         setMines(() => dataState)
  //         setKeep(true)
  //       } else if (result.type === 'Bet' && result.state) {
  //         const data = JSON.parse(result!.state)

  //         setWaitingResponse(false)
  //         if (
  //           Number(result.profit) > Number(result.amount) ||
  //           Number(result.profit) === Number(result.amount)
  //         ) {
  //           setGameStatus(GameModel.GameStatus.Won)
  //           const multiplier = Number(
  //             Number(result.profit) / Number(result.amount)
  //           )
  //           setWonStatus({
  //             profit: Number(result.profit),
  //             multiplier,
  //             token: 'DRAX'
  //           })
  //           setTimeout(() => {
  //             setAppleGameResult([])
  //             setAppleData([])
  //             setApples([])
  //             setMines([])
  //             setInGame(false)
  //             setIsPlaying(false)
  //             setKeep(false)
  //             setFirstBet(true)
  //             handleReset()
  //             setStop(false)
  //             setAppleItem([])
  //           }, 200)
  //         } else if (Number(result.profit) < Number(result.amount)) {
  //           const dataState = JSON.parse(result.state).state
  //           setApples(JSON.parse(result.state).picked_tiles)
  //           setMines(dataState)
  //           setGameStatus(GameModel.GameStatus.Lost)
  //           setLostStatus(Number(result.profit) - Number(result.amount))
  //           setTimeout(() => {
  //             setInGame(false)
  //             setIsPlaying(false)
  //             setKeep(false)
  //             setFirstBet(true)
  //             handleReset()
  //             setAppleItem([])
  //             setTimeout(() => {
  //               setAppleGameResult([])
  //               setAppleData([])
  //               setApples([])
  //               setMines([])
  //             }, 300)
  //           }, 200)
  //         } else {
  //           setGameStatus(GameModel.GameStatus.Draw)
  //           setTimeout(() => {
  //             setAppleGameResult([])
  //             setAppleData([])
  //             setApples([])
  //             setMines([])
  //             setInGame(false)
  //             setIsPlaying(false)
  //             setKeep(false)
  //             setFirstBet(true)
  //             handleReset()
  //             setAppleItem([])
  //           }, 200)
  //         }
  //         // setKeep(false);
  //       }
  //     }
  //     setResult(null)
  //   }, [result, result?.type])

  useEffect(() => {
    setIsCashout(stop)
  }, [stop])

  const [isCashout, setIsCashout] = useState(true)

  const [coefficientData, setCoefficientData] = useState<number[]>([])

  useEffect(() => {
    setCoefficient(1.98)
  }, [])

  const [inGame, setInGame] = useState<boolean>(false)

  useEffect(() => {
    setActivePicker(true)
    setInGame(false)
    if (gameStatus == GameModel.GameStatus.Won) {
      pickSide(pickedSide)
    } else if (gameStatus == GameModel.GameStatus.Lost) {
      pickSide(pickedSide ^ 1)
    }
  }, [gameStatus])

  useEffect(() => setInGame(true), [inGame])

  const [fullWon, setFullWon] = useState(0)
  const [fullLost, setFullLost] = useState(0)
  const [totalValue, setTotalValue] = useState(0.1)
  const [localAmount, setLocalAmount] = useState<any>(0)
  const [localCryptoValue, setLocalCryptoValue] = useState(0)
  const [gameResult, setGameResult] = useState<
    { value: number; status: 'won' | 'lost' }[]
  >([])
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon(prev => prev + profit)
      setGameResult(prev => [
        ...prev,
        { value: localCryptoValue * localAmount, status: 'won' }
      ])
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost(prev => prev + lost)
      setGameResult(prev => [...prev, { value: 0.0, status: 'lost' }])
    }
    setTotalValue(fullWon - fullLost)
  }, [GameModel.GameStatus, profit, lost])

  useEffect(() => setInGame(isPlaying), [isPlaying])
  const [access_token] = useUnit([RegistrModel.$access_token])
  const [taken, setTaken] = useState(false)
  const handleReset = () => {
    setAppleGameResult([])
    setAppleData([])
    setApples([])
  }

  useEffect(() => {
    handleReset()
  }, [reset])

  const socket = useSocket()
  const subscribe = {
    type: 'SubscribeBets',
    payload: [gamesList.find(item => item.name === 'Apples')?.id]
  }

  const [betData, setBetData] = useState({})

  const [coninue, setContinue] = useState(0)
  //   useEffect(() => {
  //     if (firstBet) {
  //       setBetData({
  //         type: 'MakeBet',
  //         game_id: gamesList.find(item => item.name === 'Apples')?.id,
  //         coin_id: isDrax ? 2 : 1,
  //         user_id: userInfo?.id || 0,
  //         data: '{"difficulty":1}',
  //         amount: `${cryptoValue || 0}`,
  //         stop_loss: Number(stopLoss) || 0,
  //         stop_win: Number(stopGain) || 0,
  //         num_games: betsAmount
  //       })
  //       if (isPlaying) {
  //         setFirstBet(false)
  //         setKeep(true)
  //       }
  //     } else {
  //       if (keep) {
  //         setBetData({
  //           type: 'ContinueGame',
  //           game_id: gamesList.find(item => item.name === 'Apples')?.id,
  //           coin_id: isDrax ? 2 : 1,
  //           user_id: userInfo?.id || 0,
  //           data: isCashout
  //             ? `{"cashout":${isCashout}}`
  //             : `{"tile":${
  //                 appleItem[appleItem?.length - 1]
  //               }, "cashout":${isCashout}}`
  //         })
  //         setContinue(prev => prev + 1)
  //       } else {
  //         setBetData({
  //           type: 'MakeBet',
  //           game_id: gamesList.find(item => item.name === 'Apples')?.id,
  //           coin_id: isDrax ? 2 : 1,
  //           user_id: userInfo?.id || 0,
  //           data: '{"difficulty":1}',
  //           amount: `${cryptoValue || 0}`,
  //           stop_loss: Number(stopLoss) || 0,
  //           stop_win: Number(stopGain) || 0,
  //           num_games: betsAmount
  //         })
  //       }
  //     }
  //   }, [
  //     stopGain,
  //     stopLoss,
  //     cryptoValue,
  //     isDrax,
  //     betsAmount,
  //     isCashout,
  //     isPlaying,
  //     appleItem
  //   ])

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
          payload: [gamesList.find(item => item.name === 'Apples')?.id]
        })
      )
      setCubscribed(true)
    }
  }, [socket, isPlaying, access_token, gamesList, coninue])

  //   useEffect(() => {
  //     if (
  //       access_token &&
  //       socket &&
  //       socket.readyState === WebSocket.OPEN &&
  //       gamesList?.length > 0 &&
  //       socketLogged
  //     ) {
  //       socket.send(
  //         JSON.stringify({
  //           type: 'GetState',
  //           game_id: gamesList.find(item => item.name === 'Apples')?.id,
  //           coin_id: isDrax ? 2 : 1
  //         })
  //       )
  //     }
  //   }, [socket, gamesList, isDrax, isPlaying, access_token, socketLogged])

  useEffect(() => {
    return () => {
      socket?.send(
        JSON.stringify({
          type: 'UnsubscribeBets',
          payload: [gamesList.find(item => item.name === 'Apples')?.id]
        })
      )
    }
  }, [])

  return (
    <>
      <div className='relative w-full h-full py-11 sm:py-16 lg:py-[30px] px-[10px] sm:px-[30px] lg:px-0 min-h-[680px]'>
        {/* <WagerLowerBtnsBlock game='apples' text={'apples'} /> */}
        <div className='absolute top-0 right-0 w-full h-full overflow-hidden rounded-[0] sm:rounded-[20px_20px_0_0] lg:rounded-[20px_0_0_0]'>
          <Image
            onLoad={() => setIsLoading(false)}
            src={applesBg}
            className='absolute right-0 bottom-0 h-full overflow-hidden object-cover z-[-1] w-full 2xl:w-[1438px] 3xl:w-full'
            alt='apples-static-bg'
          />
        </div>
        {isLoading && <Preload />}
        <TotalCoeff
          fullLost={fullLost}
          fullWon={fullWon}
          totalValue={totalValue}
        />
        {/* <div className={cn(s.balls_arr)}>
          {coefficientData.map((item, i) => (
            <div
              className={cn(
                s.multiplier_value,
                item > 0 ? s.multiplier_positive : s.multiplier_negative
              )}
              key={i}
            >
              {item > 0 ? (
                <Image alt='' src={appleCoefTrue.src} />
              ) : (
                <Image alt='' src={appleCoefFalse.src} />
              )}
              <span>{(item / 100)?.toFixed(2)}x</span>
            </div>
          ))}
        </div> */}
        <Coefficient ballsArr={coefficientData} multipliers={multiplier} />
        <div className='h-full flex items-center justify-center'>
          <div className='max-w-[325px] mt-0 mb-10 px-[17px] py-[19px] sm:px-6 sm:pt-[31px] sm:pb-5 shadow-[0px_0px_24.6px_0px_rgba(25,102,101,0.89)] lg:mt-[30px] bg-[rgba(3,33,45,0.82)] border border-[#105453] rounded-[12px] sm:max-w-[425px] w-full relative'>
            {/* {gameStatus === GameModel.GameStatus.Won && (
              <ApplesWinBlock
                resIco={result?.coin_id}
                multiplier={Number(multiplier.toFixed(2)).toString()}
                cf={100}
                profit={profit}
              />
            )} */}
            <AppleTable
              appleData={appleData}
              chunkedApplesArr={chunkedApplesArr}
              inGame={inGame}
              mines={mines}
              setAppleData={setAppleData}
              setAppleItem={setAppleItem}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AppleGame
