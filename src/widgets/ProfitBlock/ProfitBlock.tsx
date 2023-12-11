import { FC, useState } from "react";
import s from "./styles.module.scss";
import { WagerModel } from "../WagerInputsBlock";
import { CustomWagerRangeInputModel } from '../CustomWagerRangeInput';
import { useUnit } from "effector-react";
import { ProfitModel } from ".";

interface ProfitBlockProps { }

export const ProfitBlock: FC<ProfitBlockProps> = ({ }) => {
  const [
    cryptoValue,
    betsAmount,
    coefficient
  ] = useUnit([
    WagerModel.$cryptoValue,
    CustomWagerRangeInputModel.$pickedValue,
    ProfitModel.$coefficient
  ]);
  // const [totalWager, setTotalWager] = useState(0);
  // const [maxPayout, setMaxPayout] = useState(0);
  // /const [activeSide, setActiveSide] = useState("face");

  return (
    <div className={s.coinflip_down_block}>
      <div className={s.profit_wrap}>
        <div className={s.profit_total_wager_block}>
          <span className={s.profit_total_wager_title}>Total Wager</span>
          <span className={s.profit_total_wager}>{(cryptoValue * betsAmount).toFixed(4)}</span>
        </div>
        <div className={s.profit_total_payout_block}>
          <span className={s.profit_total_wager_title}>Max Payout</span>
          <span className={s.profit_total_maxPayout}>+{((cryptoValue * betsAmount) * coefficient).toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
};
