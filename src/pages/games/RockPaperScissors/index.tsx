import Image from "next/image";
import { GameLayout } from "../../../widgets/GameLayout/layout";
import { GameInfo } from "@/widgets/GameInfo";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/Layout";
import { GamePage } from "@/widgets/GamePage/GamePage";

const WagerContent = () => {
  return <></>;
};

export default function RockPaperScissors() {
  return (
    <Layout gameName={"CoinFlip"}>
      <div className={s.rps_container}>
        <GamePage
          isPoker={false}
          gameInfoText="test"
          gameTitle="coinflip"
          wagerContent={<WagerContent />}
        ></GamePage>
      </div>
    </Layout>
  );
}
