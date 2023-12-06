import { FC } from "react";

import styles from "./styles.module.scss";
import clsx from "clsx";
import { useUnit } from "effector-react";
import * as MinesModel from "@/widgets/Mines/model";

export interface StopWinningProps {}

export const StopWinning: FC<StopWinningProps> = ({}) => {
  const [stopWinning, setStopWinning] = useUnit([
    MinesModel.$stopWinning,
    MinesModel.setStopWinning,
  ]);
  return (
    <div className={styles.winning_container}>
      <span className={styles.title}>Stop when winning</span>
      <div className={styles.winning_btns}>
        <button
          onClick={() => setStopWinning("YES")}
          className={clsx(
            styles.winning_btn,
            stopWinning === "YES" && styles.winning_btn_active
          )}
        >
          yes
        </button>
        <button
          onClick={() => setStopWinning("NO")}
          className={clsx(
            styles.winning_btn,
            stopWinning === "NO" && styles.winning_btn_active
          )}
        >
          NO
        </button>
        <button
          onClick={() => setStopWinning("X5")}
          className={clsx(
            styles.winning_btn,
            stopWinning === "X5" && styles.winning_btn_active
          )}
        >
          X5
        </button>
      </div>
    </div>
  );
};
