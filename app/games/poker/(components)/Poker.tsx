'use client'
import { T_Card } from '@/api'
import Coefficient from '@/components/custom/coefficient'
import { useSocket } from '@/components/providers/socket.provider'
import { sendSocketData } from '@/lib/utils/game.send'
import { useSubscibeBets } from '@/lib/utils/subscibe'
import { useUnSubscribe } from '@/lib/utils/unsubscube'
import { useGetState } from '@/lib/utils/useGetState'
import tableBg from '@/public/images/poker_images/pokerBgImage_2.png'
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
import { PokerCombination } from './PokerCombination'
import { BonusCoinSVG } from '@/components/custom/header/components/icons'
import { GameStatus } from '@/states/game_model.store'

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
    access_token,
    finishGame,
    setRedrawCards,
    backCards,
    setBackCards,
    setFinishGame,
    setCryptoValue,
    profit,
    multiplier,
    isPlaying
  ] = useUnit([
    WagerModel.$pickedValue,
    PokerModel.$gameState,
    WagerModel.$cryptoValue,
    GameModel.setGameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    PokerModel.setShowFlipCards,
    GameModel.$gameStatus,
    GameModel.setPokerPlay,
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
    RegistrModel.$access_token,
    GameModel.$finishGame,
    GameModel.setRedrawCards,
    GameModel.$backCards,
    GameModel.setBackCards,
    GameModel.setFinishGame,
    WagerModel.setCryptoValue,
    GameModel.$profit,
    GameModel.$multiplier,
    GameModel.$pokerPlay
  ])

  const [playSounds] = useUnit([GameModel.$playSounds])
  const [pokerLose] = useSound('/music/poker_lose.mp3')
  const [pokerWin] = useSound('/music/poker_win.mp3')
  const [betData, setBetData] = useState({})
  const [firstBet, setFirstBet] = useState(true)
  const [keep, setKeep] = useState(false)
  const [taken, setTaken] = useState(false)
  const socket = useSocket()
  const [imageLoading_1, setImageLoading_1] = useState(true)
  const [imageLoading_2, setImageLoading_2] = useState(true)
  const [preloading, setPreloading] = useState(true)

  const [subscribed, setCubscribed] = useState(false)
  const [combinationName, setCombinationName] = useState('')
  const [coefficientData, setCoefficientData] = useState<number[]>([])
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [activeCards, setActiveCards] = useState<T_Card[]>(initialArrayOfCards)
  const [cardsState, setCardsState] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false
  ])
  const [playDrawnCards] = useSound(
    'https://game.greekkeepers.io/static/media/games_assets/poker/sounds/cardsEveryone.mp3'
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
          setCryptoValue(Number(result?.amount))
        }
        console.log('first level: ', dataState)

        setKeep(true)
      } else if (result.type === 'Bet' && result.state) {
        setTimeout(() => {
          setCoefficientData(prev => [
            Number(result.profit) / Number(result.amount),
            ...prev
          ])
        }, 200)
        setWaitingResponse(false)
        setShowFlipCards(false)
        setWaitingResponse(false)
        const dataState = JSON.parse(result.state).cards_in_hand
        setActiveCards(dataState)
        setCardsState([false, false, false, false, false])
        if (
          Number(result.profit) > Number(result.amount) ||
          Number(result.profit) === Number(result.amount)
        ) {
          setGameStatus(GameModel.GameStatus.Won)
          playSounds !== 'off' && pokerWin()
          const multiplier = Number(
            Number(result.profit) / Number(result.amount)
          )
          setWonStatus({
            profit: Number(result.profit),
            multiplier,
            token: 'DRAX'
          })
          setTimeout(() => {
            setIsPlaying(false)
            setKeep(false)
            setFirstBet(true)
          }, 200)
        } else if (Number(result.profit) < Number(result.amount)) {
          setGameStatus(GameModel.GameStatus.Lost)
          playSounds !== 'off' && pokerLose()
          setLostStatus(Number(result.profit) - Number(result.amount))
          setTimeout(() => {
            setIsPlaying(false)
            setKeep(false)
            setFirstBet(true)
          }, 200)
        } else {
          setGameStatus(GameModel.GameStatus.Draw)
          setTimeout(() => {
            setIsPlaying(false)
            setKeep(false)
            setFirstBet(true)
          }, 200)
        }
      }
    }
    setResult(null)
  }, [result, result?.type])

  useEffect(() => {
    setActiveCards(gameState ? gameState : initialArrayOfCards)
    playSounds !== 'off' && playDrawnCards()
  }, [gameState])

  useEffect(() => {
    if (gameStatus === GameStatus.Won) {
      evaluatePokerHand(activeCards, setCombinationName)
    }
  }, [gameStatus, gameStatus])

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

  useEffect(() => {
    const getData = generateBetData(
      firstBet,
      keep,
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
    keep
  ])
  useEffect(() => setFirstBet(true), [])
  useEffect(() => {
    sendSocketData({
      socket,
      isPlaying,
      access_token,
      betData
    })
  }, [socket, isPlaying, access_token, gamesList, finishPoker])
  useEffect(() => {
    useGetState({
      access_token,
      gamesList,
      isDrax,
      socket,
      socketLogged,
      title: 'Poker'
    })
  }, [socket, gamesList, isDrax, isPlaying, access_token, socketLogged])

  useEffect(() => {
    return () => useUnSubscribe({ gamesList, socket, name: 'Poker' })
  }, [])

  useEffect(() => {
    if (finishGame) {
      socket?.send(
        JSON.stringify({
          type: 'ContinueGame',
          game_id: gamesList.find(item => item.name === 'Poker')?.id || 12,
          coin_id: isDrax ? 2 : 1,
          user_id: userInfo?.id || 0,
          data: `{"to_replace":[${cardsState.map(el => (el ? true : false))}]}`
        })
      )
      setFinishGame(false)
      setRedrawCards(true)
    }
  }, [finishGame, cardsState])

  useEffect(() => {
    if (backCards) {
      setCloseCard(true)
      setBackCards(false)
    }
  }, [backCards])

  useEffect(() => {
    if (!backCards) {
      setOpenedCard(true)
    }
  }, [backCards])

  const [closeCard, setCloseCard] = useState(false)
  useEffect(() => {
    if (closeCard) {
      Promise.all([
        new Promise(resolve =>
          setTimeout(() => resolve(setActiveCards(initialArrayOfCards)), 1000)
        ),
        new Promise(resolve =>
          setTimeout(() => resolve(setCloseCard(false)), 1100)
        )
      ])
    }
  }, [closeCard])

  const [openedCard, setOpenedCard] = useState(true)

  const [localStatus, setLocalStatus] = useState<null | GameModel.GameStatus>(
    null
  )

  useEffect(() => {
    if (gameStatus !== null) {
      setLocalStatus(gameStatus)
    } else {
      setTimeout(() => setLocalStatus(null), 2500)
    }
  }, [gameStatus])

  return (
    <>
      {localStatus === GameModel.GameStatus.Won && !isPlaying && (
        <PokerCombination
          combinationName={combinationName}
          tokenImage={<BonusCoinSVG width={30} height={30} />}
          profit={profit.toFixed(2)}
          multiplier={Number(multiplier.toFixed(2)).toString()}
        />
      )}
      <div className='w-full h-full relative  flex-[1_1_auto] flex flex-col items-center justify-center'>
        <div className='w-full h-full absolute right-0 bottom-0 top-0 left-0 z-[-1]'>
          <Image
            onLoad={() => setImageLoading_1(false)}
            src={tableBg}
            className='object-cover w-full h-full'
            alt='table-bg'
          />
        </div>
        <Coefficient ballsArr={coefficientData} common />
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
                    setOpenedCard={setOpenedCard}
                  />
                ) : (
                  <PokerCard
                    closeCard={closeCard}
                    openedCard={openedCard}
                    setOpenedCard={setOpenedCard}
                    setImageLoading={setImageLoading_2}
                    key={`${item.suit}_${item.number}_${transactionHash}`}
                    isEmptyCard={false}
                    coat={item.suit}
                    card={item.number}
                    onClick={() => {
                      const cards = cardsState
                      cards[ind] = !cards[ind]
                      setCardsState([...cards])
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
