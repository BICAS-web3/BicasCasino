import { createEffect, createEvent, createStore, sample } from 'effector'

export interface IMessage {
  type: 'ChatMessage'
  room_id: number
  user_id: number
  username: string
  level: number
  avatar: unknown
  message: string
  attached_media: unknown
  mentions: unknown[]
  time: string
}

// variables
export const $chatVisibility = createStore<boolean>(false)
export const $messageData = createStore<IMessage[]>([])

// events
export const setChatVisibility = createEvent<boolean>()
export const setMessageData = createEvent<IMessage[]>()

// handlers
$chatVisibility.on(setChatVisibility, (_, state) => state)
$messageData.on(setMessageData, (state, payload) => state.concat(payload))
