import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import styles from "./styles.module.scss";
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
import { Dice } from "@/widgets/Dice/Dice";
// import { PlinkoLevelsBlock } from "@/widgets/PlinkoLevelsBlock/PlinkoLevelsBlock";

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
      {/* <PlinkoLevelsBlock /> */}
      <CustomWagerRangeInput
        inputTitle="Rows"
        min={8}
        max={16}
        inputType={CustomWagerRangeInputModel.RangeType.Rows}
      />
      {/*<WagerGainLoss />*/}
      {/*<ProfitBlock />*/}
      <button className={s.connect_wallet_btn} onClick={pressButton}>
        {isConnected ? "Place bet" : "Connect Wallet"}
      </button>
      <WagerLowerBtnsBlock showSound={false} game="Dice" />
    </>
  );
};

export default function DiceGame() {
  return (
    <Layout gameName="Dice">
      <LiveBetsWS
        subscription_type={"Subscribe"}
        subscriptions={["Dice", "Dicetart"]}
      />
      <div className={styles.dice_container}>
        <GamePage
          gameInfoText="test"
          gameTitle="Dice"
          wagerContent={<WagerContent />}
        >
          <Dice />
        </GamePage>
      </div>
    </Layout>
  );
}
