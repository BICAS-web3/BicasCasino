import { Layout } from "@/widgets/Layout";
import { FC } from "react";
import s from "./style.module.scss";
import { Total } from "@/widgets/Total";
import { CustomBets } from "@/widgets/CustomBets/CustomBets";
import { LeaderBoard } from "@/widgets/LeaderBoard/LeaderBoard";
import { PopularGamesBlock } from "@/widgets/PopularGamesBlock/PopularGamesBlock";
import { GamesPageBlock } from "@/widgets/GamesPageBlock/GamesPageBlock";

interface GamesPageProps {}

const GamesPage: FC<GamesPageProps> = () => {
  return (
    <Layout gameName="notGameName">
      <div className={s.games_page_container}>
        <PopularGamesBlock />
        <GamesPageBlock />
        <Total />
        <CustomBets
          title="Live bets"
          isMainPage={true}
          isGamePage={false}
          game={undefined}
        />
        <LeaderBoard />
      </div>
    </Layout>
  );
};

export default GamesPage;
