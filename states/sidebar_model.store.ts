import { createEvent, createStore } from 'effector'

export const $open = createStore<boolean>(false)
export const setOpen = createEvent<boolean>()

$open.on(setOpen, (_, state) => state)
