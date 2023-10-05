import { GamePage } from "@/widgets/GamePage/GamePage";
import { Layout } from "@/widgets/Layout";
import { Poker } from "@/widgets/Poker/Poker";
import s from "./styles.module.scss";
import { WagerInputsBlock } from "@/widgets/WagerInputsBlock/WagerInputsBlock";
import { WagerLowerBtnsBlock } from "@/widgets/WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import { PokerFlipCardsInfo } from "@/widgets/PokerFlipCardsInfo";
import { WinMessage } from "@/widgets/WinMessage";
import { LostMessage } from "@/widgets/LostMessage";
import DraxToken from "@/public/media/tokens/drax.svg";
import Image from 'next/image';

const WagerContent = () => {
  return (
    <>
      <WagerInputsBlock />
      <button className={s.poker_wager_drawing_cards_btn}>Drawing cards</button>
      <WagerLowerBtnsBlock game="poker" />
    </>
  );
};

export default function PokerGame() {
  const flipCards = false;
  const won = false;
  const lost = false;
  return (
    <Layout>
      <div className={s.poker_container}>
        <GamePage
          gameInfoText="test"
          gameTitle="poker"
          wagerContent={<WagerContent />}
        >
          <Poker />
          {/* show when need to redraw cards */}

          {flipCards && <div className={s.poker_flip_cards_info_wrapper}>
            <PokerFlipCardsInfo onCLick={() => { }} />
          </div>}

          {won && <div className={s.poker_win_wrapper}>
            <WinMessage tokenImage={<Image src={DraxToken} alt={''} />} profit={"3760.00"} multiplier={"1.98"} />
          </div>}

          {lost && <div className={s.poker_lost_wrapper}>
            <LostMessage amount={"3760.00"} />
          </div>}
        </GamePage>
      </div>
    </Layout>
  );
}
