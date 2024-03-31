import { FC } from "react";
import clsx from "clsx";

import s from "./styles.module.scss";

export interface RefundButtonProps {
  className?: string;
  onClick?: () => void;
}

export const RefundButton: FC<RefundButtonProps> = ({ className, onClick }) => {
  return (
    <button onClick={onClick} className={clsx(className, s.refund)}>
      Refund
    </button>
  );
};
