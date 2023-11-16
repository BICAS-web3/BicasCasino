import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ui.module.scss";
import {
  $pickedValue,
  $pickedRows,
} from "@/widgets/CustomWagerRangeInput/model";
import { useStore, useUnit } from "effector-react";
import { newMultipliers } from "@/shared/ui/PlinkoPiramyd/multipliersArrays";
import { PlinkoBallIcon } from "@/shared/SVGs/PlinkoBallIcon";
import { useDeviceType } from "@/shared/tools";
import * as BallModel from "./../model";
import * as levelModel from "@/widgets/PlinkoLevelsBlock/model";
import useSound from "use-sound";
import clsx from "clsx";

interface PlinkoBallProps {
  path: boolean[];
  setAnimationFinished: any;
}

export const PlinkoBall: FC<PlinkoBallProps> = (props) => {
  const ballRef = useRef<HTMLDivElement>(null);
  const pickedRows = useStore($pickedRows);
  const [ball, setBall] = useUnit([BallModel.$arrayStore, BallModel.setBolls]);

  const [playDing, { stop: stopDing }] = useSound(
    "/static/media/games_assets/plinko/plinkoDing.mp3",
    { volume: 0.4, loop: false }
  );

  // console.log("store: ", arrStore);
  const [ballTop, setBallTop] = useState<number>(-90); // starting position top/Y
  const [ballLeft, setBallLeft] = useState<number>(0); // starting position left/X
  const [pathIndex, setPathIndex] = useState<number>(-2);
  const device = useDeviceType();

  useEffect(() => {
    function simulatePlinkoResult() {
      let position = 0;
      let x = ballLeft;

      for (let i = 0; i < props.path.length; i++) {
        if (props.path[i]) {
          x++;
        } else {
          x--;
        }

        const y = -x * -x;

        if (y >= 0) {
          position = Math.floor((x + pickedRows) / 2);
        }
      }

      return position;
    }

    const result = simulatePlinkoResult();
    setTimeout(() => {
      setBall(result);
    }, pickedRows * 215);
  }, [props.path]);

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
          // console.log("TEXT");
          await sleep(200);
          // console.log("TEXT1");
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
    <>
      {pathIndex < props.path.length ? (
        <div
          className={styles.plinko_ball}
          ref={ballRef}
          style={{
            top: `${ballTop}px`,
            left: `calc(50% + ${ballLeft}px)`,
            transition: ballLeft == 0 ? "" : "all 0.2s linear",
          }}
        >
          <PlinkoBallIcon />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

interface IPlinkoPyramid {
  path: boolean[][] | undefined;
}

export const PlinkoPyramid: FC<IPlinkoPyramid> = (props) => {
  const [ball, setBolls] = useUnit([BallModel.$arrayStore, BallModel.setBolls]);
  const [itemArr, setItemArr] = useState([]);
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
    // console.log("path, animation finished", props.path, animationFinished);
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
        // console.log("Changing path", pathIndex);
        setAnimationFinished(false);
        setBalls([
          ...balls,
          <PlinkoBall
            path={props.path[pathIndex]}
            setAnimationFinished={setAnimationFinished}
            key={pathIndex.toString()}
          />,
        ]);
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
    const easyMultipliersArray = newMultipliers.easyMultipliers[rowCount];
    const normalMultipliersArray = newMultipliers.normalMultipliers[rowCount];
    const hardMultipliersArray = newMultipliers.hardMultipliers[rowCount];

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
    // console.log("sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf", pickedRows);
  }, [pickedRows, currentLevel]);

  useEffect(() => {
    setRowCount(pickedRows);

    // console.log("PICKED VALUE", pickedRows);
  }, [pickedRows]);

  const [multipliersSteps, setMultipliersSteps] = useState<number>(
    countMultipliersSteps(multipliers.length)
  );

  // Стилизация Кубиков со значениями
  function countMultipliersSteps(length: number): number {
    return (length - 1) / 2;
  }

  useEffect(() => {
    setMultipliersSteps(countMultipliersSteps(multipliers.length));
  }, [multipliers.length]);

  const [animationDelay, setAnimaitionDelay] = useState(false);
  // alert(animationFinished);
  useEffect(() => {
    setTimeout(() => {
      setAnimaitionDelay(animationFinished);
    }, pickedRows * 215);
  }, [animationFinished]);
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

    // Назначение цветов
    interface InterfaceMultipliersColor {
      r: number;
      g: number;
      b: number;
    }
    // rgba(205, 93, 33, 1) rgba(255, 170, 92, 1)
    const multipliersColorCenter: string = "rgba(255, 170, 92, 1)"; // вот цвета. Крайние и центральный. Надо, чтобы обязательно затемнялись. На высветвление надо другое делать
    const multipliersColorStart: InterfaceMultipliersColor = {
      r: 205,
      g: 93,
      b: 33, // это тоже цвета
    };
    const multipliersColorEnd: InterfaceMultipliersColor = {
      r: 255,
      g: 170,
      b: 92,
    };
    // Высчитывание цвета на один шаг
    const calcMultipliersColor: InterfaceMultipliersColor = {
      r: (multipliersColorEnd.r - multipliersColorStart.r) / multipliersSteps,
      g: (multipliersColorEnd.g - multipliersColorStart.g) / multipliersSteps,
      b: (multipliersColorEnd.b - multipliersColorStart.b) / multipliersSteps,
    };

    function multipliersBackground(i: number): string {
      if (i !== multipliersSteps) {
        if (i / (multipliersSteps / 2) < 2) {
          const formula: number = calcMultipliersColor.r * (i + 1);
          return `rgb(${multipliersColorStart.r + formula}, ${
            multipliersColorStart.g + formula
          }, ${multipliersColorStart.b + formula})`;
        } else if (i / (multipliersSteps / 2) > 2) {
          const formula: number =
            calcMultipliersColor.r * (multipliersSteps * 2 + 1 - i);
          return `rgb(${multipliersColorStart.r + formula}, ${
            multipliersColorStart.g + formula
          }, ${multipliersColorStart.b + formula})`;
        }
      }
      return multipliersColorCenter;
    }
    // console.log("11111,", arrStore);
    const multiplierElements = multipliers.map((value, i) => {
      return (
        <div
          className={clsx(
            styles.multipiler_cell,
            ball === i && !animationDelay && styles.multipiler_cell_animated
          )}
          key={i}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="24"
            viewBox="0 0 34 24"
            fill="none"
          >
            <path
              style={{ transition: "all 0.5s" }}
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M27.7339 0C24 2.08113 21.0414 2.08113 17 2.08113C12.9586 2.08113 10 2.08113 6.82225 0H0V24H34V0H27.7339Z"
              fill={
                ball === i && !animationDelay
                  ? "#000"
                  : multipliersBackground(i)
              } //
            />
          </svg>
          <span style={{ color: "red" }}>{value}x</span>
        </div>
      );
    });
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
      {path && (
        <div className={styles.plinko_ball_container}>
          {/* <PlinkoBall
            path={path}
            setAnimationFinished={setAnimationFinished}
          /> */}
          {balls}
        </div>
      )}
    </div>
  );
};
