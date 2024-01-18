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
import {
  useAccount,
  useConnect,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { WagerModel } from "@/widgets/Wager";
import { useRouter } from "next/router";
import {
  WagerModel as WagerAmountModel,
  WagerInputsBlock,
} from "@/widgets/WagerInputsBlock";
import { ProfitBlock } from "@/widgets/ProfitBlock";
import { ABI as IAppleAbi } from "@/shared/contracts/AppleABI";

const WagerContent = () => {
  const [isPlaying] = useUnit([GameModel.$isPlaying]);
  const { isConnected, isConnecting, address } = useAccount();
  const { chain } = useNetwork();
  const { config: refundConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: "0x7ad7948F38Ee1456587976FAebD5f94646c20072",
    abi: IAppleAbi,
    functionName: "Apples_Refund",
    enabled: isPlaying,
    args: [],
  });

  const { write: setRefund, isSuccess: refundIsSet } =
    useContractWrite(refundConfig);
  const [pressButton] = useUnit([WagerModel.pressButton]);

  const { connectors, connect } = useConnect();
  const { push, reload } = useRouter();
  const router = useRouter();

  const [cryptoValue] = useUnit([WagerAmountModel.$cryptoValue]);
  const [startConnect, setStartConnect, setIsEmtyWager] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
    GameModel.setIsEmtyWager,
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
      {isPlaying && (
        <button
          className={clsx(s.btn_refund, s.mobile)}
          onClick={() => setRefund?.()}
        >
          Refund
        </button>
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
            gameTitle="slots"
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
