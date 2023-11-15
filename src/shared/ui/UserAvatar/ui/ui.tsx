import React, { FC } from "react";
import Image from "next/image";
import styles from "./ui.module.scss";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface IUserAvatar {
  avatarUrl: string | StaticImport;
  className?: string;
}
export const UserAvatar: FC<IUserAvatar> = (props) => {
  return (
    <Image
      className={styles.avatar}
      alt={"avatar"}
      src={props.avatarUrl}
      width={150}
      height={150}
    />
  );
};
