import { FC } from "react";
import s from "./styles.module.scss";
import Image from "next/image";

import { RockButton } from "@/shared/SVGs/RockButton";
import { ScissorsButton } from "@/shared/SVGs/ScissorsButton";
import { PaperButton } from "@/shared/SVGs/PaperButton";

import * as RPSModel from "@/widgets/RockPaperScissors/model";
import { useUnit } from "effector-react";

interface RpsPickerProps {}

export const RpsPicker: FC<RpsPickerProps> = () => {
  const [setvalue] = useUnit([RPSModel.setGameValue]);

  return (
    <div className={s.rps_picker_block}>
      <div onClick={() => setvalue("Rock")} className={s.rps_picker_block_item}>
        <RockButton />
      </div>
      <div
        onClick={() => setvalue("Scissors")}
        className={s.rps_picker_block_item}
      >
        <ScissorsButton />
      </div>
      <div
        onClick={() => setvalue("Paper")}
        className={s.rps_picker_block_item}
      >
        <PaperButton />
      </div>
    </div>
  );
};
