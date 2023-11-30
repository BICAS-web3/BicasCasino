import { FC } from "react";
import s from "./styles.module.scss";
import Metamask from "@/public/media/select_wallet/metamask.svg";
import Coinbase from "@/public/media/select_wallet/Coinbase.svg";
import WalletConnect from "@/public/media/select_wallet/WalletConnect.svg";
import { BtnRightArrow } from "@/shared/SVGs/BtnRightArrow";

interface ManualNoWalletTabProps {}

export const ManualNoWalletTab: FC<ManualNoWalletTabProps> = () => {
  return (
    <div className={s.noWallet_body}>
      <div className={s.noWallet_header}>
        <h3 className={s.noWallet_title}>
          Choose the wallet you want to create
        </h3>
        <div className={s.wallets_list}>
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
          <div className={s.wallet_list_item}>
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
          <div className={s.wallet_list_item}>
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
      </div>
    </div>
  );
};
