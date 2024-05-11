import { createEffect, createEvent, createStore, sample } from 'effector'

// variables
export const $vaultModal = createStore<boolean>(false)
export const $vipModal = createStore<boolean>(false)
export const $gamesModal = createStore<boolean>(false)

// events
export const setVaultModal = createEvent<boolean>()
export const setVipModal = createEvent<boolean>()
export const setGamesModal = createEvent<boolean>()


// handlers
$vaultModal.on(setVaultModal, (_, state) => state)
$vipModal.on(setVipModal, (_, state) => state)
$gamesModal.on(setGamesModal, (_, state) => state)