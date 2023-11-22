import { FC, useEffect, useState } from "react";

import { useAccount, useContractRead } from "wagmi";
import Image from "next/image";
import * as PopupModel from '../model'
import { useUnit } from "effector-react";
import checkIco from "@/public/media/banner_images/checkIco.png";
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

import banner_desktop from "@/public/media/banner_images/popupDeskBg.png";
import banner_medium from "@/public/media/banner_images/popupTabletBg.png";
import banner_mobile from "@/public/media/banner_images/popupPhoneBg.png";
import logo from "@/public/media/banner_images/logo.svg";

import s from "./style.module.scss";

import clsx from "clsx";
import { LoadingDots } from "@/shared/ui/LoadingDots";

export const PopUpBonus: FC = () => {
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

  const [showState, setShowState] = useUnit([
    PopupModel.$showState,
    PopupModel.setShowState
  ])

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

  const handleShowStateBtn = () => {
    setShowState(!showState)
  }

  useEffect(() => {
    if(showState) {
      localStorage.setItem('bonusPopupState', 'false')
    } else {
      localStorage.setItem('bonusPopupState', 'true')
    }
  }, [showState])

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
        <Image src={logo} className={s.popup_logo} alt="logo" />
        <span className={s.title_default}><span className={s.inner_default_title}>No KYC,</span> all privacy - just play and win!</span>
        <span className={s.title_default}>Unlock the thrill: Get your <span className={s.inner_default_title}>$100 bonus in DRAXB tokens now!</span></span>
        <p className={s.text_default}>Step into the <span>Web3.0</span> realm as a Greek god of gaming! Immerse yourself in an exhilarating gaming experience filled with divine adventures.</p>
        <div
          data-id={"connect-wallet-block"}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={s.subtitle}>Blockchain gas fee may apply</span>
          <button className={s.connect_wallet_button} onClick={claimBonus}>
            {address && isConnected ? (
              chain?.id !== 42161 ? (
                "Switch"
              ) : (
                "Claim"
              )
            ) : isConnecting ? (
              <LoadingDots className={s.dots_black} title="Connecting" />
            ) : (
              "join game"
            )}
          </button>{" "}
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
        <div className={s.checkbox}>
          <div onClick={handleShowStateBtn} className={`${s.checkbox_block} ${showState && s.checked}`}> {showState && <Image src={checkIco} alt="arrow" /> } </div>
          Don’t show again
        </div>
      </article>
    </div>
  );
};
