import { FC } from 'react'

import { cn } from '@/lib/utils'

interface IButton {
  className?: string
  children?: any
  link?: string
  onClick?: () => void
}

const Button: FC<IButton> = props => {
  const { children, className, link, onClick } = props

  return (
    <button
      className={cn(
        'w-full sm:w-[215px] h-[30px] sm:h-[50px] flex justify-center items-center',
        'text-center font-black text-lg leading-4 text-white-acc',
        'rounded-[5px] sm:rounded-[12px] cursor-pointer border-none duration-200',
        className
      )}
      onClick={() => {
        window.open(link, '_blank')
        onClick?.()
      }}
    >
      {children}
    </button>
  )
}

export default Button
