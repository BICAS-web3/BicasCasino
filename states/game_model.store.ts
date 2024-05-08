import { createEffect, createEvent, createStore, sample } from 'effector'

import * as api from '@/api'

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

export interface WonStatus {
  profit: number
  multiplier: number
  token: string
}

// variablesresult
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
export const $autoVisible = createStore<boolean>(false)
export const $wheelVisible = createStore<boolean>(false)
export const $coefficientData = createStore<number[]>([])
// events
export const setCoefficientData = createEvent<number[]>()
export const setIsPlaying = createEvent<boolean>()
export const setWaitingResponse = createEvent<boolean>()
export const switchSounds = createEvent<string>()
export const setGameStatus = createEvent<GameStatus | null>()
export const setWonStatus = createEvent<WonStatus>()
export const setLostStatus = createEvent<number>()
export const clearStatus = createEvent()
export const setBetValue = createEvent<bigint>()
export const setIsEmtyWager = createEvent<boolean>()
export const setRefund = createEvent<boolean>()
export const setGamesList = createEvent<GamesList[]>()
export const $keep = createStore(false)
export const setKeep = createEvent<boolean>()
export const setAutoVisible = createEvent<boolean>()
export const setWheelVisible = createEvent<boolean>()
$coefficientData.on(setCoefficientData, (_, state) => state)
$keep.on(setKeep, (_, state) => state)
// handlers
$betValue.on(setBetValue, (_, state) => state)
$isPlaying.on(setIsPlaying, (_, state) => state)
$waitingResponse.on(setWaitingResponse, (_, state) => state)
$playSounds.on(switchSounds, (old, state) => state)
$gameStatus.on(setGameStatus, (_, status) => status)
$autoVisible.on(setAutoVisible, (_, state) => state)
$wheelVisible.on(setWheelVisible, (_, state) => state)

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

export interface IResult {
  type: string
  id: number
  timestamp: number
  amount: string
  profit: string
  bet_info: string
  game_id: number
  user_id: number
  coin_id: number
  userseed_id: number
  serverseed_id: number
  outcomes: string
  profits: string
  uuid: string
  state?: string | undefined
  payouts: string
  num_games?: number
}

// variables
export const $Bets = createStore<api.T_BetInfo[]>([])

export const $tokenId = createStore<null | number>(null)
export const $result = createStore<IResult | null>(null)
export const $uuid = createStore<string | null>(null)

// events
export const newBet = createEvent<api.T_BetInfo>()
export const setBets = createEvent<api.T_BetInfo[]>()
export const setResult = createEvent<IResult | null>()
export const setTokenId = createEvent<number>()
export const setUuid = createEvent<string>()

// handlers
$Bets
  .on(setBets, (_, new_bets) => new_bets)
  .on(newBet, (list, new_bet) => {
    list.unshift(new_bet)
    if (list.length > 10) {
      list.pop()
    }
  })

$result.on(setResult, (_, state) => state)
$tokenId.on(setTokenId, (_, state) => state)
$uuid.on(setUuid, (_, state) => state)

//! PLINKO

export const $level = createStore<string>('Easy')
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

export const $initialValue = createStore<Side>(Side.Heads)
export const $active = createStore<boolean>(true)
export const $pickedSide = createStore<Side>(Side.Heads)
export const $coefficient = createStore<number>(0)

// events
export const setInitialValue = createEvent<Side>()
export const pickSide = createEvent<Side>()
export const setActive = createEvent<boolean>()
export const setCoefficient = createEvent<number>()

$initialValue.on(setInitialValue, (_, state) => state)
$pickedSide.on(pickSide, (_, side) => side)
$active.on(setActive, (_, value) => value)
$coefficient.on(setCoefficient, (_, value) => value)

// events

// handlers

//!ROCKET

export const $RollValue = createStore<number>(50.5)
export const $RollOver = createStore<boolean>(true)
export const $rocketStar = createStore<boolean>(false)
//export const $RollUnder = createStore<boolean>(false);

// events
export const setRollValue = createEvent<number>()
export const setRollOver = createEvent<boolean>()
export const setRollUnder = createEvent<boolean>()
export const flipRollOver = createEvent<number>()
export const setRocketStar = createEvent<boolean>()
//export const flipRollUnder = createEvent<number>();
$rocketStar.on(setRocketStar, (_, state) => state)
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

