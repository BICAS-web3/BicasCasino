import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ui.module.scss";
import { $pickedValue } from "@/widgets/CustomWagerRangeInput/model";
import { useStore } from "effector-react";
import { newMultipliers } from "@/shared/ui/PlinkoPiramyd/multipliersArrays";
import { PlinkoBallIcon } from "@/shared/SVGs/PlinkoBallIcon";
import { useDeviceType } from "@/shared/tools";
import {riskLevel, riskModel} from "@/widgets/CustomRiskSelector/model";

const testBallPath = [true, true, false, false, false, true, false, true];

interface PlinkoBallProps {
  path: boolean[];
}

export const PlinkoBall: FC<PlinkoBallProps> = ({}) => {
  const ballRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (ballRef.current?.offsetTop === 0) {
  //     ballRef.current.style.animation = styles.fallingRight;
  //   }
  // }, []);
  //

  return (
    <div className={styles.plinko_ball} ref={ballRef}>
      <PlinkoBallIcon />
    </div>
  );
};

interface IPlinkoPyramid {}

export const PlinkoPyramid: FC<IPlinkoPyramid> = () => {
  const pickedValue = useStore($pickedValue);
  const [rowCount, setRowCount] = useState(pickedValue);
  const [multipliers, setMultipliers] = useState<number[]>([]);
  const device = useDeviceType();
  const riskLevelValue = riskModel.getState().riskLevel;
  const newMultipliersArray = riskLevelValue && newMultipliers[riskLevelValue] && newMultipliers[riskLevelValue][rowCount];

  const updateMultipliers = (rowCount:number) => {
    const riskLevelValue = riskModel.getState().riskLevel;
    const newMultipliersArray = riskLevelValue && newMultipliers[riskLevelValue] && newMultipliers[riskLevelValue][rowCount];
    if (newMultipliersArray) {
      setMultipliers(newMultipliersArray);
    } else {
      setMultipliers(newMultipliers["easyMultipliers"][8]);
    }
  };

  useLayoutEffect(() => {
    const updateDotSizes = (rowCount: number) => {
      const dotWidth =
        device === "main"
          ? "5px"
          : device === "bigTablet"
          ? "3px"
          : device === "tablet"
          ? "3px"
          : device === "phone"
          ? "3px"
          : "5px";
      const dotHeight =
        device === "main"
          ? "5px"
          : device === "bigTablet"
          ? "3px"
          : device === "tablet"
          ? "3px"
          : device === "phone"
          ? "3px"
          : "5px";
      document.documentElement.style.setProperty("--dot-width", dotWidth);
      document.documentElement.style.setProperty("--dot-height", dotHeight);
    };
    updateDotSizes(pickedValue);
  }, [device]);

  useEffect(() => {
    setRowCount(pickedValue);
    updateMultipliers(pickedValue);
    console.log("PICKED VALUE", pickedValue);
  }, [pickedValue]);

  const generateRows = () => {
    const rows = [];
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

  return (
    <div className={styles.container}>
      {generateRows()}
      <div className={styles.plinko_ball_container}>
        <PlinkoBall path={testBallPath} />
      </div>
    </div>
  );
};
