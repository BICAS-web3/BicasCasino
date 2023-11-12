import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import * as PlinkoRowsM from "@/shared/ui/PlinkoPiramyd/model";

import s from "./styles.module.scss";

interface CustomWagerRangeInputProps {
  inputTitle: string;
  min: number;
  max: number;
  inputType?: any;
}

export const CustomWagerRangeInput: FC<CustomWagerRangeInputProps> = ({
  inputTitle,
  min,
  max,
  inputType,
}) => {
  const [value, setValue] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [pickPlinkoRows, rows] = useUnit([
    PlinkoRowsM.pickRows,
    PlinkoRowsM.$pickedRows,
  ]);

  useEffect(() => {
    pickPlinkoRows(8);
    setValue(min);
  }, []);

  useEffect(() => {
    if (inputType === "plinkoRows") {
      pickPlinkoRows(value);
    }
  }, [value]);

  const changeInputValue = (e: any) => {
    setValue(Number(e.target.value));
  };

  const handleInputBtns = (val: any) => {
    setValue(val);

    if (inputType === "plinkoRows") {
      pickPlinkoRows(val);
    }
  };

  useEffect(() => {
    const newTrackWidth =
      value === min ? 0 : ((value - min) / (max - min)) * 100;
    setTrackWidth(newTrackWidth);
  }, [value]);

  // const value = max / 4;
  const arrData =
    max > 25
      ? [15, 25, 50, max]
      : [
          min,
          Math.ceil(min + (max - min) / 4),
          ,
          Math.ceil(min + (max - min) / 2),
          max,
        ];
  return (
    <div className={s.custom_range_input_layout}>
      <h3 className={s.custom_range_input_title}>{inputTitle}</h3>
      <div className={s.custom_range_input_wrap}>
        <span className={s.custom_range_input_active_value}>{value}</span>
        <div className={s.custom_range_input_body}>
          <input
            type="range"
            className={`${s.custom_range_input} ${s.custom_range_track}`}
            value={value}
            onChange={changeInputValue}
            max={max}
            min={min}
            style={{ "--sx": `${trackWidth}%` } as any}
          />
        </div>
        <span className={s.custom_range_input_max_value}>{max}</span>
      </div>
      <div className={s.custom_range_setter}>
        {arrData.map((val, i) => (
          <div
            className={s.custom_range_setter_item}
            onClick={() => handleInputBtns(val)}
            key={i}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};
