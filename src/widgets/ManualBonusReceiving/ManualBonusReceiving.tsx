import { useRouter } from "next/router";
import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import { BtnRightArrow } from "@/shared/SVGs/BtnRightArrow";
import { SelectExchanges } from "./SelectExchanges";
import { StepTab } from "./StepTab";
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
import { useUnit } from "effector-react";

// const steps = [
//   {
//     title:
//       "Please, open Trust Wallet Extension in your browser. Make sure you have switched on ETH in Arbitrum Network. To do so, click on magnifier icon",
//     img: step1Img,
//   },
//   {
//     title:
//       "Start typing `arb` into the address bar. If the token is not connected, turn the switch to the active state",
//     img: step2Img,
//   },
//   {
//     title: `Return to the home page and click on "Receive"`,
//     img: step3Img,
//   },
//   {
//     title: "Select token to receive, finding ETH in Arbitrum Network",
//     img: step4Img,
//   },
//   {
//     title: "Copy the address",
//     img: step5Img,
//   },
//   {
//     title: `Please, open the crypto exchange app, find the ETH token and select "Send ETH"`,
//     img: step6Img,
//   },
//   {
//     title: `Please, open the crypto exchange app, find the ETH token and select "Send ETH"`,
//     img: step1Img,
//   },
// ];

interface Step13ContentProps {
  desk: boolean;
  step: number;
  setSubPage: any;
  setStep: any;
}

