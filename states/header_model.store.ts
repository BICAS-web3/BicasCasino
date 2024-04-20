import { createEffect, createEvent, createStore, sample } from 'effector'

// variables
export const $menuVisibility = createStore<boolean>(false)
export const $userModalVisibility = createStore<boolean>(true)
// events
export const setMenuVisibility = createEvent<boolean>()
export const setUserModalVisibility = createEvent<boolean>()


// handlers
$menuVisibility.on(setMenuVisibility, (_, state) => state)
$userModalVisibility.on(setUserModalVisibility, (_, state) => state)