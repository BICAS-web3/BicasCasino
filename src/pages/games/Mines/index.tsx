import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { GamePage } from "@/widgets/GamePage/GamePage";
import * as GameModel from "@/widgets/GamePage/model";
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
import Head from "next/head";
import { Preload } from "@/shared/ui/Preload";

const WagerContent = () => {
  const [
    startConnect,
    setStartConnect,
    manualSetting,
    setManualSetting,
    selectedLength,
    waitingResponse,
    setIsEmtyWager,
  ] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
    MinesModel.$manualSetting,
    MinesModel.setManualSetting,
    MinesModel.$selectedLength,
    GameModel.$waitingResponse,
    GameModel.setIsEmtyWager,
  ]);

  const { isConnected, isConnecting } = useAccount();
  const { connectors, connect } = useConnect();
  const [isPlaying] = useUnit([GameModel.$isPlaying]);
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

  const router = useRouter();

  const [cryptoValue] = useUnit([WagerAmountModel.$cryptoValue]);
  const queryParams = new URLSearchParams(window.location.search);
  const partner_address = queryParams.get("partner_address");
  const site_id = queryParams.get("site_id");
  const sub_id = queryParams.get("sub_id");
  const [isPartner] = useUnit([ConnectModel.$isPartner]);
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
      <button
        className={clsx(
          s.connect_wallet_btn,
          styles.mobile,
          isPlaying && "animation-leftRight",
          !isPlaying && cryptoValue == 0.0 && isConnected
            ? s.button_inactive
            : s.button_active
        )}
        onClick={() => {
          if (
            (cryptoValue > 0.0 || (isPlaying && !waitingResponse)) &&
            isConnected
          ) {
            pressButton();
          } else if (cryptoValue <= 0.0 && isConnected) {
            setIsEmtyWager(true);
          } else {
            router.push(
              isPartner
                ? `/RegistrManual?partner_address=${partner_address}&site_id=${site_id}&sub_id=${sub_id}`
                : "/RegistrManual"
            );
          }
        }}
      >
        {emptyClick ? (
          "Select Fields"
        ) : waitingResponse ? (
          <LoadingDots className={styles.dots_black} title="Playing" />
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
    <>
      <Head>
        <title>Games - Mines</title>
      </Head>
      <Layout gameName="Mines" activePageLink="/games/Mines">
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
            // soundClassName={styles.mines_sound}
          >
            <Mines gameInfoText="Mines - In this exciting game, players have the ability to customize the game duration from 1 to 24 min. The main task is to open mines while avoiding their activation. The more mines are opened and the more cleverly the player dodges them, the bigger the payout multiplier becomes. The uniqueness of the game lies in the possibility of players to cash out their winnings at any time, making each game session filled with decisions and strategic maneuvers, where each move can bring both success and unexpected turn." />
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
