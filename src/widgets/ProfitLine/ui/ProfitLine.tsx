import { FC, useEffect, useState } from "react";

import styles from "./styles.module.scss";

import clsx from "clsx";

import * as GameModel from "@/widgets/GamePage/model";
import * as WagerModel from "@/widgets/WagerInputsBlock/model";

import { useUnit } from "effector-react";

export interface ProfitLineProps {
  containerClassName?: string;
  lineClassName?: string;
}

export const ProfitLine: FC<ProfitLineProps> = ({
  lineClassName,
  containerClassName,
}) => {
  const [gameStatus, lost, profit, cryptoValue] = useUnit([
    GameModel.$gameStatus,
    GameModel.$lost,
    GameModel.$profit,
    WagerModel.$cryptoValue,
  ]);

  const [fullWon, setFullWon] = useState(0);
  const [fullLost, setFullLost] = useState(0);
  const [totalValue, setTotalValue] = useState(0.1);
  const [gameResult, setGameResult] = useState<
    { value: number; status: "won" | "lost" }[]
  >([]);
  useEffect(() => {
    if (gameStatus === GameModel.GameStatus.Won) {
      setFullWon((prev) => prev + profit);
      setGameResult((prev) => [
        ...prev,
        { value: profit / cryptoValue, status: "won" },
      ]);
    } else if (gameStatus === GameModel.GameStatus.Lost) {
      setFullLost((prev) => prev + lost);
      setGameResult((prev) => [...prev, { value: 0.0, status: "lost" }]);
    }
    setTotalValue(fullWon - fullLost);
  }, [GameModel.GameStatus, profit, lost]);

  return (
    <>
      <div className={clsx(containerClassName)}>
        <span className={styles.total_won}>{fullWon.toFixed(2)}</span>
        <span className={styles.total_lost}>{fullLost.toFixed(2)}</span>
        <div>
          Total:{" "}
          <span
            className={clsx(
              totalValue > 0 && styles.total_won,
              totalValue < 0 && styles.total_lost
            )}
          >
            {Math.abs(totalValue).toFixed(2)}
          </span>
        </div>
      </div>
      <div className={clsx(styles.balls_arr, lineClassName)}>
        {gameResult.map((result, i) => (
          <div
            className={clsx(
              styles.multiplier_value,
              result.status === "won" && styles.multiplier_positive,
              result.status === "lost" && styles.multiplier_negative
            )}
            key={i}
          >
            {result.value.toFixed(2)}x
          </div>
        ))}
      </div>
    </>
  );
};
