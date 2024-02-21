import { FC, useState } from "react";
import s from "./styles.module.scss";
import dcCoinIco from "@/public/media/payment/dcCoinIco.svg";
import bcCoinIco from "@/public/media/payment/bcCoinIco.svg";
import { PaymentDropdown } from "../PaymentDropdown/PaymentDropdown";

const tipsList = [
  {
    ico: dcCoinIco,
    title: "1.77 dc",
  },
  {
    ico: bcCoinIco,
    title: "170.000 bc",
  },
];

interface PaymentTipsProps {}

export const PaymentTips: FC<PaymentTipsProps> = () => {
  const [activeCoin, setActiveCoin] = useState(tipsList[0]);

  return (
    <div className={s.payment_tips_block}>
      <div className={s.tips_dropdown_wrap}>
        <PaymentDropdown list={tipsList} setActive={setActiveCoin} />
      </div>
      <div className={s.tips_title_group}>
        <span className={s.tips_input_title}>Username</span>
        <input type="text" className={s.tips_input} />
      </div>
      <div className={s.tips_title_group} style={{ position: "relative" }}>
        <span className={s.tips_input_title}>Tips amount</span>
        <input type="text" className={s.tips_input} />
        <img
          src={activeCoin.ico.src}
          className={s.active_tip_coin_ico}
          alt="tips-coin"
        />
      </div>
      <div className={s.tips_footer_group}>
        <button className={s.send_tips_btn}>
          Send {activeCoin.title}
          <div className={s.send_btn_shadow}></div>
        </button>
        <span className={s.tips_balance_warning}>
          Your remaining balance must be greater or equal to 20 DC
        </span>
      </div>
    </div>
  );
};
