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
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";
import s from "@/pages/games/CoinFlip/styles.module.scss";

import * as ConnectModel from "@/widgets/Layout/model";
import * as MinesModel from "@/widgets/Mines/model";

import { LoadingDots } from "@/shared/ui/LoadingDots";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { StopWinning } from "@/shared/ui/StopWinning";
import { ManualSetting } from "@/widgets/ManualSetting/ui/ManualSetting";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const WagerContent = () => {
  const [
    startConnect,
    setStartConnect,
    manualSetting,
    setManualSetting,
    selectedLength,
  ] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
    MinesModel.$manualSetting,
    MinesModel.setManualSetting,
    MinesModel.$selectedLength,
  ]);

  const { isConnected, isConnecting } = useAccount();
  const { connectors, connect } = useConnect();
  const [isPlaying] = useUnit([MinesModel.$isPlaying]);
  const [pressButton] = useUnit([WagerModel.pressButton]);
  const [emptyClick, setEmptyClick] = useState(false);
  const { push, reload } = useRouter();

  useEffect(() => {
    if (emptyClick) {
      setTimeout(() => {
        setEmptyClick(false);
      }, 2000);
    }
  }, [emptyClick]);

  const [cryptoValue] = useUnit([WagerAmountModel.$cryptoValue]);

  return (
    <>
      {/* <ManualSetting
        className={styles.manual_block}
        setValue={setManualSetting}
        value={manualSetting}
      /> */}
      <WagerInputsBlock />
      <CustomWagerRangeInput
        inputTitle="Number of mines"
        min={1}
        max={24}
        inputType={CustomWagerRangeInputModel.RangeType.Rows}
      />
      {manualSetting === "AUTO" && (
        <>
          <ProfitBlock />
          <StopWinning />
        </>
      )}
      <ProfitBlock />
      <StopWinning />
      {!isConnected ? (
        <a
          href="/RegistrManual"
          className={clsx(
            s.connect_wallet_btn,
            styles.mobile,
            isPlaying && "animation-leftRight"
          )}
        >
          Connect Wallet
        </a>
      ) : (
        <button
          className={clsx(
            s.connect_wallet_btn,
            styles.mobile,
            isPlaying && "animation-leftRight",
            cryptoValue == 0.0 ? s.button_inactive : s.button_active
          )}
          onClick={() => {
            pressButton();
          }}
        >
          {emptyClick ? (
            "Select Fields"
          ) : isPlaying ? (
            <LoadingDots className={styles.dots_black} title="Playing" />
          ) : isConnected ? (
            "Play"
          ) : (
            "Connect Wallet"
          )}
        </button>
      )}
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
          custom_height={styles.mine_height}
          gameInfoText="Mines - In this exciting game, players have the ability to customize the game duration from 1 to 24 min. The main task is to open mines while avoiding their activation. The more mines are opened and the more cleverly the player dodges them, the bigger the payout multiplier becomes. The uniqueness of the game lies in the possibility of players to cash out their winnings at any time, making each game session filled with decisions and strategic maneuvers, where each move can bring both success and unexpected turn."
          gameTitle="Mines"
          wagerContent={<WagerContent />}
          isPoker={false}
          isMines={true}
          soundClassName={styles.mines_sound}
        >
          <Mines gameInfoText="Mines - In this exciting game, players have the ability to customize the game duration from 1 to 24 min. The main task is to open mines while avoiding their activation. The more mines are opened and the more cleverly the player dodges them, the bigger the payout multiplier becomes. The uniqueness of the game lies in the possibility of players to cash out their winnings at any time, making each game session filled with decisions and strategic maneuvers, where each move can bring both success and unexpected turn." />
        </GamePage>
      </div>
    </Layout>
  );
}
