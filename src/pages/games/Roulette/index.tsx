import Image from "next/image";
import { GameLayout } from "../../../widgets/GameLayout/layout";
import { GameInfo } from "@/widgets/GameInfo";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/Layout";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { useRouter } from "next/router";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { Roulette } from "@/widgets/Roulette/Roulette";

import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WagerModel } from "@/widgets/Wager";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { RpsPicker } from "@/widgets/RpsPicker/RpsPicker";
// import { useAccount, useConnect } from "wagmi";
import { useUnit } from "effector-react";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import * as RPSGM from "@/widgets/Roulette/model";
import clsx from "clsx";
import * as ConnectModel from "@/widgets/Layout/model";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";
import { useEffect, useState } from "react";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import * as GameModel from "@/widgets/GamePage/model";

import { Suspense, lazy } from "react";
import Head from "next/head";
import { Preload } from "@/shared/ui/Preload";

const WagerContent = () => {
  const [startConnect, setStartConnect] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
    GameModel.$waitingResponse,
    GameModel.$isPlaying,
  ]);
  // const { isConnected, isConnecting } = useAccount();
  const [pressButton, setIsEmtyWager] = useUnit([
    WagerModel.pressButton,
    GameModel.setIsEmtyWager,
  ]);
  const { push, reload } = useRouter();

  const [isPlaying] = useUnit([RPSGM.$isPlaying]);
  const [cryptoValue] = useUnit([WagerAmountModel.$cryptoValue]);

  // useEffect(() => {
  //   isConnecting && setStartConnect(false);
  // }, []);

  const router = useRouter();
  const queryParams = new URLSearchParams(window.location.search);
  const partner_address = queryParams.get("partner_address");
  const site_id = queryParams.get("site_id");
  const sub_id = queryParams.get("sub_id");
  const [isPartner] = useUnit([ConnectModel.$isPartner]);
  return (
    <>
      <WagerInputsBlock wagerVariants={[5, 7.5, 10, 12.5, 15]} />
      {/* <button
        className={clsx(
          s.connect_wallet_btn,
          s.mobile,
          isPlaying && "animation-leftRight",
          cryptoValue == 0.0 && isConnected
            ? s.button_inactive
            : s.button_active
        )}
        onClick={() => {
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
        }}
      >
        {isPlaying ? (
          <LoadingDots className={s.dots_black} title="Playing" />
        ) : isConnected ? (
          "Play"
        ) : (
          "Connect Wallet"
        )}
      </button> */}{" "}
      <button className={clsx(s.connect_wallet_btn, s.mobile, s.button_active)}>
        Play
      </button>
    </>
  );
};

export default function RouletteGame() {
  return (
    <>
      <Head>
        <title>Games - Roulette</title>
      </Head>
      <Layout activePageLink="/games/Roulette" gameName={"Roulette"}>
        <LiveBetsWS
          subscription_type={"Subscribe"}
          subscriptions={["Roulette"]}
        />
        <div className={s.rps_container}>
          <GamePage
            roulette={true}
            isPoker={false}
            gameInfoText=""
            gameTitle="poker"
            wagerContent={<WagerContent />}
          >
            <Suspense fallback={<div>...</div>}>
              <Roulette gameText="" />
            </Suspense>
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
