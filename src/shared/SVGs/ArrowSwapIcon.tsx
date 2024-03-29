import { FC } from "react";

export interface ArrowSwapIconProps {
  className?: string;
  onClick?: () => void;
}

export const ArrowSwapIcon: FC<ArrowSwapIconProps> = ({
  className,
  onClick,
}) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6.46631L6 12L1.6247e-06 6.46631L1.18886 5.0786L5.10527 8.69063L5.10527 -3.01378e-07L6.89474 -2.23158e-07L6.89474 8.69063L10.8111 5.0786L12 6.46631Z"
        fill="currentColor"
      />
    </svg>
  );
};
