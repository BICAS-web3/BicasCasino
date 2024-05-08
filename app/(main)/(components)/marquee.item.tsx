import { ChevronsDown } from 'lucide-react'
import Image from 'next/image'

type Props = {
  index: number
  grow: boolean
  image: string
  title: string
}

const MarqueeItem = ({ index, grow, image, title }: Props) => (
  <div className='flex items-center gap-[5px] mx-[7.5px] cursor-pointer'>
    <span className='text-sm sm:text-base font-medium text-white'>
      #{index + 1}
    </span>
    <ChevronsDown
      className={`w-5 h-5 aspect-square object-contain ${
        grow ? 'text-[#A7F7D1]' : 'text-[#F7BFA7] rotate-180'
      }`}
    />
    <Image
      className='aspect-square object-contain max-w-5 max-h-5 border border-white rounded-full'
      src={image}
      alt={title}
      width={20}
      height={20}
    />
    <span className='text-sm sm:text-base font-medium uppercase'>{title}</span>
  </div>
)
export default MarqueeItem
