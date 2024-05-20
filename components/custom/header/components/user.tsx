import { Button } from '@/components/ui/button'
import { useUnit } from 'effector-react'
import { HeaderM, UserModel } from '@/states'

const User = () => {
  const [visible, setVisible, nickname] = useUnit([
    HeaderM.$menuVisibility,
    HeaderM.setMenuVisibility,
    UserModel.$userInfo
  ])

  return (
    <Button
      onClick={() => setVisible(!visible)}
      variant='ghost'
      data-close
      className='cursor-pointer w-10 aspect-square flex items-center justify-center rounded-full bg-orange-400 text-white'
    >
      <div
        data-close
        className='min-w-[40px] flex items-center justify-center h-[40px] rounded-[50%] bg-[#F57731]'
      >
        GK
      </div>
    </Button>
  )
}

export default User
