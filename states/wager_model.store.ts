import { createEvent, createStore } from 'effector'
export enum RangeType {
  Bets,
  Rows
}

// variables
export const $pickedValue = createStore<number>(1)
export const $pickedRows = createStore<number>(10)
export const $error = createStore<boolean>(false)
export const $stopGain = createStore<number | null>(null)
export const $stopLoss = createStore<number | null>(null)
export const $pickedToken = createStore<any>(null)
export const $cryptoValue = createStore<number>(0)
export const $Wagered = createStore<boolean>(false)

export const setCryptoValue = createEvent<number>()
export const pickToken = createEvent<any>()
export const unpickToken = createEvent()
export const setError = createEvent<boolean>()
export const pickStopGain = createEvent<number | null>()
export const pickStopLoss = createEvent<number | null>()
export const pressButton = createEvent()
export const setWagered = createEvent<boolean>()
export const pickValue = createEvent<number>()
export const pickRows = createEvent<number>()

$cryptoValue.on(setCryptoValue, (_, value) => value)
$pickedToken.on(pickToken, (_, token) => token).on(unpickToken, () => null)
$error.on(setError, (_, state) => state)
$stopGain.on(pickStopGain, (_, value) => value)
$stopLoss.on(pickStopLoss, (_, value) => value)
$Wagered.on(pressButton, () => true).on(setWagered, (_, status) => status)
$pickedValue.on(pickValue, (_, current_bets) => current_bets)
$pickedRows.on(pickRows, (_, rows) => rows)
