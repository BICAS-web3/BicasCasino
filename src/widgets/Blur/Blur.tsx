import s from "./styles.module.scss";
import { useUnit } from "effector-react";
import * as BlurModel from "./model";
import { useEffect, useState } from "react";
import * as SideBarModel from "@/widgets/SideBar/model";
import { $isOpen } from "@/widgets/SideBar/model";
// import { useAccount } from "wagmi";

export const Blur = () => {
  // const { isConnected } = useAccount();

  const [setBlur, BlurActive, sideBarOpen] = useUnit([
    BlurModel.setBlur,
    BlurModel.$BlurActive,
    SideBarModel.$isOpen,
  ]);

  // useEffect(() => {
  //   if (isConnected && BlurActive) {
  //     document.documentElement.style.overflow = "visible";
  //     setBlur(false);
  //   }
  // }, [isConnected]);

  return (
    <div
      className={`${s.blur} ${BlurActive ? s.blur_active : ""} ${
        !sideBarOpen && s.sideBar_opened
      }`}
    ></div>
  );
};
