import { FC } from "react";
import s from "./styles.module.scss";

interface CoinFlipWagerGainLoss {}

export const CoinFlipWagerGainLoss: FC<CoinFlipWagerGainLoss> = ({}) => {
  return (
    <div className={s.gain_loss_block}>
      <div className={s.stop_gain_block}>
        <span className={s.gain_loss_title}>Stop Gain</span>
        <div className={s.gain_loss_limit_block}>
          <input
            type="text"
            className={s.gain_loss_limit_input}
            placeholder="No limit"
          />
        </div>
      </div>
      <div className={s.stop_loss_block}>
        <span className={s.stop_loss_title}>Stop Loss</span>
        <div className={s.gain_loss_limit_block}>
          <input
            type="text"
            className={s.gain_loss_limit_input}
            placeholder="No limit"
          />
        </div>
      </div>
    </div>
  );
};
