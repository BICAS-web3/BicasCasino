import s from "./styles.module.scss";
import { FC } from "react";
import Coinbase from "@/public/media/select_wallet/Coinbase.svg";
import binanceIco from "@/public/media/registrManual_images/binance.svg";
import bybitIco from "@/public/media/registrManual_images/bybit.svg";
import huobiIco from "@/public/media/registrManual_images/huobi.svg";
import kucoinIco from "@/public/media/registrManual_images/kucoin.svg";
import { BtnRightArrow } from "@/shared/SVGs/BtnRightArrow";
import { useRouter } from "next/router";
import leftArr from "@/public/media/registrManual_images/leftArr.svg";
import { Tab } from "@/pages/RegistrManual";
import { SubPage } from "./ManualBonusReceiving";

const exchangesList = [
  {
    ico: binanceIco,
    title: "Binance",
    link: "https://accounts.binance.com/en/register",
  },
  {
    ico: bybitIco,
    title: "Bybit",
    link: "https://www.bybit.com/en/sign-up",
  },
  {
    ico: Coinbase,
    title: "Coinbase Pro",
    link: "https://accounts.binance.com/en/register",
  },
  {
    ico: huobiIco,
    title: "Huobi",
    link: "https://global-aws.huobi.com/en-us/v/register/double-invite/web",
  },
  {
    ico: kucoinIco,
    title: "KuCoin",
    link: "https://www.kucoin.com/ru",
  },
];

interface SelectExchangesProps {
  step: number;
  setSubPage: any;
  setStep: any;
  setTab: any
}

export const SelectExchanges: FC<SelectExchangesProps> = (props) => {
  //const router = useRouter();

  return (
    <div className={s.select_exchanges_body}>
      <span
        className={s.tab_back_btn}
        onClick={() =>
          props.setSubPage(SubPage.WalletPresence)
        }
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <div className={s.select_exchanges_header}>
        <h1 className={s.select_exchanges_title}>
          Please, select one of the crypto exchanges
        </h1>
        <div className={s.exchanges_list}>
          {exchangesList.map((item, ind) => (
            <div
              key={ind}
              className={s.exchanges_list_item}
              onClick={() => {
                window.open(`${item.link}`, "_blank");
              }}
            >
              <div className={s.exchanges_list_item_leftSide}>
                <img src={item.ico.src} alt="site-ico" />
                <span className={s.exchanges_list_item_title}>
                  {item.title}
                </span>
              </div>
              <BtnRightArrow />
            </div>
          ))}
        </div>
        <p className={s.select_exchanges_subTitle}>
          You will be redirected to the official website to register in the
          exchange site.
        </p>
      </div>
      <div className={s.exchange_bottom_group}>
        <p className={s.exchange_bottom_group_text}>
          If you have already created a cryptocurrency wallet account, click
          &quot;Next&quot;
        </p>
        <div className={s.exchange_bottom_btns}>
          <button
            className={s.exchange_bottom_back_btn}
            onClick={() =>
              props.setSubPage(SubPage.WalletPresence)
            }
          >
            Back
          </button>
          <button
            className={s.exchange_bottom_next_btn}
            onClick={() => {
              props.setStep(1);
              props.setSubPage(SubPage.Start)
            }
            }
          >
            Next
          </button>
        </div>
      </div>
    </div >
  );
};
