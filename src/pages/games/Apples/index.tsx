import { FC, useEffect } from "react";
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
  ] = useUnit([
    ConnectModel.setConnect,
    GameModel.setIsEmtyWager,
    AppleModel.$gameResult,
    AppleModel.setReset,
    AppleModel.$reset,
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
      <ProfitBlock />
      <button
        className={clsx(
          s.connect_wallet_btn,
          s.mobile,
          cryptoValue == 0.0 && isConnected
            ? s.button_inactive
            : s.button_active
        )}
        onClick={() => {
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
      {isPlaying && (
        <RefundButton onClick={() => setRefund(true)} className={s.mobile} />
      )}
    </>
  );
};

interface ApplesProps {}

const Apples: FC<ApplesProps> = () => {
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
