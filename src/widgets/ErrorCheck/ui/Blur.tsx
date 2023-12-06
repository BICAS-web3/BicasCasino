import { FC } from "react";

import s from "./styles.module.scss";

import clsx from "clsx";

export interface BlurProps {
  isOpen?: boolean;
}

export const Blur: FC<BlurProps> = ({ isOpen }) => {
  return <div className={clsx(s.blur, isOpen && s.blur_open)}></div>;
};
