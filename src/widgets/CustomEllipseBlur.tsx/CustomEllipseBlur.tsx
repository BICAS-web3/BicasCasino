import { FC } from "react";
import s from "./styles.module.scss";

interface CustomEllipseBlurProps {}

export const CustomEllipseBlur: FC<CustomEllipseBlurProps> = () => {
  return <div className={s.custom_ellipse_blur}></div>;
};
