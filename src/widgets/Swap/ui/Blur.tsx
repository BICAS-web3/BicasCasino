import { FC } from "react";
import clsx from "clsx";

import s from "./styles.module.scss";
import { useUnit } from "effector-react";
import { $isOpen } from "@/widgets/SideBar/model";

export interface BlurProps {
  isOpen: boolean;
}

export const Blur: FC<BlurProps> = ({ isOpen }) => {
  const [isSidebarOpen] = useUnit([$isOpen]);
  return (
    <div
      className={clsx(
        isSidebarOpen ? s.blur : s.blur_short,
        isOpen && s.blur_open
      )}
    ></div>
  );
};
