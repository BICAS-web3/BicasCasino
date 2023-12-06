import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { Mines } from "@/widgets/Mines/Mines";
import { WagerModel } from "@/widgets/Wager";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { useUnit } from "effector-react";
import { useAccount, useConnect } from "wagmi";
import styles from "./styles.module.scss";
import clsx from "clsx";

import s from "@/pages/games/CoinFlip/styles.module.scss";

import * as PGM from "@/widgets/Plinko/model";
import * as ConnectModel from "@/widgets/Layout/model";
import * as MinesModel from "@/widgets/Mines/model";

import { LoadingDots } from "@/shared/ui/LoadingDots";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { StopWinning } from "@/shared/ui/StopWinning";
import { ManualSetting } from "@/widgets/ManualSetting/ui/ManualSetting";

const WagerContent = () => {
  const [startConnect, setStartConnect, manualSetting, setManualSetting] =
    useUnit([
      ConnectModel.$startConnect,
      ConnectModel.setConnect,
      MinesModel.$manualSetting,
      MinesModel.setManualSetting,
    ]);

  const { isConnected, isConnecting } = useAccount();
  const { connectors, connect } = useConnect();
  const [isPlaying] = useUnit([PGM.$isPlaying]);
  const [pressButton] = useUnit([WagerModel.pressButton]);
  return (
    <>
      <ManualSetting
        className={styles.manual_block}
        setValue={setManualSetting}
        value={manualSetting}
      />
      <WagerInputsBlock />
      {manualSetting === "AUTO" && (
        <CustomWagerRangeInput
          inputTitle="Number of games"
          min={50}
          max={100}
          inputType={CustomWagerRangeInputModel.RangeType.Bets}
        />
      )}

      <CustomWagerRangeInput
        inputTitle="Number of mines"
        min={8}
        max={16}
        inputType={CustomWagerRangeInputModel.RangeType.Rows}
      />
      {manualSetting === "AUTO" && (
        <>
          <WagerGainLoss />
          <ProfitBlock />
          <StopWinning />
        </>
      )}
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
      {/* <WagerLowerBtnsBlock game="mines" /> */}
    </>
  );
};

export default function MinesGame() {
  return (
    <Layout gameName="Mines">
      <LiveBetsWS
        subscription_type={"Subscribe"}
        subscriptions={["Mines", "MinesStart"]}
      />
      <div className={styles.mines_container}>
        <GamePage
          gameInfoText="test"
          gameTitle="Mines"
          wagerContent={<WagerContent />}
          isPoker={false}
          isMines={true}
        >
          <Mines />
        </GamePage>
      </div>
    </Layout>
  );
}
