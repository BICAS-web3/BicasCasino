import { FC } from "react";

interface IBallIcon {
  className?: string;
  onClick?: () => void;
}

export const BallIcon: FC<IBallIcon> = ({ className, onClick }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="5.52148" cy="5.62695" r="5" fill="#D9D9D9" />
  </svg>
);
