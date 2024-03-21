import {FC} from "react";

interface IArrowIconProps {
}

export const ArrowIconRight: FC<IArrowIconProps> = props => (
  <svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={15} cy={15} r={14.5} fill="#202020" stroke="#363636"/>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m15.92 9 5.067 5.7-5.066 5.7-1.271-1.13 3.307-3.72H10v-1.7h7.957l-3.307-3.72L15.92 9Z"
      fill="#EAEAEA"
    />
  </svg>
)