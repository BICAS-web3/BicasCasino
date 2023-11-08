import { FC } from "react";
import clsx from "clsx";

import s from "./styles.module.scss";

export interface BlurProps {
  isOpen: boolean;
}

export const Blur: FC<BlurProps> = ({ isOpen }) => {
  return <div className={clsx(s.blur, isOpen && s.blur_open)}></div>;
};
