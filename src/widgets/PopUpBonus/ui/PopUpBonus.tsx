import { FC, useEffect, useState } from "react";

// import { useAccount, useContractRead } from "wagmi";
import Image from "next/image";
import * as PopupModel from "../model";
import { useUnit } from "effector-react";
import checkIco from "@/public/media/banner_images/checkIco.webp";
// import {
//   useContractWrite,
//   useNetwork,
//   usePrepareContractWrite,
//   useSwitchNetwork,
// } from "wagmi";

import { AvaibleWallet } from "@/widgets/AvaibleWallet";
import { SideBarModel } from "@/widgets/SideBar";

import * as BlurModel from "@/widgets/Blur/model";
import * as MainWallet from "@/widgets/AvaibleWallet/model";

import { ABI as abi } from "@/shared/contracts/ClaimBonusABI";
import { checkPageClicking } from "@/shared/tools";
import { CloseIcon } from "@/shared/SVGs";

import banner_desktop from "@/public/media/banner_images/popupDeskBg.webp";
import banner_medium from "@/public/media/banner_images/popupTabletBg.webp";
import banner_mobile from "@/public/media/banner_images/popupPhoneBg.webp";
import logo from "@/public/media/banner_images/logo.svg";

import s from "./style.module.scss";

import clsx from "clsx";
import { LoadingDots } from "@/shared/ui/LoadingDots";
import * as ConnectModel from "@/widgets/Layout/model";
import { useRouter } from "next/router";

interface IPopUpBonus {
  setShowBonus?: (el: boolean) => void;
  showBonus?: boolean;
  hide?: boolean;
}

