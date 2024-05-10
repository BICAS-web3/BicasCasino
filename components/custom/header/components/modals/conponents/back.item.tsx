import { BackSVG } from '../../icons'

interface IBackItem {
  onClick?: () => void
  className?: string
}

const BackItem = ({ onClick, className }: IBackItem) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-[14px] text-lg text-[#7E7E7E] font-medium leading-[25.63px] ${className}`}
    >
      <BackSVG />
      Back
    </button>
  )
}

export default BackItem
