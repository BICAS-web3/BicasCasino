import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import btcIco from "@/public/media/payment/btcICo.svg";
import bchIco from "@/public/media/payment/bchIco.svg";
import ethIco from "@/public/media/payment/ethIco.svg";
import doceIco from "@/public/media/payment/dogeIco.svg";
import ltcIco from "@/public/media/payment/ltcIco.svg";
import usdtIco from "@/public/media/payment/usdtIco.svg";
import trxIco from "@/public/media/payment/trxIco.svg";
import xrpIco from "@/public/media/payment/xrpIco.svg";
import xlmIco from "@/public/media/payment/xlmIco.svg";
import { useDropdown } from "@/shared/tools";
import upArrow from "@/public/media/payment/upArrow.svg";
import clsx from "clsx";
import { useUnit } from "effector-react";
import * as PaymentRedeemM from "./model";
import closeIco from "@/public/media/payment/closeIco.svg";

export const coinsList = [
  {
    title: "btc",
    ico: btcIco,
  },
  {
    title: "eth",
    ico: ethIco,
  },
  {
    title: "doge",
    ico: doceIco,
  },
  {
    title: "ltc",
    ico: ltcIco,
  },
  {
    title: "bch",
    ico: bchIco,
  },
  {
    title: "usdt",
    ico: usdtIco,
  },
  {
    title: "trx",
    ico: trxIco,
  },
  {
    title: "xrp",
    ico: xrpIco,
  },
  {
    title: "xlm",
    ico: xlmIco,
  },
];

interface PaymentRedeemProps {}

