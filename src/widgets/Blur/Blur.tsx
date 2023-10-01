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

  return (
    <div
      className={`${s.blur} ${BlurActive ? s.blur_active : ""} ${
        !sideBarOpen && s.sideBar_opened
      }`}
    ></div>
  );
};
