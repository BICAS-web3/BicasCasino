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
import { useAccount } from "wagmi";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { SidePicker } from "@/widgets/CoinFlipSidePicker";
import s from "@/pages/games/CoinFlip/styles.module.scss";
import { PlinkoLevelsBlock } from "@/widgets/PlinkoLevelsBlock/PlinkoLevelsBlock";

const WagerContent = () => {
  const { isConnected } = useAccount();
  const [pressButton] = useUnit([WagerModel.pressButton]);
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
      {/*<WagerGainLoss />*/}
      {/*<ProfitBlock />*/}
      <button
        className={s.connect_wallet_btn}
        onClick={() => {
          pressButton();
          (window as any).fbq("track", "Purchase", {
            value: 0.0,
            currency: "USD",
          });
        }}
      >
        {isConnected ? "Place bet" : "Connect Wallet"}
      </button>
      <WagerLowerBtnsBlock game="plinko" />
    </>
  );
};

export default function PlinkoGame() {
  return (
    <Layout gameName="Plinko">
      <LiveBetsWS
        subscription_type={"Subscribe"}
        subscriptions={["Plinko", "PlinkoStart"]}
      />
      <div className={styles.plinko_container}>
        <GamePage
          gameInfoText="test"
          gameTitle="plinko"
          wagerContent={<WagerContent />}
        >
          <Plinko />
        </GamePage>
      </div>
    </Layout>
  );
}
