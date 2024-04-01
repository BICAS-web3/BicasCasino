import Image from 'next/image'

const SocialsLinks = () => (
  <div className='mt-[40px]'>
    <div className='mb-[7px] flex justify-between gap-[20px] items-center'>
      <div className='border-b w-full border-border-black'></div>
      <span
        className='text-bets-title-color text-[11px] font-normal text-center text-nowrap
                  leading-[14px] tracking-def '
      >
        Or continue with
      </span>
      <div className='border-b w-full border-border-black'></div>
    </div>
    <div className='flex gap-[10px] justify-between w-full'>
      <div
        className='w-full bg-[#202020] border border-border-black rounded-[8px]
                  cursor-pointer flex justify-center items-center px-[10px] h-[40px] transition-all
                  duration-300 hover:bg-border-black'
      >
        <Image
          width={25}
          height={25}
          src='/images/registration/googleIco.svg'
          alt='gg'
        />
      </div>
      <div
        className='w-full bg-[#202020] border border-border-black rounded-[8px]
                  cursor-pointer flex justify-center items-center px-[10px] h-[40px] transition-all
                  duration-300 hover:bg-border-black'
      >
        <Image
          className='w-[25px] h-[25px]'
          src='/images/registration/fbIco.svg'
          alt='fb'
          width={25}
          height={25}
        />
      </div>
      <div
        className='w-full bg-[#202020] border border-border-black rounded-[8px]
                  cursor-pointer flex justify-center items-center px-[10px] h-[40px] transition-all
                  duration-300 hover:bg-border-black'
      >
        <Image
          className='w-[25px] h-[25px]'
          src='/images/registration/twitterIco.svg'
          alt='tw'
          width={25}
          height={25}
        />
      </div>
    </div>
  </div>
)

export default SocialsLinks
