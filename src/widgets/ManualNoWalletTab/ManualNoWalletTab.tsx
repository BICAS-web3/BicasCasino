import { FC, useEffect } from "react";
import s from "./styles.module.scss";
import Metamask from "@/public/media/select_wallet/metamask.svg";
import Coinbase from "@/public/media/select_wallet/Coinbase.svg";
import WalletConnect from "@/public/media/select_wallet/WalletConnect.svg";
import Trust_wallet from "@/public/media/select_wallet/Trust_wallet.svg";
import Injected from "@/public/media/registrManual_images/injectedIco.svg";
import { BtnRightArrow } from "@/shared/SVGs/BtnRightArrow";
import { useRouter } from "next/router";
import exampleImg from "@/public/media/registrManual_images/connectStepImg.png";
import { useAccount, useConnect } from "wagmi";
import leftArr from "@/public/media/registrManual_images/leftArr.svg";

interface ConnectWalletTabProps {}

export const ConnectWalletTab: FC<ConnectWalletTabProps> = () => {
  const router = useRouter();
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    isConnected && router.push("/RegistrManual?tab=bonusReceiving");
  }, [isConnected]);

  return (
    <div className={s.connect_wallet_body}>
      <span
        className={s.tab_back_btn}
        onClick={() => router.push("/RegistrManual?tab=noWallet")}
      >
        <img src={leftArr.src} alt="left-arr" />
        Back
      </span>
      <div className={s.connect_wallet_header}>
        <h3 className={s.noWallet_title}>Connect Wallet</h3>
        <div className={s.connect_wallet_tab_w_list}>
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
          <div
            className={s.wallet_list_item}
            onClick={() => {
              (window as any).fbq("track", "Lead");
              connect({ connector: connectors[2] });
            }}
          >
            <div className={s.wallet_list_item_leftSide}>
              <img
                src={Trust_wallet.src}
                className={s.wallet_ico}
                alt="walletConnect-ico"
              />
              <span className={s.avaible_wallet_title}>Trust Wallet</span>
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
                alt="walletConnect-ico"
              />
              <span className={s.avaible_wallet_title}>WalletConnect</span>
            </div>
            <BtnRightArrow />
          </div>
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
              connect({ connector: connectors[3] });
            }}
          >
            <div className={s.wallet_list_item_leftSide}>
              <img
                src={Injected.src}
                className={s.wallet_ico}
                alt="injected-ico"
              />
              <span className={s.avaible_wallet_title}>Injected</span>
            </div>
            <BtnRightArrow />
          </div>
        </div>
        <p className={s.connect_wallet_underlist_text}>
          If you are connecting to the <span>WalletConnect</span> protocol, you
          can choose <span>Trust Wallet</span> or <span>Metamask</span>
        </p>
      </div>
      <div className={s.connection_example_block}>
        <span className={s.connection_example_text}>
          The next time you log in, just select the available wallets in this
          section
        </span>
        <img src={exampleImg.src} alt="examle_img" className={s.example_img} />
        <p className={s.connection_underExample_text}>
          Please, remember to use one extension if you select
          <span>&quot;Injected&quot;</span>. Otherwise (having 2 extensions or
          more), an error may occur
        </p>
        <button
          className={s.back_btn_example}
          onClick={() => router.push("/RegistrManual?tab=noWallet")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

interface ManualNoWalletTabProps {}

export const ManualNoWalletTab: FC<ManualNoWalletTabProps> = () => {
  const router = useRouter();
  const { query } = router;
  const { tab, subPage } = query;

  return (
    <>
      {tab === "noWallet" && subPage === undefined && (
        <div className={s.noWallet_body}>
          <span
            className={s.tab_back_btn}
            onClick={() => router.push("/RegistrManual")}
          >
            <img src={leftArr.src} alt="left-arr" />
            Back
          </span>
          <div className={s.noWallet_header}>
            <h3 className={s.noWallet_title}>
              Choose the wallet you want to create
            </h3>
            <div className={s.wallets_list}>
              <div
                className={s.wallet_list_item}
                onClick={() => {
                  window.open(
                    "https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
                    "_blank"
                  );
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
              <div
                className={s.wallet_list_item}
                onClick={() => {
                  window.open(
                    "https://chromewebstore.google.com/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph",
                    "_blank"
                  );
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
              <div
                className={s.wallet_list_item}
                onClick={() => {
                  window.open("https://walletconnect.com/", "_blank");
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
              <div
                className={s.wallet_list_item}
                onClick={() => {
                  window.open(
                    "https://chromewebstore.google.com/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad",
                    "_blank"
                  );
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
            </div>
            <span className={s.noWallet_subTitle}>
              In the next step, you will be redirected to the official
              cryptocurrency wallet websites.
            </span>
          </div>
          <div className={s.nav_btns}>
            <div
              className={s.back_btn}
              onClick={() => router.push("/RegistrManual")}
            >
              Back
            </div>
            <div
              className={s.next_btn}
              onClick={() =>
                router.push(
                  "/RegistrManual?tab=noWallet&subPage=connectionPage"
                )
              }
            >
              Next
            </div>
          </div>
        </div>
      )}
      {subPage === "connectionPage" && <ConnectWalletTab />}
    </>
  );
};
