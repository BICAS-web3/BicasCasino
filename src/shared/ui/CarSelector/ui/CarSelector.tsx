import { FC } from "react";
import s from "./styles.module.scss";
import clsx from "clsx";
import * as CarModel from "@/widgets/CarsRace/model";
import { useUnit } from "effector-react";

interface ICarSelector {
  className?: string;
}

export const CarSelector: FC<ICarSelector> = ({ className }) => {
  const [carNumber, setCarNumber] = useUnit([
    CarModel.$carNumber,
    CarModel.setCarNumber,
  ]);
  return (
    <div className={clsx(s.wrapper, className)}>
      <h3 className={s.title}>Car number</h3>
      <div className={s.btn_wrapper}>
        {[1, 2].map((el) => (
          <button
            onClick={() => setCarNumber(el as 1 | 2)}
            key={el}
            className={clsx(s.btn, el === carNumber && s.btn_active)}
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  );
};
