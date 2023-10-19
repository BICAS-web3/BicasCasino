import Image from "next/image";
import { GameLayout } from "../../../widgets/GameLayout/layout";
import { GameInfo } from "@/widgets/GameInfo";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/Layout";
import { GamePage } from "@/widgets/GamePage/GamePage";
import { useRouter } from "next/router";
import { LiveBetsWS } from "@/widgets/LiveBets";
import { RockPaperScissors } from "@/widgets/RockPaperScissors/RockPaperScissors";

const WagerContent = () => {
  return <></>;
};

export default function RockPaperScissorsGame() {
  return (
    <Layout gameName={"RockPaperScissors"}>
      <LiveBetsWS
        subscription_type={"Subscribe"}
        subscriptions={["Plinko", "PlinkoStart"]}
      />
      <div className={s.rps_container}>
        <GamePage
          gameInfoText="rps"
          gameTitle="rock paper scissors"
          wagerContent={<WagerContent />}
        >
          <RockPaperScissors />
        </GamePage>
      </div>
    </Layout>
  );
}
