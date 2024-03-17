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
      setNewBet(data);
      if (data.game_name != "PokerStart") {
        newBet(data);
      }
    };
    setSocket(newSocket);

    // return () => {
    //   newSocket.close();
    // };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
