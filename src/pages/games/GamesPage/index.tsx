import { Layout } from "@/widgets/Layout";
import { FC } from "react";
import s from "./style.module.scss";

interface GamesPageProps {}

const GamesPage: FC<GamesPageProps> = () => {
  return (
    <Layout gameName="notGameName">
      <div className={s.games_page_container}></div>
    </Layout>
  );
};

export default GamesPage;
