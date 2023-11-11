import { FC } from "react";

export interface CloseIconProps {
  className?: string;
  onClick?: () => void;
}

export const CloseIcon: FC<CloseIconProps> = ({ className, onClick }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M22 11.2086L20.7914 10L16 14.7914L11.2086 10L10 11.2086L14.7914 16L10 20.7914L11.2086 22L16 17.2086L20.7914 22L22 20.7914L17.2086 16L22 11.2086Z"
        fill="currentColor"
      />
    </svg>
  );
};
