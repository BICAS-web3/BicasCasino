import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { WagerModel } from "@/widgets/Wager";
import { useUnit } from "effector-react";
// import { Plinko } from "@/widgets/Plinko/Plinko";
import { useAccount } from "wagmi";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { SidePicker } from "@/widgets/CoinFlipSidePicker";
import s from "@/pages/games/CoinFlip/styles.module.scss";
import styles from "./styles.module.scss";
import { Dice } from "@/widgets/Dice/Dice";
import { PlinkoLevelsBlock } from "@/widgets/PlinkoLevelsBlock/PlinkoLevelsBlock";
import clsx from "clsx";
import Head from "next/head";
// import { PlinkoLevelsBlock } from "@/widgets/PlinkoLevelsBlock/PlinkoLevelsBlock";

const WagerContent = () => {
  const isMobile = document.documentElement.clientWidth < 700;
  const { isConnected } = useAccount();
  const [pressButton] = useUnit([WagerModel.pressButton]);
  return (
    <>
      {isMobile && (
        <button className={s.connect_wallet_btn} onClick={pressButton}>
          {isConnected ? "Place bet" : "Connect Wallet"}
        </button>
      )}
      {/* <SidePicker /> */}
      <WagerInputsBlock />
      {/* <CustomWagerRangeInput
        inputTitle="Number of balls"
        min={1}
        max={60}
        inputType={CustomWagerRangeInputModel.RangeType.Bets}
      /> */}
      {/* <PlinkoLevelsBlock /> */}
      <CustomWagerRangeInput
        inputTitle="Bets"
        min={1}
        max={100}
        inputType={CustomWagerRangeInputModel.RangeType.Bets}
      />
      <WagerGainLoss />
      <ProfitBlock />
      {!isMobile && (
        <button className={s.connect_wallet_btn} onClick={pressButton}>
          {isConnected ? "Place bet" : "Connect Wallet"}
        </button>
      )}
      {/* <WagerLowerBtnsBlock game="Dice" /> */}
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
            gameInfoText="Dice"
            gameTitle="Dice"
            wagerContent={<WagerContent />}
          >
            <Dice />
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
