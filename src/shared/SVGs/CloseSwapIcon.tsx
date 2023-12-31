import { FC } from "react";

export interface CloseSwapIconProps {
  className?: string;
  onClick?: () => void;
}

export const CloseSwapIcon: FC<CloseSwapIconProps> = ({
  className,
  onClick,
}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M0.352043 15.648C-0.117275 15.1787 -0.117275 14.4178 0.352043 13.9485L13.9485 0.35199C14.4178 -0.11733 15.1787 -0.11733 15.648 0.35199C16.1173 0.82131 16.1173 1.58223 15.648 2.05155L2.0516 15.648C1.58228 16.1173 0.821362 16.1173 0.352043 15.648Z"
        fill="currentColor"
      />
      <path
        d="M15.648 15.648C16.1173 15.1787 16.1173 14.4178 15.648 13.9485L2.05154 0.35199C1.58222 -0.11733 0.821307 -0.11733 0.351989 0.35199C-0.11733 0.82131 -0.11733 1.58223 0.351989 2.05155L13.9484 15.648C14.4177 16.1173 15.1786 16.1173 15.648 15.648Z"
        fill="currentColor"
      />
    </svg>
  );
};
