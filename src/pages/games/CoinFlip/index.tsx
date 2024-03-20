import { CoinFlip } from "@/widgets/CoinFlip/CoinFlip";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import s from "./styles.module.scss";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { WagerModel } from "@/widgets/Wager";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock/WagerInputsBlock";
import { SidePicker } from "@/widgets/CoinFlipSidePicker";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";
// import { useAccount, useConnect } from "wagmi";
import { useUnit } from "effector-react";
import { LiveBetsWS } from "@/widgets/LiveBets";
import Head from "next/head";
import * as GameModel from "@/widgets/GamePage/model";
import clsx from "clsx";
import { useSocket } from "@/shared/context";
import { useEffect } from "react";
import * as BalanceModel from "@/widgets/BalanceSwitcher/model";

import * as LayoutModel from "@/widgets/Layout/model";

const WagerContent = () => {
  const [isPlaying, setIsPlaying, gamesList, balance] = useUnit([
    GameModel.$isPlaying,
    GameModel.setIsPlaying,
    GameModel.$gamesList,
    BalanceModel.$balance,
  ]);
  const [cryptoValue, setError] = useUnit([
    WagerAmountModel.$cryptoValue,
    WagerAmountModel.setError,
  ]);

  // useEffect(() => alert(`${cryptoValue} `), [cryptoValue, balance]);

  return (
    <>
      <WagerInputsBlock />
      <CustomWagerRangeInput
        inputTitle="Bets"
        min={1}
        max={100}
        inputType={CustomWagerRangeInputModel.RangeType.Bets}
      />
      <WagerGainLoss />
      <ProfitBlock />
      <SidePicker />
      <button
        className={clsx(s.connect_wallet_btn, s.mobile, s.button_active)}
        onClick={() => {
          if (!cryptoValue || cryptoValue > balance) {
            setError(true);
          } else {
            setIsPlaying(true);
          }
        }}
      >
        Play
      </button>
    </>
  );
};

export default function CoinFlipGame() {
  const socket = useSocket();
  const [gamesList, socketAuth, socketReset] = useUnit([
    GameModel.$gamesList,
    LayoutModel.$socketAuth,
    LayoutModel.$socketReset,
  ]);
  useEffect(() => {
    if (
      socket &&
      socket.readyState === WebSocket.OPEN &&
      gamesList.length > 0
    ) {
      socket?.send(JSON.stringify({ type: "UnsubscribeAllBets" }));
      socket?.send(
        JSON.stringify({
          type: "SubscribeBets",
          payload: [gamesList.find((item) => item.name === "CoinFlip")?.id],
        })
      );
    }
  }, [socket, socket?.readyState, gamesList.length, socketReset]);

  return (
    <>
      <Head>
        <title>Games - Coinflip</title>
      </Head>
      <Layout activePageLink="/games/CoinFlip" gameName={"CoinFlip"}>
        <LiveBetsWS
          subscription_type={"Subscribe"}
          subscriptions={["CoinFlip"]}
        />
        <div className={s.coinflip_container}>
          <GamePage
            isPoker={false}
            gameInfoText="Coinflip is a classic and simple game where every coin toss keeps you in suspense with an equal chance of success. With a 50% chance of winning, the game promises a multiplier of 1.98x, adding an extra element of excitement. All you have to do is enter your bet amount and press the button to make the coin flip. It's the perfect way to test your luck without complicating the process!"
            gameTitle="coinflip"
            wagerContent={<WagerContent />}
          >
            <CoinFlip gameText="Coinflip is a classic and simple game where every coin toss keeps you in suspense with an equal chance of success. With a 50% chance of winning, the game promises a multiplier of 1.98x, adding an extra element of excitement. All you have to do is enter your bet amount and press the button to make the coin flip. It's the perfect way to test your luck without complicating the process!" />
          </GamePage>
        </div>
      </Layout>
    </>
  );
}

// import * as CFM from "@/widgets/CoinFlip/model";
// import { LoadingDots } from "@/shared/ui/LoadingDots";
// import * as ConnectModel from "@/widgets/Layout/model";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { Preload } from "@/shared/ui/Preload";
// import { RefundButton } from "@/shared/ui/Refund";
// const [startConnect, setStartConnect, setIsEmtyWager, setRefund] = useUnit([
//   ConnectModel.$startConnect,
//   ConnectModel.setConnect,
//   GameModel.setIsEmtyWager,
//   GameModel.setRefund,
// ]);
// useEffect(() => {
//   isConnecting && setStartConnect(false);
// }, []);
// const queryParams = new URLSearchParams(window.location.search);
// const partner_address = queryParams.get("partner_address");
// const site_id = queryParams.get("site_id");
// const sub_id = queryParams.get("sub_id");
// const [isPartner] = useUnit([ConnectModel.$isPartner]);

// const [pressButton] = useUnit([WagerModel.pressButton]);
// const { isConnected, isConnecting } = useAccount();
// const { connectors, connect } = useConnect();
// const { push, reload } = useRouter();
// const router = useRouter();
