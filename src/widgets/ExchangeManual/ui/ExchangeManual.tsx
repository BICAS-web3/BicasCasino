import { useRouter } from "next/router";
import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import { BtnRightArrow } from "@/shared/SVGs/BtnRightArrow";
// import { SelectExchanges } from "./SelectExchanges";
// import { StepTab } from "./StepTab";
import { CopyIco } from "@/public/media/registrManual_images/CopyIco";
import leftArr from "@/public/media/registrManual_images/leftArr.svg";
import { Tab } from "@/pages/RegistrManual";

import step1Img from "@/public/media/registrManual_images/step1Img.webp";
import step2Img from "@/public/media/registrManual_images/step2Img.webp";
import step3Img from "@/public/media/registrManual_images/step3Img.webp";
import step4Img from "@/public/media/registrManual_images/step4Img.webp";
import step5Img from "@/public/media/registrManual_images/step5Img.webp";
import step6Img from "@/public/media/registrManual_images/step6Img.webp";
import step7Img from "@/public/media/registrManual_images/step7Img.webp";
import step8Img from "@/public/media/registrManual_images/step8Img.webp";
import step9Img from "@/public/media/registrManual_images/step9Img.webp";
import step10Img from "@/public/media/registrManual_images/step10Img.webp";
import step11Img from "@/public/media/registrManual_images/step11Img.webp";
import step12Img from "@/public/media/registrManual_images/step12Img.webp";
import step13Img from "@/public/media/registrManual_images/step13Img.webp";

import step1MobImg from "@/public/media/registrManual_images/mobImages/step1MobileImg.webp";
import step4MobImg from "@/public/media/registrManual_images/mobImages/step2MobileImg.webp";
import step5MobImg from "@/public/media/registrManual_images/mobImages/step3MobileImg.webp";
import step6MobImg from "@/public/media/registrManual_images/mobImages/step6MobileImg.webp";
import step7MobImg from "@/public/media/registrManual_images/mobImages/step7MobileImg.webp";
import step8MobImg from "@/public/media/registrManual_images/mobImages/step8MobileImg.webp";
import step9MobImg from "@/public/media/registrManual_images/mobImages/step9MobileImg.webp";
import step11MobImg from "@/public/media/registrManual_images/mobImages/step11MobileImg.webp";
import step12MobImg from "@/public/media/registrManual_images/mobImages/step12MobileImg.webp";
import step13MobImg from "@/public/media/registrManual_images/mobImages/step13MobileImg.webp";
import step12SecondImg from "@/public/media/registrManual_images/mobImages/step12SecondImg.webp";
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
