import {ProfileCard} from "@/widgets/ProfileCard";
import {RecentlyPlayedGames} from "@/shared/ui/RecentlyPlayedGames";
import coinflipImg from "@/public/media/recently_games/conflip.png";
import dunkinImg from "@/public/media/recently_games/dunkin.png";
import Head from "next/head";
import {Layout} from "@/widgets/Layout";
import s from "@/pages/styles.module.scss";
import React from "react";
import styles from './index.module.scss'
const RecentlyGames = [
  {
    id: 1,
    title: 'Coinflip',
    text: 'A game where you have to beat\n' +
      'your opponent with a chip',
    imgBackground: coinflipImg
  },
  {
    id: 1,
    title: 'Dunkin caps',
    text: 'A game where you have to beat\n' +
      'your opponent with a chip',
    imgBackground: dunkinImg
  }
]

export default function Profile() {
  return (
    <>
      <Head>
        <title>NFT Play | Account page</title>
      </Head>

      <Layout>
        <div className={styles.containerCard}>
          <ProfileCard/>
          <div style={{margin: '20px'}}></div>
          <RecentlyPlayedGames RecentlyGames={RecentlyGames}/>
        </div>
        <div style={{margin: '20px'}}></div>
        {/*<RecentlyPlayedGames RecentlyGames={RecentlyGames}/>*/}
      </Layout>
    </>
  )
}