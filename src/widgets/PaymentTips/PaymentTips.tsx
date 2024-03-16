import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import dcCoinIco from "@/public/media/payment/dcCoinIco.svg";
import bcCoinIco from "@/public/media/payment/bcCoinIco.svg";
import { PaymentDropdown } from "../PaymentDropdown/PaymentDropdown";

import * as api from "@/shared/api";
import * as LayoutModel from "@/widgets/Layout/model";
import * as BalanceSwitcherM from "@/widgets/BalanceSwitcher/model";
import * as BetsModel from "@/widgets/LiveBets/model";
import * as RegistrModel from "@/widgets/Registration/model";
import { useUnit } from "effector-react";

interface IAmount {
  type: "Amounts";
  amounts: {
    name: "Drax" | "DraxBonus";
    amount: string;
  }[];
}

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
  // const [balance, setBalance] = useState<null | IAmount>(null);

  const [balance] = useUnit([
    // RegistrModel.$access_token,
    // LayoutModel.$userInfo,
    // BetsModel.$result,
    BalanceSwitcherM.$balanceTotal,
  ]);

  // useEffect(() => {
  //   console.log("user info: ", userInfo);
  //   if (access_token && userInfo) {
  //     (async () => {
  //       const data = await api.getUserAmounts({
  //         bareer: access_token,
  //         userId: userInfo?.id,
  //       });

  //       console.log("amount: ", data.body);
  //       if (data.status === "OK") {
  //         setBalance((data as any).body);
  //       }
  //     })();
  //   }
  // }, [access_token, userInfo?.id, result]);

  const [tList, setTList] = useState([
    {
      ico: dcCoinIco,
      title: "1.77 dc",
    },
    {
      ico: bcCoinIco,
      title: "170.000 bc",
    },
  ]);

  useEffect(() => {
    console.log("BALANCE", balance);
  }, [balance]);

  const changeToBalance = () => {
    if (balance) {
      setTList([
        {
          ico: dcCoinIco,
          title: balance.amounts[0].amount,
        },
        {
          ico: bcCoinIco,
          title: balance.amounts[1].amount,
        },
      ]);
    }
  };

  return (
    <div className={s.payment_tips_block}>
      <div className={s.tips_dropdown_wrap}>
        <PaymentDropdown list={tList} setActive={setActiveCoin} />
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
