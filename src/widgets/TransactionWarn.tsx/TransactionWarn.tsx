import { FC } from "react";
import s from "./styles.module.scss";

interface TransactionWarnProps {
  network: string;
  amount: number;
}

export const TransactionWarn: FC<TransactionWarnProps> = ({
  amount,
  network,
}) => {
  return (
    <div className={s.transaction_warn_wrap}>
      <p className={s.transaction_warn_text}>
        The minimum transaction amount on the <span>{network}</span> network is
        &nbsp;
        <span>{amount}$.</span>
      </p>
    </div>
  );
};
