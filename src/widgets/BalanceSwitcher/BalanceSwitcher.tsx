import { FC } from "react";
import s from "./styles.module.scss";
import { useUnit } from "effector-react";
import * as BalanceSwitcherM from "./model";
import draxTokenIco from "@/public/media/payment/draxMiniIco.svg";
import bonusTokenIco from "@/public/media/payment/bonusCoin.svg";
import clsx from "clsx";

interface BalanceSwitcherProps {}

export const BalanceSwitcher: FC<BalanceSwitcherProps> = () => {
  const [isDrax, setDrax] = useUnit([
    BalanceSwitcherM.$isDrax,
    BalanceSwitcherM.setIsDrax,
  ]);

  return (
    <div className={s.balance_switcher_wrap}>
      <div className={s.balance_switcher_block}>
        <div
          className={clsx(s.balance_switcher_item, !isDrax && s.active)}
          onClick={() => setDrax(false)}
        >
          <img src={bonusTokenIco.src} alt="bonus-ico" />
          0.0 <span>&nbsp;bc</span>
        </div>
        <div
          className={clsx(s.balance_switcher_item, isDrax && s.active)}
          onClick={() => setDrax(true)}
        >
          <img src={draxTokenIco.src} alt="bonus-ico" />
          0.0 <span>&nbsp;dc</span>
        </div>
      </div>
    </div>
  );
};
