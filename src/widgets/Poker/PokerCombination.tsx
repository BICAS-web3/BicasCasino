import { FC, useEffect, useState } from "react";

import { useUnit } from "effector-react";

import { WagerModel } from "@/widgets/Wager";
import * as GameModel from "@/widgets/GamePage/model";
import * as WagerModelInput from "@/widgets/WagerInputsBlock/model";
import * as CustomWagerRangeInputModel from "@/widgets/CustomWagerRangeInput/model";

import { settingsModel } from "@/entities/settings";

import { useDropdown } from "@/shared/tools";
import * as api from "@/shared/api";

import s from "./styles.module.scss";
import clsx from "clsx";

interface PokerCombinationProps {
  combinationName: string;
  tokenImage: any;
  profit?: string | number;
  multiplier: string | number;
}

export const PokerCombination: FC<PokerCombinationProps> = ({
  combinationName,
  tokenImage,
  multiplier,
}) => {
  const [availableTokens, setCryptoValue, pickedToken, pickToken, betsAmount] =
    useUnit([
      settingsModel.$AvailableTokens,
      WagerModelInput.setCryptoValue,
      WagerModelInput.$pickedToken,
      WagerModelInput.pickToken,
      CustomWagerRangeInputModel.$pickedValue,
    ]);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  useEffect(() => {
    const run = async () => {
      const price = (
        (await api.GetTokenPriceFx(availableTokens.tokens[0].name))
          .body as api.T_TokenPrice
      ).token_price;
      setExchangeRate(price);
    };
    if (availableTokens.tokens.length != 0) {
      pickToken(availableTokens.tokens[0]);
      run();
    }
  }, [availableTokens]);

  useEffect(() => {
    const run = async (token: string) => {
      const price = (
        (await api.GetTokenPriceFx(token)).body as api.T_TokenPrice
      ).token_price;
      setExchangeRate(price);
    };
    if (pickedToken) {
      run(pickedToken.name);
    }
  }, [pickedToken]);

  useEffect(() => {
    const num = Number(profit);
    if (isNaN(num)) {
      return;
    }
    const currency = num * exchangeRate;
    console.log(currency * betsAmount >= 5);
    setCryptoValue(num);
  }, [betsAmount]);
  const [pressButton] = useUnit([WagerModel.pressButton]);
  const [clearStatus, profit] = useUnit([
    GameModel.clearStatus,
    GameModel.$profit,
  ]);

  const { isOpen, open, dropdownRef, close } = useDropdown();

  useEffect(() => {
    open();
    return () => {
      clearStatus();
      close();
    };
  }, []);

  return (
    <article
      ref={dropdownRef}
      className={clsx(
        s.combination_wrapper,
        isOpen && s.combination_wrapper_open
      )}
    >
      <h3 className={s.combination_name}>{combinationName}</h3>
      <span className={s.win_message}>you win</span>
      <div className={s.profit_box}>
        <div className={s.profit}>
          <div className={s.token}>{tokenImage}</div>
          <div className={s.profit_text}>{profit}</div>
        </div>
        <div className={s.multiplier}>{multiplier}x</div>
      </div>
      <button
        className={s.win_btn}
        onClick={() => {
          pressButton();
          (window as any).fbq("track", "Purchase", {
            value: profit,
            currency: "USD",
          });
        }}
      >
        Bet on my winnings
      </button>
    </article>
  );
};
