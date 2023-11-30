import { FC, useEffect } from "react";
import s from "./styles.module.scss";
import { Layout } from "@/widgets/Layout";
import { useRouter } from "next/router";
import { BtnRightArrow } from "@/shared/SVGs/BtnRightArrow";
import Metamask from "@/public/media/select_wallet/metamask.svg";
import Coinbase from "@/public/media/select_wallet/Coinbase.svg";
import WalletConnect from "@/public/media/select_wallet/WalletConnect.svg";
import { useAccount, useConnect } from "wagmi";
import infoIco from "@/public/media/registrManual_images/infoIco.svg";
import { ManualNoWalletTab } from "@/widgets/ManualNoWalletTab/ManualNoWalletTab";
import { ManualBonusReceiving } from "@/widgets/ManualBonusReceiving/ManualBonusReceiving";
import leftArr from "@/public/media/registrManual_images/leftArr.svg";

interface HaveWalletConnectionProps {}

const HaveWalletConnection: FC<HaveWalletConnectionProps> = () => {
  const { connect } = useConnect();
  const { isConnected } = useAccount();
  const { connectors } = useConnect();
  const router = useRouter();

  useEffect(() => {
    isConnected && router.push("/RegistrManual?tab=bonusReceiving");
  }, [isConnected]);

  return (
    <div className={s.have_wallet_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual")}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <div className={s.have_wallet_header}>
        <h1 className={s.registr_manual_title}>Connect Wallet</h1>
        <div className={s.wallets_list}>
          <div
            className={s.wallet_list_item}
            onClick={() => {
              (window as any).fbq("track", "Lead");
              connect({ connector: connectors[1] });
            }}
          >
            <div className={s.wallet_list_item_leftSide}>
              <img
                src={Coinbase.src}
                className={s.wallet_ico}
                alt="coinbase-ico"
              />
              <span className={s.avaible_wallet_title}>Coinbase</span>
            </div>
            <BtnRightArrow />
          </div>
          <div
            className={s.wallet_list_item}
            onClick={() => {
              (window as any).fbq("track", "Lead");
              connect({ connector: connectors[2] });
            }}
          >
            <div className={s.wallet_list_item_leftSide}>
              <img
                src={WalletConnect.src}
                className={s.wallet_ico}
                alt="walletconnect-ico"
              />
              <span className={s.avaible_wallet_title}>Coinbase</span>
            </div>
            <BtnRightArrow />
          </div>
          <div
            className={s.wallet_list_item}
            onClick={() => {
              (window as any).fbq("track", "Lead");
              connect({ connector: connectors[0] });
            }}
          >
            <div className={s.wallet_list_item_leftSide}>
              <img
                src={Metamask.src}
                className={s.wallet_ico}
                alt="metamask-ico"
              />
              <span className={s.avaible_wallet_title}>Metamask</span>
            </div>
            <BtnRightArrow />
          </div>
        </div>
        <p className={s.have_wallet_subTitle}>
          If you are connecting to the <span>WalletConnect</span> protocol, you
          can choose <span>Trust Wallet</span> or <span>Metamask</span>
        </p>
        <span
          className={s.idh_wallet_btn}
          onClick={() => router.push("/RegistrManual?tab=noWallet")}
        >
          I don’t have a wallet
          <img src={infoIco.src} alt="info-ico" />
        </span>
      </div>
      <button
        className={s.cancel_btn}
        onClick={() => router.push("/RegistrManual")}
      >
        Back
      </button>
    </div>
  );
};

interface RegistrManualProps {}

const RegistrManual: FC<RegistrManualProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { tab } = query;

  console.log("current tab is", tab);

  return (
    <Layout gameName={undefined}>
      <div className={s.registr_manual_section}>
        {tab === undefined && (
          <div className={s.registr_manual_body}>
            <span className={s.tab_back_btn} onClick={() => router.push("/")}>
              <img src={leftArr.src} alt="left-arr" />
              Back
            </span>
            <div className={s.registr_manual_header}>
              <h1 className={s.registr_manual_title}>
                Do you have a crypto wallet?
              </h1>
              <span className={s.registr_manual_subTitle}>
                We are supporting only Metamask, Coinbase and Trust Wallet
              </span>
              <div className={s.wallet_btns}>
                <button
                  className={s.wallet_btns_item}
                  onClick={() =>
                    router.push("/RegistrManual?tab=haveWalletConnect")
                  }
                >
                  I have a crypto wallet
                  <BtnRightArrow />
                </button>
                <button
                  className={s.wallet_btns_item}
                  onClick={() => router.push("/RegistrManual?tab=noWallet")}
                >
                  I don’t have a crypto wallet
                  <BtnRightArrow />
                </button>
              </div>
            </div>
            <button className={s.cancel_btn} onClick={() => router.push("/")}>
              Cancel
            </button>
          </div>
        )}
        {tab === "haveWalletConnect" && <HaveWalletConnection />}
        {tab === "noWallet" && <ManualNoWalletTab />}
        {tab === "bonusReceiving" && <ManualBonusReceiving />}
      </div>
    </Layout>
  );
};

export default RegistrManual;
