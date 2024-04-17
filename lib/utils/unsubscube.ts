import { GamesList } from '@/states/game_model.store'

export const useUnSubscribe = ({
  name,
  gamesList,
  socket
}: {
  name: string
  gamesList: GamesList[]
  socket: WebSocket | null
}) => {
  socket?.send(
    JSON.stringify({
      type: 'UnsubscribeBets',
      payload: [gamesList.find(item => item.name === name)?.id]
    })
  )
}