//! APPLES

export const $isPlayingStatus = createStore<boolean>(false)
export const $gameResult = createStore<number[]>([])
export const $reset = createStore<boolean>(false)
export const $emptyField = createStore(false)
export const $stop = createStore<boolean>(false)
export const $apples = createStore<number[]>([])
export const $appleWager = createStore<number>(0)
export const $showResult = createStore<boolean>(false)
// events
export const setPlayingStatus = createEvent<boolean>()
export const setGameResult = createEvent<number[]>()
export const setReset = createEvent<boolean>()
export const setEmptyField = createEvent<boolean>()
export const setStop = createEvent<boolean>()
export const setApples = createEvent<number[]>()
export const setApplesWagerr = createEvent<number>()
export const setShowResult = createEvent<boolean>()
$isPlayingStatus.on(setPlayingStatus, (_, state) => state)
$gameResult.on(setGameResult, (_, state) => state)
$reset.on(setReset, (_, state) => state)
$emptyField.on(setEmptyField, (_, state) => state)
$stop.on(setStop, (_, state) => state)
$apples.on(setApples, (_, state) => state)
$appleWager.on(setApplesWagerr, (_, state) => state)
$showResult.on(setShowResult, (_, state) => state)

//! Mines

export type ManualType = 'MANUAL' | 'AUTO'
export type WinningType = 'YES' | 'NO' | 'X5'

export const $manualSetting = createStore<ManualType>('MANUAL')
export const $stopWinning = createStore<WinningType>('YES')
export const $selectedLength = createStore<number>(0)

export const setManualSetting = createEvent<ManualType>()
export const setStopWinning = createEvent<WinningType>()
export const setSelectedLength = createEvent<number>()

$manualSetting.on(setManualSetting, (_, state) => state)
$stopWinning.on(setStopWinning, (_, state) => state)
$selectedLength.on(setSelectedLength, (_, state) => state)

//! POKER
export const $redrawCards = createStore<boolean>(false)
export const $finishPoker = createStore<boolean>(false)
export const $backCards = createStore(false)
export const setRedrawCards = createEvent<boolean>()
export const setFinishPoker = createEvent<boolean>()
export const setBackCards = createEvent<boolean>()
$redrawCards.on(setRedrawCards, (_, state) => state)
$finishPoker.on(setFinishPoker, (_, state) => state)
$backCards.on(setBackCards, (_, state) => state)
//! RPS
export enum RPSValue {
  Rock = 0,
  Paper = 1,
  Scissors = 2
}

// variables
export const $activeRPS = createStore<boolean>(true)
export const $startAnimation = createStore<boolean>(false)
export const $pickedValueRPS = createStore<RPSValue>(RPSValue.Paper)
export const $finishGame = createStore<boolean>(false)
// events
export const pickValueRPS = createEvent<RPSValue>()
export const setActiveRPS = createEvent<boolean>()
export const setStartAnimation = createEvent<boolean>()
export const setFinishGame = createEvent<boolean>()

// handlers
$pickedValueRPS.on(pickValueRPS, (_, value) => value)
$activeRPS.on(setActiveRPS, (_, value) => value)
$startAnimation.on(setStartAnimation, (_, value) => value)
$finishGame.on(setFinishGame, (_, state) => state)

//! BJ

export type bjStep = 'Hit' | 'Stand' | 'Split' | 'Double' | null

export const $btnsActive = createStore(false)
export const $activeStep = createStore<bjStep>(null)
export const $userCount = createStore<number>(0)
export const $dilerCount = createStore<number>(0)

export const setBtnsActive = createEvent<boolean>()
export const setActiveStep = createEvent<bjStep>()
export const setUserCount = createEvent<number>()
export const setDilerCount = createEvent<number>()

$btnsActive.on(setBtnsActive, (_, state) => state)
$activeStep.on(setActiveStep, (_, state) => state)
$userCount.on(setUserCount, (_, state) => state)
$dilerCount.on(setDilerCount, (_, state) => state)

//! THIMBLES

export const $showAnimation = createStore<boolean>(false)

export const setShowAnimation = createEvent<boolean>()
$showAnimation.on(setShowAnimation, (_, state) => state)
