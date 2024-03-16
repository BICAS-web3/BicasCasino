import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { useUnit } from "effector-react";
import * as BalanceSwitcherM from "./model";
import draxTokenIco from "@/public/media/payment/draxMiniIco.svg";
import bonusTokenIco from "@/public/media/payment/bonusCoin.svg";
import clsx from "clsx";
import * as api from "@/shared/api";
import * as LayoutModel from "@/widgets/Layout/model";

import * as BetsModel from "@/widgets/LiveBets/model";
import * as RegistrModel from "@/widgets/Registration/model";

interface BalanceSwitcherProps {}

interface IAmount {
  type: "Amounts";
  amounts: {
    name: "Drax" | "DraxBonus";
    amount: string;
  }[];
}

export const BalanceSwitcher: FC<BalanceSwitcherProps> = () => {
  const [
    isDrax,
    setDrax,
    access_token,
    userInfo,
    result,
    setBalanceValue,
    setBalanceTotal,
  ] = useUnit([
    BalanceSwitcherM.$isDrax,
    BalanceSwitcherM.setIsDrax,
    RegistrModel.$access_token,
    LayoutModel.$userInfo,
    BetsModel.$result,
    BalanceSwitcherM.setBalance,
    BalanceSwitcherM.setBalanceTotal,
  ]);

  const [balance, setBalance] = useState<null | IAmount>(null);

  useEffect(() => {
    console.log("user info: ", userInfo);
    if (access_token && userInfo) {
      (async () => {
        const data = await api.getUserAmounts({
          bareer: access_token,
          userId: userInfo?.id,
        });

        console.log("amount: ", data.body);
        if (data.status === "OK") {
          setBalance((data as any).body);
          setBalanceValue(
            Number(
              (data.body as any).amounts.find(
                (item: any) => item.name === (isDrax ? "Drax" : "DraxBonus")
              )?.amount
            )
          );
        }
      })();
    }
  }, [access_token, userInfo?.id, result]);

  const zero = 0;

  return (
    <div className={s.balance_switcher_wrap}>
      <div className={s.balance_switcher_block}>
        <div
          className={clsx(s.balance_switcher_item, !isDrax && s.active)}
          onClick={() => {
            setBalanceValue(
              balance !== null
                ? Number(
                    balance.amounts.find((item) => item.name === "DraxBonus")
                      ?.amount
                  )
                : 0.0
            );
            setDrax(false);
          }}
        >
          <img src={bonusTokenIco.src} alt="bonus-ico" />
          {balance !== null
            ? Number(
                balance.amounts.find((item) => item.name === "DraxBonus")
                  ?.amount
              )
            : zero.toFixed(3)}
          <span>&nbsp;bc</span>
        </div>
        <div
          className={clsx(s.balance_switcher_item, isDrax && s.active)}
          onClick={() => {
            setBalanceValue(
              balance !== null
                ? Number(
                    balance.amounts.find((item) => item.name === "Drax")?.amount
                  )
                : 0.0
            );

            setDrax(true);
          }}
        >
          <img src={draxTokenIco.src} alt="bonus-ico" />
          {balance !== null
            ? Number(
                balance.amounts.find((item) => item.name === "Drax")?.amount
              )
            : zero.toFixed(3)}{" "}
          <span>&nbsp;dc</span>
        </div>
      </div>
    </div>
  );
};
