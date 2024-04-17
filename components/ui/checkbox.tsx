'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
// import { Check } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'lib/utils'
import Image from 'next/image'
import { CheckIcon } from 'lucide-react'

const unputVariants = cva('', {
    variants: {
        variant: {
            registr: ''
        }
    }
})
// export interface CheckboxProps<typeof unputVariants> {}

interface CheckboxProps
    extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
        VariantProps<typeof unputVariants> {
    // Добавьте дополнительные пропсы здесь
    additionalProp?: string
    anotherProp?: number
    checkType?: React.ReactNode
}

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxProps
>(({ className, additionalProp, anotherProp, checkType, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
            'peer h-4 w-4 shrink-0 rounded-sm border border-primary focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#C4A562] data-[state=checked]:shadow-[0px_0px_4px_0px_#D18B34]',
            className
        )}
        {...props}
    >
        <CheckboxPrimitive.Indicator
            className={cn('flex items-center justify-center text-current')}
        >
            <CheckIcon className='w-2.5 h-2.5 aspect-square object-contain text-white' />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
