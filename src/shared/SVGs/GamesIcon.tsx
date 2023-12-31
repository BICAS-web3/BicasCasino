import { FC } from "react";
import s from "@/widgets/SideBar/styles.module.scss";

export interface GamesIconProps {}
export const GamesIcon: FC<GamesIconProps> = (props) => {
  return (
    <svg
      className={s.games_btn_ico}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 4H4V0H0V4ZM6 16H10V12H6V16ZM0 16H4V12H0V16ZM0 10H4V6H0V10ZM6 10H10V6H6V10ZM12 0V4H16V0H12ZM6 4H10V0H6V4ZM12 10H16V6H12V10ZM12 16H16V12H12V16Z"
        fill="#979797"
      />
    </svg>
  );
};
