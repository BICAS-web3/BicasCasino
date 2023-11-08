import { useUnit } from "effector-react";
import { FC, useEffect } from "react";
import clsx from "clsx";

import { $isOpen } from "@/widgets/SideBar/model";

import s from "./styles.module.scss";

export interface BlurProps {
  isOpen: boolean;
}

export const Blur: FC<BlurProps> = ({ isOpen }) => {
  const [isSidebarOpen] = useUnit([$isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.height = "100vh";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.height = "auto";
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.documentElement.style.height = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <div
      className={clsx(
        isSidebarOpen ? s.blur : s.blur_short,
        isOpen && s.blur_open
      )}
    ></div>
  );
};
