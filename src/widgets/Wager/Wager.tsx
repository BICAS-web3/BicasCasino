import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import tokenIco from "@/public/media/Wager_icons/tokenIco.svg";
import dollarIco from "@/public/media/Wager_icons/dollarIco.svg";
import soundIco from "@/public/media/Wager_icons/soundIco.svg";
import infoIco from "@/public/media/Wager_icons/infoIco.svg";
import infoLightIco from "@/public/media/Wager_icons/infoLightIco.svg";
import closeIco from "@/public/media/Wager_icons/closeIco.svg";
import openHandIco from "@/public/media/Wager_icons/openHandIco.svg";
import openHandLightIco from "@/public/media/Wager_icons/openHandLightIco.svg";
import Image from "next/image";
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import * as Api from '@/shared/api';

const pokerHandMultiplierList = [
  {
    title: "Royal Flush",
    multiplier: 100,
  },
  {
    title: "Straight Flush",
    multiplier: 45,
  },
  {
    title: "Four of a kind",
    multiplier: 20,
  },
  {
    title: "Full House",
    multiplier: 12,
  },
  {
    title: "Flush",
    multiplier: 10,
  },
  {
    title: "Straight",
    multiplier: 5,
  },
  {
    title: "Three of a kind",
    multiplier: 3,
  },
  {
    title: "Two Pairs",
    multiplier: 2,
  },
  {
    title: "Jacks or Better",
    multiplier: 1,
  },
];

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

// export type T_Token = {
//   name: string,
// };

export interface WagerProps {
  game: string;
  tokenAvailableAmount: number,
  // tokenAmount: number,
  // setTokenAmount: any,
  tokenPrice: number,
  onWager: (tokenAmount: number) => Promise<void>,
  tokens: Api.T_Token[],
  //onChangeToken: (token: string) => void,
  activeToken: Api.T_Token | undefined,
  setActiveToken: any,
  onTokenAmountChange: (tokenAmount: number) => void
}

