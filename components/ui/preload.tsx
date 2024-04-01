import { FC } from 'react'
export interface IPreload {
    className?: string
    index?: string
}

const Preload: FC<IPreload> = () => {
    return (
        <>
            <div className='w-full h-full absolute top-0 left-0 z-10 bg-[rgba(15,15,15,0.7)] duration-500 blur-[10px] rounded-0 sm:rounded-[20px_20px_0_0] lg:rounded-[20px_0_0_0]'></div>
            <span className='preload text-white text-[0.438rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 indent-[-9999em] comm-delay z-[99] rounded-[50%] w-[2.5em] h-[2.5em] fill-mode-both animate-[bblFadInOut_1.8s_infinite_ease-in-out] before:rounded-[50%] before:w-[2.5em] before:h-[2.5em] before:fill-mode-both before:animate-[bblFadInOut_1.8s_infinite_ease-in-out] before:content-[""] before:absolute before:top-0 before:left-[-3.5em] anim-delay after:rounded-[50%] after:w-[2.5em] after:h-[2.5em] after:fill-mode-both after:animate-[bblFadInOut_1.8s_infinite_ease-in-out] after:content-[""] after:absolute after:top-0 after:left-[3.5em]'></span>
        </>
    )
}

export default Preload
