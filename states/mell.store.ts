import { createEvent, createStore } from 'effector'

export const $betSettingsVisibility = createStore<boolean>(false)
export const $gameInfoVisibility = createStore<boolean>(false)
export const $winVisibility = createStore<boolean>(false)
export const $autoplay = createStore<boolean>(false)
export const $buy = createStore<boolean>(false)

export const setBetSettingsVisibility = createEvent<boolean>()
export const setGameInfoVisibility = createEvent<boolean>()
export const setWinVisibility = createEvent<boolean>()
export const setAutoPlay = createEvent<boolean>()
export const setBuy = createEvent<boolean>()

$autoplay.on(setAutoPlay, (_, state) => state)
$buy.on(setBuy, (_, state) => state)
$winVisibility.on(setWinVisibility, (_, state) => state)
$betSettingsVisibility.on(setBetSettingsVisibility, (_, state) => state)
$gameInfoVisibility.on(setGameInfoVisibility, (_, state) => state)
