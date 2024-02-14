import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import Head from "next/head";
import { Layout } from "@/widgets/Layout";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { SlotsGame } from "@/widgets/slotsGame/SlotsGame";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock";
import {
  CustomWagerRangeInput,
  CustomWagerRangeInputModel,
} from "@/widgets/CustomWagerRangeInput";
import { WagerGainLoss } from "@/widgets/WagerGainLoss";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import clsx from "clsx";
import { useUnit } from "effector-react";
// import { useAccount, useConnect } from "wagmi";
import { useRouter } from "next/router";
import * as ConnectModel from "@/widgets/Layout/model";
import * as GameModel from "@/widgets/GamePage/model";
import { WagerModel } from "@/widgets/Wager";
import { WagerModel as WagerAmountModel } from "@/widgets/WagerInputsBlock";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import { Preload } from "@/shared/ui/Preload";
import { RefundButton } from "@/shared/ui/Refund";
const WagerContent = () => {
  const [pressButton] = useUnit([WagerModel.pressButton]);
  // const { isConnected, isConnecting } = useAccount();
  // const { connectors, connect } = useConnect();
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
  // useEffect(() => {
  //   isConnecting && setStartConnect(false);
  // }, []);
  const queryParams = new URLSearchParams(window.location.search);
  const partner_address = queryParams.get("partner_address");
  const site_id = queryParams.get("site_id");
  const sub_id = queryParams.get("sub_id");
  const [isPartner] = useUnit([ConnectModel.$isPartner]);

  return (
    <>
      <WagerInputsBlock />
      <CustomWagerRangeInput
        inputTitle="Multiple Bets"
        min={1}
        max={100}
        inputType={CustomWagerRangeInputModel.RangeType.Bets}
      />
      <WagerGainLoss />
      <ProfitBlock />
      {/* <button
        className={clsx(
          s.connect_wallet_btn,
          s.mobile,
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
      </button>{" "} */}
      {isPlaying && (
        <RefundButton onClick={() => setRefund(true)} className={s.mobile} />
      )}
    </>
  );
};

interface SlotsProps {}

const Slots: FC<SlotsProps> = () => {
  return (
    <>
      <Head>
        <title>Games - Slots</title>
      </Head>
      <Layout activePageLink="/games/Slots" gameName="Slots">
        <LiveBetsWS subscription_type={"Subscribe"} subscriptions={["Slots"]} />
        <div className={s.slots_container}>
          <GamePage
            isPoker={false}
            gameInfoText=""
            gameTitle="slots"
            wagerContent={<WagerContent />}
          >
            <SlotsGame />
          </GamePage>
        </div>
      </Layout>
    </>
  );
};

export default Slots;
