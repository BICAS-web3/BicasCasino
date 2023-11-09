import { FC } from "react";

export interface SwaptIconProps {
  className?: string;
  onClick?: () => void;
}
export const SwaptIcon: FC<SwaptIconProps> = ({ className, onClick }) => {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M9.11526 2.48837C5.51898 2.48837 2.60361 5.40373 2.60361 9H1.11523C1.11523 4.58172 4.69697 1 9.11526 1C11.0459 1 12.8166 1.68418 14.1982 2.82219L15.9403 1.73667L16.121 7.10434L11.3821 4.57692L12.8479 3.66357C11.7907 2.92266 10.5036 2.48837 9.11526 2.48837Z"
        fill="currentColor"
      />
      <path
        d="M5.33302 14.3014C6.39947 15.0636 7.70512 15.5116 9.11521 15.5116C12.7115 15.5116 15.6269 12.5963 15.6269 9H17.1152C17.1152 13.4183 13.5335 17 9.11521 17C7.15774 17 5.36478 16.2967 3.97495 15.1302L2.22293 16.1994L2.09219 10.8303L6.80736 13.4016L5.33302 14.3014Z"
        fill="currentColor"
      />
    </svg>
  );
};
