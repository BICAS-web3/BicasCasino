import { setError } from '@/states/wager_model.store'
import { FC, useRef, useState } from 'react'
import { CheckSVG } from '../icons'

interface IInput {
  value: string
  type?: string
  className?: string
  title: string
  placeholder: string
  error: boolean
  isNumber?: boolean
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
  isNumber,
  setValue,
  setError
}) => {
  const nextInputRef = useRef<HTMLInputElement | null>(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && nextInputRef.current) {
      nextInputRef.current.focus()
    }
  }

  const [unfocus, setUnfocus] = useState(false)
  return (
    <div className={`w-full flex flex-col relative gap-1 ${className}`}>
      <CheckSVG
        className={`absolute bottom-2 right-2.5 duration-500 ${
          unfocus ? 'text-[#29F061]' : 'text-transparent'
        }`}
      />
      <h3
        className={`text-[13px] font-light leading-[17px] h-[18px] duration-500 ${
          error ? 'text-[#FC3C37]' : 'text-[#979797]'
        }`}
      >
        {title}
      </h3>
      <input
        onKeyDown={handleKeyDown}
        ref={nextInputRef}
        onBlur={() => {
          if (value) {
            setUnfocus(true)
          }
        }}
        className={`w-full max-h-10 flex items-center duration-500 justify-between flex-auto h-10 bg-[#121212] rounded-[8px] border px-[10px] text-[#979797] text-sm font-light border-[#252525] placeholder:text-[#464646]`}
        value={value}
        onChange={el => {
          if (isNumber && !/^[0-9\s]*$/.test(el.target.value)) {
            return
          }
          setValue(el.target.value)
          if (error) {
            setError(false)
          }
        }}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}

export default InputItem
