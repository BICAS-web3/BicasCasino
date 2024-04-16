import { GamesList } from '@/states/game_model.store'
import { Dispatch, SetStateAction } from 'react'

export const useSubscibeBets = ({
  name,
  gamesList,
  subscribed,
  setCubscribed,
  socket
}: {
  name: string
  gamesList: GamesList[]
  subscribed: boolean
  setCubscribed: Dispatch<SetStateAction<boolean>>
  socket: WebSocket | null
}) => {
  if (socket && socket.readyState === WebSocket.OPEN && gamesList.length > 0) {
    socket?.send(JSON.stringify({ type: 'UnsubscribeAllBets' }))
    if (!subscribed) {
      socket?.send(
        JSON.stringify({
          type: 'SubscribeBets',
          payload: [gamesList.find(item => item.name === name)?.id]
        })
      )
      setCubscribed(true)
    }
  }
}
