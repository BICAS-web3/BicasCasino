import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./ui.module.scss";
import {
  $pickedValue,
  $pickedRows,
} from "@/widgets/CustomWagerRangeInput/model";
import { useStore, useUnit } from "effector-react";
import { newMultipliers } from "@/shared/ui/PlinkoPiramyd/multipliersArrays";
import { PlinkoBallIcon } from "@/shared/SVGs/PlinkoBallIcon";
import { useDeviceType, useMediaQuery } from "@/shared/tools";
import * as BallModel from "./../model";
import * as levelModel from "@/widgets/PlinkoLevelsBlock/model";
import useSound from "use-sound";
import clsx from "clsx";
import { parabolaCoefs } from "./parabolaCoefs";
import { randInt } from "three/src/math/MathUtils.js";

// interface PlinkoBallProps {
//   path: boolean[];
//   setAnimationFinished: any;
//   index: number;
// }

// export const PlinkoBall: FC<PlinkoBallProps> = (props) => {
//   const isDesktop = useMediaQuery("(max-width: 1200px)");
//   const ballRef = useRef<HTMLDivElement>(null);
//   const pickedRows = useStore($pickedRows);
//   const [ball, setBall] = useUnit([BallModel.$arrayStore, BallModel.setBolls]);

//   const [playDing, { stop: stopDing }] = useSound(
//     "/static/media/games_assets/plinko/plinkoDing.mp3",
//     { volume: 0.4, loop: false }
//   );

//   const [ballTop, setBallTop] = useState<number>(-90); // starting position top/Y
//   const [ballLeft, setBallLeft] = useState<number>(0); // starting position left/X
//   const [pathIndex, setPathIndex] = useState<number>(-2);
//   const device = useDeviceType();

//   useEffect(() => {
//     // if()
//     function simulatePlinkoResult() {
//       let position = 0;
//       let x = ballLeft;

//       for (let i = 0; i < props.path.length; i++) {
//         if (props.path[i]) {
//           x++;
//         } else {
//           x--;
//         }

//         const y = -x * -x;

//         if (y >= 0) {
//           position = Math.floor((x + pickedRows) / 2);
//         }
//       }

//       return position;
//     }

//     const result = simulatePlinkoResult();
//     setTimeout(() => {
//       setBall({ value: result, index: props.index });
//     }, pickedRows * (isDesktop ? 210 : 215));
//   }, [props.path]);

//   let lastMove = 0;
//   let firstMove = 0;
//   let movingDeep = 0;
//   let sidesMove = 0;

//   useEffect(() => {
//     if (device) {
//       if (device == "bigTablet") {
//         setBallLeft(-5);
//         movingDeep = 15;
//         firstMove = -9;
//         lastMove = 11;
//         sidesMove = 13;
//       } else if (device == "main") {
//         setBallLeft(-10);
//         firstMove = -11;
//         movingDeep = 26;
//         lastMove = 26;
//         sidesMove = 17.5;
//       } else {
//         setBallLeft(-4);
//         firstMove = -10;
//         movingDeep = 11;
//         lastMove = 5;
//         sidesMove = 9;
//       }
//     }
//   }, [device]);

//   useEffect(() => {
//     if (!device) {
//       return;
//     }
//     if (device === "bigTablet") {
//       movingDeep = 15;
//       firstMove = -9;
//       lastMove = 11;
//       sidesMove = 13;
//     } else if (device === "main") {
//       firstMove = -11;
//       movingDeep = 26;
//       lastMove = 26;
//       sidesMove = 17.5;
//     } else {
//       firstMove = -10;
//       movingDeep = 11;
//       lastMove = 5;
//       sidesMove = 9;
//     }

//     if (pathIndex >= props.path.length) {
//       setBallTop(ballTop + lastMove); // last movement to the basket
//       //props.setAnimationFinished(true);
//       return;
//     }

//     const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
//     const run = async () => {
//       // main body of the loop
//       if (pathIndex < 0) {
//         if (pathIndex == -1) {
//           playDing();
//           //await sleep(200);
//           setBallTop(firstMove); // first movement from the starting position
//           setPathIndex(pathIndex + 1);
//         } else if (pathIndex == -2) {
//           await sleep(200);
//           setPathIndex(pathIndex + 1);
//         }
//       } else {
//         if (pathIndex == 1) {
//           props.setAnimationFinished(true);
//         }
//         playDing();
//         const point = props.path[pathIndex];
//         setBallTop(ballTop + movingDeep);
//         if (point) {
//           setBallLeft(ballLeft + sidesMove);
//         } else {
//           setBallLeft(ballLeft - sidesMove);
//         }
//         await sleep(200); // animation length
//         setPathIndex(pathIndex + 1);
//       }
//     };
//     run();
//   }, [pathIndex, device]);