export const PaymentRedeem: FC<PaymentRedeemProps> = () => {
  const [activeCoin, setActiveCoin] = useState(coinsList[0]);
  const { dropdownRef, isOpen: isVisible, toggle, close } = useDropdown();
  const [currentCoinsList, setCurrentCoinsList] = useState(coinsList);
  const [coinsListVisibility, setCoinsListVisibility] = useState(false);

  const [mailValue, setMailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [userBalance, setUserBalance] = useState(1.7737); ////temp

  const [valueToPayout, setValueToPayout] = useState<number>();

  useEffect(() => {
    setCurrentCoinsList(
      coinsList.filter((item) => item.title !== activeCoin.title)
    );
  }, [activeCoin]);

  const handleChangeCoin = (title: string) => {
    const activeCoin = currentCoinsList.filter(
      (item) => item.title === title
    )[0];
    setActiveCoin(activeCoin);
    setCoinsListVisibility(false);
  };

  const handleSetMaxBalancePayout = () => {
    setValueToPayout(userBalance);
  };

  const [securityModalVisibility, setSecurityModalVisibility] = useUnit([
    PaymentRedeemM.$securityModalVisibility,
    PaymentRedeemM.setSecurityModalVisibility,
  ]);

  return (
    <div className={s.payment_redeem_block}>
      <div
        className={clsx(
          s.payment_redeem_security_question_modal_wrap,
          securityModalVisibility && s.active_security_modal
        )}
      >
        <div className={s.payment_redeem_security_question_modal}>
          <div className={s.payment_redeem_security_question_modal_header}>
            <span className={s.modal_title}>Security Question</span>
            <img
              src={closeIco.src}
              className={s.close_modal_ico}
              alt="close-ico"
              onClick={() => setSecurityModalVisibility(false)}
            />
          </div>
          <div className={s.payment_redeem_security_question_modal_body}>
            <div
              className={
                s.payment_redeem_security_question_modal_body_inp_block
              }
            >
              <span
                className={
                  s.payment_redeem_security_question_modal_body_inp_block_subTitle
                }
              >
                Full your email address (ivan*****@****.****)
              </span>
              <input
                type="text"
                className={
                  s.payment_redeem_security_question_modal_body_inp_block_input
                }
                value={mailValue}
                onChange={(e) => setMailValue(e.target.value)}
              />
            </div>
            <div
              className={
                s.payment_redeem_security_question_modal_body_inp_block
              }
            >
              <span
                className={
                  s.payment_redeem_security_question_modal_body_inp_block_subTitle
                }
              >
                Input your account password
              </span>
              <input
                type="password"
                className={
                  s.payment_redeem_security_question_modal_body_inp_block_input
                }
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            </div>
          </div>
          <div className={s.payment_redeem_security_question_modal_footer}>
            <span
              className={
                s.payment_redeem_security_question_modal_footer_reset_btn
              }
            >
              Forget password?
            </span>
            <div className={s.footer_btns_block}>
              <button className={s.cancel_btn}>Cancel</button>
              <button className={s.confirm_btn}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
      <div className={s.payment_coins_list_wrap}>
        <div
          className={clsx(
            s.payment_redeem_coins_list_block,
            coinsListVisibility && s.active_list
          )}
        >
          <div
            className={s.payment_active_coin}
            onClick={() => setCoinsListVisibility(!coinsListVisibility)}
          >
            <div className={s.current_coin_title_group}>
              <img src={activeCoin.ico.src} className={s.coin_ico} alt="" />
              <span className={s.current_coin_title}>{activeCoin.title}</span>
            </div>
            <img
              src={upArrow.src}
              className={s.arr_ico}
              alt="up-arrow-static"
            />
          </div>
          <div className={s.payment_redeem_coins_list} ref={dropdownRef}>
            {currentCoinsList.map((item, ind) => (
              <div
                className={s.payment_redeem_coins_list_item}
                onClick={() => handleChangeCoin(item.title)}
              >
                <img
                  src={item.ico.src}
                  className={s.coins_list_coin_ico}
                  alt="coin-ico"
                />
                <span className={s.coins_list_coin_title}>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={s.redeem_amount_block}>
        <div className={s.redeem_amount_body}>
          <div className={s.redeem_title_block}>
            <span className={s.transaction_fee_title}>Amount to Redeem</span>
            <span className={s.redeem_title_block_subTitle}>Redeemable</span>
          </div>
          <div className={s.redeem_subTitle_block}>
            <span className={s.redeem_minAmount_title}>(Min 20DT)</span>
            <span className={s.redeem_user_balance_block}>
              <span
                className={s.redeem_user_balance_title}
                onClick={handleSetMaxBalancePayout}
              >
                {userBalance} DC
              </span>
              <span className={s.redeem_user_usd_balance_title}> ≈ 1.77 $</span>
            </span>
          </div>
          <input
            className={s.input_common}
            value={valueToPayout}
            inputMode="none"
            onChange={(e: any) => setValueToPayout(e.target.value)}
            type="number"
          />
        </div>
      </div>
      <div className={s.redeem_coin_wallet_address_block}>
        <span className={s.transaction_fee_title}>
          <span>{activeCoin.title}</span> Address
        </span>
        <div className={s.input_common}>
          <span>23sad21sddqwerffs2dwWDfcadweQ23418TZ5d</span>
          {/* temp */}
        </div>
      </div>
      <div className={s.transaction_fee_block}>
        <span className={s.transaction_fee_title}>Transaction Fee:</span>
        <span className={s.transaction_fee_amount_title}>
          1.5
          <span> {activeCoin.title}</span>
        </span>
      </div>
      <div className={s.esimate_receive_block}>
        <div className={s.esimate_receive_title_block}>
          <span className={s.transaction_fee_title}>Estimate Receive</span>
          <span className={s.transaction_receive_title}>≈0usdt</span>
        </div>
        <div className={s.input_common}>
          Amount
          <img
            src={activeCoin.ico.src}
            className={s.esitame_receive_icon_title}
            alt="static-fee-ico"
          />
        </div>
      </div>
      <div className={s.redeem_disclaimer_block}>
        <p className={s.redeem_disclaimer_text}>
          Disclaimer: <br /> The exact amount you receive is subject to
          real-time exchange rate and the actual send amount at the time
          arrival.
        </p>
      </div>
      <button
        className={s.redeem_btn}
        onClick={() => setSecurityModalVisibility(true)}
      >
        Redeem
      </button>
    </div>
  );
};
