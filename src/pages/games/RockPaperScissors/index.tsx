import Image from "next/image";
import { GameLayout } from "../../../widgets/GameLayout/layout";
import { GameInfo } from "@/widgets/GameInfo";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/Layout";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { useRouter } from "next/router";
import { LiveBetsWS } from "@/widgets/LiveBets";
// import { RockPaperScissors } from "@/widgets/RockPaperScissors/RockPaperScissors";

const RockPaperScissorsComponent = lazy(
  () => import("@/widgets/RockPaperScissors/RockPaperScissors")
);

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
import clsx from "clsx";
import { Suspense, lazy } from "react";

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
      <button
        className={clsx(s.connect_wallet_btn, s.mobile)}
        onClick={pressButton}
      >
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
    <Layout
      activePageLink="/games/RockPaperScissors"
      gameName={"RockPaperScissors"}
    >
      <LiveBetsWS
        subscription_type={"Subscribe"}
        subscriptions={["Plinko", "PlinkoStart"]}
      />
      <div className={s.rps_container}>
        <GamePage
          isPoker={false}
          gameInfoText="The Rock, Scissors, Paper game offers you a classic selection with the added intrigue of betting. With odds of a draw, win or lose of approximately 33% for each outcome, the game promises an exciting experience. Your choice between rock, scissors or paper not only determines your tactics, but also sets the dynamics of the game. Place your bet and watch this much-loved symbolic duel unfold, where each choice has an equal chance of success or defeat."
          gameTitle="rock paper scissors"
          wagerContent={<WagerContent />}
        >
          <Suspense fallback={<div>...</div>}>
            <RockPaperScissorsComponent />
          </Suspense>
        </GamePage>
      </div>
    </Layout>
  );
}
