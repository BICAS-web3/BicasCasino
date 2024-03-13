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
import * as api from "@/shared/api";
import * as RegistrModel from "@/widgets/Registration/model";
import { useUnit } from "effector-react";
import Image from "next/image";
interface PaymentPurchaseProps {
  purchasePrice: any;
  bonusPrice: any;
  ref?: any;
  close?: () => void;
}

interface IInvoiceCreate {
  type: string;
  id: string;
  merchant_id: string;
  order_id: string;
  create_date: number;
  status: number;
  pay_url: string;
  user_id: number;
  amount: string;
  currency: string;
}

export const PaymentPurchase: FC<PaymentPurchaseProps> = ({
  purchasePrice,
  bonusPrice,
  ref,
  close,
}) => {
  const [access_token] = useUnit([RegistrModel.$access_token]);
  const [amount, setAmount] = useState("");
  const [invoiceCreate, setInvoiceCreate] = useState<null | IInvoiceCreate>(
    null
  );
  const [activeCoin, setActiveCoin] = useState(coinsList[0]);

  const [networkActive, setNetworkActive] = useState<"ETHEREUM" | "TRON">(
    "ETHEREUM"
  );
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

  const [send, setSend] = useState(true);
  const [response, setResponse] = useState<any>(null);
  useEffect(() => {
    if (access_token && purchasePrice) {
      (async () => {
        const data = await api.invoiceCreate({
          amount: purchasePrice,
          currency:
            activeCoin.title === "USDT" ||
            activeCoin.title === "USDC" ||
            activeCoin.title === "TUSD"
              ? `${activeCoin.title}_${networkActive}`
              : activeCoin.title,
          bareer: access_token,
        });
        if (data.status === "OK") {
          setInvoiceCreate(data.body as any);
        }
        console.log(data);
      })();
    }

    setSend(false);
  }, [
    send,
    access_token,
    purchasePrice,
    activeCoin,
    activeCoin.title,
    networkActive,
  ]);

  const [priceList, setPriceList] = useState<any>([]);

  useEffect(() => {
    if (access_token && priceList?.length === 0) {
      (async () => {
        const response = await api.getInvoicePrices({ bareer: access_token });
        if (response.status === "OK") {
          console.log("invoice prices", response.body);
          setPriceList(response.body?.prices);
        }
      })();
    }
  }, [access_token]);

  const [showNetworks, setShowNetworks] = useState(false);

  useEffect(() => {
    if (
      activeCoin.title === "USDT" ||
      activeCoin.title === "USDC" ||
      activeCoin.title === "TUSD"
    ) {
      setShowNetworks(true);
    } else {
      setShowNetworks(false);
    }
  }, [activeCoin.title]);

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
            <span onClick={() => setSend(true)} className={s.send_amount_title}>
              Send Amount
            </span>
            <span className={s.send_amount_subTitle}>≈{purchasePrice}usdt</span>
          </div>
          <div className={s.send_amount_input_block}>
            <input
              value={
                purchasePrice &&
                purchasePrice /
                  priceList
                    ?.find((item: any) => item?.monetary === activeCoin.title)
                    ?.rates?.find((el: any) => el.fiatCurrency === "USD").rate
              }
              // onChange={(el) => setAmount(el.target.value)}
              type="text"
              className={s.send_amount_input}
            />
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
          {showNetworks && (
            <div className={s.usdt_network_wrap}>
              <div
                className={clsx(
                  s.usdt_network_item,
                  ercActive && s.usdt_network_active
                )}
                onClick={() => {
                  setNetworkActive("ETHEREUM");
                  setErcActive(true);
                }}
              >
                <div className={s.usdt_network_circle}></div>
                ERC20
              </div>
              <div
                className={clsx(
                  s.usdt_network_item,
                  !ercActive && s.usdt_network_active
                )}
                onClick={() => {
                  setNetworkActive("TRON");
                  setErcActive(false);
                }}
              >
                <div className={s.usdt_network_circle}></div>
                TRC20
              </div>
            </div>
          )}{" "}
          <span className={clsx(s.send_address_title)}>
            <span>
              {activeCoin.title?.split("_")[0]}{" "}
              {activeCoin.title?.split("_")[1] &&
                (activeCoin.title?.split("_")[1] === "ETHEREUM" ||
                  activeCoin.title?.split("_")[1] === "TRON") &&
                activeCoin.title?.split("_")[0] !== "ETH" &&
                activeCoin.title?.split("_")[0] !== "TRX" &&
                activeCoin.title?.split("_")[1]}
            </span>{" "}
            Send Address
          </span>
          <div className={s.send_address}>
            {invoiceCreate?.pay_url}
            <img
              src={copyIco.src}
              onClick={addressToClipboard}
              alt="copy-ico"
            />
          </div>
        </div>
        <div className={clsx(s.barcode_wrap, memoWarning && s.hidden)}>
          <img
            width={200}
            height={200}
            src={`http://127.0.0.1:8585/api/invoice/qr/${
              invoiceCreate?.order_id || 1
            }`}
            alt="text"
          />
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
