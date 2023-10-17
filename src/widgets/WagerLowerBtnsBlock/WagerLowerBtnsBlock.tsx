import { FC, useEffect, useState } from "react";
import s from "../Wager/styles.module.scss";
import infoIco from "@/public/media/Wager_icons/infoIco.svg";
import infoLightIco from "@/public/media/Wager_icons/infoLightIco.svg";
import openHandIco from "@/public/media/Wager_icons/openHandIco.svg";
import openHandLightIco from "@/public/media/Wager_icons/openHandLightIco.svg";
import closeIco from "@/public/media/pokerHandsImages/closeIco.svg";
import soundIco from "@/public/media/Wager_icons/soundIco.svg";
import closeBtnIco from "@/public/media/Wager_icons/closeDownBtnsIco.svg";
import soundOffIco from "@/public/media/Wager_icons/volumeOffIco.svg";
import Image from "next/image";
import { useUnit } from "effector-react";
import * as GameModel from "@/widgets/GamePage/model";
import * as PokerHandsM from "@/widgets/PokerHandsBlock/model";
import { PokerHandsBlock } from "../PokerHandsBlock/PokerHandsBlock";
import { CustomEllipseBlur } from "../CustomEllipseBlur.tsx/CustomEllipseBlur";

const pokerHandMultiplierList = [
  {
    title: "Royal Flush",
    multiplier: 100,
  },
  {
    title: "Straight Flush",
    multiplier: 50,
  },
  {
    title: "Four of a kind",
    multiplier: 30,
  },
  {
    title: "Full House",
    multiplier: 8,
  },
  {
    title: "Flush",
    multiplier: 6,
  },
  {
    title: "Straight",
    multiplier: 5,
  },
  {
    title: "Three of a kind",
    multiplier: 3,
  },
  {
    title: "Two Pairs",
    multiplier: 2,
  },
  {
    title: "Jacks of Better",
    multiplier: 1,
  },
];

interface WagerLowerBtnsBlockProps {
  game: string;
}

export const WagerLowerBtnsBlock: FC<WagerLowerBtnsBlockProps> = ({ game }) => {
  const [playSounds, switchSounds] = useUnit([
    GameModel.$playSounds,
    GameModel.switchSounds,
  ]);

  const [infoModalVisibility, setInfoModalVisibility] = useState(false);

  const [handMultiplierBlockVisibility, setHandVisibility] = useUnit([
    PokerHandsM.$isOpen,
    PokerHandsM.setVisibility,
  ]);

  useEffect(() => {
    if (handMultiplierBlockVisibility) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "visible";
    }
  }, [handMultiplierBlockVisibility]);

  return (
    <div className={s.poker_wager_lower_btns_block}>
      <button
        className={s.poker_wager_sound_btn}
        onClick={() => switchSounds()}
      >
        {playSounds ? (
          <Image alt="sound-ico" src={soundIco} />
        ) : (
          <Image alt="sound-ico-off" src={soundOffIco} />
        )}
      </button>
      <div className={s.poker_wager_info_btn_wrap}>
        <button
          className={s.poker_wager_info_btn}
          onClick={() => setInfoModalVisibility(!infoModalVisibility)}
        >
          {infoModalVisibility ? (
            <Image alt="info-ico-light" src={closeBtnIco} />
          ) : (
            <Image alt="info-ico-default" src={infoIco} />
          )}
        </button>
        <div
          className={`${s.poker_wager_info_modal_block} ${
            infoModalVisibility && s.active
          }`}
        >
          <div className={s.ellipse_blur_wrap}>
            <CustomEllipseBlur />
          </div>
          <Image
            src={closeIco}
            alt="close-ico"
            onClick={() => setInfoModalVisibility(false)}
            className={s.poker_wager_info_modal_close_ico}
          />
          <p className={s.poker_wager_info_modal_text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, vel,
            atque debitis sequi quis ducimus quod assumenda esse quasi veniam
            quaerat optio vitae rerum doloribus! Fugiat architecto dolor
            reiciendis nihil.
          </p>
        </div>
      </div>
      {game && game === "poker" && (
        <div className={s.hand_multiplier_wrap}>
          <div
            className={s.hand_multiplier_ico_wrap}
            onClick={() => setHandVisibility(!handMultiplierBlockVisibility)}
          >
            {handMultiplierBlockVisibility ? (
              <Image alt="open-hand-light-ico" src={closeBtnIco} />
            ) : (
              <Image alt="open-hand-default-ico" src={openHandIco} />
            )}
          </div>
          <div
            className={`${s.hand_multiplier_block} ${
              handMultiplierBlockVisibility && s.handMultiplierActive
            }`}
          >
            <PokerHandsBlock />
          </div>
        </div>
      )}
    </div>
  );
};
