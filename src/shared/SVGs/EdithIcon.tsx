import {FC} from "react"

interface IEdithIcon {
    onClick: () => void
}

export const EdithIcon: FC<IEdithIcon> = ({onClick, ...props}) => (
    <svg
        width={15}
        height={15}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        {...props}
    >
        <path
            d="m13.767 2.689-1.503-1.462A.805.805 0 0 0 11.7 1a.805.805 0 0 0-.563.227L9.935 2.394l2.63 2.555 1.202-1.167a.758.758 0 0 0 0-1.093ZM2.129 9.98l2.63 2.556 7.243-7.039-2.63-2.556-7.243 7.04Zm-.568.547L1 13.627l3.19-.544-2.629-2.556Z"
            fill="#7E7E7E"
        />
    </svg>
)
