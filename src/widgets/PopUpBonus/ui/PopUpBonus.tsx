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
import { LoadingDots } from "@/shared/ui/LoadingDots";
import * as ConnectModel from "@/widgets/Layout/model";

export const PopUpBonus: FC = () => {
  const [startConnect, setStartConnect] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
  ]);
  const [claimed, setClaimed] = useState<boolean>();
  const [close, setClose] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [walletVisibility, setWalletVisibility] = useState(false);

  const { chain } = useNetwork();
  const { address, isConnected, isConnecting } = useAccount();
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
    isConnecting && setStartConnect(false);
  }, []);
  useEffect(() => {
    return () => {
      setStartConnect(false);
    };
  }, []);
  useEffect(() => {
    if (readSuccess && address) {
      setClaimed(claimedState as boolean);
      localStorage.setItem(address, JSON.stringify(claimedState));
    }
  }, [claimedState, readSuccess, isFetching]);

  const [isOpen, isMainWalletOpen, setBlur] = useUnit([
    SideBarModel.$isOpen,
    MainWallet.$isMainWalletOpen,
    BlurModel.setBlur,
  ]);

  //? connect wallet func
  const handleConnectWalletBtn = () => {
    if (chain?.id !== 42161 && address) {
      switchNetwork!(42161);
    }
    if (isMainWalletOpen) {
      return null;
    }

    if (!walletVisibility) {
      setWalletVisibility(true);
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
    if (!isConnected) {
      handleConnectWalletBtn();
    } else if (chain?.id !== 42161) {
      switchNetwork!(42161);
    } else {
      claimBouns?.();
    }
  };

  useEffect(() => {
    claimed === true && isConnected && closeModal();
  }, [claimed]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100vh";
    return () => {
      document.documentElement.style.overflow = "visible";
      document.documentElement.style.height = "auto";
    };
  }, []);
  const claimedFromStorage =
    address && localStorage.getItem(address)
      ? JSON.parse(localStorage.getItem(address)!)
      : false;
  if (
    (address && claimedFromStorage === true) ||
    (address && claimed === true)
  ) {
    document.documentElement.style.overflow = "visible";
    document.documentElement.style.height = "auto";
    return;
  }
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
          <button className={s.connect_wallet_button} onClick={claimBonus}>
            {isConnecting && startConnect ? (
              <LoadingDots className={s.dots_black} title="Connecting" />
            ) : address && isConnected ? (
              chain?.id !== 42161 ? (
                "Switch"
              ) : (
                "Claim"
              )
            ) : (
              "Connect Wallet"
            )}
          </button>{" "}
          <p className={s.banner_wallet_text}>
            *To receive the bonus you need to connect your cryptocurrency wallet
            (we support <span>only Trust Wallet </span> and{" "}
            <span>Metamask</span>).
          </p>
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
