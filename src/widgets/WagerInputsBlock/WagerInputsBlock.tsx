import { FC, useEffect, useState } from "react";
import s from "../Wager/styles.module.scss";
import Image from "next/image";
import dollarIco from "@/public/media/Wager_icons/dollarIco.svg";
import { TransactionWarn } from "../TransactionWarn.tsx/TransactionWarn";
import { useUnit } from 'effector-react';
import { settingsModel } from "@/entities/settings";
import { WagerModel } from ".";
import * as api from "@/shared/api";
import {
  useNetwork,
  useAccount,
  useContractRead
} from 'wagmi';
import { ABI as IERC20 } from "@/shared/contracts/ERC20";
import { sessionModel } from "@/entities/session";


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

interface WagerInputsBlockProps { }

export const WagerInputsBlock: FC<WagerInputsBlockProps> = ({ }) => {

  const [
    availableTokens,
    cryptoValue,
    setCryptoValue,
    //exchangeRate,
    pickedToken,
    pickToken,
    unpickToken,
    //pressButton
  ] = useUnit([
    settingsModel.$AvailableTokens,
    WagerModel.$cryptoValue,
    WagerModel.setCryptoValue,
    //WagerModel.$exchangeRate,
    WagerModel.$pickedToken,
    WagerModel.pickToken,
    WagerModel.unpickToken,
    //WagerModel.pressButton
  ]);

  const [
    setBalance,
    setAllowance,
    GameAddress,
  ] = useUnit([
    sessionModel.setBalance,
    sessionModel.setAllowance,
    sessionModel.$gameAddress,
  ]);

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();

  const [cryptoInputValue, setCryptoInputValue] = useState("0.0");
  const [currencyInputValue, setCurrencyInputValue] = useState("0.0");
  const [tokenListVisibility, setTokenListVisibility] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  const handleChangeToken = (token: api.T_Token) => {
    pickToken(token);
  };

  useEffect(() => {
    const run = async () => {
      const price = ((await api.GetTokenPriceFx(availableTokens.tokens[0].name)).body as api.T_TokenPrice).token_price;
      setExchangeRate(price);
    };
    console.log("available tokens", availableTokens);
    if (availableTokens.tokens.length != 0) {
      pickToken(availableTokens.tokens[0]);
      run();
    }
  }, [availableTokens]);


  const { data: allowance, isError: allowanceError, isLoading, refetch: fetchAllowance } = useContractRead({
    chainId: chain?.id,
    address: (pickedToken?.contract_address as `0x${string}`),
    abi: IERC20,
    functionName: 'allowance',
    args: [address, GameAddress],
    watch: true,
  });
  useEffect(() => {
    if (allowance) {
      const new_allowance = Number((allowance as bigint) / BigInt(100000000000000)) / 10000;
      console.log('allowance', new_allowance);
      setAllowance(new_allowance);
    }
  }, [allowance]);

  const { data: balance, error, isError: balanceError, refetch: fetchBalance } = useContractRead({
    address: (pickedToken?.contract_address as `0x${string}`),
    abi: IERC20,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  });
  useEffect(() => {
    if (balance) {
      const new_balance = Number((balance as bigint) / BigInt(100000000000000)) / 10000;
      console.log('balance', new_balance);
      setBalance(new_balance);
    }
  }, [balance]);
  useEffect(() => {
    if (pickedToken) {
      const new_balance = Number((balance as bigint) / BigInt(100000000000000)) / 10000;
      console.log('balance', new_balance);
      setBalance(new_balance);
    }
  }, [pickedToken]);

  //const [wroteTo, setWroteTo] = useState<number>(0);

  // useEffect(() => {
  //   const num = Number(cryptoInputValue);
  //   if (isNaN(num)) {
  //     return;
  //   }
  //   console.log("Wager", num);
  //   setCryptoValue(num);
  //   setCurrencyInputValue(Number((num * exchangeRate).toFixed(7)).toString());
  // }, [cryptoInputValue]);

  // useEffect(() => {
  //   const num = Number(currencyInputValue);
  //   if (isNaN(num)) {
  //     return;
  //   }
  //   console.log("exchange rate", exchangeRate);
  //   const crypto_value = exchangeRate > 0 ? (num / exchangeRate) : 0;
  //   setCryptoValue(crypto_value);
  //   setCryptoInputValue(Number(crypto_value.toFixed(7)).toString());
  // }, [currencyInputValue]);

  useEffect(() => {
    if (!chain || chain.unsupported) {
      unpickToken();
    }
  }, [chain])

  const cond = false;

  return (
    <>
      <div className={s.poker_wager_inputs_block}>
        <div className={s.poker_wager_input_kripto_block}>
          <input
            className={s.poker_wager_input_kripto}
            onChange={(e) => {
              const numb = e.target.value
              setCryptoInputValue(numb);
              const num = Number(numb);
              if (isNaN(num)) {
                return;
              }
              console.log("Wager", num);
              setCryptoValue(num);
              setCurrencyInputValue(Number((num * exchangeRate).toFixed(7)).toString());
            }}
            value={cryptoInputValue}
          />
          <div className={s.poker_wager_input_kripto_ico_block}>
            {cond && <TransactionWarn amount={15} network="Polygon" />}
            {pickedToken && <><Image
              alt="token-ico"
              src={`${api.BaseStaticUrl}/media/tokens/${pickedToken.name}.svg`}
              onClick={() => setTokenListVisibility(!tokenListVisibility)}
              width={30}
              height={30}
            />
              <div
                className={`${s.poker_wager_tokens_list_wrap} ${tokenListVisibility && s.token_list_visible
                  }`}
              >
                <div className={s.poker_wager_tokens_list}>
                  <h1 className={s.poker_wager_tokens_list_title}>
                    Select token
                  </h1>
                  <div className={s.poker_wager_tokens_list}>
                    {availableTokens &&
                      availableTokens.tokens
                        .filter((token, _) => token.name != pickedToken.name)
                        .map((token, _) => (
                          <div
                            className={s.poker_wager_tokens_list_item}
                            onClick={() => handleChangeToken(token)}
                          >
                            <Image
                              src={`${api.BaseStaticUrl}/media/tokens/${token.name}.svg`}
                              alt="token-ico"
                              width={30}
                              height={30}
                            />
                            <span className={s.poker_wager_tokens_list_item_title}>
                              {token.name}
                            </span>
                          </div>
                        ))}
                  </div>
                </div>
              </div></>}
          </div>
        </div>
        <div className={s.poker_wager_input_currency_block}>
          <input
            className={s.poker_wager_input_currency}
            onChange={(e) => {
              const numb = e.target.value;
              setCurrencyInputValue(numb);
              const num = Number(numb);
              if (isNaN(num)) {
                return;
              }
              console.log("exchange rate", exchangeRate);
              const crypto_value = exchangeRate > 0 ? (num / exchangeRate) : 0;
              setCryptoValue(crypto_value);
              setCryptoInputValue(Number(crypto_value.toFixed(7)).toString());
            }}
            value={currencyInputValue}
          />
          <div className={s.poker_wager_input_currency_ico}>
            <Image alt="dollar-ico" src={dollarIco} />
          </div>
        </div>
        <div className={s.poker_wager_increase_block}>
          <div className={s.poker_wager_halve_block} onClick={() => {
            const newCryptoValue = (cryptoValue / 2);
            setCryptoValue(newCryptoValue);
            setCryptoInputValue(Number(newCryptoValue.toFixed(7)).toString());

            const newCurrencyValue = newCryptoValue * exchangeRate;
            setCurrencyInputValue(Number(newCurrencyValue.toFixed(7)).toString())
          }}>
            <span className={s.poker_wager_halve_title}>1/2</span>
          </div>
          <div className={s.poker_wager_double_block} onClick={() => {
            const newCryptoValue = (cryptoValue * 2);
            setCryptoValue(newCryptoValue);
            setCryptoInputValue(Number(newCryptoValue.toFixed(7)).toString());

            const newCurrencyValue = newCryptoValue * exchangeRate;
            setCurrencyInputValue(Number(newCurrencyValue.toFixed(7)).toString())
          }}>
            <span className={s.poker_wager_double_title}>2x</span>
          </div>
          <div className={s.poker_wager_max_block} onClick={() => {
            const newCryptoValue = Number((balance as bigint) / BigInt(100000000000000)) / 10000;
            setCryptoValue(newCryptoValue);
            setCryptoInputValue(Number(newCryptoValue.toFixed(7)).toString());

            const newCurrencyValue = newCryptoValue * exchangeRate;
            setCurrencyInputValue(Number(newCurrencyValue.toFixed(7)).toString())
          }}>
            <span className={s.poker_wager_max_title}>max</span>
          </div>
        </div>
      </div>
    </>
  );
};