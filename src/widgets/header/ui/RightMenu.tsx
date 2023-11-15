import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";

import s from "./styles.module.scss";
import { useUnit } from "effector-react";
import { sessionModel } from "@/entities/session";

import ChatIcon from "@/public/media/misc/chatIcon.svg";
import BellIcon from "@/public/media/misc/bellIcon.svg";
import { SideBarModel } from "@/widgets/SideBar";
import * as BlurModel from "@/widgets/Blur/model";
import { NetworkSelect } from "@/widgets/NetworkSelect/NetworkSelect";
import * as HeaderAccModel from "@/widgets/Account/model";
import closeIco from "@/public/media/headerIcons/Close.svg";
import { Account } from "../../Account";
import clsx from "clsx";
import { ConnectWalletButton } from "./ConnectButton";

import { useDropdown } from "@/shared/tools";

import * as SwapModel from "@/widgets/Swap/model/index";

export interface RightMenuProps {
  isGame: boolean;
}
export const RightMenu: FC<RightMenuProps> = (props) => {
  const { isConnected, address } = useAccount();
  const { isOpen, toggle, close, dropdownRef } = useDropdown();
  const [screenWidth, setScreenWidth] = useState(0);

  const [
    isSbOpen,
    openHeaderAcc,
    closeHeaderAcc,
    isHeaderAccOpened,
    setBlur,
    logIn,
    currentNickname,
    logOut,
  ] = useUnit([
    SideBarModel.$isOpen,
    HeaderAccModel.Open,
    HeaderAccModel.Close,
    HeaderAccModel.$isHeaderAccountOpened,
    BlurModel.setBlur,
    sessionModel.logIn,
    sessionModel.$currentNickname,
    sessionModel.logOut,
  ]);

  useEffect(() => {
    if (address == undefined) {
      logOut();
      return;
    }

    logIn({ address: (address as string).toLowerCase() });
  }, [address]);

  const closeSidebar = () => {
    close();
    document.documentElement.style.overflow = "visible";
  };

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (screenWidth < 650) {
        document.documentElement.style.overflow = "hidden";
        openHeaderAcc();
      } else {
        openHeaderAcc();
      }
    } else {
      closeHeaderAcc();
    }
  }, [isOpen]);

  };
  const [swapOpen] = useUnit([SwapModel.$isSwapOpen]);

  const notification = false;
  return (
    <div className={s.right_menu}>
      <NetworkSelect isGame={props.isGame} />
      {isConnected && (
        <div className={s.button}>
          <Image src={BellIcon} alt={"notification"} className={s.icon} />
          {notification && <div className={s.new_notification}></div>}
        </div>
      )}
      <div className={`${s.button} ${s.chat}`}>
        <Image src={ChatIcon} alt={""} className={s.icon} />
      </div>
      {isSbOpen && screenWidth <= 650 ? (
        <button
          className={s.header_mobile_closeSidebar_btn}
          onClick={closeSidebar}
        >
          <Image alt="close-ico" src={closeIco} />
        </button>
      ) : (
        <div className={s.header_mobile_right_wrap}>
          {isConnected ? (
            <div ref={dropdownRef} className={s.header_profile_ico_wrap}>
              <div className={s.header_profile_ico_block} onClick={toggle}>
                <span className={s.header_profile_ico_title}>А</span>
              </div>
              {isHeaderAccOpened && (
                <div>
                  <Account
                    address={address as string}
                    nickname={currentNickname}
                  />
                </div>
              )}
            </div>
          ) : (
            <ConnectWalletButton />
          )}
        </div>
      )}
    </div>
  );
};
