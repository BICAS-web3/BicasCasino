import { createEffect, createEvent, createStore, sample } from 'effector'

// variables
export const $modalVisibility = createStore<boolean>(false)

// events
export const setModalVisibility = createEvent<boolean>()


// handlers
$modalVisibility.on(setModalVisibility, (_, state) => state)