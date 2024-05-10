'use client'
import { FC } from 'react'

interface SubmitBtnProps {
  title: string
  handler: () => void
  isWidth?: boolean
  fullWidth?: boolean
  className?: string
}

export const SubmitBtn: FC<SubmitBtnProps> = ({
  title,
  handler,
  isWidth,
  fullWidth,
  className
}) => {
  return (
    <button
      className={`
            rounded-[8px] border border-[#907640] flex items-center justify-center text-[#FFE09D] text-[14px] sm:text-[16px] font-semibold w-full ${
              isWidth ? '!max-w-[200px]' : 'max-w-[120px]'
            } ${fullWidth ? '!max-w-[100%]' : 'max-w-[120px]'} p-[0px_10px] sm:w-full sm:max-w-[240px] min-h-[40px] bg-[#252019] ${className}
        `}
      onClick={handler}
    >
      {title}
    </button>
  )
}
