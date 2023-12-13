import { useRouter } from "next/router";
import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import { BtnRightArrow } from "@/shared/SVGs/BtnRightArrow";
// import { SelectExchanges } from "./SelectExchanges";
// import { StepTab } from "./StepTab";
import { CopyIco } from "@/public/media/registrManual_images/CopyIco";
import leftArr from "@/public/media/registrManual_images/leftArr.svg";
import { Tab } from "@/pages/RegistrManual";

import step1Img from "@/public/media/registrManual_images/step1Img.png";
import step2Img from "@/public/media/registrManual_images/step2Img.png";
import step3Img from "@/public/media/registrManual_images/step3Img.png";
import step4Img from "@/public/media/registrManual_images/step4Img.png";
import step5Img from "@/public/media/registrManual_images/step5Img.png";
import step6Img from "@/public/media/registrManual_images/step6Img.png";
import step7Img from "@/public/media/registrManual_images/step7Img.png";
import step8Img from "@/public/media/registrManual_images/step8Img.png";
import step9Img from "@/public/media/registrManual_images/step9Img.png";
import step10Img from "@/public/media/registrManual_images/step10Img.png";
import step11Img from "@/public/media/registrManual_images/step11Img.png";
import step12Img from "@/public/media/registrManual_images/step12Img.png";
import step13Img from "@/public/media/registrManual_images/step13Img.png";

import step1MobImg from "@/public/media/registrManual_images/mobImages/step1MobileImg.png";
import step4MobImg from "@/public/media/registrManual_images/mobImages/step2MobileImg.png";
import step5MobImg from "@/public/media/registrManual_images/mobImages/step3MobileImg.png";
import step6MobImg from "@/public/media/registrManual_images/mobImages/step6MobileImg.png";
import step7MobImg from "@/public/media/registrManual_images/mobImages/step7MobileImg.png";
import step8MobImg from "@/public/media/registrManual_images/mobImages/step8MobileImg.png";
import step9MobImg from "@/public/media/registrManual_images/mobImages/step9MobileImg.png";
import step11MobImg from "@/public/media/registrManual_images/mobImages/step11MobileImg.png";
import step12MobImg from "@/public/media/registrManual_images/mobImages/step12MobileImg.png";
import step13MobImg from "@/public/media/registrManual_images/mobImages/step13MobileImg.png";
import step12SecondImg from "@/public/media/registrManual_images/mobImages/step12SecondImg.png";
import Link from "next/link";

import * as Model from "@/widgets/ManualBonusReceiving/model";

interface WalletPresenceProps {
  mobile: boolean;
  step: number;
  setSubPage: any;
  setStep: any;
  setTab?: any;
}

export const WalletPresence: FC<WalletPresenceProps> = ({
  mobile,
  step,
  setSubPage,
  setStep,
  setTab,
}) => {
  const router = useRouter();
  return (
    <div className={s.wallet_body}>
      <Link href={"/RegistrManual"} className={s.tab_back_btn}>
        <img src={leftArr.src} alt="left-arr" />
        Back
      </Link>
      <div className={s.wallet_header}>
        <span className={s.wallet_upperText}>
          Now you need to send ETH tokens in the Arbitrum network from your
          crypto exchange account to the your wallet
        </span>
        <h1 className={s.wallet_title}>
          Do you have an account on crypto exchange?
        </h1>
        <span className={s.wallet_subTitle}>
          We are supporting only Metamask, Coinbase and Trust Wallet *
        </span>
        <div className={s.wallet_btns}>
          <button
            className={s.wallet_btns_item}
            onClick={() => {
              setSubPage(Model.SubPage.Start);
              setStep(1);
            }}
          >
            {mobile ? "I have an account" : "I have a crypto exchange account"}
            <BtnRightArrow />
          </button>
          <button
            className={s.wallet_btns_item}
            onClick={
              () => {
                setSubPage(Model.SubPage.ExchangeCreation);
                setStep(0);
              }
              // router.push(
              //   "/RegistrManual?tab=bonusReceiving&subPage=exchange_creation"
              // )
            }
          >
            {mobile
              ? "I don’t have an account"
              : "I don’t have a crypto exchange account"}
            <BtnRightArrow />
          </button>
        </div>
      </div>
      <button
        className={s.back_btn}
        data-only={"true"}
        onClick={() => router.push("/")}
      >
        Cancel
      </button>
    </div>
  );
};
