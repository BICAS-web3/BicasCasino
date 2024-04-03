import * as React from 'react'

import { cn } from 'lib/utils'
import { VariantProps, cva } from 'class-variance-authority'

const inputVariants = cva('', {
    variants: {
        variant: {
            borderNone:
                'bg-inherit outline-none placeholder-white::placeholder text-[13px] leading-[18px] tracking-[4%] text-[#eaeaea]',
            default:
                'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
        }
    },
    defaultVariants: {
        variant: 'borderNone'
    }
})

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
                className={cn(inputVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input }
