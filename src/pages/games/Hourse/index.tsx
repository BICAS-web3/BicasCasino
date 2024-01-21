import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import styles from "./style.module.scss";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { WagerModel } from "@/widgets/Wager";
import { useUnit } from "effector-react";
import { useAccount, useConnect } from "wagmi";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import s from "@/pages/games/CoinFlip/styles.module.scss";

import * as ConnectModel from "@/widgets/Layout/model";
import Head from "next/head";
import clsx from "clsx";
import * as PGM from "@/widgets/Plinko/model";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { useRouter } from "next/router";
import * as GameModel from "@/widgets/GamePage/model";
import { Rocket } from "@/widgets/Rocket/Rocket";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { Preload } from "@/shared/ui/Preload";
import { useState, useEffect } from "react";
import { RefundButton } from "@/shared/ui/Refund";
import { Hourse } from "@/widgets/Hourse/Hourse";
import { HourseSelecteor } from "@/shared/ui/HourseSelecteor";

const WagerContent = () => {
  const [startConnect, setStartConnect, setIsEmtyWager, setRefund] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
    GameModel.setIsEmtyWager,
    GameModel.setRefund,
  ]);
  const { isConnected, isConnecting } = useAccount();
  const [pressButton] = useUnit([WagerModel.pressButton]);

  const [isPlaying] = useUnit([GameModel.$isPlaying]);
  const [cryptoValue] = useUnit([WagerAmountModel.$cryptoValue]);
  const router = useRouter();
  const queryParams = new URLSearchParams(window.location.search);
  const partner_address = queryParams.get("partner_address");
  const site_id = queryParams.get("site_id");
  const sub_id = queryParams.get("sub_id");
  const [isPartner] = useUnit([ConnectModel.$isPartner]);
  return (
    <>
      <WagerInputsBlock />
      <ProfitBlock />
      <HourseSelecteor />
      <button
        className={clsx(
          s.connect_wallet_btn,
          styles.mobile,
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
      </button>{" "}
      {/* {isPlaying && (
        <RefundButton
          onClick={() => setRefund(true)}
          className={styles.mobile}
        />
      )} */}
    </>
  );
};

export default function HourseGame() {
  return (
    <>
      <Head>
        <title>Games - Hourse</title>
      </Head>
      <Layout activePageLink="/games/Hourse" gameName="Hourse">
        <LiveBetsWS
          subscription_type={"Subscribe"}
          subscriptions={["Hourse"]}
        />
        <div className={styles.hourse_container}>
          <GamePage
            isPoker={false}
            gameInfoText=""
            gameTitle="hourse"
            wagerContent={<WagerContent />}
            custom_height={styles.height}
            soundClassName={styles.sound_btn}
          >
            <Hourse gameText="" />
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
