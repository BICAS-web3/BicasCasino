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
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "visible";
      document.body.style.position = "static";
      document.body.style.height = "100%";
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
