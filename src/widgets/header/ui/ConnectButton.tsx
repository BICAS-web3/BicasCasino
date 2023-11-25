import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import clsx from "clsx";

import * as BlurModel from "@/widgets/Blur/model";
import { AvaibleWallet } from "@/widgets/AvaibleWallet";
import * as MainWallet from "@/widgets/AvaibleWallet/model";

import { checkPageClicking } from "@/shared/tools";

import s from "./styles.module.scss";
import { useAccount } from "wagmi";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import * as ConnectModel from "@/widgets/Layout/model";

export interface ConnectWalletButtonProps {}

export const ConnectWalletButton: FC<ConnectWalletButtonProps> = () => {
  const [startConnect, setStartConnect] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
  ]);
  const [isMainWalletOpen, setBlur] = useUnit([
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
      setBlur(true);
      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      setWalletVisibility(false);
      setBlur(false);
      document.documentElement.style.overflow = "visible";
    }
  };

  useEffect(() => {
    if (walletVisibility) {
      checkPageClicking({ blockDataId: "connect-wallet-block" }, (isBlock) => {
        !isBlock && setWalletVisibility(false);
      });
    }

    if (!walletVisibility) {
      setWalletVisibility(false);
      setBlur(false);
      document.documentElement.style.overflow = "visible";
    }


  }, [walletVisibility]);
  useEffect(() => {
    return () => {
      setStartConnect(false);
    };
  }, []);
  const hideAvaibleWallet = () => {
    setWalletVisibility(false);
    setBlur(false);
    document.documentElement.style.overflow = "visible";
  };

  const { isConnecting } = useAccount();

  return (
    <div
      className={s.connect_wallet_button_wrap}
      data-id={"connect-wallet-block"}
    >
      <button
        className={s.connect_wallet_button}
        onClick={() => {
          handleConnectWalletBtn();
          setStartConnect(true);
        }}
      >
        {isConnecting && startConnect ? (
          <LoadingDots className={s.join_dots} title="Joinning" />
        ) : (
          "Join Now"
        )}
      </button>
      <div
        className={clsx(
          s.header_avaibleWallet_wrap,
          walletVisibility && s.avaibleWallet_visible
        )}
      >
        <AvaibleWallet hideAvaibleWallet={hideAvaibleWallet} />
      </div>
    </div>
  );
};
