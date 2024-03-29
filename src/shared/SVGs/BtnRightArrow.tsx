import { FC } from "react";

interface BtnRightArrowProps {}

export const BtnRightArrow: FC<BtnRightArrowProps> = () => {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.2 0L4.76837e-07 1.25L3.6 5L4.76837e-07 8.75L1.2 10L6 5L1.2 0Z"
        fill="#7E7E7E"
      />
    </svg>
  );
};
