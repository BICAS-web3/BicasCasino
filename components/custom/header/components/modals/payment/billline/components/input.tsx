import { setError } from '@/states/wager_model.store'
import { FC } from 'react'

interface IInput {
  value: string
  type?: string
  className?: string
  title: string
  placeholder: string
  error: boolean
  setValue: (el: string) => void
  setError: (el: boolean) => void
}

const InputItem: FC<IInput> = ({
  type = 'text',
  value,
  className,
  title,
  placeholder,
  error,
  setValue,
  setError
}) => {
  return (
    <div className={`w-full flex flex-col flex-auto gap-1 ${className}`}>
      <h3 className='text-[13px] text-[#979797] font-light leading-[17px] h-[18px]'>
        {title}
      </h3>
      <input
        className={`w-full flex items-center duration-500 justify-between flex-auto h-10 bg-[#121212] rounded-[8px] border px-[10px] text-[#979797] text-sm font-light ${
          error
            ? 'border-[#f55252] placeholder:text-[#f55252]'
            : 'border-[#252525] placeholder:text-[#979797]'
        }`}
        value={value}
        onChange={el => {
          setValue(el.target.value)
          if (error) {
            setError(false)
          }
        }}
        type={type}
        placeholder={error ? 'Empty!' : placeholder}
      />
    </div>
  )
}

export default InputItem
