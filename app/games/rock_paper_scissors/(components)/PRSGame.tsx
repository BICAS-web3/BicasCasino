'use client'

import bg from '@/public/images/rps/bg.png'
import { useEffect, useState } from 'react'
import { GameModel, RegistrModel, UserModel, WagerModel } from '@/states'
import { useUnit } from 'effector-react'
import TotalCoeff from '@/components/custom/totalCoeff'
import Image from 'next/image'
import { useSocket } from '@/components/providers/socket.provider'
import { LeftHand, RightHand } from '../(icons)'
import { RpsPicker } from './Picker'
import { handleResult } from '@/lib/utils/game.result'
import { sendSocketData } from '@/lib/utils/game.send'
import Coefficient from '@/components/custom/coefficient'

export enum ModelType {
  Paper = '/rps/paperCard.glb',
  Rock = '/rps/rockCard.glb',
  Scissors = '/rps/scissorsCard.glb',
  Quest = '/rps/questCard.glb'
}
const PRSGame = () => {
  const socket = useSocket()
  const [value, setValue] = useState<ModelType>(ModelType.Paper)
  const [imageLoading, setIMageLoading] = useState(true)
  const [
    lost,
    profit,
    pickedValue,
    setActivePicker,
    pickSide,
    betsAmount,
    cryptoValue,
    stopGain,
    stopLoss,
    setGameStatus,
    gameStatus,
    setWonStatus,
    setLostStatus,
    setCoefficient,
    setIsPlaying,
    result,
    setResult,
    isDrax,
    userInfo,
    gamesList
  ] = useUnit([
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$pickedValueRPS,
    GameModel.setActiveRPS,
    GameModel.pickValueRPS,
    WagerModel.$pickedValue,
    WagerModel.$cryptoValue,
    WagerModel.$stopGain,
    WagerModel.$stopLoss,
    GameModel.setGameStatus,
    GameModel.$gameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    GameModel.setCoefficient,
    GameModel.setIsPlaying,
    GameModel.$result,
    GameModel.setResult,
    UserModel.$isDrax,
    UserModel.$userInfo,
    GameModel.$gamesList
  ])

  const [socketReset] = useUnit([UserModel.$socketReset])

  useEffect(() => {
    if (
      socket &&
      socket.readyState === WebSocket.OPEN &&
      gamesList.length > 0
    ) {
      socket?.send(JSON.stringify({ type: 'UnsubscribeAllBets' }))
      socket?.send(
        JSON.stringify({
          type: 'SubscribeBets',
          payload: [gamesList.find(item => item.name === 'RPS')?.id] || 5
        })
      )
    }
  }, [socket, socket?.readyState, gamesList.length, socketReset])

  useEffect(() => {
    handleResult({
      title: 'rps',
      result,
      setInGame,
      setIsPlaying,
      setGameStatus,
      setWonStatus,
      setLostStatus,
      setCoefficientData
    })
    setResult(null)
  }, [result])

  useEffect(() => {
    setCoefficient(1.98)
  }, [])

  useEffect(() => {
    if (pickedValue === GameModel.RPSValue.Paper) {
      setValue(ModelType.Paper)
    } else if (pickedValue === GameModel.RPSValue.Rock) {
      setValue(ModelType.Rock)
    } else {
      setValue(ModelType.Scissors)
    }
  }, [pickedValue])

  const [inGame, setInGame] = useState<boolean>(false)

  useEffect(() => {
    setIsPlaying(inGame)
  }, [inGame])

  const [isPlaying] = useUnit([GameModel.$isPlaying])
  const [coefficientData, setCoefficientData] = useState<number[]>([])

  useEffect(() => {
    setActivePicker(true)
    setInGame(false)
    if (gameStatus == GameModel.GameStatus.Won) {
      pickSide(pickedValue)
    } else if (gameStatus == GameModel.GameStatus.Lost) {
      pickSide(pickedValue)
    }
  }, [gameStatus])

  const [enemyValue, setEnemyValue] = useState(ModelType.Quest)

  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Draw) {
      setEnemyValue(value)
    } else if (gameStatus === GameModel.GameStatus.Won) {
      if (pickedValue === GameModel.RPSValue.Paper) {
        setEnemyValue(ModelType.Rock)
      } else if (pickedValue === GameModel.RPSValue.Rock) {
        setEnemyValue(ModelType.Scissors)
      } else if (pickedValue === GameModel.RPSValue.Scissors) {
        setEnemyValue(ModelType.Paper)
      }
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      if (pickedValue === GameModel.RPSValue.Paper) {
        setEnemyValue(ModelType.Scissors)
      } else if (pickedValue === GameModel.RPSValue.Rock) {
        setEnemyValue(ModelType.Paper)
      } else if (pickedValue === GameModel.RPSValue.Scissors) {
        setEnemyValue(ModelType.Rock)
      }
    }
  }, [gameStatus])

  useEffect(() => {
    if (enemyValue !== ModelType.Quest) {
      setTimeout(() => {
        setEnemyValue(ModelType.Quest)
      }, 1000)
    }
  }, [value])

  const [taken, setTaken] = useState(false)
  const [localAmount, setLocalAmount] = useState<any>(0)
  const [localCryptoValue, setLocalCryptoValue] = useState(0)
  useEffect(() => {
    if (cryptoValue && isPlaying && !taken && betsAmount) {
      setTaken(true)
      setLocalAmount(betsAmount)
      setLocalCryptoValue(cryptoValue)
    }
  }, [betsAmount, cryptoValue, isPlaying])

  const [fullWon, setFullWon] = useState(0)
  const [fullLost, setFullLost] = useState(0)
  const [totalValue, setTotalValue] = useState(0.1)
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

  const [access_token] = useUnit([RegistrModel.$access_token])

  const [betData, setBetData] = useState({})

  useEffect(() => {
    setBetData({
      type: 'MakeBet',
      game_id: gamesList.find(item => item.name === 'RPS')?.id || 5,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: `{"action":${pickedValue}}`,
      amount: `${cryptoValue || 0}`,
      stop_loss: Number(stopLoss) || 0,
      stop_win: Number(stopGain) || 0,
      num_games: betsAmount
    })
  }, [stopGain, stopLoss, pickedValue, cryptoValue, isDrax, betsAmount])

  const [subscribed, setCubscribed] = useState(false)

  useEffect(() => {
    sendSocketData({
      socket,
      isPlaying,
      access_token,
      subscribed,
      gamesList,
      betData,
      setCubscribed,
      title: 'RPS'
    })
  }, [socket, isPlaying, access_token, gamesList])

  return (
    <div className='h-full w-full relative pt-9'>
      {/* {isLoadingd && <Preload />} */}
      {/* <WagerLowerBtnsBlock game='rps' text={gameText} /> */}
      <div className='w-full h-full absolute top-0 left-0 bottom-0 right-0 -z-[1]'>
        <Image
          onLoad={() => setIMageLoading(false)}
          src={bg}
          className='rounded-[0] sm:rounded-[20px_20px_0_0] w-full object-cover h-full'
          alt='table-bg'
        />
      </div>{' '}
      <TotalCoeff
        fullLost={fullLost}
        fullWon={fullWon}
        totalValue={totalValue}
      />
      <Coefficient ballsArr={coefficientData} />
      <div className='w-full h-full flex justify-center items-end'>
        <div className='flex items-center flex-col gap-[98px]'>
          <div className='flex items-center justify-between gap-[95px]'>
            <LeftHand />
            <span className='uppercase text-[95px] text-[#464646] font-semibold'>
              vs
            </span>
            <RightHand />
          </div>
          <div className='py-3'>
            <RpsPicker />
          </div>
        </div>
      </div>
    </div>
  )
}
export default PRSGame

