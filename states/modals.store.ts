import { createEffect, createEvent, createStore, sample } from 'effector'

// variables
export const $vaultModal = createStore<boolean>(true)

// events
export const setVaultModal = createEvent<boolean>()


// handlers
$vaultModal.on(setVaultModal, (_, state) => state)