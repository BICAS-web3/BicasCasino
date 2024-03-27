import { FC } from 'react'

import { cn } from '@/lib/utils'

interface IText {
  children: string
  ind: number
  type: 'text' | 'subText' | 'extraText'
  className?: string
  withText?: boolean
}

const Text: FC<IText> = props => {
  const { children, className, type, ind, withText } = props

  return (
    <span
      className={cn(
        type === 'text'
          ? cn(
              'mb-[9px] max-w-[210px] sm:max-w-[400px] md:max-w-[430px] xl:max-w-[550px] relative uppercase block',
              'text-[0.625rem] sm:text-[1.375rem] sm:leading-[34px] z-10 text-[#e9e9f5] xl:text-3xl font-bold xl:leading-10',
              ind === 0 && 'text-sm sm:text-3xl md:text-2xl xl:text-[2.5rem]',
              ind === 8 &&
                'max-w-[230px] sm:max-w-[500px] ml-0 md:max-w-[485px] xl:ml-[104px] xl:max-w-[670px]',
              withText && ind === 0 && 'mb-3'
            )
          : type === 'subText'
          ? cn(
              'text-[0.625rem] sm:text-base md:text-lg xl:text-xl mt-[3px] z-10 font-bold text-white-acc relative',
              ind === 5 &&
                'max-w-[calc(100vw-270px)] sm:max-w-[380px] xl:max-w-[545px]',
              ind === 7 &&
                'max-w-[calc(100vw-310px)] sm:max-w-[370px] md:max-w-[430px] xl:max-w-[545px]',
              ind === 8 &&
                'max-w-[200px] ml-[70px] mr-0 sm:mr-[100px] md:ml-0 md:max-w-[380px] xl:max-w-max xl:ml-[120px]  xl:mr-0 text-left',
              ind === 6 && 'max-w-[280px] lg:max-w-[370px]'
            )
          : type === 'extraText' &&
            cn(
              'mt-1 max-w-[200px] sm:mt-6 sm:max-w-[400px] md:max-w-[550px] md:mt-0 z-10 relative block',
              'text-[0.5rem] sm:text-base md:text-2xl xl:text-3xl text-[#e9e9f5] font-bold uppercase'
            ),
        className
      )}
    >
      {children}
    </span>
  )
}

export default Text
