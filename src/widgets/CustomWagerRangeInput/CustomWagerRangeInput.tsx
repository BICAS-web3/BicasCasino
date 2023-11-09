import { FC, useEffect } from "react";
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
  const [pickedValue, pickValue] = useUnit([
    inputType == CustomWagerRangeInputModel.RangeType.Bets
      ? CustomWagerRangeInputModel.$pickedValue
      : CustomWagerRangeInputModel.$pickedRows,
    inputType == CustomWagerRangeInputModel.RangeType.Bets
      ? CustomWagerRangeInputModel.pickValue
      : CustomWagerRangeInputModel.pickRows,
  ]);

  useEffect(() => {
    pickValue(min);
  }, []);

  const changeInputValue = (e: any) => {
    pickValue(Number(e.target.value));
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--track-width",
      `${(pickedValue / max) * 100}%`
    );
  }, [pickedValue]);

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
          />
        </div>
        <span className={s.custom_range_input_max_value}>{max}</span>
      </div>
      <div className={s.custom_range_setter}>
        {[15, 25, 50, 100].map((val) => (
          <div
            className={s.custom_range_setter_item}
            onClick={() => pickValue(val)}
            key={val}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};
