import { useRouter } from "next/router";
import s from "./styles.module.scss";
import { FC } from "react";
import { BtnRightArrow } from "@/shared/SVGs/BtnRightArrow";
import { SelectExchanges } from "./SelectExchanges";
import { StepTab } from "./StepTab";
import step1Img from "@/public/media/registrManual_images/step1Img.png";
import step2Img from "@/public/media/registrManual_images/step2Img.png";

interface Step2ContentProps {}

const Step2Content: FC<Step1ContentProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { step } = query;

  return (
    <div className={s.step_body}>
      <span className={s.steps_quantity}>Step {step}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Start typing "arb" into the address bar. If the token is not
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
        <button className={s.exchange_bottom_next_btn}>Next</button>
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
      <span className={s.steps_quantity}>Step {step}</span>
      <div className={s.step_header}>
        <p className={s.step_tab_title}>
          Please, open Trust Wallet Extension in your browser.{" "}
          <span>Make sure you have switched on ETH in Arbitrum Network.</span>{" "}
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
    </>
  );
};
