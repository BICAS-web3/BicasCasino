import { FC, useState } from "react";
import s from "./styles.module.scss";
import clsx from "clsx";
import * as BJModel from "@/widgets/BlackJackGame/model";
import { useUnit } from "effector-react";

interface BjPickerProps {}

export const BjPicker: FC<BjPickerProps> = () => {
  const [insurance, setInsurance] = useState(false); // если у дилера первая карта - туз
  const [setActiveStep, activeStep] = useUnit([
    BJModel.setActiveStep,
    BJModel.$activeStep,
  ]);

  return (
    <div className={s.bj_picker_wrap}>
      <div className={s.bj_picker_block}>
        {["Hit", "Stand", "Split", "Double"].map((el) => (
          <button
            onClick={() => setActiveStep(el as BJModel.bjStep)}
            className={clsx(
              s.bj_picker_btn,
              s.btn_disabled,
              activeStep === el && s.btn_active
            )}
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  );
};
