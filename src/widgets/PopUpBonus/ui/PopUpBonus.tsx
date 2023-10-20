import { FC, useEffect, useState } from "react";

import { useAccount } from "wagmi";

import Image from "next/image";

import banner from "@/public/media/banner/banner.png";

import { CloseIcon } from "@/shared/SVGs";

import { ConnectWalletButton } from "./ConnectButton";

import s from "./style.module.scss";

import clsx from "clsx";

export const PopUpBonus: FC = () => {
  const { isConnected } = useAccount();

  const [close, setClose] = useState(false);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100vh";

    return () => {
      document.documentElement.style.overflow = "visible";
      document.documentElement.style.height = "100vh";
    };
  });

  return (
    <div
      onClick={() => setClose((prev) => !prev)}
      className={clsx(s.wrapper, close && s.closed)}
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className={clsx(s.banner, visibility && s.move_banner)}
      >
        <CloseIcon
          onClick={() => setClose((prev) => !prev)}
          className={s.closeIcon}
        />
        <div className={s.img_wrapper}>
          <Image className={s.img} src={banner} alt="100%" />
        </div>
        <h2 className={s.title}>
          {!isConnected ? "Receive your first 100$ bonus" : "Claim your bonus"}
        </h2>
        <ConnectWalletButton setVisibility={setVisibility} />
      </article>
    </div>
  );
};
