import { FC, useEffect, useState } from "react";

import { Layout } from "@/widgets/Layout";

import s from "./styles.module.scss";
import { ExchangeManual } from "@/widgets/ExchangeManual";
import { StepTab } from "@/widgets/ManualBonusReceiving/StepTab";

import * as ManualModel from "@/widgets/ManualBonusReceiving/model";
import { useUnit } from "effector-react";
import { SelectExchanges } from "@/widgets/ManualBonusReceiving/SelectExchanges";
import {
  Step10Content,
  Step11Content,
  Step12Content,
  Step13Content,
  Step1Content,
  Step2Content,
  Step3Content,
  Step4Content,
  Step5Content,
  Step6Content,
  Step7Content,
  Step8Content,
  Step9Content,
} from "@/widgets/ManualBonusReceiving/ManualBonusReceiving";

export default function Home() {
  const [mobile, setMobile] = useState(false);
  const [is700, setIs700] = useState(false);
  const [desk, setDesk] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 700 && width >= 650) {
        setMobile(false);
        setIs700(true);
        setDesk(false);
      } else if (width <= 650) {
        setMobile(true);
        setIs700(false);
        setDesk(false);
      } else {
        setMobile(false);
        setIs700(false);
        setDesk(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [step, subPage, setStep, setSubPage] = useUnit([
    ManualModel.$step,
    ManualModel.$subPage,
    ManualModel.setStep,
    ManualModel.setSubPage,
  ]);
  return (
    <Layout gameName={undefined}>
      {/* <LiveBetsWS subscription_type={"SubscribeAll"} subscriptions={[]} /> */}
      <div
        className={`${s.registr_manual_section} `} // ${step !== undefined && s.gap_none}
      >
        <div className={s.top_blur}></div>
        <div className={s.bottom_blur}></div>
        {subPage === ManualModel.SubPage.WalletPresence && (
          <ExchangeManual
            mobile={mobile}
            step={step}
            setSubPage={setSubPage}
            setStep={setStep}
          />
        )}
        {subPage === ManualModel.SubPage.ExchangeCreation && (
          <SelectExchanges
            step={step}
            setSubPage={setSubPage}
            setStep={setStep}
          />
        )}
        {step === 1 && (
          <StepTab
            content={
              <Step1Content
                is700={is700}
                mobile={mobile}
                desk={desk}
                step={step}
                setStep={setStep}
                setSubPage={setSubPage}
              />
            }
          />
        )}
        {step === 2 && desk && (
          <StepTab
            content={
              <Step2Content
                step={step}
                setSubPage={setSubPage}
                setStep={setStep}
              />
            }
          />
        )}
        {step === 3 && desk && (
          <StepTab
            content={
              <Step3Content
                step={step}
                setSubPage={setSubPage}
                setStep={setStep}
              />
            }
          />
        )}
        {step === 4 && (
          <StepTab
            content={
              <Step4Content
                is700={is700}
                mobile={mobile}
                desk={desk}
                step={step}
                setSubPage={setSubPage}
                setStep={setStep}
              />
            }
          />
        )}
        {step === 5 && (
          <StepTab
            content={
              <Step5Content
                desk={desk}
                step={step}
                setSubPage={setSubPage}
                setStep={setStep}
              />
            }
          />
        )}
        {step === 6 && (
          <StepTab
            content={
              <Step6Content
                desk={desk}
                step={step}
                setSubPage={setSubPage}
                setStep={setStep}
              />
            }
          />
        )}
        {step === 7 && (
          <StepTab
            content={
              <Step7Content
                desk={desk}
                step={step}
                setSubPage={setSubPage}
                setStep={setStep}
              />
            }
          />
        )}
        {step === 8 && (
          <StepTab
            content={
              <Step8Content
                desk={desk}
                step={step}
                setSubPage={setSubPage}
                setStep={setStep}
              />
            }
          />
        )}
        {step === 9 && (
          <StepTab
            content={
              <Step9Content
                desk={desk}
                step={step}
                setSubPage={setSubPage}
                setStep={setStep}
              />
            }
          />
        )}
        {step === 10 && desk && (
          <StepTab
            content={
              <Step10Content
                step={step}
                setSubPage={setSubPage}
                setStep={setStep}
              />
            }
          />
        )}
        {step === 11 && (
          <StepTab
            content={
              <Step11Content
                desk={desk}
                mob={mobile}
                step={step}
                setSubPage={setSubPage}
                setStep={setStep}
              />
            }
          />
        )}
        {step === 12 && (
          <StepTab
            content={
              <Step12Content
                desk={desk}
                step={step}
                setSubPage={setSubPage}
                setStep={setStep}
              />
            }
          />
        )}
        {step === 13 && (
          <StepTab
            content={
              <Step13Content
                desk={desk}
                step={step}
                setSubPage={setSubPage}
                setStep={setStep}
              />
            }
          />
        )}
      </div>
    </Layout>
  );
}
