'use client'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import ReactHowler from 'react-howler'
import useSound from 'use-sound'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import { GameModel, RegistrModel, SessionModel, WagerModel } from '@/states'

import rocket from '@/public/images/rocket/rocket.webp'

import { DiceCloseSVG, DicePrecentageSVG, DiceSwapSVG } from './icons'

import { useSocket } from '@/components/providers/socket.provider'
import Coefficient from '@/components/ui/coefficient'
import TotalCoeff from '@/components/ui/total.coeff'
import Preload from '@/components/ui/preload'
import Selector from './components/selector'

const RocketGame = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [
    lost,
    profit,
    // setPlayingStatus,
    wagered,
    playSounds,
    switchSounds,
    setGameStatus,
    setLostStatus,
    setWonStatus,
    gameAddress,
    gameStatus,
    betsAmount,
    rollOver,
    flipRollOver,
    RollValue,
    setRollValue,
    currentNetwork,
    pickedToken,
    cryptoValue,
    stopLoss,
    stopGain,
    pickedSide,
    setActivePicker,
    pickSide,
    currentBalance,
    setWagered,
    allowance,
    setCoefficient,
    setIsPlaying,
    waitingResponse,
    setWaitingResponse,
    refund,
    setRefund,
    isPlaying,
    // result,
    // setResult,
    // isDrax,
    // userInfo,
    gamesList
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    // DiceM.setPlayingStatus,
    WagerModel.$Wagered,
    GameModel.$playSounds,
    GameModel.switchSounds,
    GameModel.setGameStatus,
    GameModel.setLostStatus,
    GameModel.setWonStatus,
    SessionModel.$gameAddress,
    GameModel.$gameStatus,
    WagerModel.$pickedValue,
    GameModel.$RollOver,
    GameModel.flipRollOver,
    GameModel.$RollValue,
    GameModel.setRollValue,
    SessionModel.$currentNetwork,
    WagerModel.$pickedToken,
    WagerModel.$cryptoValue,
    WagerModel.$stopLoss,
    WagerModel.$stopGain,
    GameModel.$pickedSide,
    GameModel.setActive,
    GameModel.pickSide,
    SessionModel.$currentBalance,
    WagerModel.setWagered,
    SessionModel.$currentAllowance,
    GameModel.setCoefficient,
    GameModel.setIsPlaying,
    GameModel.$waitingResponse,
    GameModel.setWaitingResponse,
    GameModel.$refund,
    GameModel.setRefund,
    GameModel.$isPlaying,
    // BetsModel.$result,
    // BetsModel.setResult,
    // BalanceModel.$isDrax,
    // LayoutModel.$userInfo,
    GameModel.$gamesList
  ])

  useEffect(() => {
    const handleCall = () => {
      for (let i = 0; i < [3, 4, 5, 6]?.length; i++) {
        setTimeout(() => {
          console.log([3, 4, 5, 6][i])
          const outCome = Number([3, 4, 5, 6][i]) / 2
          setCoefficientData(prev => [outCome, ...prev])
          setLocalNumber(0)
        }, 700 * (i + 1))
      }
    }
    handleCall()

    setGameStatus(GameModel.GameStatus.Won)

    pickSide(pickedSide)
    setWonStatus({
      profit: 2,
      multiplier: 3,
      token: 'DRAX'
    })
    setIsPlaying(false)
    setInGame(false)
  }, [])

  //   useEffect(() => {
  //     if (result !== null && result?.type === 'Bet') {
  //       const fullAmount = Number(result.amount) * result.num_games!
  //       const parseArr = JSON.parse(result.profits)
  //       // alert(3);
  //       const handleCall = () => {
  //         // alert(2);
  //         console.log('??????????', parseArr)
  //         for (let i = 0; i < parseArr?.length; i++) {
  //           // alert(i);
  //           setTimeout(() => {
  //             console.log(parseArr[i])
  //             const outCome = Number(parseArr[i]) / fullAmount
  //             setCoefficientData(prev => [outCome, ...prev])
  //             setLocalNumber(outCome)
  //           }, 700 * (i + 1))
  //         }
  //       }
  //       handleCall()

  //       if (
  //         Number(result.profit) > fullAmount ||
  //         Number(result.profit) === fullAmount
  //       ) {
  //         // setTimeout(() => {
  //         // }, 2000);
  //         setGameStatus(GameModel.GameStatus.Won)

  //         const multiplier = Number(Number(result.profit) / fullAmount)
  //         pickSide(pickedSide)
  //         setWonStatus({
  //           profit: Number(result.profit),
  //           multiplier,
  //           token: 'DRAX'
  //         })
  //         setIsPlaying(false)
  //         setInGame(false)
  //         // setCoefficientData((prev) => [
  //         //   Number(result.profit) /fullAmount,
  //         //   ...prev,
  //         // ]);
  //         // alert("win");
  //       } else if (Number(result.profit) < fullAmount) {
  //         // setTimeout(() => {

  //         // }, 2000);
  //         setGameStatus(GameModel.GameStatus.Lost)
  //         pickSide(pickedSide ^ 1)
  //         setIsPlaying(false)
  //         setInGame(false)
  //         setLostStatus(Number(result.profit) - fullAmount)
  //         // setCoefficientData((prev) => [
  //         //   Number(result.profit) / Number(result.amount),
  //         //   ...prev,
  //         // ]);
  //         // alert("lost");
  //       } else {
  //         setGameStatus(GameModel.GameStatus.Draw)
  //         setIsPlaying(false)
  //         setInGame(false)
  //         // setCoefficientData((prev) => [
  //         //   Number(result.profit) / Number(result.amount),
  //         //   ...prev,
  //         // ]);
  //         // alert("draw");
  //       }
  //       setResult(null)
  //     }
  //   }, [result?.timestamp, result, gameStatus])

  // const { data } = useFeeData({
  //   watch: isConnected,
  //   cacheTime: 5000,
  // });

  const win_chance = rollOver ? 100 - RollValue : RollValue
  const multiplier =
    (BigInt(990000) * BigInt(100)) / BigInt(Math.floor(win_chance * 100))
  const rollOverNumber = rollOver ? 100 - RollValue : RollValue
  const rollUnderNumber = rollOver ? RollValue : 100 - RollValue
  useEffect(() => {
    setCoefficient(Number(multiplier) / 10000)
  }, [multiplier])

  const [inGame, setInGame] = useState<boolean>(false)

  const [localNumber, setLocalNumber] = useState<number | null>(null)
  const [coefficientData, setCoefficientData] = useState<number[]>([])

  useEffect(() => {
    setActivePicker(true)
    setInGame(false)
    if (gameStatus == GameModel.GameStatus.Won) {
      pickSide(pickedSide)
    } else if (gameStatus == GameModel.GameStatus.Lost) {
      pickSide(pickedSide ^ 1)
    }
  }, [gameStatus])

  const rocketRef = useRef<HTMLVideoElement | null>(null)
  const bgRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = rocketRef.current

    const handleTimeUpdate = () => {
      const duration = video?.duration || 0
      const currentTime = video?.currentTime || 0

      if (currentTime + 0.1 >= duration - 1) {
        video!.currentTime = 4
      }
    }

    video?.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      video?.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  const [fullWon, setFullWon] = useState(0)
  const [fullLost, setFullLost] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon(prev => prev + profit)
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost(prev => prev + lost)
    }
    setTotalValue(fullWon - fullLost)
  }, [GameModel.GameStatus, profit, lost])

  const rangeRef = useRef<HTMLInputElement>(null)
  const onChange = (el: ChangeEvent<HTMLInputElement>) => {
    const number_value = Number(el.target.value.toString())

    setRollValue(number_value)
  }
  useEffect(() => {
    let num = rollOver ? 102 : 95
    const rangeElement = rangeRef.current
    const rangeWidth = (RollValue / num) * rangeElement!.offsetWidth

    rangeElement?.style.setProperty(
      '--range-width',
      `${
        rollOver ? (RollValue < 50 ? rangeWidth - 7 : rangeWidth) : rangeWidth
      }px`
    )
  }, [RollValue, rollOver])
  const diceValue = [
    {
      id: 1,
      title: 'Multiplier',
      value: (Number(multiplier) / 10000).toFixed(4),
      img_src: DiceCloseSVG,
      img_alt: 'close'
    },
    {
      id: 2,
      title: 'Roll',
      value: rollOver ? rollOverNumber.toFixed(2) : rollUnderNumber.toFixed(2),
      img_src: DiceSwapSVG,
      img_alt: 'swap'
    },
    {
      id: 3,
      title: 'Win Chance',
      value: win_chance.toFixed(2),
      img_src: DicePrecentageSVG,
      img_alt: '%'
    }
  ]
  const changeBetween = () => {
    flipRollOver(RollValue)
  }

  useEffect(() => {
    const bg = bgRef.current
    const bg_2 = rocketRef.current
    bg!.currentTime = 0
    bg_2!.currentTime = 0
  }, [inGame])

  const [flyStar, setFlyStar] = useState(false)
  const [rocketStar, setRocketStar] = useState(false)
  const [restartGif, setRestartGif] = useState(0)

  useEffect(() => {
    console.log('----------', coefficientData.length)
    if (coefficientData.length > 0) {
      setRestartGif(restartGif + 1)
      setRocketStar(true)
      setFlyStar(true)
      setTimeout(() => {
        setRocketStar(false)
        setFlyStar(false)
      }, 650)
    }
  }, [coefficientData?.length])

  const [imageLoading_1, setImageLoading_1] = useState(true)
  const [imageLoading_2, setImageLoading_2] = useState(true)

  useEffect(() => {
    if (!imageLoading_1 && !imageLoading_2) {
      setIsLoading(imageLoading_1)
    }
  }, [imageLoading_1, imageLoading_2])
  const [rocketCrash] = useSound('/music/rocket_crush.mp3', { volume: 1 })
  const [rocketWin] = useSound('/music/rocket_win.mp3', { volume: 1 })
  const [rocketStart] = useSound('/music/rocket_fly_start.mp3', { volume: 1 })

  useEffect(() => {
    if (rocketStar && localNumber !== null && localNumber <= 0) {
      rocketCrash()
    }
    if (rocketStar && localNumber !== null && localNumber > 0) {
      rocketWin()
    }
  }, [rocketStar, localNumber !== null, localNumber])

  const [bgPlay, setBgPlay] = useState(false)
  useEffect(() => {
    if (inGame) {
      Promise.all([
        new Promise(resolve => setTimeout(() => resolve(rocketStart()), 1500)),
        new Promise(resolve => setTimeout(() => resolve(setBgPlay(true)), 2000))
      ])
    } else {
      setBgPlay(false)
    }
  }, [inGame])

  const [betData, setBetData] = useState({})

  const [access_token] = useUnit([RegistrModel.$access_token])
  const subscribe = {
    type: 'SubscribeBets',
    payload: [gamesList.find(item => item.name === 'Dice')?.id]
  }
  //   useEffect(() => {
  //     setBetData({
  //       type: 'MakeBet',
  //       game_id: gamesList.find(item => item.name === 'Dice')?.id,
  //       coin_id: isDrax ? 2 : 1,
  //       user_id: userInfo?.id || 0,
  //       data: `{"roll_over":true, "multiplier":"${Number(multiplier) / 10000}"}`,
  //       amount: `${cryptoValue || 0}`,
  //       stop_loss: stopLoss ? String(stopLoss) : 0,
  //       stop_win: stopGain ? String(stopGain) : 0,
  //       num_games: betsAmount
  //     })
  //   }, [
  //     stopGain,
  //     multiplier,
  //     stopLoss,
  //     pickedSide,
  //     cryptoValue,
  //     betsAmount,
  //     rollOver,
  //     isDrax
  //   ])

  const socket = useSocket()

  const [subscribed, setCubscribed] = useState(false)

  useEffect(() => {
    if (
      socket &&
      isPlaying &&
      access_token &&
      socket.readyState === WebSocket.OPEN
    ) {
      if (!subscribed) {
        socket.send(JSON.stringify(subscribe))
        setCubscribed(true)
      }
      socket.send(JSON.stringify(betData))
    }
  }, [socket, isPlaying, access_token])

  useEffect(() => {
    return () => {
      socket?.send(
        JSON.stringify({
          type: 'UnsubscribeBets',
          payload: [gamesList.find(item => item.name === 'Dice')?.id]
        })
      )
    }
  }, [])

  useEffect(() => {
    setInGame(isPlaying)
  }, [isPlaying])

  return (
    <>
      <ReactHowler
        src={'/music/rocket_fly_2.mp3'}
        playing={bgPlay && playSounds !== 'off'}
        loop
        volume={2}
      />
      <section className='w-full h-full relative flex flex-col overflow-hidden min-h-[680px]'>
        {isLoading && <Preload />}
        {/* <WagerLowerBtnsBlock
          className={s.dice_btns}
          game='dice'
          text={gameText}
        /> */}
        <div className='relative w-full h-full flex flex-col'>
          <TotalCoeff
            fullLost={fullLost}
            fullWon={fullWon}
            totalValue={totalValue}
          />
          {rocketStar && localNumber !== null && localNumber <= 0 && (
            <Image
              className={cn(
                'block z-[1] absolute mx-auto w-[200px] sm:w-[250px] h-[180px] sm:h-[190px] left-1/2 -translate-x-1/2 -scale-[1] top-0 sm:top-[75px]'
              )}
              src={`/videos/rocket/bomb_2.gif?${restartGif}`}
              alt='wewsfdesd'
              width={200}
              height={200}
            />
          )}
          {localNumber !== null && (
            <div
              className={`text-xs sm:text-sm xl:text-lg font-extrabold rounded-[5px] w-12 xl:w-[60px] h-6 xl:h-10 flex justify-center items-center absolute left-1/2 -translate-x-1/2 top-[75px] sm:top-[115px] text-[2.8125rem] sm:text-[4.375rem] z-[5] ${
                localNumber > 0 ? 'text-[#34b113]' : 'text-[#e15f02]'
              }`}
            >
              {localNumber?.toFixed(2)}x
            </div>
          )}
          <Coefficient ballsArr={coefficientData} multipliers={multiplier} />
          <video
            onPlay={() => {
              setImageLoading_1(false)
            }}
            onError={() => {
              setImageLoading_1(false)
            }}
            ref={rocketRef}
            className={cn(
              'absolute top-0 left-0 w-full h-full min-h-full flex-[1_1_auto]',
              'object-cover rounded-[0] sm:rounded-[20px_20px_0_0] lg:rounded-[20px_0_0_0]',
              !inGame && 'hidden'
            )}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={'/videos/rocket/bg.mp4'} type='video/mp4' />
          </video>
          <video
            onError={() => {
              setImageLoading_1(false)
            }}
            onPlay={() => {
              setImageLoading_1(false)
            }}
            ref={bgRef}
            className={cn(
              'absolute top-0 left-0 w-full h-full min-h-full flex-[1_1_auto]',
              'object-cover rounded-[0] sm:rounded-[20px_20px_0_0] lg:rounded-[20px_0_0_0]',
              inGame && 'hidden'
            )}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={'/videos/rocket/bg_1.mp4'} type='video/mp4' />
          </video>
          <div
            onClick={() => {
              setRestartGif(prev => prev + 1)
              // setLocalC((prev) => [...prev, 1]);
            }}
            className={cn(
              'bottom-[45px] w-[97px] h-[132px] lg:bottom-[115px] xl:bottom-[130px]',
              'sm:w-[133px] sm:h-[203px] absolute left-1/2 -translate-x-1/2 z-[3]',
              rocketStar && ' animate-[rocket-box_0.44s]'
            )}
          >
            <Image
              onLoad={() => setImageLoading_2(false)}
              className={cn(
                'absolute w-[97px] sm:w-[133px] h-[132px] sm:h-[203px] z-[21] left-0 top-0',
                inGame && 'animate-[rocket-animations_1s_2.9s_infinite]'
              )}
              src={rocket}
              alt='rocket'
            />{' '}
            <div
              className={cn(
                'absolute mx-auto w-[5.0625rem] h-[7rem] rocket_fire animate-[fire-img_0.7s_steps(1)_infinite]',
                'left-1/2 -translate-x-[45%] top-[calc(100%-52px)] sm:top-[calc(100%-70px)]',
                inGame && 'animate-[fire_img_0.35s_steps(1)_infinite]'
              )}
            ></div>
          </div>
          <div className='w-full flex justify-center items-center sm:block sm:w-fit mx-auto mt-auto px-5 z-[3] relative mb-5 bg-[rgba(15,15,15,0.2)] p-[20px_0_0_0]'>
            <div className='mt-auto relative z-[1] flex items-center gap-[10px] mb-3 md:mb-[15px]'>
              <span
                className={cn(
                  'absolute left-1/2 -translate-x-1/2 -top-5',
                  'text-[#eaeaea] text-center text-sm font-black uppercase'
                )}
              >
                {RollValue}
              </span>
              <span
                className={cn(
                  'text-[#eaeaea] text-center text-sm font-black uppercase'
                )}
              >
                {rollOver ? 5 : 0.1}
              </span>
              {/* <div className={s.custom_range_input_body}></div> */}
              <input
                className={cn(
                  'dice_range',
                  rollOver ? 'dice_over' : 'dice_under'
                )}
                type='range'
                min={rollOver ? 5 : 0.1}
                max={rollOver ? 99.9 : 95}
                value={RollValue}
                onChange={onChange}
                ref={rangeRef}
                step={0.1}
              />
              <span
                className={cn(
                  'text-[#eaeaea] text-center text-sm font-black uppercase'
                )}
              >
                {rollOver ? 99.9 : 95}
              </span>
            </div>
          </div>
        </div>
        <Selector diceValue={diceValue} onClick={changeBetween} />
      </section>{' '}
    </>
  )
}

export default RocketGame
