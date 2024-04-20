import { createEffect, createEvent, createStore, sample } from 'effector'

// variables
export const $modalVisibility = createStore<boolean>(false)
export const $historyVisibility = createStore<boolean>(false)

// events
export const setModalVisibility = createEvent<boolean>()
export const setHistoryVisibility = createEvent<boolean>()


// handlers
$historyVisibility.on(setHistoryVisibility, (_, state) => state)
$modalVisibility.on(setModalVisibility, (_, state) => state)