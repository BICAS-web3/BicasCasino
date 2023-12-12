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
import { useAccount, useConnect } from "wagmi";
import { useUnit } from "effector-react";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import * as RPSGM from "@/widgets/RockPaperScissors/model";
import clsx from "clsx";
import * as ConnectModel from "@/widgets/Layout/model";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";
import { useEffect } from "react";
import { LoadingDots } from "@/shared/ui/LoadingDots";

import { Suspense, lazy } from "react";

const WagerContent = () => {
  const [startConnect, setStartConnect] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
  ]);
  const { isConnected, isConnecting } = useAccount();
  const [pressButton] = useUnit([WagerModel.pressButton]);
  const { push, reload } = useRouter();

  const [isPlaying] = useUnit([RPSGM.$isPlaying]);
  const [cryptoValue] = useUnit([WagerAmountModel.$cryptoValue]);
  const { connectors, connect } = useConnect();
  useEffect(() => {
    isConnecting && setStartConnect(false);
  }, []);
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
      {!isConnected ? (
        <a
          href="/RegistrManual"
          className={clsx(
            s.connect_wallet_btn,
            s.mobile,
            isPlaying && "animation-leftRight"
          )}
        >
          Connect Wallet
        </a>
      ) : (
        <button
          className={clsx(
            s.connect_wallet_btn,
            s.mobile,
            isPlaying && "animation-leftRight",
            cryptoValue == 0.0 ? s.button_inactive : s.button_active
          )}
          onClick={() => {
            pressButton();
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

export default function RockPaperScissorsGame() {
  return (
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
  );
}
