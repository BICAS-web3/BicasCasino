import { FC, useState } from 'react'
import copyIco from '@/public/payment/copyIco.png'
import { Button } from '@/components/ui/button'
import { EyeClose, EyeOpen } from '@/app/auth/(icons)'

interface InputBlockProps {
  title: string
  subTitle?: string
  placeholder: string
  isNecessarily?: boolean
  disabled?: boolean
  copy?: boolean
  value?: string
  setValue?: (el: string) => void
  type?: string
}

export const InputBlock: FC<InputBlockProps> = ({
  title,
  subTitle,
  placeholder,
  disabled,
  isNecessarily,
  copy,
  value,
  setValue,
  type = 'string'
}) => {
  const [showPassword, setShowPassword] = useState(false)
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
          value={value}
          onChange={el => setValue?.(el.target.value)}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
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
        {type === 'password' && (
          <Button
            variant='noneBg'
            type='button'
            className='h-full flex justify-center items-center p-0 absolute top-1/2 -translate-y-1/2 right-5 w-fit'
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <EyeClose /> : <EyeOpen />}
          </Button>
        )}
      </div>
    </div>
  )
}
