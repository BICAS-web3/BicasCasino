import { FC } from "react";
import s from "./styles.module.scss";
import { useUnit } from "effector-react";
import * as levelM from "./model";

interface PlinkoLevelsBlockProps {}
export const PlinkoLevelsBlock: FC<PlinkoLevelsBlockProps> = ({}) => {
  const [setLevel, level] = useUnit([levelM.setLevel, levelM.$level]);

  return (
    <div className={s.plinko_levels_list_block}>
      <span className={s.plinko_levels_list_title}>Difficulty</span>
      <div className={s.plinko_levels_list}>
        <button
          className={`${s.plinko_level_btn} ${level == "easy" && s.active}`}
          onClick={() => setLevel("easy")}
        >
          easy
        </button>
        <button
          className={`${s.plinko_level_btn} ${level == "normal" && s.active}`}
          onClick={() => setLevel("normal")}
        >
          normal
        </button>
        <button
          className={`${s.plinko_level_btn} ${level == "hard" && s.active}`}
          onClick={() => setLevel("hard")}
        >
          hard
        </button>
      </div>
    </div>
  );
};
