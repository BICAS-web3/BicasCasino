import { FC } from "react";

import styles from "./styles.module.scss";
import clsx from "clsx";

export interface ManualSettingProps {
  setValue: (el: "MANUAL" | "AUTO") => void;
  value: string;
  className?: string;
}

export const ManualSetting: FC<ManualSettingProps> = ({
  className,
  value,
  setValue,
}) => {
  return (
    <div className={clsx(styles.manual_btns, className)}>
      <button
        onClick={() => setValue("MANUAL")}
        className={clsx(
          styles.manual_btn,
          value === "MANUAL" && styles.manual_btn_active
        )}
      >
        Manual
      </button>
      <button
        onClick={() => setValue("AUTO")}
        className={clsx(
          styles.manual_btn,
          value === "AUTO" && styles.manual_btn_active
        )}
      >
        Auto
      </button>
    </div>
  );
};
