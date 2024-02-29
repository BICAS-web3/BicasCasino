import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import * as Model from "./model";
import * as Api from "@/shared/api";
import { settingsModel } from "@/entities/settings";
import { sessionModel } from "@/entities/session";

// const LinkIcon: FC<{}> = (p) => {
//   return (
//     <svg height="14px" width="14px" viewBox="0 0 18 18">
//       <path
//         fill-rule="evenodd"
//         clip-rule="evenodd"
//         d="M2 2V16H16V9H18V16C18 17.1 17.1 18 16 18H2C0.89 18 0 17.1 0 16V2C0 0.9 0.89 0 2 0H9V2H2Z"
//       ></path>
//       <path d="M11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z"></path>
//     </svg>
//   );
// };

interface timeProps {
  time: string;
  date: string;
}

export interface LiveBetsWSProps {
  subscription_type: string;
  subscriptions: string[];
  isLiveBets?: boolean;
  data?: Record<string, any>[];
  addition?: any;
}
export const LiveBetsWS: FC<LiveBetsWSProps> = ({
  isLiveBets = true,
  subscription_type,
  subscriptions,
  data,
  addition,
}) => {
  const [
    Bets,
    newBet,
    setBets,
    availableBlocksExplorers,
    setNewBet,
    resilt,
    setResult,
  ] = useUnit([
    Model.$Bets,
    Model.newBet,
    Model.setBets,
    settingsModel.$AvailableBlocksExplorers,
    sessionModel.setNewBet,
    Model.$result,
    Model.setResult,
  ]);

  const [socket, setSocket] = useState<any | null>(null);

  const getBets = async () => {
    var bets =
      subscriptions.length == 0
        ? ((await Api.getAllLastBets()).body as Api.T_Bets)
        : ((await Api.getGamesAllLastBets(subscriptions[0]))
            .body as Api.T_Bets);
    setBets(bets?.bets);

    //setGotBets(true);
  };

  useEffect(() => {
    const run = async () => {
      await getBets();
    };
    run();
  }, [availableBlocksExplorers]);

  const onMessage = (ev: MessageEvent<any>) => {
    console.log("Received message3333 from server:", ev.data);
    const data = JSON.parse(ev.data);
    if (data.type === "Bet") {
      setResult(data);
    }
    if (data.type == "Ping") {
      return;
    }
    setNewBet(data);
    if (data.game_name != "PokerStart") {
      newBet(data);
    }
    //setGotBets(true);
  };

  // useEffect(() => {
  //   if (socket != null) {
  //     return;
  //   }
  //   const WS_URL = "ws://127.0.0.1:8585/api/updates";
  //   var newSocket = new WebSocket(WS_URL);

  //   newSocket.onopen = (_) => {
  //     if (isLiveBets) {
  //       newSocket.send(
  //         JSON.stringify({
  //           type: subscription_type,
  //           payload: subscriptions,
  //         })
  //       );
  //     } else {
  //       data?.map((item: any) => {
  //         newSocket.send(JSON.stringify(item));
  //       });
  //       addition &&
  //         addition?.map((item: any) => {
  //           newSocket.send(JSON.stringify(item));
  //         });
  //     }
  //   };

  //   newSocket.onmessage = onMessage;
  //   setSocket(newSocket);
  // }, [addition, addition?.length]);

  return <></>;
};

// var newSocket = new WebSocket(
//   `${window.location.protocol === "https:" ? "wss" : "ws"}://${
//     window.location.host
//   }/api/updates`
// );
