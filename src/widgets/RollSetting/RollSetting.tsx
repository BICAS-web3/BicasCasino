import Image from "next/image";
import { FC, SetStateAction, useEffect, useState } from "react";
import * as Model from "./model";
import { SecondaryBackground } from "../GameInterface";
import s from "./styles.module.scss";
import { useUnit } from "effector-react";
import ArrowsIcon from "@/public/media/misc/arrows.svg";

interface UpperControllsProps {}
const UpperControlls: FC<UpperControllsProps> = (props) => {
  const [rollOver, flipRollOver, RollValue, setRollValue] = useUnit([
    Model.$RollOver,
    Model.flipRollOver,
    Model.$RollValue,
    Model.setRollValue,
  ]);

  return (
    <div className={s.upper_controlls}>
      <div className={s.roll_over}>{`Roll ${rollOver ? "Over" : "Under"}`}</div>
      <div
        className={s.roll_flip}
        onClick={() => {
          flipRollOver(RollValue);
        }}
      >
        <Image src={ArrowsIcon} alt={""} width={24} height={24}></Image>
      </div>
    </div>
  );
};

interface BottomControllsProps {}
const BottomControlls: FC<BottomControllsProps> = (props) => {
  const [rollValue, setRollValue, rollOver] = useUnit([
    Model.$RollValue,
    Model.setRollValue,
    Model.$RollOver,
  ]);

  const [rollString, setRollString] = useState<string>(rollValue.toString());

  const onChange = (event: {
    target: {
      value: SetStateAction<string>;
    };
  }) => {
    const number_string = event.target.value.toString();
    const numb = Number(number_string);

    if (
      Number.isNaN(numb) ||
      number_string.charAt(0) == "+" ||
      number_string.charAt(0) == "-"
    ) {
      return;
    }
    if (rollOver) {
      if (numb < 5) {
        setRollValue(5);
        setRollString("5");
        return;
      }
      if (numb > 99.9) {
        return;
      }
    } else {
      if (numb < 0.1) {
        setRollValue(0.1);
        setRollString("0.1");
        return;
      }
      if (numb > 95) {
        return;
      }
    }

    setRollValue(numb);
    setRollString(number_string);
  };

  useEffect(() => {
    setRollString(Number(rollValue.toFixed(2)).toString());
  }, [rollValue]);

  return (
    <div className={s.bottom_controlls}>
      <input
        className={s.over_input}
        min={5}
        max={99.9}
        type="string"
        onChange={onChange}
        value={rollString}
      ></input>
    </div>
  );
};

export interface RollSettingProps {}
export const RollSetting: FC<RollSettingProps> = (props) => {
  const [rollValue, setRollValue, rollOver, flipRollOver] = useUnit([
    Model.$RollValue,
    Model.setRollValue,
    Model.$RollOver,
    Model.flipRollOver,
  ]);

  return (
    <SecondaryBackground
      children={[<UpperControlls />, <BottomControlls />]}
      height={105}
      min_width={200}
      secondary_class={undefined}
    />
  );
};
