import { FC } from 'react'

interface WaitIcoProps {
  orange?: boolean
}

export const WaitIco: FC<WaitIcoProps> = ({ orange }) => {
  return (
    <svg
      className='animate-spin'
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.5 2V4'
        stroke={!orange ? 'white' : '#ffa800'}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M17.5 3.33972L16.5 5.07177'
        stroke={!orange ? 'white' : '#ffa800'}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M21.1603 7L19.4282 8'
        stroke={!orange ? 'white' : '#ffa800'}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M22.5 12H20.5'
        stroke={!orange ? 'white' : '#ffa800'}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M21.1603 17L19.4282 16'
        stroke={!orange ? 'white' : '#ffa800'}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M17.5 20.6603L16.5 18.9282'
        stroke={!orange ? 'white' : '#ffa800'}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M12.5 22V20'
        stroke={!orange ? 'white' : '#ffa800'}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M7.5 20.6603L8.5 18.9282'
        stroke={!orange ? 'white' : '#ffa800'}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M3.83984 17L5.5719 16'
        stroke={!orange ? 'white' : '#ffa800'}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M2.5 12H4.5'
        stroke={!orange ? 'white' : '#ffa800'}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M3.83984 7L5.5719 8'
        stroke={!orange ? 'white' : '#ffa800'}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M7.5 3.33972L8.5 5.07177'
        stroke={!orange ? 'white' : '#ffa800'}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
