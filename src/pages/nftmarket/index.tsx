import { Layout } from "@/widgets/Layout";
import { LiveBetsWS } from "@/widgets/LiveBets";

import s from "./style.module.scss";
import { NFTCard } from "@/widgets/NFTCard";

export default function Home() {
  return (
    <>
      <LiveBetsWS subscription_type={"SubscribeAll"} subscriptions={[]} />
      <Layout gameName={undefined}>
        <div className={s.main_container}>
          <div className={s.nft_container}>
            {Array.from({ length: 30 }).map((_, i) => (
              <NFTCard
                img=""
                name="NFT name"
                number={2343}
                price={34}
                key={i}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
