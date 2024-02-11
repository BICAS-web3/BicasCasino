import { FC } from "react";
import clsx from "clsx";

import styles from "./styles.module.scss";
import { Blur } from "./Blur";

export interface PreloadProps {
  className?: string;
  index?: string;
}

export const Preload: FC<PreloadProps> = ({ className, index }) => {
  return (
    <>
      <Blur index={index} isOpen />
      <span className={clsx(styles.preload, className)}></span>
    </>
  );
};
