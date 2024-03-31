import { createEvent, createStore } from 'effector'

export const $open = createStore<boolean>(true)

export const setOpen = createEvent<boolean>()

$open.on(setOpen, (_, state) => state)
