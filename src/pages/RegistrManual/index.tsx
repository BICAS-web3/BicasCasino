import { FC, useEffect, useState } from "react";
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
import Trust_wallet from "@/public/media/select_wallet/Trust_wallet.svg";
import Injected from "@/public/media/registrManual_images/injectedIco.svg";
import * as Api from "@/shared/api";

export enum Tab {
  start,
  haveWalletConnect,
  noWallet,
  bonusReceiving,
}

interface HaveWalletConnectionProps {
  tab: Tab;
  setTab: any;
}

const HaveWalletConnection: FC<HaveWalletConnectionProps> = (props) => {
  const { connect } = useConnect();
  const { isConnected } = useAccount();
  const { connectors, isError, error } = useConnect();
  //const router = useRouter();

  useEffect(() => {
    if (isError && error) {
      console.log("Error connecting to the wallet");
      Api.submitErrorFX({ data: error.message });
      localStorage.clear();
    }
  }, [isError]);

  useEffect(() => {
    isConnected && props.setTab(Tab.bonusReceiving);
  }, [isConnected]);

  useEffect(() => {
    const popupState = localStorage.getItem;
  }, []);

  return (
    <div className={s.have_wallet_body}>
      <span className={s.tab_back_btn} onClick={() => props.setTab(Tab.start)}>
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <div className={s.have_wallet_header}>
        <h1 className={s.registr_manual_title}>Connect Wallet</h1>
        <div className={s.wallets_list}>
          {connectors[0].ready && (
            <div
              className={s.wallet_list_item}
              onClick={() => {
                //(window as any).fbq("track", "Lead");
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
          )}
          {connectors[2].ready && (
            <div
              className={s.wallet_list_item}
              onClick={() => {
                //(window as any).fbq("track", "Lead");
                localStorage.clear();
                connect({ connector: connectors[2] });
              }}
            >
              <div className={s.wallet_list_item_leftSide}>
                <img
                  src={Trust_wallet.src}
                  className={s.wallet_ico}
                  alt="tWallet-ico"
                />
                <span className={s.avaible_wallet_title}>Trust Wallet</span>
              </div>
              <BtnRightArrow />
            </div>
          )}
          {connectors[2].ready && (
            <div
              className={s.wallet_list_item}
              onClick={() => {
                //(window as any).fbq("track", "Lead");
                localStorage.clear();
                connect({ connector: connectors[2] });
              }}
            >
              <div className={s.wallet_list_item_leftSide}>
                <img
                  src={WalletConnect.src}
                  className={s.wallet_ico}
                  alt="walletconnect-ico"
                />
                <span className={s.avaible_wallet_title}>WalletConnect</span>
              </div>
              <BtnRightArrow />
            </div>
          )}
          {connectors[1].ready && (
            <div
              className={s.wallet_list_item}
              onClick={() => {
                //(window as any).fbq("track", "Lead");
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
          )}
        </div>
        <p className={s.have_wallet_subTitle}>
          If you are connecting to the <span>WalletConnect</span> protocol, you
          can choose <span>Trust Wallet</span> or <span>Metamask</span>
        </p>
        <span
          className={s.idh_wallet_btn}
          onClick={() => props.setTab(Tab.noWallet)}
        >
          I don’t have a wallet
          <img src={infoIco.src} alt="info-ico" />
        </span>
      </div>
      <button className={s.cancel_btn} onClick={() => props.setTab(Tab.start)}>
        Back
      </button>
    </div>
  );
};

interface RegistrManualProps { }

const RegistrManual: FC<RegistrManualProps> = () => {
  const router = useRouter();
  const { query } = router;
  //const { tab, step } = query;

  const [tab, setTab] = useState<Tab>(Tab.start);

  console.log("current tab is", tab);

  return (
    <Layout gameName={undefined} hideHeaderBtn={true}>
      <div
        className={`${s.registr_manual_section} `} // ${step !== undefined && s.gap_none}
      >
        <div className={s.top_blur}></div>
        <div className={s.bottom_blur}></div>
        {tab == Tab.start && (
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
                  onClick={() => setTab(Tab.haveWalletConnect)}
                >
                  I have a crypto wallet
                  <BtnRightArrow />
                </button>
                <button
                  className={s.wallet_btns_item}
                  onClick={() => setTab(Tab.noWallet)}
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
        {tab == Tab.haveWalletConnect && (
          <HaveWalletConnection tab={tab} setTab={setTab} />
        )}
        {tab == Tab.noWallet && <ManualNoWalletTab tab={tab} setTab={setTab} />}
        {tab == Tab.bonusReceiving && <ManualBonusReceiving setTab={setTab} />}
      </div>
    </Layout>
  );
};

export default RegistrManual;
