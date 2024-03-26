import { FC, useEffect, useState } from "react";
import s from "./styles.module.scss";
import { useUnit } from "effector-react";
import * as PaymentM from "./model";
import storeIco from "@/public/media/payment/storeIco.svg";
import closeIco from "@/public/media/payment/closeIco.svg";
import clsx from "clsx";
import attentionCoins from "@/public/media/payment/attentionCoins.svg";
import miniDraxIco from "@/public/media/payment/draxMiniIco.svg";
import draxCoin from "@/public/media/payment/draxCoin.svg";
import { PaymentRedeem } from "../PaymentRedeem/PaymentRedeem";
import { PaymentTips } from "../PaymentTips/PaymentTips";
import * as PaymentRedeemM from "@/widgets/PaymentRedeem/model";
import { PaymentPurchase } from "../PaymentPurchase/PaymentPurchase";
import { PaymentStatus } from "../PaymentStatus/PaymentStatus";
import { useDropdown } from "@/shared/tools";
import { WalletBtn } from "@/shared/SVGs";
import * as api from "@/shared/api";
import * as RegistModel from "@/widgets/Registration/model";
import * as LayoutModel from "@/widgets/Layout/model";

const draxTypesList = [
  {
    bonusCoins: "100,000",
    usdPrice: 10,
  },
  {
    bonusCoins: "50,000",
    usdPrice: 50,
  },
  {
    bonusCoins: "100,000",
    usdPrice: 100,
  },
  // {
  //   bonusCoins: "1,000,000",
  //   usdPrice: 100,
  // },
  {
    bonusCoins: "500,000",
    usdPrice: 500,
  },
  {
    bonusCoins: "1,000,000",
    usdPrice: 1000,
  },
  {
    bonusCoins: "2,000,000",
    usdPrice: 2000,
  },
  // {
  //   bonusCoins: "50,000,000",
  //   usdPrice: 5000,
  // },
];

interface PaymentProps { }

