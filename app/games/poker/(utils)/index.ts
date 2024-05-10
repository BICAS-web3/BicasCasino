import { GamesList } from '@/states/game_model.store'
import { UserType } from '@/states/user_model.store'
import { ICards } from '@/types/games.types'
import { Dispatch, SetStateAction } from 'react'

export function hasRoyalFlush(cards: ICards[]) {
  const royalFlushNumbers = [1, 10, 11, 12, 13]
  const suits = new Set(cards.map(card => card.suit))

  return Array.from(suits).some(suit => {
    const suitCards = cards.filter(card => card.suit === suit)
    const numbers = suitCards.map(card => card.number)

    return royalFlushNumbers.every(number => numbers.includes(number))
  })
}

export function hasStraightFlush(cards: ICards[]) {
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

export function hasFourOfAKind(cards: ICards[]) {
  const numberCounts = countNumbers(cards)

  return Object.values(numberCounts).includes(4)
}

export function hasFullHouse(cards: ICards[]) {
  const numberCounts = countNumbers(cards)
  return (
    Object.values(numberCounts).includes(3) &&
    Object.values(numberCounts).includes(2)
  )
}

export function hasFlush(cards: ICards[]) {
  const suits = new Set(cards.map(card => card.suit))
  return suits.size === 1
}

export function hasStraight(cards: ICards[]) {
  const sortedNumbers = cards.map(card => card.number).sort((a, b) => a - b)

  for (let i = 0; i < sortedNumbers.length - 1; i++) {
    if (sortedNumbers[i] !== sortedNumbers[i + 1] - 1) {
      return false
    }
  }

  return true
}

export function hasThreeOfAKind(cards: ICards[]) {
  const numberCounts = countNumbers(cards)
  return Object.values(numberCounts).includes(3)
}

export function hasTwoPair(cards: ICards[]) {
  const numberCounts = countNumbers(cards)
  const pairs = Object.values(numberCounts).filter(count => count === 2)
  return pairs.length === 2
}

export function hasOnePair(cards: ICards[]) {
  const numberCounts = countNumbers(cards)
  return Object.values(numberCounts).includes(2)
}

export function countNumbers(cards: ICards[]) {
  const counts: Record<number, number> = {}
  for (const card of cards) {
    counts[card.number] = (counts[card.number] || 0) + 1
  }
  return counts
}

export function evaluatePokerHand(
  cards: ICards[],
  setCombinationName: Dispatch<SetStateAction<string>>
) {
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

// betLogic.ts
export const generateBetData = (
  firstBet: boolean,
  keep: boolean,
  gamesList: GamesList[],
  isDrax: boolean,
  userInfo: UserType | null,
  cryptoValue: number,
  stopLoss: number | null,
  stopGain: number | null,
  betsAmount: number,
  isPlaying: boolean,
  cardsState: boolean[],
  setFirstBet: Dispatch<SetStateAction<boolean>>,
  setKeep: Dispatch<SetStateAction<boolean>>
) => {
  if (firstBet) {
    if (isPlaying) {
      setFirstBet(false)
      setKeep(true)
    }
    return {
      type: 'MakeBet',
      game_id: gamesList.find(item => item.name === 'Poker')?.id || 12,
      coin_id: isDrax ? 2 : 1,
      user_id: userInfo?.id || 0,
      data: '{}',
      amount: `${cryptoValue || 0}`,
      stop_loss: Number(stopLoss) || 0,
      stop_win: Number(stopGain) || 0,
      num_games: betsAmount
    }
  } else {
    if (keep) {
      return {
        type: 'ContinueGame',
        game_id: gamesList.find(item => item.name === 'Poker')?.id || 12,
        coin_id: isDrax ? 2 : 1,
        user_id: userInfo?.id || 0,
        data: `{"to_replace":[${cardsState.map(el => (el ? true : false))}]}`
      }
    } else {
      setKeep(true)
      return {
        type: 'MakeBet',
        game_id: gamesList.find(item => item.name === 'Poker')?.id || 12,
        coin_id: isDrax ? 2 : 1,
        user_id: userInfo?.id || 0,
        data: '{}',
        amount: `${cryptoValue || 0}`,
        stop_loss: Number(stopLoss) || 0,
        stop_win: Number(stopGain) || 0,
        num_games: betsAmount
      }
    }
  }
}
