import { FC } from "react";
import clsx from "clsx";

import s from "./styles.module.scss";
import { useUnit } from "effector-react";

import * as HouresModel from "@/widgets/Hourse/model";

export interface HourseSelecteorProps {
  className?: string;
}

export const HourseSelecteor: FC<HourseSelecteorProps> = ({ className }) => {
  const [hourseNumber, setHourseNumber] = useUnit([
    HouresModel.$hourseNumber,
    HouresModel.setHourseNumber,
  ]);
  return (
    <div className={clsx(s.hourse_selecteor, className)}>
      <h3 className={s.hourse_selecteor_title}>Horse number</h3>
      <div className={s.hourse_selecteor_body}>
        {[1, 2, 3, 4, 5].map((el) => (
          <span
            onClick={() => setHourseNumber(el)}
            className={clsx(
              s.hourse_selecteor_item,
              hourseNumber === el && s.hourse_selecteor_item_active
            )}
            key={el}
          >
            {el}
          </span>
        ))}
      </div>
    </div>
  );
};
