import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ui.module.scss";
import { $pickedValue, $pickedRows } from "@/widgets/CustomWagerRangeInput/model";
import { useStore, useUnit } from "effector-react";
import {
  easyMultipliers,
  hardMultipliers,
  normalMultipliers,
} from "@/shared/ui/PlinkoPiramyd/multipliersArrays";
import { PlinkoBallIcon } from "@/shared/SVGs/PlinkoBallIcon";
import { useDeviceType } from "@/shared/tools";
import * as levelModel from "@/widgets/PlinkoLevelsBlock/model";
import useSound from "use-sound";


interface PlinkoBallProps {
  path: boolean[];
  setAnimationFinished: any
}

export const PlinkoBall: FC<PlinkoBallProps> = (props) => {
  const ballRef = useRef<HTMLDivElement>(null);

  const [playDing, { stop: stopDing }] = useSound('/static/media/games_assets/plinko/plinkoDing.mp3', { volume: 0.4, loop: false });

  const [ballTop, setBallTop] = useState<number>(-90); // starting position top/Y
  const [ballLeft, setBallLeft] = useState<number>(0); // starting position left/X
  const [pathIndex, setPathIndex] = useState<number>(-2);
  const device = useDeviceType();

  let lastMove = 0;
  let firstMove = 0;
  let movingDeep = 0;
  let sidesMove = 0;

  useEffect(() => {
    if (device) {
      if (device == "bigTablet") {
        setBallLeft(-5);
        movingDeep = 15;
        firstMove = -9;
        lastMove = 11;
        sidesMove = 13;
      } else if (device == "main") {
        setBallLeft(-10);
        firstMove = -11;
        movingDeep = 26;
        lastMove = 26;
        sidesMove = 17.5;
      } else {
        setBallLeft(-4);
        firstMove = -10;
        movingDeep = 11;
        lastMove = 5;
        sidesMove = 9;
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
      console.log("Animation finished");
      //props.setAnimationFinished(true);
      return;
    }


    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const run = async () => {
      // main body of the loop
      if (pathIndex < 0) {
        if (pathIndex == -1) {
          playDing();
          //await sleep(200);
          setBallTop(firstMove); // first movement from the starting position
          setPathIndex(pathIndex + 1);

        } else if (pathIndex == -2) {
          console.log("TEXT");
          await sleep(200);
          console.log("TEXT1");
          setPathIndex(pathIndex + 1);
        }
      } else {
        if (pathIndex == 1) {
          props.setAnimationFinished(true);
        }
        playDing();
        const point = props.path[pathIndex];
        setBallTop(ballTop + movingDeep);
        if (point) {
          setBallLeft(ballLeft + sidesMove);
        } else {
          setBallLeft(ballLeft - sidesMove);
        }
        await sleep(200); // animation length
        setPathIndex(pathIndex + 1);
      }
    };
    run();
  }, [pathIndex, device]);

  return (
    <>{pathIndex < props.path.length ? <div
      className={styles.plinko_ball}
      ref={ballRef}
      style={{
        top: `${ballTop}px`,
        left: `calc(50% + ${ballLeft}px)`,
        transition: ballLeft == 0 ? "" : "all 0.2s linear",
      }}
    >
      <PlinkoBallIcon />
    </div> : <></>}</>
  );
};

interface IPlinkoPyramid {
  path: boolean[][] | undefined,
}

export const PlinkoPyramid: FC<IPlinkoPyramid> = props => {
  const pickedRows = useStore($pickedRows);
  const [rowCount, setRowCount] = useState(pickedRows);
  const [multipliers, setMultipliers] = useState<number[]>([]);
  const device = useDeviceType();
  const [currentLevel, setCurrentLevel] = useState("");

  const [animationFinished, setAnimationFinished] = useState<boolean>(true);
  const [pathIndex, setPathIndex] = useState<number>(0);
  const [path, setPath] = useState<boolean[] | undefined>(undefined);
  const [balls, setBalls] = useState<any[]>([]);

  useEffect(() => {
    console.log("path, animation finished", props.path, animationFinished);
    if (props.path) {
      if (animationFinished) {
        if (pathIndex == props.path.length) {
          //props.setFinishedAnimation(true);
          //setPath(undefined);
          setPathIndex(0);
          //setBalls([]);
          //setAnimationFinished(false);
          return;
        }
        console.log("Changing path", pathIndex);
        setAnimationFinished(false);
        setBalls([...balls, <PlinkoBall
          path={props.path[pathIndex]}
          setAnimationFinished={setAnimationFinished}
          key={pathIndex.toString()}
        />])
        setPath(props.path[pathIndex]);
        setPathIndex(pathIndex + 1);
      }
      // if (pathIndex == props.path.length) {
      //   //props.setFinishedAnimation(true);
      //   setPath(undefined);
      //   setAnimationFinished(false);
      //   return;
      // }
      // console.log("Changing path", pathIndex);
      // setAnimationFinished(false);
      // setPath(props.path[pathIndex]);
      // setPathIndex(pathIndex + 1);
    }
  }, [animationFinished, props.path]);

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
    updateDotSizes(pickedRows);
  }, [device]);

  useEffect(() => {
    updateMultipliers(pickedRows, currentLevel);
  }, [pickedRows, currentLevel]);

  useEffect(() => {
    setRowCount(pickedRows);

    console.log("PICKED VALUE", pickedRows);
  }, [pickedRows]);

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
      {path &&
        <div className={styles.plinko_ball_container}>
          {/* <PlinkoBall
            path={path}
            setAnimationFinished={setAnimationFinished}
          /> */}
          {balls}
        </div>}
    </div>
  );
};
