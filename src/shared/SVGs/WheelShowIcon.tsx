export const WheelShowIcon = ({
  className,
  onclick,
  onMouseEnter,
  onMouseLeave,
}: {
  className?: string;
  onclick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onclick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <rect width="40" height="40" rx="12" fill="#202020" />
      <g filter="url(#filter0_d_10102_46130)">
        <path
          d="M20 10C25.5395 10 30 14.4605 30 20C30 25.5395 25.5395 30 20 30C14.4605 30 10 25.5395 10 20C10 14.4605 14.4605 10 20 10Z"
          fill="#FFE09D"
        />
      </g>
      <path
        d="M21 16.0193V14H19V16.0193H21ZM21 26V18.0386H19L19 26H21Z"
        fill="#202020"
      />
      <defs>
        <filter
          id="filter0_d_10102_46130"
          x="1.8"
          y="1.8"
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
            result="effect1_dropShadow_10102_46130"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_10102_46130"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
