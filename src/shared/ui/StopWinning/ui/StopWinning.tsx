import { FC } from "react";

import { useUnit } from "effector-react";
import clsx from "clsx";

import * as MinesModel from "@/widgets/Mines/model";
import { WagerModel } from "@/widgets/WagerInputsBlock";

import styles from "./styles.module.scss";

export interface StopWinningProps {}

export const StopWinning: FC<StopWinningProps> = ({}) => {
  const [stopWinning, setStopWinning, cryptoValue, setCryptoValue] = useUnit([
    MinesModel.$stopWinning,
    MinesModel.setStopWinning,
    WagerModel.$cryptoValue,
    WagerModel.setCryptoValue,
  ]);
  return (
    <div className={styles.winning_container}>
      <span className={styles.title}>Stop when winning</span>
      <div className={styles.winning_btns}>
        <button
          onClick={() => {
            // alert(1);
            setStopWinning("YES");
          }}
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
          onClick={() => setCryptoValue(cryptoValue * 5)}
          className={clsx(styles.winning_btn)}
        >
          X5
        </button>
      </div>
    </div>
  );
};
