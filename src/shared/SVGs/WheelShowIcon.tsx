export const WheelShowIcon = ({
  className,
  onclick,
}: {
  className?: string;
  onclick?: () => void;
}) => {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onclick}
    >
      <g filter="url(#filter0_d_10102_46131)">
        <path
          d="M19 9C24.5395 9 29 13.4605 29 19C29 24.5395 24.5395 29 19 29C13.4605 29 9 24.5395 9 19C9 13.4605 13.4605 9 19 9Z"
          fill="#FFE09D"
        />
      </g>
      <path
        d="M20 15.0193V13H18V15.0193H20ZM20 25V17.0386H18L18 25H20Z"
        fill="#202020"
      />
      <defs>
        <filter
          id="filter0_d_10102_46131"
          x="0.8"
          y="0.8"
          width="36.4"
          height="36.4"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4.1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.878431 0 0 0 0 0.615686 0 0 0 0.8 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_10102_46131"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_10102_46131"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
