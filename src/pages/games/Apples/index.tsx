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
import { useSocket } from "@/shared/context";
import { StopWinning } from "@/shared/ui/StopWinning";

import * as LayoutModel from "@/widgets/Layout/model";

const WagerContent = () => {
  const [isPlaying] = useUnit([GameModel.$isPlaying]);

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
    setError,
    setStop,
    stop,
    apples,
  ] = useUnit([
    ConnectModel.setConnect,
    GameModel.setIsEmtyWager,
    AppleModel.$gameResult,
    AppleModel.setReset,
    AppleModel.$reset,
    GameModel.setRefund,
    AppleModel.$emptyField,
    GameModel.setIsPlaying,
    WagerAmountModel.setError,
    AppleModel.setStop,
    AppleModel.$stop,
    AppleModel.$apples,
  ]);
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
      <ProfitBlock />
      <button
        className={clsx(
          s.connect_wallet_btn,
          s.mobile,
          s.button_active,
          apples.length === 0 && isPlaying && s.btn_step,
          apples.length !== 0 && isPlaying && s.btn_refund
        )}
        disabled={isPlaying && apples.length === 0}
        onClick={() => {
          if (isPlaying) {
            apples.length > 0 && setStop(true);
          } else {
            if (!cryptoValue) {
              setError(true);
            } else {
              setIsPlaying(true);
            }
          }
        }}
      >
        {isPlaying ? "Refund" : "Play"}
      </button>
    </>
  );
};

interface ApplesProps {}

const Apples: FC<ApplesProps> = () => {
  const [gamesList, socketReset, socketAuth] = useUnit([
    GameModel.$gamesList,
    LayoutModel.$socketReset,
    LayoutModel.$socketAuth,
  ]);
  const socket = useSocket();

  useEffect(() => {
    if (
      socket &&
      socket.readyState === WebSocket.OPEN &&
      gamesList.length > 0
    ) {
      socket?.send(JSON.stringify({ type: "UnsubscribeBets" }));
      socket?.send(
        JSON.stringify({
          type: "SubscribeBets",
          payload: [gamesList.find((item) => item.name === "Apples")?.id],
        })
      );
    }
  }, [socket, socket?.readyState, gamesList.length, socketReset]);

  return (
    <>
      <Head>
        <title>Games - Apples</title>
      </Head>
      <Layout activePageLink="/games/Apples" gameName="Apples">
        <LiveBetsWS
          subscription_type={"Subscribe"}
          subscriptions={["Apples"]}
        />
        <div className={s.apples_container}>
          <GamePage
            isPoker={false}
            gameInfoText=""
            gameTitle="apples"
            wagerContent={<WagerContent />}
            customHeight={true}
          >
            <ApplesGame />
          </GamePage>
        </div>
      </Layout>
    </>
  );
};

export default Apples;
{
  /* <StopWinning /> */
}
{
  /* <button
        className={clsx(
          s.connect_wallet_btn,
          s.mobile,
          cryptoValue == 0.0 && isConnected
            ? s.button_inactive
            : s.button_active
        )}
        onClick={() => {
          if (emptyField) {
            setTitle(true);
          } else {
            if (gameResult?.length > 0) {
              setReset(!reset);
            } else {
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
            }
          }
        }}
      >
        {isPlaying ? (
          <LoadingDots className={s.dots_black} title="Playing" />
        ) : isConnected ? (
          title ? (
            "Select Fields"
          ) : (
            "Play"
          )
        ) : (
          "Connect Wallet"
        )}
      </button> */
}
{
  /* {isPlaying && (
        <RefundButton onClick={() => setRefund(true)} className={s.mobile} />
      )} */
}

// const [appleItems,setAppleItems] = useState<number[]>([])
// const { isConnected, isConnecting } = useAccount();

// const [pressButton] = useUnit([WagerModel.pressButton]);

// const router = useRouter();

// useEffect(() => {
//   isConnecting && setStartConnect(false);
// }, []);
// const queryParams = new URLSearchParams(window.location.search);
// const partner_address = queryParams.get("partner_address");
// const site_id = queryParams.get("site_id");
// const sub_id = queryParams.get("sub_id");
