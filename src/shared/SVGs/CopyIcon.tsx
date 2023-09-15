import {FC} from "react"

interface ICopyIcon {
  onClick: () => void
}

export const CopyIcon: FC<ICopyIcon> = ({onClick, ...props}) => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    onClick={onClick}
  >
    <path d="M10.197 3.803H1V13h9.197V3.803Z" fill="#7E7E7E" />
    <path d="M13 1H3.795v1.841h7.364v7.364H13V1Z" fill="#7E7E7E" />
  </svg>
)
