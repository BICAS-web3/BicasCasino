import { FC, useEffect, useState } from "react";
import s from "../Wager/styles.module.scss";
import infoIco from "@/public/media/Wager_icons/infoIco.svg";
import infoLightIco from "@/public/media/Wager_icons/infoLightIco.svg";
import openHandIco from "@/public/media/Wager_icons/openHandIco.svg";
import openHandLightIco from "@/public/media/Wager_icons/openHandLightIco.svg";
import closeIco from "@/public/media/Wager_icons/closeIco.svg";
import soundIco from "@/public/media/Wager_icons/soundIco.svg";
import closeBtnIco from "@/public/media/Wager_icons/closeDownBtnsIco.svg";
import soundOffIco from "@/public/media/Wager_icons/volumeOffIco.svg";
import Image from "next/image";
import { useUnit } from "effector-react";
import * as GameModel from "@/widgets/GamePage/model";
import { checkPageClicking } from "@/shared/tools";

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
  //const [soundState, setSoundState] = useState(true);
  const [handMultiplierBlockVisibility, setHandMultiplierBlockVisibility] =
    useState(false);

  useEffect(() => {
    if (infoModalVisibility || handMultiplierBlockVisibility) {
      checkPageClicking({ blockDataId: "wager-lower-btns" }, (isBlock) => {
        if (!isBlock) {
          setInfoModalVisibility(false);
          setHandMultiplierBlockVisibility(false);
        }
      });
    }
  }, [infoModalVisibility, handMultiplierBlockVisibility]);

  return (
    <div
      className={s.poker_wager_lower_btns_block}
      data-id={"wager-lower-btns"}
    >
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
          <Image
            src={closeIco}
            alt="close-ico"
            onClick={() => setInfoModalVisibility(false)}
            className={s.poker_wager_info_modal_close_ico}
          />
          <h1 className={s.poker_wager_info_modal_title}>About the game</h1>
          <p className={s.poker_wager_info_modal_text}>Poker</p>
        </div>
      </div>
      {game && game === "poker" && (
        <div className={s.hand_multiplier_wrap}>
          <div
            className={s.hand_multiplier_ico_wrap}
            onClick={() =>
              setHandMultiplierBlockVisibility(!handMultiplierBlockVisibility)
            }
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
            <div className={s.hand_multiplier_block_header}>
              <span className={s.hand_multiplier_block_header_title}>Hand</span>
              <span className={s.hand_multiplier_block_header_title}>
                Multiplier
              </span>
            </div>
            <div className={s.hand_multiplier_list}>
              {pokerHandMultiplierList.map((hand, id) => (
                <div className={s.hand_multiplier_list_item}>
                  <span className={s.hand_multiplier_list_item_title}>
                    {hand.title}
                  </span>
                  <span className={s.hand_multiplier_list_item_multiplier}>
                    {hand.multiplier}×
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
