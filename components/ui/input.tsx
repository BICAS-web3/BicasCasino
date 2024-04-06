import * as React from 'react'

import { cn } from 'lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const inputVariants = cva(
    'outline-none p-[7.5px_10px] sm:p-[15px_20px] text-white ',
    {
        variants: {
            variant: {
                default: 'bg-transparent',
                registr: `bg-[#121212] rounded-[8px] p-[7.5px_10px] sm:p-[15px_20px] text-white text-[13px]
              sm:text-[16px] font-normal h-[42px] leading-[22px] tracking-def text-left`,
                borderNone:
                    'bg-inherit outline-none placeholder-white::placeholder text-[13px] leading-[18px] tracking-[4%] text-[#eaeaea]'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
)

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
    asChild?: boolean
    href?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none active:outline-none',
                    inputVariants({ variant }),
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input }
