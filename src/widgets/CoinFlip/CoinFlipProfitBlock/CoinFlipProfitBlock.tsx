import { FC, useState } from "react";
import s from "./styles.module.scss";

interface CoinFlipProfitBlockProps {}

export const CoinFlipProfitBlock: FC<CoinFlipProfitBlockProps> = ({}) => {
  const [totalWager, setTotalWager] = useState(0);
  const [maxPayout, setMaxPayout] = useState(0);
  const [activeSide, setActiveSide] = useState("face");

  return (
    <div className={s.coinflip_down_block}>
      <div className={s.profit_wrap}>
        <div className={s.profit_total_wager_block}>
          <span className={s.profit_total_wager_title}>Total Wager</span>
          <span className={s.profit_total_wager}>{totalWager}</span>
        </div>
        <div className={s.profit_total_payout_block}>
          <span className={s.profit_total_wager_title}>Max Payout</span>
          <span className={s.profit_total_maxPayout}>+{maxPayout}</span>
        </div>
      </div>
      <div className={s.face_tails_wrap}>
        <div className={s.face_tails_block}>
          <div
            className={`${s.face_block} ${
              activeSide === "face" && s.face_tails_active
            }`}
            onClick={() => setActiveSide("face")}
          >
            face
          </div>
          <div
            className={`${s.tails_block} ${
              activeSide === "tails" && s.face_tails_active
            }`}
            onClick={() => setActiveSide("tails")}
          >
            tails
          </div>
        </div>
      </div>
    </div>
  );
};