import { FC } from "react";
import s from "./styles.module.scss";
import Image from "next/image";

import { RockButton } from "@/shared/SVGs/RockButton";
import { ScissorsButton } from "@/shared/SVGs/ScissorsButton";
import { PaperButton } from "@/shared/SVGs/PaperButton";

interface RpsPickerProps {}

export const RpsPicker: FC<RpsPickerProps> = () => {
  return (
    <div className={s.rps_picker_block}>
      <div className={s.rps_picker_block_item}>
        <RockButton />
      </div>
      <div className={s.rps_picker_block_item}>
        <ScissorsButton />
      </div>
      <div className={s.rps_picker_block_item}>
        <PaperButton />
      </div>
    </div>
  );
};
