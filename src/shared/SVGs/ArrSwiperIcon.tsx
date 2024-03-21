import { FC } from "react";

interface IArrowIconSwap {
  className?: string;
  onClick?: () => void;
}

export const ArrowIconSwap: FC<IArrowIconSwap> = ({ className, onClick }) => (
  <svg
    width="8"
    height="14"
    viewBox="0 0 8 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.4 0L8 1.75L3.2 7L8 12.25L6.4 14L-1.47871e-09 7L6.4 0Z"
      fill="#7E7E7E"
    />
  </svg>
);
