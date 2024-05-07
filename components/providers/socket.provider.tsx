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
    setSocketLogged,
    socketAuth,
    userInfo
  ] = useUnit([
    GameModel.newBet,
    SessionModel.setNewBet,
    GameModel.setResult,
    GameModel.setTokenId,
    GameModel.setUuid,
    UserModel.setSocketReset,
    UserModel.setSocketAuth,
    UserModel.setSocketLogged,
    UserModel.$socketAuth,
    UserModel.$userInfo
  ])

  const [reset, setReset] = useState(false)

  const [socket, setSocket] = useState<WebSocket | null>(null)
  const uuidRef = useRef<string | null>(null)
  const [localId, setLocalId] = useState<null | string>(null)

  // useEffect(() => alert(`${JSON.stringify(userInfo)}`), [userInfo])

  useEffect(() => {
    if (socket || !userInfo) return
    let uid: null | string = null
    const newSocket = new WebSocket('wss://rew.greekkeepers.io/api/updates')
    // alert(JSON.stringify(userInfo?.id))
    newSocket.onopen = () => {
      console.log('WebSocket connected')
      reset && setSocketReset()
      reset && setSocketAuth(false)
      reset && setSocketLogged(false)
    }

    newSocket.onmessage = (ev: MessageEvent<any>) => {
      const data = JSON.parse(ev.data)
      console.log('Received message from server:', data.uuid, uuidRef.current)
      if (data.type === 'Uuid') {
        // setLocalId(data.uuid)
        // setUuid(data.uuid)
        uid = data.uuid
        uuidRef.current = data.uuid
      }
      // alert(uid)
      // alert(`${data.user_id } = ${userInfo?.id}`)
      if (
        (data.type === 'Bet' ||
          data.type === 'MakeBet' ||
          data.type === 'ContinueGame' ||
          data.type === 'State') &&
        data.user_id == userInfo?.id
      ) {
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
      console.log('websockets closed')
      setSocket(null)
      // setSocketLogged(false);
      setReset(true)
      // setLocalId(null)
      // uid = null
    }
    newSocket.onerror = () => {
      console.log('websockets error')
      setSocket(null)
      // setSocketLogged(false);
      setReset(true)
      // setLocalId(null)
      // uid = null
    }
    setSocket(newSocket)

    // return () => {
    //   newSocket.close();
    // };
  }, [socket, userInfo?.id])
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
