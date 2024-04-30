'use client'
import { T_Card } from '@/api'
import Coefficient from '@/components/custom/coefficient'
import { useSocket } from '@/components/providers/socket.provider'
import { handleResult } from '@/lib/utils/game.result'
import { sendSocketData } from '@/lib/utils/game.send'
import { useSubscibeBets } from '@/lib/utils/subscibe'
import { useUnSubscribe } from '@/lib/utils/unsubscube'
import { useGetState } from '@/lib/utils/useGetState'
import tableBg from '@/public/images/poker_images/pokerBgImage.webp'
import {
  GameModel,
  PokerModel,
  RegistrModel,
  UserModel,
  WagerModel
} from '@/states'
import { PokerProps } from '@/types/games.types'
import { useUnit } from 'effector-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'
import { evaluatePokerHand, generateBetData } from '../(utils)'
import { PokerCard } from './PokerCard'
import { initialArrayOfCards } from './data'
// чирва 2,пика 3,буба 1,креста 0

export const Poker = ({}: PokerProps) => {
  const [
    betsAmount,
    gameState,
    cryptoValue,
    setGameStatus,
    setWonStatus,
    setLostStatus,
    setShowFlipCards,
    gameStatus,
    setIsPlaying,
    setWaitingResponse,
    gamesList,
    result,
    setResult,
    socketLogged,
    isDrax,
    userInfo,
    stopGain,
    stopLoss,
    finishPoker,
    access_token
  ] = useUnit([
    WagerModel.$pickedValue,
    PokerModel.$gameState,
    WagerModel.$cryptoValue,
    GameModel.setGameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    PokerModel.setShowFlipCards,
    GameModel.$gameStatus,
    GameModel.setIsPlaying,
    GameModel.setWaitingResponse,
    GameModel.$gamesList,
    GameModel.$result,
    GameModel.setResult,
    UserModel.$socketLogged,
    UserModel.$isDrax,
    UserModel.$userInfo,
    WagerModel.$stopGain,
    WagerModel.$stopLoss,
    GameModel.$finishPoker,
    RegistrModel.$access_token
  ])

  const [betData, setBetData] = useState({})
  const [firstBet, setFirstBet] = useState(true)
  const [keep, setKeep] = useState(false)
  const [taken, setTaken] = useState(false)
  const socket = useSocket()
  const [imageLoading_1, setImageLoading_1] = useState(true)
  const [imageLoading_2, setImageLoading_2] = useState(true)
  const [preloading, setPreloading] = useState(true)
  const [update, setUpdate] = useState(false)
  const [subscribed, setCubscribed] = useState(false)
  const [combinationName, setCombinationName] = useState('')
  const [coefficientData, setCoefficientData] = useState<number[]>([])
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [inGame, setInGame] = useState<boolean>(false)
  const [activeCards, setActiveCards] = useState<T_Card[]>(initialArrayOfCards)
  const [cardsState, setCardsState] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false
  ])
  const [playDrawnCards] = useSound(
    '/static/media/games_assets/poker/sounds/cardsEveryone.mp3'
  )

  useEffect(() => {
    useSubscibeBets({
      name: 'Poker',
      setCubscribed,
      gamesList,
      subscribed,
      socket
    })
  }, [socket, socket?.readyState, gamesList.length])

  useEffect(() => {
    if (result) {
      if (result.type === 'State' && result.state) {
        const dataState = JSON.parse(result.state).cards_in_hand
        setShowFlipCards(true)
        setWaitingResponse(false)
        setActiveCards(dataState)
        if (result?.amount) {
          setIsPlaying(true)
        }
        console.log('first level: ', dataState)

        setKeep(true)
      } else if (result.type === 'Bet' && result.state) {
        const fullAmount = Number(result.amount) * result.num_games!
        setTimeout(() => {
          setCoefficientData(prev => [
            Number(result.profit) / fullAmount,
            ...prev
          ])
        }, 200)
        setWaitingResponse(false)
        if (
          Number(result.profit) > Number(result.amount) ||
          Number(result.profit) === Number(result.amount)
        ) {
          alert('win')
          setGameStatus(GameModel.GameStatus.Won)
          const multiplier = Number(
            Number(result.profit) / Number(result.amount)
          )
          setWonStatus({
            profit: Number(result.profit),
            multiplier,
            token: 'DRAX'
          })
          setTimeout(() => {
            setInGame(false)
            setIsPlaying(false)
            setKeep(false)
            setFirstBet(true)
            setActiveCards(initialArrayOfCards)
          }, 200)
        } else if (Number(result.profit) < Number(result.amount)) {
          alert('lose')
          setGameStatus(GameModel.GameStatus.Lost)
          setLostStatus(Number(result.profit) - Number(result.amount))
          setTimeout(() => {
            setInGame(false)
            setIsPlaying(false)
            setKeep(false)
            setFirstBet(true)
            setActiveCards(initialArrayOfCards)
          }, 200)
        } else {
          setGameStatus(GameModel.GameStatus.Draw)
          setTimeout(() => {
            setInGame(false)
            setIsPlaying(false)
            setKeep(false)
            setFirstBet(true)
          }, 200)
        }
        // setKeep(false);
      }
    }
    setResult(null)
  }, [result, result?.type])

  useEffect(() => {
    setIsPlaying(inGame)
  }, [inGame])
  const [isPlaying] = useUnit([GameModel.$isPlaying])

  useEffect(() => {
    setActiveCards(gameState ? gameState : initialArrayOfCards)
    playDrawnCards()
  }, [gameState])

  useEffect(() => {
    evaluatePokerHand(activeCards, setCombinationName)
  }, [activeCards, gameStatus])

  useEffect(() => {
    if (cryptoValue && isPlaying && !taken && betsAmount) {
      setTaken(true)
    }
  }, [betsAmount, cryptoValue, isPlaying])

  useEffect(() => {
    if (!imageLoading_1 && !imageLoading_2) {
      setPreloading(imageLoading_1)
    }
  }, [imageLoading_1, imageLoading_2])

  useEffect(() => setInGame(isPlaying), [isPlaying])

  useEffect(() => {
    const getData = generateBetData(
      firstBet,
      keep,
      update,
      gamesList,
      isDrax,
      userInfo,
      cryptoValue,
      stopLoss,
      stopGain,
      betsAmount,
      isPlaying,
      cardsState,
      setFirstBet,
      setKeep
    )
    setBetData(getData)
  }, [
    stopGain,
    stopLoss,
    cryptoValue,
    isDrax,
    betsAmount,
    isPlaying,
    cardsState,
    gamesList,
    update,
    keep
  ])
  const [refund, setRefund] = useState(1)
  useEffect(() => setFirstBet(true), [])
  useEffect(() => {
    alert(JSON.stringify(betData))
    sendSocketData({
      socket,
      isPlaying,
      access_token,
      betData
    })
  }, [refund, socket, isPlaying, access_token, gamesList, finishPoker])
  useEffect(() => {
    useGetState({
      access_token,
      gamesList,
      isDrax,
      socket,
      socketLogged,
      title: 'Poker'
    })
  }, [
    socket,
    gamesList,
    isDrax,
    isPlaying,
    access_token,
    socketLogged,
    cardsState.find(el => el === true)
  ])

  useEffect(() => {
    return () => useUnSubscribe({ gamesList, socket, name: 'Poker' })
  }, [])

  return (
    <>
      <div className='w-full h-full relative  flex-[1_1_auto] flex flex-col items-center justify-center'>
        <div className='w-full h-full absolute right-0 bottom-0 top-0 left-0 z-[-1]'>
          <Image
            onLoad={() => setImageLoading_1(false)}
            src={tableBg}
            className='rounded-[20px_20px_0_0] object-cover w-full h-full'
            alt='table-bg'
          />
        </div>
        <Coefficient ballsArr={coefficientData} />
        <div className='h-full flex items-center justify-center'>
          <div
            className='p-[22px] w-[calc(100%_-_44px)] h-[calc(100%_-_44px)] sm:w-[calc(100%_-_40px)] sm:h-[calc(100%_-_40px)] sm:p-[20px] flex items-center justify-center tb:gap-[1.5vw] gap-[1vw]'
            style={{
              backfaceVisibility: 'hidden'
            }}
          >
            {activeCards &&
              activeCards.map((item, ind) => {
                return item.number == -1 ? (
                  <PokerCard
                    setImageLoading={setImageLoading_2}
                    key={ind}
                    isEmptyCard={false}
                    coat={0}
                    card={0}
                    onClick={() => {}}
                  />
                ) : (
                  <PokerCard
                    setImageLoading={setImageLoading_2}
                    key={`${item.suit}_${item.number}_${transactionHash}`}
                    isEmptyCard={false}
                    coat={item.suit}
                    card={item.number}
                    onClick={() => {
                      const cards = cardsState
                      cards[ind] = !cards[ind]
                      setCardsState([...cards])
                      const updatedActiveCards = [...activeCards]
                      updatedActiveCards[ind].number = -1
                      setActiveCards(updatedActiveCards)
                      // setRefund(prev => prev + 1)
                    }}
                  />
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}
