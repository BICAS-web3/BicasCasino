'use client'
import Coefficient from '@/components/custom/coefficient'
import { useSocket } from '@/components/providers/socket.provider'
import { handleResult } from '@/lib/utils/game.result'
import { sendSocketData } from '@/lib/utils/game.send'
import { useSubscibeBets } from '@/lib/utils/subscibe'
import { useUnSubscribe } from '@/lib/utils/unsubscube'
import { useSoundPlay } from '@/lib/utils/useSoundPlay'
import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import ReactHowler from 'react-howler'
import RollState from './RollValue'
import { useSpring, animated } from 'react-spring'

const RocketGame = () => {
  const socket = useSocket()
  const [isLoading, setIsLoading] = useState(true)
  const [
    playSounds,
    setGameStatus,
    setLostStatus,
    setWonStatus,
    gameStatus,
    betsAmount,
    rollOver,
    RollValue,
    cryptoValue,
    stopLoss,
    stopGain,
    pickedSide,
    setActivePicker,
    pickSide,
    setCoefficient,
    setIsPlaying,
    isPlaying,
    result,
    setResult,
    isDrax,
    userInfo,
    gamesList,
    access_token,
    rocketStar,
    setRocketStar
  ] = useUnit([
    GameModel.$playSounds,
    GameModel.setGameStatus,
    GameModel.setLostStatus,
    GameModel.setWonStatus,
    GameModel.$gameStatus,
    WagerModel.$pickedValue,
    GameModel.$RollOver,
    GameModel.$RollValue,
    WagerModel.$cryptoValue,
    WagerModel.$stopLoss,
    WagerModel.$stopGain,
    GameModel.$pickedSide,
    GameModel.setActive,
    GameModel.pickSide,
    GameModel.setCoefficient,
    GameModel.setIsPlaying,
    GameModel.$isPlaying,
    GameModel.$result,
    GameModel.setResult,
    UserModel.$isDrax,
    UserModel.$userInfo,
    GameModel.$gamesList,
    RegistrModel.$access_token,
    GameModel.$rocketStar,
    GameModel.setRocketStar
  ])
  const [springProps, setSpringProps] = useSpring(() => ({
    number: 0 // начальное значение числа
  }))
  const [socketReset] = useUnit([UserModel.$socketReset])
  const [coefficientData, setCoefficientData] = useState<number[]>([])
  const [inGame, setInGame] = useState(false)
  const [localNumber, setLocalNumber] = useState<number | null>(null)
  const [restartGif, setRestartGif] = useState(0)
  const [imageLoading_1, setImageLoading_1] = useState(true)
  const [imageLoading_2, setImageLoading_2] = useState(true)
  const [betData, setBetData] = useState({})
  const [subscribed, setCubscribed] = useState(false)

  const rocketCrash = useSoundPlay('/music/rocket_crush.mp3')
  const rocketWin = useSoundPlay('/music/rocket_win.mp3')
  const rocketStart = useSoundPlay('/music/rocket_fly_start.mp3')

  const win_chance = rollOver ? 100 - RollValue : RollValue
  const multiplier =
    (BigInt(990000) * BigInt(100)) / BigInt(Math.floor(win_chance * 100))
  const rangeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (localNumber !== null) {
      setSpringProps({ number: localNumber })
    }
  }, [localNumber])

  useEffect(() => {
    useSubscibeBets({
      name: 'Dice',
      setCubscribed,
      gamesList,
      subscribed,
      socket
    })
  }, [socket, socket?.readyState, gamesList.length, socketReset])

  useEffect(() => {
    handleResult({
      title: 'rocket',
      result,
      setInGame,
      setIsPlaying,
      setGameStatus,
      setWonStatus,
      setLostStatus,
      setCoefficientData,
      setLocalNumber,
      pickedSide,
      pickSide
    })
    setResult(null)
  }, [result])
  useEffect(() => {
    setCoefficient(Number(multiplier) / 10000)
  }, [multiplier])

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

  useEffect(() => {
    if (coefficientData.length > 0) {
      setRestartGif(restartGif + 1)
      setRocketStar(true)
      setTimeout(() => {
        setRocketStar(false)
      }, 650)
    }
  }, [coefficientData?.length])

  useEffect(() => {
    if (!imageLoading_1 && !imageLoading_2) {
      setIsLoading(imageLoading_1)
    }
  }, [imageLoading_1, imageLoading_2])

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

  useEffect(() => {
    setBetData({
      type: 'MakeBet',
      game_id: gamesList.find(item => item.name === 'Dice')?.id || 2,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: `{"roll_over":true, "multiplier":"${Number(multiplier) / 10000}"}`,
      amount: `${cryptoValue || 0}`,
      stop_loss: stopLoss ? String(stopLoss) : 0,
      stop_win: stopGain ? String(stopGain) : 0,
      num_games: betsAmount
    })
  }, [
    stopGain,
    multiplier,
    stopLoss,
    pickedSide,
    cryptoValue,
    betsAmount,
    rollOver,
    isDrax
  ])

  useEffect(() => {
    sendSocketData({ access_token, betData, isPlaying, socket })
  }, [socket, isPlaying, access_token])

  useEffect(() => {
    return () => useUnSubscribe({ gamesList, socket, name: 'Dice' })
  }, [])

  return (
    <section
      style={{
        background: `url('/images/rocket/bg.png') center center no-repeat`,
        backgroundSize: 'cover',
        zIndex: 2
      }}
      className='w-full h-full relative flex flex-col overflow-hidden  flex-[1_1_auto]'
    >
      <div className='stars'></div>
      <div className='twinkling'></div>
      {/* <div className='clouds'></div> */}
      <ReactHowler
        src={'/music/rocket_fly_2.mp3'}
        playing={bgPlay && playSounds !== 'off'}
        loop
        volume={2}
      />
      <div className='relative w-full h-full flex flex-col flex-[1_1_auto]'>
        {rocketStar && localNumber !== null && localNumber <= 0 && (
          <Image
            className='block z-[1] absolute mx-auto w-[200px] sm:w-[250px] h-[180px] sm:h-[190px] left-1/2 -translate-x-1/2 -scale-[1] top-0 sm:top-[75px]'
            src={`/videos/rocket/bomb_2.gif?${restartGif}`}
            alt='wewsfdesd'
            width={200}
            height={200}
          />
        )}
        {localNumber !== null && (
          <animated.div
            className={`text-xs sm:text-sm xl:text-lg font-extrabold rounded-[5px] w-12 xl:w-[60px] h-6 xl:h-10 flex justify-center items-center absolute left-1/2 -translate-x-1/2 top-[75px] sm:top-[115px] text-[2.8125rem] sm:text-[4.375rem] z-[5] ${
              localNumber > 0 ? 'text-[#34b113]' : 'text-[#e15f02]'
            }`}
            style={{ fontSize: '2.8125rem', ...springProps }}
          >
            {springProps.number.to(n => `${n.toFixed(2)}x`)}
          </animated.div>
        )}

        <Coefficient
          common
          ballsArr={coefficientData}
          multipliers={multiplier}
        />

        <div
          onClick={() => setRestartGif(prev => prev + 1)}
          className={`bottom-auto top-[200px] sm:top-auto sm:bottom-[45px] w-[97px] h-[132px] lg:bottom-[115px] xl:bottom-[180px] sm:w-[133px] sm:h-[203px] absolute left-1/2 -translate-x-1/2 z-[3] ${
            rocketStar && ' animate-[rocket-box_0.44s]'
          }`}
        >
          <Image
            width={133}
            height={203}
            onLoad={() => setImageLoading_2(false)}
            className={`absolute w-[97px] sm:w-[133px] h-[132px] sm:h-[203px] z-[21] left-0 top-0 ${
              inGame && 'animate-[rocket-animations_1s_2.9s_infinite]'
            }`}
            src={'/images/rocket/rocket.webp'}
            alt='rocket'
          />{' '}
          <div
            className={`absolute mx-auto w-[5.0625rem] h-[7rem] rocket_fire animate-[fire-img_0.7s_steps(1)_infinite] left-1/2 -translate-x-[45%] top-[calc(100%-52px)] sm:top-[calc(100%-70px)] ${
              inGame && 'animate-[fire_img_0.35s_steps(1)_infinite]'
            }`}
          ></div>
        </div>
        <RollState rangeRef={rangeRef} />
      </div>
    </section>
  )
}

