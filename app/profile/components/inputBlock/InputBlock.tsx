import { FC } from 'react'
import copyIco from '@/public/payment/copyIco.png'

interface InputBlockProps {
  title: string
  subTitle?: string
  placeholder: string
  isNecessarily?: boolean
  disabled?: boolean
  copy?: boolean
}

export const InputBlock: FC<InputBlockProps> = ({
  title,
  subTitle,
  placeholder,
  disabled,
  isNecessarily,
  copy
}) => {
  return (
    <div className='flex flex-col justify-between gap-[4px]'>
      <span className='text-white text-[14px] font-bold leading-[18px]'>
        {title} {isNecessarily && <span className='text-[#29f061]'>*</span>}
      </span>
      {subTitle && (
        <span className='text-[#7E7E7E] text-[14px] font-normal leading-[18px]'>
          {subTitle}
        </span>
      )}
      <div className='relative w-full max-w-[480px]'>
        <input
          type='text'
          disabled={disabled}
          placeholder={placeholder}
          className={`
                        text-[#7E7E7E] text-[13px] font-normal leading-[17.7px] p-[12px_10px] w-full max-w-[480px] rounded-[5px] placeholder:text-[#7E7E7E]
                        ${
                          !disabled
                            ? 'border border-[#252525] bg-[#121212]'
                            : 'bg-[#181818]'
                        }
                    `}
        />
        {copy && (
          <img
            src={copyIco.src}
            alt='copy'
            className='absolute top-[10px] right-[20px] cursor-pointer'
          />
        )}
      </div>
    </div>
  )
}
