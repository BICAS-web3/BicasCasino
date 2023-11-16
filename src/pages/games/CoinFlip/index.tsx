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
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock/WagerInputsBlock";
import { SidePicker } from "@/widgets/CoinFlipSidePicker";
import { WagerModel } from "@/widgets/Wager";
import { useAccount, useConnect } from "wagmi";
import { useUnit } from "effector-react";
import { LiveBetsWS } from "@/widgets/LiveBets";
import Head from "next/head";
import clsx from "clsx";
import * as CFM from "@/widgets/CoinFlip/model";

const WagerContent = () => {
  const [pressButton] = useUnit([WagerModel.pressButton]);
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  const [isPlaying] = useUnit([CFM.$isPlaying]);

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
        className={clsx(s.connect_wallet_btn, s.mobile)}
        onClick={() => {
          if (!isConnected) {
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
        {isConnected
          ? "Play"
          : isPlaying && isConnected
          ? "Playing..."
          : "Connect Wallet"}
      </button>
      <WagerLowerBtnsBlock game="coinflip" />
    </>
  );
};

export default function CoinFlipGame() {
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
            <CoinFlip />
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
