export function sendSocketData(
  socket: WebSocket | null,
  isPlaying: boolean,
  access_token: string | null,
  subscribed: boolean,
  gamesList: any[] | null,
  betData: any,
  setCubscribed: React.Dispatch<React.SetStateAction<boolean>>,
  title: string
) {
  if (
    socket &&
    isPlaying &&
    access_token &&
    socket.readyState === WebSocket.OPEN
  ) {
    socket.send(JSON.stringify(betData))
    alert(JSON.stringify(betData))
  }

  if (
    socket &&
    access_token &&
    socket.readyState === WebSocket.OPEN &&
    !subscribed &&
    gamesList &&
    gamesList?.length > 0
  ) {
    const pokerGameId = gamesList.find(item => item.name === title)?.id
    if (pokerGameId) {
      socket.send(
        JSON.stringify({
          type: 'SubscribeBets',
          payload: [pokerGameId]
        })
      )
      setCubscribed(true)
    }
  }
}
