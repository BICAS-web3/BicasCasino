import { FC } from "react";

export interface MineIconProps {
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}
export const MineIcon: FC<MineIconProps> = (props) => {
  const { className, onClick, selected } = props;
  return (
    <svg
      width="90"
      height="90"
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <mask id="path-1-inside-1_2351_116825" fill="white">
        <path d="M0 10C0 4.47715 4.47715 0 10 0H80C85.5229 0 90 4.47715 90 10V80C90 85.5229 85.5229 90 80 90H10C4.47715 90 0 85.5229 0 80V10Z" />
      </mask>
      <path
        d="M0 10C0 4.47715 4.47715 0 10 0H80C85.5229 0 90 4.47715 90 10V80C90 85.5229 85.5229 90 80 90H10C4.47715 90 0 85.5229 0 80V10Z"
        fill="url(#paint0_linear_2351_116825)"
      />
      <path
        d="M0 10C0 3.92487 4.92487 -1 11 -1H79C85.0751 -1 90 3.92487 90 10C90 5.02944 85.5229 1 80 1H10C4.47715 1 0 5.02944 0 10ZM90 90H0H90ZM0 90V0V90ZM90 0V90V0Z"
        fill="#464646"
        mask="url(#path-1-inside-1_2351_116825)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2351_116825"
          x1="45"
          y1="0"
          x2="45"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#333333" />
          <stop offset="1" stop-color="#1D1D1D" />
        </linearGradient>
      </defs>
    </svg>
  );
};