{
  /* <Canvas
            camera={{ position: [1, 6, 1], fov: 22.5 }}
            style={{ pointerEvents: 'none' }}
          >
            {value === ModelType.Paper && (
              <Suspense fallback={<></>}>
                <Stage adjustCamera={false} environment='dawn'>
                  <Environment path='/hdr/' files='kiara_1_dawn_1k.hdr' />
                </Stage>
                <ambientLight intensity={0.3} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <pointLight
                  position={[0, -10, 5]}
                  intensity={0.5}
                  color='#fff'
                />
                <Model
                  setIsLoading={setModelLoading_1}
                  yValue={0.1}
                  side={ModelType.Paper}
                  left={true}
                />{' '}
              </Suspense>
            )}
            {value === ModelType.Rock && (
              <Suspense fallback={<></>}>
                <Stage adjustCamera={false} environment='dawn'>
                  <Environment path='/hdr/' files='kiara_1_dawn_1k.hdr' />
                </Stage>
                <ambientLight intensity={0.3} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <pointLight
                  position={[0, -10, 5]}
                  intensity={0.5}
                  color='#fff'
                />
                <Model
                  setIsLoading={setModelLoading_1}
                  yValue={0.1}
                  side={ModelType.Rock}
                  left={true}
                />
              </Suspense>
            )}
            {value === ModelType.Scissors && (
              <Suspense fallback={<></>}>
                <Stage adjustCamera={false} environment='dawn'>
                  <Environment path='/hdr/' files='kiara_1_dawn_1k.hdr' />
                </Stage>
                <ambientLight intensity={0.3} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <pointLight
                  position={[0, -10, 5]}
                  intensity={0.5}
                  color='#fff'
                />
                <Model
                  setIsLoading={setModelLoading_1}
                  yValue={0.1}
                  side={ModelType.Scissors}
                  left={true}
                />
              </Suspense>
            )}
          </Canvas>
          <Canvas
            camera={{ position: [1, 6, 1], fov: 20 }}
            style={{ pointerEvents: 'none' }}
          >
            {enemyValue === ModelType.Paper && (
              <Suspense fallback={<></>}>
                <Stage adjustCamera={false} environment='dawn'>
                  <Environment path='/hdr/' files='kiara_1_dawn_1k.hdr' />
                </Stage>
                <ambientLight intensity={0.3} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <pointLight
                  position={[0, -10, 5]}
                  intensity={0.5}
                  color='#fff'
                />
                <Model
                  setIsLoading={setModelLoading_2}
                  delay={2000}
                  yValue={-0.1}
                  side={ModelType.Paper}
                  left={false}
                />{' '}
              </Suspense>
            )}
            {enemyValue === ModelType.Rock && (
              <Suspense fallback={<></>}>
                <Stage adjustCamera={false} environment='dawn'>
                  <Environment path='/hdr/' files='kiara_1_dawn_1k.hdr' />
                </Stage>
                <ambientLight intensity={0.3} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <pointLight
                  position={[0, -10, 5]}
                  intensity={0.5}
                  color='#fff'
                />

                <Model
                  setIsLoading={setModelLoading_2}
                  delay={2000}
                  yValue={-0.1}
                  side={ModelType.Rock}
                  left={false}
                />
              </Suspense>
            )}
            {enemyValue === ModelType.Scissors && (
              <Suspense fallback={<></>}>
                <Stage adjustCamera={false} environment='dawn'>
                  <Environment path='/hdr/' files='kiara_1_dawn_1k.hdr' />
                </Stage>
                <ambientLight intensity={0.3} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <pointLight
                  position={[0, -10, 5]}
                  intensity={0.5}
                  color='#fff'
                />
                <Model
                  setIsLoading={setModelLoading_2}
                  delay={2000}
                  yValue={-0.1}
                  side={ModelType.Scissors}
                  left={false}
                />
              </Suspense>
            )}
            {enemyValue === ModelType.Quest && (
              <Suspense fallback={<></>}>
                <Stage adjustCamera={false} environment='dawn'>
                  <Environment path='/hdr/' files='kiara_1_dawn_1k.hdr' />
                </Stage>
                <ambientLight intensity={0.3} />
                <directionalLight intensity={2.5} position={[-2, 10, 0]} />
                <pointLight
                  position={[0, -10, 5]}
                  intensity={0.5}
                  color='#fff'
                />
                <Model
                  setIsLoading={setModelLoading_2}
                  delay={2000}
                  yValue={-0.1}
                  side={ModelType.Quest}
                  left={false}
                />
              </Suspense>
            )}
          </Canvas> */
}
