import { FC, useState } from "react";
import s from "./styles.module.scss";
import { WagerModel } from "../WagerInputsBlock";
import { CustomWagerRangeInputModel } from '../CustomWagerRangeInput';
import { useUnit } from "effector-react";

interface ProfitBlockProps { }

export const ProfitBlock: FC<ProfitBlockProps> = ({ }) => {
  const [
    cryptoValue,
    betsAmount
  ] = useUnit([
    WagerModel.$cryptoValue,
    CustomWagerRangeInputModel.$pickedValue
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
          <span className={s.profit_total_maxPayout}>+{((cryptoValue * betsAmount) * 1.98).toFixed(4)}</span>
        </div>
      </div>
      {/* <div className={s.face_tails_wrap}>
        <div className={s.face_tails_block}>
          <div
            className={`${s.face_block} ${activeSide === "face" && s.face_tails_active
              }`}
            onClick={() => setActiveSide("face")}
          >
            face
          </div>
          <div
            className={`${s.tails_block} ${activeSide === "tails" && s.face_tails_active
              }`}
            onClick={() => setActiveSide("tails")}
          >
            tails
          </div>
        </div>
      </div> */}
    </div>
  );
};
