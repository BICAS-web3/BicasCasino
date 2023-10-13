import { FC, useEffect, useState } from "react";
import styles from "./ui.module.scss";
import { $pickedValue } from "@/widgets/CustomWagerRangeInput/model";
import { useStore } from "effector-react";
import {newMultipliers} from "@/shared/ui/PlinkoPiramyd/multipliersArrays";

interface IPlinkoPyramid {}

export const PlinkoPyramid: FC<IPlinkoPyramid> = () => {
  const pickedValue = useStore($pickedValue);
  const [rowCount, setRowCount] = useState(pickedValue);
  const [multipliers, setMultipliers] = useState<number[]>([]);

  const updateMultipliers = (rowCount: number) => {
    const newMultipliersArray = newMultipliers[rowCount];
    if (newMultipliersArray) {
      setMultipliers(newMultipliersArray);
    } else {
      setMultipliers(newMultipliers[8]);
    }
  };
  useEffect(() => {
    setRowCount(pickedValue);
    updateMultipliers(pickedValue);
  }, [pickedValue]);

  const generateRows = () => {
    const rows = [];
    const middleIndex = Math.floor(rowCount / 2);

    for (let i = 0; i < rowCount; i++) {
      const dots = [];
      for (let j = 0; j < i + 3; j++) {
        dots.push(<span className={styles.dot} key={j}></span>);
      }

      rows.push(
        <div className={styles.pyramid_row} key={i}>
          <span className={styles.ball}>ball</span>
          <div className={styles.dot_container}>{dots}</div>
        </div>
      );
    }

    const multiplierElements = multipliers.map((value, i) => (
      <div className={styles.multipiler_cell} key={i}>
        {value}x
      </div>
    ));
    rows.push(
      <div className={styles.pyramid_row} key={rowCount}>
        <div className={styles.multipiler_container}>{multiplierElements}</div>
      </div>
    );

    return rows;
  };

  return <div className={styles.container}>{generateRows()}</div>;
};
