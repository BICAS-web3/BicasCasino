import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { useUnit } from "effector-react";
import { CustomWagerRangeInputModel } from "./";

interface CustomWagerRangeInputProps {
  inputTitle: string;
  min: number;
  max: number;
}

export const CustomWagerRangeInput: FC<CustomWagerRangeInputProps> = ({
  inputTitle,
  min,
  max,
}) => {
  //const [value, setValue] = useState(5);
  const [pickedValue, pickValue] = useUnit([
    CustomWagerRangeInputModel.$pickedValue,
    CustomWagerRangeInputModel.pickValue,
  ]);

  useEffect(() => {
    pickValue(min);
  }, []);

  const changeInputValue = (e: any) => {
    pickValue(Number(e.target.value));
  };

  useEffect(() => {
    const rangeWidthPercentage = ((pickedValue - min) / (max - min)) * 100;
    document.documentElement.style.setProperty(
      "--track-width",
      `${rangeWidthPercentage}%`
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
    </div>
  );
};
