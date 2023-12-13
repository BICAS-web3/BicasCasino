import { FC, useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { sessionModel } from "@/entities/session";

import dollarIco from "@/public/media/Wager_icons/dollarIco.svg";
import { TransactionWarn } from "../TransactionWarn.tsx/TransactionWarn";
import { useUnit } from "effector-react";
import { settingsModel } from "@/entities/settings";
import { WagerModel } from ".";
import * as api from "@/shared/api";
import { useNetwork, useAccount, useContractRead, useBalance } from "wagmi";
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { useDropdown } from "@/shared/tools";

import { CustomWagerRangeInputModel } from "../CustomWagerRangeInput";
import { checkPageClicking } from "@/shared/tools";
import s from "../Wager/styles.module.scss";
import downArr from "@/public/media/misc/downArr.png";
import * as GameModel from "@/widgets/GamePage/model";

import { WagerModel as WagerM } from "@/widgets/Wager";
import { ErrorCheck } from "../ErrorCheck/ui/ErrorCheck";
// const tokensList = [
//   {
//     title: "token 1",
//     img: tokenIco,
//     id: "token1",
//   },
//   {
//     title: "token 2",
//     img: tokenIco,
//     id: "token2",
//   },
//   {
//     title: "token 3",
//     img: tokenIco,
//     id: "token3",
//   },
// ];

interface WagerInputsBlockProps {
  wagerVariants?: number[];
}

export const WagerInputsBlock: FC<WagerInputsBlockProps> = ({}) => {
  const [
    availableTokens,
    cryptoValue,
    setCryptoValue,
    //exchangeRate,
    pickedToken,
    pickToken,
    unpickToken,
    betsAmount,
    //pressButton
    Wagered,
    betValue,
  ] = useUnit([
    settingsModel.$AvailableTokens,
    WagerModel.$cryptoValue,
    WagerModel.setCryptoValue,
    //WagerModel.$exchangeRate,
    WagerModel.$pickedToken,
    WagerModel.pickToken,
    WagerModel.unpickToken,
    CustomWagerRangeInputModel.$pickedValue,
    WagerM.$Wagered,
    //WagerModel.pressButton
    GameModel.$betValue,
  ]);

  const [setBalance, setAllowance, GameAddress] = useUnit([
    sessionModel.setBalance,
    sessionModel.setAllowance,
    sessionModel.$gameAddress,
  ]);

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();

  const { data: ethBalance } = useBalance({
    address: address,
    watch: isConnected,
  });

  const [cryptoInputValue, setCryptoInputValue] = useState("");
  const [currencyInputValue, setCurrencyInputValue] = useState("");
  const { dropdownRef, isOpen, toggle, close } = useDropdown();
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [startedTyping, setstartedTyping] = useState<boolean>(false);

  const handleChangeToken = (token: api.T_Token) => {
    pickToken(token);
  };

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

  const {
    data: allowance,
    isError: allowanceError,
    isLoading,
    refetch: fetchAllowance,
  } = useContractRead({
    chainId: chain?.id,
    address: pickedToken?.contract_address as `0x${string}`,
    abi: IERC20,
    functionName: "allowance",
    args: [address, GameAddress],
    watch:
      isConnected &&
      pickedToken?.contract_address !=
        "0x0000000000000000000000000000000000000000",
  });

  useEffect(() => {
    if (allowance) {
      const new_allowance =
        Number((allowance as any) / BigInt(100000000000000)) / 10000;
      console.log("allowance", new_allowance);
      setAllowance(new_allowance);
    }
  }, [allowance]);

  // const { data: balance, error, isError: balanceError, refetch: fetchBalance } = useContractRead({
  //   address: (pickedToken?.contract_address as `0x${string}`),
  //   abi: IERC20,
  //   functionName: 'balanceOf',
  //   args: [address],
  //   watch: isConnected
  // });

  const { data: balance } = useBalance({
    address: address,
    token:
      pickedToken?.contract_address ==
      "0x0000000000000000000000000000000000000000"
        ? undefined
        : (pickedToken?.contract_address as `0x${string}`),
    watch: isConnected,
  });

  useEffect(() => {
    if (balance) {
      const new_balance =
        Number((balance.value as any) / BigInt(100000000000000)) / 10000;
      setBalance(new_balance);
    }
  }, [balance]);
  useEffect(() => {
    if (pickedToken && balance) {
      const new_balance =
        Number((balance.value as any) / BigInt(100000000000000)) / 10000;
      setBalance(new_balance);
    }
  }, [pickedToken]);

  useEffect(() => {
    if (!chain || chain.unsupported) {
      unpickToken();
    }
  }, [chain]);

  useEffect(() => {
    const num = Number(cryptoInputValue);
    if (isNaN(num)) {
      return;
    }
    const currency = num * exchangeRate;
    console.log(cryptoInputValue, currency, betsAmount);
    if (true) {
      console.log(currency * betsAmount >= 5);
      setCryptoValue(num);
    } else {
      setCryptoValue(0);
    }
  }, [betsAmount]);

  const [currentBalance] = useUnit([sessionModel.$currentBalance]);

  const [isLowBalance, setIsLowBalance] = useState(false);

  useEffect(() => {
    console.log("WAG");
    console.log("balance, value", ethBalance?.value, betValue, Wagered);
    if (ethBalance?.value && Wagered) {
      console.log("balance, value", ethBalance?.value, betValue);
      if (
        !currentBalance ||
        currentBalance == 0 ||
        cryptoValue * betsAmount > currentBalance ||
        ethBalance?.value < betValue
      ) {
        setIsLowBalance(true);
      } else {
        setIsLowBalance(false);
      }
    }
  }, [Wagered]);
  return (
    <>
      {isLowBalance && (
        <ErrorCheck
          Wager={Wagered}
          text="There is not enough balance in the wallet to pay for the transaction."
          btnTitle="Top up balance"
        />
      )}
      <div ref={dropdownRef} className={s.poker_wager_inputs_block}>
        <div className={s.poker_wager_input_kripto_block}>
          <input
            placeholder="0.0"
            className={s.poker_wager_input_kripto}
            onChange={(e) => {
              setstartedTyping(true);
              const numb = e.target.value;
              setCryptoInputValue(numb);
              const num = Number(numb);
              if (isNaN(num)) {
                setCryptoValue(0);
                return;
              }
              console.log("Wager", num);
              const currency = Number((num * exchangeRate).toFixed(7));
              setCurrencyInputValue(currency.toString());
              if (true) {
                console.log("Crypto value", num);
                setCryptoValue(num);
              } else {
                setCryptoValue(0);
              }
            }}
            value={cryptoInputValue}
          />
          <div className={s.poker_wager_input_kripto_ico_block}>
            {/* {startedTyping && (cryptoValue * exchangeRate * betsAmount) < 5 && <TransactionWarn amount={5} network="" />} */}
            {pickedToken && (
              <>
                <div
                  className={`${s.pick_token_group} ${
                    (isOpen && s.opened_list,
                    isOpen && s.poker_wager_tokens_list_item_selected)
                  }`}
                  onClick={toggle}
                >
                  <Image
                    alt="token-ico"
                    src={`${api.BaseStaticUrl}/media/tokens/${pickedToken.name}.svg`}
                    // onClick={() => setTokenListVisibility(!tokenListVisibility)}
                    width={24}
                    height={24}
                    className={s.icon}
                  />
                  <span className={s.poker_wager_tokens_list_item_title_active}>
                    {pickedToken.name}
                  </span>
                  <Image
                    className={clsx(
                      s.dd_ico_img,
                      isOpen && s.dd_ico_img_active
                    )}
                    src={downArr}
                    alt="down-arr"
                  />
                </div>
                <div
                  className={clsx(
                    s.poker_wager_tokens_list_wrap,
                    isOpen && s.token_list_visible
                  )}
                >
                  {/* <div className={s.poker_wager_tokens_list}>
                    <h1 className={s.poker_wager_tokens_list_title}>
                      Select token
                    </h1>
                    <div className={s.poker_wager_tokens_list}> */}
                  {availableTokens &&
                    availableTokens.tokens
                      // .filter((token, _) => token.name != pickedToken.name)
                      .map((token, _) => (
                        <div
                          className={clsx(
                            s.poker_wager_tokens_list_item,
                            pickedToken.name === token.name &&
                              s.poker_wager_tokens_list_item_active
                          )}
                          onClick={() => handleChangeToken(token)}
                        >
                          <Image
                            src={`${api.BaseStaticUrl}/media/tokens/${token.name}.svg`}
                            alt="token-ico"
                            width={24}
                            height={24}
                          />
                          <span
                            className={s.poker_wager_tokens_list_item_title}
                          >
                            {token.name}
                          </span>
                        </div>
                      ))}
                  {/* </div>
                  </div> */}
                </div>
              </>
            )}
          </div>
        </div>
        <div className={s.poker_wager_input_currency_block}>
          <input
            placeholder="0.0"
            className={s.poker_wager_input_currency}
            onChange={(e) => {
              setstartedTyping(true);
              const numb = e.target.value;
              setCurrencyInputValue(numb);
              const num = Number(numb);
              if (isNaN(num)) {
                setCryptoValue(0);
                return;
              }
              console.log("exchange rate", exchangeRate);
              const crypto_value = exchangeRate > 0 ? num / exchangeRate : 0;
              //const currency = Number(crypto_value.toFixed(7));
              setCryptoInputValue(Number(crypto_value.toFixed(7)).toString());
              if (true) {
                setCryptoValue(crypto_value);
              } else {
                setCryptoValue(0);
              }
            }}
            value={currencyInputValue}
          />
          <div className={s.poker_wager_input_currency_ico}>
            <Image alt="dollar-ico" src={dollarIco} />
          </div>
        </div>
        <div className={s.poker_wager_increase_block}>
          {[5, 7.5, 10, 12.5, 15].map((cNumber) => (
            <div
              key={cNumber}
              className={s.poker_wager_halve_block}
              onClick={() => {
                const currency = Number((cNumber * exchangeRate).toFixed(7));
                setCurrencyInputValue(currency.toString());
                setCryptoValue(cNumber);
                setCryptoInputValue(Number(cNumber.toFixed(7)).toString());
                const newCurrencyValue = cNumber * exchangeRate;
                setCurrencyInputValue(
                  Number(newCurrencyValue.toFixed(7)).toString()
                );
              }}
            >
              <span className={s.poker_wager_halve_title}>{cNumber}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

{
  /* <div
className={s.poker_wager_double_block}
onClick={() => {
  const newCryptoValue = cryptoValue * 2;
  setCryptoValue(newCryptoValue);
  setCryptoInputValue(Number(newCryptoValue.toFixed(7)).toString());

  const newCurrencyValue = newCryptoValue * exchangeRate;
  setCurrencyInputValue(
    Number(newCurrencyValue.toFixed(7)).toString()
  );
}}
>
<span className={s.poker_wager_double_title}>2x</span>
</div>
<div
className={s.poker_wager_max_block}
onClick={() => {
  const newCryptoValue =
    Number((balance?.value as bigint) / BigInt(100000000000000)) /
    10000;
  setCryptoValue(newCryptoValue);
  setCryptoInputValue(Number(newCryptoValue.toFixed(7)).toString());

  const newCurrencyValue = newCryptoValue * exchangeRate;
  setCurrencyInputValue(
    Number(newCurrencyValue.toFixed(7)).toString()
  );
}}
>
<span className={s.poker_wager_max_title}>max</span>
</div> */
}
