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
import * as ManualModel from "@/pages/RegistrManual/model";
import { useRouter } from "next/router";

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
  const router = useRouter();

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
  const [isPartner] = useUnit([ManualModel.$isPartner]);

  const queryParams = new URLSearchParams(window.location.search);
  const partner_address = queryParams.get("partner_address");
  const site_id = queryParams.get("site_id");
  const sub_id = queryParams.get("sub_id");
  return (
    <div
      className={s.connect_wallet_button_wrap}
      data-id={"connect-wallet-block"}
    >
      <button
        className={s.connect_wallet_button}
        onClick={() =>
          router.push(
            isPartner
              ? `/RegistrManual?partner_address=${partner_address}&site_id=${site_id}&sub_id=${sub_id}`
              : "/RegistrManual"
          )
        }
      >
        {isConnecting && startConnect ? (
          <LoadingDots className={s.join_dots} title="Joinning" />
        ) : (
          "Join Game"
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
