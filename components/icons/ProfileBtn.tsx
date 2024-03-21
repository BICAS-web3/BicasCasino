import { FC } from "react";

interface ProfileBtnProps {}

export const ProfileBtn: FC<ProfileBtnProps> = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00391 0C5.80403 0 3.99883 1.79895 3.99883 3.99883C3.99883 6.19871 5.80403 8.00391 8.00391 8.00391C10.2038 8.00391 12.0012 6.19871 12.0012 3.99883C12.0012 1.79895 10.2038 0 8.00391 0Z"
        fill="#7E7E7E"
      />
      <path
        d="M0 13C0 10.7909 1.79086 9 4 9H12C14.2091 9 16 10.7909 16 13V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V13Z"
        fill="#7E7E7E"
      />
    </svg>
  );
};
