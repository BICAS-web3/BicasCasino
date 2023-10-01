import s from "./styles.module.scss";
import { useUnit } from "effector-react";
import * as BlurModel from "./model";
import { useEffect, useState } from "react";
import * as SideBarModel from "@/widgets/SideBar/model";
import { $isOpen } from "@/widgets/SideBar/model";

export const Blur = () => {
  const [setBlur, BlurActive, sideBarOpen] = useUnit([
    BlurModel.setBlur,
    BlurModel.$BlurActive,
    SideBarModel.$isOpen,
  ]);

  useEffect(() => {
    if (BlurActive) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.position = "relative";
    } else {
      document.documentElement.style.overflow = "visible";
      document.documentElement.style.position = "static";
    }
  }, [BlurActive]);

  return (
    <div
      className={`${s.blur} ${BlurActive ? s.blur_active : ""} ${
        !sideBarOpen && s.sideBar_opened
      }`}
    ></div>
  );
};
