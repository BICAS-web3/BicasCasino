'use client'
import * as api from '@/api'
import { T_Card } from '@/api'
import Coefficient from '@/components/custom/coefficient'
import TotalCoeff from '@/components/custom/totalCoeff'
import { useSocket } from '@/components/providers/socket.provider'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { handleResult } from '@/lib/utils/game.result'
import { sendSocketData } from '@/lib/utils/game.send'
import tableBg from '@/public/images/poker_images/pokerBgImage.webp'
import {
  GameModel,
  PokerModel,
  RegistrModel,
  UserModel,
  WagerModel
} from '@/states'
import { useUnit } from 'effector-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'
import { evaluatePokerHand, generateBetData } from '../(utils)'
import { PokerCard } from './PokerCard'
import { PokerCombination } from './PokerCombination'
import { initialArrayOfCards } from './data'
// чирва 2,пика 3,буба 1,креста 0

interface ICards {
  suit: number
  number: number
}

export interface PokerProps {
  gameText: string
}

export const Poker = ({}: PokerProps) => {
  const socket = useSocket()
  const isMobile = useMediaQuery('(max-width: 650px)')
  const [imageLoading_1, setImageLoading_1] = useState(true)
  const [imageLoading_2, setImageLoading_2] = useState(true)
  const [preloading, setPreloading] = useState(true)
  const [update, setUpdate] = useState(false)
  const [
    betsAmount,
    lost,
    profit,
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
    finishPoker
  ] = useUnit([
    WagerModel.$pickedValue,
    GameModel.$lost,
    GameModel.$profit,
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
    GameModel.$finishPoker
  ])

  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket?.send(JSON.stringify({ type: 'UnsubscribeAllBets' }))
      socket?.send(
        JSON.stringify({
          type: 'Subscribe',
          payload: [gamesList.find(item => item.name === 'Poker')?.id]
        })
      )
    }
  }, [socket, socket?.readyState, gamesList.length])
  useEffect(() => {
    handleResult({
      title: 'poker',
      result,
      setInGame,
      setWaitingResponse,
      setIsPlaying,
      setGameStatus,
      setWonStatus,
      setLostStatus,
      setKeep,
      setFirstBet,
      setUpdate,
      setActiveCards,
      setShowFlipCards
    })
    setResult(null)
  }, [result])

  const [coefficientData, setCoefficientData] = useState<number[]>([])
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

  const [transactionHash, setTransactionHash] = useState<string>('')
  const [inGame, setInGame] = useState<boolean>(false)

  useEffect(() => {
    setIsPlaying(inGame)
  }, [inGame])
  const [isPlaying] = useUnit([GameModel.$isPlaying])

  useEffect(() => {
    setActiveCards(gameState ? gameState : initialArrayOfCards)
    playDrawnCards()
  }, [gameState])

  const [combinationName, setCombinationName] = useState('')

  useEffect(() => {
    evaluatePokerHand(activeCards, setCombinationName)
  }, [activeCards, gameStatus])

  const [multiplier, token] = useUnit([GameModel.$multiplier, GameModel.$token])

  const [taken, setTaken] = useState(false)
  const [localAmount, setLocalAmount] = useState(0)
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

  useEffect(() => {
    if (!imageLoading_1 && !imageLoading_2) {
      setPreloading(imageLoading_1)
    }
  }, [imageLoading_1, imageLoading_2])

  useEffect(() => setInGame(isPlaying), [isPlaying])
  const [access_token] = useUnit([RegistrModel.$access_token])
  const [betData, setBetData] = useState({})
  const [firstBet, setFirstBet] = useState(true)
  const [keep, setKeep] = useState(false)

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

  useEffect(() => setFirstBet(true), [])
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
      title: 'Poker'
    })
  }, [socket, isPlaying, access_token, gamesList, finishPoker])
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
          game_id: gamesList.find(item => item.name === 'Poker')?.id,
          coin_id: isDrax ? 2 : 1
        })
      )
    }
  }, [socket, gamesList, isDrax, isPlaying, access_token, socketLogged])
  useEffect(() => {
    return () => {
      socket?.send(
        JSON.stringify({
          type: 'UnsubscribeBets',
          payload: [gamesList.find(item => item.name === 'Poker')?.id]
        })
      )
    }
  }, [])

  const pokerPlay = (ind: number) => {
    const cards = cardsState
    cards[ind] = !cards[ind]
    setCardsState([...cards])
  }

  return (
    <>
      {gameStatus === GameModel.GameStatus.Won && (
        <PokerCombination
          combinationName={combinationName}
          tokenImage={
            <Image
              src={`${api.BaseStaticUrl}/media/tokens/${token}.svg`}
              alt={''}
              width={isMobile ? 22 : 30}
              height={isMobile ? 22 : 30}
            />
          }
          profit={profit.toFixed(2)}
          multiplier={Number(multiplier.toFixed(2)).toString()}
        />
      )}

      <div className='w-full h-full relative'>
        <div className='w-full h-full absolute right-0 bottom-0 top-0 left-0 z-[-1]'>
          <Image
            onLoad={() => setImageLoading_1(false)}
            src={tableBg}
            className='rounded-[20px_20px_0_0] object-cover w-full h-full'
            alt='table-bg'
          />
        </div>{' '}
        <TotalCoeff
          fullLost={fullLost}
          fullWon={fullWon}
          totalValue={totalValue}
        />
        <Coefficient ballsArr={coefficientData} />
        <div className='h-full'>
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
                    onClick={pokerPlay.bind('', ind)}
                  />
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}
