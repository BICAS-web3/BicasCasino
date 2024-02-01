import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import s from "./styles.module.scss";
import { WagerLowerBtnsBlock } from "../WagerLowerBtnsBlock/WagerLowerBtnsBlock";
import clsx from "clsx";
import closeIco from "@/public/media/dice_icons/dice_close.svg";
import swapIco from "@/public/media/dice_icons/dice_swap.svg";
import rangeStyles from "@/widgets/Dice/styles.module.scss";
import { useUnit } from "effector-react";
import * as GraphRangeSetting from "./model";

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

  const [timeArr, setTimeArr] = useState(["00:01", "00:02"]);

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

  return (
    <div className={s.graph_game_container}>
      <WagerLowerBtnsBlock game="graph" text={"graph"} />
      <div className={s.graph_game_body}>
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
