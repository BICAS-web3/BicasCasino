import { GamesList } from '@/states/game_model.store'

export const useGetState = ({
  access_token,
  socket,
  gamesList,
  socketLogged,
  isDrax,
  title
}: {
  access_token: string
  socket: WebSocket | null
  gamesList: GamesList[]
  socketLogged: boolean
  isDrax: boolean
  title: string
}) => {
  if (
    access_token &&
    socket &&
    socket.readyState === WebSocket.OPEN &&
    gamesList?.length > 0 &&
    socketLogged
  ) {
    socket.send(
      JSON.stringify({
        type: 'GetState',
        game_id: gamesList.find(item => item.name === title)?.id,
        coin_id: isDrax ? 2 : 1
      })
    )
  }
}
