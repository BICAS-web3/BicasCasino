import { FC, useEffect, useState } from "react";
import s from "../Wager/styles.module.scss";
import infoIco from "@/public/media/Wager_icons/infoIco.svg";
import infoLightIco from "@/public/media/Wager_icons/infoLightIco.svg";
import openHandIco from "@/public/media/Wager_icons/openHandIco.svg";
import openHandLightIco from "@/public/media/Wager_icons/openHandLightIco.svg";
import closeIco from "@/public/media/Wager_icons/closeIco.svg";
import soundIco from "@/public/media/Wager_icons/active2.svg";
import closeBtnIco from "@/public/media/Wager_icons/closeDownBtnsIco.svg";
import soundOffIco from "@/public/media/Wager_icons/disabled2.svg";
import soundEffectsIco from "@/public/media/Wager_icons/effects2.svg";
import Image from "next/image";
import { useUnit } from "effector-react";
import * as GameModel from "@/widgets/GamePage/model";
import { checkPageClicking } from "@/shared/tools";
import * as PokerHandsM from "@/widgets/PokerHandsBlock/model";
import { PokerHandsBlock } from "../PokerHandsBlock/PokerHandsBlock";
import { CustomEllipseBlur } from "../CustomEllipseBlur.tsx/CustomEllipseBlur";
import burgerIco from "@/public/media/misc/burgerIco.svg";
import clsx from "clsx";
import activeGroup from "@/public/media/Wager_icons/activeGroup.svg";
import disabledGroup from "@/public/media/Wager_icons/disabledGroup.svg";

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
  className?: string;
  text?: string;
}

export const WagerLowerBtnsBlock: FC<WagerLowerBtnsBlockProps> = ({
  game,
  className,
  text,
}) => {
  const [playSounds, switchSounds] = useUnit([
    GameModel.$playSounds,
    GameModel.switchSounds,
  ]);

  const soundChange = () => {
    if (playSounds === "off") {
      switchSounds("on");
    } else if (playSounds === "on") {
      switchSounds("effects");
    } else if (playSounds === "effects") {
      switchSounds("off");
    }
  };

  const [infoModalVisibility, setInfoModalVisibility] = useState(false);
  //const [soundState, setSoundState] = useState(true);
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
    <div className={clsx(s.poker_wager_lower_btns_block, className)}>
      <button className={s.poker_wager_sound_btn} onClick={soundChange}>
        {playSounds === "off" ? (
          <>
            <Image
              alt="sound-ico-off"
              className={s.sound_ico}
              src={soundOffIco}
            />
            <Image
              alt="sound-ico-off"
              className={s.disabled_group}
              src={disabledGroup}
            />
          </>
        ) : playSounds === "effects" ? (
          <>
            <Image
              alt="sound-ico"
              className={s.sound_ico}
              src={soundEffectsIco}
            />
            <span className={s.fx}>fx</span>
          </>
        ) : (
          <>
            <Image alt="sound-ico" className={s.sound_ico} src={soundIco} />
            <Image
              alt="sound-ico"
              className={s.active_group}
              src={activeGroup}
            />
          </>
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
          <p className={s.poker_wager_info_modal_text}>{text}</p>
        </div>
      </div>
      {game && game === "poker" && (
        <div className={s.hand_multiplier_wrap}>
          <div
            className={s.hand_multiplier_ico_wrap}
            onClick={() => setHandVisibility(!handMultiplierBlockVisibility)}
          >
            {handMultiplierBlockVisibility ? (
              <Image alt="open-hand-light-ico" src={burgerIco} />
            ) : (
              <Image alt="open-hand-default-ico" src={burgerIco} />
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
