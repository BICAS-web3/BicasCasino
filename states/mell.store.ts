import { createEvent, createStore } from 'effector'

export const $betSettingsVisibility = createStore<boolean>(false)
export const $gameInfoVisibility = createStore<boolean>(false)
export const $winVisibility = createStore<boolean>(false)
export const $autoplay = createStore<boolean>(true)

export const setBetSettingsVisibility = createEvent<boolean>()
export const setGameInfoVisibility = createEvent<boolean>()
export const setWinVisibility = createEvent<boolean>()
export const setAutoPlay = createEvent<boolean>()

$autoplay.on(setAutoPlay, (_, state) => state)
$winVisibility.on(setWinVisibility, (_, state) => state)
$betSettingsVisibility.on(setBetSettingsVisibility, (_, state) => state)
$gameInfoVisibility.on(setGameInfoVisibility, (_, state) => state)
