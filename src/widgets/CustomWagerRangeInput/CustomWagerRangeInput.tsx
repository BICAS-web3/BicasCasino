import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { CustomWagerRangeInputModel } from "./";

import s from "./styles.module.scss";

interface CustomWagerRangeInputProps {
  inputTitle: string;
  min: number;
  max: number;
  inputType?: CustomWagerRangeInputModel.RangeType;
}

export const CustomWagerRangeInput: FC<CustomWagerRangeInputProps> = ({
  inputTitle,
  min,
  max,
  inputType,
}) => {
  const [value, setValue] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [pickedValue, pickValue] = useUnit([
    inputType == CustomWagerRangeInputModel.RangeType.Bets
      ? CustomWagerRangeInputModel.$pickedValue
      : CustomWagerRangeInputModel.$pickedRows,
    inputType == CustomWagerRangeInputModel.RangeType.Bets
      ? CustomWagerRangeInputModel.pickValue
      : CustomWagerRangeInputModel.pickRows,
  ]);

  // useEffect(() => {
  //   // pickPlinkoRows(8);
  //   setValue(min);
  // }, []);

  // useEffect(() => {
  //   if (inputType === "plinkoRows") {
  //     pickPlinkoRows(value);
  //   }
  // }, [value]);

  useEffect(() => {
    pickValue(min);
  }, []);

  const changeInputValue = (e: any) => {
    pickValue(Number(e.target.value));
  };

  const handleInputBtns = (val: any) => {
    pickValue(Number(val));
  };

  useEffect(() => {
    const newTrackWidth =
      pickedValue === min ? 0 : ((pickedValue - min) / (max - min)) * 100;
    setTrackWidth(newTrackWidth);
    console.log("trackWidth---", trackWidth);
  }, [pickedValue]);

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
        <span className={s.custom_range_input_active_value}>{pickedValue}</span>
        <div className={s.custom_range_input_body}>
          <input
            type="range"
            className={`${s.custom_range_input} ${s.custom_range_track}`}
            value={pickedValue}
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
