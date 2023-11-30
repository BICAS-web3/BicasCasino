import { useRouter } from "next/router";
import s from "./styles.module.scss";
import { FC } from "react";
import { BtnRightArrow } from "@/shared/SVGs/BtnRightArrow";
import { SelectExchanges } from "./SelectExchanges";

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
  const { tab, subPage } = query;

  return (
    <>
      {tab === "bonusReceiving" && subPage === undefined && (
        <div className={s.manual_bonus_reveicing_home_body}>
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
    </>
  );
};
