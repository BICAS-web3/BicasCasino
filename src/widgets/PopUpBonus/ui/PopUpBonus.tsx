import { FC, useEffect, useState } from "react";

import { useAccount } from "wagmi";

import Image from "next/image";

import { useUnit } from "effector-react";

import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
} from "wagmi";

import banner from "@/public/media/banner/banner.png";

import { AvaibleWallet } from "@/widgets/AvaibleWallet";
import { SideBarModel } from "@/widgets/SideBar";

import * as BlurModel from "@/widgets/Blur/model";
import * as MainWallet from "@/widgets/AvaibleWallet/model";

import { ABI as abi } from "@/shared/contracts/ClaimBonusABI";
import { checkPageClicking } from "@/shared/tools";
import { CloseIcon } from "@/shared/SVGs";

import s from "./style.module.scss";

import clsx from "clsx";

export const PopUpBonus: FC = () => {
  const [close, setClose] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const { address, isConnected } = useAccount();
  const [isOpen, isMainWalletOpen, setBlur] = useUnit([
    SideBarModel.$isOpen,
    MainWallet.$isMainWalletOpen,
    BlurModel.setBlur,
  ]);

  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();

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
    if (chain?.id !== 42161 && address) {
      switchNetwork!(42161);
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
      document.documentElement.style.overflow = "visible";
    }
  }, [walletVisibility]);

  useEffect(() => {
    setVisibility && setVisibility(walletVisibility);
    if (!walletVisibility) {
      setWalletVisibility(false);
      setBlur(false);
    }
  }, [walletVisibility, setBlur, setVisibility]);

  const hideAvaibleWallet = () => {
    setVisibility(false);
    setWalletVisibility(false);
    setBlur(false);
    document.documentElement.style.overflow = "visible";
  };

  const { config: allowanceConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: "0x369850ad3fF02448011c77d0B15E1E12644A8532",
    abi,
    functionName: "claimBonus",
    enabled: true,
  });
  const { write, isSuccess } = useContractWrite(allowanceConfig);
  const closeModal = () => {
    document.documentElement.style.overflow = "visible";
    document.documentElement.style.height = "auto";
    setClose(true);
    setBlur(false);
  };
  useEffect(() => {
    if (isSuccess && setVisibility) {
      closeModal();
      setVisibility(false);
    }
    setWalletVisibility(false);
  }, [isSuccess]);
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100vh";
    return () => {
      document.documentElement.style.overflow = "visible";
      document.documentElement.style.height = "auto";
    };
  }, []);

  if (!close) {
    // setBlur(true);
    document.documentElement.style.overflow = "hidden";
    window.screenY = 0;
  }
  return (
    <div onClick={closeModal} className={clsx(s.wrapper, close && s.closed)}>
      <article
        onClick={(e) => e.stopPropagation()}
        className={clsx(s.banner, visibility && !isConnected && s.move_banner)}
      >
        <CloseIcon onClick={closeModal} className={s.closeIcon} />
        <div className={s.img_wrapper}>
          <Image className={s.img} src={banner} alt="100%" />
        </div>
        <h2 className={s.title}>
          {!isConnected ? "Receive your first 100$ bonus" : "Claim your bonus"}
        </h2>
        <div
          data-id={"connect-wallet-block"}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={s.connect_wallet_button}
            onClick={() => {
              if (!isConnected) {
                handleConnectWalletBtn();
              } else {
                if (chain?.id !== 42161) {
                  switchNetwork && switchNetwork!(42161);
                  write && write();
                }

                if (write) write();
              }
            }}
          >
            {address
              ? chain?.id !== 42161
                ? "Switch"
                : "Claim"
              : "Connect Wallet"}
          </button>
          <div
            className={`${s.header_avaibleWallet_wrap} ${
              walletVisibility && s.avaibleWallet_visible
            }`}
          >
            {!address && (
              <AvaibleWallet hideAvaibleWallet={hideAvaibleWallet} />
            )}
          </div>
        </div>
      </article>
    </div>
  );
};
