import { FC, useEffect, useState } from "react";
import s from "../Wager/styles.module.scss";
import Image from "next/image";
import tokenIco from "@/public/media/Wager_icons/tokenIco.svg";
import dollarIco from "@/public/media/Wager_icons/dollarIco.svg";

const tokensList = [
  {
    title: "token 1",
    img: tokenIco,
    id: "token1",
  },
  {
    title: "token 2",
    img: tokenIco,
    id: "token2",
  },
  {
    title: "token 3",
    img: tokenIco,
    id: "token3",
  },
];

interface WagerInputsBlockProps {}

export const WagerInputsBlock: FC<WagerInputsBlockProps> = ({}) => {
  const [kriptoInputValue, setKriptoInputValue] = useState("000.000");
  const [currencyInputValue, setCurrencyInputValue] = useState("000.000");
  const [tokens, setTokens] = useState(tokensList);
  const [tokenListVisibility, setTokenListVisibility] = useState(false);
  const [activeToken, setActiveToken] = useState(tokensList[0]);

  const handleChangeToken = (tokenId: string) => {
    const token = tokensList.filter((item) => item.id === tokenId)[0];
    setActiveToken(token);
  };

  useEffect(() => {
    setTokens(tokensList.filter((item) => item.id !== activeToken.id));
  }, [activeToken]);

  return (
    <>
      <div className={s.poker_wager_inputs_block}>
        <div className={s.poker_wager_input_kripto_block}>
          <input
            className={s.poker_wager_input_kripto}
            onChange={(e) => setKriptoInputValue(e.target.value)}
            value={kriptoInputValue}
          />
          <div className={s.poker_wager_input_kripto_ico_block}>
            <Image
              alt="token-ico"
              src={activeToken.img}
              onClick={() => setTokenListVisibility(true)}
            />
            <div
              className={`${s.poker_wager_tokens_list_wrap} ${
                tokenListVisibility && s.token_list_visible
              }`}
            >
              <div className={s.poker_wager_tokens_list}>
                <h1 className={s.poker_wager_tokens_list_title}>
                  Select token
                </h1>
                <div className={s.poker_wager_tokens_list}>
                  {tokens &&
                    tokens.map((token, _) => (
                      <div
                        className={s.poker_wager_tokens_list_item}
                        onClick={() => handleChangeToken(token.id)}
                      >
                        <Image src={token.img} alt="token-ico" />
                        <span className={s.poker_wager_tokens_list_item_title}>
                          {token.title}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.poker_wager_input_currency_block}>
          <input
            className={s.poker_wager_input_currency}
            onChange={(e) => setCurrencyInputValue(e.target.value)}
            value={currencyInputValue}
          />
          <div className={s.poker_wager_input_currency_ico}>
            <Image alt="dollar-ico" src={dollarIco} />
          </div>
        </div>
        <div className={s.poker_wager_increase_block}>
          <div className={s.poker_wager_halve_block}>
            <span className={s.poker_wager_halve_title}>1/2</span>
          </div>
          <div className={s.poker_wager_double_block}>
            <span className={s.poker_wager_double_title}>2x</span>
          </div>
          <div className={s.poker_wager_max_block}>
            <span className={s.poker_wager_max_title}>max</span>
          </div>
        </div>
      </div>
    </>
  );
};
