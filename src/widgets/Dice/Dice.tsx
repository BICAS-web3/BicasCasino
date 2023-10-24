import { Model as RollSettingModel } from "@/widgets/RollSetting";
import Image from "next/image";
import { FC, useEffect, useState, ChangeEvent, useRef } from "react";
import s from "./styles.module.scss";

import * as DiceModel from "./model";
import { sessionModel } from "@/entities/session";
import { useUnit } from "effector-react";
import { BigNumber, ethers } from "ethers";
import * as Api from "@/shared/api";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { BetStatus, Model as BetStatusModel } from "@/widgets/BetStatus";
import { web3 } from "@/entities/web3";
import { Firework } from "../Firework";
import * as GameModel from "@/widgets/GamePage/model";

import dice_cube from "@/public/media/dice_images/dice_cube.png";

import dice_desktop from "@/public/media/dice_images/dice_desctop.png";

import dice_medium from "@/public/media/dice_images/dice_medium.png";

import dice_mobile from "@/public/media/dice_images/dice_mobile.png";

import dice_tablet from "@/public/media/dice_images/dice_tablet.png";

import soundIco from "@/public/media/Wager_icons/soundIco.svg";
import soundOffIco from "@/public/media/Wager_icons/volumeOffIco.svg";

import dice_precentage from "@/public/media/dice_icons/dice_precentage.svg";
import dice_close from "@/public/media/dice_icons/dice_close.svg";
import dice_swap from "@/public/media/dice_icons/dice_swap.svg";

//export * from './Dice';

export interface DiceProps {}

export const Dice: FC<DiceProps> = (props) => {
  const [
    playSounds,
    switchSounds,
    setGameStatus,
    setLostStatus,
    setWonStatus,
    won,
    setWon,
    gameAddress,
    gameStuts,
    betsAmount,
    setBetsAmount,
    rollOver,
    RollValue,
    setRollValue,
    currentNetwork,
  ] = useUnit([
    GameModel.$playSounds,
    GameModel.switchSounds,
    GameModel.setGameStatus,
    GameModel.setLostStatus,
    GameModel.setWonStatus,
    BetStatusModel.$Won,
    BetStatusModel.setWon,
    sessionModel.$gameAddress,
    GameModel.$gameStatus,
    DiceModel.$betsAmount,
    DiceModel.setBetsAmount,
    RollSettingModel.$RollOver,
    RollSettingModel.$RollValue,
    RollSettingModel.setRollValue,
    sessionModel.$currentNetwork,
  ]);

  const onChange = (el: ChangeEvent<HTMLInputElement>) => {
    const number_value = Number(el.target.value.toString());

    setRollValue(number_value);
  };

  let bgImage;
  const documentWidth = document.documentElement.clientWidth;
  if (documentWidth > 1910) bgImage = dice_desktop;
  if (documentWidth > 1280 && documentWidth < 1920) bgImage = dice_medium;
  if (documentWidth > 700 && documentWidth < 1280) bgImage = dice_tablet;
  if (documentWidth < 700) bgImage = dice_mobile;
  const win_chance = rollOver ? 100 - RollValue : RollValue;
  const multiplier = 0.99 * (100 / win_chance);

  const rollOverNumber = rollOver ? 100 - RollValue : RollValue;
  const rollUnderNumber = rollOver ? RollValue : 100 - RollValue;

  const [rollValueBetween, setRollValueBetween] = useState<"Over" | "Under">(
    "Over"
  );
  const changeBetween = () => {
    if (rollValueBetween === "Under") {
      setRollValueBetween("Over");
    } else {
      setRollValueBetween("Under");
    }
  };

  const rangeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const rangeElement = rangeRef.current;
    const rangeWidth = (RollValue / 95) * rangeElement!.offsetWidth;

    rangeElement?.style.setProperty("--range-width", `${rangeWidth}px`);
  }, [RollValue]);

  const total = (win_chance / RollValue) * multiplier;

  const diceValue = [
    {
      id: 1,
      title: "Multiplier",
      value: multiplier.toFixed(2),
      img_src: dice_close,
      img_alt: "close",
    },
    {
      id: 2,
      title: "Roll",
      value:
        rollValueBetween === "Over"
          ? rollOverNumber.toFixed(2)
          : rollUnderNumber.toFixed(2),
      img_src: dice_swap,
      img_alt: "swap",
    },
    {
      id: 3,
      title: "Win Chance",
      value: win_chance.toFixed(2),
      img_src: dice_precentage,
      img_alt: "%",
    },
  ];
  return (
    <div className={s.dice}>
      <div className={s.dice_container}>
        <Image className={s.cube} src={dice_cube} alt="cube" />
        <Image className={s.background} src={bgImage!} alt="test" />
        <div className={s.range_container}>
          <span className={s.roll_range_value}>{RollValue}</span>
          <span className={s.roll_range_min}>0.1</span>
          <div className={s.custom_range_input_body}></div>
          <input
            className={s.dice_range}
            type="range"
            min="0.1"
            max="95"
            value={RollValue}
            onChange={onChange}
            ref={rangeRef}
            step={0.1}
          />
          <span className={s.roll_range_max}>95</span>
        </div>
        <div className={s.dice_about}>
          <span className={s.green_color}>32</span>
          <span className={s.red_color}>343</span>
          <span>
            Total: <span className={s.green_color}>{total.toFixed(2)}</span>
          </span>
        </div>
        <button onClick={() => switchSounds()} className={s.dice_sound_btn}>
          <Image
            src={playSounds ? soundIco : soundOffIco}
            alt={playSounds ? "sound-on" : "sound-off"}
          />
        </button>
      </div>
      <div className={s.dice_value_container}>
        {diceValue.map((dice) => (
          <div key={dice.id} className={s.dice_under_conteiner}>
            <h3 className={s.dice_under_title}>
              {dice.title} {dice.title === "Roll" && rollValueBetween}
            </h3>
            <div className={s.dice_under_data}>
              <span className={s.dice_under_value}>{dice.value}</span>
              <Image
                onClick={() => {
                  dice.title === "Roll" && changeBetween();
                }}
                src={dice.img_src}
                alt={dice.img_src}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
