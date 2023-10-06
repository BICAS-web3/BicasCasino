import { FC, useState } from "react";
import s from "../Wager/styles.module.scss";
import infoIco from "@/public/media/Wager_icons/infoIco.svg";
import infoLightIco from "@/public/media/Wager_icons/infoLightIco.svg";
import openHandIco from "@/public/media/Wager_icons/openHandIco.svg";
import openHandLightIco from "@/public/media/Wager_icons/openHandLightIco.svg";
import closeIco from "@/public/media/Wager_icons/closeIco.svg";
import soundIco from "@/public/media/Wager_icons/soundIco.svg";
import soundOffIco from "@/public/media/Wager_icons/volumeOffIco.svg";
import Image from "next/image";
import { useUnit } from "effector-react";
import * as GameModel from "@/widgets/GamePage/model";

const pokerHandMultiplierList = [
  {
    title: "Royal Flush",
    multiplier: 100,
  },
  {
    title: "Straight Flush",
    multiplier: 45,
  },
  {
    title: "Four of a kind",
    multiplier: 20,
  },
  {
    title: "Full House",
    multiplier: 12,
  },
  {
    title: "Flush",
    multiplier: 10,
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

  const [
    playSounds,
    switchSounds
  ] = useUnit([
    GameModel.$playSounds,
    GameModel.switchSounds
  ]);

  const [infoModalVisibility, setInfoModalVisibility] = useState(false);
  //const [soundState, setSoundState] = useState(true);
  const [handMultiplierBlockVisibility, setHandMultiplierBlockVisibility] =
    useState(false);

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
            <Image alt="info-ico-light" src={infoLightIco} />
          ) : (
            <Image alt="info-ico-default" src={infoIco} />
          )}
        </button>
        <div
          className={`${s.poker_wager_info_modal_block} ${infoModalVisibility && s.active
            }`}
        >
          <Image
            src={closeIco}
            alt="close-ico"
            onClick={() => setInfoModalVisibility(false)}
            className={s.poker_wager_info_modal_close_ico}
          />
          <h1 className={s.poker_wager_info_modal_title}>About the game</h1>
          <p className={s.poker_wager_info_modal_text}>
            Dice is the most popular crypto casino game, with its roots
            originating from 2012 as Bitcoin’s use case for gambling came into
            existence. <br /> It is a simple game of chance with easy
            customisable betting mechanics. Slide the bar left and the
            multiplier reward for winning your bet increases, while sacrificing
            the win chance. Slide the bar to the right, and the opposite
            happens.
          </p>
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
              <Image alt="open-hand-light-ico" src={openHandLightIco} />
            ) : (
              <Image alt="open-hand-default-ico" src={openHandIco} />
            )}
          </div>
          <div
            className={`${s.hand_multiplier_block} ${handMultiplierBlockVisibility && s.handMultiplierActive
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
