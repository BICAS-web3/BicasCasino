import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import Head from "next/head";
import { Layout } from "@/widgets/Layout";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { ApplesGame } from "@/widgets/ApplesGame/ApplesGame";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import clsx from "clsx";
import { useUnit } from "effector-react";
import * as ConnectModel from "@/widgets/Layout/model";
import * as GameModel from "@/widgets/GamePage/model";
import { useAccount } from "wagmi";
import { WagerModel } from "@/widgets/Wager";
import { useRouter } from "next/router";
import {
  WagerModel as WagerAmountModel,
  WagerInputsBlock,
} from "@/widgets/WagerInputsBlock";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import * as AppleModel from "@/widgets/ApplesGame/model";
import { RefundButton } from "@/shared/ui/Refund";
import { GraphGame } from "@/widgets/GraphGame/GraphGame";
import styles from "@/pages/games/CoinFlip/styles.module.scss";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";

const WagerContent = () => {
  const [isPlaying] = useUnit([GameModel.$isPlaying]);
  const { isConnected, isConnecting } = useAccount();

  const [pressButton] = useUnit([WagerModel.pressButton]);

  const router = useRouter();

  const [cryptoValue] = useUnit([WagerAmountModel.$cryptoValue]);
  const [
    setStartConnect,
    setIsEmtyWager,
    gameResult,
    setReset,
    reset,
    setRefund,
    emptyField,
  ] = useUnit([
    ConnectModel.setConnect,
    GameModel.setIsEmtyWager,
    AppleModel.$gameResult,
    AppleModel.setReset,
    AppleModel.$reset,
    GameModel.setRefund,
    AppleModel.$emptyField,
  ]);
  useEffect(() => {
    isConnecting && setStartConnect(false);
  }, []);
  const queryParams = new URLSearchParams(window.location.search);
  const partner_address = queryParams.get("partner_address");
  const site_id = queryParams.get("site_id");
  const sub_id = queryParams.get("sub_id");
  const [isPartner] = useUnit([ConnectModel.$isPartner]);
  const [title, setTitle] = useState(false);

  useEffect(() => {
    if (title) {
      setTimeout(() => {
        setTitle(false);
      }, 2000);
    }
  }, [title]);

  return (
    <>
      <WagerInputsBlock />
      <CustomWagerRangeInput
        inputType={CustomWagerRangeInputModel.RangeType.Bets}
        inputTitle="Multiple Bets"
        min={1}
        max={100}
      />
      <WagerGainLoss />
      <ProfitBlock />
      <button
        className={clsx(
          styles.connect_wallet_btn,
          s.mobile,
          isPlaying && "animation-leftRight",
          cryptoValue == 0.0 && isConnected
            ? styles.button_inactive
            : styles.button_active
        )}
        onClick={() => {
          if (gameResult.length === 0) {
            if (cryptoValue > 0.0 && !isPlaying && isConnected) {
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
          } else {
            setReset(true);
          }
        }}
      >
        {gameResult.length > 0 ? (
          "Reset"
        ) : isPlaying ? (
          <LoadingDots className={styles.dots_black} title="Playing" />
        ) : isConnected ? (
          "Play"
        ) : (
          "Connect Wallet"
        )}
      </button>
      {/* {isPlaying && (
        <RefundButton onClick={() => setRefund(true)} className={s.mobile} />
      )} */}
    </>
  );
};

interface ApplesProps {}

const Apples: FC<ApplesProps> = () => {
  return (
    <>
      <Head>
        <title>Games - Graph</title>
      </Head>
      <Layout activePageLink="/games/Graph" gameName="Graph">
        <LiveBetsWS subscription_type={"Subscribe"} subscriptions={["Graph"]} />
        <div className={s.graph_container}>
          <GamePage
            isPoker={false}
            gameInfoText=""
            gameTitle="graph"
            wagerContent={<WagerContent />}
            // customHeight={true}
            customCname={s.graph_game_page}
          >
            <GraphGame />
          </GamePage>
        </div>
      </Layout>
    </>
  );
};

export default Apples;
