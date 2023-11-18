import { FC } from "react";

interface HomeBtnProps {}

export const HomeBtn: FC<HomeBtnProps> = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1C9 1 3.4326 5.74667 0.3213 8.31733C0.222297 8.40253 0.142533 8.50733 0.0871814 8.62494C0.0318299 8.74254 0.00212726 8.87033 0 9C0 9.23575 0.0948211 9.46184 0.263604 9.62854C0.432387 9.79524 0.661305 9.88889 0.9 9.88889H2.7V16.1111C2.7 16.3469 2.79482 16.573 2.9636 16.7397C3.13239 16.9064 3.3613 17 3.6 17H6.3C6.53869 17 6.76761 16.9064 6.9364 16.7397C7.10518 16.573 7.2 16.3469 7.2 16.1111V12.5556H10.8V16.1111C10.8 16.3469 10.8948 16.573 11.0636 16.7397C11.2324 16.9064 11.4613 17 11.7 17H14.4C14.6387 17 14.8676 16.9064 15.0364 16.7397C15.2052 16.573 15.3 16.3469 15.3 16.1111V9.88889H17.1C17.3387 9.88889 17.5676 9.79524 17.7364 9.62854C17.9052 9.46184 18 9.23575 18 9C17.9987 8.86784 17.9671 8.73769 17.9073 8.61942C17.8476 8.50114 17.7614 8.39784 17.6553 8.31733C14.5656 5.74667 9 1 9 1Z"
        fill="#7E7E7E"
      />
    </svg>
  );
};