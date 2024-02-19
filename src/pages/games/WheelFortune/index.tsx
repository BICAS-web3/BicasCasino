import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import styles from "./style.module.scss";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { WagerModel } from "@/widgets/Wager";
import { useUnit } from "effector-react";
// import { useAccount } from "wagmi";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";

import s from "@/pages/games/CoinFlip/styles.module.scss";

import * as ConnectModel from "@/widgets/Layout/model";
import Head from "next/head";
import clsx from "clsx";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import { useRouter } from "next/router";
import * as GameModel from "@/widgets/GamePage/model";
import { WheelFortune } from "@/widgets/WheelFortune/WheelFortune";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WheelFortuneLevelsBlock } from "@/widgets/WheelFortuneLevelsBlock/WheelFortuneLevelsBlock";
const WagerContent = () => {
  const [setIsEmtyWager] = useUnit([GameModel.setIsEmtyWager]);
  // const { isConnected } = useAccount();
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
      <CustomWagerRangeInput
        inputTitle="Number of angles"
        min={10}
        max={50}
        step={10}
        customArr={[10, 20, 40, 50]}
        inputType={CustomWagerRangeInputModel.RangeType.Rows}
      />
      <CustomWagerRangeInput
        inputType={CustomWagerRangeInputModel.RangeType.Bets}
        inputTitle="Multiple Bets"
        min={1}
        max={100}
      />
      <WheelFortuneLevelsBlock />
      {/* <button
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
      </button> */}
    </>
  );
};

export default function WheelFortuneGame() {
  return (
    <>
      <Head>
        <title>Games - Wheel Fortune</title>
      </Head>
      <Layout activePageLink="/games/WheelFortune" gameName="Wheel Fortune">
        <LiveBetsWS
          subscription_type={"Subscribe"}
          subscriptions={["Wheel Fortune"]}
        />
        <div className={styles.wheel_fortune_container}>
          <GamePage
            isPoker={false}
            gameInfoText=""
            gameTitle="wheelFortune"
            wagerContent={<WagerContent />}
            custom_height={styles.height}
            soundClassName={styles.sound_btn}
          >
            <WheelFortune gameText="" />
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
