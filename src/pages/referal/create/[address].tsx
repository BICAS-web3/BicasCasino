import Head from "next/head";
//import s from "./styles.module.scss";
import Image from "next/image";
import MainPageBackground from "@/public/media/misc/MainPageBackground.png";
import { Layout } from "@/widgets/Layout";
import { LiveBetsWS } from "@/widgets/LiveBets";

import { useAccount, useSignMessage } from "wagmi";
import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import * as api from "@/shared/api/";

interface ReferalProps {
  referal_address: string;
}
const Referal: FC<ReferalProps> = (props) => {
  const { address, isConnected } = useAccount();
  const { signMessage, variables, data: signMessageData } = useSignMessage();

  useEffect(() => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const run = async () => {
      if (isConnected && address) {
        await sleep(2000);
        signMessage({
          message: `${(
            props.referal_address as string
          ).toLowerCase()} ${address?.toLowerCase()}`,
        });
      }
    };
    run();
  }, [isConnected]);

  useEffect(() => {
    (async () => {
      if (variables?.message && signMessageData && isConnected && address) {
        await api.createReferealFx({
          refer_to: (props.referal_address as string).toLowerCase(),
          referal: address.toLowerCase(),
          signature: signMessageData.slice(2),
        });

        location.href = "/";
      }
    })();
  }, [signMessageData, variables?.message]);
  return <></>;
};

export default function Subscribe() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>NFT Play | Home page</title>
      </Head>
      <Layout gameName={undefined}>
        {router.query.address && (
          <Referal referal_address={router.query.address as string} />
        )}
        {/* <div className={s.background_container}>
                    <Image
                        src={MainPageBackground}
                        alt={''}
                        className={s.background}
                    />
                    <div className={s.background_gradient}>

                    </div>

                </div>

                <div className={`${s.main_container}`}>
                </div> */}
      </Layout>

      {/* <Footer />
        <InvitesList />
        <GamesList />
        <ConnectWalletModal /> */}
    </>
  );
}
