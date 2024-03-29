import { FC } from 'react'

export interface TotalItemProps {
  description: string
  image: any
  dollar?: boolean
  statistics: number | string
}

export const TotalItem: FC<TotalItemProps> = props => {
  return (
    <div
      className={`
        box-border flex relative flex-col 
        items-center rounded-[20px] bg-[#151515]
        w-full sm:h-[263px] h-[126px] pb-[16px] sm:pb-[50px]
    `}
    >
      <div
        className='w-full h-full justify-end 
      flex sm:justify-center 
      items-center flex-col overflow-hidden'
      >
        <div className='bg-[#f3bd6b33] mix-blend-hard-light rounded-[100px] blur-[50px] w-[163px] h-[136px] relative bottom-[37px]'></div>

        <div className='text-[.75rem] md:text-[1rem]  tracking-[0.48px] bottom-[6px] relative uppercase font-extrabold text-text-w-def text-center'>
          {props.description}
        </div>
        <div className='text-[#e5c787] md:text-[2.5rem] md:tracking-[1.6px]  text-[1.25rem] font-extrabold tracking-[0.8px] uppercase relative flex content-center'>
          {props.dollar ? `$ ${props.statistics}` : `${props.statistics}`}
        </div>
      </div>
      <img
        src={props.image.src}
        alt=''
        className='w-[40px] h-[40px] absolute bottom-[72px] sm:w-[70px] sm:h-[70px] sm:bottom-[150px] md:w-[126px] md:h-[126px] md:bottom-[171px] '
      />
    </div>
  )
}