export const PopUpBonus: FC<IPopUpBonus> = ({
  setShowBonus,
  showBonus,
  hide = false,
}) => {
  const [startConnect, setStartConnect] = useUnit([
    ConnectModel.$startConnect,
    ConnectModel.setConnect,
  ]);
  const [claimed, setClaimed] = useState<boolean>();
  const [close, setClose] = useState(hide);

  const [visibility, setVisibility] = useState(false);
  const [walletVisibility, setWalletVisibility] = useState(false);
  // const { chain } = useNetwork();
  // const { address, isConnected, isConnecting } = useAccount();
  // const { switchNetwork } = useSwitchNetwork();
  // const [showStateModal, setShowStateModal] = useState(false);

  // const [isPartner] = useUnit([ConnectModel.$isPartner]);
  // const router = useRouter();

  let bgImage;
  const [documentWidth, setDocumentWidth] = useState(0);

  useEffect(() => {
    const documentWidth_2 = document.documentElement.clientWidth;

    setDocumentWidth(documentWidth_2);

    if (documentWidth > 1280) bgImage = banner_desktop;
    if (documentWidth > 700 && documentWidth < 1280) bgImage = banner_medium;
    if (documentWidth < 700) bgImage = banner_mobile;
  }, []);

  //? Read func to check of claimed bonus
  // const {
  //   data: claimedState,
  //   isSuccess: readSuccess,
  //   isFetching,
  //   error,
  // } = useContractRead({
  //   chainId: chain?.id,
  //   address:
  //     chain?.id === 42161
  //       ? "0x5518E648341147B0F4041c5e2a2cca41BDc723a0"
  //       : "0x255854fA295C36a667979410313b304e36bcd65b",
  //   abi,
  //   functionName: "claimedBonus",
  //   args: [address],
  //   enabled: true,
  //   //watch: isConnected,
  // });

  const [showState, setShowState] = useUnit([
    PopupModel.$showState,
    PopupModel.setShowState,
  ]);

  // useEffect(() => {
  //   isConnecting && setStartConnect(false);
  // }, []);
  useEffect(() => {
    return () => {
      setStartConnect(false);
    };
  }, []);

  // useEffect(() => {
  //   if (readSuccess && address) {
  //     setClaimed(claimedState as boolean);
  //     localStorage.setItem(address, JSON.stringify(claimedState));
  //   }
  // }, [claimedState, readSuccess, isFetching]);

  const [isOpen, isMainWalletOpen, setBlur] = useUnit([
    SideBarModel.$isOpen,
    MainWallet.$isMainWalletOpen,
    BlurModel.setBlur,
  ]);

  //? connect wallet func
  const handleConnectWalletBtn = () => {
    // if (!chainState && address) {
    //   switchNetwork!(137);
    // }
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

  // const hideAvaibleWallet = () => {
  //   setVisibility(false);
  //   setWalletVisibility(false);
  //   setBlur(false);
  //   document.documentElement.style.overflow = "visible";
  // };

  //? contract to add bonus
  // const { config: ClaimBonusConfig } = usePrepareContractWrite({
  //   chainId: chain?.id,
  //   address:
  //     chain?.id === 42161
  //       ? "0x5518E648341147B0F4041c5e2a2cca41BDc723a0"
  //       : "0x255854fA295C36a667979410313b304e36bcd65b",
  //   abi,
  //   functionName: "claimBonus",
  //   enabled: true,
  // });
  // const { write: claimBouns, isSuccess } = useContractWrite(ClaimBonusConfig);

  // useEffect(() => {
  //   if (address && isSuccess && setVisibility) {
  //     closeModal();
  //     setVisibility(false);
  //     setClaimed(true);
  //     localStorage.setItem(address, JSON.stringify(true));
  //   }
  //   setWalletVisibility(false);
  // }, [isSuccess]);

  if (!close) {
    document.documentElement.style.overflow = "hidden";
    window.screenY = 0;
  }

  //? close all func
  const closeModal = () => {
    !setShowBonus?.(false);
    document.documentElement.style.overflow = "visible";
    document.documentElement.style.height = "auto";
    setClose(true);
    setBlur(false);
  };

  //? shorten call claim func
  // const queryParams = new URLSearchParams(window.location.search);
  // const partner_address = queryParams.get("partner_address");
  // const site_id = queryParams.get("site_id");
  // const sub_id = queryParams.get("sub_id");
  const claimBonus = () => {
    // if (!isConnected) {
    //   router.push(
    //     isPartner
    //       ? `/RegistrManual?partner_address=${partner_address}&site_id=${site_id}&sub_id=${sub_id}`
    //       : "/RegistrManual"
    //   );
    //   // handleConnectWalletBtn();
    // } else if (!chainState) {
    //   switchNetwork!(137);
    // } else {
    //   claimBouns?.();
    // }
  };

  useEffect(() => {
    const storedState = localStorage.getItem("bonusPopupState");
    if (storedState === null) {
      localStorage.setItem("bonusPopupState", "false");
    } else {
      setShowState(storedState === "true");
    }
  }, []);

  const handleShowStateBtn = () => {
    setShowState(!showState);
    localStorage.setItem("bonusPopupState", `${!showState}`);
  };

  useEffect(() => {
    const storedState = localStorage.getItem("bonusPopupState");
    if (storedState === "false") {
      setShowState(false);
    }
  }, []);

  useEffect(() => {
    // claimed === true && isConnected && closeModal();
  }, [claimed]);

  const [chainState, setChainState] = useState<boolean>();

  // useEffect(() => {
  //   if (chain?.id === 42161 || chain?.id === 137) {
  //     setChainState(true);
  //   } else {
  //     setChainState(false);
  //   }
  // }, [chain?.id]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100vh";
    return () => {
      document.documentElement.style.overflow = "visible";
      document.documentElement.style.height = "auto";
    };
  }, []);

  // useEffect(() => {
  //   showBonus && setShowBonus?.(close);
  // }, [close]);
  // const claimedFromStorage =
  //   address && localStorage.getItem(address)
  //     ? JSON.parse(localStorage.getItem(address)!)
  //     : false;
  // if (
  //   (address && claimedFromStorage === true) ||
  //   (address && claimed === true)
  // ) {
  //   document.documentElement.style.overflow = "visible";
  //   document.documentElement.style.height = "auto";
  //   return;
  // }

  return (
    <div
      onClick={closeModal}
      className={clsx(
        s.wrapper,
        close && !showBonus && s.closed,
        visibility && false ? s.wrapper_index : s.index_return // !isConnected
      )}
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          s.banner
          // visibility && !isConnected && s.move_banner,
          // address && isConnected && s.claimBanner
        )}
      >
        <CloseIcon onClick={closeModal} className={s.closeIcon} />
        <div className={s.img_wrapper}>
          <img className={s.img} src={(bgImage as any)?.src} alt="100%" />
        </div>
        <Image src={logo} className={s.popup_logo} alt="logo" />
        <span className={s.title_default}>
          <span className={s.inner_default_title}>No KYC,</span> all privacy -
          just play and win!
        </span>
        <span className={clsx(s.title_default, s.title_default_sub)}>
          Unlock the thrill: Get your{" "}
          <span className={s.inner_default_title}>
            $100 bonus in DRAXB tokens now!
          </span>
        </span>
        <p className={s.text_default}>
          Step into the <span>Web3.0</span> realm as a Greek god of gaming!
          Immerse yourself in an exhilarating gaming experience filled with
          divine adventures.
        </p>
        <div
          data-id={"connect-wallet-block"}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={s.subtitle}>Blockchain gas fee may apply</span>
          <button className={s.connect_wallet_button} onClick={claimBonus}>
            {/* {isConnecting && startConnect ? (
              <LoadingDots className={s.dots_black} title="Connecting" />
            ) : address && isConnected ? (
              !chainState ? (
                "Switch"
              ) : (
                "Claim"
              )
            ) : (
              "join game"
            )} */}
            Claim
          </button>{" "}
          {/* {!address && !isConnected && (
            <div
              className={`${s.header_avaibleWallet_wrap} ${
                walletVisibility && s.avaibleWallet_visible
              }`}
            >
              <AvaibleWallet hideAvaibleWallet={hideAvaibleWallet} />
            </div>
          )} */}
        </div>
        <div className={s.checkbox} onClick={handleShowStateBtn}>
          <div className={`${s.checkbox_block} ${showState && s.checked}`}>
            {showState && <Image src={checkIco} alt="arrow" />}
          </div>
          Don’t show again
        </div>
      </article>
    </div>
  );
};
