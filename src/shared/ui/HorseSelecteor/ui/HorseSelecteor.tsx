import { FC } from "react";
import clsx from "clsx";

import s from "./styles.module.scss";
import { useUnit } from "effector-react";

import * as HouresModel from "@/widgets/Horse/model";

export interface HorseSelecteorProps {
  className?: string;
}

export const HorseSelecteor: FC<HorseSelecteorProps> = ({ className }) => {
  const [HorseNumber, setHorseNumber] = useUnit([
    HouresModel.$HorseNumber,
    HouresModel.setHorseNumber,
  ]);
  return (
    <div className={clsx(s.Horse_selecteor, className)}>
      <h3 className={s.Horse_selecteor_title}>Horse number</h3>
      <div className={s.Horse_selecteor_body}>
        {[1, 2, 3, 4, 5].map((el) => (
          <span
            onClick={() => setHorseNumber(el - 1)}
            className={clsx(
              s.Horse_selecteor_item,
              HorseNumber === el - 1 && s.Horse_selecteor_item_active
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
