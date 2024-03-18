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

const SocketContext = createContext<WebSocket | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [newBet, setNewBet, setResult, setTokenId, setUuid, uuid] = useUnit([
    Model.newBet,
    sessionModel.setNewBet,
    Model.setResult,
    Model.setTokenId,
    Model.setUuid,
    Model.$uuid,
  ]);

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const uuidRef = useRef<string | null>(null);

  useEffect(() => {
    if (socket) {
      return;
    }


    const newSocket = new WebSocket("wss://game.greekkeepers.io/api/updates");

    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    newSocket.onmessage = (ev: MessageEvent<any>) => {
      const data = JSON.parse(ev.data);
      console.log("Received message from server:", data.uuid, uuidRef.current);
      if (data.type === "Uuid") {
        setUuid(data.uuid);
        uuidRef.current = data.uuid;
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
    }
    newSocket.onerror = () => {
      console.log("websockets error");
      setSocket(null);
    }
    setSocket(newSocket);

    // return () => {
    //   newSocket.close();
    // };
  }, [socket]);


  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
