import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { useUnit } from "effector-react";
import * as Model from "@/widgets/LiveBets/model";
import { sessionModel } from "@/entities/session";

import * as LModel from "@/widgets/Layout/model";

const SocketContext = createContext<WebSocket | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [
    newBet,
    setNewBet,
    setResult,
    setTokenId,
    setUuid,
    uuid,
    setSocketReset,
    setSocketAuth,
    setSocketLogged,
  ] = useUnit([
    Model.newBet,
    sessionModel.setNewBet,
    Model.setResult,
    Model.setTokenId,
    Model.setUuid,
    Model.$uuid,
    LModel.setSocketReset,
    LModel.setSocketAuth,
    LModel.setSocketLogged,
  ]);

  const [reset, setReset] = useState(false);

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const uuidRef = useRef<string | null>(null);

  useEffect(() => {
    if (socket) return;
    let uid: null | string = null;
    const newSocket = new WebSocket("wss://game.greekkeepers.io/api/updates");

    newSocket.onopen = () => {
      console.log("WebSocket connected");
      reset && setSocketReset();
      reset && setSocketAuth(false);
      reset && setSocketLogged(false);
    };

    newSocket.onmessage = (ev: MessageEvent<any>) => {
      const data = JSON.parse(ev.data);
      console.log("Received message from server:", data.uuid, uuidRef.current);
      if (data.type === "Uuid") {
        setUuid(data.uuid);
        uid = data.uuid;
        uuidRef.current = data.uuid;
      }
      if (data.type === "State" && uid !== null) {
        setResult(data);
        // uid = null;
      }
      if (
        (data.type === "Bet" ||
          data.type === "MakeBet" ||
          data.type === "ContinueGame" ||
          data.type === "State") &&
        data.uuid === uuidRef.current
      ) {
        setResult(data);
        if (data && (data?.coin_id || data?.coin_id === 0)) {
          setTokenId(data.coin_id);
        }
      }
      if (data.type == "Ping") {
        return;
      }

      if (data.type === "Bet") {
        setNewBet(data);
        newBet(data);
      }
    };

    newSocket.onclose = () => {
      console.log("websockets closed");
      setSocket(null);
      // setSocketLogged(false);
      setReset(true);
      uid = null;
    };
    newSocket.onerror = () => {
      console.log("websockets error");
      setSocket(null);
      // setSocketLogged(false);
      setReset(true);
      uid = null;
    };
    setSocket(newSocket);

    // return () => {
    //   newSocket.close();
    // };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
