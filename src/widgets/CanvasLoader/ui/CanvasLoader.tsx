import { FC } from "react";
import { Html } from "@react-three/drei";

import clsx from "clsx";
import s from "./styles.module.scss";

interface IProps {
  className?: string;
}

export const CanvasLoader: FC<IProps> = ({ className }) => {
  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className={clsx(s.preload, className)}></span>
    </Html>
  );
};
