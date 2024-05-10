interface IData {
  socket?: WebSocket | null
  isPlaying?: boolean
  access_token?: string | null
  betData?: Record<string, string | number>
}

export function sendSocketData({
  socket,
  isPlaying,
  access_token,
  betData
}: IData) {
  if (
    socket &&
    isPlaying &&
    access_token &&
    socket.readyState === WebSocket.OPEN
  ) {
    socket.send(JSON.stringify(betData))
  }
}
