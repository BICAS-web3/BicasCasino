import { FC } from "react";
import s from "./styles.module.scss";
import { WagerGainLossModel } from ".";
import { useUnit } from "effector-react";

interface WagerGainLoss {}

export const WagerGainLoss: FC<WagerGainLoss> = ({}) => {
  const [pickStopLoss, pickStopGain] = useUnit([
    WagerGainLossModel.pickStopLoss,
    WagerGainLossModel.pickStopGain,
  ]);

  const pickValue = (
    setValue: (value: number | null) => number | null,
    value: string
  ) => {
    let num = parseFloat(value);
    if (!isNaN(num)) {
      setValue(num);
    } else {
      setValue(null);
    }
  };

  return (
    <div className={s.gain_loss_block}>
      <div className={s.stop_gain_block}>
        <span className={s.gain_loss_title}>Stop Gain</span>
        <div className={s.gain_loss_limit_block}>
          <input
            type="text"
            className={s.gain_loss_limit_input}
            placeholder="No limit"
            onChange={(e) => pickValue(pickStopGain, e.target.value)}
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
            onChange={(e) => pickValue(pickStopLoss, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
