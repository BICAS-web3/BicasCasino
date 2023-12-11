import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { WagerModel } from "@/widgets/Wager";
import { useUnit } from "effector-react";
import { useAccount, useConnect } from "wagmi";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import s from "@/pages/games/CoinFlip/styles.module.scss";
import styles from "./styles.module.scss";
import * as ConnectModel from "@/widgets/Layout/model";
// import { Dice } from "@/widgets/Dice/Dice";
const DiceComponent = lazy(() => import("@/widgets/Dice/Dice"));

import { PlinkoLevelsBlock } from "@/widgets/PlinkoLevelsBlock/PlinkoLevelsBlock";
import clsx from "clsx";
import Head from "next/head";
// import { PlinkoLevelsBlock } from "@/widgets/PlinkoLevelsBlock/PlinkoLevelsBlock";
import * as DGM from "@/widgets/Dice/model";
import { useMediaQuery } from "@/shared/tools";

import { LoadingDots } from "@/shared/ui/LoadingDots";

import { Suspense, lazy, useEffect, useState } from "react";
import { useRouter } from "next/router";

const WagerContent = () => {
  const [startConnect, setStartConnect] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
  ]);
  const isMobile = useMediaQuery("(max-width: 996px)");
  const { isConnected, isConnecting } = useAccount();
  const { connectors, connect } = useConnect();
  const [pressButton] = useUnit([WagerModel.pressButton]);
  const [isPlaying] = useUnit([DGM.$isPlaying]);
  const { push } = useRouter();

  useEffect(() => {
    isConnecting && setStartConnect(false);
  }, []);
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
      {!isMobile && (
        <button
          className={`${s.connect_wallet_btn} ${isPlaying && "animation-leftRight"
            }`}
          onClick={() => {
            if (!isConnected) {
              push('/RegistrManual');
            } else {
              pressButton();
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
        </button>
      )}
    </>
  );
};

export default function DiceGame() {
  return (
    <>
      <Head>
        <title>Games - Dice</title>
      </Head>
      <Layout activePageLink="/games/Dice" gameName="Dice">
        <LiveBetsWS subscription_type={"Subscribe"} subscriptions={["Dice"]} />
        <div className={styles.dice_container}>
          <GamePage
            isPoker={false}
            gameInfoText="Dice is an exciting and flexible game of luck that combines simple rules with unique betting mechanics. Players can easily customize their chances of winning and potential rewards by moving the slider to the left or right. Moving to the left increases the winnings by decreasing the probability of winning, while moving to the right acts in the opposite way, increasing the chances of winning but decreasing the reward multiplier. Players also have the ability to fine-tune the desired multiplier and winning chance percentage by entering these values into a special field. This concept, simple yet profound, allows each player to develop their own individualized betting strategy. No wonder the game has maintained its popularity over the years."
            gameTitle="Dice"
            wagerContent={<WagerContent />}
            custom_height={styles.height}
            soundClassName={styles.sound_btn}
          >
            <Suspense fallback={<div>....</div>}>
              <DiceComponent gameText="Dice is an exciting and flexible game of luck that combines simple rules with unique betting mechanics. Players can easily customize their chances of winning and potential rewards by moving the slider to the left or right. Moving to the left increases the winnings by decreasing the probability of winning, while moving to the right acts in the opposite way, increasing the chances of winning but decreasing the reward multiplier. Players also have the ability to fine-tune the desired multiplier and winning chance percentage by entering these values into a special field. This concept, simple yet profound, allows each player to develop their own individualized betting strategy. No wonder the game has maintained its popularity over the years." />
            </Suspense>
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
