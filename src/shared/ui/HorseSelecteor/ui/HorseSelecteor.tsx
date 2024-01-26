import { FC } from "react";
import clsx from "clsx";

import s from "./styles.module.scss";
import { useUnit } from "effector-react";

import * as RaceModel from "@/widgets/Race/model";

export interface HorseSelecteorProps {
  className?: string;
}

export const HorseSelecteor: FC<HorseSelecteorProps> = ({ className }) => {
  const [raceNumber, setRaceNumber] = useUnit([
    RaceModel.$raceNumber,
    RaceModel.setRaceNumber,
  ]);
  return (
    <div className={clsx(s.horse_selecteor, className)}>
      <h3 className={s.horse_selecteor_title}>Horse number</h3>
      <div className={s.horse_selecteor_body}>
        {[1, 2, 3, 4, 5].map((el) => (
          <span
            onClick={() => setRaceNumber(el - 1)}
            className={clsx(
              s.horse_selecteor_item,
              raceNumber === el - 1 && s.horse_selecteor_item_active
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
