import { useRouter } from "next/router";
import s from "./styles.module.scss";
import { FC } from "react";
import { BtnRightArrow } from "@/shared/SVGs/BtnRightArrow";
import { SelectExchanges } from "./SelectExchanges";
import { StepTab } from "./StepTab";
import copyIco from "@/public/media/registrManual_images/copyIco.svg";
import leftArr from "@/public/media/registrManual_images/leftArr.svg";

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

interface Step13ContentProps {}

const Step13Content: FC<Step13ContentProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { step } = query;

  return (
    <div className={s.step_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual?tab=bonusReceiving&step=12")}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {step}</span>
      <div className={s.step_header}>
        <h4 className={s.step_congrats_title}>Congrats!</h4>
        <p className={s.step_tab_title}>
          Now you can play games with the bonus token, pick any game and select
          DRAXB as a payment
        </p>
        <img
          src={step13Img.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button
          className={s.back_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=12")
          }
        >
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

interface Step12ContentProps {}

const Step12Content: FC<Step12ContentProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { step } = query;

  return (
    <div className={s.step_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual?tab=bonusReceiving&step=11")}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {step}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Visit our website{" "}
          <a href="https://game.greekkeepers.io" target="_blank">
            game.greekkeepers.io
          </a>
          , connect wallet and claim your bonus:
        </p>
        <img
          src={step12Img.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button
          className={s.back_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=11")
          }
        >
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=13")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step11ContentProps {}

const Step11Content: FC<Step11ContentProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { step } = query;

  const copyToClipboard = () => {
    const address = "0x5518e648341147b0f4041c5e2a2cca41bdc723a0";
    navigator.clipboard
      .writeText(address)
      .then(() => {
        console.log("draxb address copied", address);
      })
      .catch((err) => {
        console.error("error copy", err);
      });
  };

  return (
    <div className={s.step_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual?tab=bonusReceiving&step=10")}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {step}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          In the opened window paste the address of the DRAXB token contract.
          Then click &quot;Add Token&quot;
        </p>
        <img
          src={step11Img.src}
          className={s.step_example_img}
          alt="examples-img"
        />
        <div className={s.draxb_address_block}>
          <span className={s.draxb_copy_title}>Copy token address DRAXB</span>
          <div
            className={s.draxb_address_copy_block}
            onClick={() => copyToClipboard()}
          >
            0x5518e648341147b0f4041c5e2a2cca41bdc723a0
            <img src={copyIco.src} alt="copy-ico" />
          </div>
        </div>
      </div>
      <div className={s.step_btns_list}>
        <button
          className={s.back_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=10")
          }
        >
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=12")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step10ContentProps {}

const Step10Content: FC<Step10ContentProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { step } = query;

  return (
    <div className={s.step_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual?tab=bonusReceiving&step=9")}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {step}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Scroll down and click &quot;Don't see your crypto? Import&quot;
        </p>
        <img
          src={step10Img.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button
          className={s.back_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=9")
          }
        >
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=11")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step9ContentProps {}

const Step9Content: FC<Step9ContentProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { step } = query;

  return (
    <div className={s.step_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual?tab=bonusReceiving&step=8")}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {step}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Scroll down and click &quot;Don't see your crypto? Import&quot;
        </p>
        <img
          src={step9Img.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button
          className={s.back_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=8")
          }
        >
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=10")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step8ContentProps {}

const Step8Content: FC<Step8ContentProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { step } = query;

  return (
    <div className={s.step_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual?tab=bonusReceiving&step=7")}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {step}</span>
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
          src={step8Img.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button
          className={s.back_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=7")
          }
        >
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=9")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step7ContentProps {}

const Step7Content: FC<Step7ContentProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { step } = query;

  return (
    <div className={s.step_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual?tab=bonusReceiving&step=6")}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {step}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Please, open the crypto exchange app, find the ETH token and select
          &quot;Send ETH&quot;
        </p>
        <img
          src={step7Img.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button
          className={s.back_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=6")
          }
        >
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=8")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step6ContentProps {}

const Step6Content: FC<Step6ContentProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { step } = query;

  return (
    <div className={s.step_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual?tab=bonusReceiving&step=5")}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {step}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Please open the crypto exchange app, find the ETH token and select
          &quot;Send ETH&quot;
        </p>
        <img
          src={step6Img.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button
          className={s.back_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=5")
          }
        >
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=7")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step5ContentProps {}

const Step5Content: FC<Step5ContentProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { step } = query;

  return (
    <div className={s.step_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual?tab=bonusReceiving&step=4")}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {step}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>Copy the address</p>
        <img
          src={step5Img.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button
          className={s.back_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=4")
          }
        >
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=6")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step4ContentProps {}

const Step4Content: FC<Step4ContentProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { step } = query;

  return (
    <div className={s.step_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual?tab=bonusReceiving&step=3")}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {step}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Select token to receive, finding ETH in Arbitrum Network
        </p>
        <img
          src={step4Img.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button
          className={s.back_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=3")
          }
        >
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=5")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step3ContentProps {}

const Step3Content: FC<Step3ContentProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { step } = query;

  return (
    <div className={s.step_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual?tab=bonusReceiving&step=2")}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {step}</span>
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
        <button
          className={s.back_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=2")
          }
        >
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=4")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step2ContentProps {}

const Step2Content: FC<Step1ContentProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { step } = query;

  return (
    <div className={s.step_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual?tab=bonusReceiving&step=1")}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {step}</span>
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
        <button
          className={s.back_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=1")
          }
        >
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=3")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface Step1ContentProps {}

const Step1Content: FC<Step1ContentProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { step } = query;

  return (
    <div className={s.step_body}>
      <span
        className={s.tab_back_btn}
        onClick={() =>
          router.push(
            "/RegistrManual?tab=bonusReceiving&subPage=exchange_creation"
          )
        }
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <span className={s.steps_quantity}>Step {step}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title} data-short="true">
          Please, open Trust Wallet Extension in your browser.
          <span>Make sure you have switched on ETH in Arbitrum Network.</span>
          To do so, click on magnifier icon
        </p>
        <img
          src={step1Img.src}
          className={s.step_example_img}
          alt="examples-img"
        />
      </div>
      <div className={s.step_btns_list}>
        <button
          className={s.back_btn}
          onClick={() =>
            router.push(
              "/RegistrManual?tab=bonusReceiving&subPage=exchange_creation"
            )
          }
        >
          Back
        </button>
        <button
          className={s.exchange_bottom_next_btn}
          onClick={() =>
            router.push("/RegistrManual?tab=bonusReceiving&step=2")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface WalletPresenceProps {}

const WalletPresence: FC<WalletPresenceProps> = () => {
  const router = useRouter();

  return (
    <div className={s.wallet_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual?tab=bonusReceiving")}
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
          <button className={s.wallet_btns_item}>
            I have a crypto exchange account
            <BtnRightArrow />
          </button>
          <button
            className={s.wallet_btns_item}
            onClick={() =>
              router.push(
                "/RegistrManual?tab=bonusReceiving&subPage=exchange_creation"
              )
            }
          >
            I don’t have a crypto exchange account
            <BtnRightArrow />
          </button>
        </div>
      </div>
      <button className={s.back_btn}>Cancel</button>
    </div>
  );
};

interface ManualBonusReceivingProps {}

export const ManualBonusReceiving: FC<ManualBonusReceivingProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { tab, subPage, step } = query;

  return (
    <>
      {tab === "bonusReceiving" &&
        subPage === undefined &&
        step === undefined && (
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
                transaction on the blockchain network has a gas (commission)
                fee. Each transaction on the blockchain network has a gas
                (commission) fee.
              </p>
            </div>
            <div className={s.manual_bonus_reveicing_btns}>
              <button className={s.back_btn} onClick={() => router.push("/")}>
                Back
              </button>
              <button
                className={s.addFunds_btn}
                onClick={() =>
                  router.push(
                    "/RegistrManual?tab=bonusReceiving&subPage=walletPresence"
                  )
                }
              >
                <span>Add funds</span> (Recommended)
              </button>
            </div>
          </div>
        )}
      {subPage === "walletPresence" && <WalletPresence />}
      {subPage === "exchange_creation" && <SelectExchanges />}
      {step === "1" && <StepTab content={<Step1Content />} />}
      {step === "2" && <StepTab content={<Step2Content />} />}
      {step === "3" && <StepTab content={<Step3Content />} />}
      {step === "4" && <StepTab content={<Step4Content />} />}
      {step === "5" && <StepTab content={<Step5Content />} />}
      {step === "6" && <StepTab content={<Step6Content />} />}
      {step === "7" && <StepTab content={<Step7Content />} />}
      {step === "8" && <StepTab content={<Step8Content />} />}
      {step === "9" && <StepTab content={<Step9Content />} />}
      {step === "10" && <StepTab content={<Step10Content />} />}
      {step === "11" && <StepTab content={<Step11Content />} />}
      {step === "12" && <StepTab content={<Step12Content />} />}
      {step === "13" && <StepTab content={<Step13Content />} />}
    </>
  );
};
