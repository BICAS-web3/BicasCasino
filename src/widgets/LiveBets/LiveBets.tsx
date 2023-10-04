import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import BSCNetworkIcon from "@/public/media/networks/bsc.svg";
import { useUnit } from "effector-react";
import * as Model from "./model";
import * as Api from "@/shared/api";
import { settingsModel } from "@/entities/settings";
import { sessionModel } from "@/entities/session";
import GKemblem1 from "@/public/media/brand_images/GKemblem1.png";
import gameIco from "../../public/media/live_bets/mainPageActsGameIco.svg";
import wagerIco from "../../public/media/live_bets/wagerIco.svg";
import linkIco from "../../public/media/live_bets/linkIco.svg";

const LinkIcon: FC<{}> = (p) => {
  return (
    <svg height="14px" width="14px" viewBox="0 0 18 18">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 2V16H16V9H18V16C18 17.1 17.1 18 16 18H2C0.89 18 0 17.1 0 16V2C0 0.9 0.89 0 2 0H9V2H2Z"
      ></path>
      <path d="M11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0H11Z"></path>
    </svg>
  );
};

interface timeProps {
  time: string;
  date: string;
}


export interface LiveBetsWSProps {
  subscription_type: string,
  subscriptions: string[]
}
export const LiveBetsWS: FC<LiveBetsWSProps> = props => {
  const [Bets,
    newBet,
    setBets,
    availableBlocksExplorers,
    setNewBet
  ] = useUnit([
    Model.$Bets,
    Model.newBet,
    Model.setBets,
    settingsModel.$AvailableBlocksExplorers,
    sessionModel.setNewBet
  ]);

  const [socket, setSocket] = useState<any | null>(null);

  const getBets = async () => {
    var bets = props.subscriptions.length == 0 ? (await Api.getAllLastBets()).body as Api.T_Bets : (await Api.getGamesAllLastBets(props.subscriptions[0])).body as Api.T_Bets;
    setBets(bets.bets);
    console.log(bets);
    console.log(Bets);
    //setGotBets(true);
  }

  useEffect(() => {
    const run = async () => {
      console.log("Getting bets");
      await getBets();
    }
    run();
  }, [availableBlocksExplorers]);

  const onMessage = (ev: MessageEvent<any>) => {
    const data = JSON.parse(ev.data);
    console.log("Received message:", data);
    if (data.type == "Ping") {
      return;
    }
    setNewBet(data);
    if (data.game_name != 'PokerStart') {
      newBet(data);
    }
    //setGotBets(true);
  };

  useEffect(() => {

    console.log("mapping bets");

    if (socket != null) {
      return;
    }
    console.log("Connecting to WebSocket server...");
    var newSocket = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/test/api/updates`);

    newSocket.onopen = (_) => { newSocket.send(JSON.stringify({ type: props.subscription_type, payload: props.subscriptions })); };

    newSocket.onmessage = onMessage;
    setSocket(newSocket);
  }, []);

  return (<></>);
}