import Image from "next/image";
import { GameLayout } from "../../../widgets/GameLayout/layout";
import { GameInfo } from "@/widgets/GameInfo";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/Layout";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { useRouter } from "next/router";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { RockPaperScissors } from "@/widgets/RockPaperScissors/RockPaperScissors";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WagerModel } from "@/widgets/Wager";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { RpsPicker } from "@/widgets/RpsPicker/RpsPicker";
import { useAccount } from "wagmi";
import { useUnit } from "effector-react";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import * as RPSGM from "@/widgets/RockPaperScissors/model";

const WagerContent = () => {
  const { isConnected } = useAccount();
  const [pressButton] = useUnit([WagerModel.pressButton]);

  const [isPlaying] = useUnit([RPSGM.$isPlaying]);

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
      <RpsPicker />
      <button className={s.connect_wallet_btn} onClick={pressButton}>
        {isConnected
          ? "Play"
          : isPlaying && isConnected
          ? "Playing"
          : "Connect Wallet"}
      </button>
      <WagerLowerBtnsBlock game="rps" />
    </>
  );
};

export default function RockPaperScissorsGame() {
  return (
    <Layout gameName={"RockPaperScissors"}>
      <LiveBetsWS
        subscription_type={"Subscribe"}
        subscriptions={["Plinko", "PlinkoStart"]}
      />
      <div className={s.rps_container}>
        <GamePage
          isPoker={false}
          gameInfoText="rps"
          gameTitle="rock paper scissors"
          wagerContent={<WagerContent />}
        >
          <RockPaperScissors />
        </GamePage>
      </div>
    </Layout>
  );
}
