import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useUnit } from "effector-react";
import * as Model from "@/widgets/LiveBets/model";
import { sessionModel } from "@/entities/session";

// Создаем контекст для сокетов
const SocketContext = createContext<WebSocket | null>(null);

// Функция-обертка, чтобы предоставить удобный доступ к сокетам через useContext
export const useSocket = () => useContext(SocketContext);

// Компонент-провайдер для предоставления сокетов через контекст
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [newBet, setNewBet, setResult] = useUnit([
    Model.newBet,
    sessionModel.setNewBet,
    Model.setResult,
  ]);

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Создаем новый сокет
    const newSocket = new WebSocket("ws://127.0.0.1:8585/api/updates");

    // Обработчик события открытия сокета
    newSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    // Обработчик события приема сообщения
    newSocket.onmessage = (ev: MessageEvent<any>) => {
      console.log("Received message from server:", ev.data);
      const data = JSON.parse(ev.data);
      if (data.type === "Bet" || data.type === "MakeBet") {
        setResult(data);
      }
      if (data.type == "Ping") {
        return;
      }
      setNewBet(data);
      if (data.game_name != "PokerStart") {
        newBet(data);
      }
      // Ваша логика обработки приема сообщений здесь
      // Например, установка результатов, новых ставок и т. д.
    };

    // Устанавливаем сокет в состояние
    setSocket(newSocket);

    // Возвращаем функцию для очистки, которая закрывает сокет при размонтировании компонента
    // return () => {
    //   newSocket.close();
    // };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
