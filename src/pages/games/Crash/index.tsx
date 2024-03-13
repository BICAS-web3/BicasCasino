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
// import { useAccount } from "wagmi";
import { WagerModel } from "@/widgets/Wager";
import { useRouter } from "next/router";
import {
  WagerModel as WagerAmountModel,
  WagerInputsBlock,
} from "@/widgets/WagerInputsBlock";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import * as AppleModel from "@/widgets/ApplesGame/model";
import { RefundButton } from "@/shared/ui/Refund";
import { CrashGame } from "@/widgets/CrashGame/CrashGame";
import styles from "@/pages/games/CoinFlip/styles.module.scss";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { useSocket } from "@/shared/context";

const WagerContent = () => {
  const [isPlaying] = useUnit([GameModel.$isPlaying]);
  // const { isConnected, isConnecting } = useAccount();

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
    setIsPlaying,
  ] = useUnit([
    ConnectModel.setConnect,
    GameModel.setIsEmtyWager,
    AppleModel.$gameResult,
    AppleModel.setReset,
    AppleModel.$reset,
    GameModel.setRefund,
    AppleModel.$emptyField,
    GameModel.setIsPlaying,
  ]);
  // useEffect(() => {
  //   isConnecting && setStartConnect(false);
  // }, []);
  const [queryParams, setQueryParams] = useState<any>();

  useEffect(() => {
    const params = new URLSearchParams((window as any)?.location?.search);
    setQueryParams(params);
  }, []);
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
      {/* <button
        className={clsx(
          styles.connect_wallet_btn,
          s.mobile,
          isPlaying && "animation-leftRight",
          cryptoValue == 0.0 && true // isConnected
            ? styles.button_inactive
            : styles.button_active
        )}
        onClick={() => {
          if (gameResult.length === 0) {
            if (cryptoValue > 0.0 && !isPlaying && true) {
              // isConnected
              pressButton();
            } else if (cryptoValue <= 0.0 && true) {
              // isConnected
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
        ) : true ? ( // isConnected
          "Play"
        ) : (
          "Connect Wallet"
        )}
      </button> */}
      {/* {isPlaying && (
        <RefundButton onClick={() => setRefund(true)} className={s.mobile} />
      )} */}{" "}
      <button
        className={clsx(
          styles.connect_wallet_btn,
          s.mobile,
          styles.button_active
        )}
        onClick={() => {
          if (emptyField) {
            setTitle(true);
          } else {
            // if (gameResult?.length > 0) {
            //   setReset(!reset);
            // } else {
            // }
            setIsPlaying(true);
          }
        }}
      >
        Play
      </button>
    </>
  );
};

interface ApplesProps {}

const Apples: FC<ApplesProps> = () => {
  const socket = useSocket();

  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket?.send(JSON.stringify({ type: "Subscribe", payload: ["Crash"] }));
    }
  }, [socket, socket?.readyState]);

  return (
    <>
      <Head>
        <title>Games - Crash</title>
      </Head>
      <Layout activePageLink="/games/Crash" gameName="Crash">
        <LiveBetsWS subscription_type={"Subscribe"} subscriptions={["Crash"]} />
        <div className={s.crash_container}>
          <GamePage
            isPoker={false}
            gameInfoText=""
            gameTitle="Crash"
            wagerContent={<WagerContent />}
            // customHeight={true}
            customCname={s.crash_game_page}
          >
            <CrashGame />
          </GamePage>
        </div>
      </Layout>
    </>
  );
};

export default Apples;
