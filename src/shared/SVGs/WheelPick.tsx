import { FC } from "react";

export interface WheelPickProps {
  className?: string;
}
export const WheelPick: FC<WheelPickProps> = ({ className }) => {
  return (
    <svg
      width="26"
      height="39"
      viewBox="0 0 26 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.8236 25.0758C22.6154 23.1602 26 18.4755 26 13C26 5.82032 20.1798 0 13 0C5.82017 0 0 5.82032 0 13C0 18.4755 3.38457 23.1602 8.17642 25.0758L13 39L17.8236 25.0758Z"
        fill="#EF8CFF"
      />
      <circle cx="13.0002" cy="12.9992" r="7.8" fill="#983DC2" />
    </svg>
  );
};
