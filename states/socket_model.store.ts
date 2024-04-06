import { createEvent, createStore } from 'effector'

export const $socket = createStore<null | WebSocket>(null)

export const setSocket = createEvent<WebSocket>()

$socket.on(setSocket, (_, state) => state)
