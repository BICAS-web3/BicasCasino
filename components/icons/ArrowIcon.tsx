import { FC } from 'react'

export interface ArrowIconProps {
  className?: string
}
export const ArrowIcon: FC<ArrowIconProps> = props => {
  return (
    <svg
      width='10'
      height='6'
      viewBox='0 0 10 6'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
    >
      <path
        d='M0.596435 4.32927L1.7625 5.48854L4.95684 2.31442L8.4353 5.77262L9.59643 4.61825L4.95105 1.9604e-07L0.596435 4.32927Z'
        fill='#EAEAEA'
      />
    </svg>
  )
}
