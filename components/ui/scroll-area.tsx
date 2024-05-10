'use client'

import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'lib/utils'

const buttonVariants = cva('relative flex-1 rounded-full', {
    variants: {
        variant: {
            default: 'bg-border',
            ghost: ''
        }
    },
    defaultVariants: {
        variant: 'default'
    }
})

export interface ScrollAreaProps
    extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
        VariantProps<typeof buttonVariants> {}

const ScrollArea = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.Root>,
    ScrollAreaProps
>(({ className, children, variant, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        {...props}
    >
        <ScrollAreaPrimitive.Viewport className='h-full w-full rounded-[inherit]'>
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar variant={variant} />
        <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

export interface ScrollBarProps
    extends React.ComponentPropsWithoutRef<
            typeof ScrollAreaPrimitive.ScrollAreaScrollbar
        >,
        VariantProps<typeof buttonVariants> {}

const ScrollBar = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
    ScrollBarProps
>(({ className, orientation = 'vertical', variant, ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={ref}
        orientation={orientation}
        className={cn(
            'flex touch-none select-none transition-colors',
            orientation === 'vertical' &&
                'h-full w-2.5 border-l border-l-transparent p-[1px]',
            orientation === 'horizontal' &&
                'h-2.5 flex-col border-t border-t-transparent p-[1px]',
            className
        )}
        {...props}
    >
        <ScrollAreaPrimitive.ScrollAreaThumb
            className={cn(buttonVariants({ variant, className }))}
        />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
