import React, { FC } from "react";
import Image from "next/image";
import styles from "./ui.module.scss";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { BlockiesAva } from "@/widgets/BlockiesAva/BlockiesAva";
import { useAccount } from "wagmi";

interface IUserAvatar {
  avatarUrl: string | StaticImport;
  className?: string;
  address: any;
}
export const UserAvatar: FC<IUserAvatar> = (props) => {
  return (
    <div className={styles.blockies_ava_wrap}>
      <BlockiesAva address={props.address} />
    </div>
  );
};
