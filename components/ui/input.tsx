import * as React from 'react'

import { cn } from 'lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const inputVariants = cva('outline-none text-white', {
    variants: {
        variant: {
            default: 'bg-transparent',
            registr: `bg-[#121212] rounded-[8px] text-white text-[13px] sm:text-[16px] font-normal h-[42px] leading-[22px] tracking-def text-left`,
            borderNone:
                'bg-inherit outline-none placeholder-white::placeholder text-[13px] leading-[18px] tracking-[4%] text-[#eaeaea]'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
})

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
    asChild?: boolean
    href?: string
    startAdornment?: React.ReactNode
    endAdornment?: React.ReactNode
    containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            variant,
            type,
            startAdornment,
            endAdornment,
            containerClassName,
            ...props
        },
        ref
    ) => {
        return (
            <div
                className={`flex justify-between w-full items-center flex-row flex-nowrap rounded-md bg-[#121212] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-1 ${
                    containerClassName ? containerClassName : ''
                }`}
            >
                {!!startAdornment ? (
                    <div className='w-[42px] h-[42px] aspect-square flex items-center justify-center'>
                        {startAdornment}
                    </div>
                ) : null}
                <input
                    type={type}
                    className={cn(
                        'flex h-10 flex-1 rounded-md bg-transparent px-3 py-2 text-sm ring-offset-background file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none active:outline-none',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {!!endAdornment ? (
                    <div className='w-[42px] h-[42px] aspect-square flex items-center justify-center'>
                        {endAdornment}
                    </div>
                ) : null}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }
