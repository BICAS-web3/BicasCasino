import s from "./styles.module.scss";
import gameBg from "../../public/media/game_layout_images/game_background.png";
import { CustomBets } from "@/widgets/CustomBets/CustomBets";
import { GamePageModal } from "@/widgets/GamePage/GamePageModal";
import React, { FC, ReactNode, useState } from "react";
import { useUnit } from "effector-react";
import * as MainWallet from "@/widgets/AvaibleWallet/model";
import * as BlurModel from "@/widgets/Blur/model";
import { Wager } from "@/widgets/Wager/Wager";

interface GamePageProps {
  children: ReactNode;
  gameTitle: string;
  gameInfoText: string;
  game: string;
}

export const GamePage: FC<GamePageProps> = ({
  children,
  gameTitle,
  gameInfoText,
  game,
}) => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const [setBlur] = useUnit([BlurModel.setBlur]);

  const handleModalVisibilityChange = () => {
    !modalVisibility && setBlur(true);
    setModalVisibility(!modalVisibility);
  };

  const closeModal = () => {
    setModalVisibility(false);
    setBlur(false);
  };

  return (
    <div className={s.game_layout}>
      <div className={s.game_wrap}>
        <GamePageModal
          text={gameInfoText}
          closeModal={closeModal}
          modalVisible={modalVisibility}
        />
        <div className={s.game_body}>
          <div className={s.game}>
            <div className={s.game_block}>
              <h2 className={s.game_title}>{gameTitle}</h2>
              {children}
            </div>
            <Wager game={game} />
          </div>
          <CustomBets
            title="Live bets"
            isGamePage={true}
            isMainPage={false}
            bets={[
              {
                time: { date: "25.08.23", time: "17:05" },
                game_name: "Dice",
                player: "UserName",
                wager: 11,
                multiplier: 3,
                profit: 5.34,
                userBg: "#3DBCE5",
                player_url: "test",
                trx_url: "test",
                game_url: "test",
                network_icon: "test",
                numBets: 1,
                gameAddress: "0x563...4ba9",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