//   return (
//     <>
//       {pathIndex < props.path.length ? (
//         <div
//           className={styles.plinko_ball}
//           ref={ballRef}
//           style={{
//             top: `${ballTop}px`,
//             left: `calc(50% + ${ballLeft}px)`,
//             transition: ballLeft == 0 ? "" : "all 0.2s linear",
//           }}
//         >
//           <PlinkoBallIcon />
//         </div>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };



function genParabolaMovements(path: boolean[], screen: string, startingTop: number) {
  var x: number = 0;
  var y: number = 0;

  const coefs = parabolaCoefs[screen] ? parabolaCoefs[screen] : parabolaCoefs['other'];
  //console.log(screen, coefs);

  let yStep = Math.abs(coefs[16] - startingTop);
  let xStep = 0;

  if (screen == 'main' || screen == "laptop") {
    xStep = 1;
  } else if (screen == "bigTablet") {
    xStep = 0.764;
  } else {
    xStep = 0.529;
  }

  var to_return: any[] = [];
  for (var p of path) {
    //console.log(y, coefs[16] + y);
    if (p) {
      to_return.push([
        {
          transform: `translate(${(xStep * 1) + x}px, ${coefs[0] + y}px)`
        },
        {
          transform: `translate(${(xStep * 2) + x}px, ${coefs[1] + y}px)`
        },
        {
          transform: `translate(${(xStep * 3) + x}px, ${coefs[2] + y}px)`
        },
        {
          transform: `translate(${(xStep * 4) + x}px, ${coefs[3] + y}px)`
        },
        {
          transform: `translate(${(xStep * 5) + x}px, ${coefs[4] + y}px)`
        },
        {
          transform: `translate(${(xStep * 6) + x}px, ${coefs[5] + y}px)`
        },
        {
          transform: `translate(${(xStep * 7) + x}px, ${coefs[6] + y}px)`
        },
        {
          transform: `translate(${(xStep * 8) + x}px, ${coefs[7] + y}px)`
        },
        {
          transform: `translate(${(xStep * 9) + x}px, ${coefs[8] + y}px)`
        },
        {
          transform: `translate(${(xStep * 10) + x}px, ${coefs[9] + y}px)`
        },
        {
          transform: `translate(${(xStep * 11) + x}px, ${coefs[10] + y}px)`
        },
        {
          transform: `translate(${(xStep * 12) + x}px, ${coefs[11] + y}px)`
        },
        {
          transform: `translate(${(xStep * 13) + x}px, ${coefs[12] + y}px)`
        },
        {
          transform: `translate(${(xStep * 14) + x}px, ${coefs[13] + y}px)`
        },
        {
          transform: `translate(${(xStep * 15) + x}px, ${coefs[14] + y}px)`
        },
        {
          transform: `translate(${(xStep * 16) + x}px, ${coefs[15] + y}px)`
        },
        {
          transform: `translate(${(xStep * 17) + x}px, ${coefs[16] + y}px)`
        },
      ]);
      x += (xStep * 17);
    } else {
      to_return.push([
        {
          transform: `translate(${x - (xStep * 1)}px, ${coefs[0] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 2)}px, ${coefs[1] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 3)}px, ${coefs[2] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 4)}px, ${coefs[3] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 5)}px, ${coefs[4] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 6)}px, ${coefs[5] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 7)}px, ${coefs[6] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 8)}px, ${coefs[7] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 9)}px, ${coefs[8] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 10)}px, ${coefs[9] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 11)}px, ${coefs[10] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 12)}px, ${coefs[11] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 13)}px, ${coefs[12] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 14)}px, ${coefs[13] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 15)}px, ${coefs[14] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 16)}px, ${coefs[15] + y}px)`
        },
        {
          transform: `translate(${x - (xStep * 17)}px, ${coefs[16] + y}px)`
        },
      ]);
      x -= (xStep * 17);
    }
    y += yStep;
  }

  return to_return;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

interface IPlinkoPyramid {
  path: boolean[][] | undefined;
  multipliers: number[];
  setMultipliers: (el: number[]) => void;
  ballsArr: { value: number; index: number }[];
  setBallsArr: any;
  middleC: number;
  inGame: boolean;
}

export const PlinkoPyramid: FC<IPlinkoPyramid> = (props) => {
  const isDesktop = useMediaQuery("(max-width: 1200px)");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [ball, setBolls] = useUnit([BallModel.$arrayStore, BallModel.setBolls]);
  const [itemArr, setItemArr] = useState([]);
  const pickedRows = 16//useStore($pickedRows);
  const [rowCount, setRowCount] = useState(pickedRows);
  // const [multipliers, setMultipliers] = useState<number[]>([]);
  const device = useDeviceType();

  const [currentLevel, setCurrentLevel] = useState("");

  const [animationFinished, setAnimationFinished] = useState<boolean>(true);
  const [pathIndex, setPathIndex] = useState<number>(0);
  const [path, setPath] = useState<boolean[] | undefined>(undefined);
  const [balls, setBalls] = useState<any[]>([]);
  const [ballsElements, setBallsElements] = useState<any[]>([]);

  const [ballTop, setBallTop] = useState<number>(-90); // starting position top/Y

  // const [ballsArr, setBallsArr] = useState<number[]>([]);

  let lastMove = 0;
  let [firstMove, setFirstMove] = useState<number>(0);
  let movingDeep = 0;
  let sidesMove = 0;
  const [ballLeft, setBallLeft] = useState<number>(0);

  useEffect(() => {
    if (ballLeft != 0) {
      console.log("balls", ballLeft);
      setBalls(props.path?.map((val, index) => {
        return <div
          id={`ball${index}`}
          className={styles.plinko_ball}
          //ref={ballRef}
          style={{
            top: `${ballTop}px`,
            left: `calc(50% + ${ballLeft}px)`,
            //transition: ballLeft == 0 ? "" : "all 0.2s linear",
          }}
        >
          <PlinkoBallIcon />
        </div>
      }) as any[]);
    }

  }, [props.path, ballLeft, device]);

  useEffect(() => {
    if (device) {
      console.log(device);
      if (device == "bigTablet") {
        setBallLeft(-4);
        movingDeep = 15;
        setFirstMove(81);
        lastMove = 11;
        sidesMove = 13;
      } else if (device == "main" || device == "laptop") {
        setBallLeft(-5);
        setFirstMove(85);
        movingDeep = 26;
        lastMove = 26;
        sidesMove = 17.5;
      } else {
        setBallLeft(-3.5);
        setFirstMove(81);
        movingDeep = 11;
        lastMove = 5;
        sidesMove = 9;
      }
    }
  }, [device]);

  useEffect(() => {
    if (balls && balls.length > 0 && props.path && device) {
      //console.log("Anim", balls);
      // const ballTiming = {
      //   duration: (800 * props.path[0].length) + 2,
      //   iterations: 1,
      //   easing: "ease-in",
      //   fill: "forwards" as any
      // };
      props.path?.map((val, index) => {
        const ball = document.querySelector(`#ball${index}`);
        //console.log("Ball", ball);
        let animation = [];

        const ballTiming = {
          duration: (400 * (props.path as any)[0].length) + 2,
          iterations: 1,
          easing: "ease-in",
          fill: "forwards" as any,
          delay: (400 + randInt(10, 50)) * index
        };

        animation.push({
          transform: `translate(0px, 0px)`
        });

        animation.push({
          transform: `translate(0px, ${firstMove}px)`
        });

        const anim = genParabolaMovements(val, device?.toString(), firstMove);

        for (var an of anim) {
          //console.log(an);
          for (var a of an) {
            animation.push(a);
          }
        }

        // for (var p of val) {

        //   // if (p) {
        //   //   for (var an of parabolaMovementRight) {
        //   //     animation.push(an);
        //   //   }
        //   // } else {
        //   //   for (var an of parabolaMovementLeft) {
        //   //     animation.push(an);
        //   //   }
        //   // }
        // }

        ball?.animate(animation, ballTiming);
      });
    }
  }, [balls]);

  const [level] = useUnit([levelModel.$level]);

  useEffect(() => {
    setCurrentLevel(level);
  }, [level]);

  const updateMultipliers = (rowCount: number, lvl: string) => {
    const easyMultipliersArray = newMultipliers.easyMultipliers[rowCount];
    const normalMultipliersArray = newMultipliers.normalMultipliers[rowCount];
    const hardMultipliersArray = newMultipliers.hardMultipliers[rowCount];

    if (lvl == "easy") {
      props.setMultipliers(easyMultipliersArray);
    } else if (lvl == "normal") {
      props.setMultipliers(normalMultipliersArray);
    } else if (lvl == "hard") {
      props.setMultipliers(hardMultipliersArray);
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
  }, [pickedRows]);

  const [multipliersSteps, setMultipliersSteps] = useState<number>(
    countMultipliersSteps(props.multipliers.length)
  );

  // Стилизация Кубиков со значениями
  function countMultipliersSteps(length: number): number {
    return (length - 1) / 2;
  }

  useEffect(() => {
    setMultipliersSteps(countMultipliersSteps(props.multipliers.length));
  }, [props.multipliers.length]);

  const [animationDelay, setAnimaitionDelay] = useState(false);
  // alert(animationFinished);
  useEffect(() => {
    setTimeout(() => {
      setAnimaitionDelay(animationFinished);
    }, pickedRows * (isDesktop ? 210 : 215));
  }, [animationFinished]);

  // useEffect(() => {
  //   alert(animationDelay);
  // }, [animationDelay]);

  const [resetColor, setResetColor] = useState(false);
  const [blueColor, setBlueColor] = useState<
    { value: boolean; index: number }[]
  >([]);
  function setAnimation(time: number) {
    const delay = time * 200;
    if (time === rowCount - 1) {
      setTimeout(() => {
        setBlueColor([]);
      }, (time + 1) * 200);
    }
    setTimeout(() => {
      setBlueColor((prev) => [...prev, { index: time, value: true }]);
    }, delay);
  }

  // alert(blueColor.length);
  useEffect(() => {
    let arr = Array.from({ length: rowCount });
    if (blueColor.length !== 0) {
      return;
    }
    {
      if (path || props.inGame) {
        arr.forEach((_, i) => setAnimation(i));
      }
    }
  }, [resetColor]);
  useEffect(() => {
    setResetColor((prev) => !prev);
  }, [path, rowCount, props.inGame]);

  useEffect(() => {
    let intervalId: any;

    if (props.inGame) {
      intervalId = setInterval(() => {
        setResetColor((prev) => !prev);
      }, 200);
    }

    return () => clearInterval(intervalId);
  }, [props.inGame]);

  const generateRows = () => {
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
      const dots = [];
      for (let j = 0; j < i + 3; j++) {
        dots.push(
          <span
            className={clsx(
              styles.dot,
              styles[`number_${i}`],
              blueColor[i]?.value && styles.dot_animation
            )}
            key={j}
          ></span>
        );
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
          return `rgb(${multipliersColorStart.r + formula}, ${multipliersColorStart.g + formula
            }, ${multipliersColorStart.b + formula})`;
        } else if (i / (multipliersSteps / 2) > 2) {
          const formula: number =
            calcMultipliersColor.r * (multipliersSteps * 2 + 1 - i);
          return `rgb(${multipliersColorStart.r + formula}, ${multipliersColorStart.g + formula
            }, ${multipliersColorStart.b + formula})`;
        }
      }
      return multipliersColorCenter;
    }
    const multiplierElements = props.multipliers.map((value, i) => {
      const middle = Math.ceil((props.middleC - 1) / 2);
      const matchToMiddle =
        i === middle ||
        i === middle + 1 ||
        i === middle + 2 ||
        i === middle - 1 ||
        i === middle - 2;
      return (
        <div
          className={clsx(
            styles.multipiler_cell,
            ball.value === i &&
            !animationDelay &&
            value > 1 &&
            styles.multipiler_cell_animated_positive,
            !animationDelay &&
            value < 1 &&
            styles.multipiler_cell_animated_negative
          )}
          key={i}
        >
          {isMobile ? (
            <svg
              width="17"
              height="30"
              viewBox="0 0 17 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                style={{ transition: "all 0.5s" }}
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.867 0C12 2.60142 10.5207 2.60142 8.5 2.60142C6.47928 2.60142 5 2.60142 3.41112 0H0V30H17V0H13.867Z"
                fill={
                  ball.value === i && !animationDelay
                    ? value > 1
                      ? "#20b22e"
                      : "#979797"
                    : multipliersBackground(i)
                } //
              />
            </svg>
          ) : (
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
                  ball.value === i && !animationDelay
                    ? value > 1
                      ? "#20b22e"
                      : "#979797"
                    : multipliersBackground(i)
                } //
              />
            </svg>
          )}
          <span
            className={clsx(matchToMiddle && styles.white_color)}
          // style={{ color: "red" }}
          >
            {value}x
          </span>
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
      {props.path && (
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
