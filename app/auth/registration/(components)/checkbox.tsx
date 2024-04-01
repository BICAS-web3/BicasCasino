import Image from 'next/image'

interface ICheckbox {
  setCheckbox: (el: boolean) => void
  chackbox: boolean
  error?: boolean
  text: string | React.ReactNode
}

const Checkbox = ({ text, chackbox, error, setCheckbox }: ICheckbox) => {
  return (
    <div
      className='cursor-pointer flex items-center gap-[20px]'
      onClick={() => setCheckbox(!chackbox)}
    >
      <div
        className={`
            min-h-[14px] min-w-[14px] max-h-[14px] max-w-[14px]
            flex items-center justify-center border border-[#e5c787] rounded-[2px] bg-inherit
            transition-all duration-300
            ${error && !chackbox ? '!border-[red]' : ''}
            ${chackbox ? 'shadow-[0px_0px_4px_0px_#d18b34] !bg-[#c4a562]' : ''}
          `}
      >
        <Image
          width={12}
          height={9}
          src='/images/registration/arr.svg'
          className={`opacity-0 invisible transition-all duration-300
            ${chackbox ? 'opacity-100 !visible' : ''}`}
          alt='arr-ico'
        />
      </div>
      <p
        className='text-[12px] font-normal leading-[16px] tracking-def
            text-bets-title-color '
      >
        {text}
      </p>
    </div>
  )
}

export default Checkbox
