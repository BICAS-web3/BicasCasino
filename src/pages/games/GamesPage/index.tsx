import { Layout } from "@/widgets/Layout";
import { FC } from "react";

interface GamesPageProps {}

const GamesPage: FC<GamesPageProps> = () => {
  return (
    <Layout gameName="notGameName">
      <div>hello world</div>
    </Layout>
  );
};

export default GamesPage;
