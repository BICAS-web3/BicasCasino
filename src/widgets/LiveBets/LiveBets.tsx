import { FC, useEffect } from "react";
import { useUnit } from "effector-react";
import * as Model from "./model";
import * as Api from "@/shared/api";
import { settingsModel } from "@/entities/settings";

export interface LiveBetsWSProps {
  subscription_type?: string;
  subscriptions: string[];
  isLiveBets?: boolean;
  data?: Record<string, any>[];
  addition?: any;
}
export const LiveBetsWS: FC<LiveBetsWSProps> = ({ subscriptions }) => {
  const [setBets, availableBlocksExplorers] = useUnit([
    Model.setBets,
    settingsModel.$AvailableBlocksExplorers,
  ]);

  const getBets = async () => {
    var bets =
      subscriptions.length == 0
        ? ((await Api.getAllLastBets()).body as Api.T_Bets)
        : ((await Api.getGamesAllLastBets(subscriptions[0]))
            .body as Api.T_Bets);
    setBets(bets?.bets);
  };

  useEffect(() => {
    const run = async () => {
      await getBets();
    };
    run();
  }, [availableBlocksExplorers]);

  return <></>;
};

// var newSocket = new WebSocket(
//   `${window.location.protocol === "https:" ? "wss" : "ws"}://${
//     window.location.host
//   }/api/updates`
// );

// const onMessage = (ev: MessageEvent<any>) => {
//   console.log("Received message3333 from server:", ev.data);
//   const data = JSON.parse(ev.data);
//   if (data.type === "Bet") {
//     setResult(data);
//   }
//   if (data.type == "Ping") {
//     return;
//   }
//   setNewBet(data);
//   if (data.game_name != "PokerStart") {
//     newBet(data);
//   }
//   //setGotBets(true);
// };

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
