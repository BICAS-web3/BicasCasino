import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ui.module.scss";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { BlockiesAva } from "@/widgets/BlockiesAva/BlockiesAva";
// import { useAccount } from "wagmi";

interface IUserAvatar {
  avatarUrl: string | StaticImport;
  className?: string;
  address: any;
}
export const UserAvatar: FC<IUserAvatar> = (props) => {
  const [avaSize, setAvaSize] = useState("150");
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (screenWidth < 650) {
      setAvaSize("50");
    } else {
      setAvaSize("150");
    }
  }, [screenWidth]);

  return (
    <div className={styles.blockies_ava_wrap}>
      <BlockiesAva address={props.address} size={avaSize} />
    </div>
  );
};
