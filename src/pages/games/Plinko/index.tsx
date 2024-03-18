import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import { Poker } from "@/widgets/Poker/Poker";
import styles from "./styles.module.scss";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { WagerModel } from "@/widgets/Wager";
import { useUnit } from "effector-react";
import { Plinko } from "@/widgets/Plinko/Plinko";
// import { useAccount, useConnect } from "wagmi";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import s from "@/pages/games/CoinFlip/styles.module.scss";

import * as ConnectModel from "@/widgets/Layout/model";
import { PlinkoLevelsBlock } from "@/widgets/PlinkoLevelsBlock/PlinkoLevelsBlock";
import Head from "next/head";
import clsx from "clsx";
import * as PGM from "@/widgets/Plinko/model";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import { useEffect, useState } from "react";
import { ManualAutoWager } from "@/widgets/ManualAutoWager/ManualAutoWager";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { useRouter } from "next/router";
import * as GameModel from "@/widgets/GamePage/model";
import { Preload } from "@/shared/ui/Preload";
import { RefundButton } from "@/shared/ui/Refund";
import { useSocket } from "@/shared/context";

const WagerContent = () => {
  const [startConnect, setStartConnect, setIsEmtyWager, setRefund] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
    GameModel.setIsEmtyWager,
    GameModel.setRefund,
  ]);
  // const { connectors, connect } = useConnect();
  // const { isConnected, isConnecting } = useAccount();
  const [pressButton] = useUnit([WagerModel.pressButton]);
  const { push, reload } = useRouter();

  const [isPlaying] = useUnit([GameModel.$isPlaying]);
  // useEffect(() => {
  //   isConnecting && setStartConnect(false);
  // }, []);
  const [cryptoValue, setError, setIsPlaying] = useUnit([
    WagerAmountModel.$cryptoValue,
    WagerAmountModel.setError,
    GameModel.setIsPlaying,
  ]);
  return (
    <>
      {/* <SidePicker /> */}
      <WagerInputsBlock />
      <CustomWagerRangeInput
        inputTitle="Number of balls"
        min={1}
        max={60}
        inputType={CustomWagerRangeInputModel.RangeType.Bets}
      />
      <PlinkoLevelsBlock />
      <CustomWagerRangeInput
        inputTitle="Rows"
        min={8}
        max={16}
        inputType={CustomWagerRangeInputModel.RangeType.Rows}
      />
      <ProfitBlock />
      {/* <button
        className={clsx(
          s.connect_wallet_btn,
          styles.mobile,
          isPlaying && "animation-leftRight",
          cryptoValue == 0.0 && isConnected
            ? s.button_inactive
            : s.button_active
        )}
        onClick={() => {
          if (cryptoValue > 0.0 && !isPlaying && isConnected) {
            pressButton();
          } else if (cryptoValue <= 0.0 && isConnected) {
            setIsEmtyWager(true);
          } else {
            router.push(
              isPartner
                ? `/RegistrManual?partner_address=${partner_address}&site_id=${site_id}&sub_id=${sub_id}`
                : "/RegistrManual"
            );
          }
        }}
      > */}
      {/* isConnecting && startConnect ? (
        <LoadingDots className={s.dots_black} title="Connecting" />
      ) :  */}
      {/* {isPlaying ? (
          <LoadingDots className={s.dots_black} title="Playing" />
        ) : isConnected ? (
          "Play"
        ) : (
          "Connect Wallet"
        )} */}
      {/* </button>{" "} */}
      {/* {isPlaying && (
        <RefundButton
          onClick={() => setRefund(true)}
          className={styles.mobile}
        />
      )} */}{" "}
      <button
        onClick={() => {
          if (!cryptoValue) {
            setError(true);
          } else {
            setIsPlaying(true);
          }
        }}
        className={clsx(s.connect_wallet_btn, s.mobile, s.button_active)}
      >
        Play
      </button>
    </>
  );
};

export default function PlinkoGame() {
  const [gamesList] = useUnit([GameModel.$gamesList]);
  const socket = useSocket();

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
          payload: [gamesList.find((item) => item.name === "Plinko")?.id],
        })
      );
    }
  }, [socket, socket?.readyState, gamesList.length]);
  return (
    <>
      <Head>
        <title>Games - Plinko</title>
      </Head>
      <Layout activePageLink="/games/Plinko" gameName="Plinko">
        <LiveBetsWS
          subscription_type={"Subscribe"}
          subscriptions={["Plinko"]}
        />
        <div className={styles.plinko_container}>
          <GamePage
            isPoker={false}
            gameInfoText="Plinko is this exciting game, players launch a ball from the top of a complex triangular pyramid arranged in multiple rows. As if in a dance, the ball bounces off the pins located on each level of the pyramid, creating an unpredictable and exciting path to the finish line. At the bottom of the pyramid, slots with a variety of payouts await players, from modest ones in the center to amazing ones - up to 1000x - on the periphery. The game features the ability to customize the number of rows from 8 to 16, as well as the choice of risk level, whether low, medium or high. Each player choice affects the payout potential, making each roll of the ball a unique test of luck and strategy."
            gameTitle="plinko"
            wagerContent={<WagerContent />}
          >
            <Plinko gameText="Plinko is this exciting game, players launch a ball from the top of a complex triangular pyramid arranged in multiple rows. As if in a dance, the ball bounces off the pins located on each level of the pyramid, creating an unpredictable and exciting path to the finish line. At the bottom of the pyramid, slots with a variety of payouts await players, from modest ones in the center to amazing ones - up to 1000x - on the periphery. The game features the ability to customize the number of rows from 8 to 16, as well as the choice of risk level, whether low, medium or high. Each player choice affects the payout potential, making each roll of the ball a unique test of luck and strategy." />
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
