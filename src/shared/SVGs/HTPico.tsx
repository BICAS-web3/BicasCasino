import { FC } from "react";

export interface HTPicoProps {}
export const HTPico: FC<HTPicoProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 8.5C16 4.06839 12.4316 0.5 8 0.5C3.56839 0.5 0 4.06839 0 8.5C0 12.9316 3.56839 16.5 8 16.5C12.4316 16.5 16 12.9316 16 8.5ZM9 3.5V5.18276H7V3.5H9ZM9 6.86552V13.5H7V6.86552H9Z"
        fill="#7E7E7E"
      />
    </svg>
  );
};
