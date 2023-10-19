import { FC } from "react";
import s from "./styles.module.scss";
import Image from "next/image";

import rockImg from "@/public/media/games_assets/rock_paper_scissors/rockIcon.svg";
import paperImg from "@/public/media/games_assets/rock_paper_scissors/paperIcon.svg";
import scissorsImg from "@/public/media/games_assets/rock_paper_scissors/scissorsIcon.svg";

interface RpsPickerProps {}

export const RpsPicker: FC<RpsPickerProps> = () => {
  return (
    <div className={s.rps_picker_block}>
      <div className={s.rps_picker_block_item}>
        <Image src={rockImg} alt="rock-icon" />
      </div>
      <div className={s.rps_picker_block_item}>
        <Image src={scissorsImg} alt="scissors-icon" />
      </div>
      <div className={s.rps_picker_block_item}>
        <Image src={paperImg} alt="paper-icon" />
      </div>
    </div>
  );
};
