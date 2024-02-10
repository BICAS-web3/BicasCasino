import { FC, useState } from "react";
import s from "./styles.module.scss";
import clsx from "clsx";

interface BjPickerProps {}

export const BjPicker: FC<BjPickerProps> = () => {
  const [insurance, setInsurance] = useState(false); // если у дилера первая карта - туз

  return (
    <div className={s.bj_picker_wrap}>
      <div className={s.bj_picker_block}>
        <button className={clsx(s.bj_picker_btn, s.btn_disabled)}>Hit</button>
        <button className={clsx(s.bj_picker_btn, s.btn_disabled)}>Stand</button>
        <button className={clsx(s.bj_picker_btn, s.btn_disabled)}>Split</button>
        <button className={clsx(s.bj_picker_btn, s.btn_disabled)}>
          Double
        </button>
      </div>
    </div>
  );
};
