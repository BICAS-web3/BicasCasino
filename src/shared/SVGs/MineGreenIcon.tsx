import { FC } from "react";

export interface MineGreenIconProps {
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}
export const MineGreenIcon: FC<MineGreenIconProps> = (props) => {
  const { className, onClick, selected } = props;
  return (
    <svg
      onClick={onClick}
      className={className}
      width="93"
      height="92"
      viewBox="0 0 93 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_5952_46152" fill="white">
        <path d="M2.14941 10C2.14941 4.47715 6.62657 0 12.1494 0H82.1494C87.6723 0 92.1494 4.47715 92.1494 10V80C92.1494 85.5229 87.6723 90 82.1494 90H12.1494C6.62657 90 2.14941 85.5229 2.14941 80V10Z" />
      </mask>
      <g filter="url(#filter0_i_5952_46152)">
        <path
          d="M2.14941 10C2.14941 4.47715 6.62657 0 12.1494 0H82.1494C87.6723 0 92.1494 4.47715 92.1494 10V80C92.1494 85.5229 87.6723 90 82.1494 90H12.1494C6.62657 90 2.14941 85.5229 2.14941 80V10Z"
          fill="url(#paint0_linear_5952_46152)"
        />
      </g>
      <path
        d="M2.14941 10C2.14941 3.92487 7.07428 -1 13.1494 -1H81.1494C87.2245 -1 92.1494 3.92487 92.1494 10C92.1494 5.02944 87.6723 1 82.1494 1H12.1494C6.62657 1 2.14941 5.02944 2.14941 10ZM92.1494 90H2.14941H92.1494ZM2.14941 90V0V90ZM92.1494 0V90V0Z"
        fill="#464646"
        mask="url(#path-1-inside-1_5952_46152)"
      />
      <defs>
        <filter
          id="filter0_i_5952_46152"
          x="2.14941"
          y="0"
          width="90"
          height="90"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="9"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_innerShadow_5952_46152"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="10.6" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.656944 0 0 0 0 0.655922 0 0 0 0 0.655119 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_5952_46152"
          />
        </filter>
        <linearGradient
          id="paint0_linear_5952_46152"
          x1="47.1494"
          y1="0"
          x2="47.1494"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3BA339" />
          <stop offset="1" stop-color="#163D15" />
        </linearGradient>
      </defs>
    </svg>
  );
};
