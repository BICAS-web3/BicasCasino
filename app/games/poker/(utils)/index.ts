interface ICards {
  suit: number
  number: number
}

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
