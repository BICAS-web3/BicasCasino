import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import * as GraphRangeSetting from "./model";
import { useUnit } from "effector-react";

import closeIco from "@/public/media/dice_icons/dice_close.svg";
import swapIco from "@/public/media/dice_icons/dice_swap.svg";

import rangeStyles from "@/widgets/Dice/styles.module.scss";

import { useMediaQuery } from "@/shared/tools";

import clsx from "clsx";
import s from "./styles.module.scss";

interface GraphGameProps {}

export const GraphGame: FC<GraphGameProps> = () => {
  const [coefficients, setCoefficients] = useState([
    1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4,
  ]);

  const rangeRef = useRef<HTMLInputElement>(null);

  const [rangeVal, setRangeVal] = useUnit([
    GraphRangeSetting.$RollValue,
    GraphRangeSetting.setRollValue,
  ]);

  const isMobile = useMediaQuery("(max-width:650px)");
  const [reachedPeak, setReachedPeak] = useState(false);
  const [timeArr, setTimeArr] = useState([
    "00:01",
    "00:02",
    "00:03",
    "00:04",
    "00:05",
    "00:06",
    "00:07",
    "00:08",
    "00:09",
    "00:10",
    "00:11",
    "00:12",
    "00:13",
    "00:14",
    "00:15",
    "00:16",
    "00:17",
    "00:18",
    "00:19",
    "00:20",
  ]);

  useEffect(() => {
    if (isMobile) {
      setTimeArr([
        "00:01",
        "00:02",
        "00:03",
        "00:04",
        "00:05",
        "00:06",
        "00:07",
        "00:08",
        "00:09",
        "00:10",
      ]);
    }
  }, [isMobile]);
  const [convexity, setConvexity] = useState(1);

  const onChange = (el: ChangeEvent<HTMLInputElement>) => {
    const number_value = Number(el.target.value.toString());

    setRangeVal(number_value);
  };
  useEffect(() => {
    const rangeElement = rangeRef.current;

    const newTrackWidth =
      rangeVal === 0.1 ? 0 : ((rangeVal - 0.1) / (95 - 0.1)) * 100;

    rangeElement?.style.setProperty(
      "--range-width",
      `${rangeVal < 50 ? newTrackWidth + 1 : newTrackWidth}%`
    );
  }, [rangeVal]);

  const hex = "#808080";

  const [number, setNumber] = useState(0);
  const [curvePoints, setCurvePoints] = useState([{ x: 0, y: 0 }]);
  const [gameLoop, setGameLoop] = useState(null);
  const [crashed, setCrashed] = useState(false);
  const [betAmount, setBetAmount] = useState(1);
  const [profitsTaken, setProfitsTaken] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isCrashed, setIsCrashed] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [timeUnderPoint, setTimeUnderPoint] = useState<string[]>([]);
  useEffect(() => {
    const canvas = document.getElementById("game") as HTMLCanvasElement;
    const ctx = canvas!.getContext("2d");

    ctx!.lineWidth = 2;

    const updateCurve = (clear: boolean) => {
      if (clear) {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
      }
      let gradient = ctx!.createLinearGradient(canvas.width, 0, 0, 0);
      let gradient2 = ctx!.createLinearGradient(canvas.width, 0, 0, 0);

      if (isCrashed) {
        gradient.addColorStop(0, "rgba(255,255,255,0.6)");
        gradient.addColorStop(1, "rgba(128,128,128,1)");
        gradient2.addColorStop(0, "rgba(255,255,255,0.6)");
        gradient2.addColorStop(1, "rgba(128,128,128,1)");
      } else {
        gradient.addColorStop(0, "rgba(255, 77, 0, 0.5)");
        gradient.addColorStop(1, "rgba(0, 255, 255, 0.5)");
        gradient2.addColorStop(0, "rgba(255, 77, 0, 1)");
        gradient2.addColorStop(1, "rgba(0, 255, 255, 1)");
      }

      ctx!.beginPath();
      ctx!.moveTo(0, canvas.height);
      for (let i = 0; i < curvePoints.length; i++) {
        const { x, y } = curvePoints[i];
        ctx!.lineTo(x, y);
      }

      ctx!.strokeStyle = gradient2;
      ctx!.lineWidth = 3;
      ctx!.stroke();

      ctx!.fillStyle = gradient;
      ctx!.lineTo(curvePoints[curvePoints.length - 1].x, canvas.height);
      ctx!.lineTo(0, canvas.height);
      ctx!.closePath();
      ctx!.fill();
      const lastPoint = curvePoints[curvePoints.length - 1];
      ctx!.fillStyle = gradient2;
      ctx!.beginPath();
      ctx!.arc(lastPoint.x, lastPoint.y, 5, 0, Math.PI * 2);
      ctx!.fill();
      if (reachedPeak) {
        setConvexity((prev) => prev + 1);
        const lastPoint = curvePoints[curvePoints.length - 1];
        const newX = lastPoint.x + Math.random() * 3 - 1;
        const newY = lastPoint.y + Math.random() * 3 - 1;

        ctx!.beginPath();
        ctx!.arc(newX, newY, 5, 0, Math.PI * 2);
        ctx!.fill();
      }
    };
    const updateCurvePoints = () => {
      convexity * 1.01;
      const lastPoint = curvePoints[curvePoints.length - 1];
      const parentWidth = canvas.width;
      const parentHeight = canvas.height;
      const newX = lastPoint.x + 1;

      const newY =
        parentHeight -
        Math.min(
          ((parentHeight / parentWidth) * newX * newX * convexity) /
            canvas.width,
          parentHeight
        );
      if (newX >= canvas.width - 5) {
        setReachedPeak(true);
        setCrashed(true);
        return;
      }
      setCurvePoints([...curvePoints, { x: newX, y: newY }]);
    };

    const startGame = () => {
      setCurvePoints([{ x: 0, y: canvas.height }]);
    };

    const getRandomCrashTime = (min: any, max: any) => {
      const randomDecimal = Math.random();
      const randomNumber = randomDecimal * (max - min) + min;
      return randomNumber * 1000;
    };

    const crashCurve = (betAmount: any) => {
      clearInterval(gameLoop as any);
      const crashValue = curvePoints.length / 100;
      console.log(`Multiplier at crash: ${crashValue}`);
      setCrashed(true);
    };

    if (isCrashed) {
      setTimeout(() => {
        // crashCurve(betAmount);
        // updateCurvePoints();
        updateCurve(false);
      }, 0);
    }
    const loop = setInterval(() => {
      updateCurvePoints();
      updateCurve(true);
    }, 10); // ! duration
    if (balance > 0) {
      startGame();
      setGameLoop(loop as any);

      setTimeout(() => {
        crashCurve(betAmount);
      }, 0);
    }

    return () => {
      clearInterval(loop);
    };
  }, [curvePoints, isCrashed, betAmount, balance, number, reachedPeak]);
  useEffect(() => {
    let increaseCoeffssss: any = null;

    if (reachedPeak) {
      increaseCoeffssss = setInterval(
        () => {
          setCoefficients((prev) => {
            const lastCoef = prev[prev.length - 1] * 1.12;
            return [...prev.slice(1), lastCoef];
          });
        },
        coefficients[coefficients.length - 1] > 10 ? 2000 : 1500
      );
    }

    if (isCrashed) {
      clearInterval(increaseCoeffssss);
    }

    return () => {
      clearInterval(increaseCoeffssss);
    };
  }, [reachedPeak, isCrashed]);

  const handleSubmitBet = () => {
    setBalance(5);
    setCrashed(false);
    setProfitsTaken(false);
  };

  const handleTakeProfits = () => {
    if (!crashed && !profitsTaken) {
      setProfitsTaken(true);
      console.log(
        `Took profits, multiplier: ${curvePoints.length / 100}, profit: ${
          betAmount * (curvePoints.length / 100) - betAmount
        }`
      );
      setBalance(
        parseFloat(
          (betAmount * (curvePoints.length / 100) + balance).toFixed(2)
        )
      );
    } else if (profitsTaken) {
      console.log("Profits already taken");
    }
  };
  const canvasRef = useRef(null);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const parent = (canvas as any).parentElement;

      (canvas as any).width = parent.clientWidth;

      const maxHeight = Math.max(
        parent.clientHeight,
        curvePoints[curvePoints.length - 1]?.y || 0
      );

      (canvas as any).height = maxHeight;
      (canvas as any).height = parent.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);
  return (
    <div
      onClick={() => {
        setNumber((prev) => prev + 1);
        setBalance(1);
        setIsCrashed(true);
      }}
      className={s.graph_game_container}
    >
      <div className={s.graph_game_body}>
        <div className={s.graph_coef}>2.43x</div>
        <div className={s.graph_table}>
          <div className={s.graph_table_ox_lines}>
            {/* <div className={s.s}></div> */}
            <div className={s.ax_line}>
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100%" height="100%" />
              </svg>
            </div>
            {coefficients &&
              coefficients.map((line, ind) => (
                <div className={s.ax_line}>
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="100%" height="100%" />
                  </svg>
                </div>
              ))}
          </div>

          <canvas
            className={s.canvas}
            // key={number}
            id="game"
            ref={canvasRef}
          ></canvas>

          <div onClick={handleSubmitBet} className={s.submitBetButton}>
            Start Game
          </div>
          <div onClick={handleTakeProfits} className={s.takeProfitsButton}>
            Take Profits
          </div>
          <div className={s.graph_table_ay}>
            <span className={s.cf_title}>0</span>
            {coefficients &&
              coefficients.map((cf, ind) => (
                <span className={clsx(s.cf_title, s.cf_title_line)} key={ind}>
                  {cf.toFixed(1)}x
                </span>
              ))}
          </div>
          <div className={s.graph_table_ax}>
            {timeArr &&
              timeArr.map((time, ind) => (
                <span className={s.graph_time_title} key={ind}>
                  {time}
                </span>
              ))}
          </div>
        </div>
        <div className={s.total_container}>
          <span className={s.total_won}>0.00</span>
          <span className={s.total_lost}>0.00</span>
          <div className={s.total_title}>
            Total:&nbsp;
            <span className={s.total_profit}>0</span>
          </div>
        </div>
        <div className={s.range_wrapper}>
          <div className={rangeStyles.range_container}>
            <span className={rangeStyles.roll_range_value}>{rangeVal}</span>
            <span className={rangeStyles.roll_range_min}>{0.1}</span>
            <div className={rangeStyles.custom_range_input_body}></div>
            <input
              className={clsx(rangeStyles.dice_range, rangeStyles.dice_over)}
              type="range"
              min={0.1}
              max={95}
              value={rangeVal}
              onChange={onChange}
              ref={rangeRef}
              step={0.1}
              // style={{ "--range": `${trackWidth}%` } as any}
            />
            <span className={rangeStyles.roll_range_max}>{95}</span>
          </div>
        </div>
      </div>
      <div className={s.graph_chances_block}>
        <div className={s.graph_multiplier_block}>
          <span className={s.graph_stats_title}>Multiplier</span>
          <div className={s.graph_multiplier}>
            <span className={s.graph_stats_current_title}>1.98</span>
            <img
              src={closeIco.src}
              className={s.clear_multiplier_btn}
              alt="static-close"
            />
          </div>
        </div>
        <div className={s.graph_rollUnder_block}>
          <span className={s.graph_stats_title}>Roll under</span>
          <div className={s.graph_rollUnder}>
            <span className={s.graph_stats_current_title}>50</span>
            <div className={s.swap_rollUnder_btn}>
              <img src={swapIco.src} alt="static-close" />
            </div>
          </div>
        </div>
        <div className={s.graph_winChance_block}>
          <span className={s.graph_stats_title}>Win Change</span>
          <div className={s.graph_winChance}>
            <span className={s.graph_stats_current_title}>50</span>
            <span className={s.percent_title}>%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
{
  /* <ResponsiveContainer
            className={s.chart}
            width="100%"
            height="100%"
            key={number}
          >
            <AreaChart data={data}>
              <defs>
                <linearGradient id="gradientId" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(255, 77, 0, 0.5)" />
                  <stop offset="100%" stopColor="rgba(0, 255, 255, 0.5)" />
                </linearGradient>
                <linearGradient id="gradientId2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(255, 77, 0, 1)" />
                  <stop offset="100%" stopColor="rgba(0, 255, 255, 1)" />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="uv"
                fill="url(#gradientId)"
                stroke="url(#gradientId2)"
                strokeWidth={3}
                animationDuration={20000}
                animationEasing="linear"
              />
              <ReferenceDot
                x={data[data.length - 1].x}
                y={data[data.length - 1].uv}
                r={5}
                alwaysShow
                ifOverflow="extendDomain"
                // alignmentBaseline="after-edge"
                // width={5}
                // height={5}
                fill="#111"
              />
              <XAxis dataKey="x" hide />
              <ReferenceDot
                x={data[data.length - 1].x}
                y={data[data.length - 1].uv}
                r={5}
                // fill="red"
                alwaysShow
                alignmentBaseline="after-edge"
                width={5}
                height={5}
                // color="red"
              />
            </AreaChart>
          </ResponsiveContainer> */
}

// let lastPoint;
// if (!crashed) {
//   lastPoint = curvePoints[curvePoints.length - 1];
//   ctx.font = "30px Arial";
//   ctx.fillText("🚀", lastPoint.x, lastPoint.y - 10);
// } else {
//   lastPoint = curvePoints[curvePoints.length - 1];
//   const crashPosition = { x: lastPoint.x, y: lastPoint.y - 10 };
//   ctx.font = "30px Arial";
//   ctx.fillText("💥", crashPosition.x, crashPosition.y);
// }

// const canvasRef = useRef<HTMLCanvasElement>(null);
// const [multiplier, setMultiplier] = useState(1);
// useEffect(() => {
//   const updateMultiplier = () => {
//     if (multiplier < 100) {
//       setMultiplier(multiplier + 1);
//     }
//   };

//   const intervalId = setInterval(updateMultiplier, 1000); // Update every second

//   return () => clearInterval(intervalId);
// }, [multiplier]);

// useEffect(() => {
//   const canvas = canvasRef.current;
//   const context = canvas.getContext("2d");

//   if (context) {
//     // Clear canvas
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw the crash graph based on the multiplier
//     const graphHeight = canvas.height - 20;
//     const crashPoint = (multiplier / 100) * canvas.width;

//     // Draw the crash point line
//     context.beginPath();
//     context.moveTo(600, 0);
//     context.lineTo(crashPoint, graphHeight);
//     context.strokeStyle = "red";
//     context.lineWidth = 2;
//     context.stroke();

//     // Draw the multiplier graph line
//     context.beginPath();
//     context.moveTo(0, graphHeight);
//     context.lineTo(canvas.width, graphHeight);
//     context.strokeStyle = "green";
//     context.lineWidth = 2;
//     context.stroke();
//   }
// }, [multiplier]);

// useEffect(() => {
//   const interval = setInterval(() => {
//     // setNumber((prev) => prev + 1);
//     setCurrentCoefficient(coefficients[number]);
//   }, 2000);

//   return () => clearInterval(interval);
// }, [number, coefficients]);
// const data = [
//   { x: -5, uv: 0 },
//   { x: -4, uv: 0.1 },
//   { x: -3, uv: 0.3 },
//   { x: -2, uv: 0.6 },
//   { x: -1, uv: 1 },
// ];

// const gradientId = "gradientId";
