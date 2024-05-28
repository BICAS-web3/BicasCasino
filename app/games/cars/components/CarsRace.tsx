'use client'
import Coefficient from '@/components/custom/coefficient'
import { useSocket } from '@/components/providers/socket.provider'
import { Car1 } from '@/public/SVGs/Car1'
import { Car2 } from '@/public/SVGs/Car2'
import cityStartImg from '@/public/images/cars/bgStart.webp'
import cityMainImg from '@/public/images/cars/cityMain.webp'
import moonImg from '@/public/images/cars/moonBg.webp'
import mountainsBg from '@/public/images/cars/mountainsBg.webp'
import staticBg from '@/public/images/cars/staticBg.webp'
import stopLine from '@/public/images/cars/stopLine.webp'
import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import ReactHowler from 'react-howler'
import useSound from 'use-sound'
import { useMediaQuery } from 'usehooks-ts'
import * as CarModel from './model'
import { cn } from '@/lib/utils'
import s from './styles.module.scss'
interface CarsRaceProps {
  gameText: string
}

export const CarsRace: FC<CarsRaceProps> = ({ gameText }) => {
  const [startGame, setStartGame] = useState(false)
  const [wheelStart, setWheelStart] = useState(false)
  const [showFinish, setShowFinish] = useState(false)

  const [bgWidth, setBgWidth] = useState<any>()

  useEffect(() => {
    const el = document.getElementById('cars_bg_wrap')

    const handleResize = () => {
      setBgWidth(el?.offsetWidth)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const [
    playSounds,
    betsAmount,
    cryptoValue,
    stopGain,
    stopLoss,
    setGameStatus,
    gameStatus,
    setWonStatus,
    setLostStatus,
    setIsPlaying,
    carNumber,
    gameResult,
    setGameResult,
    reset,
    setReset,
    result,
    setResult,
    isDrax,
    userInfo,
    setCarNumber
  ] = useUnit([
    GameModel.$playSounds,
    WagerModel.$pickedValue,
    WagerModel.$cryptoValue,
    WagerModel.$stopGain,
    WagerModel.$stopLoss,
    GameModel.setGameStatus,
    GameModel.$gameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    GameModel.setIsPlaying,
    CarModel.$carNumber,
    CarModel.$gameResult,
    CarModel.setGameResult,
    CarModel.$reset,
    CarModel.setReset,
    GameModel.$result,
    GameModel.setResult,
    UserModel.$isDrax,
    UserModel.$userInfo,
    CarModel.setCarNumber
  ])

  const [raceWin] = useSound('/music/race_win.mp3', { volume: 1 })
  const [raceLose] = useSound('/music/race_lose.mp3', { volume: 1 })
  useEffect(() => {
    if (result !== null && result?.type === 'Bet') {
      const numArr = JSON.parse(result.profits)
      const handlePayouts = () => {
        for (let i = 0; i < numArr?.length; i++) {
          setTimeout(() => {
            const outCome = Number(numArr[i]) / Number(result.amount)
            setCoefficientData(prev => [outCome, ...prev])
          }, 700 * (i + 1))
        }
      }
      Promise.all([
        new Promise(resolve => setTimeout(() => resolve(handlePayouts()), 8500))
      ])
      if (Number(result.profit) > Number(result.amount)) {
        const multiplier = Number(Number(result.profit) / Number(result.amount))
        Promise.all([
          new Promise(resolve =>
            setTimeout(
              () => resolve(setGameStatus(GameModel.GameStatus.Won)),
              6000
            )
          ),
          new Promise(resolve =>
            setTimeout(() => playSounds !== 'off' && resolve(raceWin()), 9000)
          ),
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve(setGameResult([carNumber, carNumber === 1 ? 2 : 1])),
              6000
            )
          ),
          new Promise(resolve =>
            setTimeout(() => resolve(setInGame(false)), 6000)
          ),
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve(
                  setWonStatus({
                    profit: Number(result.profit),
                    multiplier,
                    token: 'DRAX'
                  })
                ),
              6000
            )
          ),
          new Promise(resolve =>
            setTimeout(() => resolve(setIsPlaying(false)), 9000)
          )
        ])
      } else if (Number(result.profit) < Number(result.amount)) {
        Promise.all([
          new Promise(resolve =>
            setTimeout(
              () => resolve(setGameStatus(GameModel.GameStatus.Lost)),
              6000
            )
          ),
          new Promise(resolve =>
            setTimeout(() => playSounds !== 'off' && resolve(raceLose()), 9000)
          ),
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve(setGameResult([carNumber === 1 ? 2 : 1, carNumber])),
              6000
            )
          ),
          new Promise(resolve =>
            setTimeout(() => resolve(setInGame(false)), 6000)
          ),
          new Promise(resolve =>
            setTimeout(() => resolve(setIsPlaying(false)), 9000)
          ),
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve(
                  setLostStatus(Number(result.profit) - Number(result.amount))
                ),
              6000
            )
          )
        ])
      } else {
        setGameStatus(GameModel.GameStatus.Draw)
        setIsPlaying(false)
        setInGame(false)
      }
      setResult(null)
    }
  }, [result?.timestamp, result, gameStatus])

  const [isPlaying] = useUnit([GameModel.$isPlaying])

  const [coefficientData, setCoefficientData] = useState<number[]>([])

  const [inGame, setInGame] = useState<boolean>(false)

  useEffect(() => {
    setIsPlaying(inGame)
  }, [inGame])

  const [taken, setTaken] = useState(false)
  useEffect(() => {
    if (cryptoValue && isPlaying && !taken && betsAmount) {
      setTaken(true)
    }
  }, [betsAmount, cryptoValue, isPlaying])

  const [raceSound, setRaceSound] = useState(false)

  // const [carStart] = useSound('/music/car_start.mp3', { volume: 1 })

  const [carInProgress, setCarInProgress] = useState(false)
  useEffect(() => {
    if (isPlaying) {
      if (playSounds !== 'off') {
        // carStart()
      }
      Promise.all([
        new Promise(resolve =>
          setTimeout(() => resolve(setRaceSound(true)), 0)
        ),
        new Promise(resolve =>
          setTimeout(() => resolve(setCarInProgress(true)), 3000)
        ),
        new Promise(resolve =>
          setTimeout(() => resolve(setWheelStart(true)), 1500)
        ),
        new Promise(resolve =>
          setTimeout(() => resolve(setStartGame(true)), 1500)
        )
      ])
    } else {
      setTimeout(() => setRaceSound(false), 3500)
    }
  }, [isPlaying])

  const [randomeMove, setRandomMove] = useState<number | null>(null)

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    const generateRandomNumber = () => {
      if (gameResult.length === 0 && startGame) {
        const randomValue = Math.random() * 4 - 2
        const roundedRandomValue = Math.round(randomValue)

        setRandomMove(roundedRandomValue)
      } else {
        setRandomMove(null)
      }
    }

    if (gameResult.length === 0 && startGame) {
      setTimeout(() => {
        generateRandomNumber()
        intervalId = setInterval(generateRandomNumber, 1000)
      }, 1000)
    } else {
      setRandomMove(0)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [gameResult, startGame])

  useEffect(() => {
    if (reset) {
      setGameResult([])
      setStartGame(false)
      setWheelStart(false)
      setShowFinish(false)
      setCarInProgress(false)
      setReset(false)
      setStopAnimation(false)
    }
  }, [reset])

  useEffect(() => {
    if (gameResult.length > 0) {
      setShowFinish(true)
      setTimeout(() => setStopAnimation(true), 2500)
    }
  }, [gameResult.length])

  const isDesktop = useMediaQuery('(min-width: 1280px)')
  const isSmall = useMediaQuery('(max-width: 420px)')
  const [stepValue, setStepValue] = useState(90)

  useEffect(() => {
    if (isDesktop) {
      setStepValue(150)
    } else {
      setStepValue(50)
    }
  }, [isDesktop])

  const [stopAnimation, setStopAnimation] = useState(false)

  const [gamesList] = useUnit([GameModel.$gamesList])
  const [betData, setBetData] = useState({})

  const [access_token] = useUnit([RegistrModel.$access_token])
  const subscribe = {
    type: 'SubscribeBets',
    payload: [gamesList.find(item => item.name === 'CarRace')?.id || 8]
  }
  useEffect(() => {
    setBetData({
      type: 'MakeBet',
      game_id: gamesList.find(item => item.name === 'CarRace')?.id || 8,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: `{"car":${carNumber}}`,
      amount: `${cryptoValue || 0}`,
      stop_loss: Number(stopLoss) || 0,
      stop_win: Number(stopGain) || 0,
      num_games: betsAmount
    })
  }, [stopGain, stopLoss, cryptoValue, betsAmount, isDrax])

  const socket = useSocket()

  const [subscribed, setCubscribed] = useState(false)

  useEffect(() => {
    if (
      socket &&
      isPlaying &&
      access_token &&
      socket.readyState === WebSocket.OPEN &&
      startGame
    ) {
      if (!subscribed) {
        socket.send(JSON.stringify(subscribe))
        setCubscribed(true)
      }
      socket.send(JSON.stringify(betData))
    }
  }, [socket, isPlaying, access_token && startGame])

  useEffect(() => {
    return () => {
      socket?.send(
        JSON.stringify({
          type: 'UnsubscribeBets',
          payload: [gamesList.find(item => item.name === 'CarRace')?.id || 8]
        })
      )
    }
  }, [])

  useEffect(() => {
    if (isPlaying) {
      setStartGame(true)
      setWheelStart(true)
    }
  }, [isPlaying])

  return (
    <section className='w-full h-full relative overflow-hidden flex-[1_1_auto]'>
      <Coefficient common ballsArr={coefficientData} />
      <ReactHowler
        src={'/music/car_process.mp3'}
        playing={raceSound && playSounds !== 'off'}
        loop
      />
      <div className={s.cars_table_background} id='cars_bg_wrap'>
        <img src={staticBg.src} alt='static-bg' className={s.static_bg_img} />
        <img
          src={moonImg.src}
          className={s.static_moon_img}
          alt='static-moon'
        />
        <div className={cn(s.start_bg_img, startGame && s.start_bg_img_hide)}>
          <img
            onLoad={() => setIsLoading(false)}
            src={cityStartImg.src}
            className={s.start_bg_city}
            alt='start-bg-img'
          />
          <img
            src={stopLine.src}
            className={s.start_stop_line}
            alt='stop-line'
          />
        </div>
        <img
          src={mountainsBg.src}
          className={cn(
            s.main_mountains_bg,
            startGame && s.main_mountains_bg_hide
          )}
          alt='mountains-bg'
        />
        <img
          src={cityMainImg.src}
          className={cn(
            s.main_city_bg_img,
            startGame && s.main_city_bg_img_start,
            stopAnimation && s.stop_animation
          )}
          alt='main-city-bg'
        />
        <img
          src={mountainsBg.src}
          className={cn(
            s.mountains_second,
            startGame && s.mountains_second_start,
            stopAnimation && s.stop_animation
          )}
          alt='mountains-bg'
        />
        <div
          className={cn(
            s.finish_city_bg_img,
            showFinish && s.finish_city_bg_img_finish
          )}
        >
          <img
            src={stopLine.src}
            className={s.finish_stop_line}
            alt='stop-line'
          />
        </div>
        <img
          className={cn(
            s.main_city_bg_copy,
            startGame && s.main_city_bg_copy_start,
            stopAnimation && s.stop_animation
          )}
          src={cityMainImg.src}
          alt='main-city-bg-2'
        />
        <img
          src={mountainsBg.src}
          className={cn(
            s.mountains_bg_copy,
            startGame && s.mountains_bg_copy_start,
            stopAnimation && s.stop_animation
          )}
          alt='mountains-copy'
        />
      </div>
      <div className='w-full h-full absolute top-0 left-0'>
        <div
          onClick={() => setCarNumber(1)}
          style={{
            left:
              startGame &&
              gameResult.length === 0 &&
              randomeMove !== 0 &&
              (randomeMove === 1 || randomeMove === -1)
                ? `${randomeMove > 0 ? stepValue : -stepValue}px`
                : isSmall
                ? '30px'
                : '70px'
          }}
          className={`
            car_wrap car1_wrap cursor-pointer
            absolute transition-all duration-300 left-[35px] sx:left-[60px] h-[66px] w-[215px] bottom-5 sm:bottom-[90px] sm:w-[auto] sm:h-[auto] z-[10]
            ${
              carInProgress &&
              'translate-x-[20px] sm:translate-x-[80px] mmd:translate-x-[120px] 3xl:translate-x-[200px]'
            } ${
            startGame && 'car_inGame'
          }  ${`car_wrap_animation_${gameResult[0]}`} `}
        >
          <Car1 isSelected={carNumber === 1} gameStarted={wheelStart} />
        </div>
        <div
          onClick={() => setCarNumber(2)}
          style={{
            left:
              startGame &&
              gameResult.length === 0 &&
              randomeMove !== 0 &&
              (randomeMove === 2 || randomeMove === -2)
                ? `${randomeMove > 0 ? stepValue : -stepValue}px`
                : isSmall
                ? '40px'
                : '90px'
          }}
          className={`
          car_wrap car2_wrap z-[10] cursor-pointer
          absolute transition-all duration-300 w-[200px] h-[62px] !bottom-[72px] !sm:bottom-[45px] 
          ${
            carInProgress &&
            'translate-x-[20px] sm:translate-x-[80px] mmd:translate-x-[120px] 3xl:translate-x-[200px]'
          }
          ${`car_wrap_animation_${gameResult[1]}`}
          ${startGame && 'car_inGame'}
        `}
        >
          <Car2 isSelected={carNumber === 2} gameStarted={wheelStart} />
        </div>
      </div>
    </section>
  )
}
