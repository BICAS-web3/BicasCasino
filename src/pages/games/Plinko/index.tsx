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
import { useAccount, useConnect } from "wagmi";
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
import { useEffect } from "react";
import { ManualAutoWager } from "@/widgets/ManualAutoWager/ManualAutoWager";
import { ProfitBlock } from "@/widgets/ProfitBlock";

const WagerContent = () => {
  const [startConnect, setStartConnect] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
  ]);
  const { connectors, connect } = useConnect();
  const { isConnected, isConnecting } = useAccount();
  const [pressButton] = useUnit([WagerModel.pressButton]);

  const [isPlaying] = useUnit([PGM.$isPlaying]);
  useEffect(() => {
    isConnecting && setStartConnect(false);
  }, []);
  console.log("ssssstate - ", isPlaying);

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
      <button
        className={clsx(
          s.connect_wallet_btn,
          styles.mobile,
          isPlaying && "animation-leftRight"
        )}
        onClick={() => {
          if (!isConnected) {
            setStartConnect(true);
            connect({ connector: connectors[0] });
          } else {
            pressButton();
            (window as any).fbq("track", "Purchase", {
              value: 0.0,
              currency: "USD",
            });
          }
        }}
      >
        {isConnecting && startConnect ? (
          <LoadingDots className={s.dots_black} title="Connecting" />
        ) : isPlaying ? (
          <LoadingDots className={s.dots_black} title="Playing" />
        ) : isConnected ? (
          "Play"
        ) : (
          "Connect Wallet"
        )}
      </button>
    </>
  );
};

export default function PlinkoGame() {
  return (
    <>
      <Head>
        <title>Games - Plinko</title>
      </Head>
      <Layout activePageLink="/games/Plinko" gameName="Plinko">
        <LiveBetsWS
          subscription_type={"Subscribe"}
          subscriptions={["Plinko", "PlinkoStart"]}
        />
        <div className={styles.plinko_container}>
          <GamePage
            isPoker={false}
            gameInfoText="Plinko is this exciting game, players launch a ball from the top of a complex triangular pyramid arranged in multiple rows. As if in a dance, the ball bounces off the pins located on each level of the pyramid, creating an unpredictable and exciting path to the finish line. At the bottom of the pyramid, slots with a variety of payouts await players, from modest ones in the center to amazing ones - up to 1000x - on the periphery. The game features the ability to customize the number of rows from 8 to 16, as well as the choice of risk level, whether low, medium or high. Each player choice affects the payout potential, making each roll of the ball a unique test of luck and strategy."
            gameTitle="plinko"
            wagerContent={<WagerContent />}
          >
            <Plinko />
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
