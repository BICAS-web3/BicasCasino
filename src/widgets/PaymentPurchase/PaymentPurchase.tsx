import { FC } from "react";
import s from "./styles.module.scss";
import purchaseIco from "@/public/media/payment/purchaseIco.svg";
import closeIco from "@/public/media/payment/closeIco.svg";

interface PaymentPurchaseProps {}

export const PaymentPurchase: FC<PaymentPurchaseProps> = () => {
  return (
    <div className={s.payment_purchase_block}>
      <div className={s.payment_purchase_header}>
        <div className={s.payment_purchase_header_title_group}>
          <img src={purchaseIco.src} alt="purcahse-ico" />
          Purchase
        </div>
        <img src={closeIco.src} className={s.close_btn} alt="close-ico" />
      </div>
      <div className={s.payment_purchase_body}>
        <div className={s.payment_purchase_estimate_receive_wrap}>
          <span className={s.payment_purchase_estimate_title}>
            Estimate Receive
          </span>
          <div className={s.payment_purchase_estimate_receive_block}>
            <div className={s.payment_purchase_estimate_drax_wrap}>
              <span className={s.payment_purchase_estimate_drax_title}>
                DRAX Coin
              </span>
            </div>
            <div className={s.payment_purchase_estimate_bonus_wrap}>
              <span className={s.payment_purchase_estimate_bonus_title}>
                Bonus Coin
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
