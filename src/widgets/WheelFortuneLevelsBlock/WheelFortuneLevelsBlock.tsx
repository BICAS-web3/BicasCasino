import { FC } from "react";
import { useUnit } from "effector-react";

import * as levelM from "./model";

import clsx from "clsx";

import s from "./styles.module.scss";

interface WheelFortuneLevelsBlockProps {}

export const WheelFortuneLevelsBlock: FC<
  WheelFortuneLevelsBlockProps
> = ({}) => {
  const [setLevel, level] = useUnit([levelM.setLevel, levelM.$level]);

  const ButtonTupe = ["Easy", "Medium", "Hard"];
  type ButtonTupe = ["Easy", "Medium", "Hard"];

  return (
    <div className={s.wheel_levels_list_block}>
      <span className={s.wheel_levels_list_title}>Difficulty</span>
      <div className={s.wheel_levels_list}>
        {ButtonTupe.map((type) => (
          <button
            className={clsx(s.wheel_level_btn, level == type && s.active)}
            onClick={() => setLevel(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};
