import { FC, memo, useEffect, useState } from "react";
import s from "./styles.module.scss";
import purchaseIco from "@/public/media/payment/purchaseIco.svg";
import closeIco from "@/public/media/payment/closeIco.svg";
import { PaymentDropdown } from "../PaymentDropdown/PaymentDropdown";
import { coinsList } from "../PaymentRedeem/PaymentRedeem";
import copyIco from "@/public/media/payment/copyIco.svg";
import barcodeImg from "@/public/media/payment/tempBarcode.png";
import clsx from "clsx";
import { WaitIco } from "@/shared/SVGs/WaitIco";
import bonusCoinIco from "@/public/media/payment/bonusCoin.svg";
import draxCoinIco from "@/public/media/payment/draxMiniIco.svg";

interface PaymentPurchaseProps {
  purchasePrice: any;
  bonusPrice: any;
  ref?: any;
  close?: () => void;
}

export const PaymentPurchase: FC<PaymentPurchaseProps> = ({
  purchasePrice,
  bonusPrice,
  ref,
  close,
}) => {
  const [activeCoin, setActiveCoin] = useState(coinsList[0]);

  const [sendAddress, setSendAddress] = useState("address");

  const addressToClipboard = () => {
    navigator.clipboard.writeText(sendAddress);
  };

  const [ercActive, setErcActive] = useState(true);
  const [memoWarning, setMemoWarning] = useState(false);

  useEffect(() => {
    if (activeCoin.title === "xrp") {
      setMemoWarning(true);
    }
  }, [activeCoin]);

  return (
    <div ref={ref} className={s.payment_purchase_block}>
      <div className={s.payment_purchase_header}>
        <div className={s.payment_purchase_header_title_group}>
          <img src={purchaseIco.src} alt="purcahse-ico" />
          Purchase
        </div>
        <img
          onClick={close}
          src={closeIco.src}
          className={s.close_btn}
          alt="close-ico"
        />
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
                <span className={s.paymnet_purchase_drax_amount_title}>
                  <img src={draxCoinIco.src} alt="" />
                  {purchasePrice}
                </span>
              </span>
            </div>
            <div className={s.payment_purchase_estimate_bonus_wrap}>
              <span className={s.payment_purchase_estimate_bonus_title}>
                Bonus Coin
                <span className={s.paymnet_purchase_drax_amount_title}>
                  <img src={bonusCoinIco.src} alt="" />
                  {bonusPrice}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className={s.send_amount_block}>
          <div className={s.send_amount_group}>
            <span className={s.send_amount_title}>Send Amount</span>
            <span className={s.send_amount_subTitle}>≈{purchasePrice}usdt</span>
          </div>
          <div className={s.send_amount_input_block}>
            <input type="text" className={s.send_amount_input} />
            <div className={s.send_amount_dropdown_wrap}>
              <PaymentDropdown list={coinsList} setActive={setActiveCoin} />
            </div>
          </div>
        </div>
        {memoWarning && (
          <div className={s.memo_warning_block}>
            <span className={s.memo_warning_text}>
              Warning: <br /> If the Memo is not included in your transaction,
              we cannot credit your account.
            </span>
            <button
              className={s.warning_btn}
              onClick={() => setMemoWarning(false)}
            >
              Got it
            </button>
          </div>
        )}
        <div className={clsx(s.send_address_block, memoWarning && s.hidden)}>
          {activeCoin.title == "eth" ? (
            <span className={s.eth_title}>
              <div className={s.eth_circle}></div> ERC20
            </span>
          ) : activeCoin.title === "usdt" ? (
            <div className={s.usdt_network_wrap}>
              <div
                className={clsx(
                  s.usdt_network_item,
                  ercActive && s.usdt_network_active
                )}
                onClick={() => setErcActive(true)}
              >
                <div className={s.usdt_network_circle}></div>
                ERC20
              </div>
              <div
                className={clsx(
                  s.usdt_network_item,
                  !ercActive && s.usdt_network_active
                )}
                onClick={() => setErcActive(false)}
              >
                <div className={s.usdt_network_circle}></div>
                TRC20
              </div>
            </div>
          ) : (
            <span className={clsx(s.send_address_title)}>
              <span>{activeCoin.title}</span> Send Address
            </span>
          )}
          <div className={s.send_address}>
            {sendAddress}
            <img
              src={copyIco.src}
              onClick={addressToClipboard}
              alt="copy-ico"
            />
          </div>
        </div>
        <div className={clsx(s.barcode_wrap, memoWarning && s.hidden)}>
          <img src={barcodeImg.src} className={s.barcode_img} alt="" />
        </div>
        <div className={s.purchase_disclaimer}>
          Disclaimer: <br /> The exact amount you receive is subject to
          real-time exchange rate and the actual send amount at the time
          arrival.
        </div>
        <div className={clsx(s.purchase_status_block, memoWarning && s.hidden)}>
          <div className={s.purchase_status_text}>Waiting for payment</div>
          <div className={s.purchase_waiting_anim_block}>
            <WaitIco />
          </div>
        </div>
      </div>
    </div>
  );
};
