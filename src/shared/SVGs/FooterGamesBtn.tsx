import { FC } from "react";

interface FooterGamesBtnProps {}

export const FooterGamesBtn: FC<FooterGamesBtnProps> = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.6 0L5.6 4.4L8 6.8L10.4 4.4L10.4 0L5.6 0ZM0 5.6L0 10.4L4.4 10.4L6.8 8L4.4 5.6L0 5.6ZM11.6 5.6L9.2 8L11.6 10.4L16 10.4L16 5.6L11.6 5.6ZM8 9.2L5.6 11.6L5.6 16L10.4 16L10.4 11.6L8 9.2Z"
        fill="#7E7E7E"
      />
    </svg>
  );
};
