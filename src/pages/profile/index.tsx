import { ProfileCard } from "@/widgets/ProfileCard";
import { RecentlyPlayedGames } from "@/widgets/RecentlyPlayedGames";
import coinflipImg from "@/public/media/recently_games/conflip.png";
import dunkinImg from "@/public/media/recently_games/dunkin.png";
import Head from "next/head";
import { Layout } from "@/widgets/Layout";
import React from "react";
import styles from "./index.module.scss";
import { ProfileBettingStatistics } from "@/widgets/ProfileBettingStatistics";
import { SwapTradeTokens } from "@/widgets/SwapTradeTokens/ui/ui";
import { BetsHistoryReDesign } from "@/widgets/BetsHistoryReDesign";

const RecentlyGames = [
  {
    id: 1,
    title: "Coinflip",
    text: "A game where you have to beat your opponent with a chip",
    imgBackground: coinflipImg,
  },
  {
    id: 2,
    title: "Dunkin caps",
    text: "A game where you have to beat your opponent with a chip",
    imgBackground: dunkinImg,
  },
];

export default function Profile() {
  return (
    <>
      <Head>
        <title>NFT Play | Account page</title>
      </Head>

      <Layout>
        <></>
        <section className={styles.container}>
          {/*<div className={styles.grid_container}>*/}
          {/*  <div className={styles.card_container}>*/}
          {/*    <ProfileCard />*/}
          {/*  </div>*/}
          {/*  <div className={styles.profile_container}>*/}
          {/*    <ProfileBettingStatistics />*/}
          {/*  </div>*/}
          {/*  <div className={styles.recently_container}>*/}
          {/*    <RecentlyPlayedGames RecentlyGames={RecentlyGames} />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<SwapTradeTokens />*/}
          {/*<div className={styles.swap}>*/}
          {/*  */}
          {/*</div>*/}
          <BetsHistoryReDesign />
          {/*<div className={styles.bets_history}>*/}
          {/* */}
          {/*</div>*/}
        </section>
      </Layout>
    </>
  );
}