export const Payment: FC<PaymentProps> = () => {
  const { toggle, open, close, isOpen, dropdownRef } = useDropdown();
  const [
    paymentVisibility,
    setPaymentVisibility,
    storeType,
    setStoreType,
    securityModal,
    setSecurityModal,
    purchaseVisibility,
    setPurchaseVisibility,
    access_token,
    userInfo
  ] = useUnit([
    PaymentM.$paymentVisibility,
    PaymentM.setPaymentVisibility,
    PaymentM.$storeType,
    PaymentM.setStoreType,
    PaymentRedeemM.$securityModalVisibility,
    PaymentRedeemM.setSecurityModalVisibility,
    PaymentM.$purchaseVisibility,
    PaymentM.setPurcahseVisibility,
    RegistModel.$access_token,
    LayoutModel.$userInfo,
  ]);

  const [purchaseValue, setPurchaseValue] = useState();
  const [bonusValue, setBonusValue] = useState();

  const handlePurchaseBtn = (price: any, bonusPrice: any) => {
    setPurchaseValue(price);
    setBonusValue(bonusPrice);
    setPurchaseVisibility(true);
  };

  const [link, setLink] = useState(1);

  // TODO: turn into a separate widget
  const [otToken, setOtToken] = useState<any | undefined>();
  useEffect(() => {
    (async () => {
      if (access_token && !otToken) {
        const response = await api.getOneTimeToken({ bareer: access_token });
        if (response.status === "OK") {
          setOtToken((response as any).body);
          console.log("ONE TIME TOKEN---", response.body);
        } else {
          console.log("ONE TIME TOKEN ERROR", response.body);
        }
      }
    })();
  }, [access_token, otToken]);

  const init = () => {
    if (otToken?.token && userInfo) {
      const userId = userInfo.id.toString();
      const apiKey = "d0b51692-185e-49f9-a7c8-034d1e0bb1bf";
      const callbackUrl = "https://game.greekkeepers.io/api/p2way/callback";
      const token = otToken.token;

      const params = { userId, apiKey, callbackUrl, token };

      console.log("PARAMS", params);
      window.initP2PWidget(params);
    }
  };

  // TODO: remove this effect
  useEffect(() => {
    if (!isOpen) {
      setOtToken(undefined);// TODO: remove
    }

  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => {
          console.log(2);
          open();
          setLink((prev) => prev + 1);

          init() // TODO: add a proper button, remove this line
        }}
        className={s.wallet_btn}
      >
        <span> Wallet</span> <WalletBtn />
      </button>{" "}
      <div className={clsx(s.payment_wrap, isOpen && s.payment_wrap_open)}>
        {paymentVisibility && !purchaseVisibility ? (
          <div
            ref={dropdownRef}
            className={clsx(
              s.payment_body,
              storeType === "buy" && s.padding_bottom,
              storeType === "redeem" && s.redeem_active,
              storeType === "tips" && s.tips_active,
              securityModal && s.security_modal_active
            )}
          >
            <div className={s.payment_header}>
              <span className={s.store_title}>
                <img
                  src={storeIco.src}
                  className={s.store_ico}
                  alt="store-ico"
                />
                Wallet
              </span>
              <div className={s.payment_leftSide_header}>
                {/* <span className={s.payment_transactions_btn}>Transactions</span> */}
                <img
                  onClick={() => {
                    close();
                    setPurchaseVisibility(false);

                  }}
                  src={closeIco.src}
                  className={s.close_btn}
                  alt="close-ico"
                />
              </div>
            </div>
            <div className={s.payment_content}>
              <div className={s.store_type_wrap}>
                <div className={s.store_type_block}>
                  <button
                    className={clsx(
                      s.store_type_btn,
                      storeType === "buy" && s.active_store_btn
                    )}
                    onClick={() => setStoreType("buy")}
                  >
                    Buy
                  </button>
                  <button
                    className={clsx(
                      s.store_type_btn,
                      storeType === "redeem" && s.active_store_btn
                    )}
                    onClick={() => setStoreType("redeem")}
                  >
                    Redeem
                  </button>
                  <button
                    className={clsx(
                      s.store_type_btn,
                      storeType === "tips" && s.active_store_btn
                    )}
                    onClick={() => setStoreType("tips")}
                  >
                    Tips
                  </button>
                </div>
              </div>
              {storeType === "buy" ? (
                <>
                  <div className={s.payment_attention}>
                    <span className={s.payment_attention_text}>
                      <span>DRAX tokens</span> won through play can be <br />{" "}
                      redeemed for
                      <p> BTC, LTC</p> and more
                    </span>
                    <div className={s.attention_coins_wrap}>
                      <div className={s.attention_coins_shadow}></div>
                      <img
                        src={attentionCoins.src}
                        className={s.attention_coins}
                        alt="coins"
                      />
                    </div>
                  </div>
                  <div className={s.drax_list}>
                    {draxTypesList.map((item, ind) => (
                      <div className={s.drax_list_item} key={ind}>
                        <div className={s.drax_list_item_header}>
                          <img
                            src={miniDraxIco.src}
                            className={s.mini_drax_ico}
                            alt="mini-drax-static"
                          />
                          <span className={s.drax_list_item_header_title}>
                            {item.usdPrice} DRAX Coins
                          </span>
                        </div>
                        <div className={s.drax_list_item_body}>
                          <div className={s.drax_icon_wrap}>
                            <img
                              src={draxCoin.src}
                              className={s.drax_icon}
                              alt="drax-coin-static"
                            />
                            {/* <div className={s.drax_icon_shadow}></div> */}
                          </div>
                          <span className={s.bonux_coins_amount_title}>
                            {item.bonusCoins} <br /> bonus coins
                          </span>
                          <button
                            className={s.buy_btn}
                            onClick={() =>
                              handlePurchaseBtn(item.usdPrice, item.bonusCoins)
                            }
                          >
                            ${item.usdPrice}
                          </button>
                        </div>
                      </div>
                    ))}
                    <span className={s.payout_attention_title}>
                      Maximum purchase of $5000 USD per day
                    </span>
                  </div>
                </>
              ) : storeType === "redeem" ? (
                <PaymentRedeem />
              ) : (
                <PaymentTips />
              )}
            </div>
          </div>
        ) : (
          <PaymentPurchase
            purchasePrice={purchaseValue}
            bonusPrice={bonusValue}
            close={close}
            ref={dropdownRef}
          />
        )}
      </div>
    </>
  );
};