export const Wager: FC<WagerProps> = (props) => {
  const [kriptoInputValue, setKriptoInputValue] = useState('0');
  const [currencyInputValue, setCurrencyInputValue] = useState('0');
  const [infoModalVisibility, setInfoModalVisibility] = useState(false);
  //const [tokens, setTokens] = useState(tokensList);
  //const [activeToken, setActiveToken] = useState(tokensList[0]);
  const [tokenListVisibility, setTokenListVisibility] = useState(false);
  const [handMultiplierBlockVisibility, setHandMultiplierBlockVisibility] =
    useState(false);

  console.log("Available balance", props.tokenAvailableAmount);

  const handleChangeToken = (token: Api.T_Token) => {
    setTokenListVisibility(false);
    //const token = tokensList.filter((item) => item.id === tokenId)[0];
    props.setActiveToken(token);
  };

  useEffect(() => {
    if (!kriptoInputValue) {
      return;
    }
    props.onTokenAmountChange(Number(kriptoInputValue));
  }, [kriptoInputValue])

  // useEffect(() => {
  //   setTokens(tokensList.filter((item) => item.id !== activeToken.id));
  // }, [activeToken]);

  return (
    <div className={s.poker_wager_wrap}>
      <div className={s.poker_wager_block}>
        <div className={s.poker_wager_header}>
          <h2 className={s.poker_wager_title}>Wager</h2>
          <div className={s.poker_wager_inputs_block}>
            <div className={s.poker_wager_input_kripto_block}>
              <input
                className={s.poker_wager_input_kripto}
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setKriptoInputValue('0');
                    setCurrencyInputValue('0');
                  }

                  const nmb = parseFloat(
                    (e.target.value.charAt(e.target.value.length - 1) == '.'
                      || e.target.value.charAt(e.target.value.length - 1) == ',') && e.target.value.length > 1
                      ? `${e.target.value.slice(0, e.target.value.length - 1)}.0` : e.target.value
                  );
                  if (Number.isNaN(nmb)
                    || nmb > props.tokenAvailableAmount) {
                    return;
                  }
                  setKriptoInputValue(e.target.value.charAt(0) == '0'
                    && e.target.value.length > 1
                    ? e.target.value.slice(1) : e.target.value);

                  const dollars = nmb * props.tokenPrice;
                  setCurrencyInputValue(dollars > 1 ? dollars.toFixed(2) : dollars.toFixed(5));
                }}
                value={kriptoInputValue}
              />
              {props.activeToken && <div className={s.poker_wager_input_kripto_ico_block}>
                <Image
                  alt="token-ico"
                  src={`/static/media/tokens/${props.activeToken.name}.svg`}
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
                      {props.tokens &&
                        props.tokens.map((token, _) => (
                          token == props.activeToken ? <></> : <div
                            className={s.poker_wager_tokens_list_item}
                            onClick={() => handleChangeToken(token)}
                          >
                            <Image
                              src={`/static/media/tokens/${token.name}.svg`}
                              alt="token-ico"
                              width={30}
                              height={30}
                            />
                            <span
                              className={s.poker_wager_tokens_list_item_title}
                            >
                              {token.name}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>}
            </div>
            <div className={s.poker_wager_input_currency_block}>
              <input
                className={s.poker_wager_input_currency}
                onChange={(e) => {
                  if (e.target.value.length == 0) {
                    setKriptoInputValue('0');
                    setCurrencyInputValue('0');
                  }

                  const nmb = parseFloat(
                    (e.target.value.charAt(e.target.value.length - 1) == '.'
                      || e.target.value.charAt(e.target.value.length - 1) == ',') && e.target.value.length > 1
                      ? `${e.target.value.slice(0, e.target.value.length - 1)}.0` : e.target.value
                  );
                  if (Number.isNaN(nmb)) {
                    return;
                  }

                  const tokens = nmb / props.tokenPrice;
                  if (tokens > props.tokenAvailableAmount) {
                    return;
                  }

                  setCurrencyInputValue(e.target.value.charAt(0) == '0'
                    && e.target.value.length > 1
                    ? e.target.value.slice(1) : e.target.value);
                  setKriptoInputValue(tokens > 1 ? tokens.toFixed(2) : tokens.toFixed(5));
                }}
                value={currencyInputValue}
              />
              <div className={s.poker_wager_input_currency_ico}>
                <Image alt="dollar-ico" src={dollarIco} />
              </div>
            </div>
            <div className={s.poker_wager_increase_block}>
              <div
                className={s.poker_wager_halve_block}
                onClick={() => {
                  const num = props.tokenAvailableAmount / 4;
                  setKriptoInputValue(num.toFixed(2));
                  setCurrencyInputValue((num * props.tokenPrice).toFixed(2));
                }}>
                <span className={s.poker_wager_halve_title}>25%</span>
              </div>
              <div
                className={s.poker_wager_double_block}
                onClick={() => {
                  const num = props.tokenAvailableAmount / 2;
                  setKriptoInputValue(num.toFixed(2));
                  setCurrencyInputValue((num * props.tokenPrice).toFixed(2));
                }}>
                <span className={s.poker_wager_double_title}>50%</span>
              </div>
              <div
                className={s.poker_wager_max_block}
                onClick={() => {
                  const num = props.tokenAvailableAmount;
                  setKriptoInputValue(num.toFixed(2));
                  setCurrencyInputValue((num * props.tokenPrice).toFixed(2));
                }}>
                <span className={s.poker_wager_max_title}>max</span>
              </div>
            </div>
          </div>
          <button
            className={s.poker_wager_drawing_cards_btn}
            onClick={async () => { await props.onWager(Number(kriptoInputValue)) }}>
            Drawing cards
          </button>
        </div>
        <div className={s.poker_wager_lower_btns_block}>
          <button className={s.poker_wager_sound_btn}>
            <Image alt="sound-ico" src={soundIco} />
          </button>
          <div className={s.poker_wager_info_btn_wrap}>
            <button
              className={s.poker_wager_info_btn}
              onClick={() => setInfoModalVisibility(!infoModalVisibility)}
            >
              {infoModalVisibility ? (
                <Image alt="info-ico-light" src={infoLightIco} />
              ) : (
                <Image alt="info-ico-default" src={infoIco} />
              )}
            </button>
            <div
              className={`${s.poker_wager_info_modal_block} ${infoModalVisibility && s.active
                }`}
            >
              <Image
                src={closeIco}
                alt="close-ico"
                onClick={() => setInfoModalVisibility(false)}
                className={s.poker_wager_info_modal_close_ico}
              />
              <h1 className={s.poker_wager_info_modal_title}>About the game</h1>
              <p className={s.poker_wager_info_modal_text}>
                Dice is the most popular crypto casino game, with its roots
                originating from 2012 as Bitcoin’s use case for gambling came
                into existence. <br /> It is a simple game of chance with easy
                customisable betting mechanics. Slide the bar left and the
                multiplier reward for winning your bet increases, while
                sacrificing the win chance. Slide the bar to the right, and the
                opposite happens.
              </p>
            </div>
          </div>
          {props.game && props.game === "poker" && (
            <div className={s.hand_multiplier_wrap}>
              <div
                className={s.hand_multiplier_ico_wrap}
                onClick={() =>
                  setHandMultiplierBlockVisibility(
                    !handMultiplierBlockVisibility
                  )
                }
              >
                {handMultiplierBlockVisibility ? (
                  <Image alt="open-hand-light-ico" src={openHandLightIco} />
                ) : (
                  <Image alt="open-hand-default-ico" src={openHandIco} />
                )}
              </div>
              <div
                className={`${s.hand_multiplier_block} ${handMultiplierBlockVisibility && s.handMultiplierActive
                  }`}
              >
                <div className={s.hand_multiplier_block_header}>
                  <span className={s.hand_multiplier_block_header_title}>
                    Hand
                  </span>
                  <span className={s.hand_multiplier_block_header_title}>
                    Multiplier
                  </span>
                </div>
                <div className={s.hand_multiplier_list}>
                  {pokerHandMultiplierList.map((hand, id) => (
                    <div className={s.hand_multiplier_list_item}>
                      <span className={s.hand_multiplier_list_item_title}>
                        {hand.title}
                      </span>
                      <span className={s.hand_multiplier_list_item_multiplier}>
                        {hand.multiplier}×
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
