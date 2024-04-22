import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { HeaderMenu } from './menu/HeaderMenu'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import { HeaderM } from '@/states'
// import { signOut, useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'

const User = () => {
  // const navigation = useRouter()
  // const { data, status } = useSession()


  const [visible, setVisible] = useUnit([
    HeaderM.$menuVisibility,
    HeaderM.setMenuVisibility,
])

  return (
    <Button
      onClick={() => setVisible(!visible)}
      variant='ghost'
      className='cursor-pointer w-10 aspect-square flex items-center justify-center rounded-full bg-orange-400 text-white'
    >
      {/* {data ? (
        // <span>{data.user!.name!.slice(0, 2).toLocaleUpperCase()}</span>
        <span>UN</span>
      ) : (
        <div>LO</div>
      )} */}
      <div className='min-w-[40px] flex items-center justify-center h-[40px] rounded-[50%] bg-[#F57731]'>GK</div>
    </Button>
  )
}

export default User
