import { FC } from "react";

export interface BonusIcoProps {}
export const BonusIco: FC<BonusIcoProps> = (props) => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.1 6.5C13.1 6.2 15 5.4 13.3 2.9C12.6 1.9 11.9 1.5 11.3 1.5C10.3 1.5 9.6 2.6 9 3.7C8.4 2.6 7.7 1.5 6.7 1.5C6.1 1.5 5.4 1.9 4.7 2.9C2.9 5.4 4.9 6.2 6.9 6.5H1V9.5H17V6.5H11.1ZM8 8.5V6.5H10V8.5H8ZM10 16.5H8V10.5H2V17.5H16V10.5H10V16.5Z"
        fill="#7E7E7E"
      />
    </svg>
  );
};
