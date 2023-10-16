import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ui.module.scss";
import { $pickedValue } from "@/widgets/CustomWagerRangeInput/model";
import { useStore, useUnit } from "effector-react";
import {
  easyMultipliers,
  hardMultipliers,
  normalMultipliers,
} from "@/shared/ui/PlinkoPiramyd/multipliersArrays";
import { PlinkoBallIcon } from "@/shared/SVGs/PlinkoBallIcon";
import { useDeviceType } from "@/shared/tools";
import * as levelModel from "@/widgets/PlinkoLevelsBlock/model";

const testBallPath = [true, true, false, false, false, true, false, true];

interface PlinkoBallProps {
  path: boolean[];
}

export const PlinkoBall: FC<PlinkoBallProps> = (props) => {
  const ballRef = useRef<HTMLDivElement>(null);

  const [ballTop, setBallTop] = useState<number>(-37); // starting position top/Y
  const [ballLeft, setBallLeft] = useState<number>(0); // starting position left/X
  const [pathIndex, setPathIndex] = useState<number>(-1);
  const device = useDeviceType();

  let lastMove = 0;
  let firstMove = 0;
  let movingDeep = 0;
  let sidesMove = 0;

  useEffect(() => {
    if (device) {
      if (device == "bigTablet") {
        setBallLeft(-5);
      } else if (device == "main") {
        setBallLeft(-10);
      } else {
        setBallLeft(-4);
      }
    }
  }, [device]);

  useEffect(() => {
    if (!device) {
      return;
    }
    if (device === "bigTablet") {
      movingDeep = 15;
      firstMove = -9;
      lastMove = 11;
      sidesMove = 13;
    } else if (device === "main") {
      firstMove = -11;
      movingDeep = 26;
      lastMove = 26;
      sidesMove = 17.5;
    } else {
      firstMove = -10;
      movingDeep = 11;
      lastMove = 5;
      sidesMove = 9;
    }

    if (pathIndex >= props.path.length) {
      setBallTop(ballTop + lastMove); // last movement to the basket
      return;
    }
    if (pathIndex == -1) {
      setBallTop(firstMove); // first movement from the starting position
      setPathIndex(pathIndex + 1);
      return;
    }
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const run = async () => {
      // main body of the loop
      const point = props.path[pathIndex];
      setBallTop(ballTop + movingDeep);
      if (point) {
        setBallLeft(ballLeft + sidesMove);
      } else {
        setBallLeft(ballLeft - sidesMove);
      }
      await sleep(200); // animation length
      setPathIndex(pathIndex + 1);
    };
    run();
  }, [pathIndex, device]);

  return (
    <div
      className={styles.plinko_ball}
      ref={ballRef}
      style={{
        top: `${ballTop}px`,
        left: `calc(50% + ${ballLeft}px)`,
      }}
    >
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
  const [currentLevel, setCurrentLevel] = useState("");

  const [level] = useUnit([levelModel.$level]);

  useEffect(() => {
    setCurrentLevel(level);
  }, [level]);

  const updateMultipliers = (rowCount: number, lvl: string) => {
    const easyMultipliersArray = easyMultipliers[rowCount];
    const normalMultipliersArray = normalMultipliers[rowCount];
    const hardMultipliersArray = hardMultipliers[rowCount];

    if (lvl == "easy") {
      setMultipliers(easyMultipliersArray);
    } else if (lvl == "normal") {
      setMultipliers(normalMultipliersArray);
    } else if (lvl == "hard") {
      setMultipliers(hardMultipliersArray);
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
    updateMultipliers(pickedValue, currentLevel);
  }, [pickedValue, currentLevel]);

  useEffect(() => {
    setRowCount(pickedValue);

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
