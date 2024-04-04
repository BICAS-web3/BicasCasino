import { FC } from 'react'

interface IRowItem {
  isMobile: boolean
  value: number
  color: string
  ball: {
    value: number
  }
  animationDelay: boolean
  index: number
}
const RowItem: FC<IRowItem> = props => {
  const { isMobile, value, color, ball, animationDelay, index } = props
  return (
    <div className='text-[0.625 py-[10px] mr-[1px] text-white w-[34px] h-6 flex justify-center items-center relative z-[1] top-0 before:content-[""] before:absolute before:h-full before:w-full before:bg-[rgba(15,15,15,0.25)] before:z-[2] shadow-[0px_1px_0.5px_0px_rgba(15,15,15,0.25),-1px_0px_1px_0px_rgba(45,40,31,0.25),3px_-2px_3px_0px_rgba(15,15,15,0.25)]'>
      {isMobile ? (
        // <MobileRowSVG
        //   className={
        //     (cn(
        //       ball.value === index && !animationDelay
        //         ? value > 1
        //           ? 'text-[#20b22e]'
        //           : 'text-[#979797]'
        //         : `text-[${color}]`
        //     ),
        //     'duration-500 absolute h-full w-full z-[3]')
        //   }
        // />
        <svg
          width='17'
          height='30'
          viewBox='0 0 17 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='duration-500 absolute h-full w-full z-[3]'
        >
          <path
            style={{ transition: 'all 0.5s' }}
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M13.867 0C12 2.60142 10.5207 2.60142 8.5 2.60142C6.47928 2.60142 5 2.60142 3.41112 0H0V30H17V0H13.867Z'
            fill={
              ball.value === index && !animationDelay
                ? value > 1
                  ? '#20b22e'
                  : '#979797'
                : color
            } //
          />
        </svg>
      ) : (
        // <DesktopRowSVG
        //   className={cn(
        //     'duration-500 absolute h-full w-full z-[3]',
        //     ball.value === index && !animationDelay
        //       ? value > 1
        //         ? 'text-[#20b22e]'
        //         : 'text-[#979797]'
        //       : `text-[${color}]`
        //   )}
        // />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='34'
          height='24'
          viewBox='0 0 34 24'
          fill='none'
          className='duration-500 absolute h-full w-full z-[3]'
        >
          <path
            style={{ transition: 'all 0.5s' }}
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M27.7339 0C24 2.08113 21.0414 2.08113 17 2.08113C12.9586 2.08113 10 2.08113 6.82225 0H0V24H34V0H27.7339Z'
            fill={
              ball.value === index && !animationDelay
                ? value > 1
                  ? '#20b22e'
                  : '#979797'
                : color
            }
          />
        </svg>
      )}
      <span
        className={`z-[4] font-bold rotate-90 md:rotate-0 text-[0.5rem] md:text-[0.625rem] ${
          value < 1 && 'text-black'
        }`}
      >
        {value}x
      </span>
    </div>
  )
}
export default RowItem
