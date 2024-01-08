import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { WagerModel } from "@/widgets/Wager";
import { useUnit } from "effector-react";
import { useAccount, useConnect } from "wagmi";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import s from "@/pages/games/CoinFlip/styles.module.scss";
import styles from "./styles.module.scss";
import * as ConnectModel from "@/widgets/Layout/model";
// import { Dice } from "@/widgets/Dice/Dice";
const DiceComponent = lazy(() => import("@/widgets/Dice/Dice"));
import { PlinkoLevelsBlock } from "@/widgets/PlinkoLevelsBlock/PlinkoLevelsBlock";
import clsx from "clsx";
import Head from "next/head";
// import { PlinkoLevelsBlock } from "@/widgets/PlinkoLevelsBlock/PlinkoLevelsBlock";
import * as DGM from "@/widgets/Dice/model";
import { useMediaQuery } from "@/shared/tools";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import { Suspense, lazy, useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as GameModel from "@/widgets/GamePage/model";
import { Preload } from "@/shared/ui/Preload";

const WagerContent = () => {
  const [startConnect, setStartConnect] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
  ]);
  const isMobile = useMediaQuery("(max-width: 996px)");
  const { isConnected, isConnecting } = useAccount();
  const { connectors, connect } = useConnect();
  const [pressButton] = useUnit([WagerModel.pressButton]);
  const { push, reload } = useRouter();
  const router = useRouter();
  const [isPlaying, setIsEmtyWager] = useUnit([
    GameModel.$isPlaying,
    GameModel.setIsEmtyWager,
  ]);

  useEffect(() => {
    isConnecting && setStartConnect(false);
  }, []);

  const [cryptoValue] = useUnit([WagerAmountModel.$cryptoValue]);
  const queryParams = new URLSearchParams(window.location.search);
  const partner_address = queryParams.get("partner_address");
  const site_id = queryParams.get("site_id");
  const sub_id = queryParams.get("sub_id");
  const [isPartner] = useUnit([ConnectModel.$isPartner]);
  return (
    <>
      <WagerInputsBlock />
      <CustomWagerRangeInput
        inputTitle="Bets"
        min={1}
        max={100}
        inputType={CustomWagerRangeInputModel.RangeType.Bets}
      />
      <WagerGainLoss />
      <ProfitBlock />
      {!isMobile && (
        <button
          className={`${s.connect_wallet_btn} ${
            isPlaying && "animation-leftRight"
          } ${
            cryptoValue == 0.0 && isConnected
              ? s.button_inactive
              : s.button_active
          }`}
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
        </button>
      )}
    </>
  );
};

export default function DiceGame() {
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setPageLoad(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading || pageLoad) {
      document.documentElement.style.height = "100vh";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.height = "auto";
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.documentElement.style.height = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isLoading, pageLoad]);

  return (
    <>
      {" "}
      {isLoading && <Preload />}
      <Head>
        <title>Games - Dice</title>
      </Head>
      <Layout activePageLink="/games/Dice" gameName="Dice">
        <LiveBetsWS subscription_type={"Subscribe"} subscriptions={["Dice"]} />
        <div className={styles.dice_container}>
          <GamePage
            isPoker={false}
            gameInfoText="Dice is an exciting and flexible game of luck that combines simple rules with unique betting mechanics. Players can easily customize their chances of winning and potential rewards by moving the slider to the left or right. Moving to the left increases the winnings by decreasing the probability of winning, while moving to the right acts in the opposite way, increasing the chances of winning but decreasing the reward multiplier. Players also have the ability to fine-tune the desired multiplier and winning chance percentage by entering these values into a special field. This concept, simple yet profound, allows each player to develop their own individualized betting strategy. No wonder the game has maintained its popularity over the years."
            gameTitle="Dice"
            wagerContent={<WagerContent />}
            custom_height={styles.height}
            soundClassName={styles.sound_btn}
          >
            <Suspense fallback={<div>....</div>}>
              <DiceComponent
                setIsLoading={setIsLoading}
                gameText="Dice is an exciting and flexible game of luck that combines simple rules with unique betting mechanics. Players can easily customize their chances of winning and potential rewards by moving the slider to the left or right. Moving to the left increases the winnings by decreasing the probability of winning, while moving to the right acts in the opposite way, increasing the chances of winning but decreasing the reward multiplier. Players also have the ability to fine-tune the desired multiplier and winning chance percentage by entering these values into a special field. This concept, simple yet profound, allows each player to develop their own individualized betting strategy. No wonder the game has maintained its popularity over the years."
              />
            </Suspense>
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
