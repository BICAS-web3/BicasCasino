import s from "./styles.module.scss";
import { Layout } from "@/widgets/Layout";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { RockPaperScissors } from "@/widgets/RockPaperScissors/RockPaperScissors";

import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { RpsPicker } from "@/widgets/RpsPicker/RpsPicker";
import { useUnit } from "effector-react";
import clsx from "clsx";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";
import { useEffect } from "react";
import * as GameModel from "@/widgets/GamePage/model";

import { Suspense } from "react";
import Head from "next/head";
import { useSocket } from "@/shared/context";

const WagerContent = () => {
  const [cryptoValue, setError, setIsPlaying] = useUnit([
    WagerAmountModel.$cryptoValue,
    WagerAmountModel.setError,
    GameModel.setIsPlaying,
  ]);

  return (
    <>
      <WagerInputsBlock wagerVariants={[5, 7.5, 10, 12.5, 15]} />
      <CustomWagerRangeInput
        inputType={CustomWagerRangeInputModel.RangeType.Bets}
        inputTitle="Multiple Bets"
        min={1}
        max={10}
      />
      <WagerGainLoss />
      <ProfitBlock />
      <RpsPicker />

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

export default function RockPaperScissorsGame() {
  const socket = useSocket();
  const [gamesList] = useUnit([GameModel.$gamesList]);

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
          payload: [gamesList.find((item) => item.name === "RPS")?.id],
        })
      );
    }
  }, [socket, socket?.readyState, gamesList.length]);

  return (
    <>
      {" "}
      {/* {isLoading && <Preload />} */}
      <Head>
        <title>Games - Rock Paper Scissors</title>
      </Head>
      <Layout
        activePageLink="/games/RockPaperScissors"
        gameName={"RockPaperScissors"}
      >
        <LiveBetsWS
          subscription_type={"Subscribe"}
          subscriptions={["RockPaperScissors"]}
        />
        <div className={s.rps_container}>
          <GamePage
            isPoker={false}
            gameInfoText="The Rock, Scissors, Paper game offers you a classic selection with the added intrigue of betting. With odds of a draw, win or lose of approximately 33% for each outcome, the game promises an exciting experience. Your choice between rock, scissors or paper not only determines your tactics, but also sets the dynamics of the game. Place your bet and watch this much-loved symbolic duel unfold, where each choice has an equal chance of success or defeat."
            gameTitle="rock paper scissors"
            wagerContent={<WagerContent />}
          >
            <Suspense fallback={<div>...</div>}>
              <RockPaperScissors gameText="The Rock, Scissors, Paper game offers you a classic selection with the added intrigue of betting. With odds of a draw, win or lose of approximately 33% for each outcome, the game promises an exciting experience. Your choice between rock, scissors or paper not only determines your tactics, but also sets the dynamics of the game. Place your bet and watch this much-loved symbolic duel unfold, where each choice has an equal chance of success or defeat." />
            </Suspense>
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
{
  /* <button
        className={clsx(
          s.connect_wallet_btn,
          s.mobile,
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
      >
        {isPlaying ? (
          <LoadingDots className={s.dots_black} title="Playing" />
        ) : isConnected ? (
          "Play"
        ) : (
          "Connect Wallet"
        )}
      </button>{" "} */
}
{
  /* {isPlaying && (
        <RefundButton onClick={() => setRefund(true)} className={s.mobile} />
      )} */
}
