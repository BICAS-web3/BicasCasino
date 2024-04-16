import { logout } from '@/app/auth/(actions)/logOut'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const User = () => {
  const user = {
    name: 'Boris',
    surname: 'Yaremchenko'
  }
  const navigation = useRouter()
  return (
    <Button
      onClick={async () => {
        await signOut()
        navigation.push('/auth/registration')
      }}
      variant='ghost'
      className='cursor-pointer w-10 aspect-square flex items-center justify-center rounded-full bg-orange-400 text-white'
    >
      <span>{user.name.slice(0, 1).toLocaleUpperCase()}</span>
      <span>{user.surname.slice(0, 1).toLocaleUpperCase()}</span>
    </Button>
  )
}

export default User
