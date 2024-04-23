import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useMemo
} from 'react'
import { useUnit } from 'effector-react'
import { GameModel, SessionModel, UserModel } from '@/states'

const SocketContext = createContext<WebSocket | null>(null)

export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [
    newBet,
    setNewBet,
    setResult,
    setTokenId,
    setUuid,
    setSocketReset,
    setSocketAuth,
    setSocketLogged
  ] = useUnit([
    GameModel.newBet,
    SessionModel.setNewBet,
    GameModel.setResult,
    GameModel.setTokenId,
    GameModel.setUuid,
    UserModel.setSocketReset,
    UserModel.setSocketAuth,
    UserModel.setSocketLogged
  ])

  const [reset, setReset] = useState(false)

  const [socket, setSocket] = useState<WebSocket | null>(null)
  const uuidRef = useRef<string | null>(null)

  // const socketValue = useMemo(() => socket, [socket])

  useEffect(() => {
    const newSocket = new WebSocket('wss://rew.greekkeepers.io/api/updates')
    setSocket(prevSocket => {
      if (prevSocket === null) {
        return newSocket
      } else {
        return prevSocket
      }
    })
    if (socket && socket.readyState === WebSocket.OPEN) return
    let uid: null | string = null

    newSocket.onopen = () => {
      reset && setSocketReset()
      // reset && setSocketAuth(false)
      reset && setSocketLogged(false)
    }

    newSocket.onmessage = (ev: MessageEvent<any>) => {
      const data = JSON.parse(ev.data)
      if (data.type === 'Uuid') {
        setUuid(data.uuid)
        uid = data.uuid
        uuidRef.current = data.uuid
      }
      if (
        (JSON.parse(ev.data).type === 'Bet' && data.uuid === uuidRef.current) ||
        (JSON.parse(ev.data).type === 'ContinueGame' &&
          data.uuid === uuidRef.current) ||
        JSON.parse(ev.data).type === 'State'
      ) {
        // alert(9999)
        setResult(data)
        if (data && (data?.coin_id || data?.coin_id === 0)) {
          setTokenId(data.coin_id)
        }
      }
      if (data.type == 'Ping') {
        return
      }

      if (data.type === 'Bet') {
        setNewBet(data)
        newBet(data)
      }
    }

    newSocket.onclose = () => {
      setReset(true)
      setSocket(null)
      uid = null
    }
    newSocket.onerror = () => {
      setSocket(null)
      // setSocketLogged(false);
      setReset(true)
      uid = null
    }
  }, [socket, uuidRef])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
