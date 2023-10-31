import { FC, useEffect } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

import { Layout } from "@/widgets/Layout";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { NFTCard } from "@/widgets/NFTCard";

import s from "./style.module.scss";

const ConnectMarket: FC = () => {
  const { address } = useAccount();

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (chain?.id !== 42161 && address) {
      switchNetwork!(42161);
    }
  }, [address]);

  return (
    <>
      {" "}
      {Array.from({ length: 30 }).map((_, i) => (
        <NFTCard img="" name="NFT name" number={2343} price={34} key={i} />
      ))}
    </>
  );
};

export default function Home() {
  return (
    <Layout gameName={undefined}>
      <LiveBetsWS subscription_type={"SubscribeAll"} subscriptions={[]} />
      <div className={s.main_container}>
        <div className={s.nft_container}>
          <ConnectMarket />
        </div>
      </div>
    </Layout>
  );
}
