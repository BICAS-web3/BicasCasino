import Head from "next/head";
import { ProfileCard } from "@/widgets/ProfileCard";
import {
  IRecentlyGames,
  RecentlyPlayedGames,
} from "@/widgets/RecentlyPlayedGames";
import { Layout } from "@/widgets/Layout";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { ProfileBettingStatistics } from "@/widgets/ProfileBettingStatistics";
import { SwapTradeTokens } from "@/widgets/SwapTradeTokens/ui/ui";
import { BetsHistoryReDesign } from "@/widgets/BetsHistoryReDesign";
import { useRouter } from "next/router";
import * as api from "@/shared/api";
import { Games } from "@/shared/Games";

export default function Profile() {
  const router = useRouter();

  const [latestGames, setLatestGames] = useState<IRecentlyGames[]>([]);

  useEffect(() => {
    if (router.query.address == undefined) {
      return;
    }

    const run = async () => {
      const r = (
        await api.GetLatestGamesFx(
          (router.query.address as string).toLowerCase()
        )
      ).body as api.T_LatestGames;
      const games = r.games;
      if (games != undefined) {
        setLatestGames(
          games.map((game: string, ind) => {
            const game_data = Games[game.toLowerCase() as any];
            return {
              id: ind,
              title: game_data?.title || "",
              text: game_data?.text || "",
              imgBackground: game_data?.imgBackground || "",
            };
          })
        );
      }
    };

    run();
  }, [router.query.address]);

  return (
    <>
      <Head>
        <title>NFT Play | Account page</title>
      </Head>
      {router.query.address ? (
        <Layout gameName={undefined}>
          <></>
          <section className={styles.container}>
            <div className={styles.grid_container}>
              {/* <div className={styles.card_container}></div>{" "} */}
              <div className={styles.card_container_wrap}>
                <ProfileCard
                  address={(router.query.address as string).toLowerCase()}
                />
                <div className={styles.profile_container}>
                  <ProfileBettingStatistics
                    address={(router.query.address as string).toLowerCase()}
                  />
                </div>
              </div>
              <div className={styles.recently_container}>
                <RecentlyPlayedGames RecentlyGames={latestGames} />
              </div>
            </div>
            {/* <SwapTradeTokens /> */}
            <BetsHistoryReDesign
              title={"Bet History"}
              address={(router.query.address as string).toLowerCase()}
            />
            {/* <BetsHistoryReDesign title={"Pending Bets"} /> */}
          </section>
        </Layout>
      ) : (
        <></>
      )}
    </>
  );
}
