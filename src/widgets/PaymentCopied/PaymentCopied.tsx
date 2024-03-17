import React, { FC, useEffect } from "react";
import s from "./styles.module.scss";
import copiedIco from "@/public/media/misc/copied.svg";
import clsx from "clsx";

interface PaymentCopiedProps {
  active: boolean;
  setDisable: any;
}

export const PaymentCopied: FC<PaymentCopiedProps> = ({
  active,
  setDisable,
}) => {
  useEffect(() => {
    if (active) {
      setTimeout(() => {
        setDisable(false);
      }, 2000);
    }
  }, [active]);

  return (
    <div className={clsx(s.payment_copied, active && s.active)}>
      <span className={s.payment_title}>
        <img alt="copy-ico" src={copiedIco.src} />
        Copy success!
      </span>
    </div>
  );
};
