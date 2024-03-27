import { FC } from 'react'
import Image, { StaticImageData } from 'next/image'

import { cn } from '@/lib/utils'

interface ISlider {
    img: StaticImageData
    title?: string
    btn?: any
    className?: string
    titleClassName?: string
    btnClassName?: string
    imgClassName?: string
}

const Slider: FC<ISlider> = props => {
    const {
        img,
        btn,
        title,
        className,
        btnClassName,
        imgClassName,
        titleClassName
    } = props

    return (
        <div
            className={cn(
                'flex flex-col justify-between min-h-full min-w-full',
                'relative rounded-[12px] p-[30px] overflow-hidden',
                className
            )}
        >
            <Image
                className={cn(
                    'absolute w-full h-full top-0 left-0',
                    imgClassName
                )}
                src={img}
                alt='img'
            />
            {title && (
                <h3
                    className={cn(
                        'text-[#E9E9F5] font-bold uppercase',
                        titleClassName
                    )}
                >
                    {title}
                </h3>
            )}
            {btn && (
                <button
                    className={cn(
                        'min-w-[182px] h-9 flex items-center justify-center px-5 mt-auto w-fit',
                        'text-sm sm:text-base relative z-[1] bg-transparent',
                        btnClassName
                    )}
                >
                    {btn}
                </button>
            )}
        </div>
    )
}

export default Slider
