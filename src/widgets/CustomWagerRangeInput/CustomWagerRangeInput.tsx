import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";

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
  const [value, setValue] = useState(5);

  const changeInputValue = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--track-width",
      `${(value / max) * 100}%`
    );
  }, [value]);

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
          />
        </div>
        <span className={s.custom_range_input_max_value}>10</span>
      </div>
    </div>
  );
};
