import { FC, useState } from "react";
import s from "./styles.module.scss";
import purchaseIco from "@/public/media/payment/purchaseIco.svg";
import closeIco from "@/public/media/payment/closeIco.svg";
import { PaymentDropdown } from "../PaymentDropdown/PaymentDropdown";
import { coinsList } from "../PaymentRedeem/PaymentRedeem";
import copyIco from "@/public/media/payment/copyIco.svg";
import barcodeImg from "@/public/media/payment/tempBarcode.png";

interface PaymentPurchaseProps {
  purchasePrice: any;
}

export const PaymentPurchase: FC<PaymentPurchaseProps> = ({
  purchasePrice,
}) => {
  const [activeCoin, setActiveCoin] = useState(coinsList[0]);

  const [sendAddress, setSendAddress] = useState("address");

  const addressToClipboard = () => {
    navigator.clipboard.writeText(sendAddress);
  };

  return (
    <div className={s.payment_purchase_block}>
      <div className={s.payment_purchase_header}>
        <div className={s.payment_purchase_header_title_group}>
          <img src={purchaseIco.src} alt="purcahse-ico" />
          Purchase
        </div>
        <img src={closeIco.src} className={s.close_btn} alt="close-ico" />
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
              </span>
            </div>
            <div className={s.payment_purchase_estimate_bonus_wrap}>
              <span className={s.payment_purchase_estimate_bonus_title}>
                Bonus Coin
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
        <div className={s.send_address_block}>
          <span className={s.send_address_title}>
            <span>{activeCoin.title}</span> Send Address
          </span>
          <div className={s.send_address}>
            {sendAddress}
            <img
              src={copyIco.src}
              onClick={addressToClipboard}
              alt="copy-ico"
            />
          </div>
        </div>
        <div className={s.barcode_wrap}>
          <img src={barcodeImg.src} className={s.barcode_img} alt="" />
        </div>
        <div className={s.purchase_disclaimer}>
          Disclaimer: <br /> The exact amount you receive is subject to
          real-time exchange rate and the actual send amount at the time
          arrival.
        </div>
      </div>
    </div>
  );
};
