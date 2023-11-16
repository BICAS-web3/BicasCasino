import { Layout } from "@/widgets/Layout";
import { FC } from "react";
import s from "./style.module.scss";
import { Total } from "@/widgets/Total";
import { CustomBets } from "@/widgets/CustomBets/CustomBets";

interface GamesPageProps {}

const GamesPage: FC<GamesPageProps> = () => {
  return (
    <Layout gameName="notGameName">
      <div className={s.games_page_container}>
        <div className={s.popular_games_block}></div>
        <div className={s.games_block}></div>
        <Total />
        <CustomBets
          title="Live bets"
          isMainPage={true}
          isGamePage={false}
          game={undefined}
        />
      </div>
    </Layout>
  );
};

export default GamesPage;
