import { FC } from "react";

import s from "./styles.module.scss";

import clsx from "clsx";

export interface BlurProps {
  isOpen?: boolean;
  index?: string;
}

export const Blur: FC<BlurProps> = ({ isOpen, index }) => {
  return <div className={clsx(s.blur, isOpen && s.blur_open, index)}></div>;
};
