import Head from 'next/head';
import { ProfileCard } from "@/widgets/ProfileCard";
import { IRecentlyGames, RecentlyPlayedGames } from "@/widgets/RecentlyPlayedGames";
import coinflipImg from "@/public/media/recently_games/conflip.png";
import dunkinImg from "@/public/media/recently_games/dunkin.png";
import { Layout } from "@/widgets/Layout";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { ProfileBettingStatistics } from "@/widgets/ProfileBettingStatistics";
import { SwapTradeTokens } from "@/widgets/SwapTradeTokens/ui/ui";
import { BetsHistoryReDesign } from "@/widgets/BetsHistoryReDesign";
import { useRouter } from 'next/router';
import * as api from '@/shared/api';
import { Games } from '@/shared/Games';

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
    const router = useRouter();
    console.log("provided address", router.query);

    const [latestGames, setLatestGames] = useState<IRecentlyGames[]>([]);

    useEffect(() => {
        if (router.query.address == undefined) {
            return;
        }

        const run = async () => {
            const r = (await api.GetLatestGamesFx((router.query.address as string).toLowerCase())).body as api.T_LatestGames;
            const games = r.games;
            console.log('Latest games', r);
            setLatestGames(games.map((game: string, ind) => {
                const game_data = Games[game.toLowerCase() as any];

                return ({
                    id: ind,
                    title: game_data.title,
                    text: game_data.text,
                    imgBackground: game_data.imgBackground
                });
            }));
        };

        run()

    }, [router.query.address]);

    return (
        <>
            <Head>
                <title>NFT Play | Account page</title>
            </Head>
            {router.query.address ?
                <Layout>
                    <></>
                    <section className={styles.container}>
                        <div className={styles.grid_container}>
                            <div className={styles.card_container}>
                                <ProfileCard address={(router.query.address as string).toLowerCase()} />
                            </div>
                            <div className={styles.profile_container}>
                                <ProfileBettingStatistics />
                            </div>
                            <div className={styles.recently_container}>
                                {latestGames ? <RecentlyPlayedGames RecentlyGames={latestGames} /> : <></>}
                            </div>
                        </div>
                        <SwapTradeTokens />
                        <BetsHistoryReDesign title={"Bet History"} address={(router.query.address as string).toLowerCase()} />
                        {/* <BetsHistoryReDesign title={"Pending Bets"} /> */}
                    </section>
                </Layout> : <></>}
        </>
    );
}