export default RocketGame
{
  /* <video
          onPlay={imageError}
          onError={imageError}
          ref={rocketRef}
          className={`object-cover rounded-[0] sm:rounded-[20px_20px_0_0] lg:rounded-[20px_0_0_0] absolute top-0 left-0 w-full h-full min-h-full flex-[1_1_auto] ${
            !inGame && 'hidden'
          }`}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={'/videos/rocket/bg.mp4'} type='video/mp4' />
        </video>
        <video
          onError={imageError}
          onPlay={imageError}
          ref={bgRef}
          className={`object-cover rounded-[0] sm:rounded-[20px_20px_0_0] lg:rounded-[20px_0_0_0] absolute top-0 left-0 w-full h-full min-h-full flex-[1_1_auto] ${
            inGame && 'hidden'
          }`}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={'/videos/rocket/bg_1.mp4'} type='video/mp4' />
        </video> */
}
// <div
//   className={`text-xs sm:text-sm xl:text-lg font-extrabold rounded-[5px] w-12 xl:w-[60px] h-6 xl:h-10 flex justify-center items-center absolute left-1/2 -translate-x-1/2 top-[75px] sm:top-[115px] text-[2.8125rem] sm:text-[4.375rem] z-[5] ${
//     localNumber > 0 ? 'text-[#34b113]' : 'text-[#e15f02]'
//   }`}
// >
//   {/* {localNumber?.toFixed(2)}x */}
//   {springProps.number.to(n => n.toFixed(2))}
// </div>

// useEffect(() => {
//   setActivePicker(true)
//   setInGame(false)
//   if (gameStatus == GameModel.GameStatus.Won) {
//     pickSide(pickedSide)
//   } else if (gameStatus == GameModel.GameStatus.Lost) {
//     pickSide(pickedSide ^ 1)
//   }
// }, [gameStatus])
