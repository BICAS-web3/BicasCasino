import { createEffect, createEvent, createStore, sample } from 'effector'

// variables
export const $chatVisibility = createStore<boolean>(true)

// events
export const setChatVisibility = createEvent<boolean>()


// handlers
$chatVisibility.on(setChatVisibility, (_, state) => state)