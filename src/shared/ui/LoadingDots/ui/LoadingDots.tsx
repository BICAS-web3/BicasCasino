import { FC } from "react";
import clsx from "clsx";

import styles from "./styles.module.scss";

export interface LoadingDotsProps {
  title: string;
  className?: string;
}

export const LoadingDots: FC<LoadingDotsProps> = ({ title, className }) => {
  return (
    <>
      {title}
      <div className={clsx(styles.loadingDots, className)}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </>
  );
};
