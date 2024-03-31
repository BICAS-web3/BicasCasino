import { createEffect, createEvent, createStore, sample } from 'effector'
export enum GameStatus {
  Won,
  Lost,
  Draw
}

export type GamesList = {
  name: string
  id: number
  parameters: string
}

// variables
export const $playSounds = createStore<string>('off')
export const $gameStatus = createStore<GameStatus | null>(null)
export const $isPlaying = createStore<boolean>(false)
export const $waitingResponse = createStore<boolean>(false)
export const $profit = createStore<number>(0)
export const $multiplier = createStore<number>(0)
export const $lost = createStore<number>(0)
export const $token = createStore<string>('')
export const $betValue = createStore<bigint>(BigInt(0))
export const $isEmtyWager = createStore<boolean>(false)
export const $refund = createStore<boolean>(false)
export const $gamesList = createStore<GamesList[]>([])
// events
export const setIsPlaying = createEvent<boolean>()
export const setWaitingResponse = createEvent<boolean>()
export const switchSounds = createEvent<string>()
export const setGameStatus = createEvent<GameStatus | null>()
export const setWonStatus = createEvent<{
  profit: number
  multiplier: number
  token: string
}>()
export const setLostStatus = createEvent<number>()
export const clearStatus = createEvent()
export const setBetValue = createEvent<bigint>()
export const setIsEmtyWager = createEvent<boolean>()
export const setRefund = createEvent<boolean>()
export const setGamesList = createEvent<GamesList[]>()

// handlers
$betValue.on(setBetValue, (_, state) => state)
$isPlaying.on(setIsPlaying, (_, state) => state)
$waitingResponse.on(setWaitingResponse, (_, state) => state)
$playSounds.on(switchSounds, (old, state) => state)
$gameStatus.on(setGameStatus, (_, status) => status)

$profit.on(setWonStatus, (_, data) => data.profit).on(clearStatus, () => 0)
$multiplier
  .on(setWonStatus, (_, data) => data.multiplier)
  .on(clearStatus, () => 0)
$token.on(setWonStatus, (_, data) => data.token).on(clearStatus, () => '')
$lost.on(setLostStatus, (_, data) => data).on(clearStatus, () => 0)
$gameStatus.on(clearStatus, () => null)
$isEmtyWager.on(setIsEmtyWager, (_, state) => state)
$refund.on(setRefund, (_, state) => state)
$gamesList.on(setGamesList, (_, state) => state)

//! PLINKO

export const $level = createStore<string>('easy')
export const $pickedValue = createStore<number>(1)
export const $pickedRows = createStore<number>(10)
export const $arrayStore = createStore<{ value: number; index: number }>({
  value: -1,
  index: -1
})

export const pickValue = createEvent<number>()
export const pickRows = createEvent<number>()
export const setBolls = createEvent<{ value: number; index: number }>()
export const setLevel = createEvent<string>()

$pickedValue.on(pickValue, (_, current_bets) => current_bets)
$pickedRows.on(pickRows, (_, rows) => rows)
$arrayStore.on(setBolls, (_, state) => state)
$level.on(setLevel, (_, inp) => inp)

//! COINFLIP
export enum Side {
  Tails = 0,
  Heads = 1
}

export const $active = createStore<boolean>(true)
export const $pickedSide = createStore<Side>(Side.Heads)
export const $coefficient = createStore<number>(0)

// events
export const pickSide = createEvent<Side>()
export const setActive = createEvent<boolean>()
export const setCoefficient = createEvent<number>()

$pickedSide.on(pickSide, (_, side) => side)
$active.on(setActive, (_, value) => value)
$coefficient.on(setCoefficient, (_, value) => value)

// events

// handlers

//!ROCKET

export const $RollValue = createStore<number>(50.5)
export const $RollOver = createStore<boolean>(true)
//export const $RollUnder = createStore<boolean>(false);

// events
export const setRollValue = createEvent<number>()
export const setRollOver = createEvent<boolean>()
export const setRollUnder = createEvent<boolean>()
export const flipRollOver = createEvent<number>()
//export const flipRollUnder = createEvent<number>();

// handlers
$RollValue.on(setRollValue, (_, value) => value)
$RollOver
  //.on(setRollOver, (_, rollOver) => rollOver)
  .on(flipRollOver, (old_value, old_roll_value) => {
    const new_val = 100 - old_roll_value
    if (new_val < 0.1) {
      setRollValue(0.1)
    } else {
      setRollValue(new_val)
    }
    return !old_value
  })
