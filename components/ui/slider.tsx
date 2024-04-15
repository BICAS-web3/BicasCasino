'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from 'lib/utils'

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            'relative flex w-full touch-none select-none items-center',
            className
        )}
        {...props}
    >
        <SliderPrimitive.Track className='relative h-1 w-full grow overflow-hidden rounded-full bg-secondary'>
            <SliderPrimitive.Range className='absolute h-full bg-[linear-gradient(to_right,#f8eeb8,#dbb370,#8e5b2d)]' />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className='block h-[9px] w-[9px] rounded-full bg-white cursor-pointer' />
    </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
