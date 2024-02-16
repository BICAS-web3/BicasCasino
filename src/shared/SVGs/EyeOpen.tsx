import { FC } from "react";

interface EyeOpenProps {
  onClick?: () => void;
  className?: string;
}

export const EyeOpen: FC<EyeOpenProps> = ({ onClick, className }) => {
  return (
    <svg
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <path
        d="M9 0.5C4.31104 0.5 0.703125 4.63086 0.703125 4.63086L0.369141 5L0.703125 5.36914C0.703125 5.36914 3.99243 9.11987 8.36719 9.46484C8.57593 9.49121 8.78467 9.5 9 9.5C9.21533 9.5 9.42407 9.49121 9.63281 9.46484C14.0076 9.11987 17.2969 5.36914 17.2969 5.36914L17.6309 5L17.2969 4.63086C17.2969 4.63086 13.689 0.5 9 0.5ZM9 1.625C10.2393 1.625 11.3818 1.96338 12.375 2.41602C12.7332 3.00928 12.9375 3.69263 12.9375 4.4375C12.9375 6.46997 11.4126 8.13989 9.43945 8.35742C9.42847 8.35962 9.41528 8.35522 9.4043 8.35742C9.27026 8.36401 9.13623 8.375 9 8.375C8.85059 8.375 8.70557 8.36621 8.56055 8.35742C6.5874 8.13989 5.0625 6.46997 5.0625 4.4375C5.0625 3.70361 5.26025 3.02026 5.60742 2.43359H5.58984C6.5918 1.97217 7.74756 1.625 9 1.625ZM9 2.75C8.06836 2.75 7.3125 3.50586 7.3125 4.4375C7.3125 5.36914 8.06836 6.125 9 6.125C9.93164 6.125 10.6875 5.36914 10.6875 4.4375C10.6875 3.50586 9.93164 2.75 9 2.75ZM4.07812 3.27734C3.99023 3.65527 3.9375 4.0354 3.9375 4.4375C3.9375 5.42407 4.21875 6.34692 4.71094 7.12695C3.2937 6.30737 2.30933 5.32959 1.98633 5C2.25659 4.72315 3.01025 3.98926 4.07812 3.27734ZM13.9219 3.27734C14.9897 3.98926 15.7434 4.72315 16.0137 5C15.6907 5.32959 14.7063 6.30737 13.2891 7.12695C13.7812 6.34692 14.0625 5.42407 14.0625 4.4375C14.0625 4.0354 14.0098 3.65088 13.9219 3.27734Z"
        fill="#979797"
      />
    </svg>
  );
};
