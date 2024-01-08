import { FC } from "react";
import clsx from "clsx";

import styles from "./styles.module.scss";
import { Blur } from "@/widgets/ErrorCheck/ui/Blur";

export interface PreloadProps {
  className?: string;
}

export const Preload: FC<PreloadProps> = ({ className }) => {
  return (
    <>
      <Blur isOpen />
      <span className={clsx(styles.preload, className)}></span>
    </>
  );
};
