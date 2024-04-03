'use client'
import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import tableBg from '@/public/images/poker_images/pokerBgImage.webp'
import { PokerCard } from './PokerCard'
import { useUnit } from 'effector-react'
// import { CustomWagerRangeInputModel } from '../CustomWagerRangeInput'
import { T_Card } from '@/api'
//import BackgroundMusic from '../../public/media/games_assets/music/background1.wav';
import useSound from 'use-sound'
import { GameModel } from '@/states'
import { PokerModel } from '@/states'
import { SettingModel } from '@/states'
import { SessionModel } from '@/states'
import { WagerModel } from '@/states'
// import { WagerModel as WagerButtonModel } from '../Wager'
import * as api from '@/api'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { PokerCombination } from './PokerCombination'
// import { WagerLowerBtnsBlock } from '../WagerLowerBtnsBlock/WagerLowerBtnsBlock'
import clsx from 'clsx'
// import { ProfitLine } from '../ProfitLine'
// import { Preload } from '@/src/shared/ui/Preload'
// import * as BetsModel from '@/widgets/LiveBets/model'
import { RegistrModel } from '@/states'
// import * as BalanceModel from '@/widgets/BalanceSwitcher/model'
// import * as LayoutModel from '@/widgets/Layout/model'
import { useSocket } from '@/src/shared/context'
// import { WagerGainLossModel } from '../WagerGainLoss'

// чирва 2
// пика 3
// буба 1
// креста 0
const initialArrayOfCards = [
  {
    suit: -1,
    number: -1
  },
  {
    suit: -1,
    number: -1
  },
  {
    suit: -1,
    number: -1
  },
  {
    suit: -1,
    number: -1
  },
  {
    suit: -1,
    number: -1
  }
]

interface ICards {
  suit: number
  number: number
}

export interface PokerProps {
  gameText: string
}

