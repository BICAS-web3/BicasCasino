import { CoinFlip } from "@/widgets/CoinFlip/CoinFlip";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import s from "./styles.module.scss";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock/WagerInputsBlock";
import { SidePicker } from "@/widgets/CoinFlipSidePicker";
import { WagerModel } from "@/widgets/Wager";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";
import { useAccount, useConnect } from "wagmi";
import { useUnit } from "effector-react";
import { LiveBetsWS } from "@/widgets/LiveBets";
import Head from "next/head";
import clsx from "clsx";
import * as CFM from "@/widgets/CoinFlip/model";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import * as ConnectModel from "@/widgets/Layout/model";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as GameModel from "@/widgets/GamePage/model";
import { Preload } from "@/shared/ui/Preload";
import { RefundButton } from "@/shared/ui/Refund";

const WagerContent = () => {
  const [pressButton] = useUnit([WagerModel.pressButton]);
  const { isConnected, isConnecting } = useAccount();
  const { connectors, connect } = useConnect();
  const { push, reload } = useRouter();
  const router = useRouter();

  const [isPlaying] = useUnit([GameModel.$isPlaying]);
  const [cryptoValue] = useUnit([WagerAmountModel.$cryptoValue]);
  const [startConnect, setStartConnect, setIsEmtyWager, setRefund] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
    GameModel.setIsEmtyWager,
    GameModel.setRefund,
  ]);
  useEffect(() => {
    isConnecting && setStartConnect(false);
  }, []);
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
      <SidePicker />
      <button
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
      </button>
      {!isPlaying && (
        <RefundButton onClick={() => setRefund(true)} className={s.mobile} />
      )}
    </>
  );
};

export default function CoinFlipGame() {
  return (
    <>
      <Head>
        <title>Games - Coinflip</title>
      </Head>
      <Layout activePageLink="/games/CoinFlip" gameName={"CoinFlip"}>
        <LiveBetsWS
          subscription_type={"Subscribe"}
          subscriptions={["CoinFlip"]}
        />
        <div className={s.coinflip_container}>
          <GamePage
            isPoker={false}
            gameInfoText="Coinflip is a classic and simple game where every coin toss keeps you in suspense with an equal chance of success. With a 50% chance of winning, the game promises a multiplier of 1.98x, adding an extra element of excitement. All you have to do is enter your bet amount and press the button to make the coin flip. It's the perfect way to test your luck without complicating the process!"
            gameTitle="coinflip"
            wagerContent={<WagerContent />}
          >
            <CoinFlip gameText="Coinflip is a classic and simple game where every coin toss keeps you in suspense with an equal chance of success. With a 50% chance of winning, the game promises a multiplier of 1.98x, adding an extra element of excitement. All you have to do is enter your bet amount and press the button to make the coin flip. It's the perfect way to test your luck without complicating the process!" />
          </GamePage>
        </div>
      </Layout>
    </>
  );
}
