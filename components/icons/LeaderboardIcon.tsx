import { FC } from 'react'

export interface LeaderboardIconProps {
  className?: string
}
export const LeaderboardIcon: FC<LeaderboardIconProps> = props => {
  return (
    <svg
      width='19'
      height='18'
      viewBox='0 0 19 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
    >
      <path
        d='M15.8492 5.33085C15.1703 5.33085 14.6201 5.87708 14.6201 6.55095C14.6201 6.88101 14.7534 7.17933 14.9679 7.39901L12.4445 9.82722L9.82672 5.70633C10.2419 5.44658 10.5198 4.99058 10.5198 4.4674C10.5198 3.65703 9.85794 3 9.0415 3C8.2251 3 7.56325 3.65703 7.56325 4.4674C7.56325 4.98959 7.84004 5.44512 8.254 5.70523L5.6373 9.82722L3.11497 7.39915C3.32961 7.17954 3.46299 6.88111 3.46299 6.55095C3.46299 5.87708 2.91266 5.33085 2.23381 5.33085C1.55496 5.33085 1.00464 5.87708 1.00464 6.55095C1.00464 7.22475 1.55496 7.77098 2.23381 7.77098C2.30847 7.77098 2.3808 7.76183 2.45184 7.74914L3.61733 13.3691H14.4656L15.6312 7.74914C15.7022 7.7619 15.7745 7.77098 15.8492 7.77098C16.5281 7.77098 17.0784 7.22475 17.0784 6.55095C17.0784 5.87708 16.5281 5.33085 15.8492 5.33085Z'
        fill='#7E7E7E'
      />
      <path
        d='M3.61733 14.0339V15.6061H14.4656V14.0339H3.61733Z'
        fill='#7E7E7E'
      />
    </svg>
  )
}
