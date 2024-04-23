import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'

import { cn } from 'lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                gray: 'bg-[#20202080] border border-[#363636]',
                gold: 'bg-[linear-gradient(113.81deg,#F8EEB8_-4.17%,#DBB370_59.03%,#8E5B2D_112.39%)]',
                auth: `text-[16px] h-[40px] border border-orange cursor-pointer flex
            justify-center items-center rounded-[8px] w-full text-orange
            font-bold leading-[16px] tracking-def text-center transition-all duration-300
            relative overflow-hidden after:transition-all after:opacity-0 after:duration-300
            after:invisible after:w-[40px] after:h-[40px] after:absolute after:bottom-[-20px]
            after:left-[50%] after:translate-x-[-50%] after:bg-[#ffb800] after:mix-blend-hard-light
            after:rounded-[100px] after:blur-[50px] hover:after:opacity-100 hover:after:visible
            active:after:blur-[45px] active:after:w-[50px] active:after:h-[50px]`,
                wager: 'bg-[#20202066]  rounded-none box-border w-full max-w-[43px] uppercase h-[36px] border-r border-r-[#363636] text-[#979797] leading-[14px] tracking-[4%] text-[10px] font-semibold',
                wagerPlay:
                    'w-[145px] h-[40px] border-[2px] rounded-[30px] border-[#FFE7B4] text-[#FFE7B4] text-[14px] font-medium leading-[19px] tracking-[4%]'
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
                play: 'w-full h-10 rounded-[12px]'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
    href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, href, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <>
                {href ? (
                    <Link href={href} className='w-full relative'>
                        <Comp
                            className={cn(
                                buttonVariants({ variant, size, className })
                            )}
                            ref={ref}
                            {...props}
                        />
                    </Link>
                ) : (
                    <Comp
                        className={cn(
                            buttonVariants({ variant, size, className })
                        )}
                        ref={ref}
                        {...props}
                    />
                )}
            </>
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