export const Step13Content: FC<Step13ContentProps> = ({
  desk,
  step,
  setSubPage,
  setStep,
}) => {
  const router = useRouter();

  return (
    <div className={s.step_body}>
      <span className={s.tab_back_btn} onClick={() => setStep(12)}>
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {desk ? step : 10}</span>
      <div className={s.step_header}>
        <h4 className={s.step_congrats_title}>Congrats!</h4>
        <p className={s.step_tab_title}>
          Now you can play games with the bonus token, pick any game and select
          DRAXB as a payment
        </p>
        <img
          src={desk ? step13Img.src : step13MobImg.src}
          className={`${s.step_example_img} ${s.step_13_img}`}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button className={s.back_btn} onClick={() => setStep(12)}>
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() => router.push("/")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step12ContentProps {
  desk: boolean;
  step: number;
  setSubPage: any;
  setStep: any;
}

export const Step12Content: FC<Step12ContentProps> = ({
  desk,
  step,
  setSubPage,
  setStep,
}) => {
  // const router = useRouter();
  // const { query } = router;
  // const { step } = query;

  return (
    <div className={s.step_body}>
      <span className={s.tab_back_btn} onClick={() => setStep(11)}>
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {desk ? step : 9}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Visit our website{" "}
          <a href="https://game.greekkeepers.io" target="_blank">
            game.greekkeepers.io
          </a>
          , connect wallet and claim your bonus:
        </p>
        <img
          src={desk ? step12Img.src : step12MobImg.src}
          className={`${s.step_example_img} ${s.step_12_img}`}
          alt="examples-img"
        />
        <p className={s.desk_hidden_example_text}>
          Site and Trust Wallet is going to synchronize
        </p>
        <img
          src={step12SecondImg.src}
          className={s.desk_hidden_example_second_img}
          alt="example_img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button className={s.back_btn} onClick={() => setStep(11)}>
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() => setStep(13)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step11ContentProps {
  desk: boolean;
  mob: boolean;
  step: number;
  setSubPage: any;
  setStep: any;
}

export const Step11Content: FC<Step11ContentProps> = ({
  desk,
  mob,
  step,
  setSubPage,
  setStep,
}) => {
  // const router = useRouter();
  // const { query } = router;
  // const { step } = query;

  const copyToClipboard = () => {
    const address = "0x5518e648341147b0f4041c5e2a2cca41bdc723a0";
    navigator.clipboard
      .writeText(address)
      .then(() => { })
      .catch((err) => {
        console.error("error copy", err);
      });
  };

  return (
    <div className={s.step_body}>
      <span className={s.tab_back_btn} onClick={() => setStep(10)}>
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {desk ? step : 8}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          In the opened window paste the address of the DRAXB token contract.
          Then click &quot;Add Token&quot;
        </p>
        <img
          src={desk ? step11Img.src : step11MobImg.src}
          className={s.step_example_img}
          alt="examples-img"
        />
        <div className={s.draxb_address_block}>
          <span className={s.draxb_copy_title}>Copy token address DRAXB</span>
          <div
            className={`${!mob
                ? s.draxb_address_copy_block
                : s.second_draxb_address_copy_block
              }`}
            onClick={() => copyToClipboard()}
          >
            <span className={s.draxb_address}>
              0x5518e648341147b0f4041c5e2a2cca41bdc723a0
            </span>
            <CopyIco />
          </div>
        </div>
      </div>
      <div className={s.step_btns_list}>
        <button className={s.back_btn} onClick={() => setStep(desk ? 10 : 9)}>
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() => setStep(12)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step10ContentProps {
  step: number;
  setSubPage: any;
  setStep: any;
}

export const Step10Content: FC<Step10ContentProps> = (props) => {
  // const router = useRouter();
  // const { query } = router;
  // const { step } = query;

  return (
    <div className={s.step_body}>
      <span className={s.tab_back_btn} onClick={() => props.setStep(9)}>
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {props.step}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Scroll down and click &quot;Don&apos;t see your crypto? Import&quot;
        </p>
        <img
          src={step10Img.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button className={s.back_btn} onClick={() => props.setStep(9)}>
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() => props.setStep(11)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step9ContentProps {
  desk: boolean;
  step: number;
  setSubPage: any;
  setStep: any;
}

export const Step9Content: FC<Step9ContentProps> = ({
  desk,
  step,
  setSubPage,
  setStep,
}) => {
  // const router = useRouter();
  // const { query } = router;
  // const { step } = query;

  return (
    <div className={s.step_body}>
      <span className={s.tab_back_btn} onClick={() => setStep(8)}>
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {desk ? step : 7}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Scroll down and click &quot;Don&apos;t see your crypto? Import&quot;
        </p>
        <img
          src={desk ? step9Img.src : step9MobImg.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button className={s.back_btn} onClick={() => setStep(8)}>
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() => setStep(desk ? 10 : 11)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step8ContentProps {
  desk: boolean;
  step: number;
  setSubPage: any;
  setStep: any;
}

export const Step8Content: FC<Step8ContentProps> = ({
  desk,
  step,
  setSubPage,
  setStep,
}) => {
  // const router = useRouter();
  // const { query } = router;
  // const { step } = query;

  return (
    <div className={s.step_body}>
      <span className={s.tab_back_btn} onClick={() => setStep(7)}>
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {desk ? step : 6}</span>
      <div className={s.step_header}>
        <p className={s.step_upper_subTitle}>
          After depositing, you need to add the address of the bonus token to
          your wallet
        </p>
        <p className={s.step_tab_title}>
          To do this, go to the section “Home” in left corner of the screen,
          then click on &quot;Manage Crypto&quot;
        </p>
        <img
          src={desk ? step8Img.src : step8MobImg.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button className={s.back_btn} onClick={() => setStep(7)}>
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() => setStep(9)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step7ContentProps {
  desk: boolean;
  step: number;
  setSubPage: any;
  setStep: any;
}

export const Step7Content: FC<Step7ContentProps> = ({
  desk,
  step,
  setSubPage,
  setStep,
}) => {
  // const router = useRouter();
  // const { query } = router;
  // const { step } = query;

  return (
    <div className={s.step_body}>
      <span className={s.tab_back_btn} onClick={() => setStep(6)}>
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {desk ? step : 5}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Please, open the crypto exchange app, find the ETH token and select
          &quot;Send ETH&quot;
        </p>
        <img
          src={desk ? step7Img.src : step7MobImg.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button className={s.back_btn} onClick={() => setStep(6)}>
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() => setStep(8)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step6ContentProps {
  desk: boolean;
  step: number;
  setSubPage: any;
  setStep: any;
}

export const Step6Content: FC<Step6ContentProps> = ({
  desk,
  step,
  setSubPage,
  setStep,
}) => {
  // const router = useRouter();
  // const { query } = router;
  // const { step } = query;

  return (
    <div className={s.step_body}>
      <span className={s.tab_back_btn} onClick={() => setStep(5)}>
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {desk ? step : 4}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Please open the crypto exchange app, find the ETH token and select
          &quot;Send ETH&quot;
        </p>
        <img
          src={desk ? step6Img.src : step6MobImg.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button className={s.back_btn} onClick={() => setStep(5)}>
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() => setStep(7)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step5ContentProps {
  desk: boolean;
  step: number;
  setSubPage: any;
  setStep: any;
}

export const Step5Content: FC<Step5ContentProps> = ({
  desk,
  step,
  setSubPage,
  setStep,
}) => {
  // const router = useRouter();
  // const { query } = router;
  // const { step } = query;

  return (
    <div className={s.step_body}>
      <span className={s.tab_back_btn} onClick={() => setStep(4)}>
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {desk ? step : 3}</span>
      <div className={s.step_header}>
        {desk ? (
          <p className={s.step_tab_title}>Copy the address</p>
        ) : (
          <p className={s.step_tab_title}>
            You need to fund your wallet with ETH tokens on the Arbitrum Network
          </p>
        )}

        <img
          src={desk ? step5Img.src : step5MobImg.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button className={s.back_btn} onClick={() => setStep(4)}>
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() => setStep(6)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step4ContentProps {
  desk: boolean;
  is700: boolean;
  mobile: boolean;
  step: number;
  setSubPage: any;
  setStep: any;
}

export const Step4Content: FC<Step4ContentProps> = ({
  desk,
  is700,
  mobile,
  step,
  setSubPage,
  setStep,
}) => {
  // const router = useRouter();
  // const { query } = router;
  // const { step } = query;

  return (
    <div className={s.step_body}>
      <span className={s.tab_back_btn} onClick={() => setStep(3)}>
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {desk ? step : 2}</span>
      <div className={s.step_header}>
        {is700 || mobile ? (
          <p className={s.step_tab_title}>
            You need to fund your wallet with ETH tokens on the Arbitrum Network
          </p>
        ) : (
          <p className={s.step_tab_title}>
            Select token to receive, finding ETH in Arbitrum Network
          </p>
        )}

        <img
          src={desk ? step4Img.src : step4MobImg.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button className={s.back_btn} onClick={() => setStep(desk ? 3 : 1)}>
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() => setStep(5)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step3ContentProps {
  step: number;
  setSubPage: any;
  setStep: any;
}

export const Step3Content: FC<Step3ContentProps> = (props) => {
  // const router = useRouter();
  // const { query } = router;
  // const { step } = query;

  return (
    <div className={s.step_body}>
      <span className={s.tab_back_btn} onClick={() => props.setStep(2)}>
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {props.step}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Return to the home page and click on &quot;Receive&quot;
        </p>
        <img
          src={step3Img.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button className={s.back_btn} onClick={() => props.setStep(2)}>
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() => props.setStep(4)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step2ContentProps {
  step: number;
  setSubPage: any;
  setStep: any;
}

export const Step2Content: FC<Step2ContentProps> = (props) => {
  return (
    <div className={s.step_body}>
      <span className={s.tab_back_btn} onClick={() => props.setStep(1)}>
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {props.step}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Start typing &quot;arb&quot; into the address bar. If the token is not
          connected, turn the switch to the active state
        </p>
        <img
          src={step2Img.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button className={s.back_btn} onClick={() => props.setStep(1)}>
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() => props.setStep(3)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step1ContentProps {
  is700: boolean;
  mobile: boolean;
  desk: boolean;
  step: number;
  setSubPage: any;
  setStep: any;
}

export const Step1Content: FC<Step1ContentProps> = ({
  is700,
  mobile,
  desk,
  step,
  setSubPage,
  setStep,
}) => {
  // const router = useRouter();
  // const { query } = router;
  // const { step } = query;

  return (
    <div className={s.step_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => {
          setSubPage(ManualModel.SubPage.WalletPresence);
          setStep(0);
        }}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {step}</span>
      <div className={s.step_header}>
        {is700 || mobile ? (
          <p className={s.step_tab_title} data-short="true">
            Please, open Trust Wallet App and сlick on &quot;Receive&quot;
          </p>
        ) : (
          <p className={s.step_tab_title} data-short="true">
            Please, open Trust Wallet Extension in your browser.
            <span>Make sure you have switched on ETH in Arbitrum Network.</span>
            To do so, click on magnifier icon
          </p>
        )}
        <img
          src={is700 || mobile ? step1MobImg.src : step1Img.src}
          className={`${s.step_example_img} ${s.step_1_img}`}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button
          className={s.back_btn}
          onClick={() => {
            setSubPage(ManualModel.SubPage.WalletPresence);
            setStep(0);
          }}
        >
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() => setStep(!desk ? 4 : 2)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface WalletPresenceProps {
  mobile: boolean;
  step: number;
  setSubPage: any;
  setStep: any;
  setTab: any;
}

const WalletPresence: FC<WalletPresenceProps> = ({
  mobile,
  step,
  setSubPage,
  setStep,
}) => {
  const router = useRouter();

  // const [setStep, subPage, setSubPage] = useUnit([
  //   ManualModel.$step,
  //   ManualModel.setStep,
  //   ManualModel.$subPage,
  //   ManualModel.setSubPage,
  // ]);

  return (
    <div className={s.wallet_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => setSubPage(ManualModel.SubPage.Start)}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
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
              setSubPage(ManualModel.SubPage.Start);
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
                setSubPage(ManualModel.SubPage.ExchangeCreation);
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

interface ManualBonusReceivingProps {
  setTab: any;
}
import * as ManualModel from "./model";
export const ManualBonusReceiving: FC<ManualBonusReceivingProps> = (props) => {
  const router = useRouter();
  const { query } = router;
  //const { tab, subPage, step } = query;

  // const [subPage, setSubPage] = useState<SubPage>(SubPage.Start);

  const [step, setStep, subPage, setSubPage] = useUnit([
    ManualModel.$step,
    ManualModel.setStep,
    ManualModel.$subPage,
    ManualModel.setSubPage,
  ]);

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

  return (
    <>
      {subPage === ManualModel.SubPage.Start && step === 0 && (
        <div className={s.manual_bonus_reveicing_home_body}>
          <span className={s.tab_back_btn} onClick={() => router.push("/")}>
            <img src={leftArr.src} alt="left-arr" />
            Back
          </span>
          <div className={s.manual_bonus_reveicing_home_header}>
            <h1 className={s.manual_bonus_reveicing_home_title}>
              To get the bonus and start playing, you need to fund your wallet
              in ETH token in Arbitrum network
            </h1>
            <p className={s.manual_bonus_reveicing_home_text}>
              Since our platform is Web 3.0 based, in order to claim the bonus
              and play games, you will need to send transactions. Each
              transaction on the blockchain network has a gas (commission) fee.
              Each transaction on the blockchain network has a gas (commission)
              fee.
            </p>
          </div>
          <div className={s.manual_bonus_reveicing_btns}>
            <button
              className={s.back_btn}
              data-noMargin="true"
              onClick={() => router.push("/")}
            >
              Back
            </button>
            <span
              className={s.addFunds_btn}
              onClick={() => {
                setSubPage(ManualModel.SubPage.WalletPresence);
                // router.push("/ExchangeManual");
              }}
            >
              <span>Add funds</span>&nbsp;(Recommended)
            </span>
          </div>
        </div>
      )}
      {subPage === ManualModel.SubPage.WalletPresence && (
        <WalletPresence
          mobile={mobile}
          step={step}
          setSubPage={setSubPage}
          setStep={setStep}
          setTab={props.setTab}
        />
      )}
      {subPage === ManualModel.SubPage.ExchangeCreation && (
        <SelectExchanges
          step={step}
          setSubPage={setSubPage}
          setStep={setStep}
          setTab={props.setTab}
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
    </>
  );
};
