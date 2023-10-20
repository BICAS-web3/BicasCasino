import { FC, useEffect, useState } from "react";

import { useUnit } from "effector-react";

import { useAccount } from "wagmi";

import { AvaibleWallet } from "@/widgets/AvaibleWallet";
import { SideBarModel } from "@/widgets/SideBar";

import * as BlurModel from "@/widgets/Blur/model";
import * as MainWallet from "@/widgets/AvaibleWallet/model";

import s from "./style.module.scss";
interface ConnectWalletButtonProps {
  setVisibility?: (el: boolean) => void;
}
export const ConnectWalletButton: FC<ConnectWalletButtonProps> = ({
  setVisibility,
}) => {
  const { isConnected } = useAccount();
  const [isOpen, isMainWalletOpen, setBlur] = useUnit([
    SideBarModel.$isOpen,
    MainWallet.$isMainWalletOpen,
    BlurModel.setBlur,
  ]);

  const [walletVisibility, setWalletVisibility] = useState(false);

  const handleConnectWalletBtn = () => {
    if (isMainWalletOpen) {
      return null;
    }

    if (!walletVisibility) {
      setWalletVisibility(true);
      // setBlur(true);
      // document.documentElement.style.overflow = "hidden";
      // window.scrollTo(0, 0);
    } else {
      setWalletVisibility(false);
      // setBlur(false);
      // document.documentElement.style.overflow = "visible";
    }
  };

  useEffect(() => {
    setVisibility && setVisibility(walletVisibility);
    // if (walletVisibility) {
    //   checkPageClicking({ blockDataId: "connect-wallet-block" }, (isBlock) => {
    //     !isBlock && setWalletVisibility(false);
    //   });
    // }

    if (!walletVisibility) {
      setWalletVisibility(false);
      setBlur(false);
      // document.documentElement.style.overflow = "visible";
    }
  }, [walletVisibility]);

  const hideAvaibleWallet = () => {
    setWalletVisibility(false);
    setBlur(false);
    document.documentElement.style.overflow = "visible";
  };
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "visible";
      document.documentElement.style.height = "auto";
      setBlur(false);
    };
  }, []);
  return (
    <div data-id={"connect-wallet-block"} onClick={(e) => e.stopPropagation()}>
      <button
        className={s.connect_wallet_button}
        onClick={() =>
          !isConnected ? handleConnectWalletBtn() : alert("claim")
        }
      >
        {isConnected ? "Claim" : "Connect Wallet"}
      </button>
      <div
        className={`${s.header_avaibleWallet_wrap} ${
          walletVisibility && s.avaibleWallet_visible
        }`}
      >
        {!isConnected && (
          <AvaibleWallet hideAvaibleWallet={hideAvaibleWallet} />
        )}
      </div>
    </div>
  );
};