export const Poker: FC<PokerProps> = props => {
  const isMobile = useMediaQuery('(max-width: 650px)')
  // const [combinationName, setCombinationName] = useState<CombinationName>();
  const [imageLoading_1, setImageLoading_1] = useState(true)
  const [imageLoading_2, setImageLoading_2] = useState(true)
  const [preloading, setPreloading] = useState(true)
  const [
    // betsAmount,
    lost,
    profit,
    gameStatus,
    playSounds,
    gameState,
    gameAddress,
    currentBalance,
    cryptoValue,
    pickedToken,
    Wagered,
    setWagered,
    allowance,
    setGameStatus,
    setWonStatus,
    setLostStatus,
    flipShowFlipCards,
    setShowFlipCards,
    //gameStatus
    availableTokens,
    setIsPlaying,
    setWaitingResponse,
    refund,
    setRefund,
    gamesList
    // result,
    // setResult,
    // socketLogged,
    // isDrax,
    // userInfo,
    // stopGain,
    // stopLoss
  ] = useUnit([
    // CustomWagerRangeInputModel.$pickedValue,
    GameModel.$lost,
    GameModel.$profit,
    GameModel.$gameStatus,
    GameModel.$playSounds,
    PokerModel.$gameState,
    SessionModel.$gameAddress,
    SessionModel.$currentBalance,
    WagerModel.$cryptoValue,
    WagerModel.$pickedToken,
    WagerModel.$Wagered,
    WagerModel.setWagered,
    SessionModel.$currentAllowance,
    GameModel.setGameStatus,
    GameModel.setWonStatus,
    GameModel.setLostStatus,
    PokerModel.flipShowFlipCards,
    PokerModel.setShowFlipCards,
    //GameModel.$gameStatus
    SettingModel.$AvailableTokens,
    GameModel.setIsPlaying,
    GameModel.setWaitingResponse,
    GameModel.$refund,
    GameModel.setRefund,
    GameModel.$gamesList
    // BetsModel.$result,
    // BetsModel.setResult,
    // LayoutModel.$socketLogged,
    // BalanceModel.$isDrax,
    // LayoutModel.$userInfo,
    // WagerGainLossModel.$stopGain,
    // WagerGainLossModel.$stopLoss
  ])

  const [start, setStart] = useState(true)

  // useEffect(() => {
  //   if (result) {
  //     if (result.type === 'State' && result.state) {
  //       //{"state":[[false,true,false],[true,false,false]],"picked_tiles":[2,2],"current_multiplier":"2.22"}

  //       const dataState = JSON.parse(result.state).cards_in_hand
  //       setShowFlipCards(true)
  //       setWaitingResponse(false)
  //       setActiveCards(dataState)
  //       // alert(2);
  //       if (result?.amount && start) {
  //         // alert(1);
  //         setIsPlaying(true)
  //       }
  //       console.log('first level: ', dataState)

  //       setKeep(true)
  //     } else if (result.type === 'Bet' && result.state) {
  //       // setTimeout(() => {
  //       //   setInGame(false);
  //       // }, 2000);
  //       const data = JSON.parse(result!.state)

  //       setWaitingResponse(false)
  //       if (
  //         Number(result.profit) > Number(result.amount) ||
  //         Number(result.profit) === Number(result.amount)
  //       ) {
  //         setGameStatus(GameModel.GameStatus.Won)
  //         const multiplier = Number(
  //           Number(result.profit) / Number(result.amount)
  //         )
  //         setWonStatus({
  //           profit: Number(result.profit),
  //           multiplier,
  //           token: 'DRAX'
  //         })
  //         setTimeout(() => {
  //           setInGame(false)
  //           setIsPlaying(false)
  //           setKeep(false)
  //           setFirstBet(true)
  //         }, 200)
  //       } else if (Number(result.profit) < Number(result.amount)) {
  //         setGameStatus(GameModel.GameStatus.Lost)
  //         setLostStatus(Number(result.profit) - Number(result.amount))
  //         setTimeout(() => {
  //           setInGame(false)
  //           setIsPlaying(false)
  //           setKeep(false)
  //           setFirstBet(true)
  //         }, 200)
  //       } else {
  //         setGameStatus(GameModel.GameStatus.Draw)
  //         setTimeout(() => {
  //           setInGame(false)
  //           setIsPlaying(false)
  //           setKeep(false)
  //           setFirstBet(true)
  //         }, 200)
  //       }
  //       // setKeep(false);
  //     }
  //   }
  //   setResult(null)
  // }, [result, result?.type])

  const [coefficientData, setCoefficientData] = useState<number[]>([])

  const [activeCards, setActiveCards] = useState<T_Card[]>(initialArrayOfCards)

  const [cardsState, setCardsState] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false
  ])
  const [playBackground, { stop: stopBackground }] = useSound(
    '/static/media/games_assets/music/background1.wav',
    { volume: 0.1, loop: true }
  )
  const [playDrawnCards] = useSound(
    '/static/media/games_assets/poker/sounds/cardsEveryone.mp3'
  )
  const [playNewCards] = useSound(
    '/static/media/games_assets/poker/sounds/2cards.mp3'
  )
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [inGame, setInGame] = useState<boolean>(false)

  const [setWstate] = useUnit([PokerModel.setWatchState])

  useEffect(() => {
    setIsPlaying(inGame)
  }, [inGame])
  const [isPlaying] = useUnit([GameModel.$isPlaying])

  useEffect(() => {
    setActiveCards(gameState ? gameState : initialArrayOfCards)
    playDrawnCards()
  }, [gameState])

  function hasRoyalFlush(cards: ICards[]) {
    const royalFlushNumbers = [1, 10, 11, 12, 13]
    const suits = new Set(cards.map(card => card.suit))

    return Array.from(suits).some(suit => {
      const suitCards = cards.filter(card => card.suit === suit)
      const numbers = suitCards.map(card => card.number)

      return royalFlushNumbers.every(number => numbers.includes(number))
    })
  }

  function hasStraightFlush(cards: ICards[]) {
    const suits = Array.from(new Set(cards.map(card => Number(card.suit))))
    if (suits.length > 1) return false
    return suits.some(suit => {
      const suitCards = cards.filter(card => Number(card.suit) === suit)
      const sortedNumbers = suitCards
        .map(card => card.number)
        .sort((a, b) => a - b)

      for (let i = 0; i < sortedNumbers.length - 1; i++) {
        if (sortedNumbers[i] !== sortedNumbers[i + 1] - 1) {
          return false
        }
      }

      return true
    })
  }

  function hasFourOfAKind(cards: ICards[]) {
    const numberCounts = countNumbers(cards)

    return Object.values(numberCounts).includes(4)
  }

  function hasFullHouse(cards: ICards[]) {
    const numberCounts = countNumbers(cards)
    return (
      Object.values(numberCounts).includes(3) &&
      Object.values(numberCounts).includes(2)
    )
  }

  function hasFlush(cards: ICards[]) {
    const suits = new Set(cards.map(card => card.suit))
    return suits.size === 1
  }

  function hasStraight(cards: ICards[]) {
    const sortedNumbers = cards.map(card => card.number).sort((a, b) => a - b)

    for (let i = 0; i < sortedNumbers.length - 1; i++) {
      if (sortedNumbers[i] !== sortedNumbers[i + 1] - 1) {
        return false
      }
    }

    return true
  }

  function hasThreeOfAKind(cards: ICards[]) {
    const numberCounts = countNumbers(cards)
    return Object.values(numberCounts).includes(3)
  }

  function hasTwoPair(cards: ICards[]) {
    const numberCounts = countNumbers(cards)
    const pairs = Object.values(numberCounts).filter(count => count === 2)
    return pairs.length === 2
  }

  function hasOnePair(cards: ICards[]) {
    const numberCounts = countNumbers(cards)
    return Object.values(numberCounts).includes(2)
  }

  function countNumbers(cards: ICards[]) {
    const counts: Record<number, number> = {}
    for (const card of cards) {
      counts[card.number] = (counts[card.number] || 0) + 1
    }
    return counts
  }

  const [combinationName, setCombinationName] = useState('')

  function evaluatePokerHand(cards: ICards[]) {
    if (hasRoyalFlush(cards)) {
      setCombinationName('Royal Flush')
    } else if (hasStraightFlush(cards)) {
      setCombinationName('Straight Flush')
    } else if (hasFourOfAKind(cards)) {
      setCombinationName('Four of a Kind')
    } else if (hasFullHouse(cards)) {
      setCombinationName('Full House')
    } else if (hasFlush(cards)) {
      setCombinationName('Flush')
    } else if (hasStraight(cards)) {
      setCombinationName('Straight')
    } else if (hasThreeOfAKind(cards)) {
      setCombinationName('Three of a Kind')
    } else if (hasTwoPair(cards)) {
      setCombinationName('Two Pair')
    } else if (hasOnePair(cards)) {
      setCombinationName('One Pair')
    } else {
      setCombinationName('High Card')
    }
  }
  useEffect(() => {
    evaluatePokerHand(activeCards)
  }, [activeCards, gameStatus])

  const [multiplier, token] = useUnit([GameModel.$multiplier, GameModel.$token])

  const [taken, setTaken] = useState(false)
  const [localAmount, setLocalAmount] = useState<any>(0)
  const [localCryptoValue, setLocalCryptoValue] = useState(0)
  // useEffect(() => {
  //   if (cryptoValue && isPlaying && !taken && betsAmount) {
  //     setTaken(true)
  //     setLocalAmount(betsAmount)
  //     setLocalCryptoValue(cryptoValue)
  //   }
  // }, [betsAmount, cryptoValue, isPlaying])

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

  const socket = useSocket()
  const subscribe = {
    type: 'SubscribeBets',
    payload: [gamesList.find(item => item.name === 'Poker')?.id]
  }

  const [betData, setBetData] = useState({})

  const [firstBet, setFirstBet] = useState(true)

  // useEffect(
  //   () => alert(`keep:${keep}, firstBet: ${firstBet}`),
  //   [keep, firstBet]
  // );
  const [keep, setKeep] = useState(false)

  const [coninue, setContinue] = useState(0)
  // useEffect(() => {
  //   if (firstBet) {
  //     setBetData({
  //       type: 'MakeBet',
  //       game_id: gamesList.find(item => item.name === 'Poker')?.id,
  //       coin_id: isDrax ? 2 : 1,
  //       user_id: userInfo?.id || 0,
  //       data: '{}',
  //       amount: `${cryptoValue || 0}`,
  //       stop_loss: Number(stopLoss) || 0,
  //       stop_win: Number(stopGain) || 0,
  //       num_games: betsAmount
  //     })
  //     if (isPlaying) {
  //       setFirstBet(false)
  //       setKeep(true)
  //     }
  //   } else {
  //     if (keep) {
  //       setBetData({
  //         type: 'ContinueGame',
  //         game_id: gamesList.find(item => item.name === 'Poker')?.id,
  //         coin_id: isDrax ? 2 : 1,
  //         user_id: userInfo?.id || 0,
  //         data: `{"to_replace":${[cardsState.map(el => (el ? true : false))]}}`
  //       })
  //       setContinue(prev => prev + 1)
  //     } else {
  //       setBetData({
  //         type: 'MakeBet',
  //         game_id: gamesList.find(item => item.name === 'Apples')?.id,
  //         coin_id: isDrax ? 2 : 1,
  //         user_id: userInfo?.id || 0,
  //         data: '{}',
  //         amount: `${cryptoValue || 0}`,
  //         stop_loss: Number(stopLoss) || 0,
  //         stop_win: Number(stopGain) || 0,
  //         num_games: betsAmount
  //       })
  //     }
  //   }
  // }, [
  //   stopGain,
  //   stopLoss,
  //   cryptoValue,
  //   isDrax,
  //   betsAmount,
  //   isPlaying,
  //   cardsState
  // ])

  // useEffect(() => setFirstBet(true), []);

  const [subscribed, setCubscribed] = useState(false)
  useEffect(() => {
    // alert(isPlaying);
    if (
      socket &&
      isPlaying &&
      access_token &&
      socket.readyState === WebSocket.OPEN
    ) {
      socket.send(JSON.stringify(betData))
      // setIsPlaying(false);
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
          payload: [gamesList.find(item => item.name === 'Poker')?.id]
        })
      )
      setCubscribed(true)
    }
  }, [socket, isPlaying, access_token, gamesList, coninue])

  // useEffect(() => {
  //   if (
  //     access_token &&
  //     socket &&
  //     socket.readyState === WebSocket.OPEN &&
  //     gamesList?.length > 0 &&
  //     socketLogged
  //   ) {
  //     socket.send(
  //       JSON.stringify({
  //         type: 'GetState',
  //         game_id: gamesList.find(item => item.name === 'Poker')?.id,
  //         coin_id: isDrax ? 2 : 1
  //       })
  //     )
  //   }
  // }, [socket, gamesList, isDrax, isPlaying, access_token, socketLogged])

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

      <div
        className='
          w-full h-full relative 
        '
      >
        {/* <WagerLowerBtnsBlock game='poker' text={props.gameText} /> */}
        {/* {preloading && <Preload />}{' '} */}
        <div
          className='
            w-full h-full absolute right-0 bottom-0 top-0 left-0 z-[-1]
          '
        >
          <Image
            onLoad={() => setImageLoading_1(false)}
            src={tableBg}
            className='
              rounded-[20px_20px_0_0] object-cover w-full h-full
            '
            alt='table-bg'
          />
        </div>{' '}
        <div
          className='
            gap-0 sm:gap-[5px] tracking-[0.4px] sm:tracking-[0.56px] text-[0.625rem] sm:text-[0.875rem]
            absolute bottom-[10px] left-[10px] z-[2] text-white flex flex-col font-bold 
          '
        >
          <span className='text-[#4ed26c]'>{fullWon.toFixed(2)}</span>
          <span className='text-[#fc3c37]'>{fullLost.toFixed(2)}</span>
          <div>
            Total:{' '}
            <span
              // className={clsx(
              //   totalValue > 0 && s.total_won,
              //   totalValue < 0 && s.total_lost
              // )}
              className={`
                ${totalValue > 0 ? 'text-[#4ed26c]' : 'text-[#fc3c37]'}
              `}
            >
              {Math.abs(totalValue).toFixed(2)}
            </span>
          </div>
        </div>
        <div
          className='
            absolute sm:top-[20px] left-[50%] translate-x-[-50%] flex flex-col-reverse top-[10px]
            w-[calc(100%_-_20px)] sm:w-[calc(100%_-_262px)] 
            mmd:w-[calc(100%_-_358px)] 5xl:w-[calc(100%_-_398px)]
            gap-[10px] overflow-x-scroll 
          '
        >
          {coefficientData.map((item, i) => (
            <div
              // className={clsx(
              //   s.multiplier_value,
              //   item > 0 ? s.multiplier_positive : s.multiplier_negative
              // )}
              className={`
                text-[0.75rem] sm:text-[0.875rem] mmd:text-[1.125rem] tracking-[0.48px]
                sm:tracking-[0.56] mmd:tracking-[0.72px] min-w-[48px] mmd:min-w-[60px] min-h-[24px] mmd:min-h-[40px]
                max-w-[48px] mmd:max-w-[40px] max-h-[24px] mmd:max-h-[40px] w-[48px] h-[24px] mmd:h-[40px] font-extrabold
                leading-[18px] mmd:leading-[23px] p-[0_10px] flex items-center justify-center rounded-[5px]

              `}
              key={i}
            >
              {item?.toFixed(2)}x
            </div>
          ))}
        </div>
        <div className='h-full'>
          <div
            className='
              p-[22px] w-[calc(100%_-_44px)] h-[calc(100%_-_44px)]
              sm:w-[calc(100%_-_40px)] sm:h-[calc(100%_-_40px)] sm:p-[20px] flex items-center justify-center
              tb:gap-[1.5vw] gap-[1vw] 
            '
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
