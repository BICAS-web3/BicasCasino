import { FC, useEffect, useState } from "react";

import { useAccount, useContractRead } from "wagmi";

import Image from "next/image";

import { useUnit } from "effector-react";

import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
} from "wagmi";

import { AvaibleWallet } from "@/widgets/AvaibleWallet";
import { SideBarModel } from "@/widgets/SideBar";

import * as BlurModel from "@/widgets/Blur/model";
import * as MainWallet from "@/widgets/AvaibleWallet/model";

import { ABI as abi } from "@/shared/contracts/ClaimBonusABI";
import { checkPageClicking } from "@/shared/tools";
import { CloseIcon } from "@/shared/SVGs";

import banner_desktop from "@/public/media/banner_images/banner_desktop.png";
import banner_medium from "@/public/media/banner_images/banner_medium.png";
import banner_mobile from "@/public/media/banner_images/banner_mobile.png";

import s from "./style.module.scss";

import clsx from "clsx";

export const PopUpBonus: FC = () => {
  const [claimed, setClaimed] = useState<boolean>();
  const [close, setClose] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [walletVisibility, setWalletVisibility] = useState(false);

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { switchNetwork } = useSwitchNetwork();

  let bgImage;
  const documentWidth = document.documentElement.clientWidth;

  if (documentWidth > 1280) bgImage = banner_desktop;
  if (documentWidth > 700 && documentWidth < 1280) bgImage = banner_medium;
  if (documentWidth < 700) bgImage = banner_mobile;

  //? Read func to check of claimed bonus
  const {
    data: claimedState,
    isSuccess: readSuccess,
    isFetching,
  } = useContractRead({
    chainId: chain?.id,
    address: "0x5518E648341147B0F4041c5e2a2cca41BDc723a0",
    abi,
    functionName: "claimedBonus",
    args: [address],
    enabled: true,
    watch: isConnected,
  });

  useEffect(() => {
    if (readSuccess) {
      setClaimed(claimedState as boolean);
      localStorage.setItem("claimed", JSON.stringify(claimedState));
    }
  }, [claimedState, readSuccess, isFetching]);

  const [isOpen, isMainWalletOpen, setBlur] = useUnit([
    SideBarModel.$isOpen,
    MainWallet.$isMainWalletOpen,
    BlurModel.setBlur,
  ]);

  //? connect wallet func
  const handleConnectWalletBtn = () => {
    if (isMainWalletOpen) {
      return null;
    }

    if (!walletVisibility) {
      setWalletVisibility(true);
      // setBlur(true);
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

  //? contract to add bonus
  const { config: ClaimBonusConfig } = usePrepareContractWrite({
    chainId: chain?.id,
    address: "0x5518E648341147B0F4041c5e2a2cca41BDc723a0",
    abi,
    functionName: "claimBonus",
    enabled: true,
  });
  const { write: claimBouns, isSuccess } = useContractWrite(ClaimBonusConfig);

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
    document.documentElement.style.overflow = "hidden";
    window.screenY = 0;
  }

  //? close all func
  const closeModal = () => {
    document.documentElement.style.overflow = "visible";
    document.documentElement.style.height = "auto";
    setClose(true);
    setBlur(false);
  };

  //? shorten call claim func
  const claimBonus = () => {
    if (claimed === false) {
      if (chain?.id !== 42161) {
        switchNetwork && switchNetwork!(42161);
        claimBouns?.();
        return;
      } else {
        claimBouns?.();
      }
    } else {
      closeModal();
    }
  };

  useEffect(() => {
    claimed === true && closeModal();
  }, [claimed]);
  const claimedFromStorage = localStorage.getItem("claimed")
    ? JSON.parse(localStorage.getItem("claimed")!)
    : false;
  if (claimedFromStorage === true || claimed === true) return;
  return (
    <div
      onClick={closeModal}
      className={clsx(
        s.wrapper,
        close && s.closed,
        visibility && !isConnected ? s.wrapper_index : s.index_return
      )}
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          s.banner,
          visibility && !isConnected && s.move_banner,
          address && isConnected && s.claimBanner
        )}
      >
        <CloseIcon onClick={closeModal} className={s.closeIcon} />
        <div className={s.img_wrapper}>
          <Image className={s.img} src={bgImage!} alt="100%" />
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
                claimBonus();
              }
            }}
          >
            {address && isConnected
              ? chain?.id !== 42161
                ? "Switch"
                : "Claim"
              : "Connect Wallet"}
          </button>
          {!address && !isConnected && (
            <div
              className={`${s.header_avaibleWallet_wrap} ${
                walletVisibility && s.avaibleWallet_visible
              }`}
            >
              <AvaibleWallet hideAvaibleWallet={hideAvaibleWallet} />
            </div>
          )}
        </div>
      </article>
    </div>
  );
};
